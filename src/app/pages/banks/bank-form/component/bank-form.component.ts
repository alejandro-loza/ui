import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
	styleUrls: [ './bank-form.component.css' ]
})
export class BankFormComponent implements OnInit {
	institutionCode: string;
	credential: CreateCredentialInterface;
	institutionField: InstitutionFieldInterface[];
	showSpinner: boolean;

	@ViewChild('modal') elModal: ElementRef;

	constructor(
		private field: FieldService,
		private activated: ActivatedRoute,
		private credentialService: CredentialService,
		private router: Router,
		private credentialBeanService: CredentialBeanService
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
	}

	ngOnInit() {
		this.activated.params.subscribe((params: Params) => {
			this.institutionCode = params['bankCode'];
		});
		if (this.credentialBeanService.getInstitutions().length > 0) {
			this.getFields();
		} else {
			this.router.navigateByUrl('/app/banks');
		}
	}

	ngAfterViewInit() {
		const modal = new M.Modal(this.elModal.nativeElement);
		if (this.institutionCode === 'BBVA') {
			this.openBBVAModal();
		}
	}

	getFields() {
		this.field.findAllFieldsByInstitution(this.institutionCode).subscribe((res) => {
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
		this.credentialService.createCredential(this.credential).subscribe((res) => {
			this.credentialBeanService.setLoadInformation(true);
			this.router.navigateByUrl('/app/credentials');
			M.toast({
				html: 'Recuperando información...',
				displayLength: 3000
			});
		});
	}

	findCurrentInstitution() {
		let currentInstitution: InstitutionInterface;
		const institutions = this.credentialBeanService.getInstitutions();
		institutions.forEach((element: InstitutionInterface) => {
			if (element.code == this.institutionCode) {
				currentInstitution = element;
			}
		});
		return currentInstitution;
	}

	openBBVAModal() {
		const instanceModal = M.Modal.getInstance(this.elModal.nativeElement);
		instanceModal.open();
	}
}
