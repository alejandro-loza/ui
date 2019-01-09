export interface BalanceChart {
    name:string,
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