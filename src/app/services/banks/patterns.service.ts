import { Injectable } from '@angular/core';
import { Pattern } from '@app/interfaces/banks/patterns.interface';
import { InstitutionFieldInterface } from '@app/interfaces/institutionField';

@Injectable({
	providedIn: 'root'
})
export class Patterns {
	usernamePatterns: Pattern[] = [
		{
			institutionCode: 'HSBC',
			pattern: '^[\\w\\W]{6,}$',
			errorMessage: 'Introduce el usuario que definiste con HSBC. Deben ser mínimo 6 letras y números.'
		},
		{
			institutionCode: 'BBVA',
			pattern: '^[0-9]{16,17}$',
			errorMessage: 'Introduce tu número de tarjeta. Deben ser entre 16 y 17 dígitos.'
		},
		{
			institutionCode: 'BNMX',
			pattern: '^[0-9]{6,12}$',
			errorMessage: 'Introduce tu número de cliente. Deben ser de 6 a 12 dígitos.'
		},
		{
			institutionCode: 'SANTANDER',
			pattern: '^[0-9]{8}$|^[0-9]{11}$|^[0-9]{15,16}$',
			errorMessage: 'Introduce tu número de tarjeta, cuenta o cliente. Deben ser de 8 a 16 dígitos.'
		},
		{
			institutionCode: 'AMEX',
			pattern: '^[\\w\\s]{5,}$',
			errorMessage: 'Introduce el usuario que definiste con Amex. Deben ser mínimo 5 letras y números.'
		},
		{
			institutionCode: 'INVEX',
			pattern: '^.+$',
			errorMessage:
				'Introduce tu usuario, es el correo electrónico o nombre de usuario que registraste con Invex.'
		},
		{
			institutionCode: 'SCOTIA',
			pattern: '^[\\w]{8,}$',
			errorMessage: 'Introduce el usuario que definiste con Scotiabank. Deben ser mínimo 8 letras y números.'
		},
		{
			institutionCode: 'BAZ',
			pattern: '^[\\w\\s\\.]{3,}$|^[0-9]{14}$|^[0-9]{16}$',
			errorMessage: 'Introduce tu número de tarjeta o cuenta o tu usuario. Deben ser de 3 a 16 caracteres.'
		},
		{
			institutionCode: 'LIVERPOOL',
			pattern:
				'(?:[a-zA-Z0-9!#$%\\&‘*+/=?\\^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%\\&\'*+/=?\\^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])',
			errorMessage: 'Introduce tu usuario, es el correo electrónico que registraste con Liverpool.'
		},
		{
			institutionCode: 'BANCOPPEL',
			pattern: '^.{8,}$',
			errorMessage: 'Introduce el usuario que definiste con BanCoppel. Deben ser mínimo 8 caracteres.'
		},
		{
			institutionCode: 'BANORTE',
			pattern: '^[\\w\\W]{6,}$',
			errorMessage: 'Introduce el usuario que definiste con Banorte. Deben ser mínimo 6 letras y números.'
		},
		{
			institutionCode: 'INBURSA',
			pattern: '^[\\w\\W]{8,}$',
			errorMessage: 'Introduce el usuario que definiste con Inbursa. Deben ser mínimo 8 letras y números.'
		}
	];

	passwordPatterns: Pattern[] = [
		{
			institutionCode: 'HSBC',
			pattern: '^[\\w\\W]{8,30}$',
			errorMessage: 'Introduce tu contraseña de hsbc.com. Debe contener entre 8 y 30 letras y números.'
		},
		{
			institutionCode: 'BBVA',
			pattern: '^[\\w\\W]{4,}$',
			errorMessage: 'Introduce tu contraseña de bancomer.com. Debe contener mínimo 4 letras y números.'
		},
		{
			institutionCode: 'BNMX',
			pattern: '^[\\w\\W]{7,}$',
			errorMessage: 'Introduce tu contraseña de BancaNet. Debe contener mínimo 7 letras y números.'
		},
		{
			institutionCode: 'SANTANDER',
			pattern: '^[\\w]{8}$',
			errorMessage:
				'Introduce tu contraseña de SuperNet. Debe contener 8 letras y números, sin caracteres especiales.'
		},
		{
			institutionCode: 'AMEX',
			pattern: '^[\\w\\W]{6,20}$',
			errorMessage: 'Introduce tu contraseña de americanexpress.com. Debe contener entre 6 y 20 letras y números.'
		},
		{
			institutionCode: 'INVEX',
			pattern: '^[\\w\\W]{6,14}$',
			errorMessage: 'Introduce tu contraseña de Invex Tarjetas. Debe contener entre 6 y 14 letras y números.'
		},
		{
			institutionCode: 'SCOTIA',
			pattern: '^[\\w\\W]{8,}$',
			errorMessage: 'Introduce tu contraseña de ScotiaWeb. Debe contener mínimo 8 letras y números.'
		},
		{
			institutionCode: 'BAZ',
			pattern: '^[\\w\\W]{6,}$',
			errorMessage: 'Introduce tu contraseña de bancoazteca.com. Debe contener mínimo 6 letras y números.'
		},
		{
			institutionCode: 'LIVERPOOL',
			pattern: '^.{8,}$',
			errorMessage: 'Introduce tu contraseña de Liverpool.com. Debe contener mínimo 8 caracteres.'
		},
		{
			institutionCode: 'BANCOPPEL',
			pattern: '^[\\w\\W]{7,20}$',
			errorMessage: 'Introduce tu contraseña de bancoppel.com. Debe contener entre 7 y 20 letras y números.'
		},
		{
			institutionCode: 'BANORTE',
			pattern: '^[\\w\\W]{8,}$',
			errorMessage: 'Introduce tu contraseña de banorte.com. Debe contener mínimo 8 letras y números.'
		},
		{
			institutionCode: 'INBURSA',
			pattern: '^[\\w\\W]{8,15}$',
			errorMessage: 'Introduce tu contraseña de Crédito Inbursa. Debe contener entre 8 y 15 letras y números.'
		}
	];

	constructor() {}

	getPattern(field: InstitutionFieldInterface, institutionCode: string): string {
		let pattern: string = '';
		field.name == 'username'
			? this.usernamePatterns.forEach((element) => {
					if (element.institutionCode == institutionCode) {
						pattern = element.pattern;
					}
				})
			: this.passwordPatterns.forEach((element) => {
					if (element.institutionCode == institutionCode) {
						pattern = element.pattern;
					}
				});

		return pattern;
	}

	getErrorMessage(field: InstitutionFieldInterface, institutionCode: string): string {
		let message: string = '';
		field.name == 'username'
			? this.usernamePatterns.forEach((element) => {
					if (element.institutionCode == institutionCode) {
						message = element.errorMessage;
					}
				})
			: this.passwordPatterns.forEach((element) => {
					if (element.institutionCode == institutionCode) {
						message = element.errorMessage;
					}
				});
		return message;
	}
}
