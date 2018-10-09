import { Component, OnInit } from '@angular/core';
import { MovementsService } from '@services/services.index';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {
  id: string;
  constructor(
    private movementsService: MovementsService
  ) { }

  ngOnInit() {
    this.allMovements();
  }

  allMovements() {
    this.movementsService.allMovements().subscribe(res => console.log('component: ', res));
  }

}
