'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { apiService } from '@/lib/api';

// Initial state
const initialState = {
  // Market data
  marketData: {
    indices: [],
    sectors: [],
    loading: false,
    error: null,
  },
  
  // News data
  newsData: {
    articles: [],
    loading: false,
    error: null,
    filters: {
      category: 'all',
      timeFrame: 'today',
      source: 'all',
      searchQuery: '',
    },
  },
  
  // Chat data
  chatData: {
    messages: [
      {
        role: 'assistant',
        content: 'Hello! I can help you analyze stocks and provide market insights. Try asking about a specific stock or market trend.',
        timestamp: new Date(),
      },
    ],
    loading: false,
    error: null,
  },
  
  // UI state
  ui: {
    theme: 'dark',
    sidebarCollapsed: false,
  },
};

// Action types
const ActionTypes = {
  // Market data actions
  FETCH_MARKET_DATA_START: 'FETCH_MARKET_DATA_START',
  FETCH_MARKET_DATA_SUCCESS: 'FETCH_MARKET_DATA_SUCCESS',
  FETCH_MARKET_DATA_ERROR: 'FETCH_MARKET_DATA_ERROR',
  
  // News data actions
  FETCH_NEWS_START: 'FETCH_NEWS_START',
  FETCH_NEWS_SUCCESS: 'FETCH_NEWS_SUCCESS',
  FETCH_NEWS_ERROR: 'FETCH_NEWS_ERROR',
  SET_NEWS_FILTER: 'SET_NEWS_FILTER',
  
  // Chat actions
  SEND_MESSAGE_START: 'SEND_MESSAGE_START',
  SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
  SEND_MESSAGE_ERROR: 'SEND_MESSAGE_ERROR',
  
  // UI actions
  TOGGLE_THEME: 'TOGGLE_THEME',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    // Market data cases
    case ActionTypes.FETCH_MARKET_DATA_START:
      return {
        ...state,
        marketData: {
          ...state.marketData,
          loading: true,
          error: null,
        },
      };
    
    case ActionTypes.FETCH_MARKET_DATA_SUCCESS:
      return {
        ...state,
        marketData: {
          ...state.marketData,
          ...action.payload,
          loading: false,
          error: null,
        },
      };
    
    case ActionTypes.FETCH_MARKET_DATA_ERROR:
      return {
        ...state,
        marketData: {
          ...state.marketData,
          loading: false,
          error: action.payload,
        },
      };
    
    // News data cases
    case ActionTypes.FETCH_NEWS_START:
      return {
        ...state,
        newsData: {
          ...state.newsData,
          loading: true,
          error: null,
        },
      };
    
    case ActionTypes.FETCH_NEWS_SUCCESS:
      return {
        ...state,
        newsData: {
          ...state.newsData,
          articles: action.payload,
          loading: false,
          error: null,
        },
      };
    
    case ActionTypes.FETCH_NEWS_ERROR:
      return {
        ...state,
        newsData: {
          ...state.newsData,
          loading: false,
          error: action.payload,
        },
      };
    
    case ActionTypes.SET_NEWS_FILTER:
      return {
        ...state,
        newsData: {
          ...state.newsData,
          filters: {
            ...state.newsData.filters,
            ...action.payload,
          },
        },
      };
    
    // Chat cases
    case ActionTypes.SEND_MESSAGE_START:
      return {
        ...state,
        chatData: {
          ...state.chatData,
          loading: true,
          error: null,
          messages: [
            ...state.chatData.messages,
            {
              role: 'user',
              content: action.payload,
              timestamp: new Date(),
            },
          ],
        },
      };
    
    case ActionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        chatData: {
          ...state.chatData,
          loading: false,
          error: null,
          messages: [
            ...state.chatData.messages,
            {
              role: 'assistant',
              content: action.payload.content,
              chartData: action.payload.chartData || null,
              timestamp: new Date(),
            },
          ],
        },
      };
    
    case ActionTypes.SEND_MESSAGE_ERROR:
      return {
        ...state,
        chatData: {
          ...state.chatData,
          loading: false,
          error: action.payload,
        },
      };
    
    // UI cases
    case ActionTypes.TOGGLE_THEME:
      return {
        ...state,
        ui: {
          ...state.ui,
          theme: state.ui.theme === 'dark' ? 'light' : 'dark',
        },
      };
    
    case ActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarCollapsed: !state.ui.sidebarCollapsed,
        },
      };
    
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Context provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Action creators
  const actions = {
    // Market data actions
    fetchMarketData: async (timeframe = '1D') => {
      dispatch({ type: ActionTypes.FETCH_MARKET_DATA_START });
      try {
        const indicesData = await apiService.getMarketOverview(timeframe);
        const sectorsData = await apiService.getSectorPerformance(timeframe);
        
        dispatch({
          type: ActionTypes.FETCH_MARKET_DATA_SUCCESS,
          payload: {
            indices: indicesData,
            sectors: sectorsData,
          },
        });
      } catch (error) {
        dispatch({
          type: ActionTypes.FETCH_MARKET_DATA_ERROR,
          payload: error.message,
        });
      }
    },
    
    // News actions
    fetchNews: async (filters = {}) => {
      dispatch({ type: ActionTypes.FETCH_NEWS_START });
      try {
        // Combine current filters with any new filters
        const combinedFilters = {
          ...state.newsData.filters,
          ...filters,
        };
        
        // Update filters in state if new ones are provided
        if (Object.keys(filters).length > 0) {
          dispatch({
            type: ActionTypes.SET_NEWS_FILTER,
            payload: filters,
          });
        }
        
        const newsData = await apiService.getNews(combinedFilters);
        
        dispatch({
          type: ActionTypes.FETCH_NEWS_SUCCESS,
          payload: newsData,
        });
      } catch (error) {
        dispatch({
          type: ActionTypes.FETCH_NEWS_ERROR,
          payload: error.message,
        });
      }
    },
    
    // Set news filter
    setNewsFilter: (filters) => {
      dispatch({
        type: ActionTypes.SET_NEWS_FILTER,
        payload: filters,
      });
    },
    
    // Chat actions
    sendChatMessage: async (message) => {
      dispatch({
        type: ActionTypes.SEND_MESSAGE_START,
        payload: message,
      });
      
      try {
        // In a real app, this would call the backend API
        // For now, simulate a response with mock data
        
        // Simple timeout to simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        let responseContent = '';
        let chartData = null;
        
        if (message.toLowerCase().includes('analyze') || message.toLowerCase().includes('analysis')) {
          if (message.toLowerCase().includes('apple') || message.toLowerCase().includes('aapl')) {
            responseContent = "Here's the analysis for Apple Inc. (AAPL):";
            chartData = {
              type: 'stock',
              ticker: 'AAPL',
              companyName: 'Apple Inc.',
              currentPrice: 187.43,
              change: 1.25,
              percentChange: 0.67,
              marketCap: '2.94T',
              peRatio: 31.08,
              dividend: 0.92,
              volume: '54.3M',
              dayRange: '185.83 - 188.12',
              yearRange: '124.17 - 199.62',
              stockData: [
                { date: '2023-05-01', value: 169.59 },
                { date: '2023-06-01', value: 180.95 },
                { date: '2023-07-01', value: 193.97 },
                { date: '2023-08-01', value: 187.87 },
                { date: '2023-09-01', value: 171.85 },
                { date: '2023-10-01', value: 170.77 },
                { date: '2023-11-01', value: 189.37 },
                { date: '2023-12-01', value: 193.58 },
                { date: '2024-01-01', value: 188.85 },
                { date: '2024-02-01', value: 182.52 },
                { date: '2024-03-01', value: 169.00 },
                { date: '2024-04-01', value: 187.43 }
              ],
              analysis: {
                technical: {
                  macd: 'Bullish',
                  rsi: 'Neutral (57.8)',
                  movingAverages: 'Above 50-day MA, Below 200-day MA'
                },
                fundamental: {
                  revenueGrowth: '5.2% YoY',
                  earningsGrowth: '7.8% YoY',
                  cashFlow: 'Strong positive cash flow',
                  debtToEquity: 'Low (1.32)'
                },
                sentiment: {
                  analystRating: 'Buy (76%)',
                  analystPriceTarget: '$205.78',
                  sentimentScore: 'Positive (0.72)'
                }
              }
            };
          } else {
            responseContent = "I can provide stock analysis. Please specify which stock you're interested in (e.g., 'Analyze Apple stock')";
          }
        } else if (message.toLowerCase().includes('market') || message.toLowerCase().includes('trend')) {
          responseContent = "Here's the current market overview:";
          chartData = {
            type: 'market',
            indices: [
              { name: 'S&P 500', value: 5218.24, change: 0.38 },
              { name: 'Dow Jones', value: 39528.76, change: -0.12 },
              { name: 'Nasdaq', value: 16399.21, change: 0.83 },
              { name: 'Russell 2000', value: 2070.16, change: 0.22 }
            ],
            sectors: [
              { name: 'Technology', performance: 1.5 },
              { name: 'Healthcare', performance: -0.3 },
              { name: 'Financials', performance: 0.2 },
              { name: 'Energy', performance: -0.8 },
              { name: 'Consumer Cyclical', performance: 0.6 },
              { name: 'Industrials', performance: 0.1 },
              { name: 'Utilities', performance: -0.5 },
              { name: 'Real Estate', performance: -0.4 },
              { name: 'Basic Materials', performance: 0.3 }
            ],
            topGainers: [
              { ticker: 'NVDA', name: 'NVIDIA Corp', change: 3.68 },
              { ticker: 'ADBE', name: 'Adobe Inc', change: 2.54 },
              { ticker: 'NFLX', name: 'Netflix Inc', change: 2.23 }
            ],
            topLosers: [
              { ticker: 'XOM', name: 'Exxon Mobil', change: -2.15 },
              { ticker: 'PFE', name: 'Pfizer Inc', change: -1.87 },
              { ticker: 'BA', name: 'Boeing Co', change: -1.63 }
            ]
          };
        } else {
          responseContent = "I'm not sure what information you're looking for. You can ask me to analyze specific stocks (e.g., 'Analyze Apple stock') or provide market trends.";
        }
        
        dispatch({
          type: ActionTypes.SEND_MESSAGE_SUCCESS,
          payload: {
            content: responseContent,
            chartData: chartData
          },
        });
      } catch (error) {
        dispatch({
          type: ActionTypes.SEND_MESSAGE_ERROR,
          payload: error.message,
        });
      }
    },
    
    // UI actions
    toggleTheme: () => {
      dispatch({ type: ActionTypes.TOGGLE_THEME });
    },
    
    toggleSidebar: () => {
      dispatch({ type: ActionTypes.TOGGLE_SIDEBAR });
    },
  };
  
  // Effect for theme changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(state.ui.theme);
  }, [state.ui.theme]);
  
  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}