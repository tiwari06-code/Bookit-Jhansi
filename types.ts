export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  customPriceDisplay?: string; // Optional field for prices like "Negotiable"
  iconName: string; // Using Lucide icon names as strings
  category: string;
}

export interface CartItem extends Service {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  text: string;
  date: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}