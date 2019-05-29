import {
  Component,
  OnInit,
  Input, EventEmitter, Output,
} from '@angular/core';
import { AccountService } from '@services/account/account.service';
import { Movement } from '@interfaces/movement.interface';
import {MovementsService} from '@services/movements/movements.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: [ './item.component.css' ]
})
export class ItemComponent implements OnInit {
  @Input() movement: Movement;
  @Output() editMovement: EventEmitter<void>;

  traditionalImgSrc: string;
  manualAccountImgSrc: string;
  accountWithOutDefaults: string;

  constructor(
    private accountService: AccountService,
    private movementsService: MovementsService
  ) {
    this.editMovement = new EventEmitter();
  }

  ngOnInit() {
    this.accountWithOutDefaults = this.accountService.getManualAccountNatureWithOutDefaults( this.movement.account.type );
    this.manualAccountImgSrc = `assets/media/img/manual_account/${this.accountWithOutDefaults}.svg`;
    this.traditionalImgSrc = `https://cdn.finerio.mx/banks/${this.movement.account.institution.code}_shield.png`;
  }

  onErrorFunc(type: string) {
    this.accountWithOutDefaults = this.accountService.getManualAccountNatureWithOutDefaults(type);
    this.manualAccountImgSrc = `assets/media/img/manual_account/${this.accountWithOutDefaults}.svg`;
  }

  updateMovement(event: Event, movement: Movement) {
    event.stopPropagation();
    movement.duplicated = !movement.duplicated;
    this.movementsService.updateMovement(movement);
  }
}
