import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from                           '@angular/core';
import { NgModel } from          '@angular/forms';

import { ConfigService } from    '@services/config/config.service';
import { DateApiService } from   '@services/date-api/date-api.service';
import { MovementsService } from '@services/movements/movements.service';

import { Movement } from         '@interfaces/movement.interface';
import { ParamsMovement } from   '@interfaces/paramsMovement.interface';
import { ParamsMovements } from  '@interfaces/paramsMovements.interface';

import * as M from               'materialize-css/dist/js/materialize';

declare const $: any;

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit, AfterViewInit {
  @ViewChild('collapsible') elcollapsible: ElementRef;
  @ViewChild('collapsibleBody') eleCollapsibleBody: ElementRef;
  @ViewChild('spinner') elSpinner: ElementRef;
  @ViewChild('inputDescription') inputDescription: NgModel;

  description: string;
  editMovement: ParamsMovement;
  ingresogasto: string;
  instance: any;
  scrollLimit: number;

  movementsList: Movement[];
  paramsMovements: ParamsMovements = {
    charges: true,
    deep: true,
    deposits: true,
    duplicates: true,
    maxMovements: 35,
    offset: 0,
  };

  constructor(
    public renderer: Renderer2,
    private movementsService: MovementsService,
    private configService: ConfigService,
    private dateApiService: DateApiService,
  ) {}

  ngOnInit() {
    this.getMovements(this.paramsMovements);
    this.offsetMovement();
  }

  ngAfterViewInit() {
    const initCollapsible = new M.Collapsible(this.elcollapsible.nativeElement,{});
    const instanceCollapsible = M.Collapsible.getInstance(this.elcollapsible.nativeElement);
    this.instance = instanceCollapsible;
  }

  getMovements(paramsMovements: ParamsMovements) {
    this.movementsService.getMovements(paramsMovements).subscribe(
      res => {
        this.movementsList = res;
      },
      (err: any) => {
        if (err.status === 401) {
          this.configService.refreshToken();
          const toastHTML = `<span>Hemos actualizado tu sesión, ¡Bienvenido de nuevo!</span>
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
          const toastHTML = `<span>¡Ha ocurrido un error al obterner tus movimiento!</span>
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
      },
      () => {
        this.renderer.setStyle(this.elSpinner.nativeElement, 'display', 'none');
      }
    );
    this.paramsMovements.offset =
      this.paramsMovements.offset + this.paramsMovements.maxMovements;
  }

  offsetMovement() {
    window.addEventListener(
      'scroll',
      () => {
        const scrollVertical = window.scrollY;
        this.scrollLimit = $(document).height() - $(window).height();
        if (scrollVertical >= this.scrollLimit) {
          this.renderer.setStyle(
            this.elSpinner.nativeElement,
            'display',
            'block'
          );
          this.getMovements(this.paramsMovements);
        }
      },
      true
    );
    this.renderer.setStyle(this.elSpinner.nativeElement, 'display', 'none');
  }

  movementActionEmit(flag: boolean) {
    if (flag === true) {
      this.paramsMovements.offset = 0;
      this.movementsList = [];
      this.getMovements(this.paramsMovements);
    }
  }

  movementTypeEmit(type: string) {
    this.ingresogasto = type;
    this.editMovement.type = type;
  }

  editDateMovement(date: Date) {
    this.editMovement.date = this.dateApiService.dateApi(date);
    this.editMovement.customDate = this.dateApiService.dateApi(date);
  }

  editDescriptionMovement(description: string) {
    this.editMovement.description = description;
    this.editMovement.customDescription = description;
  }

  editAmountMovement(amount: number) {
    this.editMovement.amount = amount;
  }

  editDuplicatedMovement(duplicated: boolean) {
    this.editMovement.duplicated = duplicated;
  }
}
