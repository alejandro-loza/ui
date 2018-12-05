import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-considerar',
  templateUrl: './considerar.component.html',
  styleUrls: ['./considerar.component.css']
})
export class ConsiderarComponent implements OnInit {
  @Input () switch: boolean;
  checkboxSwitch = new FormControl();
  constructor() { }

  ngOnInit() {
    this.checkboxSwitch.setValue(this.switch.valueOf() === true);
  }

}
