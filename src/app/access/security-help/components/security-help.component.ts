import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-security-help',
  templateUrl: './security-help.component.html',
  styleUrls: ['./security-help.component.css']
})
export class SecurityHelpComponent implements OnInit, AfterViewInit {
  @ViewChild('slider') sliderElement: ElementRef;
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const sliderInstance = new M.Slider(this.sliderElement.nativeElement, { interval: 100000 });
    sliderInstance.pause();
  }
}
