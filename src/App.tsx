import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Chat from './components/Chat';
import TarotReader from './components/TarotReader';
import MoodTracker from './components/MoodTracker';
import LoveLetters from './components/LoveLetters';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tarot" element={<TarotReader />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/letters" element={<LoveLetters />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
