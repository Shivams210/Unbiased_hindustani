'use client';

import React, { useState } from 'react';

interface NewsCardProps {
  id: number;
  title: string;
  summaryPoints: string[];
  youtubeUrl: string;
  fullContent?: string;
}

function NewsCard({ id, title, summaryPoints, youtubeUrl, fullContent }: NewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Function to validate and transform YouTube URL
  const getVideoUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId = '';
      
      if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v') || '';
      } else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.substring(1);
      }

      if (!videoId) return null;
      
      // Always return the watch URL format
      return `https://www.youtube.com/watch?v=${videoId}`;
    } catch (e) {
      console.error('Invalid YouTube URL:', e);
      return null;
    }
  };

  // Function to get YouTube thumbnail from video URL
  const getYouTubeThumbnail = (url: string) => {
    try {
      let videoId = '';
      
      // Handle embed URLs
      if (url.includes('/embed/')) {
        videoId = url.split('/embed/')[1].split('?')[0];
      }
      // Handle watch URLs
      else if (url.includes('watch?v=')) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get('v') || '';
      }
      // Handle youtu.be URLs
      else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      }
      
      if (videoId) {
        // Use maxresdefault for highest quality, fallback to hqdefault if not available
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } catch (e) {
      console.error('Error extracting thumbnail:', e);
    }
    
    // Fallback to a default image
    return '/leaders/default.jpg';
  };

  const thumbnailUrl = getYouTubeThumbnail(youtubeUrl);

  // Function to handle video click
  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Extract video ID from various YouTube URL formats
    let videoId = '';
    
    try {
      // Handle embed URLs
      if (youtubeUrl.includes('/embed/')) {
        videoId = youtubeUrl.split('/embed/')[1].split('?')[0];
      }
      // Handle watch URLs
      else if (youtubeUrl.includes('watch?v=')) {
        const urlObj = new URL(youtubeUrl);
        videoId = urlObj.searchParams.get('v') || '';
      }
      // Handle youtu.be URLs
      else if (youtubeUrl.includes('youtu.be/')) {
        videoId = youtubeUrl.split('youtu.be/')[1].split('?')[0];
      }
      
      if (videoId) {
        const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
        console.log('Opening video:', watchUrl);
        window.open(watchUrl, '_blank', 'noopener,noreferrer');
      } else {
        console.error('Could not extract video ID from:', youtubeUrl);
        alert('Invalid YouTube URL format');
      }
    } catch (error) {
      console.error('Error processing URL:', error);
      alert('Error opening video');
    }
  };

  return (
    <div className="group bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-green-600/20 text-orange-300 border border-orange-500/40">
            #{id}
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-white to-green-500 bg-clip-text text-transparent hover:scale-[1.02] transform transition-all">
          {title}
        </h2>

        <div 
          className="mb-4 relative h-48 w-full rounded-lg overflow-hidden group cursor-pointer"
          onClick={handleVideoClick}
        >
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              // Fallback to hqdefault if maxresdefault fails
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
            <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-red-700 transition-all">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          {/* Bottom right button */}
          <div className="absolute bottom-4 right-4">
            <span className="inline-flex items-center px-3 py-1 bg-red-600/90 text-white text-sm rounded-full group-hover:bg-red-700 transition-all">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Watch Video
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {summaryPoints.map((point, index) => (
            <div key={index} className="flex items-start">
              <span className="mr-3 text-orange-500 font-bold">•</span>
              <p className="text-gray-300 leading-relaxed font-medium">{point}</p>
            </div>
          ))}
        </div>

        {fullContent && (
          <>
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <h3 className="text-lg font-bold text-orange-400 mb-3">Full Brief</h3>
                <div className="text-gray-300 leading-relaxed space-y-3">
                  {fullContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-sm">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              {isExpanded ? 'Hide Full Brief ▲' : 'Show Full Brief ▼'}
            </button>
          </>
        )}


      </div>
    </div>
  );
}

export default NewsCard;