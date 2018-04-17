import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../services/services.index';
import { User } from '../../shared/dto/authLoginDot';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  errorMsg: string;

  constructor(
    private router: Router,
    private authService: AuthService) {
      this.errorMsg =  '';
  }

  ngOnInit() {
    this.hoverSocialMedia();
  }

  ingresar(loginForm: NgForm) {
    this.errorMsg = '';

    const usuario = new User(
      loginForm.value.email,
      loginForm.value.password
    );
    this.authService.login( usuario ).subscribe(
      res => {
        this.router.navigate(['/dashboard']); },
      err => {
        console.error( 'Ooops. Houston, we got a trouble', err );
        if ( err.status === 0 ) {
          this.errorMsg = 'Verifique su conexión de internet';
          console.error( 'Error.code.0', err );
        }
        if ( err.status === 401 ) {
          this.errorMsg = 'Sin autorización, comprueba que sean correctos tus datos';
          console.error( 'Error.code.401', err );
        }
      });
  }

  hoverSocialMedia(){
    let btn_facebook = document.querySelector('.btn-facebook');
    let btn_google = document.querySelector('.btn-google-plus');

    btn_facebook.addEventListener('mouseover', this.overFacebook);
    btn_facebook.addEventListener('mouseout', this.outFacebook);
;
    btn_google.addEventListener('mouseover', this.overGoogle);
    btn_google.addEventListener('mouseover', this.outGoogle);
  }

  overFacebook(){
    let btn_facebook_blue = document.querySelector('.icon-facebook-blue');
    let btn_facebook_white = document.querySelector('.icon-facebook-white');

    btn_facebook_white.classList.add("d-none");
    btn_facebook_blue.classList.remove("d-none");
  }

  outFacebook(){
    let btn_facebook_blue = document.querySelector('.icon-facebook-blue');
    let btn_facebook_white = document.querySelector('.icon-facebook-white');

    btn_facebook_blue.classList.add('d-none');
    btn_facebook_white.classList.remove('d-none');
  }

  overGoogle(){
    let btn_google_red = document.querySelector('.icon-google-plus-red');
    let btn_google_white = document.querySelector('.icon-google-plus-white');

    btn_google_white.classList.add('d-none');
    btn_google_red.classList.remove('d-none'); 
  }

  outGoogle(){
    let btn_google_red = document.querySelector('.icon-google-plus-red');
    let btn_google_white = document.querySelector('.icon-google-plus-white');

    btn_google_white.classList.remove('d-none');
    btn_google_red.classList.add('d-none');
  }
}
