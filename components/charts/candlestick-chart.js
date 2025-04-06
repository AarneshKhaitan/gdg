'use client';

import { useState } from 'react';
import { 
  ComposedChart,
  Line,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export default function CandlestickChart({
  data,
  title = "Price Chart",
  subtitle = "",
  timeframe = "1D",
  height = 400
}) {
  const [activeTimeframe, setActiveTimeframe] = useState(timeframe);
  
  // Custom tooltip formatter
  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const stockData = payload[0].payload;
      return (
        <div className="bg-card border border-border p-3 rounded shadow-md">
          <p className="font-medium">{label}</p>
          <div className="space-y-1 mt-2 text-sm">
            <p>Open: <span className="text-foreground">${stockData.open?.toFixed(2)}</span></p>
            <p>High: <span className="text-foreground">${stockData.high?.toFixed(2)}</span></p>
            <p>Low: <span className="text-foreground">${stockData.low?.toFixed(2)}</span></p>
            <p>Close: <span className="text-foreground">${stockData.close?.toFixed(2)}</span></p>
            {stockData.volume && (
              <p>Volume: <span className="text-foreground">{(stockData.volume / 1000000).toFixed(2)}M</span></p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom candlestick renderer
  const renderCandlestick = (props) => {
    const { x, y, width, open, close, high, low, index } = props;
    const fill = open > close ? '#ef4444' : '#10b981';
    const barWidth = Math.max(width * 0.5, 1);
    
    return (
      <g key={`candlestick-${index}`}>
        {/* High to Low line */}
        <line 
          x1={x + width / 2} 
          y1={y} 
          x2={x + width / 2} 
          y2={y + height} 
          stroke={fill} 
          strokeWidth={1} 
        />
        {/* Open to Close bar */}
        <rect 
          x={x + width / 4} 
          y={Math.min(props.cy1, props.cy2)} 
          width={barWidth} 
          height={Math.abs(props.cy1 - props.cy2)} 
          fill={fill}
        />
      </g>
    );
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-baseline">
          <div>
            <CardTitle>{title}</CardTitle>
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                scale="band"
                stroke="rgba(255,255,255,0.5)"
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                domain={['auto', 'auto']}
                tickFormatter={(tick) => `$${tick}`}
              />
              <Tooltip content={customTooltip} />
              
              {/* Custom Candlestick Implementation */}
              <Bar
                dataKey="high"
                fill="transparent"
                stroke="transparent"
                shape={(props) => renderCandlestick({
                  ...props,
                  open: data[props.index].open,
                  close: data[props.index].close,
                  high: data[props.index].high,
                  low: data[props.index].low,
                  cy1: props.y + (props.height * (1 - (data[props.index].open - props.y) / (props.high - props.low))),
                  cy2: props.y + (props.height * (1 - (data[props.index].close - props.low) / (props.high - props.low))),
                  height: props.height
                })}
              />
              
              {/* Moving Averages */}
              <Line 
                type="monotone" 
                dataKey="ma20" 
                stroke="#3b82f6" 
                dot={false} 
                strokeWidth={1.5}
                name="20-day MA"
              />
              <Line 
                type="monotone" 
                dataKey="ma50" 
                stroke="#f59e0b" 
                dot={false} 
                strokeWidth={1.5}
                name="50-day MA"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          {['1D', '1W', '1M', '3M', '1Y', '5Y'].map((period) => (
            <button
              key={period}
              className={`px-2 py-1 text-xs rounded ${
                activeTimeframe === period 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
              onClick={() => setActiveTimeframe(period)}
            >
              {period}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded">Indicators</button>
          <button className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded">Compare</button>
        </div>
      </CardFooter>
    </Card>
  );
}
