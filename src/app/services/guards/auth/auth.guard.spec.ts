import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './../../services/auth/auth.service'

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        AuthGuard,
        AuthService
      ]
    });
  });

  it('should ...', async(inject([AuthGuard, AuthService, RouterTestingModule], (guard: AuthGuard, authService: AuthService, router: RouterTestingModule) => {
    expect(guard).toBeTruthy();
  })));
});
