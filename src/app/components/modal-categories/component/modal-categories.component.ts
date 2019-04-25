import {Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {Category} from '@interfaces/category.interface';
import {CategoriesBeanService} from '@services/categories/categories-bean.service';

@Component({
  selector: 'app-modal-categories',
  templateUrl: './modal-categories.component.html',
  styleUrls: ['./modal-categories.component.css']
})
export class ModalCategoriesComponent implements OnInit {
  categoryList: Category[];
  stateCategories: boolean;
  statusCategory: boolean;
  constructor(
    private matDialogRef: MatDialogRef<ModalCategoriesComponent>,
    private categoriesBeanService: CategoriesBeanService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) matDialogData
  ) {
    this.stateCategories = true;
    this.statusCategory = false;
    this.categoryList = matDialogData.categoryList;
  }

  ngOnInit() {}

  close(event: Event) {
    event.stopPropagation();
    this.matDialogRef.close();
  }

  save(flag: boolean) {
    if ( flag ) {
      setTimeout(() => {
        const category: Category = this.categoriesBeanService.getCategory;
        this.matDialogRef.close(category);
      }, 0);
    }
  }

  createCategory() {
    this.matDialogRef.close();
    return this.router.navigate(['app', 'categories', 'workshop', 'new']);
  }
}
