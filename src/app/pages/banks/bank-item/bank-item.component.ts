import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';

import {StatefulInstitutionService} from '@stateful/institution/stateful-institution.service';
import {OauthService} from '@services/oauth/oauth.service';

import { InstitutionInterface } from '@interfaces/institution.interface';

import {ModalAccountSyncComponent} from '@components/modal-account-sync/component/modal-account-sync.component';

import * as M from 'materialize-css/dist/js/materialize';

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
      if ( institution.id === 17 ) {
        // this.oauthService.createCredential( institution );
        this.openDialog();
        return;
      }
      return this.route.navigate(['/app', 'banks', institution.code]);

    } else {

      this.bankOutOfService.emit(true);

    }
  }
  openDialog(event?: Event) {
    let matDialogConfig: MatDialogConfig<any>;
    matDialogConfig = {
      autoFocus: true,
      disableClose: false,
      closeOnNavigation: false,
      restoreFocus: true,
      width: '20%',
      panelClass: 'custom-dialog'
    };
    const matDialogRef = this.matDialog.open(ModalAccountSyncComponent, matDialogConfig);
  }
}
