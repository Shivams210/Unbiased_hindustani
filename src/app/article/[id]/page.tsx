'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NewsArticle {
  id: number;
  title: string;
  summaryPoints: string[];
  youtubeUrl: string;
  fullContent?: string;
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadArticle = () => {
      try {
        // Try localStorage first
        const newsData = localStorage.getItem('newsData');
        if (newsData) {
          const data = JSON.parse(newsData);
          const allNews: NewsArticle[] = data.newsItems || data || [];
          const foundArticle = allNews.find((news) => news.id === parseInt(params.id));
          if (foundArticle) {
            setArticle(foundArticle);
            setLoading(false);
            return;
          }
        }

        // Fallback to admin-news.json
        fetch('/admin-news.json')
          .then((res) => res.json())
          .then((data) => {
            const allNews: NewsArticle[] = data.newsItems || data || [];
            const foundArticle = allNews.find((news) => news.id === parseInt(params.id));
            if (foundArticle) {
              setArticle(foundArticle);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error loading article:', error);
            setLoading(false);
          });
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    loadArticle();
  }, [params.id]);

  // Function to get YouTube thumbnail
  const getYouTubeThumbnail = (url: string) => {
    try {
      let videoId = '';
      
      if (url.includes('/embed/')) {
        videoId = url.split('/embed/')[1].split('?')[0];
      } else if (url.includes('watch?v=')) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get('v') || '';
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      }
      
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } catch (e) {
      console.error('Error extracting thumbnail:', e);
    }
    
    return '/leaders/default.jpg';
  };

  // Function to handle video click
  const handleVideoClick = () => {
    if (!article) return;
    
    let videoId = '';
    
    try {
      if (article.youtubeUrl.includes('/embed/')) {
        videoId = article.youtubeUrl.split('/embed/')[1].split('?')[0];
      } else if (article.youtubeUrl.includes('watch?v=')) {
        const urlObj = new URL(article.youtubeUrl);
        videoId = urlObj.searchParams.get('v') || '';
      } else if (article.youtubeUrl.includes('youtu.be/')) {
        videoId = article.youtubeUrl.split('youtu.be/')[1].split('?')[0];
      }
      
      if (videoId) {
        const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
        window.open(watchUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Error processing URL:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-white mt-4">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center text-orange-400 hover:text-orange-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to News
        </button>

        {/* Article Container */}
        <article className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
          {/* Header */}
          <div className="p-8">
            <div className="flex items-center mb-4">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-green-600/20 text-orange-300 border border-orange-500/40">
                #{article.id}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-white to-green-500 bg-clip-text text-transparent leading-tight">
              {article.title}
            </h1>

            {/* YouTube Video */}
            <div 
              className="mb-8 relative h-64 md:h-96 w-full rounded-xl overflow-hidden group cursor-pointer"
              onClick={handleVideoClick}
            >
              <img
                src={getYouTubeThumbnail(article.youtubeUrl)}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('maxresdefault')) {
                    target.src = target.src.replace('maxresdefault', 'hqdefault');
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>
              
              {/* Center play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-red-600/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-red-700 transition-all">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>

              {/* Bottom right button */}
              <div className="absolute bottom-6 right-6">
                <span className="inline-flex items-center px-4 py-2 bg-red-600/90 text-white rounded-full group-hover:bg-red-700 transition-all">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Watch Full Video
                </span>
              </div>
            </div>

            {/* Key Summary Points */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Key Points
              </h2>
              <div className="space-y-4">
                {article.summaryPoints.map((point, index) => (
                  <div key={index} className="flex items-start bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold rounded-full mr-4">
                      {index + 1}
                    </span>
                    <p className="text-gray-200 leading-relaxed font-medium flex-1">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Content */}
            {article.fullContent && (
              <div>
                <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Comprehensive Analysis
                </h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    {article.fullContent.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-base md:text-lg">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Back to News Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-green-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            ← Back to All News
          </button>
        </div>
      </div>
    </div>
  );
}
