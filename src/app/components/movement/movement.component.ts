import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {

  @Input() account: string;
  @Input() date: string;
  @Input() description: string;
  @Input() category: string;
  @Input() amount: string;
  @Input() considerar: string;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
