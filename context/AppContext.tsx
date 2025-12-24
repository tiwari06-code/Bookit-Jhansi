import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User, CartItem, Service, Review } from '../types';
import { INITIAL_REVIEWS } from '../constants';

interface AppContextType {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Auth
  auth: AuthState;
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => void;

  // Cart
  cart: CartItem[];
  addToCart: (service: Service) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Reviews
  reviews: Review[];
  addReview: (review: Review) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('bookit_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Auth State
  const [auth, setAuth] = useState<AuthState>(() => {
    const savedUser = localStorage.getItem('bookit_user');
    return savedUser ? { user: JSON.parse(savedUser), isAuthenticated: true } : { user: null, isAuthenticated: false };
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('bookit_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    const savedReviews = localStorage.getItem('bookit_reviews');
    return savedReviews ? JSON.parse(savedReviews) : INITIAL_REVIEWS;
  });

  // Effects for Persistence
  useEffect(() => {
    localStorage.setItem('bookit_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (auth.user) {
      localStorage.setItem('bookit_user', JSON.stringify(auth.user));
    } else {
      localStorage.removeItem('bookit_user');
    }
  }, [auth.user]);

  useEffect(() => {
    localStorage.setItem('bookit_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bookit_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Actions
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const login = (user: User) => setAuth({ user, isAuthenticated: true });
  
  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
    // Optional: Clear cart on logout
    // setCart([]); 
  };

  const register = (user: User) => {
    // In a real app, this would hit an API. Here we just log them in.
    login(user);
  };

  const addToCart = (service: Service) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item => 
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCart(prev => prev.filter(item => item.id !== serviceId));
  };

  const updateQuantity = (serviceId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === serviceId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const addReview = (review: Review) => {
    setReviews(prev => [review, ...prev]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      auth, login, logout, register,
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal,
      reviews, addReview
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};