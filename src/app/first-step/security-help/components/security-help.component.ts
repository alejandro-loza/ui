import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountsBeanService} from '@services/account/accounts-bean.service';

@Component({
  selector: 'app-security-help',
  templateUrl: './security-help.component.html',
  styleUrls: ['./security-help.component.css']
})
export class SecurityHelpComponent implements OnInit {
  constructor(
    private router: Router,
    private accountsBeanService: AccountsBeanService
  ) { }

  ngOnInit() { }

  goToApp() {
    if (this.accountsBeanService.getAccounts.length > 1) {
      return this.router.navigate([ '/app', 'dashboard' ]);
    } else {
      return this.router.navigate([ '/app', 'banks' ]);
    }
  }
}
