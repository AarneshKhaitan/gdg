// app/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  MessageSquare, 
  Newspaper, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  // Sample trending stocks
  const trendingStocks = [
    { ticker: 'AAPL', name: 'Apple Inc', price: 187.43, change: 1.25 },
    { ticker: 'MSFT', name: 'Microsoft', price: 425.52, change: 2.15 },
    { ticker: 'NVDA', name: 'NVIDIA', price: 902.50, change: 3.68 },
    { ticker: 'AMZN', name: 'Amazon', price: 178.87, change: 0.95 },
    { ticker: 'GOOGL', name: 'Alphabet', price: 151.70, change: 1.02 },
  ];

  // Sample latest news
  const latestNews = [
    {
      id: 1,
      title: 'Fed Signals Possible Rate Cut in Coming Months',
      source: 'Reuters',
      timestamp: '2024-04-06T10:32:00Z',
      isBreaking: true,
    },
    {
      id: 2,
      title: 'Apple Unveils New AI Features for iPhone',
      source: 'Bloomberg',
      timestamp: '2024-04-06T09:15:00Z',
    },
    {
      id: 3,
      title: 'Oil Prices Drop on OPEC Production Increase',
      source: 'CNBC',
      timestamp: '2024-04-05T16:45:00Z',
    },
  ];

  // Sample alerts
  const alerts = [
    {
      id: 1,
      title: 'AAPL Earnings Call Tomorrow',
      message: 'Apple Inc will report Q2 earnings tomorrow after market close.',
      type: 'info',
      timestamp: '2024-04-06T08:00:00Z',
    },
    {
      id: 2,
      title: 'Market Volatility Alert',
      message: 'VIX above 20 - increased market volatility expected.',
      type: 'warning',
      timestamp: '2024-04-06T09:30:00Z',
    },
  ];

  // Get relative time for timestamps
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

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="p-6 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/10">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to <span className="gradient-text">FinanceAI</span>
        </h1>
        <p className="text-muted-foreground mb-4">
          Your AI-powered platform for financial analysis, market insights, and stock research.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/chat" 
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <MessageSquare size={16} />
            <span>Start Analyzing</span>
          </Link>
          <Link 
            href="/news" 
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
          >
            <Newspaper size={16} />
            <span>Browse News</span>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Alerts */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-md border ${
                    alert.type === 'warning' 
                      ? 'border-amber-500/30 bg-amber-500/10' 
                      : 'border-blue-500/30 bg-blue-500/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${
                      alert.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                    }`}>
                      <AlertCircle size={16} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getRelativeTime(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <button className="text-primary text-sm hover:underline inline-flex items-center gap-1">
              <span>View All Alerts</span>
              <ChevronRight size={14} />
            </button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trending Stocks */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Trending Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="px-3 py-2 text-left text-sm font-medium text-muted-foreground">Symbol</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-muted-foreground">Name</th>
                    <th className="px-3 py-2 text-right text-sm font-medium text-muted-foreground">Price</th>
                    <th className="px-3 py-2 text-right text-sm font-medium text-muted-foreground">Change</th>
                    <th className="px-3 py-2 text-right text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trendingStocks.map((stock) => (
                    <tr key={stock.ticker} className="hover:bg-secondary/30">
                      <td className="px-3 py-3 text-left font-medium">{stock.ticker}</td>
                      <td className="px-3 py-3 text-left text-muted-foreground">{stock.name}</td>
                      <td className="px-3 py-3 text-right">${stock.price.toFixed(2)}</td>
                      <td className={`px-3 py-3 text-right ${
                        stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        <div className="inline-flex items-center gap-1 justify-end">
                          {stock.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          <span>{stock.change >= 0 ? '+' : ''}{stock.change}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <button
                          onClick={() => {}} 
                          className="inline-flex items-center gap-1 text-primary text-sm hover:underline"
                        >
                          <span>Analyze</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Link href="/dashboard" className="text-primary text-sm hover:underline inline-flex items-center gap-1">
              <span>View More Stocks</span>
              <ChevronRight size={14} />
            </Link>
          </CardFooter>
        </Card>
        
        {/* Latest News */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Latest News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestNews.map((news) => (
                <div key={news.id} className="border-b border-border pb-3 last:border-b-0 last:pb-0">
                  <h3 className="font-medium mb-1 line-clamp-2 hover:text-primary">
                    <Link href="#">
                      {news.isBreaking && (
                        <span className="inline-flex items-center gap-0.5 text-amber-500 mr-1">
                          <AlertCircle size={14} />
                          <span className="text-xs">BREAKING</span>
                        </span>
                      )}
                      {news.title}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{news.source}</span>
                    <span>{getRelativeTime(news.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Link href="/news" className="text-primary text-sm hover:underline inline-flex items-center gap-1">
              <span>View All News</span>
              <ChevronRight size={14} />
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
          <CardHeader>
            <div className="h-10 w-10 rounded-md bg-primary/20 text-primary flex items-center justify-center mb-2">
              <MessageSquare size={20} />
            </div>
            <CardTitle>AI Chat Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ask questions about stocks, markets, and investments. Get real-time analysis with visualizations.
            </p>
          </CardContent>
          <CardFooter>
            <Link 
              href="/chat" 
              className="text-primary text-sm hover:underline inline-flex items-center gap-1"
            >
              <span>Start Chat</span>
              <ChevronRight size={14} />
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
          <CardHeader>
            <div className="h-10 w-10 rounded-md bg-blue-500/20 text-blue-500 flex items-center justify-center mb-2">
              <Newspaper size={20} />
            </div>
            <CardTitle>Latest Market News</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Stay updated with the latest financial news, filtered and categorized for your needs.
            </p>
          </CardContent>
          <CardFooter>
            <Link 
              href="/news" 
              className="text-blue-500 text-sm hover:underline inline-flex items-center gap-1"
            >
              <span>Browse News</span>
              <ChevronRight size={14} />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}