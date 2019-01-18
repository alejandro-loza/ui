import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ParamsMovements } from '@interfaces/paramsMovements.interface';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {
  paramsMovements: ParamsMovements;
  filterflag: boolean;

  constructor( ) {
    this.filterflag = false;
    this.paramsMovements = {
      charges: true,
      deposits: true,
      duplicates: true
    };
  }

  ngOnInit() { }
}
