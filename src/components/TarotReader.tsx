import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Moon, Star, Heart } from 'lucide-react';
import { getDailyTarot } from '../services/openai';
import { TarotCard } from '../types';

const TarotReader: React.FC = () => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasReadToday, setHasReadToday] = useState(false);

  const handleDailyReading = async () => {
    setIsLoading(true);
    try {
      const dailyCards = await getDailyTarot();
      setCards(dailyCards);
      setHasReadToday(true);
    } catch (error) {
      console.error('Error getting tarot reading:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateY: 180 },
    visible: { opacity: 1, y: 0, rotateY: 0 },
    hover: { scale: 1.05, y: -10 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Daily Tarot Reading
              </h1>
              <p className="text-gray-600 mt-2">Mystical insights for your day, Divya 🌙</p>
            </div>
          </div>
        </motion.div>

        {/* Reading Button */}
        {!hasReadToday && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDailyReading}
              disabled={isLoading}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 mx-auto ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Reading the cards...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  Get Your Daily Reading
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Cards Display */}
        <AnimatePresence>
          {cards.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {cards.map((card, index) => (
                <motion.div
                  key={card.id || index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover="hover"
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Moon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{card.name}</h3>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        card.reversed 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {card.reversed ? 'Reversed' : 'Upright'}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Your Message</h4>
                        <p className="text-gray-800 text-sm leading-relaxed italic">{card.meaning}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Daily Inspiration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-4 mb-6">
            <Star className="w-8 h-8 text-yellow-500" />
            <h3 className="text-2xl font-bold text-gray-800">Daily Inspiration</h3>
          </div>
          <blockquote className="text-lg text-gray-700 italic leading-relaxed">
            "The moon understands your heart, Divya. Just as it waxes and wanes, so do our emotions. 
            But remember, even in the darkest night, the moon still shines. Your strength, your intuition, 
            and your beautiful complexity are your greatest gifts. Trust the journey you're on." ✨
          </blockquote>
        </motion.div>

        {/* Reset Button */}
        {hasReadToday && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCards([]);
                setHasReadToday(false);
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-300"
            >
              New Reading
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TarotReader; 