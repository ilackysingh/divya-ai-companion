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
  Sunrise,
  Palette,
  Settings,
  Bell,
  Search,
  Zap,
  Gift,
  Music,
  Bookmark
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
        className="fixed top-6 right-6 z-50 lg:hidden bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/30 hover:bg-white/95 transition-all duration-300"
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
              <X className="w-7 h-7 text-gray-700" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-7 h-7 text-gray-700" />
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
              className="absolute right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/30"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Divya's World</h2>
                    <p className="text-gray-600 text-sm">Navigate your journey</p>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex gap-3 mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200 hover:from-purple-200 hover:to-pink-200 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Search className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-700">Search</span>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border border-blue-200 hover:from-blue-200 hover:to-indigo-200 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Bell className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Alerts</span>
                    </div>
                  </motion.button>
                </div>
                
                {/* Navigation Items */}
                <nav className="space-y-3">
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
                          className={`group flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-300 ${
                            isActive(item.path)
                              ? `bg-gradient-to-r ${item.color} text-white shadow-xl scale-105`
                              : 'text-gray-700 hover:bg-gray-50 hover:scale-105 hover:shadow-lg'
                          }`}
                        >
                          <div className={`p-3 rounded-xl ${
                            isActive(item.path) 
                              ? 'bg-white/20' 
                              : 'bg-gray-100 group-hover:bg-gray-200'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{item.emoji}</span>
                              <span className="font-bold text-lg">{item.label}</span>
                            </div>
                            <p className={`text-sm mt-1 ${
                              isActive(item.path) ? 'text-white/80' : 'text-gray-500'
                            }`}>
                              {item.description}
                            </p>
                          </div>
                          {isActive(item.path) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 bg-white rounded-full"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Made with 💖 for Divya</p>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                      <Moon className="w-4 h-4" />
                      <span>Every moment is special</span>
                      <Sunrise className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-4"
        >
          <div className="flex items-center gap-3">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 pr-4 border-r border-gray-200"
            >
              <motion.button
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-200 group"
              >
                <Search className="w-5 h-5 text-purple-600 group-hover:text-purple-700" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 transition-all duration-200 group"
              >
                <Bell className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
              </motion.button>
            </motion.div>

            {/* Main Navigation */}
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ y: -5 }}
                >
                  <Link
                    to={item.path}
                    className={`relative group p-4 rounded-2xl transition-all duration-300 ${
                      isActive(item.path)
                        ? `bg-gradient-to-r ${item.color} text-white shadow-xl scale-110`
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 hover:scale-105'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon className="w-7 h-7" />
                      <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-w-0 group-hover:max-w-24 overflow-hidden">
                        {item.label.split(' ')[0]}
                      </span>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-gray-800 text-white text-base rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.emoji}</span>
                        <span className="font-semibold">{item.label}</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-2">{item.description}</p>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-800"></div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Additional Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 pl-4 border-l border-gray-200"
            >
              <motion.button
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 transition-all duration-200 group"
              >
                <Bookmark className="w-5 h-5 text-green-600 group-hover:text-green-700" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-2xl bg-gradient-to-r from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200 transition-all duration-200 group"
              >
                <Gift className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navigation; 