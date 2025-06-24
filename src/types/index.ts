export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface TarotCard {
  name: string;
  description: string;
  meaning: string;
  reversed?: boolean;
}

export interface MoodEntry {
  id: string;
  date: Date;
  mood: 'happy' | 'sad' | 'excited' | 'calm' | 'anxious' | 'loved' | 'confused';
  intensity: number; // 1-10
  notes: string;
  activities: string[];
}

export interface LoveLetter {
  id: string;
  title: string;
  content: string;
  date: Date;
  category: 'romantic' | 'friendship' | 'support' | 'funny';
  isRead: boolean;
}

export interface DivyaInsight {
  personality: string[];
  interests: string[];
  fears: string[];
  dreams: string[];
  quirks: string[];
  relationship_dynamics: string[];
} 