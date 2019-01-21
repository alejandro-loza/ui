export interface BalanceChart {
    name:string,
    month?:number,
    series: [
        {
            "name":string,
            "value":number
        },
        {
            "name":string,
            "value":number
        }
    ]
}