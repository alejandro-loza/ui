import { Component } from                   '@angular/core';
import { SignupService } from               '../../../services/signup/signup.service';
import { Router } from                      '@angular/router';
import { isNullOrUndefined } from           'util';
import { SignupData } from                  '@shared/dto/signupDto';
import { NgForm } from                      '@angular/forms';
declare const $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ SignupService ]
})

export class SignupComponent {

  passwordValidate:boolean = false;
  
  constructor( private _signupService: SignupService,
               private router:Router ) { }

  signup( SignupForm: NgForm ) {
    console.log(SignupForm.value);
    const data = new SignupData(
      SignupForm.value.email,
      SignupForm.value.password,
      SignupForm.value.confirmPassword,
      SignupForm.value.termsAndConditions,
      SignupForm.value.blog
    );

    this.limpiaErrorSpan();
    if( !isNullOrUndefined(data.email) || !isNullOrUndefined(data.password) ){
      this.passwordMatch( data.password, data.passwordConfirm );

      if ( this.passwordValidate ) {
        if( data.termsAndConditions ){

          this._signupService.signup( data ).subscribe( res => {
            console.log(res);
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

  passwordMatch( password, confirmPassword ){
    password   == confirmPassword ?
      this.passwordValidate = true : 
      this.passwordValidate = false
  }

  limpiaErrorSpan(){
    $("#errorSpan").html("");
  }
}

