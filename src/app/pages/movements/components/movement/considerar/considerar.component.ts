import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-considerar',
  templateUrl: './considerar.component.html',
  styleUrls: ['./considerar.component.css']
})
export class ConsiderarComponent implements OnInit {
  @Input () switch: boolean;
  constructor() { }

  ngOnInit() {
  }

}
