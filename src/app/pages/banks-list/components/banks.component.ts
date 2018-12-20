import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '@services/institution/institution.service';
import { Router } from "@angular/router";
import { FinancialInstitution } from '@shared/dto/credentials/financialInstitution';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css'],
  providers: [ InstitutionService ]
})
export class BanksComponent implements OnInit {
  institutions:FinancialInstitution [] = [];

  constructor( private intitutionService:InstitutionService, private route:Router ) { }

  ngOnInit() {
    this.getInstitutions();
  }   

  institutionClick( institution: FinancialInstitution ){
    if( institution.status == "ACTIVE" ){
      this.route.navigateByUrl( '/app/banks/'+institution.code );
    } 
  }

  getInstitutions(){
    this.intitutionService.getAllInstitutions().subscribe( (res:any) => {
     res.data.forEach(element => {
       element.code != "DINERIO" ?  this.institutions.push( element ) : null
     });
    });
  }

}
