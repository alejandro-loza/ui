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

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.hoverSocialMedia();
  }

  ingresar(loginForm: NgForm) {
    const usuario = new User(
      loginForm.value.email,
      loginForm.value.password
    );
    this.authService.login( usuario ).subscribe( res => { 
      this.router.navigate(['/dashboard'])
    }), error => {
      console.error('Ha ocurrido un error:', error );
    };
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
