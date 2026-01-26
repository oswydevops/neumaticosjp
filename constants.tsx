
import { Tire } from './types';

export const INITIAL_TIRES: Tire[] = [
  {
    id: '1',
    brand: 'Michelin',
    model: 'Pilot Sport 4',
    width: 205,
    profile: 55,
    diameter: 16,
    construction: 'R',
    loadIndex: 94,
    speedRating: 'V',
    price: 145000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_KdW_we9bxvBE_xigjBMX4fJZSXKay4G3o67GlNrLSTfVrMY_B3h6Wk2Z4XZwAdGEsuCgg4SAuGcXNiaHFDo-tZIFjeyD7hEYsTFinew0-Sa3GOLabgAmc3ubLiVnHREDqz_egBWA96OMSmnfdDlXfdTgaoJYxTC2Y71dvuOP6u9n98nLwuuRw9o69w3T2QppcjkN27u39QAInmpufZebbQl1cOKdL9LDt58rJHDvhevWBxTqaLtMzhcmAaLaXq9t2tf9bjLtyrs',
    season: 'verano',
    status: 'active',
    stock: 42
  },
  {
    id: '2',
    brand: 'Bridgestone',
    model: 'Turanza T005',
    width: 225,
    profile: 45,
    diameter: 17,
    construction: 'R',
    loadIndex: 91,
    speedRating: 'W',
    price: 168000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBQv1ZEVxvqHouuTiSyrt1mG4MM88_yM1F-cw9iwZDh2KthGnH8HsX3Ukwgw1Y-jy8he4NfK8dRBgdwbOMH0bYkmazfZTWf26DK7k9yo0y6VFJ6PHXGMTi9gL_u2tgekEb0JFfUaYCrN-cneoTuLiRdGRuQN-bC7o__wmMHLBhxrLlvvR_2UoCwmK0_Qe7ffq-TkS13p1l305YpUAZFKvGn6TB3Uf99IbljSerHzdxgepYpTl5BYkc1ekP6k8ZE4HtYpJmITt6F9s',
    season: 'all-season',
    status: 'active',
    stock: 15
  },
  {
    id: '3',
    brand: 'Continental',
    model: 'Premium 6',
    width: 195,
    profile: 65,
    diameter: 15,
    construction: 'R',
    loadIndex: 91,
    speedRating: 'V',
    price: 132000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa2D7RkiiAr30GEDJjTWC8CCPnmDlxfBmWqfN50vfz8JnzU0agJA24rcbxh-O68ltVj04uBxUN0rdKKht65w43uxQokBOSpVv2OGfHeM-Fe02JK31Zu_HgR8qd0EPOb0cs3WXxDDx5cw9XDNw5l_W3gy11fUPdJYwDspxM5XPhudeBih5m-_E5bxTJfEima7V_qa9U1ClmRKlTGRTyksp7l5v4r19QB4PiZBQ-L_cDYiEqrQHNlXz7fxRtS-AcQLE2se5g4VnRyNw',
    season: 'all-season',
    status: 'active',
    stock: 24
  },
  {
    id: '4',
    brand: 'Pirelli',
    model: 'P Zero Nero',
    width: 245,
    profile: 40,
    diameter: 18,
    construction: 'R',
    loadIndex: 94,
    speedRating: 'Y',
    price: 210000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ4zMMHZMrD4R1br2QlEPzqBu6Uc4cD4svu3OGtWs46LQ-YUPI5KaXHMrzhdhvyplQ-rfPA4iUPasWgg9YF2FMUl5MBRPNskUvQOR3_JxL4CnvyYL7nudbOlBnrIh7oC82akNe6TzIAx19J8N5COoBdsXf56EEEAcXlGHK3wpgadEbiPhMJFAgCP_3HzGNb5xzHFlGPGUWlJmKjdsb4ClEqgpi3zL5zJ7ZZEnNwJFbbo0RmAtDvoWRdFY8CFfHzEfG43q7I4dU-jw',
    season: 'verano',
    status: 'low-stock',
    stock: 5
  },
  {
    id: '5',
    brand: 'Michelin',
    model: 'Primacy 4',
    width: 205,
    profile: 60,
    diameter: 16,
    construction: 'R',
    loadIndex: 92,
    speedRating: 'V',
    price: 155000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-zJ2a1pW7_iowXvPOrcjq5tWZ80fDnXawagpPA12-kUqnaEnBiJ3ogeKMuSNuPsX6twrs3U3M1STj2NkZfQrNlXwwVImcOSSO91ZVUYhFbnbXIJth2-k0OERtDBPWZfLQWFggr72cbb32qpFUkICaEjhyIM4UMrHCxQzzTNu2K4taH7Rg4ymaDWXaxcV6C2ZvDGiYCkb7DGSVm59kIvTuFOmKV1sPFf2unLzj111d6hKckbwhmtzDJnNuW_Qhb7wtRHA6DslVK7Y',
    season: 'all-season',
    status: 'active',
    stock: 30
  }
];

export const BRANDS = ['Michelin', 'Bridgestone', 'Continental', 'Pirelli', 'Dunlop', 'Goodyear'];
export const WIDTHS = ['195', '205', '215', '225', '245'];
export const PROFILES = ['40', '45', '50', '55', '60', '65'];
export const DIAMETERS = ['15', '16', '17', '18'];
