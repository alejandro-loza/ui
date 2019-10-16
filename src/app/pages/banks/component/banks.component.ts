import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {StatefulInstitutionsService} from '@stateful/institutions/stateful-institutions.service';

import {InstitutionInterface} from '@interfaces/institution.interface';

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
    const institutions = this.statefulInstitution.institutions;
    return institutions.filter(institution => institution.status === 'ACTIVE');
  }

  ngAfterViewInit() {
    const modal = new M.Modal(this.elModal.nativeElement);
  }

  openModal() {
    const instanceModal = M.Modal.getInstance(this.elModal.nativeElement);
    instanceModal.open();
  }
}
