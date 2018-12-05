import { Component, OnInit } from '@angular/core';
import { FieldService } from '@services/field/field.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Credential } from '@shared/dto/credentials/credential';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
  providers : [ FieldService ]
})
export class BankComponent implements OnInit {

  institutionId:string;
  credential:Credential;

  constructor( private field:FieldService, private activated:ActivatedRoute ) { }
 
  ngOnInit() {
    this.activated.params.subscribe((params:Params) => {
      this.institutionId = params["bankCode"]
    });

   this.field.findAllByInstitution( 2 ).subscribe( res => {
     console.log( res );
   });

    /**las instituciones se guradan en el LOcalStorage y aqui no */
  }

}
