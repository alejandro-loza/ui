import { Injectable } from '@angular/core';
import { CredentialInterface } from '@app/interfaces/credential.interface';
import { AccountInterface } from '@app/interfaces/account.interfaces';
import { InstitutionInterface } from '@app/interfaces/institution.interface';

@Injectable({
  providedIn: 'root'
})
export class CredentialBeanService {

  private credentials:CredentialInterface[];
  private accounts:AccountInterface[];
  private institutions:InstitutionInterface[];
  private loadInformation:boolean = true;

  constructor() { }

  public setLoadInformation( data:boolean ){
    this.loadInformation = data;
  }

  public getLoadInformation(): boolean{
    return this.loadInformation;
  }

  public setCredentials( data:CredentialInterface[] ){
    this.credentials = data;
  }

  public getCredentials(): CredentialInterface[] {
    return this.credentials;
  }

  public setAccounts( data:AccountInterface[] ){
    this.accounts = data;
  }

  public getAccounts(): AccountInterface[] {
    return this.accounts;
  }

  public setInstitutions( data:InstitutionInterface[] ){
    this.institutions = data;
  }

  public getInstitutions(): InstitutionInterface[] {
    return this.institutions;
  }

}
