# Unbiased Hindustani

**Your Source for Balanced Political News**

A modern news website built with Next.js, featuring AI-powered content generation and YouTube video integration with an Indian flag-themed design.

## ✨ Features

- 🇮🇳 **Indian Flag Theme** - Beautiful gradient design with saffron, white, and green colors
- 🤖 **AI-Powered** - Auto-generate news summaries using Google Gemini AI
- 📺 **YouTube Integration** - Automatic thumbnail fetching and video embedding
- 📝 **Admin Panel** - Easy-to-use interface for managing news content
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🌙 **Dark Theme** - Modern dark interface with excellent readability
- ⚡ **Real-time Updates** - localStorage-based data management

## 🚀 Getting Started

First, install dependencies:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## 🔑 API Configuration

Create a `.env.local` file in the root directory:

```env
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## 📂 Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Homepage
│   │   └── api/          # API routes
│   └── components/       # React components
├── public/
│   ├── admin-panel.html  # Admin interface
│   └── admin-news.json   # News data storage
└── backend/              # Python backend (optional)
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.6
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **AI:** Google Gemini AI
- **Video:** YouTube API & Transcript API

## 📝 Usage

### Adding News
1. Navigate to `/admin-panel.html`
2. Enter YouTube video URL
3. Click "Auto Generate with AI"
4. Review and publish

### Features
- **Auto-Generate:** AI creates title, summary, and key points
- **Dual Technology:** Transcript-based or metadata-based generation
- **Expandable Content:** "Read More" sections for detailed information

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

---

Made with ❤️ for unbiased news reporting
