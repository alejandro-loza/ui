import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  test_data: any;
  constructor(
    private authService: AuthService,
    private router: Router) {}

    canActivate() {
      if( this.authService.isAuth() ) {
        return true;
      } else {
        this.router.navigate(['/access/login']);
        return false;
      }
    }
}
