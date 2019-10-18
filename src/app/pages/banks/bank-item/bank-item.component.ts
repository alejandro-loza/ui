import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {StatefulInstitutionService} from '@stateful/institution/stateful-institution.service';
import {OauthService} from '@services/oauth/oauth.service';

import {InstitutionInterface} from '@interfaces/institution.interface';

import * as M from 'materialize-css/dist/js/materialize';
import {OAuthOptionsModel} from '@model/oAuth/oAuth.options.model';
import {HttpResponse} from '@angular/common/http';
import {CredentialOauth} from '@interfaces/credentials/oAuth/credential-oauth';
import {ToastService} from '@services/toast/toast.service';
import {CleanerService} from '@services/cleaner/cleaner.service';

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

    if (institution.status === 'ACTIVE') {

      this.statefulInstitution.institution = institution;

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

        this.cleanService.cleanAllVariables();
        this.oauthService.createPopUp( res );

      },
      () => {},
      () => this.cleanService.cleanAllVariables()

    );

  }

}
