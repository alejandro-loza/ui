import { Component, OnInit } from '@angular/core';
import { FirebaseAnalyticsService } from '@services/firebase/firebase-analytics/firebase-analytics.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  constructor(private firebaseAnalyticsService: FirebaseAnalyticsService, private mixpanel: MixpanelService) {}

  ngOnInit() {
    this.firebaseAnalyticsService.initApplication();
    this.mixpanel.initMixpanel();
  }
}
