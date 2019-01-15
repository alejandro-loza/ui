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
} from                  '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-consider',
  templateUrl: './consider.component.html',
  styleUrls: ['./consider.component.css']
})
export class ConsiderComponent implements OnInit, OnChanges {
  @Input() consider: boolean;
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
      this.consider
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
          if ( this.currentValue !== res ) {
            element.firstChange = true;
            this.valueConsider.emit(res);
          } else {
            element.firstChange = false;
          }
        });
      }
    }
  }
}
