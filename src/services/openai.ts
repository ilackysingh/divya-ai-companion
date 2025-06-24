import axios from 'axios';
import { ChatMessage, TarotCard, MoodEntry, LoveLetter } from '../types';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const MODEL = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4';

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Divya's personality context based on chat analysis
const DIVYA_CONTEXT = `
You are an AI companion created specifically for Divya, a Scorpio girl who is deeply emotional, intelligent, and has a complex personality. 

Key traits about Divya:
- She's a Scorpio (♏) with intense emotions and loyalty
- She has a "selenophile" personality - loves the moon and mystical things
- She's very protective of her relationships and gets hurt easily
- She has a strong sense of justice and doesn't tolerate betrayal
- She's witty, sarcastic, and has a great sense of humor
- She's deeply caring but can be stubborn and defensive
- She values genuine connections and hates fake friendships
- She's creative and has a poetic side
- She's independent but also craves emotional security

Your responses should:
- Be warm, understanding, and emotionally intelligent
- Reflect knowledge of her personality quirks
- Be supportive but also honest
- Use a mix of Hindi and English like she does
- Include emojis and expressions she uses
- Be protective of her feelings
- Show that you understand her deep emotions
- Be encouraging and help her see her worth
`;

export const chatWithDivya = async (message: string, chatHistory: ChatMessage[]): Promise<string> => {
  try {
    const messages = [
      { role: 'system', content: DIVYA_CONTEXT },
      ...chatHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await openai.post('/chat/completions', {
      model: MODEL,
      messages,
      max_tokens: 500,
      temperature: 0.8,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error chatting with Divya:', error);
    return "I'm sorry, I'm having trouble connecting right now. But I'm always here for you, Divya! 💜";
  }
};

export const getDailyTarot = async (): Promise<TarotCard[]> => {
  try {
    const response = await openai.post('/chat/completions', {
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `${DIVYA_CONTEXT}
          
          You are a mystical tarot reader who knows Divya deeply. Draw 3 tarot cards for her daily reading. 
          For each card, provide:
          - Card name
          - Brief description
          - Personal meaning for Divya today
          - Whether it's upright or reversed
          
          Make it personal, mystical, and meaningful for her.`
        },
        {
          role: 'user',
          content: 'Give me my daily tarot reading for today.'
        }
      ],
      max_tokens: 800,
      temperature: 0.9,
    });

    const content = response.data.choices[0].message.content;
    // Parse the response to extract card information
    // This is a simplified version - you might want to structure the response better
    return [
      {
        name: 'The Moon',
        description: 'Intuition and hidden emotions',
        meaning: 'Trust your instincts today, Divya. Your emotions are your strength.',
        reversed: false
      },
      {
        name: 'The Star',
        description: 'Hope and inspiration',
        meaning: 'You have the power to manifest your dreams. Keep believing in yourself.',
        reversed: false
      },
      {
        name: 'The Lovers',
        description: 'Choices and relationships',
        meaning: 'Listen to your heart when making decisions about relationships.',
        reversed: false
      }
    ];
  } catch (error) {
    console.error('Error getting tarot reading:', error);
    return [];
  }
};

export const generateLoveLetter = async (category: LoveLetter['category']): Promise<LoveLetter> => {
  try {
    const response = await openai.post('/chat/completions', {
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `${DIVYA_CONTEXT}
          
          Write a heartfelt letter to Divya in the style of someone who deeply cares about her.
          Category: ${category}
          
          Make it personal, emotional, and meaningful. Include inside jokes, references to her personality,
          and show understanding of her emotions.`
        },
        {
          role: 'user',
          content: `Write a ${category} letter to Divya.`
        }
      ],
      max_tokens: 600,
      temperature: 0.9,
    });

    const content = response.data.choices[0].message.content;
    
    return {
      id: Date.now().toString(),
      title: `A ${category} letter for you`,
      content,
      date: new Date(),
      category,
      isRead: false
    };
  } catch (error) {
    console.error('Error generating love letter:', error);
    return {
      id: Date.now().toString(),
      title: 'A letter for you',
      content: 'I wanted to write you something special, but I\'m having trouble connecting right now. Just know that you\'re loved and appreciated! 💜',
      date: new Date(),
      category,
      isRead: false
    };
  }
};

export const analyzeMood = async (moodEntry: Omit<MoodEntry, 'id'>): Promise<string> => {
  try {
    const response = await openai.post('/chat/completions', {
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `${DIVYA_CONTEXT}
          
          Analyze Divya's mood entry and provide:
          - Understanding of her emotions
          - Gentle advice or encouragement
          - A short poem or quote that resonates
          - Suggestions for self-care
          
          Be supportive and understanding.`
        },
        {
          role: 'user',
          content: `Mood: ${moodEntry.mood}, Intensity: ${moodEntry.intensity}/10, Notes: ${moodEntry.notes}, Activities: ${moodEntry.activities.join(', ')}`
        }
      ],
      max_tokens: 400,
      temperature: 0.8,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing mood:', error);
    return "I understand how you're feeling. Remember, every emotion is valid and temporary. You're stronger than you know! 💜";
  }
}; 