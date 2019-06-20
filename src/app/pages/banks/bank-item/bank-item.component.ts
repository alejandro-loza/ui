// @ts-ignore
import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
// @ts-ignore
import { Router } from '@angular/router';
import { InstitutionInterface } from '@interfaces/institution.interface';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: [ './bank-item.component.css' ]
})
export class BankItemComponent implements OnInit, AfterViewInit {
  @Input() institution: InstitutionInterface;
  @Output() bankOutOfService: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('tooltip', {static: false}) elementTooltip: ElementRef;

  constructor(private route: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const initTooltip = new M.Tooltip(this.elementTooltip.nativeElement, {
      enterDelay: 0,
      exitDelay: 0,
      outDuration: 0,
      transitionMovement: 0
    });
  }

  institutionClick(institution: InstitutionInterface) {
    const initTooltip = new M.Tooltip(this.elementTooltip.nativeElement);
    initTooltip.destroy();

    if (institution.status === 'ACTIVE') {
      this.route.navigateByUrl('/app/banks/' + institution.code);
    } else {
      this.bankOutOfService.emit(true);
    }
  }
}
