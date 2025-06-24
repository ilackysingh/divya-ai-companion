import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Plus, BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import { LoveLetter } from '../types';
import { generateLoveLetter } from '../services/openai';

const LoveLetters: React.FC = () => {
  const [letters, setLetters] = useState<LoveLetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<LoveLetter['category']>('romantic');

  const categories = [
    { value: 'romantic', label: 'Romantic', emoji: '💕', color: 'from-pink-400 to-red-400' },
    { value: 'friendship', label: 'Friendship', emoji: '🤗', color: 'from-blue-400 to-purple-400' },
    { value: 'support', label: 'Support', emoji: '💪', color: 'from-green-400 to-blue-400' },
    { value: 'funny', label: 'Funny', emoji: '😂', color: 'from-yellow-400 to-orange-400' },
  ];

  const handleGenerateLetter = async () => {
    setIsGenerating(true);
    try {
      const newLetter = await generateLoveLetter(selectedCategory);
      setLetters(prev => [newLetter, ...prev]);
      setSelectedLetter(newLetter);
    } catch (error) {
      console.error('Error generating letter:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLetterClick = (letter: LoveLetter) => {
    setSelectedLetter(letter);
    // Mark as read
    setLetters(prev => 
      prev.map(l => 
        l.id === letter.id ? { ...l, isRead: true } : l
      )
    );
  };

  const handleCloseLetter = () => {
    setSelectedLetter(null);
  };

  const unreadCount = letters.filter(letter => !letter.isRead).length;

  return (
    <div className="letters-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="letters-header"
      >
        <div className="letters-header-content">
          <Heart className="letters-header-icon" />
          <div>
            <h2>Love Letters</h2>
            <p>Personalized letters written just for you, Divya 💜</p>
          </div>
        </div>
      </motion.div>

      <div className="letters-content">
        {/* Letter Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="letter-generator"
        >
          <h3>Generate a New Letter</h3>
          <p>Choose the type of letter you'd like to receive today</p>
          
          <div className="category-selector">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.value as LoveLetter['category'])}
                className={`category-option ${selectedCategory === category.value ? 'selected' : ''}`}
              >
                <span className="category-emoji">{category.emoji}</span>
                <span className="category-label">{category.label}</span>
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateLetter}
            disabled={isGenerating}
            className="generate-letter-btn"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="loading-icon" />
                Writing Your Letter...
              </>
            ) : (
              <>
                <Plus className="btn-icon" />
                Write Me a Letter
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Letters List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="letters-list-section"
        >
          <div className="letters-list-header">
            <h3>Your Letters</h3>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount} new</span>
            )}
          </div>

          {letters.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-letters"
            >
              <Mail className="empty-icon" />
              <p>No letters yet. Generate your first one above! 💌</p>
            </motion.div>
          ) : (
            <div className="letters-grid">
              {letters.map((letter) => (
                <motion.div
                  key={letter.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => handleLetterClick(letter)}
                  className={`letter-card ${!letter.isRead ? 'unread' : ''}`}
                >
                  <div className="letter-card-header">
                    <h4>{letter.title}</h4>
                    <span className="letter-category">
                      {categories.find(c => c.value === letter.category)?.emoji}
                    </span>
                  </div>
                  
                  <div className="letter-card-content">
                    <p>{letter.content.substring(0, 100)}...</p>
                  </div>
                  
                  <div className="letter-card-footer">
                    <span className="letter-date">
                      {letter.date.toLocaleDateString()}
                    </span>
                    {!letter.isRead && (
                      <span className="unread-indicator">●</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Letter Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="letter-modal-overlay"
            onClick={handleCloseLetter}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="letter-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-title">
                  <Heart className="modal-icon" />
                  <h3>{selectedLetter.title}</h3>
                </div>
                <button onClick={handleCloseLetter} className="close-btn">
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="letter-meta">
                  <span className="letter-category-badge">
                    {categories.find(c => c.value === selectedLetter.category)?.emoji}
                    {categories.find(c => c.value === selectedLetter.category)?.label}
                  </span>
                  <span className="letter-date-full">
                    {selectedLetter.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="letter-body">
                  {selectedLetter.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                
                <div className="letter-footer">
                  <Sparkles className="footer-icon" />
                  <p>Written with love, just for you 💜</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Affirmation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="daily-affirmation"
      >
        <div className="affirmation-content">
          <BookOpen className="affirmation-icon" />
          <blockquote>
            "Every letter written to you is a reminder that you are loved, valued, and cherished. 
            Your presence in this world makes it a more beautiful place. Keep shining, Divya! ✨"
          </blockquote>
        </div>
      </motion.div>
    </div>
  );
};

export default LoveLetters; 