export interface PieChart {
    month?:number,
    series:[{
        "name":string,
        "value":number,
        "color"?:string  
    }]
}