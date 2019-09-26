import { Injectable } from '@angular/core';
import { Movement } from '@interfaces/movement.interface';
import { StatefulMovementsService } from '@services/stateful/movements/stateful-movements.service';
import { DateApiService } from '@services/date-api/date-api.service';
import { CleanerService } from '@services/cleaner/cleaner.service';

@Injectable({
  providedIn: 'root'
})
export class EditMovementListService {
  private movementList: Movement[];
  private movement: Movement;
  private dateChanged: boolean;
  constructor(
    private statefulMovementsService: StatefulMovementsService,
    private dateApiService: DateApiService,
    private cleanerService: CleanerService
  ) {
    this.dateChanged = false;
  }

  editMovement() {
    this.movement = this.statefulMovementsService.getMovement;
    this.movementList = this.statefulMovementsService.getMovements;

    this.movementList = this.movementList.map((movement) => {

      if (movement.id === this.movement.id) {

        const currentDate = this.dateApiService.formatDateForAllBrowsers(movement.customDate.toString());

        const newDate = this.dateApiService.formatDateForAllBrowsers(this.movement.customDate.toString());

        const currentDateString = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;

        const newDateString = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;

        if (currentDateString !== newDateString) {

          this.dateChanged = true;

          return movement;

        }

        movement = {...this.movement};

      }
      return movement;
    });

    (this.dateChanged) ? this.statefulMovementsService.setMovements = undefined : this.statefulMovementsService.setMovements = this.movementList;

    this.cleanerService.cleanAllVariables();

    this.dateChanged = false;

  }

  deleteMovement() {
    this.movement = this.statefulMovementsService.getMovement;
    this.movementList = this.statefulMovementsService.getMovements;

    this.movementList = this.movementList.filter((movement) => movement.id !== this.movement.id);
    this.statefulMovementsService.setMovements = this.movementList;
    this.cleanerService.cleanDashboardVariables();
    this.cleanerService.cleanBudgetsVariables();
    this.cleanerService.cleanCredentialsVariables();
  }
}
