# Unbiased Hindustani.ai# Unbiased Hindustani



**Your Source for Balanced Political News****Your Source for Balanced Political News**



A modern news website built with Next.js, featuring AI-powered content generation from YouTube videos with comprehensive analysis and an Indian flag-themed design.A modern news website built with Next.js, featuring AI-powered content generation and YouTube video integration with an Indian flag-themed design.



## ✨ Features## ✨ Features



- 🇮🇳 **Indian Flag Theme** - Beautiful dark theme with saffron, white, and green accent colors- 🇮🇳 **Indian Flag Theme** - Beautiful gradient design with saffron, white, and green colors

- 🤖 **AI-Powered News Generation** - Auto-generate news with title, 5 key points, and 15-20 line comprehensive brief using Google Gemini AI- 🤖 **AI-Powered** - Auto-generate news summaries using Google Gemini AI

- 📺 **YouTube Integration** - Automatic transcript extraction, thumbnail fetching, and video embedding- 📺 **YouTube Integration** - Automatic thumbnail fetching and video embedding

- 📝 **Admin Panel** - Easy-to-use interface for managing news content with AI auto-generation- 📝 **Admin Panel** - Easy-to-use interface for managing news content

- 📱 **Responsive Design** - Works seamlessly on all devices- 📱 **Responsive Design** - Works seamlessly on all devices

- 🌙 **Dark Theme** - Modern dark interface inspired by DeepJudge.ai- 🌙 **Dark Theme** - Modern dark interface with excellent readability

- 📖 **Dedicated Article Pages** - Full article view with comprehensive analysis- ⚡ **Real-time Updates** - localStorage-based data management

- ⚡ **Real-time Updates** - localStorage-based data management with JSON fallback

## 🚀 Getting Started

## 🚀 Quick Start for Your Friend

First, install dependencies:

### Prerequisites

- Node.js 18+ installed```bash

- Git installednpm run dev

- Google Gemini API key (free)# or

yarn dev

### Step 1: Clone the Repository# or

pnpm dev

```bash# or

git clone https://github.com/Shivams210/Unbiased_hindustani.gitbun dev

cd Unbiased_hindustani/unbiased_hindustani```

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Step 2: Install Dependencies

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

```bash

npm installThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

```

## 🚀 Getting Started

### Step 3: Configure Environment Variables

First, install dependencies:

Create a `.env.local` file in the root directory:

```bash

```envnpm install

# Google Gemini AI API Key (Get free key from: https://aistudio.google.com/app/apikey)```

GEMINI_API_KEY=your_gemini_api_key_here

Then, run the development server:

# Alternative (both work):

GOOGLE_AI_API_KEY=your_gemini_api_key_here```bash

```npm run dev

```

**How to get free Gemini API Key:**

1. Visit: https://aistudio.google.com/app/apikeyOpen [http://localhost:3000](http://localhost:3000) with your browser to see the website.

2. Sign in with Google account

3. Click "Create API Key"## 🔑 API Configuration

4. Copy and paste into `.env.local`

Create a `.env.local` file in the root directory:

### Step 4: Run the Development Server

```env

```bashGOOGLE_AI_API_KEY=your_google_ai_api_key_here

npm run dev```

```

Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

### Step 5: Access Admin Panel

```

