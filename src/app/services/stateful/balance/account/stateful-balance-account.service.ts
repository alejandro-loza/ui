import { Injectable } from '@angular/core';
import {AccountInterface} from '@interfaces/account.interfaces';

@Injectable({
  providedIn: 'root'
})
export class StatefulBalanceAccountService {

  private _activeList: AccountInterface[];
  private _passiveList: AccountInterface[];
  private _investmentList: AccountInterface[];
  private _creditList: AccountInterface[];

  private _active: number;
  private _passive: number;
  private _investment: number;
  private _credit: number;
  private _longTerm: number;
  private _shortTerm: number;
  private _balance: number;

  constructor() {}

  set active(amount: number) {
    this._active = amount;
  }

  get active(): number {
    return this._active;
  }

  set passive(amount: number) {
    this._passive = amount;
  }

  get passive(): number {
    return this._passive;
  }

  set investments(amount: number) {
    this._investment = amount;
  }

  get investments(): number {
    return this._investment;
  }

  set credit(amount: number) {
    this._credit = amount;
  }

  get credit(): number {
    return this._credit;
  }

  set shortTerm(amount: number) {
    this._shortTerm = amount;
  }

  get shortTerm(): number {
    return this._shortTerm;
  }

  set longTerm(amount: number) {
    this._longTerm = amount;
  }

  get longTerm(): number {
    return this._longTerm;
  }

  set balance(amount: number) {
    this._balance = amount;
  }

  get balance(): number {
    return this._balance;
  }

  set activeList(list: AccountInterface[]) {
    this._activeList = list;
  }

  get activeList(): AccountInterface[] {
    return this._activeList;
  }

  set passiveList(list: AccountInterface[]) {
    this._passiveList = list;
  }

  get passiveList(): AccountInterface[] {
    return this._passiveList;
  }

  set investmentList(list: AccountInterface[]) {
    this._investmentList = list;
  }

  get investmentList(): AccountInterface[] {
    return this._investmentList;
  }

  set creditList(list: AccountInterface[]) {
    this._creditList = list;
  }

  get creditList(): AccountInterface[] {
    return this._creditList;
  }
}
