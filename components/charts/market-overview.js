'use client';

import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function MarketOverview({ 
  indicesData, 
  sectorData,
  timeframe = "1M",
  height = 300 
}) {
  // Render indices trend chart
  const renderIndicesChart = () => {
    if (!indicesData || indicesData.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No data available</p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={indicesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.5)" 
          />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 15, 15, 0.9)', 
              border: '1px solid rgba(255,255,255,0.2)' 
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="sp500" 
            stroke="#3b82f6" 
            strokeWidth={2} 
            dot={false} 
            name="S&P 500" 
          />
          <Line 
            type="monotone" 
            dataKey="nasdaq" 
            stroke="#10b981" 
            strokeWidth={2} 
            dot={false} 
            name="Nasdaq" 
          />
          <Line 
            type="monotone" 
            dataKey="dow" 
            stroke="#f59e0b" 
            strokeWidth={2} 
            dot={false} 
            name="Dow Jones" 
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  // Render sector performance chart
  const renderSectorChart = () => {
    if (!sectorData || sectorData.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No data available</p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={sectorData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
          <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
          <YAxis dataKey="name" type="category" width={100} stroke="rgba(255,255,255,0.5)" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 15, 15, 0.9)', 
              border: '1px solid rgba(255,255,255,0.2)' 
            }} 
            formatter={(value) => [`${value}%`, 'Performance']}
          />
          <ReferenceLine x={0} stroke="rgba(255,255,255,0.3)" />
          <Bar 
            dataKey="value" 
            name="Performance" 
            radius={[0, 4, 4, 0]}
            fill={(entry) => entry.value >= 0 ? '#10b981' : '#ef4444'}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Market Indices Chart */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Market Indices</CardTitle>
          <CardDescription>Performance of major indices over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: `${height}px` }}>
            {renderIndicesChart()}
          </div>
          
          <div className="flex justify-center gap-6 mt-4">
            {['1D', '1W', '1M', '3M', '1Y', 'YTD'].map((period) => (
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
        </CardContent>
      </Card>
      
      {/* Sector Performance */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Sector Performance</CardTitle>
          <CardDescription>Performance by sector over the selected time period</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: `${height}px` }}>
            {renderSectorChart()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}