import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialBeanService } from "@services/credentials/credential-bean.service";
import { InstitutionService } from '@services/institution/institution.service';
import { InstitutionInterface } from '@interfaces/institution.interface';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {
  institutions: InstitutionInterface[];

  constructor(
    private intitutionService: InstitutionService,
    private route: Router,
    private credentialBeanService:CredentialBeanService
  ) {
    this.institutions = [];
  }

  ngOnInit() {
    this.getInstitutions();
  }

  institutionClick(institution: InstitutionInterface) {
    if (institution.status === 'ACTIVE') {
      this.route.navigateByUrl('/app/banks/' + institution.code);
    }
  }

  getInstitutions() {
    if( isNullOrUndefined( this.credentialBeanService.getInstitutions() )){
      this.intitutionService.getAllInstitutions().subscribe(res => {
        res.body.data.forEach((element: InstitutionInterface) => {
          if (element.code !== 'DINERIO') {
            this.institutions.push(element);
          }
        });
      });
    } else {
      this.institutions = this.credentialBeanService.getInstitutions();
    }
  }
}
