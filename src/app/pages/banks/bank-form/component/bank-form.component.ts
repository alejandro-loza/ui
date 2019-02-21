import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FieldService } from '@services/field/field.service';
import { CredentialService } from '@services/credentials/credential.service';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';

import { CreateCredentialInterface } from '@interfaces/createCredential.interface';
import { InstitutionFieldInterface } from '@interfaces/institutionField';
import { InstitutionInterface } from '@interfaces/institution.interface';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent implements OnInit {
  institutionCode: string;
  credential: CreateCredentialInterface;
  institutionField: InstitutionFieldInterface[];
  showSpinner: boolean;

  constructor(
    private field: FieldService,
    private activated: ActivatedRoute,
    private credentialService: CredentialService,
    private router: Router,
    private credentialBeanService:CredentialBeanService
  ) {
    this.institutionField = [];
    this.showSpinner = true;
    this.credential = {
      institution: null,
      password: null,
      securityCode: null,
      username: null
    };
  }

  ngOnInit() {
    if( this.credentialBeanService.getLoadInformation() ){
      this.router.navigateByUrl('/app/credentials');
    } else {
      this.activated.params.subscribe((params: Params) => {
        this.institutionCode = params['bankCode'];
      });
      this.getFields();
    }
  }

  getFields() {
    this.field
      .findAllFieldsByInstitution(this.institutionCode)
      .subscribe(res => {
        res.body.forEach((fieldBank: InstitutionFieldInterface) => {
          this.institutionField.push(fieldBank);
        });
        res.body.length > 0 ? (this.showSpinner = false) : null;
      });
  }

  submit(form: NgForm) {
    this.showSpinner = true;
    this.credential.username = form.value.username;
    this.credential.password = form.value.password;
    this.credential.securityCode = form.value.sec_code;
    this.credential.institution = this.findCurrentInstitution();
    this.credentialService
      .createCredential(this.credential)
      .subscribe( res => {
        this.credentialBeanService.setLoadInformation( true )
        this.router.navigateByUrl('/app/credentials');
        M.toast({
          html: 'Recuperando información...',
          displayLength: 3000
        });
      });
  }

  findCurrentInstitution() {
    let currentInstitution:InstitutionInterface;
    const institutions = this.credentialBeanService.getInstitutions(); 
    institutions.forEach((element: InstitutionInterface) => {
      if (element.code == this.institutionCode) {
        currentInstitution = element;
      }
    });
    return currentInstitution;
  }
}
