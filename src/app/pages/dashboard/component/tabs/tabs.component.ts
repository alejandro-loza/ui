import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter, } from       '@angular/core';

import * as M from 'materialize-css/dist/js/materialize'; 

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterViewInit {
  @Output() tabClicked:EventEmitter<number> = new EventEmitter();
  @ViewChild('tabs') elementTabs: ElementRef;
  titlePage: String;

  constructor( ) {
  
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const instanceTabs = new M.Tabs(this.elementTabs.nativeElement, {});
  }

  onClick( tab:number ){
    this.tabClicked.emit( tab );
  }
}
