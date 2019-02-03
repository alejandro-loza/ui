import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Movement } from '@interfaces/movement.interface';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, AfterViewInit {
  @Input() movementList: Movement[];
  @ViewChild('collapsible') collapsibleElement: ElementRef;
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    const initCollapsible = new M.Collapsible(this.collapsibleElement.nativeElement, {});
  }

  trackByFn(index: number, movement: Movement) {
    return movement.id;
  }

}
