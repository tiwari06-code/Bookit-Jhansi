import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Moon, Sun, ShoppingCart, Menu, X, User as UserIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, cart, auth, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
             <div className="relative">
                <div className="absolute inset-0 bg-primary-500 blur-lg opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-300"></div>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transform transition-transform duration-300 group-hover:scale-105">
                  <path 
                    d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z" 
                    className="stroke-primary-500" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M9 13L11 15L15 10" 
                    className="stroke-brand-green" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
             </div>
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white leading-none">
                Bookit
                </h1>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-400">Jhansi</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive('/') 
                  ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/#services" 
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200"
              onClick={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Services
            </Link>
            <Link 
              to="/#how-it-works" 
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200"
              onClick={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              How It Works
            </Link>

            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200 dark:border-gray-700">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-primary-500"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <Link 
                to="/cart" 
                className="relative p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-primary-500"
              >
                <ShoppingCart size={18} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary-600 rounded-full ring-2 ring-white dark:ring-[#1c1c1e]">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {auth.isAuthenticated ? (
                <div className="flex items-center space-x-3 ml-2">
                   <div className="flex flex-col items-end hidden lg:flex">
                        <span className="text-xs font-medium text-gray-900 dark:text-white">Hi, {auth.user?.name.split(' ')[0]}</span>
                        <button onClick={logout} className="text-[10px] font-medium text-red-500 hover:text-red-600">Logout</button>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xs">
                        {auth.user?.name.charAt(0)}
                   </div>
                </div>
              ) : (
                <Link 
                    to="/login" 
                    className="flex items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                >
                  <UserIcon size={16} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
             <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300">
                <ShoppingCart size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary-600 rounded-full ring-2 ring-white dark:ring-[#1c1c1e]">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#1c1c1e] border-b border-gray-200 dark:border-gray-800 shadow-2xl animate-slide-up origin-top">
          <div className="px-4 py-6 space-y-4">
            <Link to="/" className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>Home</Link>
             <Link 
              to="/#services" 
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
               onClick={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Services
            </Link>
            <Link 
              to="/#how-it-works" 
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
               onClick={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              How It Works
            </Link>
            
            <div className="border-t border-gray-100 dark:border-gray-800 my-4 pt-4 flex flex-col gap-4">
               <button 
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <span>Appearance</span>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    {theme === 'light' ? 'Light' : 'Dark'}
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </div>
              </button>
              
              {auth.isAuthenticated ? (
                 <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-red-600 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  Logout ({auth.user?.name})
                </button>
              ) : (
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-4 rounded-xl text-base font-bold text-white bg-gray-900 dark:bg-white dark:text-black shadow-lg"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};