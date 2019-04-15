/**
 * Es una interfaz para los toast
 * @property {number} code - Identifica el Http Code Status
 * @property {string} message - El mensaje que se enviará para el toast
 * @property {string} classes - Las clases que debe tener el toast.
 */
export interface ToastInterface {
	code?: number;
	message?: string;
	classes?: string;
	displayLenght?: number;
}
