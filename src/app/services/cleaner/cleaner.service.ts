import { Injectable } from '@angular/core';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { CredentialBeanService } from "@services/credentials/credential-bean.service";

@Injectable({
  providedIn: 'root'
})
export class CleanerService {

  constructor( private dashboardBean:DashboardBeanService,
              private credentialBeanService:CredentialBeanService ) { }

  cleanAllVariables(){
    // Dashboard Memory
    this.dashboardBean.setDataStackedBar( null );
    this.dashboardBean.setDataBalancePieChart( null );
    this.dashboardBean.setLoadInformation( true );
    this.dashboardBean.setDataIsReady( false );
    this.dashboardBean.setDataExpensesTab( null );
    this.dashboardBean.setDataIncomesBarChart( null );
    this.dashboardBean.setDataIncomesTab( null );
    this.dashboardBean.setShowEmptyState( false );
    // Credentials Memory
    this.credentialBeanService.setCredentials( null );
    this.credentialBeanService.setAccounts( null );
    this.credentialBeanService.setInstitutions( null );
    this.credentialBeanService.setLoadInformation( true );
  }
}
