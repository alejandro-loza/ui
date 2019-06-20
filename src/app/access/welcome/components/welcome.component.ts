import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth/auth.service';
import { ToastService } from '@services/toast/toast.service';
import { AccountService } from '@services/account/account.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';
import { SignupService } from '@services/signup/signup.service';
import {CredentialService} from '@services/credentials/credential.service';
import {ProcessingCredentialsService} from '@services/credentials/background-process/processing-credentials.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: [ './welcome.component.css' ]
})
export class WelcomeComponent implements OnInit, OnDestroy {
  personalInfoUserSubscription: Subscription;
  credentialSubscription: Subscription;
  accountSubscription: Subscription;
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private credentialService: CredentialService,
    private processingCredentials: ProcessingCredentialsService,
    private mixpanelService: MixpanelService,
    private router: Router,
    private renderer: Renderer2,
    private signupService: SignupService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.personalInfoUser();
  }

  ngOnDestroy(): void {
    this.credentialSubscription.unsubscribe();
    this.accountSubscription.unsubscribe();
    this.personalInfoUserSubscription.unsubscribe();
  }

  personalInfoUser() {
    this.personalInfoUserSubscription = this.authService.personalInfo().subscribe(
      (res) => {
        if (res.body.accountLocked === true) {
          this.toastService.setCode = 401;
          this.toastService.setMessage =
            'Tu cuenta fue bloqueada, por favor <br> ponte en contacto con nosotros';
          this.toastService.toastGeneral();
          return this.router.navigate([ 'access/login' ]);
        }
      },
      (err) => {
        this.toastService.setCode = err.status;
        this.toastService.setMessage = 'Ocurrió un error al obtener tus datos';
        this.toastService.toastGeneral();
        return this.router.navigate([ 'access/login' ]);
      },
      () => {
        this.mixpanelEvent();
        this.getCredentials();
        this.getAccount();
      }
    );
  }

  getCredentials() {
    this.credentialSubscription = this.credentialService.getAllCredentials().subscribe(
      res => res,
      err => err,
      () => this.processingCredentials.checkCredentials()
    );
  }

  getAccount() {
    this.accountSubscription = this.accountService.getAccounts().subscribe((res) => {
      setTimeout(() => {
        if (res.body.size > 1) {
          return this.router.navigate([ '/app/dashboard' ]);
        } else {
          return this.router.navigate([ '/access/security' ]);
        }
      }, 2000);
    });
  }

  mixpanelEvent() {
    if (!this.signupService.getComesFromSignup) {
      this.mixpanelService.setIdentify();
      this.mixpanelService.setSuperProperties();
      this.mixpanelService.setPeopleProperties();
      this.mixpanelService.setTrackEvent('Log in', { from: 'Web' });
    }
  }
}
