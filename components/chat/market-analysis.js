'use client';

import { TrendingUp, TrendingDown, BarChart } from 'lucide-react';

export default function MarketAnalysis({ data }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {data.indices.map((index, i) => (
          <div key={i} className="p-3 bg-secondary/30 rounded-md">
            <h4 className="font-medium mb-1">{index.name}</h4>
            <div className="flex items-center gap-2">
              <span className="text-lg">{index.value.toLocaleString()}</span>
              <span className={`text-sm ${
                index.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {index.change >= 0 ? '+' : ''}{index.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-md bg-secondary/30">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Sector Performance</h4>
          <div className="space-y-2">
            {data.sectors.map((sector, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm">{sector.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        sector.performance >= 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.abs(sector.performance) * 20}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm ${
                    sector.performance >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {sector.performance >= 0 ? '+' : ''}{sector.performance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-rows-2 gap-4">
          <div className="p-4 rounded-md bg-secondary/30">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Gainers</h4>
            <div className="space-y-2">
              {data.topGainers.map((stock, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{stock.ticker}</span>
                    <span className="text-sm text-muted-foreground ml-2">{stock.name}</span>
                  </div>
                  <span className="text-green-500">+{stock.change}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 rounded-md bg-secondary/30">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Losers</h4>
            <div className="space-y-2">
              {data.topLosers.map((stock, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{stock.ticker}</span>
                    <span className="text-sm text-muted-foreground ml-2">{stock.name}</span>
                  </div>
                  <span className="text-red-500">{stock.change}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}