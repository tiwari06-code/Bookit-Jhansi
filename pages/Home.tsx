import React from 'react';
import { SERVICES } from '../constants';
import { ServiceCard } from '../components/ServiceCard';
import { Icon } from '../components/Icon';
import { ReviewsSection } from '../components/ReviewsSection';
import { ArrowRight, Star } from 'lucide-react';

export const Home: React.FC = () => {
  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#F5F5F7] dark:bg-black transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
             <div className="inline-flex items-center space-x-2 bg-white/60 dark:bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200/50 dark:border-white/5 shadow-sm mb-8 animate-slide-up">
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Available now in Jhansi</span>
             </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tighter mb-8 leading-[1.1]">
              Trusted Experts for <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-200">
                Every Home Need
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
              From instant repairs to grooming & cleaning. Book reliable professionals in seconds via WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <a 
                href="#services"
                onClick={scrollToServices}
                className="w-full sm:w-auto h-14 px-8 flex items-center justify-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-premium hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Book a Service</span>
                <ArrowRight size={20} />
              </a>
              <a 
                href="#services"
                onClick={scrollToServices}
                className="w-full sm:w-auto h-14 px-8 flex items-center justify-center space-x-2 bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-full font-semibold text-lg hover:bg-gray-50 dark:hover:bg-white/20 transition-all backdrop-blur-md"
              >
                Explore Services
              </a>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                    <div className="flex text-primary-500">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                    </div>
                    <span className="text-sm font-medium">4.8/5 Rating</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <span className="text-sm font-medium">2000+ Happy Customers</span>
            </div>
          </div>
        </div>
        
        {/* Refined Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
             <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-purple-300/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob"></div>
             <div className="absolute top-[10%] right-[-10%] w-[35rem] h-[35rem] bg-yellow-200/40 dark:bg-yellow-700/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-[20%] left-[20%] w-[45rem] h-[45rem] bg-pink-200/30 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white dark:bg-black transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <span className="text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase text-xs mb-3 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">Professional Services at Your Doorstep</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-light">Choose from our wide range of premium services designed to make your life easier.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-[#F5F5F7] dark:bg-[#09090b] transition-colors duration-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
             <span className="text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase text-xs mb-3 block">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">How Bookit Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent z-0"></div>
            
            {[
              { title: 'Select Service', desc: 'Choose from our premium catalog.', icon: 'MousePointerClick' },
              { title: 'Add to Cart', desc: 'Customize your service package.', icon: 'ShoppingCart' },
              { title: 'WhatsApp Checkout', desc: 'Instant confirmation via chat.', icon: 'MessageCircle' },
              { title: 'Relax', desc: 'Experts arrive at your designated time.', icon: 'Smile' },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white dark:bg-[#1c1c1e] rounded-[2rem] shadow-premium flex items-center justify-center text-primary-500 mb-8 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 border border-gray-100 dark:border-white/5">
                  <Icon name={step.icon} size={36} className="stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Functional Review Section */}
      <ReviewsSection />
    </div>
  );
};