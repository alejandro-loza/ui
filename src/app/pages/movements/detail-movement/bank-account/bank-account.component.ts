import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {
  @Input() code: string;
  @Input() name: string;
  constructor() { }

  ngOnInit() {}

}
