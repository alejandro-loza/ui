import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  @Input() route: string;
  @Input() nombre: string;
  @Input() icon: string;
  @Input() show: boolean;
  @Output() showValue: EventEmitter<boolean>;
  constructor() {
    this.show = false;
    this.showValue = new EventEmitter();
  }

  ngOnInit() {
  }

  showValueEmit() {
    this.showValue.emit(this.show);
  }
}
