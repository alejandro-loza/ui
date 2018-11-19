import { Component, OnInit } from   '@angular/core';

import { MovementsService } from    '@services/services.index';

import { QueryMovements } from      '@classes/queryMovementsDto.class';
import { Movements } from           '@interfaces/movements.interface';

import * as M from                  'materialize-css/dist/js/materialize';
declare const $: any;

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {
  dateList = [];
  scrollLimit: number;
  movementList = {};
  offset = 0;
  charges = true;
  deposit = true;
  duplicates = true;
  deep = true;
  queryMovements: QueryMovements;

  constructor(
    private movementsService: MovementsService,
  ) {}

  ngOnInit() {
    this.getMovements(this.offset);
    this.offsetMovement();
  }

  getMovements(offset: number) {
    this.movementsService.allMovements(offset).subscribe(
      res => {
        this.movementList = res;
        for (const i in res) {
          if (res.hasOwnProperty(i)) {
            const movements: Movements = res[i];
            this.dateList.push(i);
          }
        }
      }, (err: any) => {
        if ( err.status === 401 ) {
          const buttonToast =
            ` <button class="transparent btn-flat white-text" onClick="`+
            `${M.Toast.dismissAll()}` + `var toastElement = document.querySelector('.toast');` +
            `var toastInstance = M.Toast.getInstance(toastElement);  toastInstance.dismiss();"><i class="large material-icons">close</i></button>'`;
          const errorMsg = 'Expiro el token, renovar';
          M.toast({
            html: errorMsg + buttonToast,
            classes: 'purple darken-2'
          });
        } else {
          const buttonToast =
            ` <button class="transparent btn-flat white-text" onClick="`+
            `${M.Toast.dismissAll()}` + `var toastElement = document.querySelector('.toast');` +
            `var toastInstance = M.Toast.getInstance(toastElement);  toastInstance.dismiss();"><i class="large material-icons">close</i></button>'`;
          const errorMsg = 'Ha ocurrido un error en nuestro servidor';
          M.toast({
            html: errorMsg + buttonToast,
            classes: 'red accent-3'
          });
        }
      }, () => {
        $('.spinners .big').hide();
      });
    this.queryMovements = this.movementsService.queryMovements;
    this.offset = this.queryMovements.getOffset;
  }

  offsetMovement() {
    window.addEventListener('scroll', () => {
      const scrollVertical = window.scrollY + 56;
      this.scrollLimit = ($(document).height() - $(window).height());
      if ( scrollVertical >= this.scrollLimit) {
        $('.spinners .big').show();
        this.getMovements(this.offset);
      }
    }, true);
  }
}
