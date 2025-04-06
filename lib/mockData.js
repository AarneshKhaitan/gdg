// lib/mockData.js

/**
 * Mock data for development and testing
 * This will be replaced with real API calls in production
 */

// Market indices data
export const marketIndicesData = [
    { date: 'Jan', sp500: 4712, nasdaq: 16488, dow: 37631 },
    { date: 'Feb', sp500: 4953, nasdaq: 17720, dow: 38627 },
    { date: 'Mar', sp500: 5109, nasdaq: 16429, dow: 38869 },
    { date: 'Apr', sp500: 5218, nasdaq: 16399, dow: 39528 },
  ];
  
  // Sector performance data
  export const sectorPerformanceData = [
    { name: 'Technology', value: 8.2 },
    { name: 'Healthcare', value: -2.1 },
    { name: 'Financials', value: 3.5 },
    { name: 'Consumer Cyclical', value: 1.8 },
    { name: 'Energy', value: -4.3 },
    { name: 'Industrials', value: 2.2 },
    { name: 'Utilities', value: -1.7 },
    { name: 'Real Estate', value: -3.1 },
    { name: 'Basic Materials', value: 0.9 },
    { name: 'Communication Services', value: 5.6 },
  ];
  
  // Market overview cards data
  export const marketOverviewCards = [
    { 
      title: 'S&P 500', 
      value: '5,218.24', 
      change: '+0.38%', 
      status: 'up',
      icon: 'BarChart3',
      color: 'blue'
    },
    { 
      title: 'Nasdaq', 
      value: '16,399.21', 
      change: '+0.83%', 
      status: 'up',
      icon: 'Activity',
      color: 'green'
    },
    { 
      title: 'Dow Jones', 
      value: '39,528.76', 
      change: '-0.12%', 
      status: 'down',
      icon: 'DollarSign',
      color: 'amber'
    },
    { 
      title: 'VIX', 
      value: '16.47', 
      change: '+1.24%', 
      status: 'up',
      icon: 'Globe',
      color: 'rose'
    }
  ];
  
  // Stock data for AAPL
  export const aaplStockData = {
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
    priceHistory: [
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
  
  // Daily stock data for intraday charts
  export const stockDailyData = [
    { date: '9:30', value: 186.18 },
    { date: '10:00', value: 185.93 },
    { date: '10:30', value: 186.22 },
    { date: '11:00', value: 186.45 },
    { date: '11:30', value: 186.81 },
    { date: '12:00', value: 186.77 },
    { date: '12:30', value: 186.59 },
    { date: '13:00', value: 186.42 },
    { date: '13:30', value: 186.91 },
    { date: '14:00', value: 187.15 },
    { date: '14:30', value: 187.32 },
    { date: '15:00', value: 187.28 },
    { date: '15:30', value: 187.19 },
    { date: '16:00', value: 187.43 },
  ];
  
  // Candlestick chart data
  export const candlestickData = [
    { date: '2024-03-01', open: 172.50, high: 175.10, low: 171.80, close: 174.25, volume: 73500000 },
    { date: '2024-03-04', open: 174.30, high: 177.95, low: 174.15, close: 177.35, volume: 82100000 },
    { date: '2024-03-05', open: 177.20, high: 177.85, low: 175.60, close: 176.95, volume: 67300000 },
    { date: '2024-03-06', open: 176.75, high: 178.30, low: 175.20, close: 177.50, volume: 74900000 },
    { date: '2024-03-07', open: 176.95, high: 178.90, low: 175.50, close: 178.40, volume: 89200000 },
    { date: '2024-03-08', open: 178.50, high: 181.25, low: 178.10, close: 180.80, volume: 94500000 },
    { date: '2024-03-11', open: 180.60, high: 182.70, low: 179.80, close: 182.10, volume: 86700000 },
    { date: '2024-03-12', open: 181.80, high: 183.25, low: 180.50, close: 181.75, volume: 72300000 },
    { date: '2024-03-13', open: 181.65, high: 182.40, low: 180.10, close: 182.05, volume: 67800000 },
    { date: '2024-03-14', open: 182.30, high: 185.70, low: 182.00, close: 185.40, volume: 97200000 },
    { date: '2024-03-15', open: 185.25, high: 186.80, low: 184.60, close: 185.60, volume: 88100000 },
    { date: '2024-03-18', open: 185.40, high: 187.80, low: 184.90, close: 186.75, volume: 79400000 },
    { date: '2024-03-19', open: 186.60, high: 188.20, low: 185.70, close: 186.45, volume: 84500000 },
    { date: '2024-03-20', open: 186.30, high: 187.50, low: 184.20, close: 186.95, volume: 81200000 },
    { date: '2024-03-21', open: 186.70, high: 188.35, low: 185.90, close: 187.60, volume: 76700000 },
    { date: '2024-03-22', open: 187.35, high: 188.60, low: 186.15, close: 187.95, volume: 69500000 },
    { date: '2024-03-25', open: 188.10, high: 189.75, low: 186.50, close: 188.85, volume: 85300000 },
    { date: '2024-03-26', open: 188.65, high: 188.90, low: 185.25, close: 185.85, volume: 92100000 },
    { date: '2024-03-27', open: 185.65, high: 186.30, low: 182.70, close: 183.60, volume: 101400000 },
    { date: '2024-03-28', open: 183.80, high: 185.40, low: 183.10, close: 184.75, volume: 78600000 },
    { date: '2024-03-29', open: 184.90, high: 186.75, low: 184.40, close: 186.30, volume: 67900000 },
  ];
  
  // Economic indicators data
  export const economicData = {
    gdp: [
      { date: 'Q1 2023', value: 2.0 },
      { date: 'Q2 2023', value: 2.1 },
      { date: 'Q3 2023', value: 2.3 },
      { date: 'Q4 2023', value: 2.0 },
      { date: 'Q1 2024', value: 2.1 },
    ],
    inflation: [
      { date: 'Apr 2023', value: 4.9 },
      { date: 'May 2023', value: 4.0 },
      { date: 'Jun 2023', value: 3.3 },
      { date: 'Jul 2023', value: 3.2 },
      { date: 'Aug 2023', value: 3.7 },
      { date: 'Sep 2023', value: 3.7 },
      { date: 'Oct 2023', value: 3.2 },
      { date: 'Nov 2023', value: 3.1 },
      { date: 'Dec 2023', value: 3.4 },
      { date: 'Jan 2024', value: 3.1 },
      { date: 'Feb 2024', value: 3.2 },
      { date: 'Mar 2024', value: 3.5 },
    ],
    unemployment: [
      { date: 'Apr 2023', value: 3.4 },
      { date: 'May 2023', value: 3.7 },
      { date: 'Jun 2023', value: 3.6 },
      { date: 'Jul 2023', value: 3.5 },
      { date: 'Aug 2023', value: 3.8 },
      { date: 'Sep 2023', value: 3.8 },
      { date: 'Oct 2023', value: 3.9 },
      { date: 'Nov 2023', value: 3.7 },
      { date: 'Dec 2023', value: 3.7 },
      { date: 'Jan 2024', value: 3.7 },
      { date: 'Feb 2024', value: 3.9 },
      { date: 'Mar 2024', value: 3.8 },
    ],
  };
  
  // News data 
  export const newsData = [
    {
      id: 1,
      title: 'Fed Signals Possible Rate Cut in Coming Months',
      summary: 'Federal Reserve officials indicated they could begin reducing interest rates in the coming months if inflation continues to ease.',
      source: 'Reuters',
      category: 'economy',
      imageUrl: '/api/placeholder/800/300',
      timestamp: '2024-04-06T10:32:00Z',
      url: '#',
      sentiment: 'positive',
      isBreaking: true,
    },
    {
      id: 2,
      title: 'Apple Unveils New AI Features for iPhone',
      summary: 'Apple announced a suite of new AI features coming to iPhones later this year, setting the stage for increased competition with Google and Microsoft.',
      source: 'Bloomberg',
      category: 'technology',
      imageUrl: '/api/placeholder/800/300',
      timestamp: '2024-04-06T09:15:00Z',
      url: '#',
      sentiment: 'positive',
    },
    {
      id: 3,
      title: 'Oil Prices Drop on OPEC Production Increase',
      summary: 'Crude oil prices fell by 3% after OPEC+ announced plans to increase production quotas starting next month.',
      source: 'CNBC',
      category: 'market',
      imageUrl: '/api/placeholder/800/300',
      timestamp: '2024-04-05T16:45:00Z',
      url: '#',
      sentiment: 'negative',
    },
    {
      id: 4,
      title: 'Tesla Beats Quarterly Delivery Expectations',
      summary: 'Tesla delivered more vehicles than expected in the first quarter, despite increasing competition in the electric vehicle market.',
      source: 'Wall Street Journal',
      category: 'stocks',
      imageUrl: '/api/placeholder/800/300',
      timestamp: '2024-04-05T11:20:00Z',
      url: '#',
      sentiment: 'positive',
    },
    {
      id: 5,
      title: 'Bitcoin Surpasses $70,000 as Institutional Adoption Grows',
      summary: 'Bitcoin reached a new all-time high above $70,000 as more institutional investors add the cryptocurrency to their portfolios.',
      source: 'Financial Times',
      category: 'crypto',
      imageUrl: '/api/placeholder/800/300',
      timestamp: '2024-04-04T14:10:00Z',
      url: '#',
      sentiment: 'positive',
    },
    {
      id: 6,
      title: 'Amazon Expands Healthcare Offerings with New Acquisition',
      summary: 'Amazon announced the acquisition of a telehealth provider as part of its strategy to expand its presence in the healthcare sector.',
      source: 'CNBC',
      category: 'stocks',
      imageUrl: '/api/placeholder/800/300',
      timestamp: '2024-04-04T10:05:00Z',
      url: '#',
      sentiment: 'neutral',
    },
    {
      id: 7,
      title: 'Global Supply Chain Issues Ease as Shipping Costs Decline',
      summary: 'Global supply chain pressures have eased significantly as shipping costs fall and port congestion decreases.',
      source: 'Reuters',
      category: 'economy',
      imageUrl: '/api/placeholder/800/300',
      timestamp: '2024-04-03T16:30:00Z',
      url: '#',
      sentiment: 'positive',
    },
    {
      id: 8,
      title: 'Microsoft Reports Strong Cloud Growth in Quarterly Earnings',
      summary: "Microsoft's cloud business continued to drive growth, with Azure revenue increasing by 27% in the latest quarter.",
      source: 'Bloomberg',
      category: 'earnings',
      imageUrl: '/api/placeholder/800/300',
      timestamp: '2024-04-03T15:45:00Z',
      url: '#',
      sentiment: 'positive',
    },
    {
      id: 9,
      title: 'Eurozone Inflation Falls to 2.4% in Latest Report',
      summary: "Inflation in the eurozone decreased to 2.4% in March, approaching the European Central Bank's target of 2%.",
      source: 'Financial Times',
      category: 'economy',
      imageUrl: '/api/placeholder/800/300',
      timestamp: '2024-04-02T11:15:00Z',
      url: '#',
      sentiment: 'positive',
    },
    {
      id: 10,
      title: 'Nvidia Announces Next-Generation AI Chips',
      summary: 'Nvidia unveiled its next generation of AI chips, promising significant performance improvements for AI applications.',
      source: 'Wall Street Journal',
      category: 'technology',
      imageUrl: '/api/placeholder/800/300',
      timestamp: '2024-04-02T09:30:00Z',
      url: '#',
      sentiment: 'positive',
      isFeature: true,
    },
  ];
  
  // Categories for news filtering
  export const newsCategories = [
    { id: 'all', name: 'All News' },
    { id: 'market', name: 'Market News' },
    { id: 'stocks', name: 'Stocks' },
    { id: 'crypto', name: 'Cryptocurrency' },
    { id: 'economy', name: 'Economy' },
    { id: 'technology', name: 'Technology' },
    { id: 'earnings', name: 'Earnings' },
  ];
  
  // Time frames for filtering
  export const timeFrames = [
    { id: 'today', name: 'Today' },
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
  ];
  
  // News sources for filtering
  export const newsSources = [
    { id: 'all', name: 'All Sources' },
    { id: 'bloomberg', name: 'Bloomberg' },
    { id: 'cnbc', name: 'CNBC' },
    { id: 'reuters', name: 'Reuters' },
    { id: 'wsj', name: 'Wall Street Journal' },
    { id: 'ft', name: 'Financial Times' },
  ];
  
  // Mock chat message responses for stock analysis
  export const chatResponses = {
    analyze: {
      apple: {
        content: "Here's the analysis for Apple Inc. (AAPL):",
        chartData: {
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
        }
      },
      tesla: {
        content: "Here's the analysis for Tesla Inc. (TSLA):",
        chartData: {
          type: 'stock',
          ticker: 'TSLA',
          companyName: 'Tesla Inc.',
          currentPrice: 172.82,
          change: -3.41,
          percentChange: -1.97,
          marketCap: '550.94B',
          peRatio: 45.23,
          dividend: 0,
          volume: '98.7M',
          dayRange: '170.18 - 175.32',
          yearRange: '138.80 - 299.29',
          stockData: [
            { date: '2023-05-01', value: 160.31 },
            { date: '2023-06-01', value: 245.71 },
            { date: '2023-07-01', value: 271.99 },
            { date: '2023-08-01', value: 215.49 },
            { date: '2023-09-01', value: 242.68 },
            { date: '2023-10-01', value: 197.36 },
            { date: '2023-11-01', value: 236.08 },
            { date: '2023-12-01', value: 248.48 },
            { date: '2024-01-01', value: 209.14 },
            { date: '2024-02-01', value: 189.50 },
            { date: '2024-03-01', value: 175.43 },
            { date: '2024-04-01', value: 172.82 }
          ],
          analysis: {
            technical: {
              macd: 'Bearish',
              rsi: 'Oversold (39.2)',
              movingAverages: 'Below 50-day MA, Below 200-day MA'
            },
            fundamental: {
              revenueGrowth: '3.5% YoY',
              earningsGrowth: '-8.2% YoY',
              cashFlow: 'Positive, but declining',
              debtToEquity: 'Low (0.11)'
            },
            sentiment: {
              analystRating: 'Hold (52%)',
              analystPriceTarget: '$192.75',
              sentimentScore: 'Neutral (0.48)'
            }
          }
        }
      },
      generic: {
        content: "I can provide stock analysis. Please specify which stock you're interested in (e.g., 'Analyze Apple stock')"
      }
    },
    market: {
      content: "Here's the current market overview:",
      chartData: {
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
      }
    },
    fallback: {
      content: "I'm not sure what information you're looking for. You can ask me to analyze specific stocks (e.g., 'Analyze Apple stock') or provide market trends."
    }
  };
  
  // Helper function to simulate API responses
  export function simulateApiCall(endpoint, data = null, delay = 800) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }