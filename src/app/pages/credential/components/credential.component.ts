import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Credential } from '@shared/dto/credentials/credential';
import { NgForm } from '@angular/forms';
import { Account } from '@shared/dto/account';
import { AccountService } from '@services/account/account.service';
import { InstitutionService } from '@services/institution/institution.service';
import { InteractiveFieldService } from '@services/interactive-field/interactive-field.service';
import { CredentialService } from '@services/credentials/credential.service';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css'],
  providers: [InstitutionService, InteractiveFieldService ]
})
export class CredentialComponent implements OnInit, AfterViewInit {
  
  credentials: Credential[] = [];
  accounts: Account[] = [];
  interactiveFields = [];
  userId = sessionStorage.getItem("id-user");
  debitBalance:number = 0;
  creditBalance:number = 0;
  totalBalance:number = 0;
  
  // Aux properties
  processCompleteForSpinner:boolean = false;
  validateStatusFinished:boolean = true;
  loaderMessagge:string = "";
  credentialInProcess: Credential;

  
  @ViewChild('modal') interactiveModal: ElementRef;

  constructor( private accountService: AccountService, 
               private credentialService: CredentialService,
               private institutionService:InstitutionService, 
               private interactiveService: InteractiveFieldService  ) { 
  }

  ngOnInit() {
    this.getCredentials();
    this.loadInstitutions();
  }

  ngAfterViewInit(){ 
    const initModal = new M.Modal( this.interactiveModal.nativeElement)
  }

  // Main methods for getting data

  getCredentials(){
    this.credentials = [];
    this.credentialService.getAllCredentials( this.userId ).subscribe( (res:any) => {
      res.data.forEach( (element: Credential) => {
        this.credentials.push( element );
        this.checkStatusOfCredential( element );
      });
      this.processCompleteForSpinner = true;
    });
    this.getAccounts();
  }

  getAccounts(){  
    this.accounts = [];
    this.accountService.getAccounts( this.userId ).subscribe( (res:any) => {
      res.data.forEach( element => {
        this.accounts.push( element );
      });
      this.getBalance( this.accounts );
    });
  }

  getBalance( accountsArray:Account[] ){
    this.debitBalance = 0; this.creditBalance = 0; this.totalBalance = 0;
    accountsArray.forEach(element => {
      if( element.nature != "Crédito"){
        this.debitBalance += element.balance
      } else {
        this.creditBalance += element.balance;
      }
    });
    this.totalBalance = this.debitBalance + this.creditBalance;
  }

  // Checking status of credencials methods

  checkStatusOfCredential( credential:Credential ){
    if( credential.status === "ACTIVE" ){
      this.validateStatusFinished = true;
    }
    else if( credential.status === "INVALID" ){
      this.loaderMessagge = "¡Ha ocurrido algo con una de tus credenciales!";
    }
    else if( credential.status === "VALIDATE" ){
      this.loaderMessagge = "Finerio se está sincronizando con tu banca en línea. Esto puede durar unos minutos.";
      this.getNewInfoCredential( credential.id );
    } 
    else if( credential.status === "TOKEN" ){
      this.loaderMessagge = "Solicitando información adicional..."
      this.getNewInfoCredential( credential.id );
    }
  }

  getNewInfoCredential( credentialId ){
    this.credentialService.getCredential( credentialId ).subscribe(
    (res:Credential ) => {
      this.credentialInProcess = res;
      if( this.credentialInProcess.status == "VALIDATE" ){
        this.validateStatusFinished = false;
        setTimeout( () => { this.checkStatusOfCredential(res) }, 1000 );

      } else if ( this.credentialInProcess.status == "ACTIVE" ){
        this.loaderMessagge = "¡Tus datos han sido sincronizados!";
        this.getCredentials();

      } else if ( this.credentialInProcess.status == "TOKEN" ){
        this.validateStatusFinished = false;
        //  Modal process
        this.modalProcessForInteractive( res );

      } else if( this.credentialInProcess.status === "INVALID" ){
        this.loaderMessagge = "¡Ha ocurrido algo con una de tus credenciales!";
        this.validateStatusFinished = true;
        this.getCredentials();
      }
    })
  }

  // InteractiveFields Process

  getInteractiveFields( credential:Credential ){
    this.interactiveService.findAllFields(credential).subscribe( (data:any) => {
     data.forEach(element => {
       this.interactiveFields.push( element )
     });
    });
  }

  interactiveSubmit( form:NgForm ){
   this.interactiveService.sendToken( this.credentialInProcess, form.value ).subscribe(
     res => {
      this.checkStatusOfCredential( this.credentialInProcess );
     }
   );
  }

  modalProcessForInteractive( credential:Credential ){
    const instanceModal = M.Modal.getInstance( this.interactiveModal.nativeElement );
    instanceModal.open();
    this.getInteractiveFields( credential );
  }

  // Loading Institutions in Session Storage

  loadInstitutions(){
    this.institutionService.getAllInstitutions().subscribe( res => {
      sessionStorage.setItem("institutions", JSON.stringify( res.data ))
    });
  }

}
