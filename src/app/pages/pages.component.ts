import { Component, OnInit } from '@angular/core';
import { AuthService } from       '@services/auth/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.personalInfo().subscribe(res => res);
  }

}
