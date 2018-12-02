import { Component,
         ElementRef,
         Input,
         OnInit,
         Renderer2,
         ViewChild,
         Output,
         EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-ingreso-gasto',
  templateUrl: './ingreso-gasto.component.html',
  styleUrls: ['./ingreso-gasto.component.css']
})
export class IngresoGastoComponent implements OnInit {
  @Input() type: string;
  @Output() valueType: EventEmitter<string>;
  @ViewChild('charge') btnCharge: ElementRef;
  @ViewChild('deposit') btnDeposit: ElementRef;

  constructor(private renderer: Renderer2) {
    this.valueType = new EventEmitter();
  }

  ngOnInit() {
  }

  tipoIngresoGasto(type: string) {
    this.type = type;
    this.valueType.emit(this.type);
    if ( type === 'DEPOSIT' ) {
      this.renderer.removeClass(this.btnCharge.nativeElement, 'active');
      this.renderer.addClass(this.btnDeposit.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.btnDeposit.nativeElement, 'active');
      this.renderer.addClass(this.btnCharge.nativeElement, 'active');
    }
  }
}
