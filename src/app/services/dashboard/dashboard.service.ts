import { Injectable } from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { DateApiService } from '@services/date-api/date-api.service';
import { Movement } from '@interfaces/movement.interface';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor( private movementsService:MovementsService, private dateApi:DateApiService ) { }

  getDataForBalanceChart( movements:Movement[] ){
    let firstMonth = new Date( movements[ movements.length - 1 ].customDate );
  }


}
