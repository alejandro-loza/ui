import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SignupService } from '@services/signup/signup.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Signup } from '@app/interfaces/signup.interface';

@Component({
	selector: 'app-referals',
	templateUrl: './referals.component.html',
	styleUrls: [ './referals.component.css' ]
})
export class ReferalsComponent implements OnInit {
	referralCodeModel: string = '';
	termsAccepted: boolean = true;
	password: string = '';
	signupStruct: Signup = {};
	showSpinner: boolean = false;
	signupData: FormGroup = new FormGroup({
		email: new FormControl(),
		blog: new FormControl(true),
		termsAndConditions: new FormControl({ value: true }, Validators.required),
		referralCode: new FormControl({ value: this.referralCodeModel, disabled: true }, Validators.required)
	});

	constructor(private activatedRoute: ActivatedRoute, private signupService: SignupService) {}

	ngOnInit() {
		this.getReferalCode();
	}

	submitAction() {
		this.makeStruct();
		this.signupData.value.termsAndConditions ? this.doRequest() : (this.termsAccepted = false);
	}

	makeStruct() {
		this.signupStruct.blog = this.signupData.value.blog;
		this.signupStruct.email = this.signupData.value.email;
		this.signupStruct.password = this.password;
		this.signupStruct.passwordConfirm = this.password;
		this.signupStruct.referalCode = this.referralCodeModel;
		this.signupStruct.termsAndConditions = this.signupData.value.termsAndConditions;
	}

	doRequest() {
		console.log(this.signupStruct);
		this.signupService.signup(this.signupStruct).subscribe((res) => {
			console.log(res);
		});
	}

	getReferalCode() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.referralCodeModel = params['code'];
		});
	}
}
