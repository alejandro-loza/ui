import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {ConfigService} from '@services/config/config.service';
import {ToastService} from '@services/toast/toast.service';
import {AuthService} from '@services/auth/auth.service';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.css']
})
export class SocialNetworksComponent implements OnInit {
  private token: string;
  private type: string;
  private code: string;

  from: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getParamsFromSocialNetwork();
  }

  getParamsFromSocialNetwork() {
    this.activatedRoute.queryParams.subscribe(
      (res: Params) => {
        this.type = res.type;
        this.from = res.from;
        this.token = res.accessToken;
        if (res.finerioCode) {
          this.code = res.finerioCode;
        } else {
          this.loadUser();
        }
      },
      err => {
        this.toastService.setCode = 500;
        this.toastService.setMessage = 'Hubo un error al obtener tus datos';
        this.toastService.toastGeneral();
        this.router.navigate(['/access/login']);
      }
    );
  }

  loadUser() {
    this.configService.setAccessToken = this.token;
    this.router.navigate(['/access/welcome']);
  }
}
