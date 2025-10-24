'use client';

import { useState, useEffect } from 'react';
import NewsCard from '@/components/NewsCard';

/**
 * PODCASTS PAGE - Political Podcast Summaries
 * 
 * Configuration Variables (currently using news data, but separate variables for easy customization):
 * - podcastStorageKey: localStorage key for podcast data
 * - podcastJsonFile: JSON file path for podcast data
 * - podcastDataKey: Key name in JSON for podcast items array
 * 
 * To switch to separate podcast data in the future:
 * 1. Change podcastStorageKey to 'podcastsData'
 * 2. Change podcastJsonFile to '/podcasts.json'
 * 3. Change podcastDataKey to 'podcastItems'
 */

interface PodcastItem {
  id: number;
  title: string;
  summaryPoints: string[];
  youtubeUrl: string;
  fullContent?: string;
}

export default function PodcastsPage() {
  const [podcastItems, setPodcastItems] = useState<PodcastItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For now, load from news data (using separate variable names for future customization)
    const podcastStorageKey = 'newsData'; // Separate variable - can change to 'podcastsData' later
    const podcastJsonFile = '/admin-news.json'; // Separate variable - can change to '/podcasts.json' later
    const podcastDataKey = 'newsItems'; // Separate variable - can change to 'podcastItems' later
    
    const savedPodcastData = localStorage.getItem(podcastStorageKey);
    
    if (savedPodcastData) {
      try {
        const parsedData = JSON.parse(savedPodcastData);
        setPodcastItems(parsedData[podcastDataKey] || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing saved podcasts data:', error);
        loadPodcastsFromJSON();
      }
    } else {
      loadPodcastsFromJSON();
    }

    function loadPodcastsFromJSON() {
      fetch(podcastJsonFile)
        .then(response => response.json())
        .then(data => {
          setPodcastItems(data[podcastDataKey] || []);
          setIsLoading(false);
          localStorage.setItem(podcastStorageKey, JSON.stringify(data));
        })
        .catch(error => {
          console.error('Error loading podcasts data:', error);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading podcast summaries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-green-500/20 border border-orange-500/30 rounded-full text-sm font-medium text-orange-200">
                🎙️ Political Podcast Summaries
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent leading-tight">
              Listen Smart, Stay Informed
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-10 leading-relaxed">
              AI-powered summaries of political podcast videos. Hours of content distilled into key insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/" 
                className="px-8 py-4 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white font-semibold rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                ← Back to News
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
            Comprehensive Podcast Analysis
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Every political podcast analyzed with AI-powered insights, giving you the full picture without spending hours listening
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Key Highlights</h3>
            <p className="text-gray-400 leading-relaxed">Extract the most important points from hours of podcast content in seconds</p>
          </div>

          <div className="group bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Context & Analysis</h3>
            <p className="text-gray-400 leading-relaxed">Understand the full context with AI-generated comprehensive analysis</p>
          </div>

          <div className="group bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-sm p-8 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Save Time</h3>
            <p className="text-gray-400 leading-relaxed">Get insights from 2-hour podcasts in just 2 minutes of reading</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-500/10 via-white/5 to-green-500/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent mb-2">AI</div>
              <div className="text-gray-400 text-sm">Powered Analysis</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent mb-2">Fast</div>
              <div className="text-gray-400 text-sm">Instant Summaries</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent mb-2">Deep</div>
              <div className="text-gray-400 text-sm">Comprehensive Insights</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent mb-2">Clear</div>
              <div className="text-gray-400 text-sm">Easy to Understand</div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Summaries Section */}
      <section id="podcasts" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Latest Podcast Summaries</h2>
          <p className="text-xl text-gray-400">AI-analyzed political discussions and debates</p>
        </div>

        {podcastItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎙️</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Podcast Summaries Yet</h3>
            <p className="text-gray-400">
              Podcast summaries will appear here once added through the admin panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcastItems.map((podcast) => (
              <NewsCard
                key={podcast.id}
                id={podcast.id}
                title={podcast.title}
                summaryPoints={podcast.summaryPoints}
                youtubeUrl={podcast.youtubeUrl}
                fullContent={podcast.fullContent}
                linkPrefix="/podcast"
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-16 mt-20 border-t border-gray-800">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">🇮🇳</span>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent">
              Unbiased Hindustani
            </h3>
          </div>
          <p className="text-gray-400 mb-6">
            Your trusted source for unbiased political podcast analysis
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <a href="/" className="hover:text-orange-400 transition-colors">News</a>
            <span>•</span>
            <a href="/podcasts" className="hover:text-orange-400 transition-colors">Podcasts</a>
            <span>•</span>
            <span>Powered by AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
