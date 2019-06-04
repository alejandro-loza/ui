import { Component, OnInit, OnDestroy } from '@angular/core';

import {fromEvent, interval, Subscription} from 'rxjs';
import {debounce} from 'rxjs/operators';

import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { EmptyStateService } from '@services/movements/empty-state/empty-state.service';
import { ParamsMovementsService } from '@services/movements/params-movements/params-movements.service';
import { DashboardStatesService } from '@services/dashboard/dashboard-states.service';
import {StatefulMovementsService} from '@services/stateful/movements/stateful-movements.service';

import { ParamsMovements } from '@interfaces/paramsMovements.interface';
import { Movement } from '@interfaces/movement.interface';
import * as $ from 'jquery/dist/jquery';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: [ './movements.component.css' ]
})
export class MovementsComponent implements OnInit, OnDestroy {
  movementList: Movement[];
  movementListSize: number;
  spinnerBoolean: boolean;
  isLoading: boolean;
  movementsListReady: boolean;
  movementServiceSubscription: Subscription;
  scrollResult: Subscription;

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
    this.scrollResult = fromEvent(document, 'scroll')
      .pipe(debounce(() => interval(100)))
      .subscribe(() => this.offsetMovement());
  }

  ngOnDestroy() {
    this.dashboardStatesService.setLoadListFromDashboard(false);
    this.dashboardStatesService.setListOfMovementsFromDashboard([]);
    this.scrollResult.unsubscribe();
  }

  offsetMovement() {
    const scrollVertical = window.scrollY;
    let scrollLimit: number;
    scrollLimit = $(document).height() - $(window).height();
    scrollLimit = Math.floor(scrollLimit * .7);
    if (scrollVertical >= scrollLimit && this.movementsListReady) {
      this.getMovements();
    }
  }

  getMovements() {
    this.movementsListReady = false;
    this.movementServiceSubscription = this.movementService.getMovements(this.paramsMovements)
      .subscribe(
        res => {
          this.movementList = [...this.movementList, ...res.body.data];
          this.movementListSize = res.body.data.length;
        },
        err => err,
        () => {
          this.validateAllMovements();
          this.movementsListReady = true;
        }
      );
  }

  validateAllMovements() {
    this.showEmptyState = this.movementList.length <= 0;
    if (this.movementListSize < this.paramsMovements.maxMovements) {
      this.movementServiceSubscription.unsubscribe();
      this.scrollResult.unsubscribe();
      this.statefulMovementsService.setMovements = this.movementList;
      this.spinnerBoolean = false;
      this.isLoading = false;
      return;
    }
    this.isLoading = false;
    this.statefulMovementsService.setMovements = this.movementList;
    this.paramsMovements.offset += this.paramsMovements.maxMovements;
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
