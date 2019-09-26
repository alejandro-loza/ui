import { Injectable } from '@angular/core';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { DashboardStatesService } from '@services/dashboard/dashboard-states.service.ts';
import { BudgetsBeanService } from '@services/budgets/budgets-bean.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { EmptyStateService } from '@services/movements/empty-state/empty-state.service';
import { AccountsBeanService } from '@services/account/accounts-bean.service';
import { StatefulMovementsService } from '@services/stateful/movements/stateful-movements.service';
import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';
import {StatefulAccountService} from '@stateful/account/stateful-account.service';
import {StatefulAccountsService} from '@stateful/accounts/stateful-accounts.service';
import {StatefulInstitutionsService} from '@stateful/institutions/stateful-institutions.service';

@Injectable({
  providedIn: 'root'
})
export class CleanerService {
  constructor(
    private dashboardBean: DashboardBeanService,
    private dashboardStatesService: DashboardStatesService,
    private budgetsBeanService: BudgetsBeanService,
    private categoriesBeanService: CategoriesBeanService,
    private emptyStateService: EmptyStateService,
    private accountsBeanService: AccountsBeanService,
    private statefulAccount: StatefulAccountService,
    private statefulAccounts: StatefulAccountsService,
    private statefulCredential: StatefulCredentialService,
    private statefulCredentials: StatefulCredentialsService,
    private statefulInstitutions: StatefulInstitutionsService,
    private statefulMovements: StatefulMovementsService,
  ) {}

  cleanAllVariables() {

    this.cleanDashboardVariables();

    this.cleanBudgetsVariables();
    // Categories memory
    this.categoriesBeanService.setCategories([]);
    this.categoriesBeanService.setCategoryToViewDetails(null);
    this.categoriesBeanService.setSubcategoryToViewDetails(null);
    // Movements memeory
    this.emptyStateService.setShowEmptyState(false);

    this.cleanCredentialsVariables();

    this.cleanMovements();

    this.cleanAccounts();

    this.cleanCredentials();

  }

  cleanCredentialsVariables() {
    // Manual Accounts memory
    this.accountsBeanService.setManualAccounts = null;
    this.accountsBeanService.setManualAccountToEdit = null;
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

  // Cleans movements data service
  cleanMovements() {
    this.statefulMovements.setMovements = undefined;
    this.statefulMovements.setMovement = undefined;
  }

  // Cleans credentials data service
  cleanCredentials() {
    this.statefulCredentials.credentials = undefined;
    this.statefulCredential.credential = undefined;
  }

  // Cleans institutions data service
  cleanInstitutions() {
    this.statefulInstitutions.institutions = undefined;
  }

  cleanAccounts() {
    this.statefulAccounts.accounts = undefined;
    this.statefulAccounts.manualAccounts = undefined;
    this.statefulAccount.account = undefined;
    this.statefulAccount.manualAccount = undefined;
  }
}
