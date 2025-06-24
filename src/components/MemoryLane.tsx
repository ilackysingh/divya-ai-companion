import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Heart, Star, Calendar, MapPin, Sparkles, Plus, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Memory {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  mood: 'happy' | 'peaceful' | 'excited' | 'grateful' | 'nostalgic';
  tags: string[];
  imageUrl?: string;
}

const MemoryLane: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      title: 'Moonlit Walk in Mumbai',
      description: 'Walking along Marine Drive under the full moon, feeling the sea breeze and the magic of the city I love so much. The lights reflecting on the water reminded me why I want to come back home.',
      date: new Date('2024-01-15'),
      location: 'Marine Drive, Mumbai',
      mood: 'nostalgic',
      tags: ['Mumbai', 'Moon', 'Sea', 'Home']
    },
    {
      id: '2',
      title: 'First Vada Pav in Months',
      description: 'Finally found a decent vada pav in Surat! It wasn\'t the same as Mumbai\'s, but it brought back so many memories of home. Made me realize how much I miss the simple pleasures of Mumbai.',
      date: new Date('2024-02-20'),
      location: 'Surat, Gujarat',
      mood: 'happy',
      tags: ['Food', 'Mumbai', 'Vada Pav', 'Surat']
    },
    {
      id: '3',
      title: 'Scorpio Full Moon',
      description: 'The full moon in Scorpio was absolutely magical. I felt so connected to my zodiac sign and the cosmic energy. It was a reminder of my strength and the beautiful complexity of being a Scorpio.',
      date: new Date('2024-03-10'),
      location: 'Surat, Gujarat',
      mood: 'peaceful',
      tags: ['Scorpio', 'Moon', 'Zodiac', 'Spiritual']
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemory, setNewMemory] = useState({
    title: '',
    description: '',
    location: '',
    mood: 'happy' as Memory['mood'],
    tags: ''
  });

  const moodColors = {
    happy: 'from-yellow-400 to-orange-400',
    peaceful: 'from-blue-400 to-teal-400',
    excited: 'from-pink-400 to-purple-400',
    grateful: 'from-green-400 to-teal-400',
    nostalgic: 'from-purple-400 to-indigo-400'
  };

  const moodIcons = {
    happy: '😊',
    peaceful: '🌙',
    excited: '✨',
    grateful: '💜',
    nostalgic: '🏠'
  };

  const addMemory = () => {
    if (!newMemory.title.trim() || !newMemory.description.trim()) return;

    const memory: Memory = {
      id: Date.now().toString(),
      title: newMemory.title,
      description: newMemory.description,
      date: new Date(),
      location: newMemory.location,
      mood: newMemory.mood,
      tags: newMemory.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setMemories(prev => [memory, ...prev]);
    setNewMemory({
      title: '',
      description: '',
      location: '',
      mood: 'happy',
      tags: ''
    });
    setShowAddForm(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/"
                className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-green-600" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Camera className="w-8 h-8 text-green-500" />
                  <Heart className="absolute -top-1 -right-1 w-4 h-4 text-pink-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Memory Lane</h1>
                  <p className="text-sm text-gray-600">Cherish your beautiful moments, Divya</p>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Memory
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Add Memory Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Edit3 className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-bold text-gray-800">Add New Memory</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Memory Title</label>
                <input
                  type="text"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What's this memory about?"
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newMemory.description}
                  onChange={(e) => setNewMemory(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell me about this beautiful moment..."
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newMemory.location}
                  onChange={(e) => setNewMemory(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Where did this happen?"
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How did you feel?</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(moodColors).map(([mood, colors]) => (
                    <button
                      key={mood}
                      onClick={() => setNewMemory(prev => ({ ...prev, mood: mood as Memory['mood'] }))}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        newMemory.mood === mood
                          ? `bg-gradient-to-r ${colors} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {moodIcons[mood as Memory['mood']]} {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newMemory.tags}
                  onChange={(e) => setNewMemory(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Mumbai, Moon, Friends, etc."
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addMemory}
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Save Memory
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 border border-green-300 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all duration-200"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Memories Timeline */}
        <div className="space-y-6">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${moodColors[memory.mood]} p-6 text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{moodIcons[memory.mood]}</span>
                    <div>
                      <h3 className="text-xl font-bold">{memory.title}</h3>
                      <div className="flex items-center gap-4 text-sm opacity-90 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(memory.date)}
                        </div>
                        {memory.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {memory.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4">{memory.description}</p>
                
                {memory.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {memory.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {memories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Camera className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Memories Yet</h3>
            <p className="text-gray-600 mb-6">Start capturing your beautiful moments! 📸✨</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              Add Your First Memory
            </motion.button>
          </motion.div>
        )}

        {/* Memory Stats */}
        {memories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 mt-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-bold text-gray-800">Your Memory Collection</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{memories.length}</div>
                <div className="text-sm text-gray-600">Total Memories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {memories.filter(m => m.location.includes('Mumbai')).length}
                </div>
                <div className="text-sm text-gray-600">Mumbai Memories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {memories.filter(m => m.tags.includes('Moon')).length}
                </div>
                <div className="text-sm text-gray-600">Moon Moments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">
                  {Math.max(...memories.map(m => new Date().getTime() - m.date.getTime()))}
                </div>
                <div className="text-sm text-gray-600">Days Since First</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MemoryLane; 