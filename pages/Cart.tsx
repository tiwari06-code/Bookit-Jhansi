import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, auth } = useApp();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Construct WhatsApp message
    let message = `Hello *Bookit Jhansi*, I would like to book the following services:\n\n`;
    cart.forEach(item => {
      const priceDisplay = item.customPriceDisplay ? item.customPriceDisplay : `₹${item.price * item.quantity}`;
      message += `• ${item.name} x${item.quantity} - ${priceDisplay}\n`;
    });
    
    message += `\n*Total Estimate: ₹${cartTotal}*`;
    // Add a note if there are negotiable items
    if (cart.some(item => item.customPriceDisplay)) {
      message += ` (plus negotiable items)`;
    }
    
    if (auth.user) {
        message += `\n\nCustomer Details:\nName: ${auth.user.name}\nPhone: ${auth.user.phone}`;
    } else {
        message += `\n\n(Customer not logged in on website)`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="text-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 inline-flex mb-6">
                <Trash2 size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like you haven't added any services yet.</p>
            <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                <ArrowLeft className="mr-2" size={20} />
                Back to Services
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
            <Link to="/" className="text-gray-500 hover:text-primary-600 mr-4">
                <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Cart</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {cart.map((item) => (
              <li key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Unit Price: {item.customPriceDisplay ? item.customPriceDisplay : `₹${item.price}`}
                  </p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                        <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg disabled:opacity-50"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="w-12 text-center text-gray-900 dark:text-white font-medium">{item.quantity}</span>
                         <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    
                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <span className="text-lg text-gray-600 dark:text-gray-400">Total Estimate</span>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{cartTotal}</span>
            </div>
            
            <button 
                onClick={handleCheckout}
                className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform active:scale-[0.99]"
            >
                <MessageCircle size={24} />
                <span>Checkout on WhatsApp</span>
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
                You will be redirected to WhatsApp to confirm your booking with Bookit Jhansi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};