// @angular Modules
import { DebugElement } from                           '@angular/core';
import { By } from                                     '@angular/platform-browser';
// Testing @angular Imports
import { async, ComponentFixture, TestBed } from       '@angular/core/testing';
import { RouterTestingModule } from                    '@angular/router/testing';
// Owns modules, components, sevices
import { RegisterLoginComponent } from './register-login.component';


describe('RegisterLoginComponent', () => {
  let component:    RegisterLoginComponent,
      fixture:      ComponentFixture<RegisterLoginComponent>,
      buttonDe:     DebugElement,
      buttonEl:     DebugElement,
      expectButton;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RegisterLoginComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create @inputs from button', () => {
    buttonDe = fixture.debugElement.query(By.css('#registerLogin'));
    buttonEl = buttonDe.nativeElement;

    expectButton = { link: '/mock', text: 'Mock Button' };
    component.link = expectButton.link;
    component.textBtn = expectButton.text;
  });
});
