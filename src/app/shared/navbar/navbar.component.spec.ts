import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { MaterializeModule } from 'ngx-materialize';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  function createCollapseButton(id: string): void {
    const collapseButton = document.createElement('button');
    collapseButton.setAttribute('id', id);
    document.body.appendChild(collapseButton);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterializeModule.forRoot() ],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    createCollapseButton('btn-collapse-sidenav');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
