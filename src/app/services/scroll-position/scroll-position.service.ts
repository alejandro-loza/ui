import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollPositionService {
  private scrollPosition: [number, number];
  constructor() { }

  set scrollPositionValue(position: [number, number]) {
    this.scrollPosition = position;
  }

  get scrollPositionValue(): [number, number] {
    return this.scrollPosition;
  }

}
