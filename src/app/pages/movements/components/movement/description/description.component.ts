import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2} from         '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  @Input() description: string;
  @ViewChild('descripcion') elementDescription: ElementRef;

  descriptionInput = new FormControl();

  constructor( private renderer: Renderer2 ) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementDescription.nativeElement, 'text-align', 'center');
    this.descriptionInput.setValue(this.description);
  }

}
