import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { WHATSAPP_NUMBER } from '../constants';
import { ArrowRight, User } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
        // Construct WhatsApp message with login details
        const message = `Hello *Bookit Jhansi*,\n\nI want to Login to the website.\n\n*Login Details:*\nEmail: ${email}\nPassword: ${password}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Simulate local login
        const dummyUser = {
            name: email.split('@')[0], 
            email: email,
            phone: ''
        };
        login(dummyUser);
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] dark:bg-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary-200/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-white/5 relative z-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-900 dark:text-white">
            <User size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in to your Bookit Jhansi account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-5 py-4 border-none bg-gray-50 dark:bg-black/50 text-gray-900 dark:text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow sm:text-sm shadow-inner-light"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-5 py-4 border-none bg-gray-50 dark:bg-black/50 text-gray-900 dark:text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow sm:text-sm shadow-inner-light"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Sign In & Checkout on WhatsApp
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
        <div className="text-center pt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-primary-600 hover:text-primary-500 transition-colors">
                    Register here
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
};