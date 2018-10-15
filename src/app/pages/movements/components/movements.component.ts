import { Component, OnInit } from '@angular/core';
import { MovementsService } from '@services/services.index';
import { Movement } from '@interfaces/movements.interface';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {
  movementList: Movement[] = [];
  constructor(
    private movementsService: MovementsService
  ) { }

  ngOnInit() {
    this.allMovements();
  }

  allMovements() {
    this.movementsService.allMovements().subscribe((res:any) => {
      res.data.forEach((movement: Movement) => {
        this.movementList.push(movement);
      });
    });
  }
}
