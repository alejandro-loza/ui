import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CredentialInterface } from '@app/interfaces/credential.interface';
import { DateApiService } from '@services/date-api/date-api.service';
import {Router} from '@angular/router';
import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';

@Component({
  selector: 'app-credential-item',
  templateUrl: './credential-item.component.html',
  styleUrls: [ './credential-item.component.css' ]
})
export class CredentialItemComponent implements OnInit {
  @Input() credential: CredentialInterface;
  @Output() syncButtonClicked: EventEmitter<CredentialInterface> = new EventEmitter();

  iconText: string = '';
  showButton: boolean = false;
  constructor(
    private dateApiService: DateApiService,
    private statefulCredential: StatefulCredentialService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.selectIconToShow();
    this.showSyncButton();
  }

  showSyncButton() {
    if (this.credential.status === 'INVALID' || this.dateApiService.hasMoreThanEightHours(this.credential.lastUpdated)) {
      this.showButton = true;
    }
  }

  syncButton(event: Event) {
    event.stopPropagation();
    this.showButton = false;
    this.syncButtonClicked.emit(this.credential);
  }

  selectIconToShow() {
    if (this.credential.status == 'ACTIVE') {
      this.iconText = 'verified_user';
    } else if (this.credential.status == 'INVALID') {
      this.iconText = 'report_problem';
    } else {
      this.iconText = 'sync';
    }
  }

  goToDetail( credential: CredentialInterface ) {
    this.statefulCredential.credential = credential;
    this.router.navigate(['/app', 'credentials', credential.id]);
  }
}
