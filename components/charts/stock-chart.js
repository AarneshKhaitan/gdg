'use client';

import { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StockChart({ 
  data, 
  title = "Stock Price", 
  subtitle = "", 
  timeframe = "1M",
  height = 300,
  color = "#10b981"
}) {
  const [chartData, setChartData] = useState([]);
  const [chartColor, setChartColor] = useState(color);
  const [showFullChart, setShowFullChart] = useState(false);
  
  // Process data based on the selected timeframe
  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(data);
      
      // Determine chart color based on trend (first vs last value)
      const firstValue = data[0]?.value || 0;
      const lastValue = data[data.length - 1]?.value || 0;
      
      if (lastValue >= firstValue) {
        setChartColor("#10b981"); // green for uptrend
      } else {
        setChartColor("#ef4444"); // red for downtrend
      }
    }
  }, [data, timeframe]);
  
  // Calculate price change and percentage
  const firstPrice = chartData[0]?.value || 0;
  const currentPrice = chartData[chartData.length - 1]?.value || 0;
  const priceChange = currentPrice - firstPrice;
  const priceChangePercent = firstPrice > 0 ? (priceChange / firstPrice) * 100 : 0;

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-baseline">
          <div>
            <CardTitle>{title}</CardTitle>
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">${currentPrice.toFixed(2)}</span>
            <span className={`flex items-center text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange >= 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`colorGradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.5)"
                tickFormatter={(tick) => {
                  if (typeof tick === 'string') {
                    // Simple formatting based on date string format
                    if (tick.includes('-')) {
                      // YYYY-MM-DD format
                      const parts = tick.split('-');
                      return `${parts[1]}/${parts[2].substring(0, 2)}`;
                    }
                    return tick;
                  }
                  return tick;
                }}
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
                stroke={chartColor} 
                strokeWidth={2}
                fillOpacity={1} 
                fill={`url(#colorGradient-${title.replace(/\s+/g, '')})`} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
              <button
                key={period}
                className={`px-2 py-1 text-xs rounded ${
                  timeframe === period 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
                onClick={() => {}}
              >
                {period}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setShowFullChart(!showFullChart)}
            className="text-primary text-sm hover:underline"
          >
            {showFullChart ? 'Hide Details' : 'Full Analysis'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
