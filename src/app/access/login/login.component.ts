import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/services.index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
    this.hoverSocialMedia();
  }

  hoverSocialMedia(){
    
    var btn_facebook = document.querySelector('.btn-facebook');
    var btn_google = document.querySelector('.btn-google-plus');

    btn_facebook.addEventListener("mouseover", this.overFacebook);
    btn_facebook.addEventListener("mouseout", this.outFacebook);

    btn_google.addEventListener("mouseover", this.overGoogle);
    btn_google.addEventListener("mouseout", this.outGoogle);
  }

  overFacebook(){
    var btn_facebook_blue = document.querySelector('.icon-facebook-blue');
    var btn_facebook_white = document.querySelector('.icon-facebook-white');

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
