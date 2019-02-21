import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { Movement } from '@interfaces/movement.interface';

import * as M from 'materialize-css/dist/js/materialize';
import { isUndefined } from 'util';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, AfterViewInit {
  @Input() movementList: Movement[];
  @Input() categoryList: Category[];
  @ViewChild('collapsible') collapsibleElement: ElementRef;
  private auxMovement: Movement;
  private instanceCollapsible;
  private statusModal: boolean;
  constructor(private renderer: Renderer2) {
    this.statusModal = false;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const initCollapsible = new M.Collapsible(
      this.collapsibleElement.nativeElement,
      {}
    );
    this.instanceCollapsible = M.Collapsible.getInstance(
      this.collapsibleElement.nativeElement
    );
  }

  trackByFn(index: number, movement: Movement) {
    return movement.id;
  }

  collapsibleOpen(index: number) {
    let indexValue: number;
    if (!isUndefined(this.auxMovement)) {
      if (this.statusModal === true) {
        return;
      } else {
        indexValue = index;
        this.auxMovement = this.movementList[indexValue];
      }
      this.auxMovement.editAvailable = false;
    } else {
      indexValue = index;
      this.auxMovement = this.movementList[indexValue];
    }
    this.movementList[indexValue].editAvailable = true;
    this.instanceCollapsible.open(indexValue);
  }

  collapsibleClose(index: number) {
    this.auxMovement.editAvailable = false;
    this.instanceCollapsible.close(index);
  }
}
