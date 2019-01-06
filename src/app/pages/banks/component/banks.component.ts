import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstitutionService } from '@services/institution/institution.service';
import { InstitutionInterface } from '@interfaces/institution.interface';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {
  institutions: InstitutionInterface[];

  constructor(
    private intitutionService: InstitutionService,
    private route: Router
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
    this.intitutionService.getAllInstitutions().subscribe(res => {
      res.body.data.forEach((element: InstitutionInterface) => {
        if (element.code !== 'DINERIO') {
          this.institutions.push(element);
        }
        console.log(res.body);
      });
    });
  }
}
