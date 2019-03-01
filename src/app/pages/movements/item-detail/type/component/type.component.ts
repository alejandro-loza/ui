import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  @Input() type: string;
  @Output() valueType: EventEmitter<string>;
  @Output() keyEnterPressed: EventEmitter<string>;
  @ViewChild('charge') btnCharge: ElementRef;
  @ViewChild('deposit') btnDeposit: ElementRef;

  constructor(private renderer: Renderer2) {
    this.valueType = new EventEmitter();
    this.keyEnterPressed = new EventEmitter();
  }

  ngOnInit() {}

  tipoIngresoGasto(type: string) {
    this.type = type;
    this.valueType.emit(this.type);
    if (type === 'DEPOSIT') {
      this.renderer.removeClass(this.btnCharge.nativeElement, 'active');
      this.renderer.addClass(this.btnDeposit.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.btnDeposit.nativeElement, 'active');
      this.renderer.addClass(this.btnCharge.nativeElement, 'active');
    }
  }
}
