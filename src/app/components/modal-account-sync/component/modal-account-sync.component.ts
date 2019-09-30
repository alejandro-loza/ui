import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {StatefulInstitutionService} from '@stateful/institution/stateful-institution.service';
import {InstitutionInterface} from '@interfaces/institution.interface';
import {CredentialOauthResponse} from '@interfaces/credentials/oAuth/credential-oauth-response';
import {AccountInterface} from '@interfaces/account.interfaces';

@Component({
  selector: 'app-modal-account-sync',
  templateUrl: './modal-account-sync.component.html',
  styleUrls: ['./modal-account-sync.component.css']
})
export class ModalAccountSyncComponent implements OnInit {

  institution: InstitutionInterface;
  isLoading: boolean;
  credentialOauth: AccountInterface[];

  constructor(
    private matDialogRef: MatDialogRef<ModalAccountSyncComponent>,
    private statefulInstitution: StatefulInstitutionService,
    @Inject(MAT_DIALOG_DATA) matDialogData: AccountInterface[]
  ) {
    this.credentialOauth = matDialogData;
    this.institution = this.statefulInstitution.institution;
    this.isLoading = true;
  }

  ngOnInit() { }

  closeModal() {
    this.matDialogRef.close();
  }

}
