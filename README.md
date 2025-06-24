# Divya AI Companion 🌙✨

A personalized AI companion app created specifically for Divya, featuring chat, tarot readings, mood tracking, and love letters.

## 🎂 Birthday Configuration

To set Divya's birthday, edit the file `src/config/birthday.ts`:

```typescript
export const BIRTHDAY_CONFIG = {
  // Month: 0-11 (January = 0, December = 11)
  month: 11, // December
  
  // Day of the month: 1-31
  day: 25, // 25th day
};
```

**Month Reference:**
- January = 0
- February = 1
- March = 2
- April = 3
- May = 4
- June = 5
- July = 6
- August = 7
- September = 8
- October = 9
- November = 10
- December = 11

## 🚀 Features

### 🎉 Birthday Celebrations
- **Automatic Detection**: The app automatically detects when it's Divya's birthday
- **Special UI**: Confetti animation, birthday banners, and celebratory messages
- **Enhanced AI**: All AI responses become birthday-themed on her special day
- **Personalized Messages**: Birthday-specific tarot readings and love letters

### 💬 AI Chat
- Personalized responses based on Divya's personality
- Understands her current situation in Surat vs Mumbai
- Uses her communication style (Hindi + English mix)
- References her "selenophile" nature and interests

### 🔮 Daily Tarot
- Mystical card readings with personal interpretations
- Birthday-themed readings on her special day
- Considers her current challenges and aspirations

### 😊 Mood Tracker
- Track daily emotions and activities
- AI-powered insights and encouragement
- Birthday-specific mood analysis

### 💌 Love Letters
- Generate personalized letters in different categories
- Birthday letters with extra celebration
- Multiple categories: romantic, friendship, encouragement, gratitude

## 🛠️ Setup

### Prerequisites
- Node.js (v14 or higher)
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

3. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   REACT_APP_OPENAI_MODEL=gpt-4
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## 🌐 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard:
     - `REACT_APP_OPENAI_API_KEY`
     - `REACT_APP_OPENAI_MODEL` (optional)

### Environment Variables for Vercel

**Required:**
- `REACT_APP_OPENAI_API_KEY` - Your OpenAI API key

**Optional:**
- `REACT_APP_OPENAI_MODEL` - OpenAI model (defaults to 'gpt-4')

## 🎨 Customization

### Updating Birthday
1. Open `src/config/birthday.ts`
2. Update the `month` and `day` values
3. Save and redeploy

### Personalizing AI Responses
The AI personality is configured in `src/services/openai.ts`. You can modify:
- Personality traits
- Current life context
- Communication style
- Interests and preferences

### Styling
The app uses Tailwind CSS. Main styling files:
- `src/index.css` - Global styles and custom utilities
- `tailwind.config.js` - Tailwind configuration

## 🎯 Key Features

### Birthday Mode
When it's Divya's birthday:
- ✨ Confetti animation throughout the app
- 🎂 Birthday banner and special messages
- 🌟 Enhanced AI responses with birthday themes
- 🎁 Special tarot readings and love letters
- 💫 Birthday-specific mood insights

### AI Personality
The AI is trained to understand:
- Divya's current situation in Surat
- Her desire to return to Mumbai
- Her "selenophile" nature
- Her communication style
- Her career aspirations
- Her relationship dynamics

### Responsive Design
- Mobile-first approach
- Beautiful animations with Framer Motion
- Gradient backgrounds and modern UI
- Smooth transitions and hover effects

## 🛡️ Privacy & Security

- OpenAI API key is stored securely in environment variables
- No personal data is stored locally
- All chat history is temporary (not persisted)
- API calls are made directly to OpenAI

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

This is a personal project for Divya. The code is structured to be easily customizable for other users by updating the configuration files.

## 📄 License

This project is created as a personal gift and is not intended for commercial use.

---

**Made with 💜 for Divya** 🌙✨
