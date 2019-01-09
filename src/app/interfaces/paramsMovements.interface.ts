export interface ParamsMovements {
    startDate?: string;
    endDate?: string;
    charges: boolean;
    deposits: boolean;
    duplicates: boolean;
    offset: number;
    deep?: boolean;
    maxMovements?: number;
}
