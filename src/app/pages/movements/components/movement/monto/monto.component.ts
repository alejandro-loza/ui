import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2} from               '@angular/core';
import { FormControl } from       '@angular/forms';

@Component({
  selector: 'app-monto',
  templateUrl: './monto.component.html',
  styleUrls: ['./monto.component.css']
})
export class MontoComponent implements OnInit {
  @Input() amount: number;
  @Input() type: string;
  @ViewChild('monto') elementAmount: ElementRef;

  montoInput = new FormControl();

  constructor( private renderer: Renderer2) { }

  ngOnInit() {
    if ( this.type === 'DEPOSIT') {
      this.renderer.setStyle(this.elementAmount.nativeElement, 'color', '#4CAF50');
    } else {
      this.renderer.setStyle(this.elementAmount.nativeElement, 'color', '#F44336');
    }
    this.renderer.setStyle(this.elementAmount.nativeElement, 'text-align', 'right');
    this.montoInput.setValue(this.amount);
  }

}
