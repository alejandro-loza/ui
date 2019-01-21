import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ParamsMovements } from "@interfaces/paramsMovements.interface";

@Component({
  selector: "app-movements",
  templateUrl: "./movements.component.html",
  styleUrls: ["./movements.component.css"]
})
export class MovementsComponent implements OnInit {
  status: boolean;
  paramsMovements: ParamsMovements;
  filterflag: boolean;

  constructor() {
    this.status = false;
    this.filterflag = false;
    this.paramsMovements = {
      charges: true,
      deposits: true,
      duplicates: true
    };
  }

  ngOnInit() {}

  statusMovement(status: boolean) {
    this.status = status;
  }
}
