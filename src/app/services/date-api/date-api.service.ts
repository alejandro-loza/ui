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

	formatDateForAllBrowsers(date: string): Date {
		let splitDate: any[] = date.split(/[^0-9]/);

		// splitDate de una fecha de movimiento original queda:
		// splitDate = ["año", "mes", "dia", "hora", "minutos", "segundos", "offset"];

		let validDate: Date = new Date(
			splitDate[0],
			splitDate[1] - 1,
			splitDate[2],
			splitDate[3],
			splitDate[4],
			splitDate[5]
		);
		let offset: number = validDate.getTimezoneOffset() * -1;
		validDate.setTime(validDate.getTime() + offset * 60 * 1000);

		// Condicion para no formatear una fecha ya formateada anteriormente
		return splitDate.length <= 7 ? validDate : new Date(date);
	}
}
