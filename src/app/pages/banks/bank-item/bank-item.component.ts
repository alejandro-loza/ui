import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {StatefulInstitutionService} from '@stateful/institution/stateful-institution.service';
import {OauthService} from '@services/oauth/oauth.service';

import {InstitutionInterface} from '@interfaces/institution.interface';

import * as M from 'materialize-css/dist/js/materialize';
import {ToastService} from '@services/toast/toast.service';
import {CleanerService} from '@services/cleaner/cleaner.service';
import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';
import {CredentialService} from '@services/credentials/credential.service';
import {isUndefined} from 'util';
import {AccountService} from '@services/account/account.service';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: [ './bank-item.component.css' ]
})
export class BankItemComponent implements OnInit, AfterViewInit {
  @Input() institution: InstitutionInterface;
  @Output() bankOutOfService: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('tooltip', {static: false}) elementTooltip: ElementRef;

  constructor(
    private route: Router,
    private statefulInstitution: StatefulInstitutionService,
    private statefulCredentialsService: StatefulCredentialsService,
    private statefulCredential: StatefulCredentialService,
    private credentialService: CredentialService,
    private accountService: AccountService,
    private oauthService: OauthService,
    private toastService: ToastService,
    private cleanService: CleanerService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const initTooltip = new M.Tooltip(this.elementTooltip.nativeElement, {
      enterDelay: 0,
      exitDelay: 0,
      outDuration: 0,
      transitionMovement: 0
    });
  }

  institutionClick( institution: InstitutionInterface ) {

    const initTooltip = new M.Tooltip(this.elementTooltip.nativeElement);

    initTooltip.destroy();

    if ( institution.status === 'ACTIVE' ) {

      this.statefulInstitution.institution = institution;

      const auxCredential = this.getCredential( institution );

      if ( auxCredential ) {

        this.statefulCredential.credential = auxCredential;

        return this.route.navigate( [ '/app', 'credentials', auxCredential.id ] );

      }

      if ( institution.code === 'BANREGIO' ) {

        this.validateCredential( institution );

        return;

      }

      return this.route.navigate(['/app', 'banks', institution.code]);

    } else {

      this.bankOutOfService.emit(true);

    }

  }

  private validateCredential( institution: InstitutionInterface ) {

    this.toastService.setCode = 200;
    this.toastService.setMessage = `Estamos conectándonos con ${ institution.name }`;
    this.toastService.toastGeneral();

    this.oauthService.validateCredential( institution ).subscribe(

      res => {

        this.credentialService.getAllCredentials().subscribe();
        this.oauthService.createPopUp( res );

      },
      () => {},
      () => this.cleanService.cleanAllVariables()

    );

  }

  private getCredential ( institution: InstitutionInterface ) {
    return this.statefulCredentialsService.credentials.find( credential => credential.institution.id === institution.id );
  }

}
