import { Component, OnInit, OnDestroy } from '@angular/core';

import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { EmptyStateService } from '@services/movements/empty-state/empty-state.service';
import { ParamsMovementsService } from '@services/movements/params-movements/params-movements.service';
import { DashboardStatesService } from '@services/dashboard/dashboard-states.service';
import {StatefulMovementsService} from '@services/stateful/movements/stateful-movements.service';

import { ParamsMovements } from '@interfaces/paramsMovements.interface';
import { Movement } from '@interfaces/movement.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: [ './movements.component.css' ]
})
export class MovementsComponent implements OnInit, OnDestroy {
  movementList: Movement[];

  spinnerBoolean: boolean;
  isLoading: boolean;
  movementsListReady: boolean;
  movementServiceSubscription: Subscription;

  private movementsFromDashboard: boolean;
  // EMPTY STATE
  showEmptyState: boolean;
  imgName: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;

  paramsMovements: ParamsMovements;

  constructor(
    private movementService: MovementsService,
    private emptyStateService: EmptyStateService,
    private toastService: ToastService,
    private paramsMovementsService: ParamsMovementsService,
    private dashboardStatesService: DashboardStatesService,
    private statefulMovementsService: StatefulMovementsService,
  ) {
    this.showEmptyState = false;
    this.isLoading = true;
    this.spinnerBoolean = true;
    this.movementsListReady = true;
    this.movementsFromDashboard = false;
    this.movementList = [];
    this.paramsMovements = {
      charges: true,
      deep: true,
      deposits: true,
      duplicates: true,
      maxMovements: 35,
      offset: 0
    };
  }

  ngOnInit() {
    this.fillInformationForEmptyState();
    if (this.statefulMovementsService.getMovements) {
      this.getMovementsFromStatefulService();
    } else if ( this.dashboardStatesService.getLoadListFromDashboard() ) {
      this.getMovementsFromDashboard();
    } else {
      this.getMovements();
    }
  }

  ngOnDestroy() {
    this.dashboardStatesService.setLoadListFromDashboard(false);
    this.dashboardStatesService.setListOfMovementsFromDashboard([]);
  }

  getMovements() {
    if (this.movementsListReady) {
      this.getMovementFromService();
    }
  }

  getMovementFromService() {
    let index: number;
    this.movementsListReady = false;
    this.movementServiceSubscription = this.movementService.getMovements(this.paramsMovements)
      .subscribe(
        res => {
          this.movementList = this.movementService.getMovementList;
          index = res.body.data.length;
        },
        err => err,
        () => {
          this.showEmptyState = this.movementList.length <= 0;
          if (index < this.paramsMovements.maxMovements) {
            this.movementServiceSubscription.unsubscribe();
            this.spinnerBoolean = false;
            this.isLoading = false;
            this.statefulMovementsService.setMovements = this.movementList;
            return;
          }
          this.isLoading = false;
          this.movementsListReady = true;
          this.paramsMovements.offset += this.paramsMovements.maxMovements;
          this.statefulMovementsService.setMovements = this.movementList;
        }
      );
  }

  getMovementsFromDashboard() {
    this.movementList = this.dashboardStatesService.getListOfMovementsFromDashboard();
    this.showEmptyState = this.movementList.length <= 0;
    this.spinnerBoolean = false;
    this.movementsListReady = false;
    this.isLoading = false;
  }

  getMovementsFromStatefulService() {
    this.movementList = this.statefulMovementsService.getMovements;
    this.showEmptyState = this.movementList.length <= 0;
    this.isLoading = false;
    this.paramsMovements.offset = this.movementList.length;
  }

  refreshMovement() {
    this.paramsMovements = this.paramsMovementsService.getParamsMovements;
    this.paramsMovements.offset = 0;
    this.movementList = [];
    this.getMovements();
  }

  fillInformationForEmptyState() {
    this.imgName = 'transactions';
    this.title = 'No tienes Movimientos';
    this.description =
      'Al dar de alta tus cuentas, verás una lista con todos tus movimientos. Olvídate de registrar cada uno.';
    this.buttonText = 'Dar de alta una cuenta bancaria';
    this.buttonUrl = '/app/banks';
  }
}
