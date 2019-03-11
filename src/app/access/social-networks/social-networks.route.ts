import { RouterModule, Routes } from '@angular/router';
import { SocialNetworksComponent } from './component/social-networks.component';

const SocialNetworksRouting: Routes = [
  { path: '', component: SocialNetworksComponent },
  { path: '**', redirectTo: 'login' }
];

export const SocialNetworksRoutes = RouterModule.forChild( SocialNetworksRouting );
