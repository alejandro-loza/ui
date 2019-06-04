import { Injectable } from '@angular/core';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { DashboardStatesService } from '@services/dashboard/dashboard-states.service.ts';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';
import { BudgetsBeanService } from '@services/budgets/budgets-bean.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { EmptyStateService } from '@services/movements/empty-state/empty-state.service';
import { AccountsBeanService } from '@services/account/accounts-bean.service';
import { StatefulMovementsService } from '@services/stateful/movements/stateful-movements.service';

@Injectable({
	providedIn: 'root'
})
export class CleanerService {
	constructor(
		private dashboardBean: DashboardBeanService,
		private dashboardStatesService: DashboardStatesService,
		private credentialBeanService: CredentialBeanService,
		private budgetsBeanService: BudgetsBeanService,
		private categoriesBeanService: CategoriesBeanService,
		private emptyStateService: EmptyStateService,
		private accountsBeanService: AccountsBeanService,
		private statefulMovementsService: StatefulMovementsService
	) {}

	cleanAllVariables() {
		// Dashboard Memory
		this.dashboardBean.setDataStackedBar([]);
		this.dashboardBean.setDataBalancePieChart([]);
		this.dashboardBean.setLoadInformation(true);
		this.dashboardBean.setDataIsReady(false);
		this.dashboardBean.setDataExpensesTab([]);
		this.dashboardBean.setDataIncomesBarChart([]);
		this.dashboardBean.setDataIncomesTab([]);
		this.dashboardBean.setShowEmptyState(false);
		// Dashboard States
		this.dashboardStatesService.setListOfMovementsFromDashboard([]);
		this.dashboardStatesService.setLoadListFromDashboard(false);
		this.dashboardStatesService.setIndexOfMonthToShow(0);
		this.dashboardStatesService.setLoadClickedScreen(false);
		this.dashboardStatesService.setElementToShowOnClickedScreen({});
		this.dashboardStatesService.setNumberOfTabToReturn(1);
		// Credentials Memory
		this.credentialBeanService.setCredentials([]);
		this.credentialBeanService.setAccounts([]);
		this.credentialBeanService.setInstitutions([]);
		this.credentialBeanService.setLoadInformation(true);
		this.credentialBeanService.setShowEmptyState(false);
		// Budgets Memory
		this.budgetsBeanService.setBudgetToViewDetails(null);
		this.budgetsBeanService.setBudgets([]);
		this.budgetsBeanService.setLoadInformation(true);
		this.budgetsBeanService.setShowEmptyStates(false);
		this.budgetsBeanService.setCategoryToSharedComponent(null);
		// Categories memory
		this.categoriesBeanService.setCategories([]);
		this.categoriesBeanService.setCategoryToViewDetails(null);
		this.categoriesBeanService.setSubcategoryToViewDetails(null);
		// Movements memeory
		this.emptyStateService.setShowEmptyState(false);
		// Manual Accounts memory
		this.accountsBeanService.setManualAccounts = null;
		this.accountsBeanService.setManualAccountToEdit = null;
		// Movements stateful service
		this.statefulMovementsService.setMovements = null;
		this.statefulMovementsService.setMovement = undefined;
	}

	cleanCredentialsVariables() {
		// Credentials Memory
		this.credentialBeanService.setCredentials([]);
		this.credentialBeanService.setAccounts([]);
		this.credentialBeanService.setInstitutions([]);
		this.credentialBeanService.setLoadInformation(true);
		this.credentialBeanService.setShowEmptyState(false);
	}

	cleanDashboardVariables() {
		// Dashboard Memory
		this.dashboardBean.setDataStackedBar([]);
		this.dashboardBean.setDataBalancePieChart([]);
		this.dashboardBean.setLoadInformation(true);
		this.dashboardBean.setDataIsReady(false);
		this.dashboardBean.setDataExpensesTab([]);
		this.dashboardBean.setDataIncomesBarChart([]);
		this.dashboardBean.setDataIncomesTab([]);
		this.dashboardBean.setShowEmptyState(false);
		this.dashboardStatesService.setListOfMovementsFromDashboard([]);
		this.dashboardStatesService.setLoadListFromDashboard(false);
		this.dashboardStatesService.setIndexOfMonthToShow(0);
		this.dashboardStatesService.setLoadClickedScreen(false);
		this.dashboardStatesService.setElementToShowOnClickedScreen({});
		this.dashboardStatesService.setNumberOfTabToReturn(1);
	}

	cleanBudgetsVariables() {
		// Budgets Memory
		this.budgetsBeanService.setBudgetToViewDetails(null);
		this.budgetsBeanService.setBudgets([]);
		this.budgetsBeanService.setLoadInformation(true);
		this.budgetsBeanService.setShowEmptyStates(false);
		this.budgetsBeanService.setCategoryToSharedComponent(null);
	}
}
