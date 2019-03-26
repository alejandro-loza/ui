import { async, ComponentFixture, TestBed } from    '@angular/core/testing';
import { RecoverypasswordComponent } from           './recoverypassword.component';
import { HttpClientTestingModule } from             '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from    '@angular/forms';
import { RouterTestingModule } from                 '@angular/router/testing';


describe('RecoverypasswordComponent', () => {
  let component: RecoverypasswordComponent;
  let fixture: ComponentFixture<RecoverypasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ RecoverypasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverypasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
