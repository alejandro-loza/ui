export class QueryMovements {

    constructor (
        public offset: number = 0,
        public maxMovements: number = 35,
        public charges?: boolean,
        public deposits?: boolean,
        public duplicates?: boolean,
        public deep?: boolean,
    ) {
        this.offset = offset;
        this.maxMovements = maxMovements;
        this.charges = charges;
        this.deposits = deposits;
        this.duplicates = duplicates;
        this.deep = deep;
    }

    // Charges start
    public set setCharges(charges: boolean) {
        this.charges = charges;
    }

    public get getCharges(): boolean {
        return this.charges;
    }
    // Charges End

    // Deposits start
    public set setDeposits(deposits: boolean) {
        this.deposits = deposits;
    }

    public get getDeposits(): boolean {
        return this.deposits;
    }
    // Deposits end

    // Duplicates start
    public set setDuplicates(duplicates: boolean) {
        this.duplicates = duplicates;
    }

    public get getDuplicates(): boolean {
        return this.duplicates;
    }
    // Duplicates end

    // Offset Start
    public set setOffset( offset: number ) {
        this.offset = offset;
    }

    public get getOffset(): number {
        return this.offset;
    }
    // Offset End

    // Max movements Start
    public set setMax( max: number ) {
        this.maxMovements = max;
    }
    public get getMax(): number {
        return this.maxMovements;
    }
    // Max movements End

    public set setDeep( deep: boolean ) {
        this.deep = deep;
    }

    public get getDeep(): boolean {
        return this.deep;
    }
}
