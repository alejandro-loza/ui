import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.hoverSocialMedia();
  }

  hoverSocialMedia(){
    /*$('.btn-facebook').hover(function() {
        $('.icon-facebook-blue').removeClass('d-none');
        $('.icon-facebook-white').addClass('d-none');
    }, function() {
        $('.icon-facebook-white').removeClass('d-none');
        $('.icon-facebook-blue').addClass('d-none');
    });

    $('.btn-google').hover(function() {
        $('.icon-google-red').removeClass('d-none');
        $('.icon-google-white').addClass('d-none');
    }, function() {
        $('.icon-google-white').removeClass('d-none');
        $('.icon-google-red').addClass('d-none');
    });*/
    var btn_facebook = document.querySelector('.btn-facebook');
    if(btn_facebook){
      btn_facebook.addEventListener("mouseover", this.overFacebook);
    }
  }

  overFacebook(){
    var btn_facebook_blue = document.querySelector('.icon-facebook-blue');
    var btn_facebook_white = document.querySelector('.icon-facebook-white');
    let flag = false;

    if (flag == false){
      btn_facebook_blue.classList.remove('d-none');
      btn_facebook_white.classList.add('d-none');
      flag = true;
    }else{
      btn_facebook_blue.classList.add('d-none');
      btn_facebook_white.classList.remove('d-none');
      flag = false;
    }
  }

  outFacebook(){
    let btn_facebook_blue = document.querySelector('.icon-facebook-blue');
    let btn_facebook_white = document.querySelector('.icon-facebook-white');
    let flag = true;

    if(btn_facebook_white && btn_facebook_blue && flag == true){
      flag = false;
      btn_facebook_blue.classList.add('d-none');
      btn_facebook_white.classList.remove('d-none');
    }

  }
}
