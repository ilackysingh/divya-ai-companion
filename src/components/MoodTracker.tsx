import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, TrendingUp, Calendar, Heart, Activity, Sparkles } from 'lucide-react';
import { analyzeMood } from '../services/openai';
import { MoodEntry } from '../types';

const MoodTracker: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const activities = [
    'Work', 'Exercise', 'Reading', 'Music', 'Socializing', 
    'Cooking', 'Gaming', 'Shopping', 'Travel', 'Rest'
  ];

  const moodColors = {
    'Happy': 'bg-yellow-100 text-yellow-800',
    'Sad': 'bg-blue-100 text-blue-800',
    'Angry': 'bg-red-100 text-red-800',
    'Anxious': 'bg-orange-100 text-orange-800',
    'Excited': 'bg-green-100 text-green-800',
    'Calm': 'bg-purple-100 text-purple-800',
    'Tired': 'bg-gray-100 text-gray-800',
    'Energetic': 'bg-pink-100 text-pink-800'
  };

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = async () => {
    if (!currentMood.trim()) return;

    const newEntry: Omit<MoodEntry, 'id'> = {
      mood: currentMood,
      intensity,
      notes,
      activities: selectedActivities,
      timestamp: new Date()
    };

    setIsAnalyzing(true);
    try {
      const insight = await analyzeMood(newEntry);
      const entryWithInsight: MoodEntry = {
        ...newEntry,
        id: Date.now().toString(),
        aiInsight: insight
      };
      setMoodEntries(prev => [entryWithInsight, ...prev]);
      
      // Reset form
      setCurrentMood('');
      setIntensity(5);
      setNotes('');
      setSelectedActivities([]);
      setShowForm(false);
    } catch (error) {
      console.error('Error analyzing mood:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const total = moodEntries.reduce((sum, entry) => sum + entry.intensity, 0);
    return Math.round(total / moodEntries.length);
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
              <Smile className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mood Tracker
              </h1>
              <p className="text-gray-600 mt-2">Track your emotions and get personalized insights, Divya 💜</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Average Mood</p>
                <p className="text-2xl font-bold text-gray-800">{getAverageMood()}/10</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Entries This Week</p>
                <p className="text-2xl font-bold text-gray-800">{moodEntries.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Most Common</p>
                <p className="text-2xl font-bold text-gray-800">
                  {moodEntries.length > 0 
                    ? (() => {
                        const moodCounts = moodEntries.reduce((acc, entry) => {
                          acc[entry.mood] = (acc[entry.mood] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>);
                        const mostCommon = Object.entries(moodCounts)
                          .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
                        return mostCommon;
                      })()
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add New Entry Button */}
        {!showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Sparkles className="w-6 h-6" />
              Track Your Mood
            </motion.button>
          </motion.div>
        )}

        {/* Mood Entry Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">How are you feeling today?</h3>
              
              {/* Mood Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">Current Mood</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.keys(moodColors).map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setCurrentMood(mood)}
                      className={`p-3 rounded-xl font-medium transition-all duration-300 ${
                        currentMood === mood
                          ? 'ring-2 ring-purple-500 bg-purple-50'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Intensity Slider */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">
                  Intensity: {intensity}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              {/* Activities */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">What did you do today?</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {activities.map((activity) => (
                    <button
                      key={activity}
                      onClick={() => handleActivityToggle(activity)}
                      className={`p-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                        selectedActivities.includes(activity)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">Additional Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share what's on your mind..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={!currentMood.trim() || isAnalyzing}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentMood.trim() && !isAnalyzing
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Save & Analyze'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mood History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Mood History</h3>
          <div className="space-y-4">
            <AnimatePresence>
              {moodEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                        moodColors[entry.mood as keyof typeof moodColors] || 'bg-gray-100 text-gray-800'
                      }`}>
                        {entry.mood}
                      </div>
                      <div className="text-sm text-gray-500">
                        Intensity: {entry.intensity}/10
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {entry.timestamp.toLocaleDateString()}
                    </div>
                  </div>

                  {entry.activities.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Activities:</p>
                      <div className="flex flex-wrap gap-2">
                        {entry.activities.map((activity) => (
                          <span key={activity} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Notes:</p>
                      <p className="text-gray-800">{entry.notes}</p>
                    </div>
                  )}

                  {entry.aiInsight && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <p className="text-sm font-medium text-purple-700">AI Insight</p>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{entry.aiInsight}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {moodEntries.length === 0 && (
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No mood entries yet. Start tracking to see your patterns!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MoodTracker; 