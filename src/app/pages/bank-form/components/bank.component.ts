import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FieldService } from '@services/field/field.service';
import { CredentialService } from '@services/credentials/credential.service';
import { Credential } from '@shared/dto/credentials/credential';
import { institutionField } from '@interfaces/institutionField';
import { FinancialInstitution } from '@shared/dto/credentials/financialInstitution';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
  providers: [FieldService]
})
export class BankComponent implements OnInit {

  institutionCode: string;
  institutions: FinancialInstitution[] = [];
  credential: Credential;
  fields: institutionField[];
  showSpinner:boolean = false

  constructor(private field: FieldService, private activated: ActivatedRoute,
    private credentialService: CredentialService, private router: Router) {
    this.fields = [];
  }

  ngOnInit() {
    this.activated.params.subscribe((params: Params) => {
      this.institutionCode = params["bankCode"]
    });
    this.getFields();
    this.credential = new Credential();
  }

  getFields() {
    this.field.findAllFieldsByInstitution(this.institutionCode).subscribe(
      (res: institutionField[]) => {
        res.forEach(fieldBank => {
          this.fields.push(fieldBank);
        });
      }
    );
  }

  submit(form: NgForm) {
    this.showSpinner = true;
    this.credential.username = form.value.username;
    this.credential.password = form.value.password;
    this.credential.securityCode = form.value.sec_code;
    this.credential.institution = this.findCurrentInstitution();

    this.credentialService.createCredential(this.credential).subscribe(
      (res: Credential) => {
        this.router.navigateByUrl("/app/credentials");
        M.toast({
          html:'Recuperando información...',
          displayLength: 3000
        });
      })
  }

  findCurrentInstitution() {
    let currentInstitution: FinancialInstitution;
    let institutionsOnSession = JSON.parse(sessionStorage.getItem("institutions"));
    institutionsOnSession.forEach(element => {
      if (element.code == this.institutionCode) {
        currentInstitution = element;
      }
    });
    return currentInstitution;
  }
}
