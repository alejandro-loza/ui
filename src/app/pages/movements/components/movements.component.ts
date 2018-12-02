import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

import { MovementsService } from    '@services/services.index';
import { ConfigService } from       '@services/config/config.service';

import { ParamsMovements } from      '@app/shared/interfaces/paramsMovements.interface';
import { Movement } from            '@interfaces/movement.interface';

import * as M from                  'materialize-css/dist/js/materialize';
declare const $: any;

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit, AfterViewInit {
  @ViewChild('collapsible') elcollapsible: ElementRef;
  @ViewChild('spinner') elSpinner: ElementRef;
  movementsList: Movement[];
  scrollLimit: number;
  navigatorLenguage = navigator.language;
  paramsMovements: ParamsMovements = {
    charges: true,
    deep: true,
    deposits: true,
    duplicates: true,
    offset: 0,
    maxMovements: 35,
  };


  constructor(
    private movementsService: MovementsService,
    private configService: ConfigService,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    this.getMovements(this.paramsMovements);
    this.offsetMovement();
  }

  ngAfterViewInit() {
    const initCollapsible = new M.Collapsible(this.elcollapsible.nativeElement, {});
    const instanceCollapsible = M.Collapsible.getInstance(this.elcollapsible.nativeElement);
  }

  getMovements(paramsMovements: ParamsMovements) {
    this.movementsService.allMovements(paramsMovements).subscribe(
      res => {
        this.movementsList = res;
      },
      (err: any) => {
        if ( err.status === 401 ) {
          this.configService.refreshToken();
          const toastHTML =
            `<span>Hemos actualizado tu sesión, ¡Bienvenido de nuevo!</span>
            <button class="btn-flat toast-action" onClick="
              const toastElement = document.querySelector('.toast');
              const toastInstance = M.Toast.getInstance(toastElement);
              toastInstance.dismiss();">
              <i class="mdi mdi-24px mdi-close grey-text text-lighten-4 right"><i/>
            </button>`;
          M.toast({
            html: toastHTML,
            classes: 'light-blue darken-4',
            displayLength: 2000
          });
        } else {
          console.error(err);
          const toastHTML =
            `<span>¡Ha ocurrido un error al obterner tus movimiento!</span>
            <button class="btn-flat toast-action" onClick="
              const toastElement = document.querySelector('.toast');
              const toastInstance = M.Toast.getInstance(toastElement);
              toastInstance.dismiss();">
            <i class="mdi mdi-24px mdi-close grey-text text-lighten-4 right"><i/>
            </button>`;
          M.toast({
            html: toastHTML,
            classes: 'red darken-4',
            displayLength: 2000
          });
        }
      }, () => {
        this.renderer.setStyle(this.elSpinner.nativeElement, 'display', 'none');
      });
      this.paramsMovements.offset = this.paramsMovements.offset + this.paramsMovements.maxMovements;
  }

  offsetMovement() {
    window.addEventListener('scroll', () => {
      const scrollVertical = window.scrollY;
      this.scrollLimit = ($(document).height() - $(window).height());
      if ( scrollVertical >= this.scrollLimit) {
        this.renderer.setStyle(this.elSpinner.nativeElement, 'display', 'block');
        this.getMovements(this.paramsMovements);
      }
    }, true);
    this.renderer.setStyle(this.elSpinner.nativeElement, 'display', 'none');
  }
}
