import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Moon, Sparkles, RefreshCw } from 'lucide-react';
import { TarotCard } from '../types';
import { getDailyTarot } from '../services/openai';

const TarotReader: React.FC = () => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasReadToday, setHasReadToday] = useState(false);

  const handleDrawCards = async () => {
    setIsLoading(true);
    try {
      const drawnCards = await getDailyTarot();
      setCards(drawnCards);
      setHasReadToday(true);
    } catch (error) {
      console.error('Error drawing cards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewReading = () => {
    setCards([]);
    setHasReadToday(false);
  };

  return (
    <div className="tarot-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="tarot-header"
      >
        <div className="tarot-header-content">
          <BookOpen className="tarot-header-icon" />
          <div>
            <h2>Daily Tarot Reading</h2>
            <p>Let the mystical energies guide your day, Divya ✨</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="tarot-content">
        {cards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="tarot-intro"
          >
            <div className="tarot-intro-content">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="tarot-intro-icon"
              >
                <Moon className="intro-moon" />
                <Sparkles className="intro-sparkles" />
              </motion.div>
              
              <h3>Ready for Your Daily Reading?</h3>
              <p>
                The cards are waiting to reveal what the universe has in store for you today, Divya. 
                Take a deep breath, focus on your question or intention, and let's discover the guidance 
                that awaits you. 🌙
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDrawCards}
                disabled={isLoading}
                className="draw-cards-btn"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="loading-icon" />
                    Drawing Cards...
                  </>
                ) : (
                  <>
                    <BookOpen className="btn-icon" />
                    Draw Three Cards
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tarot-reading"
          >
            {/* Reading Header */}
            <div className="reading-header">
              <h3>Your Daily Reading</h3>
              <p>Here's what the cards have revealed for you today, Divya 💜</p>
            </div>

            {/* Cards Display */}
            <div className="cards-container">
              <AnimatePresence>
                {cards.map((card, index) => (
                  <motion.div
                    key={card.name}
                    initial={{ opacity: 0, y: 50, rotateY: 180 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ 
                      delay: index * 0.3,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="tarot-card"
                  >
                    <div className="card-header">
                      <h4>{card.name}</h4>
                      {card.reversed && (
                        <span className="reversed-badge">Reversed</span>
                      )}
                    </div>
                    
                    <div className="card-content">
                      <div className="card-description">
                        <strong>Description:</strong> {card.description}
                      </div>
                      <div className="card-meaning">
                        <strong>For You Today:</strong> {card.meaning}
                      </div>
                    </div>
                    
                    <div className="card-footer">
                      <Sparkles className="card-sparkle" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Reading Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="reading-summary"
            >
              <div className="summary-content">
                <Moon className="summary-icon" />
                <div>
                  <h4>Today's Energy</h4>
                  <p>
                    The cards suggest a day filled with intuition, hope, and meaningful choices. 
                    Trust your instincts, Divya. Your emotions are your compass, and your heart 
                    knows the way. Remember, you have the power to create the reality you desire. ✨
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="reading-actions"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewReading}
                className="new-reading-btn"
              >
                <RefreshCw className="btn-icon" />
                New Reading
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Daily Affirmation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="daily-affirmation"
      >
        <div className="affirmation-content">
          <Sparkles className="affirmation-icon" />
          <blockquote>
            "Today, I choose to trust the journey. Every card drawn, every step taken, 
            brings me closer to the person I'm meant to become. I am worthy of love, 
            guidance, and all the beautiful things life has to offer." 🌙
          </blockquote>
        </div>
      </motion.div>
    </div>
  );
};

export default TarotReader; 