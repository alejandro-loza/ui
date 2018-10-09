export class QueryMovements {
    includeCharges: boolean;
    includeDeposits: boolean;
    movementsMax: number;
    tmz = 'GMT-05:00';
    includeDuplicates: boolean;

    constructor (
        charges: boolean,
        deposits: boolean,
        duplicates: boolean,
        max?: number) {
            this.includeCharges = charges;
            this.includeDeposits = deposits;
            this.movementsMax = max;
            this.includeDuplicates = duplicates;
    }

    // Charges start
    public set setCharges(charges: boolean) {
        this.includeCharges = charges;
    }

    public get getCharges(): boolean {
        return this.includeCharges;
    }
    // Charges End

    // Deposits start
    public set setDeposits(deposits: boolean) {
        this.includeDeposits = deposits;
    }

    public get getDeposits(): boolean {
        return this.includeDeposits;
    }
    // Deposits end

    // Movements start
    public set setMovements(movements: number) {
        this.movementsMax = movements;
    }

    public get getMovements(): number {
        return this.movementsMax;
    }
    // Movements end

    // Duplicates start
    public set setDuplicates(duplicates: boolean) {
        this.includeDuplicates = duplicates;
    }

    public get getDuplicates(): boolean {
        return this.includeDuplicates;
    }
    // Duplicates end

    // maxMovements start
    public set setMax(max: number) {
        this.movementsMax = max;
    }

    public get getMax(): number {
        return this.movementsMax;
    }
    // maxMovements end

    public get getTmz(): string {
        return this.tmz;
    }
}
