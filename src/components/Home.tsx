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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <Moon className="w-20 h-20 text-purple-500 mx-auto" />
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-pink-400" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
          >
            Welcome, Divya! 🌙✨
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
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
        className="max-w-6xl mx-auto px-4 pb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.path}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Link to={feature.path} className="block">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{feature.title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-purple-500 text-2xl font-bold text-center mt-4"
                    >
                      →
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="max-w-4xl mx-auto px-4 pb-20"
      >
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <Moon className="w-8 h-8 text-purple-500" />
            <h3 className="text-2xl font-bold text-gray-800">Daily Inspiration</h3>
          </div>
          <blockquote className="text-lg text-gray-700 italic leading-relaxed">
            "You are not just a star in the night sky, Divya. You are the entire constellation that makes someone's world complete. Your emotions, your strength, your beautiful complexity - it all matters. Today and every day, remember that you are loved beyond measure." ✨
          </blockquote>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7 }}
        className="text-center pb-20 px-4"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Quick Start</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/chat" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Start Chatting
          </Link>
          <Link 
            to="/tarot" 
            className="bg-white text-purple-600 border-2 border-purple-500 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Daily Reading
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home; 