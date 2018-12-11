import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  Output, } from        '@angular/core';
import { NgModel } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit, OnChanges {
  @Input() description: string;
  @Output() valueDescription: EventEmitter<string>;

  @ViewChild('descripcion') elementDescription: ElementRef;
  @ViewChild('inputDescription') inputDescription: NgModel;

  currentValue: string;
  defaultValue: string;

  constructor( private renderer: Renderer2 ) {
    this.valueDescription = new EventEmitter;
  }

  ngOnInit() {
    this.renderer.setStyle(this.elementDescription.nativeElement, 'text-align', 'center');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    for (const i in changes) {
      if (changes.hasOwnProperty(i)) {
        const element = changes[i];
        this.defaultValue = element.currentValue;
        this.inputDescription.valueChanges.subscribe( res => {
          if ( this.defaultValue !== res ) {
            element.firstChange = false;
            this.currentValue = res;
          } else {
            element.firstChange = true;
          }
        });
      }
    }
  }

  setDescriptionOutput( ) {
    this.valueDescription.emit( this.currentValue );
  }
}
