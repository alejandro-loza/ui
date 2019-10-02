import {Component, Input, OnInit} from '@angular/core';
import {AccountInterface} from '@interfaces/account.interfaces';
import {CredentialStatusEnum} from '@interfaces/credentials/oAuth/credential-status.enum';

@Component({
  selector: 'app-account-syncing',
  templateUrl: './account-syncing.component.html',
  styleUrls: ['./account-syncing.component.css']
})
export class AccountSyncingComponent implements OnInit {

  @Input() account: AccountInterface;

  credentialStatusEnum = CredentialStatusEnum;

  constructor() { }

  ngOnInit() {
  }

}
