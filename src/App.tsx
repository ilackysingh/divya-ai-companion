import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './components/Home';
import ChatBot from './components/ChatBot';
import TarotReader from './components/TarotReader';
import MoodTracker from './components/MoodTracker';
import LoveLetters from './components/LoveLetters';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="app-container"
        >
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<ChatBot />} />
              <Route path="/tarot" element={<TarotReader />} />
              <Route path="/mood" element={<MoodTracker />} />
              <Route path="/letters" element={<LoveLetters />} />
            </Routes>
          </main>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;
