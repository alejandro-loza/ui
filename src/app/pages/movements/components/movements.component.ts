import { Component, OnInit } from   '@angular/core';

import { MovementsService } from    '@services/services.index';

import { MzToastService } from      'ngx-materialize';
import { QueryMovements } from      '@classes/queryMovementsDto.class';
import { Movement } from            '@app/shared/interfaces/movement.interface';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {
  dateList: string[] = [];
  scrollLimit: number;
  movementList: any = {};
  offset = 0;
  charges = true;
  deposit = true;
  duplicates = true;
  deep = true;
  queryMovements: QueryMovements;
  constructor(
    private movementsService: MovementsService,
    private toastService: MzToastService,
  ) {}

  ngOnInit() {
    $(function() {
      $('.spinners .big').css('animation-duration', '1500ms');
      $('.spinners .big .spinner-layer').css('border-color', '#0091ea');
    });
    this.getMovements(this.offset);
    window.addEventListener('scroll', () => {
      const scrollVertical = window.scrollY + 56;
      this.scrollLimit = ($(document).height() - $(window).height());
      if ( scrollVertical >= this.scrollLimit) {
        $('.spinners .big').show();
        this.getMovements(this.offset);
      }
    }, true);
  }
  getMovements(offset: number) {
    this.movementsService.allMovements(offset).subscribe(
      res => {
        this.dateList = new Array;
        this.movementList = res;
        for (const i in res) {
          if (res.hasOwnProperty(i)) {
            const movements = res[i];
            this.dateList.push(i);
          }
        }
      }, (err: any) => {
        if ( err.status === 401 ) {
          const errorMsg = 'Datos incorrectos. Comprueba que <br> sean correctos tus datos';
          this.toastService
          .show(
            errorMsg +
            `<button class="transparent btn-flat white-text" onClick="var toastElement = $('.toast').first()[0];
            var toastInstance = toastElement.M_Toast;
            toastInstance.remove();"><i class="large material-icons">close</i></button>`,
            2500, 'orange darken-2 ');
        } else {
          const errorMsg = 'Ha ocurrido un error en nuestro servidor';
          this.toastService
          .show(
            errorMsg +
            `<button class="transparent btn-flat white-text" onClick="var toastElement = $('.toast').first()[0];
            var toastInstance = toastElement.M_Toast;
            toastInstance.remove();"><i class="large material-icons">close</i></button>`,
            2500, 'red accent-3');
            console.error(err);
        }
      }, () => {
        $('.spinners .big').hide();
      });
    this.queryMovements = this.movementsService.queryMovements;
    this.offset = this.queryMovements.getOffset;
  }
}
