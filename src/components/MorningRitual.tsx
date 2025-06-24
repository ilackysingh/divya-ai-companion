import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Coffee, Sun, Sparkles, Heart, Star, Moon, Target, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Affirmation {
  id: string;
  text: string;
  category: 'strength' | 'peace' | 'growth' | 'love';
  icon: string;
  color: string;
}

interface Intention {
  id: string;
  text: string;
  completed: boolean;
}

const MorningRitual: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedAffirmations, setSelectedAffirmations] = useState<string[]>([]);
  const [intentions, setIntentions] = useState<Intention[]>([]);
  const [newIntention, setNewIntention] = useState('');
  const [showGratitude, setShowGratitude] = useState(false);

  const affirmations: Affirmation[] = [
    {
      id: '1',
      text: "I am strong, resilient, and capable of handling any challenge that comes my way",
      category: 'strength',
      icon: '💪',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: '2',
      text: "I trust my intuition and inner wisdom to guide me through life's journey",
      category: 'growth',
      icon: '✨',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: '3',
      text: "I am worthy of love, respect, and all the beautiful things life has to offer",
      category: 'love',
      icon: '💜',
      color: 'from-pink-500 to-red-500'
    },
    {
      id: '4',
      text: "I embrace my Scorpio nature - my intensity, passion, and protective love",
      category: 'strength',
      icon: '🦂',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: '5',
      text: "I am connected to the moon's energy and find peace in its gentle light",
      category: 'peace',
      icon: '🌙',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: '6',
      text: "I am moving towards my dreams, one step at a time, with patience and faith",
      category: 'growth',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: '7',
      text: "I choose to see the beauty in every moment, even the challenging ones",
      category: 'peace',
      icon: '🌸',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: '8',
      text: "I am exactly where I need to be, and my journey is unfolding perfectly",
      category: 'growth',
      icon: '🌱',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const gratitudePrompts = [
    "I'm grateful for my strength and resilience...",
    "I'm grateful for the people who love and support me...",
    "I'm grateful for the lessons I've learned...",
    "I'm grateful for the beauty around me...",
    "I'm grateful for my dreams and aspirations...",
    "I'm grateful for this new day and new opportunities...",
    "I'm grateful for my connection to the moon and stars...",
    "I'm grateful for the journey that brought me here..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleAffirmation = (id: string) => {
    setSelectedAffirmations(prev => 
      prev.includes(id) 
        ? prev.filter(aff => aff !== id)
        : [...prev, id]
    );
  };

  const addIntention = () => {
    if (!newIntention.trim()) return;
    
    const intention: Intention = {
      id: Date.now().toString(),
      text: newIntention,
      completed: false
    };
    
    setIntentions(prev => [...prev, intention]);
    setNewIntention('');
  };

  const toggleIntention = (id: string) => {
    setIntentions(prev => 
      prev.map(intention => 
        intention.id === id 
          ? { ...intention, completed: !intention.completed }
          : intention
      )
    );
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-orange-200"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-orange-600" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Coffee className="w-8 h-8 text-orange-500" />
                <Sun className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Morning Ritual</h1>
                <p className="text-sm text-gray-600">Start your day with intention, Divya</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Time and Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 mb-8 text-center"
        >
          <div className="text-4xl font-bold text-gray-800 mb-2">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-xl text-gray-600 mb-4">{getGreeting()}, Divya! 🌅</div>
          <div className="text-sm text-gray-500">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </motion.div>

        {/* Affirmations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">Choose Your Affirmations</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {affirmations.map((affirmation, index) => (
              <motion.div
                key={affirmation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => toggleAffirmation(affirmation.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedAffirmations.includes(affirmation.id)
                    ? `bg-gradient-to-r ${affirmation.color} text-white border-transparent shadow-lg`
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{affirmation.icon}</span>
                  <p className="text-sm leading-relaxed">{affirmation.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Intentions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">Today's Intentions</h2>
          </div>
          
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={newIntention}
              onChange={(e) => setNewIntention(e.target.value)}
              placeholder="What do you want to focus on today?"
              className="flex-1 px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && addIntention()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addIntention}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Add
            </motion.button>
          </div>
          
          <div className="space-y-3">
            {intentions.map((intention, index) => (
              <motion.div
                key={intention.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <button
                  onClick={() => toggleIntention(intention.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    intention.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {intention.completed && <CheckCircle className="w-4 h-4" />}
                </button>
                <span className={`flex-1 ${intention.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                  {intention.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gratitude */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">Gratitude Practice</h2>
          </div>
          
          {!showGratitude ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowGratitude(true)}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              Start Gratitude Practice
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {gratitudePrompts.map((prompt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.2 }}
                  className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200"
                >
                  <p className="text-gray-700 leading-relaxed">{prompt}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Daily Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">Today's Inspiration</h2>
          </div>
          <blockquote className="text-lg text-gray-700 italic leading-relaxed">
            "Divya, every morning is a new beginning, a fresh chance to embrace your beautiful complexity. 
            Your Scorpio strength, your selenophile heart, your dreams of returning to Mumbai - they all matter. 
            Today, choose to be kind to yourself, trust your journey, and remember that you are exactly where you need to be. 
            The moon will always guide you home. 🌙✨"
          </blockquote>
        </motion.div>
      </div>
    </div>
  );
};

export default MorningRitual; 