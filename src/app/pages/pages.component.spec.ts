import { async, ComponentFixture, TestBed } from  '@angular/core/testing';
import { RouterTestingModule } from               '@angular/router/testing';
import { MaterializeModule } from                 'ngx-materialize';
import { SharedModule } from                      '@shared/shared.module';

import { PagesComponent } from                    './pages.component';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        MaterializeModule.forRoot(),
      ],
      declarations: [ PagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
