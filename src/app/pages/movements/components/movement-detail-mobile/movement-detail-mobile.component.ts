import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movement-detail-mobile',
  templateUrl: './movement-detail-mobile.component.html',
  styleUrls: ['./movement-detail-mobile.component.css']
})
export class MovementDetailMobileComponent implements OnInit {
  @Input() fecha: Date;
  @Input() type: string;
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}
