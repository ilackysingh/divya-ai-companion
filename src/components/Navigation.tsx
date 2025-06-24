import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageCircle, 
  BookOpen, 
  Smile, 
  Heart, 
  PenTool, 
  Coffee, 
  Camera,
  Image,
  Menu,
  X,
  Sparkles,
  Star,
  Moon,
  Sunrise
} from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'from-rose-500 to-pink-500', emoji: '🏠', description: 'Your personal space' },
    { path: '/chat', icon: MessageCircle, label: 'Chat Companion', color: 'from-blue-500 to-indigo-500', emoji: '💬', description: 'Talk with your companion' },
    { path: '/tarot', icon: BookOpen, label: 'Tarot Reader', color: 'from-purple-500 to-violet-500', emoji: '🔮', description: 'Daily guidance & insights' },
    { path: '/mood', icon: Smile, label: 'Mood Tracker', color: 'from-yellow-500 to-orange-500', emoji: '😊', description: 'Track your emotions' },
    { path: '/letters', icon: Heart, label: 'Love Letters', color: 'from-red-500 to-rose-500', emoji: '💌', description: 'Personal love notes' },
    { path: '/dreams', icon: PenTool, label: 'Dream Journal', color: 'from-indigo-500 to-purple-500', emoji: '🌙', description: 'Record your dreams' },
    { path: '/ritual', icon: Coffee, label: 'Morning Ritual', color: 'from-amber-500 to-yellow-500', emoji: '☀️', description: 'Start your day right' },
    { path: '/memories', icon: Camera, label: 'Memory Lane', color: 'from-green-500 to-emerald-500', emoji: '📸', description: 'Cherished moments' },
    { path: '/gallery', icon: Image, label: 'Photo Gallery', color: 'from-cyan-500 to-blue-500', emoji: '🖼️', description: 'Visual memories' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-white/30 hover:bg-white/95 transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-gray-700" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/30"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Divya's World</h2>
                    <p className="text-gray-600 text-xs">Navigate your journey</p>
                  </div>
                </div>
                
                {/* Navigation Items */}
                <nav className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive(item.path)
                              ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                              : 'text-gray-700 hover:bg-gray-50 hover:shadow-md'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            isActive(item.path) 
                              ? 'bg-white/20' 
                              : 'bg-gray-100 group-hover:bg-gray-200'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{item.emoji}</span>
                              <span className="font-semibold text-sm">{item.label}</span>
                            </div>
                            <p className={`text-xs mt-1 ${
                              isActive(item.path) ? 'text-white/80' : 'text-gray-500'
                            }`}>
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Made with 💖 for Divya</p>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                      <Moon className="w-3 h-3" />
                      <span>Every moment is special</span>
                      <Sunrise className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Header Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/30"
        >
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex items-center justify-between">
              {/* Logo and Title */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-800">Divya's World</h1>
                  <p className="text-gray-600 text-xs">Your personal companion</p>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="flex items-center gap-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -1 }}
                    >
                      <Link
                        to={item.path}
                        className={`relative group px-2 py-1.5 rounded-md transition-all duration-300 ${
                          isActive(item.path)
                            ? 'text-gray-800 font-semibold'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5" />
                          <span className="font-medium text-xs">{item.label}</span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Empty div for spacing */}
              <div className="w-8 h-8"></div>
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navigation; 