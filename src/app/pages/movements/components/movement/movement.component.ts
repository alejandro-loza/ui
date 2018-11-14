import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
// import * as M from 'materialize-css/dist/js/materialize';
@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {
  @Input() amount: number;
  @Input() considerar: string;
  @Input() description: string;
  @Input() account:string;
  @Input() type: string;
  @Input() bckgrndColor: string;
  @Input() frgrndColor: string;
  @Input() categoryName: string;
  @ViewChild('collapsible') elemCollapsible: ElementRef;

  constructor(public renderer: Renderer2) { }

  ngOnInit() {
    const instanceCollapsible = 0;
  }

}
