import {
  Component,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Movement} from '@interfaces/movement.interface';
import {Category} from '@interfaces/category.interface';

import {isNull, isUndefined} from 'util';

import {CategoriesService} from '@services/categories/categories.service';
import {CategoriesBeanService} from '@services/categories/categories-bean.service';
import {MatExpansionPanel} from '@angular/material';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() movementList: Movement[];
  @Input() categoryList: Category[];
  @ViewChild('expansion') expansionElement: MatExpansionPanel;

  private auxMovement: Movement;
  private firstStateMovement: Movement;
  private statusModal: boolean;
  expandedState: boolean;

  index: number;
  keyEnter: boolean;

  constructor(
    private renderer: Renderer2,
    private categoriesService: CategoriesService,
    private categoriesBeanService: CategoriesBeanService
  ) {
    this.keyEnter = false;
    this.statusModal = false;
    this.index = undefined;
    this.expandedState = false;
  }

  ngOnInit(): void { }

  /**
   * @function trackByFn() - La función regresa el _id_ del movimiento, debido a que es un valor único que nos está dando el API, y para el compilador
   * en JIT y/ o AOT mode, es mucho más rápido y eficiente. Si no hubiera el _id_, se recomienda usar el _index_..
   *
   * @param {number} index - Número en el arreglo del movimiento
   * @param {Movement} movement - El movimiento en el indice;
   *
   */
  trackByFn(index: number, movement: Movement): string {
    return movement.id;
  }

  collapsibleFunction(index: number): void {
    /**
     * Se valida si no es undefined _auxMovement_, si no lo es.
     * Entonces su propiedad editAvailable se vuelve falso
     */
    if (!isUndefined(this.auxMovement) && this.statusModal === false) {
      this.auxMovement.editAvailable = false;
    }
    /**
     * Si es undefined _auxMovement_, o el modal está activo
     * se toma el indice actual y se le asigna a la variable auxMovemente.
     *
     * Caso contrario solo se hace un return
     */
    if (isUndefined(this.auxMovement) || this.statusModal === false) {
      this.index = index;
      this.auxMovement = this.movementList[index];
      this.auxMovement.customAmount = this.auxMovement.amount;
    } else {
      return;
    }
    this.auxMovement.editAvailable = true;
  }

  statusCategory(status: boolean): void {
    if (status === true) {
      this.auxMovement.concepts[0].category = this.categoriesBeanService.getCategory;
      this.statusModal = false;
    }
    this.auxMovement.editAvailable = true;
  }

  collapsibleCancel(index: number): void {
    this.movementList[index] = this.firstStateMovement;
    this.movementList[index].editAvailable = false;
    this.keyEnter = false;
  }

  collapsibleClose(index: number): void {
    if ( this.auxMovement.customDescription === '' || this.auxMovement.customDescription === null ) {
      this.auxMovement.customDescription = this.firstStateMovement.customDescription;
    }
    if (isNull(this.auxMovement.customDate)) {
      this.auxMovement.customDate = this.firstStateMovement.date;
    }
    if (isNull(this.auxMovement.amount)) {
      this.auxMovement.amount = this.firstStateMovement.amount;
    }
    this.auxMovement.editAvailable = false;
    this.keyEnter = false;
  }

  deleteMovement(index: number): void {
    this.collapsibleClose(index);
    this.movementList.splice(index, 1);
  }

  editMovement(i) {
    const movement = this.movementList[i];
    if ( movement.editAvailable === true ) {
      movement.editAvailable = false;
      return;
    } else {
      movement.editAvailable = true;
    }
  }
}
