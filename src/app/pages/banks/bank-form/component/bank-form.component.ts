import {Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HelpTexts } from '@services/banks/help-texts';

import { FieldService } from '@services/field/field.service';
import { Patterns } from '@services/banks/patterns.service';
import {StatefulInstitutionsService} from '@stateful/institutions/stateful-institutions.service';
import {MethodCredentialService} from '@services/credentials/method-credential/method-credential.service';
import {StatefulInstitutionService} from '@stateful/institution/stateful-institution.service';

import { CreateCredentialInterface } from '@interfaces/credentials/createCredential.interface';
import { InstitutionFieldInterface } from '@interfaces/institutionField';
import { InstitutionInterface } from '@interfaces/institution.interface';

import * as M from 'materialize-css/dist/js/materialize';
import {CleanerService} from '@services/cleaner/cleaner.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: [ './bank-form.component.css' ]
})
export class BankFormComponent implements OnInit, AfterViewInit {
  credential: CreateCredentialInterface;
  institutionField: InstitutionFieldInterface[];
  institution: InstitutionInterface;
  showSpinner: boolean;
  showVideos: boolean
  helpText: string;
  usernameErrorMessage: string;
  passwordErrorMessage: string;

  @ViewChild('modal', { static: false }) elModal: ElementRef;

  constructor(
    private cleanerService: CleanerService,
    private field: FieldService,
    private methodCredential: MethodCredentialService,
    private patterns: Patterns,
    private router: Router,
    private statefulInstitutions: StatefulInstitutionsService,
    private statefulInstitution: StatefulInstitutionService,
    private helpTexts: HelpTexts,
  ) {
    this.institution = this.statefulInstitution.institution;
    this.showSpinner = true;
    this.showVideos  = false;
    this.usernameErrorMessage = '';
    this.passwordErrorMessage = '';
    this.credential = {
      institution: null,
      password: null,
      securityCode: null,
      username: null
    };
  }

  ngOnInit() {
    this.settingTexts();
    this.showvideoBBVA();
    this.getFields();
  }

  ngAfterViewInit() {
    const modal = new M.Modal(this.elModal.nativeElement);
  }

  getFields() {

    this.field.findAllFieldsByInstitution(this.institution.code).subscribe( res => {
        this.institutionField = res.body;
        this.institutionField.forEach(field => this.getErrorMessage(field));
        this.showSpinner = !(this.institutionField.length > 0);
        this.openBBVAModal();
      }
    );

  }

  submit(form: NgForm) {

    this.showSpinner = true;

    this.credential.username = form.value.username;
    this.credential.password = form.value.password;
    this.credential.securityCode = this.getFormattedDate( form.value.sec_code );
    this.credential.institution = this.findCurrentInstitution();

    this.methodCredential.createCredential(this.credential);
    this.cleanerService.cleanAllVariables();

    M.toast({
      html: 'Recuperando información...',
      displayLength: 3000
    });

    setTimeout(() => {
      return this.router.navigate(['/app', 'credentials']);
    }, 1000);

  }

  getFormattedDate( date: string ): string { 

    if ( isNullOrUndefined( date ) ) { return }  

    let newDate = new Date( new Date( date ).getTime() + 
                            new Date( date ).getTimezoneOffset() * 
                            60 * 
                            1000 );
    
    let year = newDate.getFullYear().toString();
    let month = ( newDate.getMonth() + 1 ).toString();
    let day = newDate.getDate().toString();
   
    if ( newDate.getDate() < 10 ) {
      day = "0" + day
    }

    return year + month + day;
  }


  findCurrentInstitution(): InstitutionInterface {
    const institutions = this.statefulInstitutions.institutions;
    return institutions.find(institution => institution.code === this.institution.code);
  }

  getPattern(field: InstitutionFieldInterface): string {
    return this.patterns.getPattern(field, this.institution.code);
  }

  getErrorMessage(field: InstitutionFieldInterface) {
    field.name === 'username'
      ? (this.usernameErrorMessage = this.patterns.getErrorMessage(field, this.institution.code))
      : (this.passwordErrorMessage = this.patterns.getErrorMessage(field, this.institution.code));
  }

  settingTexts() {
    this.helpText = this.helpTexts.getText(this.institution.code);
  }

  showvideoBBVA() {
    if (this.institution.code === 'BBVA') {
      this.showVideos = true;
    }
  }

  openBBVAModal() {
    const instanceModal = M.Modal.getInstance(this.elModal.nativeElement);
    if (this.institution.code === 'BBVA') {
      instanceModal.open();
    }
  }
}
