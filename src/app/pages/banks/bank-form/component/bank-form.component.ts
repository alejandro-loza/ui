import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HelpTexts } from '../../../../services/banks/help-texts';

import { FieldService } from '@services/field/field.service';
import { CredentialService } from '@services/credentials/credential.service';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';
import { Patterns } from '@services/banks/patterns.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';

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
	showVideos: boolean = false;
	helpText: string = '';
	usernameErrorMessage: string;
	passwordErrorMessage: string;

	@ViewChild('modal') elModal: ElementRef;

	constructor(
		private field: FieldService,
		private activated: ActivatedRoute,
		private credentialService: CredentialService,
		private router: Router,
		private helpTexts: HelpTexts,
		private patterns: Patterns,
		private credentialBeanService: CredentialBeanService,
		private mixpanelService: MixpanelService
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
		this.initProcess();
	}

	initProcess() {
		const modal = new M.Modal(this.elModal.nativeElement);
		if (this.credentialBeanService.getInstitutions().length > 0) {
			this.getFields();
		} else {
			this.router.navigateByUrl('/app/banks');
		}
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
		this.credentialService.createCredential(this.credential).subscribe((res) => {
			this.credentialBeanService.setLoadInformation(true);
			this.mixpanelEvent();
			this.router.navigateByUrl('/app/credentials');
			M.toast({
				html: 'Recuperando información...',
				displayLength: 3000
			});
		});
	}

	mixpanelEvent() {
		this.mixpanelService.setIdentify();
		this.mixpanelService.setSuperProperties();
		this.mixpanelService.setPeopleProperties();
		this.mixpanelService.setTrackEvent('Create credential', { bank: this.institutionCode });
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

	getPattern(field: InstitutionFieldInterface): string {
		let pattern = this.patterns.getPattern(field, this.institutionCode);
		return pattern;
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
