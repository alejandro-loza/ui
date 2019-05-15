import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomEventsService {

  constructor() { }

  stopEvents(event: Event) {
    event.stopPropagation();
  }
}
