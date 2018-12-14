import { Component, OnInit } from '@angular/core';
import { Credential } from '@shared/dto/credentials/credential';
import { Account } from '@shared/dto/account';
import { AccountService } from '@services/account/account.service';
import { InstitutionService } from '@services/institution/institution.service';
import { CredentialService } from '@services/credentials/credential.service';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css'],
  providers: [InstitutionService]
})
export class CredentialComponent implements OnInit {

  credentials: Credential[] = [];
  accounts: Account[] = [];
  userId = sessionStorage.getItem("id-user");
  debitBalance:number = 0;
  creditBalance:number = 0;
  totalBalance:number = 0;

    constructor( private accountService: AccountService, private credentialService: CredentialService,
                  private institutionService:InstitutionService  ) { 
    }

  ngOnInit() {
    this.getCredentials();
    this.getAccounts();
    this.loadInstitutions();
    document.getElementById("pagescontainer").classList.remove("row");
  }

  getAccounts(){  
    this.accountService.getAccounts( this.userId ).subscribe( (res:any) => {
      res.data.forEach( element => {
        this.accounts.push( element );
      });
      this.getBalance( this.accounts );
    });
  }

  getCredentials(){
    this.credentialService.getAllCredentials( this.userId ).subscribe( (res:any) => {
      res.data.forEach( element => {
        this.credentials.push( element );
      });
    });
  }

  getBalance( accountsArray:Account[] ){
    accountsArray.forEach(element => {
      if( element.nature != "Crédito"){
        // Saldo en débito o chequera
        this.debitBalance += element.balance
      } else {
        // Saldo en crédito
        this.creditBalance += element.balance;
      }
    });
    this.totalBalance = this.debitBalance + this.creditBalance;
  }

  loadInstitutions(){
    this.institutionService.getAllInstitutions().subscribe( res => {
      sessionStorage.setItem("institutions", JSON.stringify( res.data ))
    });
  }
}
