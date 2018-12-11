import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-considerar',
  templateUrl: './considerar.component.html',
  styleUrls: ['./considerar.component.css']
})
export class ConsiderarComponent implements OnInit, OnChanges {
  @Input() switch: boolean;
  @Output() valueConsider: EventEmitter<boolean>;

  @ViewChild('considerar') elementConsiderar: ElementRef;
  @ViewChild('inputSwitch') inputConsiderar: NgModel;

  currentValue: boolean;
  defaultValue: boolean;

  constructor(private renderer: Renderer2) {
    this.valueConsider = new EventEmitter();
  }

  ngOnInit() {
    this.renderer.setProperty(
      this.elementConsiderar.nativeElement,
      'checked',
      this.switch
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    for (const i in changes) {
      if (changes.hasOwnProperty(i)) {
        const element = changes[i];
        this.defaultValue = element.currentValue;
        this.inputConsiderar.valueChanges.subscribe(res => {
          this.currentValue = res;
          if ( this.currentValue !== res ) {
            element.firstChange = true;
          } else {
            element.firstChange = false;
          }
        });
      }
    }
  }

  setConsiderOuput() {
    this.valueConsider.emit(this.currentValue);
  }
}
