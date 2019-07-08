import { Injectable } from '@angular/core';
import {MixpanelService} from '@services/mixpanel/mixpanel.service';
import {GTMService} from '@services/google-tag-manager/gtm.service';
import {ConfigService} from '@services/config/config.service';
import {CredentialInterface} from '@interfaces/credential.interface';
import {isUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class TrackingCredentialService {

  constructor(
    private mixpanel: MixpanelService,
    private googleTagManager: GTMService,
    private configService: ConfigService,
  ) { }

  createCredential( credential: CredentialInterface ) {
    const create = 'Create Credential';
    this.mixpanelEvent(credential, create);
    this.gtmEvent(credential, create);
  }

  editCredential( credential: CredentialInterface ) {
    const update = 'Edit Credential';
    this.mixpanel.setIdentify();
    this.mixpanel.setTrackEvent(update, { bank: credential.institution.code });
  }

  syncingCredential( credential: CredentialInterface ) {

    let event: string;

    if ( credential.status === 'ACTIVE' ) {

      event = 'Successful syncing';

    } else if ( credential.status === 'INVALID' ) {

      event = 'Failed syncing';

    } else if ( credential.status === 'TOKEN' ) {

      this.mixpanel.setIdentify();
      this.mixpanel.setTrackEvent('Introduce token');

    }

    if ( !isUndefined(event) ) {
      this.mixpanelEvent(credential, event);
    }

  }

  private mixpanelEvent( credential: CredentialInterface, event: string ) {
    this.mixpanel.setIdentify();
    this.mixpanel.setSuperProperties();
    this.mixpanel.setPeopleProperties();
    this.mixpanel.setTrackEvent(event, { bank: credential.institution.code });
  }

  private gtmEvent( credential: CredentialInterface, event: string ) {
    const id = this.configService.getUser.id;
    this.googleTagManager.gtmData = {
      event: event,
      id: id.toString(),
      institution: credential.institution.code
    };
    this.googleTagManager.trigger();
  }
}
