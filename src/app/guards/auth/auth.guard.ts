import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './../../services/auth/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private _authService: AuthService,
		private _router: Router
	){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
  		if (this._authService.isAuth){
  			return true;
  		}
		this._router.navigate(['/access/login']);
		return false;
    }
}
