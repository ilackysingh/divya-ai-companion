export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface TarotCard {
  id?: string;
  name: string;
  description: string;
  meaning: string;
  reversed: boolean;
}

export interface MoodEntry {
  id: string;
  mood: string;
  intensity: number;
  notes: string;
  activities: string[];
  timestamp: Date;
  aiInsight?: string;
}

export interface LoveLetter {
  id: string;
  title: string;
  content: string;
  date: Date;
  category: 'romantic' | 'friendship' | 'encouragement' | 'gratitude';
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