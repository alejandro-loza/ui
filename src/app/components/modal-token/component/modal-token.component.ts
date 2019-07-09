import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {StatefulFieldsService} from '@stateful/fields/stateful-fields.service';

@Component({
  selector: 'app-modal-token',
  templateUrl: './modal-token.component.html',
  styleUrls: ['./modal-token.component.css']
})
export class ModalTokenComponent implements OnInit {

  constructor(
    private statefulFields: StatefulFieldsService,
    public dialogRef: MatDialogRef<ModalTokenComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() { }

}
