import {Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal-categories',
  templateUrl: './modal-categories.component.html',
  styleUrls: ['./modal-categories.component.css']
})
export class ModalCategoriesComponent implements OnInit {
  constructor(
    private matDialogRef: MatDialogRef<ModalCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) matDialogData
  ) { }

  ngOnInit() { }
}
