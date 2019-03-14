import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  @Input() textBtn: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
