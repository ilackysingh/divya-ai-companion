import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Plus, Eye, EyeOff, Sparkles, Calendar } from 'lucide-react';
import { generateLoveLetter } from '../services/openai';
import { LoveLetter } from '../types';

const LoveLetters: React.FC = () => {
  const [letters, setLetters] = useState<LoveLetter[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<LoveLetter['category']>('romantic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null);

  const categories = [
    { value: 'romantic', label: 'Romantic', icon: Heart, color: 'from-red-500 to-pink-500' },
    { value: 'friendship', label: 'Friendship', icon: Heart, color: 'from-blue-500 to-purple-500' },
    { value: 'encouragement', label: 'Encouragement', icon: Sparkles, color: 'from-green-500 to-blue-500' },
    { value: 'gratitude', label: 'Gratitude', icon: Heart, color: 'from-yellow-500 to-orange-500' }
  ];

  const handleGenerateLetter = async () => {
    setIsGenerating(true);
    try {
      const newLetter = await generateLoveLetter(selectedCategory);
      setLetters(prev => [newLetter, ...prev]);
    } catch (error) {
      console.error('Error generating letter:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLetterClick = (letter: LoveLetter) => {
    if (selectedLetter?.id === letter.id) {
      setSelectedLetter(null);
    } else {
      setSelectedLetter(letter);
      if (!letter.isRead) {
        setLetters(prev => 
          prev.map(l => l.id === letter.id ? { ...l, isRead: true } : l)
        );
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
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
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Love Letters
              </h1>
              <p className="text-gray-600 mt-2">Personalized letters written just for you, Divya 💌</p>
            </div>
          </div>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Choose a Letter Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.value as LoveLetter['category'])}
                  className={`p-4 rounded-2xl font-medium transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm">{category.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateLetter}
            disabled={isGenerating}
            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 mx-auto ${
              isGenerating
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Writing your letter...
              </>
            ) : (
              <>
                <Plus className="w-6 h-6" />
                Generate New Letter
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Letters Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Letters</h3>
          
          {letters.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No letters yet. Generate your first one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {letters.map((letter) => (
                  <motion.div
                    key={letter.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                    onClick={() => handleLetterClick(letter)}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{letter.title}</h4>
                            <p className="text-sm text-gray-500 capitalize">{letter.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {letter.isRead ? (
                            <Eye className="w-4 h-4 text-green-500" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-orange-500" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4" />
                        {formatDate(letter.date)}
                      </div>

                      <div className="relative">
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {letter.content}
                        </p>
                        <div className="absolute bottom-0 right-0 bg-gradient-to-l from-white via-white to-transparent w-8 h-6"></div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {letter.isRead ? 'Read' : 'Unread'}
                          </span>
                          <span className="text-xs text-purple-500 font-medium">
                            Click to {letter.isRead ? 'view' : 'read'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Letter Detail Modal */}
        <AnimatePresence>
          {selectedLetter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedLetter(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedLetter.title}</h3>
                    <p className="text-gray-500 capitalize">{selectedLetter.category}</p>
                  </div>
                  <button
                    onClick={() => setSelectedLetter(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedLetter.date)}
                </div>

                <div className="prose prose-lg max-w-none">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {selectedLetter.content}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-purple-600">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Written with love for you, Divya</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoveLetters; 