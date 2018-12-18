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
export class CredentialComponent implements OnInit {
  @ViewChild('modal') interactiveModal: ElementRef;

  credentials: Credential[] = [];
  accounts: Account[] = [];
  userId = sessionStorage.getItem("id-user");
  debitBalance:number = 0;
  creditBalance:number = 0;
  totalBalance:number = 0;
  processCompleteForSpinner:boolean = false;
  validateFinished:boolean = true;
  loaderMessagge:string = "";
  interactiveFields = [];
  credentialWithInteractive: Credential;

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

  getCredentials(){
    this.credentials = [];
    this.credentialService.getAllCredentials( this.userId ).subscribe( (res:any) => {
      res.data.forEach( element => {
        this.credentials.push( element );
        this.processCompleteForSpinner = true;
        this.checkStatusOfCredentials( element );
      });
    });
    this.getAccounts();
  }

  checkStatusOfCredentials( credential:Credential ){
    if( credential.status === "ACTIVE" ){
      this.validateFinished = true;
    }
    else if( credential.status === "VALIDATE" ){
      this.loaderMessagge = "Finerio se está sincronizando con tu banca en línea. Esto puede durar unos minutos.";
      this.getInfoCredential( credential.id );
    } 
    else if( credential.status === "INVALID" ){
      this.loaderMessagge = "¡Ha ocurrido algo con una de tus credenciales!";
    }
    else if( credential.status === "TOKEN" ){
      this.loaderMessagge = "Solicitando información adicional..."
      this.getInfoCredential( credential.id );
    }
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

  getInfoCredential( credentialId ){
    this.credentialService.getCredential( credentialId ).subscribe( (res:Credential ) => {
      this.credentialWithInteractive = res;
      if( this.credentialWithInteractive.status == "VALIDATE" ){
        this.validateFinished = false;
        setTimeout( () => { this.checkStatusOfCredentials(res) }, 1000 );

      } else if ( this.credentialWithInteractive.status == "ACTIVE" ){
        this.loaderMessagge = "¡Tus datos han sido sincronizados!";
        this.getCredentials();

      } else if ( this.credentialWithInteractive.status == "TOKEN" ){
        this.validateFinished = false;
          // Abriendo Modal
        const instanceModal = M.Modal.getInstance( this.interactiveModal.nativeElement );
        instanceModal.open();
        this.getInteractiveFields(res);

      } else if( this.credentialWithInteractive.status === "INVALID" ){
        this.loaderMessagge = "¡Ha ocurrido algo con una de tus credenciales!";
        this.validateFinished = false;
        this.getCredentials();
      }
    })
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

  getInteractiveFields( credential:Credential ){
    this.interactiveService.findAllFields(credential).subscribe( (data:any) => {
     data.forEach(element => {
       this.interactiveFields.push( element )
     });
    });
  }

  interactiveSubmit( form:NgForm ){
   this.interactiveService.sendToken( this.credentialWithInteractive, form.value ).subscribe(
     res => {
       console.log( res );
     }
   );
   
  }

  loadInstitutions(){
    this.institutionService.getAllInstitutions().subscribe( res => {
      sessionStorage.setItem("institutions", JSON.stringify( res.data ))
    });
  }

}
