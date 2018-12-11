import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild, } from     '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-monto',
  templateUrl: './monto.component.html',
  styleUrls: ['./monto.component.css']
})

export class MontoComponent implements OnInit, OnChanges {
  @Input() amount: number;
  @Input() type: string;
  @Output() valueAmount: EventEmitter<number>;

  @ViewChild('monto') elementAmount: ElementRef;
  @ViewChild('signo') elementSigno: ElementRef;
  @ViewChild('inputAmount') inputAmount: NgModel;

  defaultValue: number;
  currentValue: number;

  constructor( private renderer: Renderer2 ) {
    this.valueAmount = new EventEmitter;
  }

  ngOnInit() {
    this.renderer.setStyle(this.elementAmount.nativeElement, 'text-align', 'right');
    this.ingresoGastoColor(this.type);
  }

  ngOnChanges( changes: SimpleChanges ) {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    for (const i in changes) {
      if (changes.hasOwnProperty(i)) {
        const element = changes[i];
        this.defaultValue = element.currentValue;
        this.inputAmount.valueChanges.subscribe( res => {
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

  setAmountOutput() {
    this.valueAmount.emit(this.currentValue);
  }

  ingresoGastoColor(type: string) {
    if ( type === 'DEPOSIT') {
      this.renderer.setStyle(this.elementAmount.nativeElement, 'color', '#4CAF50');
      this.renderer.setStyle(this.elementSigno.nativeElement, 'color', '#4CAF50');
    } else {
      this.renderer.setStyle(this.elementAmount.nativeElement, 'color', '#F44336');
      this.renderer.setStyle(this.elementSigno.nativeElement, 'color', '#F44336');
    }
  }
}
