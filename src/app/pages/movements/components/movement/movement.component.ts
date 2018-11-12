import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {
  @Input() amount: number;
  @Input() considerar: string;
  @Input() description: string;
  @Input() account:string;
  @Input() type: string;
  @Input() bckgrndColor: string;
  @Input() frgrndColor: string;
  @Input() categoryName: string;

  constructor() { }

  ngOnInit() {
  }

}
