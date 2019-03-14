import { Injectable } from '@angular/core';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';
import { BudgetsBeanService } from '@services/budgets/budgets-bean.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { EmptyStateService } from '@services/movements/empty-state/empty-state.service';

@Injectable({
  providedIn: 'root'
})
export class CleanerService {
  constructor(
    private dashboardBean: DashboardBeanService,
    private credentialBeanService: CredentialBeanService,
    private budgetsBeanService: BudgetsBeanService,
    private categoriesBeanService: CategoriesBeanService,
    private emptyStateService: EmptyStateService
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
    // Movements memeory
    this.emptyStateService.setShowEmptyState(false);
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
