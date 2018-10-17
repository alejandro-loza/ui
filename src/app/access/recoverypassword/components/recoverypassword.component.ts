import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RecoveryService } from '../../../services/recovery-password/recovery.service';

@Component({
  selector: 'app-recoverypassword',
  templateUrl: './recoverypassword.component.html',
  styleUrls: ['./recoverypassword.component.css']
})
export class RecoverypasswordComponent implements OnInit {

  recoveryForm = new FormGroup({
    email : new FormControl("")
  });
  success:boolean = false;
  showErrorMessage:boolean = false;
  iconCheck = "../../../../assets/media/img/recoveryPassIcon/checkCircle.svg";

  constructor( private recovery: RecoveryService ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.recovery.passwordRecovery( this.recoveryForm.value.email  ).subscribe(
      res => {
         console.log("Bien: " + res );
         this.success = true;
      },
      (e) => {
          console.log("error ocurrido: " + e );
          this.showErrorMessage = true;
      }
    );
  }
}
