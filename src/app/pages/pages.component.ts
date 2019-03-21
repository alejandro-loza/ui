import { Component, OnInit } from '@angular/core';
import {UserIdleService} from 'angular-user-idle';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  constructor( private  userIdleService: UserIdleService) { }

  ngOnInit() { }
