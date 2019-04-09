import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryWorkshopComponent } from './subcategory-workshop.component';

describe('SubcategoryWorkshopComponent', () => {
  let component: SubcategoryWorkshopComponent;
  let fixture: ComponentFixture<SubcategoryWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
