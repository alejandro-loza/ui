import { Injectable } from      '@angular/core';
import { ParamsMovements } from '@interfaces/paramsMovements.interface';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  paramsMovements: ParamsMovements;

  constructor() {
    this.paramsMovements = {
      startDate:'',
      endDate: '',
      charges: true,
      deep: true,
      deposits: true,
      duplicates: true,
      maxMovements: 35,
      offset: 0,
    };
  }

  public set setStartDate( startDate:string ){
    this.paramsMovements.startDate = startDate;
  }

  public get getStartDate():string {
    return this.paramsMovements.startDate;
  }

  public set setEndDate( endDate:string ){
    this.paramsMovements.endDate = endDate;
  }

  public get getEndtDate():string {
    return this.paramsMovements.endDate;
  }

  public set setCharges( charges: boolean ) {
    this.paramsMovements.charges = charges;
  }

  public get getCharges(): boolean {
    return this.paramsMovements.charges;
  }

  public set setDeep( deep: boolean ) {
    this.paramsMovements.deep = deep;
  }

  public get getDeep(): boolean {
    return this.paramsMovements.deep;
  }

  public set setDeposits( deposits: boolean ) {
    this.paramsMovements.deposits = deposits;
  }

  public get getDeposits(): boolean {
    return this.paramsMovements.deposits;
  }

  public set setDuplicates( duplicates: boolean ) {
    this.paramsMovements.duplicates = duplicates;
  }

  public get getDuplicates(): boolean {
    return this.paramsMovements.duplicates;
  }

  public set setMaxMovements( maxMovements: number ) {
    this.paramsMovements.maxMovements = maxMovements;
  }

  public get getMaxMovements(): number {
    return this.paramsMovements.maxMovements;
  }

  public set setOffset( offset: number ) {
    this.paramsMovements.offset = offset;
  }

  public get getOffset(): number {
    return this.paramsMovements.offset;
  }
}