Navigate to [http://localhost:3000/admin-panel.html](http://localhost:3000/admin-panel.html)├── src/

│   ├── app/              # Next.js app directory

## 📖 How to Use│   │   ├── page.tsx      # Homepage

│   │   └── api/          # API routes

### Adding News via Admin Panel│   └── components/       # React components

├── public/

1. **Open Admin Panel:** `http://localhost:3000/admin-panel.html`│   ├── admin-panel.html  # Admin interface

│   └── admin-news.json   # News data storage

2. **Auto-Generate News (Recommended):**└── backend/              # Python backend (optional)

   - Paste any YouTube political video URL```

   - Click "Generate with AI 🤖" button

   - AI will automatically create:## 🛠️ Tech Stack

     - ✅ Catchy news title (10-12 words)

     - ✅ 5 concise summary points- **Framework:** Next.js 15.5.6

     - ✅ Comprehensive 15-20 line brief- **Language:** TypeScript

   - Click "Add News (Auto Save)" to publish- **Styling:** TailwindCSS

- **AI:** Google Gemini AI

3. **Manual Entry:**- **Video:** YouTube API & Transcript API

   - Fill in all fields manually

   - Click "Add News (Auto Save)" to publish## 📝 Usage



### Viewing News### Adding News

1. Navigate to `/admin-panel.html`

- **Homepage:** See all news cards with 5 key points and video thumbnails2. Enter YouTube video URL

- **Read Full Article:** Click the orange button to view complete analysis3. Click "Auto Generate with AI"

- **Watch Video:** Click on video thumbnail or "Watch Video" button4. Review and publish



## 📂 Project Structure### Features

- **Auto-Generate:** AI creates title, summary, and key points

```- **Dual Technology:** Transcript-based or metadata-based generation

unbiased_hindustani/- **Expandable Content:** "Read More" sections for detailed information

├── src/

│   ├── app/## 🤝 Contributing

│   │   ├── page.tsx              # Homepage with news grid

│   │   ├── layout.tsx            # Root layoutContributions are welcome! Feel free to open issues or submit pull requests.

│   │   ├── globals.css           # Global styles

│   │   ├── article/## 📄 License

│   │   │   └── [id]/

│   │   │       └── page.tsx      # Individual article pageThis project is open source and available under the MIT License.

│   │   └── api/

│   │       ├── news/             # News API route---

│   │       └── generate-summary/ # AI generation API

│   │           └── route.ts      Made with ❤️ for unbiased news reporting

│   └── components/
│       └── NewsCard.tsx          # News card component
├── public/
│   ├── admin-panel.html          # Admin interface
│   ├── admin-news.json           # News data storage
│   └── leaders/
│       └── default.jpg           # Fallback thumbnail
├── .env.local                    # Environment variables (create this)
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.6 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **AI Model:** Google Gemini 2.5 Flash Lite
- **Video APIs:** 
  - YouTube Transcript API (youtube-transcript)
  - YouTube oEmbed API (metadata fallback)
- **Deployment:** Vercel-ready

## 🔑 Key Technologies

### AI Integration
- Uses Google Gemini AI (gemini-2.5-flash-lite model)
- Direct REST API calls for reliability
- Token-optimized prompts (15-20 line briefs)
- Handles both transcript-based and metadata-based generation

### Data Management
- Primary: Browser localStorage
- Fallback: JSON file (admin-news.json)
- Auto-save functionality in admin panel

## 🌐 Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable:
   - Key: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key
4. Deploy!

Your site will be live at: `https://your-project.vercel.app`

## 📝 API Endpoints

- `POST /api/generate-summary` - Generate news from YouTube URL
  - Body: `{ "youtubeUrl": "https://youtube.com/..." }`
  - Response: `{ "title": "...", "summaryPoints": [...], "fullContent": "..." }`

- `GET /api/news` - Fetch all news items

## 🐛 Troubleshooting

### Issue: "Article Not Found"
- **Solution:** Add news via admin panel first. The homepage needs data to display.

### Issue: AI Generation Fails
- **Solution:** 
  1. Check `.env.local` has correct API key
  2. Verify API key is active at https://aistudio.google.com
  3. Restart dev server: `npm run dev`

### Issue: Video Transcript Not Available
- **Solution:** AI will automatically use video metadata (title/description) instead. Works for ~60% of videos.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **GitHub:** https://github.com/Shivams210/Unbiased_hindustani
- **Live Demo:** https://unbiased-hindustani.vercel.app (if deployed)

---

Made with ❤️ for unbiased news reporting

**Current Version:** 1.0.0 | **Last Updated:** October 23, 2025
