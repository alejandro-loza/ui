import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { Movement } from '@interfaces/movement.interface';

import * as M from 'materialize-css/dist/js/materialize';
import { isNullOrUndefined } from 'util';
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
  constructor() {
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
    this.instanceCollapsible.destroy();
  }

  trackByFn(index: number, movement: Movement) {
    return movement.id;
  }

  collapsibleOpen(index: number) {
    if (!isNullOrUndefined(this.auxMovement)) {
      if (this.statusModal === true) {
        return;
      } else {
        this.auxMovement.editAvailable = false;
      }
    }
    this.auxMovement = this.movementList[index];
    this.auxMovement.editAvailable = true;
    this.instanceCollapsible.open(index);
    this.instanceCollapsible.destroy();
  }

  collapsibleClose(index: number) {
      this.auxMovement.editAvailable = false;
      this.instanceCollapsible.close(index);
      this.instanceCollapsible.destroy();
  }
}
