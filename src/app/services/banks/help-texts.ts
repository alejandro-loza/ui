import { Injectable } from '@angular/core';
import { HelpTextsInterface } from '@app/interfaces/banks/help-texts.interface';

@Injectable({
	providedIn: 'root'
})
export class HelpTexts {
	private texts: HelpTextsInterface[] = [
		{
			institutionCode: 'HSBC',
			text: 'Introduce las claves con las que accedes a tu Banca por internet desde el portal web de HSBC.'
		},
		{
			institutionCode: 'BBVA',
			text: 'Introduce las claves con las que accedes a tu Banca por internet en bancomer.com'
		},
		{
			institutionCode: 'BNMX',
			text: 'Introduce las claves con las que accedes a BancaNet desde el portal web de Citibanamex'
		},
		{
			institutionCode: 'SANTANDER',
			text: 'Introduce las claves con las que accedes a SuperNet desde el portal web de Santander.'
		},
		{
			institutionCode: 'AMEX',
			text:
				'Introduce las claves con las que accedes a tu Banca en Línea desde el portal web de American Express.'
		},
		{
			institutionCode: 'INVEX',
			text: 'Introduce las claves con las que accedes a tu Banca en Línea desde el portal web de Invex Tarjetas.'
		},
		{
			institutionCode: 'SCOTIA',
			text: 'Introduce las claves con las que accedes a ScotiaWeb desde el portal de Scotiabank.'
		},
		{
			institutionCode: 'BAZ',
			text: 'Introduce las claves con las que accedes a tu Banca en Línea desde el portal web de Banco Azteca.'
		},
		{
			institutionCode: 'LIVERPOOL',
			text: 'Introduce las claves con las que accedes a tu Banca en Línea desde el portal web de Liverpool.'
		},
		{
			institutionCode: 'BANCOPPEL',
			text: 'Introduce las claves con las que accedes a tu Banca por internet desde el portal web de Bancoppel.'
		},
		{
			institutionCode: 'BANORTE',
			text: 'Introduce las claves con las que accedes a tu Banca en Línea desde el portal web de Banorte.'
		},
		{
			institutionCode: 'INBURSA',
			text:
				'Introduce las claves con las que accedes a tu perfil de Tarjeta de Crédito Inbursa desde el portal web.'
		}
	];
	constructor() {}

	getText(code: string): string {
		let text: string = '';
		this.texts.forEach((element) => {
			if (element.institutionCode == code) {
				text = element.text;
			}
		});
		return text;
	}
}
