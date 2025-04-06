'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Newspaper, AlertTriangle } from 'lucide-react';
import NewsFilter from '@/components/news/news-filter';
import NewsGrid from '@/components/news/news-grid';
import { useAppContext } from '@/context/AppContext';
import { simulateApiCall, newsData, newsCategories, timeFrames, newsSources } from '@/lib/mockData';

export default function NewsPage() {
  const { state, actions } = useAppContext();
  const { filters, articles, loading, error } = state.newsData;
  
  // Fetch news data on component mount and when filters change
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Simulate API call to get news data
        const responseData = await simulateApiCall('/api/news', filterNewsData(newsData, filters), 800);
        
        // This would normally be handled by our context action
        // But for mockup purposes, we're manually updating the state
        actions.fetchNews(responseData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    
    fetchNews();
  }, [filters]);

  // Helper function to filter news data based on the current filters
  const filterNewsData = (newsData, filters) => {
    let filteredData = [...newsData];
    
    // Filter by category
    if (filters.category && filters.category !== 'all') {
      filteredData = filteredData.filter(item => item.category === filters.category);
    }
    
    // Filter by source
    if (filters.source && filters.source !== 'all') {
      filteredData = filteredData.filter(item => 
        item.source.toLowerCase() === filters.source.toLowerCase() ||
        item.source.toLowerCase().includes(filters.source.toLowerCase())
      );
    }
    
    // Filter by time frame (simplified)
    if (filters.timeFrame) {
      const now = new Date();
      
      if (filters.timeFrame === 'today') {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        filteredData = filteredData.filter(item => new Date(item.timestamp).getTime() >= today);
      } else if (filters.timeFrame === 'week') {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).getTime();
        filteredData = filteredData.filter(item => new Date(item.timestamp).getTime() >= oneWeekAgo);
      } else if (filters.timeFrame === 'month') {
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).getTime();
        filteredData = filteredData.filter(item => new Date(item.timestamp).getTime() >= oneMonthAgo);
      }
    }
    
    // Filter by search query
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      filteredData = filteredData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.summary.toLowerCase().includes(query)
      );
    }
    
    return filteredData;
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    actions.setNewsFilter({ [filterType]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Financial News</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with the latest market news and insights
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            <TrendingUp size={14} />
            <span>Market Up</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">
            <Newspaper size={14} />
            <span>{articles.length} Articles</span>
          </div>
        </div>
      </div>
      
      <Card className="border-border bg-card/60 backdrop-blur">
        <CardContent className="p-4">
          <NewsFilter 
            categories={newsCategories}
            timeFrames={timeFrames}
            sources={newsSources}
            activeCategory={filters.category}
            activeTimeFrame={filters.timeFrame}
            activeSource={filters.source}
            searchQuery={filters.searchQuery}
            onCategoryChange={(value) => handleFilterChange('category', value)}
            onTimeFrameChange={(value) => handleFilterChange('timeFrame', value)}
            onSourceChange={(value) => handleFilterChange('source', value)}
            onSearchChange={(value) => handleFilterChange('searchQuery', value)}
          />
        </CardContent>
      </Card>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle size={48} className="text-red-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">Error Loading News</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {error}. Please try again later or check your connection.
            </p>
          </CardContent>
        </Card>
      ) : articles.length > 0 ? (
        <NewsGrid newsData={articles} />
      ) : (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No News Found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              No news articles match your current filters. Try adjusting your search criteria or filters to see more results.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
