import {Component, ElementRef, OnInit, ViewChild, Renderer2, AfterViewInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { MovementsService } from '@services/movements/movements.service';
import { AccountService } from '@services/account/account.service';
import { ToastService } from '@services/toast/toast.service';
import { CleanerService } from '@services/cleaner/cleaner.service';
import { CategoriesService } from '@services/categories/categories.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { CategoriesHelperService } from '@services/categories/categories-helper.service';
import {StatefulMovementsService} from '@services/stateful/movements/stateful-movements.service';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalCategoriesComponent } from '@components/modal-categories/component/modal-categories.component';

import { AccountInterface } from '@interfaces/account.interfaces';
import { Category } from '@interfaces/category.interface';
import {Movement} from '@interfaces/movement.interface';

import { isNullOrUndefined } from 'util';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-detail-movement',
  templateUrl: './detail-movement.component.html',
  styleUrls: ['./detail-movement.component.css']
})
export class DetailMovementComponent implements OnInit, AfterViewInit {
  @ViewChild('duplicated') checkboxDuplicate: ElementRef;
  @ViewChild('manualAccountsModal') manualAccountsModal: ElementRef;
  @ViewChild('datepicker') elDatePickker: ElementRef;
  @ViewChild('btnSubmit') buttonSubmit: ElementRef;

  manualAccount: AccountInterface;
  manualAccountNature: string;
  manualAccountName: string;
  disableModalTrigger: boolean = true;

  categoriesList: Category[] = [];

  movement: Movement;
  category: Category;
  date: Date;

  id: string;

  reset: boolean;
  loaderSpinner: boolean = true;
  formatDate: string;
  showSpinner: boolean = true;

  constructor(
    private movementService: MovementsService,
    private cleanerService: CleanerService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private categoriesService: CategoriesService,
    private categoriesHelperService: CategoriesHelperService,
    private matDialog: MatDialog,
    private categoriesBeanService: CategoriesBeanService,
    private statefulMovementService: StatefulMovementsService,

    private renderer: Renderer2,
    private router: Router,
  ) {
    this.formatDate = 'Otro...';
    this.movement = { date: new Date(), type: 'charge' };
    this.activatedRoute.params.subscribe( res =>  this.id = res.id );
    this.date = new Date();
    this.reset = false;
    this.categoriesList = this.categoriesBeanService.getCategories();
  }

  ngOnInit() {
    if (this.id === 'new-movement') {
      this.fillNoPreCat();
    } else {
      this.getMovementForEdit();
    }
  }

  ngAfterViewInit() {
    const modal = new M.Modal(this.manualAccountsModal.nativeElement);
  }

  fillNoPreCat() {
    this.category = {
      color: '#AAAAAA',
      textColor: '#FFFFFF',
      id: null,
      name: 'Sin categoría',
      parent: {
        id: 'finerio-icon'
      }
    };
  }

  // Function called from HTML
  preliminarCategory() {
    const income = this.movement.type === 'INCOME';
    let categoryId: string;
    this.categoriesService.getPreliminarCategory(this.movement.description, income).subscribe((res) => {
      categoryId = res.body.categoryId;
      if (categoryId === undefined) {
        this.fillNoPreCat();
      } else {
        this.getEntireCategory(categoryId);
      }
    });
  }

  getMovementForEdit() {
    this.movement = this.statefulMovementService.getMovement;
    if (this.movement.concepts[0].category) {
      this.category = this.movement.concepts[0].category;
      if (!this.category.parent) {
        this.category.parent = { id: 'userCategory' };
      }
    } else {
      this.fillNoPreCat();
    }
  }

  getEntireCategory(categoryId: string) {
    this.movement.concepts = [{}];
    this.categoriesService.getCategoriesInfo().subscribe((res) => {
      this.categoriesList = res.body;
      this.movement.concepts[0].category = this.categoriesHelperService.getCategoryById(categoryId, res.body);
      this.category = this.movement.concepts[0].category;
      this.category.parent = {
        id: this.categoriesHelperService.getParentCategoryId(this.category.id, res.body)
      };
    });
  }

  submitPorcess(form: NgForm) {
    document.querySelector('#spinner').classList.add('d-block');
    (<HTMLButtonElement>document.querySelector('#submitButton')).disabled = true;

    this.manualAccount === undefined ? this.createMovement(form) : this.createManualAccountMovement();
  }

