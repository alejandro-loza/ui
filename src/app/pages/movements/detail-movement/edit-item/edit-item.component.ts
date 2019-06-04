import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountInterface} from '@interfaces/account.interfaces';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  @Input() account: AccountInterface;
  @Input() hasManualAccount: boolean;
  @Output() hasManualAccountChange: EventEmitter<boolean>;
  constructor() {
    this.hasManualAccountChange = new EventEmitter();
  }

  ngOnInit() { }
}
