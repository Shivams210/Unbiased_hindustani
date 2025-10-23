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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-green-500/20 border border-orange-500/30 rounded-full text-sm font-medium text-orange-200">
                🇮🇳 Balanced Political Coverage
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent leading-tight">
              Know what India knows — instantly
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-10 leading-relaxed">
              Discover unbiased political news powered by AI. Every story backed by facts, every analysis rooted in truth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#news" 
                className="px-8 py-4 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white font-semibold rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Explore News
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 to-green-500/10 blur-3xl rounded-full -z-10"></div>
      </header>

      {/* What We Offer Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The only platform that knows everything about Indian politics
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Founded by political analysts and tech veterans, Unbiased Hindustani.ai reimagines how you access and understand political news
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Unbiased Reporting</h3>
            <p className="text-gray-400 leading-relaxed">No political affiliations, just pure facts presented with complete transparency and neutrality</p>
          </div>

          <div className="group bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">In-Depth Analysis</h3>
            <p className="text-gray-400 leading-relaxed">Context matters — we provide comprehensive analysis backed by data and historical perspective</p>
          </div>

          <div className="group bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-sm p-8 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Fact-Checked</h3>
            <p className="text-gray-400 leading-relaxed">Every claim verified through multiple sources — accuracy and truth are our foundation</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-500/10 via-white/5 to-green-500/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-gray-400 font-medium">Unbiased Coverage</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-400 font-medium">News Updates</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent mb-2">AI</div>
              <div className="text-gray-400 font-medium">Powered Analysis</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent mb-2">∞</div>
              <div className="text-gray-400 font-medium">Fact Checking</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <main id="news" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Latest Political Coverage
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stay informed with our AI-powered news analysis and comprehensive political coverage
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-white text-xl">Loading latest news...</p>
          </div>
        ) : newsItems.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-gray-700/50 backdrop-blur-sm">
            <div className="text-6xl mb-6">📰</div>
            <h3 className="text-3xl font-bold text-white mb-4">No News Published Yet</h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Check back soon for the latest political news and analysis.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-orange-500/20 via-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-12 lg:p-16 border border-white/10 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Beyond news, understanding.
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of Indians who trust Unbiased Hindustani.ai for accurate, balanced political coverage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#news" 
              className="px-8 py-4 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white font-semibold rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Reading
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF9933] to-[#138808] bg-clip-text text-transparent mb-4">
                Unbiased Hindustani.ai
              </h3>
              <p className="text-gray-400 mb-6">
                Your trusted source for balanced political news coverage powered by AI analysis
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#news" className="text-gray-400 hover:text-orange-500 transition">Latest News</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">About Us</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
              <div className="space-y-3">
                <a 
                  href="mailto:unbiasedhindustani@gmail.com" 
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Gmail
                </a>
                <a 
                  href="mailto:unbiasedhindustani@zohomail.in" 
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Zoho Mail
                </a>
                <a 
                  href="https://www.instagram.com/unbiased_hindustani" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500">
              © 2025 Unbiased Hindustani.ai. All rights reserved. | Providing balanced political news coverage
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}