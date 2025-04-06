/**
 * API client for interacting with the FastAPI backend
 */
class ApiService {
    constructor() {
      // Base URL for API endpoints
      this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    }
  
    /**
     * Generic method to make HTTP requests
     */
    async request(endpoint, options = {}) {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };
  
      const config = {
        ...options,
        headers,
      };
  
      try {
        const response = await fetch(url, config);
        
        // Handle HTTP errors
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || `HTTP error! status: ${response.status}`);
        }
        
        // Parse response
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('API request failed:', error);
        throw error;
      }
    }
  
    /**
     * Chat API - Send a message to the AI assistant
     */
    async sendChatMessage(message, context = {}) {
      return this.request('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message,
          context
        }),
      });
    }
  
    /**
     * Stock Analysis - Get stock data and analysis
     */
    async getStockAnalysis(symbol, timeframe = '1M') {
      return this.request(`/api/stocks/${symbol}?timeframe=${timeframe}`);
    }
  
    /**
     * Market Data - Get market overview data
     */
    async getMarketOverview(timeframe = '1D') {
      return this.request(`/api/market/overview?timeframe=${timeframe}`);
    }
  
    /**
     * Sector Performance - Get sector performance data
     */
    async getSectorPerformance(timeframe = '1M') {
      return this.request(`/api/market/sectors?timeframe=${timeframe}`);
    }
  
    /**
     * News - Get financial news
     */
    async getNews(params = {}) {
      const queryParams = new URLSearchParams();
      
      if (params.category) queryParams.append('category', params.category);
      if (params.source) queryParams.append('source', params.source);
      if (params.timeframe) queryParams.append('timeframe', params.timeframe);
      if (params.query) queryParams.append('query', params.query);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      const queryString = queryParams.toString();
      return this.request(`/api/news?${queryString}`);
    }
  
    /**
     * Economic Data - Get economic indicators
     */
    async getEconomicData(indicator, timeframe = '1Y') {
      return this.request(`/api/economic/${indicator}?timeframe=${timeframe}`);
    }
  
    /**
     * Search - Search for stocks, news, etc.
     */
    async search(query) {
      return this.request(`/api/search?query=${encodeURIComponent(query)}`);
    }
  }
  
  // Create and export a singleton instance
  export const apiService = new ApiService();