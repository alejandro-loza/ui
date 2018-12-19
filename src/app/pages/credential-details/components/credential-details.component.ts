import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { CredentialService } from '@services/credentials/credential.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FieldService } from '@services/field/field.service';
import { AccountService } from "@services/account/account.service";
import { institutionField } from '@shared/interfaces/institutionField';
import { Account } from "@shared/dto/account";
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-credential-details',
  templateUrl: './credential-details.component.html',
  styleUrls: ['./credential-details.component.css'],
  providers: [ FieldService ]
})

export class CredentialDetailsComponent implements OnInit, AfterViewInit {
  
  credentialId:string;
  institutionDetails:any;
  fields:institutionField[] = [];
  accounts: Account[] = [];
  userId = sessionStorage.getItem("id-user");
  accountId:string;
  accountAuxForDelete: Account;

  @ViewChild('modal') elModal: ElementRef;
  @ViewChild('modal2') elModal2: ElementRef;

  constructor( private credentialService: CredentialService, private activated:ActivatedRoute,
               private fieldService:FieldService, private accountService:AccountService, private router:Router ) { 
               }

  
  ngOnInit() {
    this.activated.params.subscribe((params:Params) => {
      this.credentialId = params["credencialId"]
    });
    this.getDetails();
  }

  ngAfterViewInit(){
    const modal = new M.Modal( this.elModal.nativeElement );
    const modal2 = new M.Modal( this.elModal2.nativeElement );
  }

  getDetails(){
    // Obtenemos un JSON con los detalles de la institution mostrada.
   this.credentialService.getCredential( this.credentialId ).subscribe( res => {
      this.institutionDetails = res;
      this.getFields( this.institutionDetails.institution.code );
      this.getAccounts();
    });
  }

  getAccounts(){  
    // Obtenemos las cuentas del usuario pero sólo gurdamos las de la institución mostrada.
    this.accountService.getAccounts( this.userId ).subscribe( (res:any) => {
      res.data.forEach( element => {
        if( element.institution.code == this.institutionDetails.institution.code ){
          this.accounts.push( element );
        }
      });
    });
  }

  getFields( code ) {
    // Obtenemos los campos a mostrar de la institución mostrada y borramos el primer campo
    // que en todos los casos es el username.
    this.fieldService.findAllFieldsByInstitution( code ).subscribe(
      (res: institutionField[]) => {
        res.forEach(fieldBank => {
          this.fields.push(fieldBank);
        });
        this.fields.shift();
      }
    );
  }

  updateCredential( credential ){
    this.credentialService.updateCredential( credential ).subscribe( res => {
      this.router.navigateByUrl("/app/credentials");
      M.toast({
        html: 'Sincronización en proceso...',
        displayLength: 2000
      })
    }, error => {
      console.log( error );
    }, () => {
    })
  }

  deleteCredential( ){
    this.credentialService.deleteCredential( this.credentialId ).subscribe( res => {
      this.router.navigateByUrl("/app/credentials");
      M.toast({
        html:"Credencial elminada correctamente",
        displayLength: 2000
      })
    }, error => {
      M.toast({
        html: 'Ocurrió un error al elminar la credencial, inténtalo mas tarde',
        displayLength: 2000,
      });
    });
  }

  // Delete Account's process
  deleteAccount( account:Account ){
    this.accountAuxForDelete = account;
    const instanceModal = M.Modal.getInstance( this.elModal2.nativeElement );
    instanceModal.open();
  }

  deleteAccountConfirmed(){
    this.accountService.deleteAccount( this.accountAuxForDelete.id ).subscribe( res => {
      M.toast({
        html: 'Cuenta eliminada correctamente',
        displayLength: 2000,
      })
      this.accounts = [];
      this.getAccounts();
     }, error => {
       M.toast({
         html: 'Ocurrió un error al elminar la cuenta, inténtalo mas tarde',
         displayLength: 2000,
       });
     });
  }

}
