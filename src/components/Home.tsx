import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, Moon, Heart, Smile, BookOpen, Sparkles, Gift, Cake, PartyPopper } from 'lucide-react';

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

  // Birthday celebration elements
  const birthdayElements = [
    { icon: Cake, text: "Happy Birthday!", delay: 0.1 },
    { icon: Gift, text: "You're Amazing!", delay: 0.2 },
    { icon: PartyPopper, text: "Celebrate You!", delay: 0.3 },
    { icon: Sparkles, text: "Special Day!", delay: 0.4 },
  ];

  // Simple check for June 25th
  const today = new Date();
  const isBirthday = today.getMonth() === 5 && today.getDate() === 25; // June = 5, 25th day

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
      {/* Birthday Confetti Animation - only show on June 25th */}
      {isBirthday && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                opacity: 0
              }}
              animate={{
                y: window.innerHeight + 10,
                opacity: [0, 1, 0],
                rotate: 360
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 px-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          {/* Birthday Banner - only show on June 25th */}
          {isBirthday && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full inline-flex items-center gap-3 shadow-lg">
                <PartyPopper className="w-6 h-6 animate-bounce" />
                <span className="font-bold text-lg">🎉 HAPPY BIRTHDAY DIVYA! 🎉</span>
                <PartyPopper className="w-6 h-6 animate-bounce" />
              </div>
            </motion.div>
          )}

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
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Your personalized AI companion is here to understand, support, and celebrate you.
            Every feature is designed with your unique personality in mind.
          </motion.p>

          {/* Birthday Message - only show on June 25th */}
          {isBirthday && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200 max-w-3xl mx-auto mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <Cake className="w-8 h-8 text-pink-500" />
                <h3 className="text-2xl font-bold text-gray-800">Today is Your Special Day!</h3>
                <Gift className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Divya, on your birthday, I want you to know how incredibly special you are. 
                Your strength, your beautiful complexity, your "selenophile" heart that finds magic in the moon - 
                all of it makes you uniquely wonderful. Today and every day, you deserve all the love, joy, and 
                beautiful moments life has to offer. Happy Birthday, beautiful soul! 🌙💜✨"
              </p>
            </motion.div>
          )}

          {/* Birthday Elements - only show on June 25th */}
          {isBirthday && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {birthdayElements.map((element, index) => {
                const Icon = element.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + element.delay }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{element.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isBirthday ? 1.4 : 0.8, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 pb-20 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.path}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (isBirthday ? 1.6 : 1.0) + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Link to={feature.path} className="block">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                    {/* Birthday sparkle effect - only show on June 25th */}
                    {isBirthday && (
                      <div className="absolute top-2 right-2">
                        <Sparkles className="w-4 h-4 text-pink-400 opacity-60" />
                      </div>
                    )}
                    
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
        transition={{ delay: isBirthday ? 2.0 : 1.5 }}
        className="max-w-4xl mx-auto px-4 pb-20 relative z-10"
      >
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <Moon className="w-8 h-8 text-purple-500" />
            <h3 className="text-2xl font-bold text-gray-800">
              {isBirthday ? 'Birthday Inspiration' : 'Daily Inspiration'}
            </h3>
          </div>
          <blockquote className="text-lg text-gray-700 italic leading-relaxed">
            {isBirthday ? (
              "Divya, you are not just a star in the night sky - you are the entire constellation that makes someone's world complete. Your emotions, your strength, your beautiful complexity - it all matters. Today, on your birthday, remember that you are loved beyond measure, and your presence in this world makes it infinitely more beautiful. May this year bring you all the joy, love, and magical moments you deserve! ✨🌙💜"
            ) : (
              "You are not just a star in the night sky, Divya. You are the entire constellation that makes someone's world complete. Your emotions, your strength, your beautiful complexity - it all matters. Today and every day, remember that you are loved beyond measure. ✨"
            )}
          </blockquote>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isBirthday ? 2.2 : 1.7 }}
        className="text-center pb-20 px-4 relative z-10"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-8">
          {isBirthday ? 'Start Your Birthday Journey' : 'Quick Start'}
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/chat" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            {isBirthday ? 'Chat with AI' : 'Start Chatting'}
          </Link>
          <Link 
            to="/tarot" 
            className="bg-white text-purple-600 border-2 border-purple-500 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            {isBirthday ? 'Birthday Reading' : 'Daily Reading'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home; 