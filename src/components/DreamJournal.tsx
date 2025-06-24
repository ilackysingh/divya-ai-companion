import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Star, PenTool, Sparkles, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DreamEntry {
  id: string;
  date: Date;
  dream: string;
  interpretation: string;
  mood: 'peaceful' | 'mysterious' | 'intense' | 'joyful' | 'confusing';
}

const DreamJournal: React.FC = () => {
  const [dreams, setDreams] = useState<DreamEntry[]>([
    {
      id: '1',
      date: new Date(),
      dream: "I was walking under a full moon, and the stars were singing to me. I felt so peaceful and connected to something bigger than myself.",
      interpretation: "This dream reflects your deep connection to the moon and your spiritual nature. The singing stars suggest harmony and inner peace. It's a beautiful reminder of your 'selenophile' heart.",
      mood: 'peaceful'
    }
  ]);
  const [newDream, setNewDream] = useState('');
  const [selectedMood, setSelectedMood] = useState<DreamEntry['mood']>('peaceful');
  const [isInterpreting, setIsInterpreting] = useState(false);

  const moodColors = {
    peaceful: 'from-blue-400 to-teal-400',
    mysterious: 'from-purple-400 to-indigo-400',
    intense: 'from-red-400 to-pink-400',
    joyful: 'from-yellow-400 to-orange-400',
    confusing: 'from-gray-400 to-slate-400'
  };

  const moodIcons = {
    peaceful: '🌙',
    mysterious: '✨',
    intense: '🔥',
    joyful: '⭐',
    confusing: '🌫️'
  };

  const handleAddDream = async () => {
    if (!newDream.trim()) return;

    setIsInterpreting(true);
    
    // Simulate interpretation delay
    setTimeout(() => {
      const interpretation = generateDreamInterpretation(newDream, selectedMood);
      const dreamEntry: DreamEntry = {
        id: Date.now().toString(),
        date: new Date(),
        dream: newDream,
        interpretation,
        mood: selectedMood
      };
      
      setDreams(prev => [dreamEntry, ...prev]);
      setNewDream('');
      setIsInterpreting(false);
    }, 2000);
  };

  const generateDreamInterpretation = (dream: string, mood: DreamEntry['mood']): string => {
    const interpretations = {
      peaceful: [
        "This dream reflects your inner peace and connection to the moon. Your 'selenophile' heart is finding harmony.",
        "A peaceful dream like this shows you're in tune with your emotions and spiritual side.",
        "The tranquility in this dream mirrors your desire for calm in your current situation."
      ],
      mysterious: [
        "The mystery in this dream suggests you're exploring unknown aspects of yourself.",
        "Your intuitive nature is guiding you through this mysterious journey.",
        "This dream reflects the beautiful complexity of your Scorpio nature."
      ],
      intense: [
        "The intensity reflects your passionate nature and deep emotions.",
        "This dream shows your strength and ability to handle powerful feelings.",
        "Your protective Scorpio energy is manifesting in this intense dream."
      ],
      joyful: [
        "Joy in dreams often reflects hope and optimism about your future.",
        "This dream celebrates your beautiful spirit and positive energy.",
        "The joy suggests good things are coming your way."
      ],
      confusing: [
        "Confusion in dreams often reflects uncertainty in waking life.",
        "This dream shows you're processing complex emotions and situations.",
        "Trust that clarity will come as you work through these feelings."
      ]
    };

    const moodInterpretations = interpretations[mood];
    return moodInterpretations[Math.floor(Math.random() * moodInterpretations.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Moon className="w-8 h-8 text-blue-500" />
                <Star className="absolute -top-1 -right-1 w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Dream Journal</h1>
                <p className="text-sm text-gray-600">Record and explore your dreams, Divya</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Add New Dream */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <PenTool className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Record Your Dream</h2>
          </div>
          
          <textarea
            value={newDream}
            onChange={(e) => setNewDream(e.target.value)}
            placeholder="Describe your dream here... What did you see, feel, experience? 🌙✨"
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
            rows={4}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Dream Mood</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(moodColors).map(([mood, colors]) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood as DreamEntry['mood'])}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedMood === mood
                      ? `bg-gradient-to-r ${colors} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {moodIcons[mood as DreamEntry['mood']]} {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddDream}
            disabled={!newDream.trim() || isInterpreting}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isInterpreting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Interpreting...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Interpret Dream
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Dream Entries */}
        <div className="space-y-6">
          {dreams.map((dream, index) => (
            <motion.div
              key={dream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${moodColors[dream.mood]} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{moodIcons[dream.mood]}</span>
                    <span className="font-semibold capitalize">{dream.mood} Dream</span>
                  </div>
                  <span className="text-sm opacity-90">
                    {dream.date.toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Moon className="w-5 h-5 text-blue-500" />
                    Your Dream
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{dream.dream}</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-500" />
                    Interpretation
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{dream.interpretation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {dreams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Moon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Dreams Recorded Yet</h3>
            <p className="text-gray-600">Start by recording your first dream above! 🌙✨</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DreamJournal; 