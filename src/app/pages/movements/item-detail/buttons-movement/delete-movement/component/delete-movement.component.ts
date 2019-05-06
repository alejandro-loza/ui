import {Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef} from '@angular/core';
import { CleanerService } from '@services/cleaner/cleaner.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ModalDeleteMovementComponent} from '../modal-delete-movement/modal-delete-movement.component';

@Component({
  selector: 'app-delete-movement',
  templateUrl: './delete-movement.component.html',
  styleUrls: [ './delete-movement.component.css' ]
})
export class DeleteMovementComponent implements OnInit {
  @Input() id: string;
  @Output() status: EventEmitter<boolean>;
  @ViewChild('deleteModal') modalElement: ElementRef;

  constructor(
    private cleanerService: CleanerService,
    private matDialog: MatDialog
  ) {
    this.status = new EventEmitter();
  }

  ngOnInit() {}

  openModalDeleteMovement(event: Event) {
    event.stopPropagation();
    let matDialogConfig: MatDialogConfig<any>;
    matDialogConfig = {
      autoFocus: true,
      disableClose: true,
      closeOnNavigation: true,
      restoreFocus: true,
      data: { id: this.id }
    };
    const matDialogRef = this.matDialog.open(ModalDeleteMovementComponent, matDialogConfig);
    matDialogRef.afterClosed().subscribe( res => {
      if ( res ) {
        this.status.emit(res);
      }
    });
  }
}
