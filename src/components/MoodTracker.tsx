import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Heart, Activity, TrendingUp, Calendar } from 'lucide-react';
import { MoodEntry } from '../types';
import { analyzeMood } from '../services/openai';

const MoodTracker: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<MoodEntry['mood'] | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const moodOptions = [
    { value: 'happy', label: 'Happy', emoji: '😊', color: 'from-yellow-400 to-orange-400' },
    { value: 'excited', label: 'Excited', emoji: '🤩', color: 'from-pink-400 to-red-400' },
    { value: 'calm', label: 'Calm', emoji: '😌', color: 'from-blue-400 to-indigo-400' },
    { value: 'loved', label: 'Loved', emoji: '🥰', color: 'from-pink-400 to-purple-400' },
    { value: 'confused', label: 'Confused', emoji: '😕', color: 'from-gray-400 to-blue-400' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', color: 'from-orange-400 to-red-400' },
    { value: 'sad', label: 'Sad', emoji: '😢', color: 'from-blue-400 to-purple-400' },
  ];

  const activityOptions = [
    'Reading', 'Music', 'Exercise', 'Cooking', 'Art', 'Gaming',
    'Social Media', 'Work', 'Study', 'Shopping', 'Travel', 'Sleep',
    'Meditation', 'Writing', 'Photography', 'Dancing', 'Yoga'
  ];

  const handleMoodSelect = (mood: MoodEntry['mood']) => {
    setCurrentMood(mood);
  };

  const handleActivityToggle = (activity: string) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = async () => {
    if (!currentMood) return;

    const newEntry: Omit<MoodEntry, 'id'> = {
      date: new Date(),
      mood: currentMood,
      intensity,
      notes,
      activities
    };

    setIsAnalyzing(true);
    try {
      const aiAnalysis = await analyzeMood(newEntry);
      setAnalysis(aiAnalysis);
      
      const entryWithId: MoodEntry = {
        ...newEntry,
        id: Date.now().toString()
      };
      
      setMoodHistory(prev => [entryWithId, ...prev]);
      
      // Reset form
      setCurrentMood(null);
      setIntensity(5);
      setNotes('');
      setActivities([]);
    } catch (error) {
      console.error('Error analyzing mood:', error);
      setAnalysis("I understand how you're feeling. Remember, every emotion is valid and temporary. You're stronger than you know! 💜");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getMoodStats = () => {
    if (moodHistory.length === 0) return null;
    
    const recentMoods = moodHistory.slice(0, 7); // Last 7 entries
    const moodCounts = recentMoods.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostFrequentMood = Object.entries(moodCounts)
      .sort(([,a], [,b]) => b - a)[0][0] as MoodEntry['mood'];
    
    return { mostFrequentMood, totalEntries: moodHistory.length };
  };

  const stats = getMoodStats();

  return (
    <div className="mood-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mood-header"
      >
        <div className="mood-header-content">
          <Smile className="mood-header-icon" />
          <div>
            <h2>Mood Tracker</h2>
            <p>Track your emotions and get personalized insights, Divya 💜</p>
          </div>
        </div>
      </motion.div>

      <div className="mood-content">
        {/* Mood Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mood-section"
        >
          <h3>How are you feeling today?</h3>
          <div className="mood-options">
            {moodOptions.map((mood) => (
              <motion.button
                key={mood.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMoodSelect(mood.value as MoodEntry['mood'])}
                className={`mood-option ${currentMood === mood.value ? 'selected' : ''}`}
              >
                <span className="mood-emoji">{mood.emoji}</span>
                <span className="mood-label">{mood.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Intensity Slider */}
        {currentMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mood-section"
          >
            <h3>How intense is this feeling? ({intensity}/10)</h3>
            <div className="intensity-slider">
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="slider"
              />
              <div className="slider-labels">
                <span>Mild</span>
                <span>Intense</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Activities */}
        {currentMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mood-section"
          >
            <h3>What have you been doing today?</h3>
            <div className="activities-grid">
              {activityOptions.map((activity) => (
                <motion.button
                  key={activity}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleActivityToggle(activity)}
                  className={`activity-chip ${activities.includes(activity) ? 'selected' : ''}`}
                >
                  {activity}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Notes */}
        {currentMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mood-section"
          >
            <h3>Any thoughts or notes?</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share what's on your mind..."
              className="mood-notes"
              rows={3}
            />
          </motion.div>
        )}

        {/* Submit Button */}
        {currentMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mood-section"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isAnalyzing}
              className="submit-mood-btn"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="loading-icon" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Heart className="btn-icon" />
                  Get Insights
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* AI Analysis */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mood-analysis"
            >
              <div className="analysis-content">
                <Heart className="analysis-icon" />
                <div>
                  <h4>Your Personal Insight</h4>
                  <p>{analysis}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mood Stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mood-stats"
          >
            <div className="stats-content">
              <TrendingUp className="stats-icon" />
              <div>
                <h4>Your Mood Patterns</h4>
                <p>
                  You've tracked {stats.totalEntries} mood entries. 
                  Your most frequent mood lately has been: 
                  <strong> {moodOptions.find(m => m.value === stats.mostFrequentMood)?.label}</strong>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Entries */}
        {moodHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mood-history"
          >
            <h3>Recent Entries</h3>
            <div className="history-list">
              {moodHistory.slice(0, 5).map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="history-item"
                >
                  <div className="history-mood">
                    <span className="history-emoji">
                      {moodOptions.find(m => m.value === entry.mood)?.emoji}
                    </span>
                    <span className="history-label">
                      {moodOptions.find(m => m.value === entry.mood)?.label}
                    </span>
                  </div>
                  <div className="history-details">
                    <span className="history-intensity">{entry.intensity}/10</span>
                    <span className="history-date">
                      {entry.date.toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker; 