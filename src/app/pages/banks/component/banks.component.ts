import { Component, OnInit } from '@angular/core';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';
import { InstitutionService } from '@services/institution/institution.service';
import { InstitutionInterface } from '@interfaces/institution.interface';

@Component({
	selector: 'app-banks',
	templateUrl: './banks.component.html',
	styleUrls: [ './banks.component.css' ]
})
export class BanksComponent implements OnInit {
	institutions: InstitutionInterface[];

	constructor(private intitutionService: InstitutionService, private credentialBeanService: CredentialBeanService) {
		this.institutions = [];
	}

	ngOnInit() {
		this.getInstitutions();
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
