import { Component, OnInit } from           '@angular/core';
import { SignupService } from               '../../../services/signup/signup.service';
import { Router } from                      '@angular/router';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ SignupService ]
})

export class SignupComponent implements OnInit {

  email:string;
  password:string;
  confirmPassword:string;
  passwordValidate:boolean = true;
  termsAndConditions:boolean = true;
  blog:boolean = true;

  constructor( private _signupService: SignupService,
               private router:Router ) { }

  ngOnInit() {
  	
  }

  signup() {
    this.limpiaErrorSpan();
    if( !isNullOrUndefined(this.email) && !isNullOrUndefined(this.password) ){
      console.log( isNullOrUndefined(this.password) );
      this.passwordMatch();
      if ( this.passwordValidate ) {
        if( this.termsAndConditions ){

          this._signupService.signup(this.password, this.confirmPassword, this.email, this.termsAndConditions, this.blog)
          .subscribe( user => {
             this.router.navigate(['/access/login']);
             
           }, error => {
               let errorMessage = error.error.message;
           
                 $("#errorSpan").html( `${ errorMessage }` ).css({
                   'color':'red',
                   'font-size':'12px'
                 }); 
               
             }   
           );
           
        } else {
          $("#errorSpan").html("Debes aceptar los término y condiciones para continuar").css({
            'color':'red',
            'font-size':'12px'
          });
        }
      } else {
        $("#errorSpan").html("Contraseñas no coinciden").css({
          'color':'red',
          'font-size':'12px'
        });
      }
    } else {
      $("#errorSpan").html("Correo y contraseña son necesarios").css({
        'color':'red',
        'font-size':'12px'
      });
    }
  }

  passwordMatch(){
    this.password == this.confirmPassword ?
      this.passwordValidate = true : 
      this.passwordValidate = false
  }

  limpiaErrorSpan(){
    $("#errorSpan").html("");
  }

}

