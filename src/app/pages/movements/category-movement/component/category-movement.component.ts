import {Component, OnInit, Input} from '@angular/core';

import { Category } from '@interfaces/category.interface';
import { CategoriesService } from '@services/categories/categories.service';
import {CategoriesBeanService} from '@services/categories/categories-bean.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ModalCategoriesComponent} from '@components/modal-categories/component/modal-categories.component';
import {ToastService} from '@services/toast/toast.service';

@Component({
  selector: 'app-category-movement',
  templateUrl: './category-movement.component.html',
  styleUrls: ['./category-movement.component.css']
})
export class CategoryMovementComponent implements OnInit {
  @Input() categoryList: Category[];
  @Input() category: Category;
  @Input() editAvailable: boolean;
  private changeCategory: boolean;

  constructor(
    private categoriesService: CategoriesService,
    private categoriesBeanService: CategoriesBeanService,
    private toastService: ToastService,
    private matDialog: MatDialog
  ) {
    this.changeCategory = false;
  }

  ngOnInit() { }

  setCategory(category: Category) {
    if ( category.id === 'finerio-icon' ) {
      this.categoriesBeanService.setCategory = null;
    } else {
      this.categoriesBeanService.setCategory = category;
    }
  }

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
        categoryList: this.categoryList
      }
    };
    const matDialogRef = this.matDialog.open(ModalCategoriesComponent, matDialogConfig);
    let auxCategory: Category;
    matDialogRef.afterClosed().subscribe(res => {
      if ( res ) {
        auxCategory = res;
        this.changeCategory = true;
      }
    }, err => {
      this.toastService.setCode = err.code;
      if ( err.code === 500 ) {
        const message = 'Ocurrío un error al cambiar la categoría';
        this.toastService.setMessage = message;
      }
      this.toastService.toastGeneral();
    }, () => {
      if ( this.changeCategory ) {
        this.categoriesBeanService.changeCategory.emit(true);
        this.changeCategory = false;
      }
    });
  }
}
