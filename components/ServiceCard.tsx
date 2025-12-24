import React from 'react';
import { Service } from '../types';
import { useApp } from '../context/AppContext';
import { Icon } from './Icon';
import { Plus } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { addToCart } = useApp();

  return (
    <div className="group relative bg-white dark:bg-[#2c2c2e] rounded-3xl p-8 shadow-premium hover:shadow-premium-hover transition-all duration-500 ease-out flex flex-col h-full transform hover:-translate-y-2 border border-transparent dark:border-white/5">
      <div className="w-16 h-16 bg-primary-50 dark:bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        <Icon name={service.iconName} size={30} className="stroke-[1.5]" />
      </div>
      
      <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-3">
             <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {service.category}
             </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{service.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>
      </div>
      
      <div className="flex items-end justify-between mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
        <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Starting from</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            {service.customPriceDisplay ? service.customPriceDisplay : `₹${service.price}`}
            </span>
        </div>
        <button 
          onClick={() => addToCart(service)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-primary-500 dark:hover:bg-primary-400 transition-all duration-300 shadow-lg hover:shadow-primary-500/30 hover:scale-105 active:scale-95"
          aria-label={`Add ${service.name} to cart`}
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};