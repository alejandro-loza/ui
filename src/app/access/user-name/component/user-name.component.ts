import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '@services/user/user.service';
import {Router} from '@angular/router';
import {ToastService} from '@services/toast/toast.service';
import {ConfigService} from '@services/config/config.service';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.css']
})
export class UserNameComponent implements OnInit {

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit() { }

  sendName(form: NgForm) {
    this.userService.updateUser(form.form.value).subscribe(
      res => {
        this.toastService.setCode = res.status;
        this.configService.setUser = { ...this.configService.getUser, name: res.body.name };
      },
      () => this.router.navigate(['/access', 'login']),
      () => {
        this.toastService.setMessage = 'Se registró tu nombre';
        this.toastService.toastGeneral();
        return this.router.navigate(['/access', 'adviser']);
      }
    );
  }
}
