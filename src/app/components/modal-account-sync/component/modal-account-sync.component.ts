import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StatefulInstitutionService} from '@stateful/institution/stateful-institution.service';
import {InstitutionInterface} from '@interfaces/institution.interface';

@Component({
  selector: 'app-modal-account-sync',
  templateUrl: './modal-account-sync.component.html',
  styleUrls: ['./modal-account-sync.component.css']
})
export class ModalAccountSyncComponent implements OnInit {

  institution: InstitutionInterface;
  isLoading: boolean;
  nameAccount: string;

  constructor(
    private matDialogRef: MatDialogRef<ModalAccountSyncComponent>,
    private statefulInstitution: StatefulInstitutionService,
    @Inject(MAT_DIALOG_DATA) matDialogData
  ) {
    this.institution = this.statefulInstitution.institution;
    this.nameAccount = 'No. de cuenta ** *** *** 099';
    this.isLoading = true;
  }

  ngOnInit() {
    setTimeout( ()  => this.isLoading = false, 4000);
  }

  closeModal() {
    this.matDialogRef.close();
  }

}
