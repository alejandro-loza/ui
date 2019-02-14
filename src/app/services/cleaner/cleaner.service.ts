import { Injectable } from '@angular/core';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';

@Injectable({
  providedIn: 'root'
})
export class CleanerService {

  constructor( private dashboardBean:DashboardBeanService ) { }

  cleanAllVariables(){
    this.dashboardBean.setDataStackedBar( null );
    this.dashboardBean.setDataBalancePieChart( null );
    this.dashboardBean.setLoadInformation( true );
    this.dashboardBean.setDataIsReady( false );
    this.dashboardBean.setDataExpensesTab( null );
    this.dashboardBean.setDataIncomesBarChart( null );
    this.dashboardBean.setDataIncomesTab( null );
  }
}
