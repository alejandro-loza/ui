import { Component, OnInit } from   '@angular/core';

import { MovementsService } from    '@services/services.index';

import { MzToastService } from      'ngx-materialize';
import { QueryMovements } from      '@classes/queryMovementsDto.class';
import { Movement } from            '@interfaces/movements.interface';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})

export class MovementsComponent implements OnInit {
  scrollLimit = 1200;
  movementList = [];
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
    this.getMovements();
    window.addEventListener('scroll', this.scrollFunction, true);
  }

  getMovements() {
    this.movementsService.allMovements(this.offset).subscribe(
      (res: any) => {
        for (const iterator of res.data) {
          this.movementList.push(iterator);
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
        }
      }, () => {
        $('.spinners .big').hide();
      });
    this.queryMovements = this.movementsService.queryMovements;
    this.offset = this.queryMovements.getOffset;
  }

  scrollFunction() {
    const scrollY = window.scrollY;
    if ( scrollY >= this.scrollLimit ) {
      $('.spinners .big').show();
      this.scrollLimit += this.scrollLimit;
      console.log(this.scrollLimit);
      // this.getMovements();
    }else {
      console.log(scrollY);
    }
  }
}
