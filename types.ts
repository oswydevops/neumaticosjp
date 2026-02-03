
export type Page = 'home' | 'catalog' | 'about' | 'contact' | 'admin';

export interface Tire {
  id: string;
  brand: string;
  model: string;
  width: number;
  profile: number;
  diameter: number;
  construction: string;
  loadIndex: number;
  speedRating: string;
  price: number;
  image: string;
  season: 'verano' | 'invierno' | 'all-season';
  status: 'active' | 'low-stock' | 'inactive' | 'out-of-stock';
  stock: number;
  maxWeight: number;
}

export interface FilterState {
  widths: string[];
  profiles: string[];
  diameters: string[];
  brands: string[];
  search: string;
}
