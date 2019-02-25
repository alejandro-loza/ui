import { Injectable } from '@angular/core';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { Movement } from '@interfaces/movement.interface';
import { Category } from '@interfaces/category.interface';
import { isNullOrUndefined } from 'util';
import { StackedBar } from '@app/interfaces/dashboard/dashboardStackedBar.interface';
import { monthMovement } from '@app/interfaces/dashboard/monthMovement.interface';
import { BalancePieChart } from '@app/interfaces/dashboard/BalancePieChart.interface';
import { MonthMovementArray } from '@app/interfaces/dashboard/monthMovementArray.interface';
import { BarChart } from '@app/interfaces/dashboard/BarChart.interface';
import { MonthMovements } from '@app/interfaces/dashboard/monthMovements.interface';
import { ResumeMainData } from '@app/interfaces/dashboard/resumeMainData.interface';
import { Concept } from '@app/interfaces/concept.interface';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {
	// FOR BALANCE
	chargeBalanceAux: number = 0;
	depositBalanceAux: number = 0;
	savingBalanceAux: number = 0;
	auxMonthMovement: number = 0;
	auxDataStackedBarExpenses: number[] = [];
	auxDataStackedBarSaving: number[] = [];
	auxDataStackedBarLabels: string[] = [];
	auxDataStackedBarYear: number[] = [];

	// NEW EXPENSES
	expensesMovementsPerMonth: MonthMovements[] = [];
	expensesData: ResumeMainData[] = [];

	// FOR INCOMES
	incomeMovementsPerMonth: MonthMovements[] = [];
	incomesData: ResumeMainData[] = [];
	incomeBarChart: BarChart[] = [];

	// GENERAL
	categoriesList: Category[] = [];
	movementsList: Movement[] = [];
	movementsPerMonth: monthMovement[] = [];
	monthMovementArray: MonthMovementArray[] = [];

	constructor(private dashboardBean: DashboardBeanService) {}

	mainMethod(movements: Movement[], categories: Category[]) {
		this.cleanValues();
		this.categoriesList = categories;
		this.movementsList = movements;
		this.dataForBalanceChart();
		this.dataForBalancePie();
		this.dataForExpenses();
		this.dataForIncomes();
		this.dashboardBean.setDataIsReady(true);
	}

	dataForIncomes() {
		this.dashboardBean.setDataIncomesBarChart(this.incomeBarChart.reverse());
		this.incomesMainData(this.monthMovementArray);
	}

	incomesMainData(incomesMovements: MonthMovementArray[]) {
		incomesMovements.forEach((element: MonthMovementArray) => {
			let auxMovements: Movement[] = [];
			element.details.forEach((detail) => {
				if (detail.movement.type == 'DEPOSIT') {
					auxMovements.push(detail.movement);
				}
			});
			this.incomeMovementsPerMonth.push({
				month: element.month,
				movements: auxMovements
			});
		});
		this.incomesDataProcess(this.incomeMovementsPerMonth);
	}

	incomesDataProcess(incomeMovementsPerMonth: MonthMovements[]) {
		incomeMovementsPerMonth.forEach((monthMovements) => {
			this.getDataForIncomesMain(monthMovements.month, monthMovements.movements);
		});
	}

	getDataForIncomesMain(month: number, movements: Movement[]) {
		movements.forEach((movement) => {
			movement.concepts.forEach((concept) => {
				if (concept.type == 'DEFAULT') {
					if (!isNullOrUndefined(concept.category)) {
						if (!isNullOrUndefined(concept.category.parent)) {
							this.incomesFillingDataForNormalMovs(concept, movement, month);
						} else {
							this.incomesFillingDataForMovsWoSubcats(concept, movement, month);
						}
					} else {
						this.incomesFillingDataForMovsWoCats(movement, month);
					}
				}
			});
		});
		this.incomesCalculateAmounts();
		this.sortIncomesData();
		this.dashboardBean.setDataIncomesTab(this.incomesData);
	}

	incomesFillingDataForNormalMovs(concept: Concept, movement: Movement, month: number) {
		let arrayOfMonth = this.incomesData.filter((element) => element.month == month);
		let movements: Movement[] = [];
		movements.push(movement);
		if (arrayOfMonth.length == 0) {
			this.incomesData.push({
				month: month,
				data: [
					{
						label: this.getCategoryById(concept.category.parent.id).name,
						totalAmount: movement.amount,
						category: this.getCategoryById(concept.category.parent.id),
						categoryId: concept.category.parent.id,
						backgroundColor: this.getCategoryById(concept.category.parent.id).color,
						details: [
							{
								subCategory: concept.category,
								backgroundColorSubCategory: concept.category.color,
								totalAmount: movement.amount,
								movements: movements
							}
						]
					}
				]
			});
		} else {
			this.incomesData.forEach((element) => {
				element.month == month ? this.incomeElementWithMonthCreated(element, concept, movement) : null;
			});
		}
	}

	incomeElementWithMonthCreated(element: ResumeMainData, concept: Concept, movement: Movement) {
		let categoryAlreadyExists: boolean = false;
		let categoryAsSubcatExists: boolean = false;
		let auxMovement: Movement[] = [];
		auxMovement.push(movement);
		element.data.forEach((data) => {
			if (data.categoryId == concept.category.parent.id) {
				categoryAlreadyExists = true;
				data.details.forEach((detail) => {
					if (detail.subCategory.id == concept.category.id) {
						detail.movements.push(movement);
						categoryAsSubcatExists = true;
					}
				});
				if (!categoryAsSubcatExists) {
					data.details.push({
						subCategory: concept.category,
						backgroundColorSubCategory: concept.category.color,
						totalAmount: movement.amount,
						movements: auxMovement
					});
				}
			}
		});
		if (!categoryAlreadyExists) {
			element.data.push({
				label: this.getCategoryById(concept.category.parent.id).name,
				totalAmount: movement.amount,
				category: this.getCategoryById(concept.category.parent.id),
				categoryId: concept.category.parent.id,
				backgroundColor: this.getCategoryById(concept.category.parent.id).color,
				details: [
					{
						subCategory: concept.category,
						backgroundColorSubCategory: concept.category.color,
						totalAmount: movement.amount,
						movements: auxMovement
					}
				]
			});
		}
	}

	incomesFillingDataForMovsWoSubcats(concept: Concept, movement: Movement, month: number) {
		let arrayOfMonth = this.incomesData.filter((element) => element.month == month);
		let movements: Movement[] = [];
		movements.push(movement);
		if (arrayOfMonth.length == 0) {
			this.incomesData.push({
				month: month,
				data: [
					{
						label: concept.category.name,
						totalAmount: movement.amount,
						category: concept.category,
						categoryId: concept.category.id,
						backgroundColor: concept.category.color,
						details: [
							{
								subCategory: concept.category,
								backgroundColorSubCategory: concept.category.color,
								totalAmount: movement.amount,
								movements: movements
							}
						]
					}
				]
			});
		} else {
			this.incomesData.forEach((element) => {
				element.month == month ? this.incomeElementWithMonthCreatedWoSubcat(element, concept, movement) : null;
			});
		}
	}

	incomeElementWithMonthCreatedWoSubcat(element: ResumeMainData, concept: Concept, movement: Movement) {
		let categoryAlreadyExists: boolean = false;
		let categoryAsSubcatExists: boolean = false;
		let auxMovement: Movement[] = [];
		auxMovement.push(movement);
		element.data.forEach((data) => {
			if (data.categoryId == concept.category.id) {
				categoryAlreadyExists = true;
				data.details.forEach((detail) => {
					if (detail.subCategory.id == concept.category.id) {
						detail.movements.push(movement);
						categoryAsSubcatExists = true;
					}
				});
				if (!categoryAsSubcatExists) {
					data.details.push({
						subCategory: concept.category,
						backgroundColorSubCategory: concept.category.color,
						totalAmount: movement.amount,
						movements: auxMovement
					});
				}
			}
		});
		if (!categoryAlreadyExists) {
			element.data.push({
				label: concept.category.name,
				totalAmount: movement.amount,
				category: concept.category,
				categoryId: concept.category.id,
				backgroundColor: concept.category.color,
				details: [
					{
						subCategory: concept.category,
						backgroundColorSubCategory: concept.category.color,
						totalAmount: movement.amount,
						movements: auxMovement
					}
				]
			});
		}
	}

	incomesFillingDataForMovsWoCats(movement: Movement, month: number) {
		let arrayOfMonth = this.incomesData.filter((element) => element.month == month);
		let movements: Movement[] = [];
		movements.push(movement);
		// ENTRARA CADA NUEVO MES CUANDO NO EXISTE INFORMACION
		if (arrayOfMonth.length == 0) {
			this.incomesData.push({
				month: month,
				data: [
					{
						label: 'Sin Categoria',
						totalAmount: movement.amount,
						category: { id: '000000', color: '#AAAAAA', name: 'Sin Categoria', textColor: '#FFF' },
						categoryId: '000000',
						backgroundColor: '#AAAAAA',
						details: [
							{
								subCategory: {
									id: '000000',
									color: '#AAAAAA',
									name: 'Sin Categoria',
									textColor: '#FFF',
									parent: { id: '000000' }
								},
								backgroundColorSubCategory: '#AAAAAA',
								totalAmount: movement.amount,
								movements: movements
							}
						]
					}
				]
			});
		} else {
			this.incomesData.forEach((element) => {
				element.month == month ? this.incomeElementWithMonthCreatedWoCat(element, movement) : null;
			});
		}
	}

	incomeElementWithMonthCreatedWoCat(element: ResumeMainData, movement: Movement) {
		let categoryAlreadyExists: boolean = false;
		let auxMovement: Movement[] = [];
		auxMovement.push(movement);
		element.data.forEach((data) => {
			if (data.categoryId == '000000') {
				categoryAlreadyExists = true;
				data.details.forEach((detail) => {
					if (detail.subCategory.id == '000000') detail.movements.push(movement);
				});
			}
		});
		if (!categoryAlreadyExists) {
			element.data.push({
				label: 'Sin Categoria',
				totalAmount: movement.amount,
				category: { id: '000000', color: '#AAAAAA', name: 'Sin Categoria', textColor: '#FFF' },
				categoryId: '000000',
				backgroundColor: '#AAAAAA',
				details: [
					{
						subCategory: {
							id: '000000',
							color: '#AAAAAA',
							name: 'Sin Categoria',
							textColor: '#FFF',
							parent: { id: '000000' }
						},
						backgroundColorSubCategory: '#AAAAAA',
						totalAmount: movement.amount,
						movements: auxMovement
					}
				]
			});
		}
	}

	sortIncomesData() {
		this.incomesData.forEach((incomesData) => {
			incomesData.data.sort((a, b) => {
				return b.totalAmount - a.totalAmount;
			});
			incomesData.data.forEach((data) => {
				data.details.sort((a, b) => {
					return b.totalAmount - a.totalAmount;
				});
			});
		});
	}

	incomesCalculateAmounts() {
		let amountSubAux: number = 0;
		let amountMainAux: number = 0;
		this.incomesData.forEach((incomes) => {
			incomes.data.forEach((data) => {
				amountMainAux = 0;
				data.details.forEach((detail) => {
					amountSubAux = 0;
					detail.movements.forEach((movement) => {
						amountSubAux += movement.amount;
					});
					detail.totalAmount = amountSubAux;
					amountMainAux += detail.totalAmount;
				});
				data.totalAmount = amountMainAux;
			});
		});
	}

	incomesBarChartMethod(month: string, depositValue: number) {
		this.incomeBarChart.push({
			label: month,
			amount: depositValue,
			year: this.auxDataStackedBarYear[this.auxDataStackedBarYear.length - 1]
		});
	}

	dataForExpenses() {
		let auxDate = new Date(this.movementsList[0].customDate);
		let monthsArray: number[] = [];
		monthsArray.push(auxDate.getMonth());

		for (let i = 0; i < this.movementsList.length; i++) {
			let movementDate = new Date(this.movementsList[i].customDate);
			if (movementDate.getMonth() == auxDate.getMonth()) {
				this.monthMovementProcess(this.movementsList[i], monthsArray);
			} else {
				this.monthMovementProcess(this.movementsList[i], monthsArray);
				auxDate = movementDate;
			}
		}
		this.monthMovementArray = this.monthMovementsArray(monthsArray);
		this.expensesMainData(this.monthMovementArray);
	}

	expensesMainData(monthMovementArray: MonthMovementArray[]) {
		monthMovementArray.forEach((element) => {
			let auxMovements: Movement[] = [];
			element.details.forEach((detail) => {
				if (detail.movement.type == 'CHARGE') {
					auxMovements.push(detail.movement);
				}
			});
			this.expensesMovementsPerMonth.push({
				month: element.month,
				movements: auxMovements
			});
		});
		this.fillExpensesMainData(this.expensesMovementsPerMonth);
	}

	fillExpensesMainData(expensesMovementsPerMonth: MonthMovements[]) {
		expensesMovementsPerMonth.forEach((monthMovements) => {
			this.getDataForExpensesMain(monthMovements.month, monthMovements.movements);
		});
	}

	getDataForExpensesMain(month: number, movements: Movement[]) {
		movements.forEach((movement) => {
			movement.concepts.forEach((concept) => {
				if (concept.type === 'DEFAULT') {
					if (!isNullOrUndefined(concept.category)) {
						if (!isNullOrUndefined(concept.category.name)) {
							if (!isNullOrUndefined(concept.category.parent)) {
								this.expensesFillingDataForNormalMovs(concept, movement, month);
							} else {
								this.expensesFillingDataForMovsWoSubcats(concept, movement, month);
							}
						}
					} else {
						this.expensesFillingDataForMovsWoCat(movement, month);
					}
				}
			});
		});
		this.expensesCalculateAmounts();
		this.sortExpensesData();
		this.dashboardBean.setDataExpensesTab(this.expensesData);
	}

	expensesFillingDataForNormalMovs(concept: Concept, movement: Movement, month: number) {
		let arrayOfMonth = this.expensesData.filter((element) => element.month == month);
		let movements: Movement[] = [];
		movements.push(movement);
		if (arrayOfMonth.length == 0) {
			this.expensesData.push({
				month: month,
				data: [
					{
						label: this.getCategoryById(concept.category.parent.id).name,
						totalAmount: movement.amount,
						category: this.getCategoryById(concept.category.parent.id),
						categoryId: concept.category.parent.id,
						backgroundColor: this.getCategoryById(concept.category.parent.id).color,
						details: [
							{
								subCategory: concept.category,
								backgroundColorSubCategory: concept.category.color,
								totalAmount: movement.amount,
								movements: movements
							}
						]
					}
				]
			});
		} else {
			this.expensesData.forEach((element) => {
				element.month == month ? this.expensesElementWithMonthCreated(element, concept, movement) : null;
			});
		}
	}

	expensesElementWithMonthCreated(element: ResumeMainData, concept: Concept, movement: Movement) {
		let categoryAlreadyExists: boolean = false;
		let categoryAsSubcatExists: boolean = false;
		let auxMovement: Movement[] = [];
		auxMovement.push(movement);
		element.data.forEach((data) => {
			if (data.categoryId == concept.category.parent.id) {
				categoryAlreadyExists = true;
				data.details.forEach((detail) => {
					if (detail.subCategory.id == concept.category.id) {
						detail.movements.push(movement);
						categoryAsSubcatExists = true;
					}
				});
				if (!categoryAsSubcatExists) {
					data.details.push({
						subCategory: concept.category,
						backgroundColorSubCategory: concept.category.color,
						totalAmount: movement.amount,
						movements: auxMovement
					});
				}
			}
		});
		if (!categoryAlreadyExists) {
			element.data.push({
				label: this.getCategoryById(concept.category.parent.id).name,
				totalAmount: movement.amount,
				category: this.getCategoryById(concept.category.parent.id),
				categoryId: concept.category.parent.id,
				backgroundColor: this.getCategoryById(concept.category.parent.id).color,
				details: [
					{
						subCategory: concept.category,
						backgroundColorSubCategory: concept.category.color,
						totalAmount: movement.amount,
						movements: auxMovement
					}
				]
			});
		}
	}

	expensesFillingDataForMovsWoSubcats(concept: Concept, movement: Movement, month: number) {
		let arrayOfMonth = this.expensesData.filter((element) => element.month == month);
		let movements: Movement[] = [];
		movements.push(movement);
		if (arrayOfMonth.length == 0) {
			this.expensesData.push({
				month: month,
				data: [
					{
						label: concept.category.name,
						totalAmount: movement.amount,
						category: concept.category,
						categoryId: concept.category.id,
						backgroundColor: concept.category.color,
						details: [
							{
								subCategory: concept.category,
								backgroundColorSubCategory: concept.category.color,
								totalAmount: movement.amount,
								movements: movements
							}
						]
					}
				]
			});
		} else {
			this.expensesData.forEach((element) => {
				element.month == month
					? this.expensesElementWithMonthCreatedWoSubcat(element, concept, movement)
					: null;
			});
		}
	}

	expensesElementWithMonthCreatedWoSubcat(element: ResumeMainData, concept: Concept, movement: Movement) {
		let categoryAlreadyExists: boolean = false;
		let categoryAsSubcatExists: boolean = false;
		let auxMovement: Movement[] = [];
		auxMovement.push(movement);
		element.data.forEach((data) => {
			if (data.categoryId == concept.category.id) {
				categoryAlreadyExists = true;
				data.details.forEach((detail) => {
					if (detail.subCategory.id == concept.category.id) {
						detail.movements.push(movement);
						categoryAsSubcatExists = true;
					}
				});
				if (!categoryAsSubcatExists) {
					data.details.push({
						subCategory: concept.category,
						backgroundColorSubCategory: concept.category.color,
						totalAmount: movement.amount,
						movements: auxMovement
					});
				}
			}
		});
		if (!categoryAlreadyExists) {
			element.data.push({
				label: concept.category.name,
				totalAmount: movement.amount,
				category: concept.category,
				categoryId: concept.category.id,
				backgroundColor: concept.category.color,
				details: [
					{
						subCategory: concept.category,
						backgroundColorSubCategory: concept.category.color,
						totalAmount: movement.amount,
						movements: auxMovement
					}
				]
			});
		}
	}

	expensesFillingDataForMovsWoCat(movement: Movement, month: number) {
		let arrayOfMonth = this.expensesData.filter((element) => element.month == month);
		let movements: Movement[] = [];
		movements.push(movement);
		// ENTRARA CADA NUEVO MES CUANDO NO EXISTE INFORMACION
		if (arrayOfMonth.length == 0) {
			this.expensesData.push({
				month: month,
				data: [
					{
						label: 'Sin Categoria',
						totalAmount: movement.amount,
						category: { id: '000000', color: '#AAAAAA', name: 'Sin Categoria', textColor: '#FFF' },
						categoryId: '000000',
						backgroundColor: '#AAAAAA',
						details: [
							{
								subCategory: {
									id: '000000',
									color: '#AAAAAA',
									name: 'Sin Categoria',
									textColor: '#FFF',
									parent: { id: '000000' }
								},
								backgroundColorSubCategory: '#AAAAAA',
								totalAmount: movement.amount,
								movements: movements
							}
						]
					}
				]
			});
		} else {
			this.expensesData.forEach((element) => {
				element.month == month ? this.expensesElementWithMonthCreatedWoCat(element, movement) : null;
			});
		}
	}

	expensesElementWithMonthCreatedWoCat(element: ResumeMainData, movement: Movement) {
		let categoryAlreadyExists: boolean = false;
		let auxMovement: Movement[] = [];
		auxMovement.push(movement);
		element.data.forEach((data) => {
			if (data.categoryId == '000000') {
				categoryAlreadyExists = true;
				data.details.forEach((detail) => {
					if (detail.subCategory.id == '000000') detail.movements.push(movement);
				});
			}
		});
		if (!categoryAlreadyExists) {
			element.data.push({
				label: 'Sin Categoria',
				totalAmount: movement.amount,
				category: { id: '000000', color: '#AAAAAA', name: 'Sin Categoria', textColor: '#FFF' },
				categoryId: '000000',
				backgroundColor: '#AAAAAA',
				details: [
					{
						subCategory: {
							id: '000000',
							color: '#AAAAAA',
							name: 'Sin Categoria',
							textColor: '#FFF',
							parent: { id: '000000' }
						},
						backgroundColorSubCategory: '#AAAAAA',
						totalAmount: movement.amount,
						movements: auxMovement
					}
				]
			});
		}
	}

	sortExpensesData() {
		this.expensesData.forEach((expensesData) => {
			expensesData.data.sort((a, b) => {
				return b.totalAmount - a.totalAmount;
			});
			expensesData.data.forEach((data) => {
				data.details.sort((a, b) => {
					return b.totalAmount - a.totalAmount;
				});
			});
		});
	}

	expensesCalculateAmounts() {
		let amountSubAux: number = 0;
		let amountMainAux: number = 0;
		this.expensesData.forEach((expenses) => {
			expenses.data.forEach((data) => {
				amountMainAux = 0;
				data.details.forEach((detail) => {
					amountSubAux = 0;
					detail.movements.forEach((movement) => {
						amountSubAux += movement.amount;
					});
					detail.totalAmount = amountSubAux;
					amountMainAux += detail.totalAmount;
				});
				data.totalAmount = amountMainAux;
			});
		});
	}

	getCategoryById(id: string): Category {
		let categoryVar: Category;
		this.categoriesList.forEach((category) => {
			if (category.id == id) {
				categoryVar = category;
			}
		});
		return categoryVar;
	}

	monthMovementsArray(monthsArray: number[]): MonthMovementArray[] {
		let movementArray: MonthMovementArray[] = [];
		monthsArray.forEach((monthIndex) => {
			movementArray.push({
				month: monthIndex,
				details: this.movementsPerMonth.filter((mov) => mov.month == monthIndex)
			});
		});
		return movementArray;
	}

	// Arreglo de mes-movimiento, mes-movimiento
	monthMovementProcess(movement: Movement, monthsArray: number[]) {
		let date = new Date(movement.customDate);

		if (!monthsArray.includes(date.getMonth())) {
			monthsArray.push(date.getMonth());
		}
		if (date.getMonth() == this.auxMonthMovement) {
			this.movementsPerMonth.push({ month: date.getMonth(), movement: movement });
		} else {
			this.auxMonthMovement = date.getMonth();
			this.movementsPerMonth.push({ month: date.getMonth(), movement: movement });
		}
	}

	dataForBalanceChart() {
		let firstdate = new Date(this.movementsList[0].customDate);
		this.fillingYearsArray(firstdate.getFullYear());
		let auxMonth: number = firstdate.getMonth();

		this.movementsList.forEach((movement) => {
			let date = new Date(movement.customDate);
			let dateMovementMonth = date.getMonth();

			if (auxMonth == dateMovementMonth) {
				this.chargeDepositOperation(movement);
			} else {
				this.dataProcessBalanceChart(auxMonth, this.chargeBalanceAux, this.depositBalanceAux);
				this.fillingYearsArray(date.getFullYear());
				auxMonth = dateMovementMonth;
				this.chargeBalanceAux = 0;
				this.depositBalanceAux = 0;
				this.chargeDepositOperation(movement);
			}
		});
		this.dataProcessBalanceChart(auxMonth, this.chargeBalanceAux, this.depositBalanceAux);
		this.setAuxStackedData();
	}

	dataProcessBalanceChart(monthNumber: number, gastosValue: number, depositValue: number) {
		let months: string[] = [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		];
		let name: string = '';
		for (let i = 0; i < months.length; i++) {
			monthNumber == i ? (name = months[i]) : null;
		}
		this.savingBalanceAux = this.depositBalanceAux - this.chargeBalanceAux;
		this.savingBalanceAux < 0 ? (this.savingBalanceAux = 0) : (this.savingBalanceAux = this.savingBalanceAux);
		this.incomesBarChartMethod(name, depositValue);
		this.auxDataStackedBarExpenses.push(Math.round(gastosValue));
		this.auxDataStackedBarSaving.push(Math.round(this.savingBalanceAux));
		this.auxDataStackedBarLabels.push(name);
	}

	dataForBalancePie() {
		let stackedData = this.dashboardBean.getDataStackedBar();
		let auxDataBalancePieChart: BalancePieChart[] = [];
		for (let i = 0; i < stackedData[0].labels.length; i++) {
			auxDataBalancePieChart.push({
				data: [ stackedData[0].expenses[i], stackedData[0].saving[i] ]
			});
		}
		this.dashboardBean.setDataBalancePieChart(auxDataBalancePieChart);
	}

	fillingYearsArray(year: number) {
		this.auxDataStackedBarYear.push(year);
	}

	setAuxStackedData() {
		let auxStackedData: StackedBar[] = [];
		auxStackedData.push({
			expenses: this.auxDataStackedBarExpenses.reverse(),
			saving: this.auxDataStackedBarSaving.reverse(),
			labels: this.auxDataStackedBarLabels.reverse(),
			year: this.auxDataStackedBarYear.reverse()
		});
		this.dashboardBean.setDataStackedBar(auxStackedData);
	}

	chargeDepositOperation(movement) {
		if (movement.type === 'CHARGE') {
			this.chargeBalanceAux += movement.amount;
		}
		if (movement.type === 'DEPOSIT') {
			this.depositBalanceAux += movement.amount;
		}
	}

	cleanValues() {
		// FOR BALANCE
		this.chargeBalanceAux = 0;
		this.depositBalanceAux = 0;
		this.savingBalanceAux = 0;
		this.auxMonthMovement = 0;
		this.auxDataStackedBarExpenses = [];
		this.auxDataStackedBarSaving = [];
		this.auxDataStackedBarLabels = [];
		this.auxDataStackedBarYear = [];

		// NEW EXPENSES
		this.expensesMovementsPerMonth = [];
		this.expensesData = [];

		// FOR INCOMES
		this.incomeMovementsPerMonth = [];
		this.incomesData = [];
		this.incomeBarChart = [];

		// GENERAL
		this.categoriesList = [];
		this.movementsList = [];
		this.movementsPerMonth = [];
		this.monthMovementArray = [];
	}
}
