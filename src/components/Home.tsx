import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, Moon, Heart, Smile, BookOpen, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Chat with AI',
      description: 'Have meaningful conversations with an AI that knows you',
      path: '/chat',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BookOpen,
      title: 'Daily Tarot',
      description: 'Get mystical insights and guidance for your day',
      path: '/tarot',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Smile,
      title: 'Mood Tracker',
      description: 'Track your emotions and get personalized insights',
      path: '/mood',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: Heart,
      title: 'Love Letters',
      description: 'Receive heartfelt letters written just for you',
      path: '/letters',
      color: 'from-red-500 to-orange-500'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-section"
      >
        <div className="hero-content">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="hero-icon"
          >
            <Moon className="hero-moon" />
            <Sparkles className="hero-sparkles" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hero-title"
          >
            Welcome, Divya! 🌙✨
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="hero-subtitle"
          >
            Your personalized AI companion is here to understand, support, and celebrate you.
            Every feature is designed with your unique personality in mind.
          </motion.p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="features-grid"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          
          return (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="feature-card"
            >
              <Link to={feature.path} className="feature-link">
                <div className={`feature-icon bg-gradient-to-r ${feature.color}`}>
                  <Icon className="feature-icon-svg" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="feature-arrow"
                >
                  →
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="daily-quote"
      >
        <div className="quote-content">
          <Moon className="quote-icon" />
          <blockquote>
            "You are not just a star in the night sky, Divya. You are the entire constellation that makes someone's world complete. Your emotions, your strength, your beautiful complexity - it all matters. Today and every day, remember that you are loved beyond measure." ✨
          </blockquote>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7 }}
        className="quick-actions"
      >
        <h3 className="quick-actions-title">Quick Start</h3>
        <div className="quick-actions-buttons">
          <Link to="/chat" className="quick-action-btn primary">
            <MessageCircle className="btn-icon" />
            Start Chatting
          </Link>
          <Link to="/tarot" className="quick-action-btn secondary">
            <BookOpen className="btn-icon" />
            Daily Reading
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home; 