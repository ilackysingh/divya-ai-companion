import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Chat from './components/Chat';
import TarotReader from './components/TarotReader';
import MoodTracker from './components/MoodTracker';
import LoveLetters from './components/LoveLetters';
import DreamJournal from './components/DreamJournal';
import MorningRitual from './components/MorningRitual';
import MemoryLane from './components/MemoryLane';
import PhotoGallery from './components/PhotoGallery';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="lg:pt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/tarot" element={<TarotReader />} />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/letters" element={<LoveLetters />} />
            <Route path="/dreams" element={<DreamJournal />} />
            <Route path="/ritual" element={<MorningRitual />} />
            <Route path="/memories" element={<MemoryLane />} />
            <Route path="/gallery" element={<PhotoGallery />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
