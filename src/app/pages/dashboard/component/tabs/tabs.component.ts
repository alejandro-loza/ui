import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild, } from '@angular/core';

import * as M from 'materialize-css/dist/js/materialize';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterViewInit {
  @ViewChild('tabs') elementTabs: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const instanceTabs = new M.Tabs(this.elementTabs.nativeElement, {});
  }
}
