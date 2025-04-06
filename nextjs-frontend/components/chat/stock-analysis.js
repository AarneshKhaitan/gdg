'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StockAnalysis({ data }) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-xl font-bold">{data.companyName} ({data.ticker})</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl">${data.currentPrice}</span>
            <span className={`px-2 py-1 rounded text-sm ${
              data.change >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
            }`}>
              {data.change >= 0 ? '+' : ''}{data.change} ({data.percentChange}%)
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Market Cap:</span>
            <span>${data.marketCap}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">P/E Ratio:</span>
            <span>{data.peRatio}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Volume:</span>
            <span>{data.volume}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dividend:</span>
            <span>{data.dividend}%</span>
          </div>
        </div>
      </div>
      
      {/* Stock Price Chart */}
      <div className="h-64 bg-secondary/30 rounded-lg overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data.stockData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`colorGradient-${data.ticker}`} x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={data.change >= 0 ? "#10b981" : "#ef4444"} 
                  stopOpacity={0.4} 
                />
                <stop 
                  offset="95%" 
                  stopColor={data.change >= 0 ? "#10b981" : "#ef4444"} 
                  stopOpacity={0} 
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.5)"
            />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              domain={['auto', 'auto']}
              tickFormatter={(tick) => `$${tick}`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(15, 15, 15, 0.9)', 
                border: '1px solid rgba(255,255,255,0.2)' 
              }}
              formatter={(value) => [`$${value}`, 'Price']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={data.change >= 0 ? "#10b981" : "#ef4444"} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#colorGradient-${data.ticker})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-md bg-secondary/30">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Technical Analysis</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>MACD:</span>
              <span className="text-green-500">{data.analysis.technical.macd}</span>
            </div>
            <div className="flex justify-between">
              <span>RSI:</span>
              <span>{data.analysis.technical.rsi}</span>
            </div>
            <div className="flex justify-between">
              <span>Moving Avg:</span>
              <span className="text-xs">{data.analysis.technical.movingAverages}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-md bg-secondary/30">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Fundamentals</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Revenue:</span>
              <span className="text-green-500">{data.analysis.fundamental.revenueGrowth}</span>
            </div>
            <div className="flex justify-between">
              <span>Earnings:</span>
              <span className="text-green-500">{data.analysis.fundamental.earningsGrowth}</span>
            </div>
            <div className="flex justify-between">
              <span>Cash Flow:</span>
              <span>{data.analysis.fundamental.cashFlow}</span>
            </div>
            <div className="flex justify-between">
              <span>Debt/Equity:</span>
              <span>{data.analysis.fundamental.debtToEquity}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-md bg-secondary/30">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Sentiment</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Analyst Rating:</span>
              <span className="text-green-500">{data.analysis.sentiment.analystRating}</span>
            </div>
            <div className="flex justify-between">
              <span>Price Target:</span>
              <span>{data.analysis.sentiment.analystPriceTarget}</span>
            </div>
            <div className="flex justify-between">
              <span>Sentiment:</span>
              <span className="text-green-500">{data.analysis.sentiment.sentimentScore}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}