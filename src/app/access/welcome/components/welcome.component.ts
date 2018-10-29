import { Component, OnInit } from         '@angular/core';
import { Router } from                    '@angular/router';
import { AuthService } from               '@services/services.index';
import { MzToastService } from            'ngx-materialize';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    public toastService: MzToastService
  ) {
    this.authService.personalInfo().subscribe(res => res);
  }

  ngOnInit() {
    $(function () {
      $('img.logo-white').css({
        'display': 'none'
      });
    });
    if ( sessionStorage.getItem('idUser') !== null || sessionStorage.getItem('idUser') !== undefined) {
      setTimeout( () => {
        this.router.navigate(['/app/dashboard']);
      }, 2500);
    } else {
      const message = 'Ocurrió un error al obtener tus datos';
      this.toastService.show(
        message +
        `<button class="transparent btn-flat white-text" onClick="var toastElement = $('.toast').first()[0];
        var toastInstance = toastElement.M_Toast;
        toastInstance.remove();"><i class="large material-icons">close</i></button>`, 2000, 'red accent-3 rounded'
      );
      this.router.navigate(['access/login']);
    }
  }

}
