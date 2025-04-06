'use client';

import { useEffect, useState } from 'react';
import { User, Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import StockAnalysis from '@/components/chat/stock-analysis';
import MarketAnalysis from '@/components/chat/market-analysis';

export default function ChatMessage({ message }) {
  const { role, content, chartData, timestamp } = message;
  const isUser = role === 'user';
  
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex items-start justify-center rounded-full p-2 ${
          isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary'
        }`}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>
        
        <div className="space-y-2">
          <Card className={`border ${
            isUser 
              ? 'border-primary/20 bg-primary/10' 
              : 'border-secondary bg-secondary/50'
          }`}>
            <CardContent className="p-3">
              <p>{content}</p>
              
              {chartData && (
                <div className="mt-4">
                  {chartData.type === 'stock' ? (
                    <StockAnalysis data={chartData} />
                  ) : chartData.type === 'market' ? (
                    <MarketAnalysis data={chartData} />
                  ) : null}
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className={`text-xs text-muted-foreground ${
            isUser ? 'text-right' : 'text-left'
          }`}>
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
}