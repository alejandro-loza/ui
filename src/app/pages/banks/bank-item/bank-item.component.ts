import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

import {StatefulInstitutionService} from '@stateful/institution/stateful-institution.service';
import {OauthService} from '@services/oauth/oauth.service';

import {InstitutionInterface} from '@interfaces/institution.interface';

import {ModalAccountSyncComponent} from '@components/modal-account-sync/component/modal-account-sync.component';

import * as M from 'materialize-css/dist/js/materialize';
import {OAuthOptionsModel} from '@model/oAuth/oAuth.options.model';
import {CredentialStatusEnum} from '@interfaces/credentials/oAuth/credential-status.enum';
import {isNull} from 'util';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: [ './bank-item.component.css' ]
})
export class BankItemComponent implements OnInit, AfterViewInit {
  @Input() institution: InstitutionInterface;
  @Output() bankOutOfService: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('tooltip', {static: false}) elementTooltip: ElementRef;

  private matDialogRef: MatDialogRef<any>;

  constructor(
    private route: Router,
    private statefulInstitution: StatefulInstitutionService,
    private matDialog: MatDialog,
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

      res => {

        const oAuthOption = new OAuthOptionsModel(res.body.authorizationUri, 'Finerio_/_Connect_With_BanRegio', 'location=0,status=0,centerscreen=1,width=1000,height=1000', res.body);

        const window = this.oauthService.createOAuth( oAuthOption );

        this.oauthService.checkOauth( res.body ).subscribe( auxRes => {

          if ( isNull(auxRes) ) {
            return;
          }

          if ( auxRes.status !== CredentialStatusEnum.VALIDATE ) {
            window.close();
          }

          if ( auxRes.status === CredentialStatusEnum.CREDENTIAL_CONNECT_SUCCESS ) {
            this.openDialog( auxRes );
          }

          if ( this.matDialogRef ) {

            console.log(auxRes);

            this.matDialogRef.componentInstance.credentialOauth = {
              ...this.matDialogRef.componentInstance.credentialOauth,
              auxRes
            };

          }

        });
      });
  }

  private openDialog( data: any ) {
    let matDialogConfig: MatDialogConfig<any>;

    matDialogConfig = {
      autoFocus: true,
      disableClose: false,
      closeOnNavigation: false,
      restoreFocus: true,
      width: '20%',
      panelClass: 'custom-dialog',
      data: data
    };

    if ( !this.matDialogRef ) {
      this.matDialogRef = this.matDialog.open(ModalAccountSyncComponent, matDialogConfig);
    }

  }

}
