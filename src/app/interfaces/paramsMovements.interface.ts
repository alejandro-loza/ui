/**
 * @interface ParamsMovements - Esta interfaz es para los datos que se deben enviar en las peticiones de movimientos.
 * @var { boolean } charges - Es para considerar los movimientos de tipo gasto.
 * @var { boolean } deposits - Es para considerar los movimientos de tipo ingreso.
 * @var { boolean } deep - Esto es para conocer a todas las características de los movimientos.
 * @var { boolean } duplicates - Es para considerar los movimientos duplicados o no conciderados.
 * @var { string } endDate - Es la fecha donde se terminará a buscar, su formato es el siguiente: 'YYYY-MM-DD'.
 * Por Default debe llevar la función Date().
 * @var { number } maxMovements - Este es el rango de movimientos que se traeran.
 * @var { number } offset - Este sirve para saber a partir de donde se tomaran los movimientos. Por default debe
 * inicializar en 0, e irse incrementando con la propiedad maxMovements, para saber de donde se deben tomar
 *  los siguientes movimientos.
 * @var { string } startDate - Es la fecha donde se comenzará a buscar, su formato es el siguiente: 'YYYY-MM-DD'
 */
export interface ParamsMovements {
  charges?: boolean;
  deposits?: boolean;
  deep?: boolean;
  duplicates?: boolean;
  endDate?: string;
  maxMovements?: number;
  offset?: number;
  startDate?: string;
}
