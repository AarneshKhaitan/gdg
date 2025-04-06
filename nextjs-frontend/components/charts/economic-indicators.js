'use client';

import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function EconomicIndicators({
  gdpData,
  inflationData,
  unemploymentData,
  height = 300
}) {
  // Render GDP chart
  const renderGDPChart = () => {
    if (!gdpData || gdpData.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No data available</p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={gdpData}>
          <defs>
            <linearGradient id="gdpGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            tickFormatter={(value) => `${value}%`}  
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 15, 15, 0.9)', 
              border: '1px solid rgba(255,255,255,0.2)' 
            }} 
            formatter={(value) => [`${value}%`, 'GDP Growth']}
          />
          <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            fillOpacity={1}
            fill="url(#gdpGradient)"
            name="GDP Growth" 
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  // Render inflation chart
  const renderInflationChart = () => {
    if (!inflationData || inflationData.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No data available</p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={inflationData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            tickFormatter={(value) => `${value}%`}  
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 15, 15, 0.9)', 
              border: '1px solid rgba(255,255,255,0.2)' 
            }} 
            formatter={(value) => [`${value}%`, 'Inflation Rate']}
          />
          <ReferenceLine y={2} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target', position: 'right', fill: '#10b981' }} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Inflation Rate" 
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  // Render unemployment chart
  const renderUnemploymentChart = () => {
    if (!unemploymentData || unemploymentData.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No data available</p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={unemploymentData}>
          <defs>
            <linearGradient id="unemploymentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            tickFormatter={(value) => `${value}%`}  
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 15, 15, 0.9)', 
              border: '1px solid rgba(255,255,255,0.2)' 
            }} 
            formatter={(value) => [`${value}%`, 'Unemployment Rate']}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#f59e0b" 
            fillOpacity={1}
            fill="url(#unemploymentGradient)"
            name="Unemployment Rate" 
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* GDP Growth Chart */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">GDP Growth</CardTitle>
          <CardDescription>Quarterly GDP growth rate (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: `${height}px` }}>
            {renderGDPChart()}
          </div>
        </CardContent>
      </Card>
      
      {/* Inflation Chart */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Inflation Rate</CardTitle>
          <CardDescription>Consumer Price Index (CPI) YoY (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: `${height}px` }}>
            {renderInflationChart()}
          </div>
        </CardContent>
      </Card>
      
      {/* Unemployment Chart */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Unemployment</CardTitle>
          <CardDescription>Unemployment rate (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: `${height}px` }}>
            {renderUnemploymentChart()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}