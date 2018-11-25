import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movement-detail-med-and-up',
  templateUrl: './movement-detail-med-and-up.component.html',
  styleUrls: ['./movement-detail-med-and-up.component.css']
})
export class MovementDetailMedAndUpComponent implements OnInit {
  @Input() fecha: Date;
  @Input() type: string;
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}
