import { AccountInterface } from './account.interfaces';
import { Concept } from './concept.interface';


/**
 * @interface Movement Estos son los datos que lleva un movimiento cuando se hace una petición al servidor, para
 * obtener la lista de movimientos. Así mismo esta interfaz se utiliza para la creación de un movimientos.
 *
 * @param amount - La propiedad es de tipo number y es el monto que lleva el movimiento
 * @param balance - La propiedad es legacy code
 * @param date - La propiedad es de tipo String, y es la fecha que se le asigno al movimiento, este debe ser de fomato ISO-8601
 * y el formato es: YYYY-MM-DDTHH:mm:ss.sssZ
 * @param description - La propiedad es de tipo string
 * @param duplicated - La propiedad es de tipo boolean y nos dirá si queremos que se vea reflejado en los grafos del Dashboard
 * @param type - La propiedad es de tipo string y también es una constante que solo puede llevar dos valores
 *               CHARGE o DEPOSIT, cualquier otro valor mandará un error status 22 - Unprocessable Entity
 */


export interface Movement {
  account?: AccountInterface;
  amount?: number;
  balance?: number;
  category?: { id: string };
  concepts?: Concept[];
  customAmount?: number;
  customDate?: Date;
  customDescription?: string;
  date?: Date;
  dateCreated?: Date;
  dateDeleted?: Date;
  description?: string;
  duplicated?: boolean;
  formatDate?: string;
  hasConcepts?: boolean;
  readonly id?: string;
  lastUpdated?: string;
  inBalance?: boolean;
  type?: string;
}