  createManualAccountMovement() {
    this.movement.concepts = [{}];
    this.movement.concepts[0].category = this.category;
    this.movementService.createManualAccountMovement(this.movement, this.manualAccount.id).subscribe(
      (res) => {
        this.toastService.setCode = res.status;
      },
      (err) => {
        this.toastService.setCode = err.status;
        if (err.status === 401) {
          this.toastService.toastGeneral();
          this.createManualAccountMovement();
        }
        if (err.status === 500) {
          this.toastService.setMessage = '¡Ha ocurrido un error al crear tu movimiento!';
          this.toastService.toastGeneral();
        }
      },
      () => {
        this.cleanerService.cleanAllVariables();
        this.reset = true;
        this.toastService.setMessage = 'Se creó su movimiento exitosamente';
        this.toastService.toastGeneral();
        return this.router.navigateByUrl('/app/movements');
      }
    );
  }

  createMovement(form: NgForm) {
    this.movementService.createMovement(this.movement).subscribe(
      (res) => {
        this.toastService.setCode = res.status;
      },
      (err) => {
        this.toastService.setCode = err.status;
        if (err.status === 401) {
          this.toastService.toastGeneral();
          this.createMovement(form);
        }
        if (err.status === 500) {
          this.toastService.setMessage = '¡Ha ocurrido un error al crear tu movimiento!';
          this.toastService.toastGeneral();
        }
      },
      () => {
        this.cleanerService.cleanAllVariables();
        this.reset = true;
        this.toastService.setMessage = 'Se creó su movimiento exitosamente';
        this.toastService.toastGeneral();
        return this.router.navigateByUrl('/app/movements');
      }
    );
  }

  manualAccountSelected(account: AccountInterface) {
    setTimeout(() => {
      const withoutDefault = isNullOrUndefined(account);
      if (!withoutDefault) {
        this.manualAccount = account;
        this.manualAccountName = this.manualAccount.name;
        this.manualAccountNature = this.accountService.getManualAccountNatureWithOutDefaults(
          this.manualAccount.nature
        );
      } else {
        this.manualAccountName = 'Efectivo';
        this.manualAccountNature = 'ma_cash'; // Just for get the image
      }
      this.loaderSpinner = false;
    }, 500);
  }

  modalManualaccountsTrigger(noManualAccounts: boolean) {
    this.disableModalTrigger = noManualAccounts;
  }

  // function for HTML Buttons
  valueType(id: string) {
    this.renderer.removeClass(document.querySelector('.btn-type.active'), 'active');
    this.renderer.addClass(document.getElementById(id), 'active');
    this.movement.type = id;
  }

  // function for HTML
  changeClassDate(id: string) {
    const auxDate = new Date();
    this.renderer.removeClass(document.querySelector('.btn-date.active'), 'active');
    this.renderer.addClass(document.getElementById(id), 'active');
    if (id === 'yesterdayDate') {
      const newdate = auxDate.getDate() - 1;
      auxDate.setDate(newdate);
    } else if (id === 'otherDate') {
      return;
    }
    this.movement.date = auxDate;
  }

  // Categories process

  openDialog(event: Event) {
    event.stopPropagation();
    let matDialogConfig: MatDialogConfig<any>;
    matDialogConfig = {
      autoFocus: true,
      disableClose: true,
      closeOnNavigation: true,
      restoreFocus: true,
      width: '80%',
      data: {
        categoryList: this.categoriesList
      }
    };
    const matDialogRef = this.matDialog.open(ModalCategoriesComponent, matDialogConfig);
    matDialogRef.afterClosed().subscribe(
      (res) => {
        if (!isNullOrUndefined(res)) {
          this.category = res;
        }
      },
      (err) => {
        this.toastService.setCode = err.code;
        if (err.code === 500) {
          const message = 'Ocurrío un error al cambiar la categoría';
          this.toastService.setMessage = message;
        }
        this.toastService.toastGeneral();
      },
      () => {
        if (!isNullOrUndefined(this.category.userId)) {
          this.category.parent = {
            id: 'userCategory'
          };
        }
      }
    );
  }
}
