import { async, ComponentFixture, TestBed } from     '@angular/core/testing';
import { RouterTestingModule } from                  '@angular/router/testing';
import { HttpClientTestingModule } from              '@angular/common/http/testing';
import { MaterializeModule } from                    'ngx-materialize';

import { AuthService, FinerioService } from          '@services/services.index';

import { WelcomeComponent } from                     './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule,
        HttpClientTestingModule,
        MaterializeModule.forRoot()
      ],
      declarations: [
        WelcomeComponent
      ],
      providers: [
        AuthService,
        FinerioService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
