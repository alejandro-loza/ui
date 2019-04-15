import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthGuard } from './auth.guard';
import { AuthService, FinerioService } from '../../services.index';

describe('AuthGuard', () => {
  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthGuard,
        AuthService,
        FinerioService
      ]
    }).compileComponents();
  }));

  beforeEach( () => {
    const authGuard = TestBed.get( AuthGuard );
    const authService = TestBed.get( AuthService );
  });

  it('should be Authguard true', async(inject(
    [AuthGuard, AuthService, RouterTestingModule], (guard: AuthGuard, authService: AuthService, router: RouterTestingModule) => {
      expect(guard).toBeTruthy();
  })));
});
