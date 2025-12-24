import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, User, Send } from 'lucide-react';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useApp();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    const newReview: Review = {
      id: Date.now().toString(),
      userName: name,
      rating,
      text,
      date: new Date().toLocaleDateString(),
    };

    addReview(newReview);
    setName('');
    setText('');
    setRating(5);
    setHoverRating(0);
  };

  return (
    <section className="py-24 bg-white dark:bg-black transition-colors duration-500 border-t border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-16 tracking-tight">Customer Feedback</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Review Form Column */}
          <div className="bg-[#F5F5F7] dark:bg-[#1c1c1e] p-10 rounded-[2.5rem] shadow-inner-light h-fit border border-transparent dark:border-white/5">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3 tracking-tight">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white">
                 <Star size={20} fill="currentColor" />
              </span>
              Rate our Service
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 ml-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-14 px-6 rounded-2xl border-none bg-white dark:bg-black/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 placeholder-gray-400 dark:placeholder-gray-600 transition-all shadow-sm"
                  placeholder="e.g. Rahul Verma"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 ml-1">Rating</label>
                <div 
                    className="flex items-center space-x-2 bg-white dark:bg-black/50 p-2 rounded-2xl w-fit shadow-sm"
                    onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= (hoverRating || rating);
                    return (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            className={`p-2 rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/10 ${isFilled ? 'text-primary-500 scale-110' : 'text-gray-300 dark:text-gray-600'}`}
                        >
                            <Star size={28} fill={isFilled ? "currentColor" : "none"} />
                        </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 ml-1">Your Experience</label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-6 rounded-2xl border-none bg-white dark:bg-black/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 placeholder-gray-400 dark:placeholder-gray-600 transition-all shadow-sm resize-none"
                  placeholder="Tell us what you liked about our service..."
                />
              </div>

              <button
                type="submit"
                className="w-full h-14 flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                <span>Submit Review</span>
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Reviews List Column */}
          <div className="space-y-6 max-h-[700px] overflow-y-auto pr-4 no-scrollbar">
             <div className="flex items-center justify-between mb-2">
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Recent Feedback</h3>
                 <span className="text-sm text-gray-500">{reviews.length} Reviews</span>
             </div>
            
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-[#1c1c1e] rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-white/5">
                <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                     <Star size={32} className="text-gray-300 dark:text-gray-600" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">No reviews yet</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Be the first to share your experience!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-[#1c1c1e] p-8 rounded-[2rem] shadow-premium border border-gray-100 dark:border-white/5 animate-fade-in transition-all hover:translate-x-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-900/10 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg shadow-sm">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{review.userName}</h4>
                        <span className="text-xs font-medium text-gray-400">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 bg-primary-50 dark:bg-white/5 px-2 py-1 rounded-lg">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "#f59e0b" : "none"} className={i < review.rating ? "text-primary-500" : "text-gray-300 dark:text-gray-700"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light text-[15px]">"{review.text}"</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};