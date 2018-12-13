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
  scrollLimit: number;
  instanceCollapsible;
  editMovementFlag: boolean;

  movementsList: Movement[];
  paramsMovements: ParamsMovements;

  constructor(
    public renderer: Renderer2,
    private movementsService: MovementsService,
    private configService: ConfigService,
    private dateApiService: DateApiService,
  ) {
    this.paramsMovements = { charges: true, deep: true, deposits: true, duplicates: true, maxMovements: 35, offset: 0, };
    this.editMovement = {
      amount: 0, balance: 0, customDate: this.dateApiService.dateApi(new Date()), customDescription: '',
      date: this.dateApiService.dateApi(new Date()), description: '', duplicated: false, type: '' };
    this.editMovementFlag = false;
  }

  ngOnInit() {
    this.getMovements(this.paramsMovements);
    this.offsetMovement();
<<<<<<< HEAD
    this.renderer.setStyle(
      this.elSpinner.nativeElement,
      'display',
      'block'
    );
=======
    this.renderer.setStyle(this.elSpinner.nativeElement, 'display', 'block' );
>>>>>>> 7033cf7e0b1ccfe2ec12908800844afca530d3c1
  }

  ngAfterViewInit() {
    const initCollapsible = new M.Collapsible(this.elcollapsible.nativeElement,{});
    this.instanceCollapsible = M.Collapsible.getInstance(this.elcollapsible.nativeElement);
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
          this.renderer.setStyle( this.elSpinner.nativeElement, 'display', 'block' );
          this.getMovements(this.paramsMovements);
        }
      },
      true
    );
    this.renderer.setStyle(this.elSpinner.nativeElement, 'display', 'none');
  }

  collapsibleOpen(index: number) {
    this.instanceCollapsible.destroy();
    this.instanceCollapsible.open(index);

    if ( this.editMovementFlag === false ) {
      this.editMovement = {
        amount: this.movementsList[index].amount,
        balance: this.movementsList[index].balance,
        customDate: this.movementsList[index].customDate.toString(),
        customDescription: this.movementsList[index].customDescription,
        date: this.movementsList[index].date.toString(),
        description: this.movementsList[index].description,
        duplicated: this.movementsList[index].duplicated,
        id: this.movementsList[index].id,
        type: this.movementsList[index].type
      };
    }

    if (this.editMovement.type === '' || this.editMovement.customDescription === '' ) {
      this.editMovement.customDescription = this.movementsList[index].customDescription;
      this.editMovement.description = this.movementsList[index].description;
      this.editMovement.type =  this.movementsList[index].type;
    }
  }

  collapsibleClose(index: number) {
    this.instanceCollapsible.destroy();
    this.instanceCollapsible.close(index);
    this.editMovementFlag = false;
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
    this.editMovementFlag = true;
  }

  editDateMovement(date: Date) {
    this.editMovement.customDate = this.dateApiService.dateApi(date);
    this.editMovementFlag = true;
  }

  editDescriptionMovement(description: string) {
    this.editMovement.customDescription = description;
    this.editMovementFlag = true;
  }

  editAmountMovement(amount: number) {
    this.editMovement.amount = amount;
    this.editMovementFlag = true;
  }

  editDuplicatedMovement(duplicated: boolean) {
    this.editMovement.duplicated = duplicated;
    this.editMovementFlag = true;
  }
}
