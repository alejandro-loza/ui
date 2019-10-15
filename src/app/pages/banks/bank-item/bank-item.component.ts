import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {StatefulInstitutionService} from '@stateful/institution/stateful-institution.service';
import {OauthService} from '@services/oauth/oauth.service';

import {InstitutionInterface} from '@interfaces/institution.interface';

import * as M from 'materialize-css/dist/js/materialize';
import {OAuthOptionsModel} from '@model/oAuth/oAuth.options.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {CredentialOauth} from '@interfaces/credentials/oAuth/credential-oauth';
import {CredentialUpdateModel} from '@model/credential/credential-update.model';

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

    this.oauthService.validateCredential( institution ).subscribe(

      res => this.createOauth( res ),
      ( error: HttpErrorResponse ) => {

        if ( error.status === 400 ) {

          // const oAuthCredential: CredentialUpdateModel = new CredentialUpdateModel();

        }

      });
  }

  private createOauth( res: HttpResponse<CredentialOauth> ) {

    const oAuthOption = new OAuthOptionsModel(res.body.authorizationUri, 'Finerio_/_Connect_With_BanRegio', 'location=0,status=0,centerscreen=1,width=1000,height=1000', res.body);

    const window = this.oauthService.createOAuth( oAuthOption );

    this.oauthService.checkOauth( res.body ).subscribe(
      auxRes => this.oauthService.statesOauth( auxRes, window ) );
  }

}
