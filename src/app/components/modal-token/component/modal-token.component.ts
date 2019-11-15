import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { InteractiveFieldService } from '@services/interactive-field/interactive-field.service';
import { CredentialInterface } from '@interfaces/credentials/credential.interface';

@Component({
  selector: 'app-modal-token',
  templateUrl: './modal-token.component.html',
  styleUrls: ['./modal-token.component.css']
})
export class ModalTokenComponent implements OnInit {

  private readonly credential: CredentialInterface;

  constructor(
    public matDialogRef: MatDialogRef<ModalTokenComponent>,
    private interactiveFieldService: InteractiveFieldService,
    @Inject(MAT_DIALOG_DATA) public data: CredentialInterface,
  ) {
    this.credential = data;
  }

  ngOnInit() { }

  sentToken(ngForm: NgForm) {
    this.interactiveFieldService.postToken(this.credential, ngForm.form.value).subscribe();
    this.matDialogRef.close();
  }
}
