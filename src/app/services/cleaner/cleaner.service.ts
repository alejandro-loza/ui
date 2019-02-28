import { Injectable } from '@angular/core';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';
import { BudgetsBeanService } from '@services/budgets/budgets-bean.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';

@Injectable({
	providedIn: 'root'
})
export class CleanerService {
	constructor(
		private dashboardBean: DashboardBeanService,
		private credentialBeanService: CredentialBeanService,
		private budgetsBeanService: BudgetsBeanService,
		private categoriesBeanService: CategoriesBeanService
	) {}

	cleanAllVariables() {
		// Dashboard Memory
		this.dashboardBean.setDataStackedBar(null);
		this.dashboardBean.setDataBalancePieChart(null);
		this.dashboardBean.setLoadInformation(true);
		this.dashboardBean.setDataIsReady(false);
		this.dashboardBean.setDataExpensesTab(null);
		this.dashboardBean.setDataIncomesBarChart(null);
		this.dashboardBean.setDataIncomesTab(null);
		this.dashboardBean.setShowEmptyState(false);
		// Credentials Memory
		this.credentialBeanService.setCredentials(null);
		this.credentialBeanService.setAccounts(null);
		this.credentialBeanService.setInstitutions(null);
		this.credentialBeanService.setLoadInformation(true);
		// Budgets Memory
		this.budgetsBeanService.setBudgetToViewDetails(null);
		this.budgetsBeanService.setBudgets(null);
		this.budgetsBeanService.setLoadInformation(true);
		this.budgetsBeanService.setShowEmptyStates(false);
		// Categories memory
		this.categoriesBeanService.setCategories(null);
	}
}
