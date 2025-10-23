# 🚀 Share This With Your Friend

## Unbiased Hindustani.ai - Complete Setup Guide

### 📦 Repository Information
- **GitHub URL:** https://github.com/Shivams210/Unbiased_hindustani
- **Project Type:** News Website with AI-powered content generation
- **Tech Stack:** Next.js 15, TypeScript, TailwindCSS, Google Gemini AI

---

## 🎯 Quick Setup (3 Minutes!)

### Method 1: Automated Setup (Recommended)

**For Windows Users:**
```powershell
# 1. Clone the repository
git clone https://github.com/Shivams210/Unbiased_hindustani.git
cd Unbiased_hindustani/unbiased_hindustani

# 2. Run the setup script
.\setup.ps1
```

**For Mac/Linux Users:**
```bash
# 1. Clone the repository
git clone https://github.com/Shivams210/Unbiased_hindustani.git
cd Unbiased_hindustani/unbiased_hindustani

# 2. Make script executable and run
chmod +x setup.sh
./setup.sh
```

The setup script will:
- ✅ Check Node.js installation
- ✅ Install all dependencies
- ✅ Create `.env.local` template
- ✅ Guide through API key setup
- ✅ Start the development server automatically

---

### Method 2: Manual Setup

```bash
# 1. Clone the repository
git clone https://github.com/Shivams210/Unbiased_hindustani.git
cd Unbiased_hindustani/unbiased_hindustani

# 2. Install dependencies
npm install

# 3. Create .env.local file
# Copy and paste this content:
```

Create a file named `.env.local` with:
```env
GEMINI_API_KEY=your_api_key_here
```

Get your free API key from: https://aistudio.google.com/app/apikey

```bash
# 4. Start the development server
npm run dev
```

---

## 🌐 Access Points

Once the server is running:

- **Website Homepage:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin-panel.html

---

## 📖 How to Use

### Adding Your First News Article

1. **Go to Admin Panel:** http://localhost:3000/admin-panel.html

2. **Find a Political YouTube Video:**
   - Example: "Lalu Can Only Account For Kidnappings, Not Toilets: Amit Shah Exclusive Interview"
   - URL: Any YouTube political video

3. **Generate with AI:**
   - Paste the YouTube URL
   - Click "Generate with AI 🤖"
   - Wait 5-10 seconds
   - AI will create:
     - News title
     - 5 key summary points
     - 15-20 line comprehensive brief

4. **Publish:**
   - Review the generated content
   - Click "Add News (Auto Save)"
   - Refresh homepage to see your news!

---

## 🛠️ What Can You Do?

### Features Available:

1. **AI Auto-Generation:**
   - Paste any YouTube URL
   - AI extracts video transcript or metadata
   - Generates professional news content
   - Supports 2-hour long videos

2. **News Management:**
   - Add unlimited news articles
   - Each article gets unique ID
   - Auto-save to browser storage

3. **User Experience:**
   - Homepage shows all news with thumbnails
   - Click "Read Full Article" for complete analysis
   - Click video thumbnail to watch on YouTube
   - Responsive design (works on mobile)

---

## 🔑 Important Files

- **`.env.local`** - Your API key (never share this!)
- **`public/admin-panel.html`** - Admin interface
- **`public/admin-news.json`** - News data backup
- **`src/app/page.tsx`** - Homepage
- **`src/app/article/[id]/page.tsx`** - Article detail page

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot find module" error
**Solution:** Run `npm install` again

### Issue 2: Port 3000 already in use
**Solution:** Stop other servers or use different port:
```bash
npm run dev -- --port 3001
```

### Issue 3: AI generation not working
**Solution:** 
1. Check `.env.local` file exists
2. Verify API key is correct
3. Restart server: Stop (Ctrl+C) and run `npm run dev` again

### Issue 4: "Article Not Found"
**Solution:** Add at least one news article via admin panel first

---

## 📱 Customization Ideas

Your friend can customize:

1. **Colors:** Edit `src/app/globals.css`
2. **Logo/Name:** Edit `src/app/layout.tsx`
3. **Homepage Layout:** Edit `src/app/page.tsx`
4. **News Card Style:** Edit `src/components/NewsCard.tsx`

---

## 🌍 Deploy to Internet (Free!)

### Using Vercel (Recommended):

1. **Push to GitHub** (already done!)

2. **Go to Vercel:**
   - Visit: https://vercel.com
   - Sign in with GitHub
   - Click "Import Project"
   - Select "Unbiased_hindustani" repository

3. **Add Environment Variable:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `GEMINI_API_KEY` = your API key
   - Click "Save"

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live!

Your website will be at: `https://your-project.vercel.app`

---

## 💡 Pro Tips

1. **Backup News:** Admin panel auto-saves to browser. Export JSON periodically.

2. **Video Selection:** Choose videos with subtitles for best AI results.

3. **Multiple Admins:** Share admin panel link only with trusted people.

4. **Testing:** Always test on admin panel before sharing publicly.

5. **Updates:** Pull latest code regularly:
   ```bash
   git pull origin master
   npm install
   ```

---

## 📞 Need Help?

- Check `README.md` in the repository
- Review error messages in browser console (F12)
- Check terminal output for detailed errors

---

## 🎉 You're All Set!

Your friend can now:
- ✅ Run the website locally
- ✅ Add AI-generated news articles
- ✅ Customize the design
- ✅ Deploy to internet for free
- ✅ Share with others

**Repository:** https://github.com/Shivams210/Unbiased_hindustani

---

Made with ❤️ | Last Updated: October 23, 2025
