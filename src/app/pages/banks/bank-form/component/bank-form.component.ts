// @ts-ignore
import {Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
// @ts-ignore
import { NgForm } from '@angular/forms';
// @ts-ignore
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HelpTexts } from '../../../../services/banks/help-texts';

import { FieldService } from '@services/field/field.service';
import { CredentialService } from '@services/credentials/credential.service';
import { Patterns } from '@services/banks/patterns.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';

import { CreateCredentialInterface } from '@interfaces/createCredential.interface';
import { InstitutionFieldInterface } from '@interfaces/institutionField';
import { InstitutionInterface } from '@interfaces/institution.interface';

import * as M from 'materialize-css/dist/js/materialize';
import { GTMService } from '@services/google-tag-manager/gtm.service';
import { ConfigService } from '@services/config/config.service';
import {StatefulInstitutionsService} from '@stateful/institutions/stateful-institutions.service';
import {MethodCredentialService} from '@services/credentials/method-credential/method-credential.service';
import {PollingCredentialService} from '@services/credentials/polling-credential/polling-credential.service';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: [ './bank-form.component.css' ]
})
export class BankFormComponent implements OnInit, AfterViewInit {
  institutionCode: string;
  credential: CreateCredentialInterface;
  institutionField: InstitutionFieldInterface[];
  showSpinner: boolean;
  showVideos: boolean = false;
  helpText: string = '';
  usernameErrorMessage: string;
  passwordErrorMessage: string;

  @ViewChild('modal', { static: false })
  elModal: ElementRef;

  constructor(
    private activated: ActivatedRoute,
    private configService: ConfigService,
    private credentialService: CredentialService,
    private field: FieldService,
    private helpTexts: HelpTexts,
    private methodCredential: MethodCredentialService,
    private patterns: Patterns,
    private pollingCredentialService: PollingCredentialService,
    private router: Router,
    private statefulInstitution: StatefulInstitutionsService,
  ) {
    this.institutionCode = '';
    this.institutionField = [];
    this.showSpinner = true;
    this.credential = {
      institution: null,
      password: null,
      securityCode: null,
      username: null
    };
    this.usernameErrorMessage = '';
    this.passwordErrorMessage = '';
  }

  ngOnInit() {
    this.activated.params.subscribe((params: Params) => {
      this.institutionCode = params['bankCode'];
      this.settingTexts();
      this.showvideoBBVA();
    });
  }

  ngAfterViewInit() {
    const modal = new M.Modal(this.elModal.nativeElement);
    (this.statefulInstitution.institutions.length > 0) ? this.getFields() : this.router.navigateByUrl('/app/banks');
  }

  getFields() {
    this.field.findAllFieldsByInstitution(this.institutionCode).subscribe((res) => {
      res.body.forEach((fieldBank: InstitutionFieldInterface) => {
        if (fieldBank.name !== 'sec_code') {
          this.getErrorMessage(fieldBank);
          this.institutionField.push(fieldBank);
        }
      });
      res.body.length > 0 ? (this.showSpinner = false) : null;
      this.openBBVAModal();
    });
  }

  submit(form: NgForm) {
    this.showSpinner = true;
    this.credential.username = form.value.username;
    this.credential.password = form.value.password;
    this.credential.securityCode = form.value.sec_code;
    this.credential.institution = this.findCurrentInstitution();
    this.methodCredential.createCredential(this.credential);
    M.toast({
      html: 'Recuperando información...',
      displayLength: 3000
    });
    return this.router.navigate(['/app', 'credentials']);
  }


  findCurrentInstitution(): InstitutionInterface {
    const institutions = this.statefulInstitution.institutions;
    return institutions.find(institution => institution.code === this.institutionCode);
  }

  getPattern(field: InstitutionFieldInterface): string {
    return this.patterns.getPattern(field, this.institutionCode);
  }

  getErrorMessage(field: InstitutionFieldInterface) {
    field.name == 'username'
      ? (this.usernameErrorMessage = this.patterns.getErrorMessage(field, this.institutionCode))
      : (this.passwordErrorMessage = this.patterns.getErrorMessage(field, this.institutionCode));
  }

  settingTexts() {
    this.helpText = this.helpTexts.getText(this.institutionCode);
  }

  showvideoBBVA() {
    if (this.institutionCode === 'BBVA') {
      this.showVideos = true;
    }
  }

  openBBVAModal() {
    const instanceModal = M.Modal.getInstance(this.elModal.nativeElement);
    if (this.institutionCode === 'BBVA') {
      instanceModal.open();
    }
  }
}
