'use client';

import { useState, useEffect } from 'react';
import NewsCard from '@/components/NewsCard';

interface NewsItem {
  id: number;
  title: string;
  summaryPoints: string[];
  youtubeUrl: string;
  fullContent?: string;
}

export default function Home() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem('newsData');
    
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setNewsItems(data.newsItems || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing saved data:', error);
        loadFromJSON();
      }
    } else {
      loadFromJSON();
    }

    function loadFromJSON() {
      fetch('/admin-news.json')
        .then(response => response.json())
        .then(data => {
          setNewsItems(data.newsItems || []);
          setIsLoading(false);
          localStorage.setItem('newsData', JSON.stringify(data));
        })
        .catch(error => {
          console.error('Error loading news data:', error);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <header className="py-12 text-center relative">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent">
            Unbiased Hindustani
          </h1>
          <p className="text-2xl text-gray-700 mt-4">Your Source for Balanced Political News</p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#FF9933] to-[#138808] bg-clip-text text-transparent">
              About Unbiased Hindustani
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-orange-500/10 rounded-lg border border-orange-500/30">
                <h3 className="font-bold text-white text-xl">Unbiased Reporting</h3>
              </div>
              <div className="text-center p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <h3 className="font-bold text-white text-xl">In-Depth Analysis</h3>
              </div>
              <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/30">
                <h3 className="font-bold text-white text-xl">Fact-Checked</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center text-white text-2xl">Loading news...</div>
        ) : newsItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4"></div>
            <h2 className="text-3xl font-bold text-white mb-4">No News Yet</h2>
            <p className="text-xl text-gray-300 mb-6">Add your first news item from the admin panel!</p>
            <a 
              href="/admin-panel.html" 
              className="inline-block bg-gradient-to-r from-[#FF9933] to-[#138808] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Go to Admin Panel
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white/80 backdrop-blur-sm py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-700 mb-6">
            <p className="font-semibold text-lg mb-4"> 2025 Unbiased Hindustani - Providing balanced political news coverage</p>
            
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <a 
                href="mailto:unbiasedhindustani@gmail.com" 
                className="flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-green-600/20 px-6 py-3 rounded-lg hover:scale-105 transition-transform border border-orange-500/30"
              >
                <svg 
                  className="w-6 h-6 text-orange-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="font-medium">unbiasedhindustani@gmail.com</span>
              </a>

              <a 
                href="mailto:unbiasedhindustani@zohomail.in" 
                className="flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 px-6 py-3 rounded-lg hover:scale-105 transition-transform border border-blue-500/30"
              >
                <svg 
                  className="w-6 h-6 text-blue-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="font-medium">unbiasedhindustani@zohomail.in</span>
              </a>

              <a 
                href="https://www.instagram.com/unbiased_hindustani" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gradient-to-r from-pink-500/20 to-purple-600/20 px-6 py-3 rounded-lg hover:scale-105 transition-transform border border-pink-500/30"
              >
                <svg 
                  className="w-6 h-6 text-pink-600" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="font-medium">@unbiased_hindustani</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}