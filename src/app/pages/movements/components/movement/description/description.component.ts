import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild, } from     '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit, OnChanges {
  @Input() description: string;
  @ViewChild('descripcion') elementDescription: ElementRef;
  @ViewChild('inputDescription') inputDescription: NgModel;

  constructor( private renderer: Renderer2 ) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementDescription.nativeElement, 'text-align', 'center');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    for (const i in changes) {
      if (changes.hasOwnProperty(i)) {
        const element = changes[i];
        console.log(
          'Current Value:', element.currentValue,
          ',\nFisrt Change: ', element.firstChange,
          ',\nPrevious Value: ', element.previousValue,
          ',\nFirst Change: ', element.isFirstChange());
      }
    }
  }
}
