import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Moon, Heart, Smile, BookOpen } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Moon },
    { path: '/chat', label: 'Chat', icon: MessageCircle },
    { path: '/tarot', label: 'Tarot', icon: BookOpen },
    { path: '/mood', label: 'Mood', icon: Smile },
    { path: '/letters', label: 'Letters', icon: Heart },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="navigation"
    >
      <div className="nav-container">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="nav-brand"
        >
          <Link to="/">
            <Moon className="nav-logo" />
            <span>Divya's AI</span>
          </Link>
        </motion.div>
        
        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="active-indicator"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation; 