# Divya AI Companion 🌙✨

A personalized companion app created specifically for Divya, featuring a beautiful, responsive interface with multiple features designed around her unique personality and interests.

## Features

### 🌟 Core Features
- **Chat Companion**: Personalized conversations with a companion that understands Divya's personality, current situation, and communication style
- **Daily Tarot**: Mystical tarot readings with personalized interpretations based on her Scorpio nature and current life circumstances
- **Mood Tracker**: Track daily emotions with AI-powered insights and personalized recommendations
- **Love Letters**: Receive heartfelt, personalized letters written specifically for her

### 🌙 Additional Features
- **Dream Journal**: Record and explore dreams with mystical interpretations tailored to her spiritual nature
- **Morning Ritual**: Start each day with personalized affirmations, intentions, and gratitude practice
- **Memory Lane**: Create and cherish beautiful moments and memories with location tracking and mood tagging
- **Photo Gallery**: Browse all your beautiful photos and stickers from the data folder with automatic organization

### 🎉 Birthday Celebration
- Special birthday banner and celebrations on June 25th
- Birthday-themed tarot readings, love letters, and mood insights
- Confetti animations and special messages
- Automatically activates every year on her birthday

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom gradients and animations
- **Animations**: Framer Motion for smooth, beautiful transitions
- **Icons**: Lucide React for consistent, beautiful icons
- **Routing**: React Router for seamless navigation
- **AI Integration**: OpenAI GPT-4 for personalized responses

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd divya-ai-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   REACT_APP_OPENAI_MODEL=gpt-4
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `REACT_APP_OPENAI_API_KEY`
     - `REACT_APP_OPENAI_MODEL`
   - Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `REACT_APP_OPENAI_API_KEY`: Your OpenAI API key
- `REACT_APP_OPENAI_MODEL`: Model to use (default: gpt-4)

## Birthday Configuration

The birthday celebration system is configured in `src/config/birthday.ts`:

```typescript
export const BIRTHDAY_CONFIG = {
  month: 5, // June (0-11)
  day: 25,  // 25th day
  // ... other settings
};
```

To update the birthday date, simply modify the `month` and `day` values in this file.

## Photo Gallery

The Photo Gallery automatically displays all images from the `data` folder:
- **Automatic Organization**: Photos are grouped by month
- **File Type Detection**: Automatically identifies photos vs stickers
- **Beautiful UI**: Responsive grid layout with hover effects
- **Modal View**: Click any image to view it in full size
- **Navigation**: Browse through images with arrow keys or buttons
- **File Information**: Shows date, file size, and type

### Adding New Images
Simply add new image files to the `data` folder and they will automatically appear in the gallery when you refresh the app.

## Personalization

The app is deeply personalized for Divya based on her:
- **Personality**: Scorpio traits, "selenophile" nature, emotional complexity
- **Current Life**: Working in Surat, missing Mumbai, career aspirations
- **Communication Style**: Mix of Hindi/English, use of emojis, expressive nature
- **Interests**: Moon, spirituality, Mumbai culture, career growth

## Customization

### Adding New Features
1. Create a new component in `src/components/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/Navigation.tsx`
4. Add any necessary types in `src/types/index.ts`

### Modifying Personality Profile
The personality profile is in `src/services/openai.ts` and can be updated to reflect changes in Divya's life, interests, or circumstances.

### Styling
The app uses Tailwind CSS with custom gradients and animations. The color scheme is designed around purple, pink, and blue tones to match Divya's aesthetic preferences.

## File Structure

```
src/
├── components/          # React components
│   ├── Home.tsx        # Main homepage with birthday banner
│   ├── Chat.tsx        # Chat companion interface
│   ├── TarotReader.tsx # Daily tarot readings
│   ├── MoodTracker.tsx # Mood tracking and insights
│   ├── LoveLetters.tsx # Personalized love letters
│   ├── DreamJournal.tsx # Dream recording and interpretation
│   ├── MorningRitual.tsx # Daily affirmations and intentions
│   ├── MemoryLane.tsx  # Memory creation and timeline
│   ├── PhotoGallery.tsx # Photo gallery with automatic organization
│   └── Navigation.tsx  # Navigation component
├── services/           # API and external services
│   └── openai.ts      # OpenAI integration and personality profile
├── types/             # TypeScript type definitions
├── config/            # Configuration files
│   └── birthday.ts    # Birthday celebration settings
└── App.tsx           # Main app component with routing

public/
└── data/             # Image files for the photo gallery
```

## Contributing

This is a personal project created as a birthday gift. However, if you'd like to contribute improvements or bug fixes, feel free to submit a pull request!

## License

This project is created as a personal gift and is not intended for commercial use.

## Support

For any issues or questions, please check the code comments or create an issue in the repository.

---

**Created with love for Divya's birthday** 🌙💜✨
