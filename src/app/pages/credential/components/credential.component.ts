import { Component, OnInit } from '@angular/core';
import { Credential } from '@shared/dto/credentials/credential';
import { Account } from '@shared/dto/account';
import { AccountService } from '@services/account/account.service';
import { CredentialService } from '@services/credentials/credential.service';
declare const $:any;
@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css']
})
export class CredentialComponent implements OnInit {

  credentials: Credential[] = [];
  selectedCredential: Credential = null;
  accounts: Account[] = [];
  selectedAccount: Account;
  userId = sessionStorage.getItem("id-user");
  debitBalance:number = 0;
  creditBalance:number = 0;
  totalBalance:number = 0;

    constructor( private accountService: AccountService, private credentialService: CredentialService ) { 
  
    }

  ngOnInit() {
    this.getAccounts();
    this.getCredentials();
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
      element.nature != "Crédito" ? this.debitBalance += element.balance : this.creditBalance += element.balance;
    });
    this.totalBalance = this.debitBalance + this.creditBalance;
  }
}
