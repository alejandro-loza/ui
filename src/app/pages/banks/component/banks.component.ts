import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { StatefulInstitutionsService } from '@stateful/institutions/stateful-institutions.service';

import { InstitutionInterface } from '@interfaces/institution.interface';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: [ './banks.component.css' ]
})
export class BanksComponent implements OnInit, AfterViewInit {
  institutions: InstitutionInterface[];
  @ViewChild('modal', { static: false })
  elModal: ElementRef;

  constructor(private statefulInstitution: StatefulInstitutionsService) {
    this.institutions = [];
  }

  ngOnInit() {
    this.institutions = this.showOnlyActiveBanks();
  }

  showOnlyActiveBanks(): InstitutionInterface[] {
    let institutions = this.statefulInstitution.institutions;
    let banksFiltered: InstitutionInterface[] = [];

    institutions.forEach((bank) => {
      if (bank.status == 'ACTIVE') {
        banksFiltered.push(bank);
      }
    });
    return banksFiltered;
  }

  ngAfterViewInit() {
    const modal = new M.Modal(this.elModal.nativeElement);
  }

  openModal() {
    const instanceModal = M.Modal.getInstance(this.elModal.nativeElement);
    instanceModal.open();
  }
}
