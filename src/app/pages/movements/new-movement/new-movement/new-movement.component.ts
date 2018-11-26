import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-movement',
  templateUrl: './new-movement.component.html',
  styleUrls: ['./new-movement.component.css']
})
export class NewMovementComponent implements OnInit {
  date = new Date();
  constructor() { }

  ngOnInit() {
  }

}
