
import { Tire } from './types';

// MODIFICACIÓN: Se ha dejado el array vacío por defecto. 
// Esto asegura que el catálogo no muestre nada hasta que el administrador agregue productos manualmente.
export const INITIAL_TIRES: Tire[] = [];

// Constantes para los selectores del panel de administración y filtros
export const BRANDS = ['Michelin', 'Bridgestone', 'Continental', 'Pirelli', 'Dunlop', 'Goodyear'];
export const WIDTHS = ['195', '205', '215', '225', '245'];
export const PROFILES = ['40', '45', '50', '55', '60', '65'];
export const DIAMETERS = ['15', '16', '17', '18'];