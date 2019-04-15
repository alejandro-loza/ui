/**
 * @interface Response - Esta interfaz es genérica, lo cual cualquier respuesta del API que contenga los parametros data y size. Serán de esta interfaz
 * @param {T} T - Es el tipo de interfaz que viene en el arreglo de la varibale data.*
 */

export interface Response<T> {
  data: T[];
  size: number;
}
