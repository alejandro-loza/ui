import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  @Input() route: string;
  @Input() nombre: string;
  @Input() icon: string;
  constructor() { }

  ngOnInit() {
  }

}
