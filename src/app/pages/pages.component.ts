import { Component, OnInit } from '@angular/core';
import { AuthService } from       '@services/auth/auth.service';
import { ConfigService } from '../services/config/config.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private configservice: ConfigService
  ) {}

  ngOnInit() {
    this.authService.personalInfo()
        .subscribe(
          res => res,
          err => {
            if ( err.status === 401 ) {
              this.configservice.refreshToken();
            }
          }
        );
  }

}
