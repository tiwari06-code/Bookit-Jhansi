import { Service, Review } from './types';

export const WHATSAPP_NUMBER = '917376558291';

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'AC Repair & Service',
    description: 'Expert AC repair, installation, and gas refilling.',
    price: 399,
    iconName: 'Wrench',
    category: 'Repair',
  },
  {
    id: '2',
    name: 'Men\'s Grooming',
    description: 'Haircut, shave, and massage at your doorstep.',
    price: 149,
    iconName: 'Scissors',
    category: 'Grooming',
  },
  {
    id: '3',
    name: 'Home Deep Cleaning',
    description: 'Full home cleaning including kitchen and washrooms.',
    price: 199,
    iconName: 'Sparkles',
    category: 'Cleaning',
  },
  {
    id: '4',
    name: 'Web Development',
    description: 'Custom business websites and digital solutions.',
    price: 4999,
    iconName: 'Monitor',
    category: 'Tech',
  },
  {
    id: '5',
    name: 'Event Management',
    description: 'Birthday parties, weddings, and corporate events.',
    price: 0,
    customPriceDisplay: 'Negotiable',
    iconName: 'PartyPopper',
    category: 'Events',
  },
  {
    id: '6',
    name: 'Plumbing Services',
    description: 'Leak repairs, fitting installation, and maintenance.',
    price: 199,
    iconName: 'Droplet',
    category: 'Repair',
  },
  {
    id: '7',
    name: 'Electrician',
    description: 'Wiring, switch installation, and electrical repairs.',
    price: 199,
    iconName: 'Zap',
    category: 'Repair',
  },
];

// Empty initial reviews to remove "fake" ratings
export const INITIAL_REVIEWS: Review[] = [];