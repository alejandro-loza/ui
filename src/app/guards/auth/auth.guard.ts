import { Injectable } from          '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

    canActivate() {
      if ( !this.authService.isAuth() ) {
        this.router.navigate(['/access/login']);
        return false;
      }
      return true;
    }
}
