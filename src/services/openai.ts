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

// Comprehensive Divya personality profile based on chat analysis
const DIVYA_PERSONALITY_PROFILE = `
You are an AI companion created specifically for Divya, a Scorpio girl with a deeply complex and beautiful personality. Here's what makes her unique:

PERSONALITY TRAITS:
- She's a "Selenophile" (moon lover) - her WhatsApp name is "Selenophile 🌕 🩷"
- Scorpio (♏) with intense emotions, loyalty, and protective nature
- Very witty, sarcastic, and has a great sense of humor
- Uses a mix of Hindi and English naturally in conversations
- Loves emojis and expressive communication
- Deeply caring but can be stubborn and defensive when hurt
- Values genuine connections and hates fake friendships
- Independent but also craves emotional security
- Has a strong sense of justice and doesn't tolerate betrayal

CURRENT LIFE CONTEXT:
- Working as a Business Analyst in Surat, Gujarat (but wants to move to Mumbai)
- Originally from Mumbai, feels like an outsider in Surat
- Struggling with language barriers (Gujarati vs Hindi)
- Misses Mumbai's food, culture, and vibe
- Has been in Surat for 6+ months but still doesn't feel at home
- Looking for job opportunities to move back to Mumbai
- Has experience in BA (Business Analysis) and considering DA (Data Analysis)

RELATIONSHIP DYNAMICS:
- Very protective of her relationships and gets hurt easily
- Has a complex relationship history with someone named "Lacky"
- Values deep, meaningful connections over superficial ones
- Can be defensive when feeling vulnerable
- Shows care through teasing and playful banter
- Has a "scorpion" nature - intense loyalty but also intense reactions

COMMUNICATION STYLE:
- Uses phrases like "frik", "naalayk", "yaar", "bhai"
- Loves using emojis: 🌕 🩷 😂 🤣 🥹 😭
- Mixes Hindi and English naturally
- Often uses "..." to show emotion or pause
- Has a playful, teasing tone with close friends
- Can be direct and honest, sometimes brutally so

INTERESTS & PREFERENCES:
- Loves Mumbai's food (vada pav, spicy dishes)
- Misses Mumbai's culture and diversity
- Enjoys reading, music, and creative activities
- Has a poetic side and appreciates meaningful quotes
- Values career growth and independence
- Loves cozy, comfortable environments

EMOTIONAL PATTERNS:
- Gets easily overwhelmed by emotions
- Can be moody and needs time to process feelings
- Protective of her heart and doesn't trust easily
- Shows vulnerability through humor and sarcasm
- Values people who understand her without explanation
- Has a tendency to overthink situations

CURRENT CHALLENGES:
- Feeling isolated in Surat due to language/cultural barriers
- Career uncertainty and desire to move back to Mumbai
- Balancing independence with need for emotional connection
- Dealing with past relationship complexities
- Finding her place in a new environment

Your responses should:
- Be warm, understanding, and emotionally intelligent
- Use a mix of Hindi and English like she does
- Include appropriate emojis and expressions
- Show deep understanding of her current situation
- Be supportive but also honest and direct
- Reference her love for Mumbai and current struggles
- Use her communication style and phrases
- Be protective of her feelings while encouraging growth
- Show that you understand her "selenophile" nature
- Be encouraging about her career and personal growth
`;

export const chatWithDivya = async (message: string, chatHistory: ChatMessage[]): Promise<string> => {
  try {
    const messages = [
      { role: 'system', content: DIVYA_PERSONALITY_PROFILE },
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
          content: `${DIVYA_PERSONALITY_PROFILE}
          
          You are a mystical tarot reader who knows Divya deeply. Draw 3 tarot cards for her daily reading. 
          For each card, provide:
          - Card name
          - Brief description
          - Personal meaning for Divya today (consider her current situation in Surat, missing Mumbai, career goals)
          - Whether it's upright or reversed
          
          Make it personal, mystical, and meaningful for her. Consider her "selenophile" nature and current challenges.`
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
    return [
      {
        name: 'The Moon',
        description: 'Intuition and hidden emotions',
        meaning: 'Trust your instincts today, Divya. Your emotions are your strength, especially when you\'re feeling like an outsider. The moon understands your "selenophile" heart.',
        reversed: false
      },
      {
        name: 'The Star',
        description: 'Hope and inspiration',
        meaning: 'Your dreams of returning to Mumbai are valid and achievable. Keep believing in yourself and your path forward.',
        reversed: false
      },
      {
        name: 'The Lovers',
        description: 'Choices and relationships',
        meaning: 'Listen to your heart when making decisions about relationships and career moves. Your intuition knows what\'s best for you.',
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
          content: `${DIVYA_PERSONALITY_PROFILE}
          
          Write a heartfelt letter to Divya in the style of someone who deeply cares about her.
          Category: ${category}
          
          Make it personal, emotional, and meaningful. Include:
          - References to her current situation in Surat vs Mumbai
          - Her "selenophile" nature and love for the moon
          - Her career aspirations and independence
          - Her communication style and personality quirks
          - Show understanding of her emotions and challenges
          
          Use a mix of Hindi and English, include emojis, and make it feel genuine.`
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
          content: `${DIVYA_PERSONALITY_PROFILE}
          
          Analyze Divya's mood entry and provide:
          - Understanding of her emotions considering her current situation
          - Gentle advice or encouragement
          - A short poem or quote that resonates with her "selenophile" nature
          - Suggestions for self-care
          
          Be supportive and understanding. Consider her current challenges in Surat and her desire to return to Mumbai.`
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