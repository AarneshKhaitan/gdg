'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Clock, Zap, TrendingUp, TrendingDown, BarChart } from 'lucide-react';

export default function NewsGrid({ newsData }) {
  // Format the timestamp to display only the time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  // Get the relative time (e.g., "2 hours ago")
  const getRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    }
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  // Get feature article
  const featureArticle = newsData.find(article => article.isFeature) || newsData[0];
  
  // Get breaking news
  const breakingNews = newsData.filter(article => article.isBreaking);
  
  // Get remaining articles
  const regularArticles = newsData.filter(article => 
    article.id !== featureArticle.id && !article.isBreaking
  );

  return (
    <div className="space-y-6">
      {/* Feature Article */}
      {featureArticle && (
        <Card className="border-border bg-card overflow-hidden transition-all hover:ring-1 hover:ring-primary/50">
          <div className="relative flex flex-col md:flex-row">
            <div className="relative md:w-1/2 h-64 md:h-auto">
              <div className="relative h-full w-full">
                <Image 
                  src={featureArticle.imageUrl} 
                  alt={featureArticle.title}
                  className="object-cover"
                  fill
                />
              </div>
              {featureArticle.sentiment && (
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  featureArticle.sentiment === 'positive' 
                    ? 'bg-green-500/70 text-white' 
                    : featureArticle.sentiment === 'negative'
                    ? 'bg-red-500/70 text-white'
                    : 'bg-blue-500/70 text-white'
                }`}>
                  {featureArticle.sentiment === 'positive' ? (
                    <><TrendingUp size={12} /> Bullish</>
                  ) : featureArticle.sentiment === 'negative' ? (
                    <><TrendingDown size={12} /> Bearish</>
                  ) : (
                    <><BarChart size={12} /> Neutral</>
                  )}
                </div>
              )}
              {featureArticle.isFeature && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary/70 text-primary-foreground rounded-full text-xs font-medium">
                  Featured
                </div>
              )}
            </div>
            <div className="p-6 md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium">{featureArticle.source}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock size={14} />
                    {getRelativeTime(featureArticle.timestamp)}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{featureArticle.title}</h3>
                <p className="text-muted-foreground mb-4">{featureArticle.summary}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {new Date(featureArticle.timestamp).toLocaleDateString()}
                </span>
                <a 
                  href={featureArticle.url} 
                  className="text-primary hover:underline text-sm font-medium"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {/* Breaking News */}
      {breakingNews.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="text-amber-500" />
            Breaking News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {breakingNews.map(article => (
              <Card 
                key={article.id} 
                className="border-amber-500/30 bg-card overflow-hidden hover:ring-1 hover:ring-amber-500/50"
              >
                <div className="relative flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <div className="relative h-full w-full">
                      <Image 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="object-cover"
                        fill
                      />
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium px-2 py-0.5 bg-amber-500/20 text-amber-500 rounded-full flex items-center gap-1">
                        <Zap size={10} />
                        Breaking
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {getRelativeTime(article.timestamp)}
                      </span>
                    </div>
                    <h3 className="font-medium mb-1">{article.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{article.source}</span>
                      <a 
                        href={article.url} 
                        className="text-primary text-xs hover:underline"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Regular Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {regularArticles.map(article => (
          <Card 
            key={article.id} 
            className="border-border bg-card overflow-hidden flex flex-col hover:ring-1 hover:ring-primary/50"
          >
            <div className="relative h-40">
              <div className="relative h-full w-full">
                <Image 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="object-cover"
                  fill
                />
              </div>
              {article.sentiment && (
                <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                  article.sentiment === 'positive' 
                    ? 'bg-green-500/70 text-white' 
                    : article.sentiment === 'negative'
                    ? 'bg-red-500/70 text-white'
                    : 'bg-blue-500/70 text-white'
                }`}>
                  {article.sentiment === 'positive' ? (
                    <><TrendingUp size={10} /> Bullish</>
                  ) : article.sentiment === 'negative' ? (
                    <><TrendingDown size={10} /> Bearish</>
                  ) : (
                    <><BarChart size={10} /> Neutral</>
                  )}
                </div>
              )}
            </div>
            <CardContent className="p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">{article.source}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} />
                  {getRelativeTime(article.timestamp)}
                </span>
              </div>
              <h3 className="font-medium mb-2">{article.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.summary}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(article.timestamp).toLocaleDateString()}
                </span>
                <a 
                  href={article.url} 
                  className="text-primary hover:underline text-xs font-medium"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}