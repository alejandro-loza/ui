import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateApiService {
  private options = {
    day: '2-digit',
    month: 'short'
  };
  constructor() {}

  dateApi(date: Date) {
    const newdate = new Date(date).getDate();
    const datevalue = (Array(2 + 1).join('0') + newdate).slice(-2);

    const dateAPI =
      `${date.getFullYear()}-${date.getMonth() + 1}-${datevalue}T` +
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` +
      this.timezone();

    return dateAPI;
  }

  timezone() {
    const tmzOffset = new Date().getTimezoneOffset() / 60;
    const str = '' + tmzOffset;
    const hour = (Array(2 + 1).join('0') + str).slice(-2);
    const tmz = (tmzOffset > 0 ? '-' : '+') + hour + '00';

    return tmz;
  }

  dateWithFormat(date: Date) {
    const newdate = new Date(date).getDate();
    const datevalue = (Array(2 + 1).join('0') + newdate).slice(-2);
    const dateAPI = `${date.getFullYear()}-${date.getMonth() + 1}-${datevalue}`;

    return dateAPI;
  }

  dateFormatMovement(date: Date) {
    const dateFormat = date;
    const format = new Date(dateFormat)
      .toLocaleDateString(window.navigator.language, this.options)
      .toString()
      .toUpperCase();
    return format;
  }
}
