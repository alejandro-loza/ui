// @ts-ignore
import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';
import { InstitutionService } from '@services/institution/institution.service';
import { InstitutionInterface } from '@interfaces/institution.interface';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: [ './banks.component.css' ]
})
export class BanksComponent implements OnInit, AfterViewInit {
  institutions: InstitutionInterface[];
  @ViewChild('modal', {static: false}) elModal: ElementRef;

  constructor(private intitutionService: InstitutionService, private credentialBeanService: CredentialBeanService) {
    this.institutions = [];
  }

  ngOnInit() {
    this.getInstitutions();
  }

  ngAfterViewInit() {
    const modal = new M.Modal(this.elModal.nativeElement);
  }

  openModal() {
    const instanceModal = M.Modal.getInstance(this.elModal.nativeElement);
    instanceModal.open();
  }

  getInstitutions() {
    if (this.credentialBeanService.getInstitutions().length == 0) {
      this.intitutionService.getAllInstitutions().subscribe((res) => {
        res.body.data.forEach((element: InstitutionInterface) => {
          if (element.code !== 'DINERIO') {
            this.institutions.push(element);
          }
        });
        this.credentialBeanService.setInstitutions(this.institutions);
      });
    } else {
      this.institutions = this.credentialBeanService.getInstitutions();
    }
  }
}
