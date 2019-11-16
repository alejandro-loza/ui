import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-account-data-finished',
  templateUrl: './account-data-finished.component.html',
  styleUrls: ['./account-data-finished.component.css']
})
export class AccountDataFinishedComponent implements OnInit {

  @Output() emitClick: EventEmitter<any>;

  constructor() {
    this.emitClick = new EventEmitter();
  }

  ngOnInit() { }

}
