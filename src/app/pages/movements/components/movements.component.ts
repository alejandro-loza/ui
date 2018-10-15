import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movement } from '@interfaces/movements.interface';

import { MovementsService } from '@services/services.index';

import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {
  movementList: Movement[] = [];
  constructor(
    private movementsService: MovementsService,
    private toastService: MzToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.allMovements();
    $(function() {
      $('.spinners .big').css('animation-duration', '1500ms');
      $('.spinners .big .spinner-layer').css('border-color', '#0091ea');
    });
  }

  allMovements() {
    const errorMsg = 'Su token a expirado';
    this.movementsService.allMovements().subscribe(
      (res: any) => {
        res.data.forEach((movement: Movement) => {
          this.movementList.push(movement);
        });
      },
      (error: any) => {
        if (error.status === 401) {
          this.toastService.show(
            `${errorMsg}` +
              `<button class="transparent btn-flat white-text"
              onClick="var toastElement = $('.toast').first()[0];
              var toastInstance = toastElement.M_Toast;
              toastInstance.remove();">
              <i class="large material-icons">close</i></button>`,
            3000,
            'red accent-3 rounded'
          );
          this.router.navigate(['/access/login']);
        }
      },
      () => {
        $('.spinners').css('display', 'none');
      }
    );
  }
}
