import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Bookit Jhansi</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              Your one-stop solution for trusted home services in Jhansi. From repairs to grooming, we bring professionals to your doorstep.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Repairs</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Cleaning</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Grooming</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Web Dev</a></li>
            </ul>
          </div>
          <div>
             <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">About Us</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Contact</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Bookit Jhansi. All rights reserved.
          </p>
           <p className="text-gray-400 dark:text-gray-600 text-xs mt-2 md:mt-0">
            Made with ❤️ in Jhansi
          </p>
        </div>
      </div>
    </footer>
  );
};