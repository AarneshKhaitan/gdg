'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronUp, ChevronDown, MessageSquare } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import ChatInput from '@/components/chat/chat-input';
import ChatMessage from '@/components/chat/chat-message';
import { simulateApiCall, chatResponses } from '@/lib/mockData';

export default function ChatPage() {
  const { state, actions } = useAppContext();
  const { messages, loading, error } = state.chatData;
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message) => {
    // Here we're using the action from our context
    try {
      // Start the message sending process - this adds the user message to the chat
      actions.sendChatMessage(message);
      
      // Simulate API response with our mock data
      // In a real app, this would be handled by the context action
      await simulateApiCall('/api/chat', null, 1000);
      
      // Determine the response based on the message content
      let responseContent = '';
      let chartData = null;
      
      // Check for stock analysis requests
      if (message.toLowerCase().includes('analyze') || message.toLowerCase().includes('analysis')) {
        if (message.toLowerCase().includes('apple') || message.toLowerCase().includes('aapl')) {
          responseContent = chatResponses.analyze.apple.content;
          chartData = chatResponses.analyze.apple.chartData;
        } else if (message.toLowerCase().includes('tesla') || message.toLowerCase().includes('tsla')) {
          responseContent = chatResponses.analyze.tesla.content;
          chartData = chatResponses.analyze.tesla.chartData;
        } else {
          responseContent = chatResponses.analyze.generic.content;
        }
      } 
      // Check for market trend requests
      else if (message.toLowerCase().includes('market') || message.toLowerCase().includes('trend')) {
        responseContent = chatResponses.market.content;
        chartData = chatResponses.market.chartData;
      } 
      // Fallback response
      else {
        responseContent = chatResponses.fallback.content;
      }
      
      // This would normally be handled by the context action's success handler
      // But for our mockup, we'll dispatch it manually
      actions.sendChatMessage(responseContent, chartData);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            <span className="gradient-text">AI Stock Analyst</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Ask questions about stocks, markets, and investments. Get real-time analysis with visualizations.
          </p>
        </CardContent>
      </Card>
      
      <Card className="flex-1 flex flex-col border-border bg-card/50 backdrop-blur">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {loading && (
            <div className="flex items-center justify-center p-4">
              <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
            </div>
          )}
          {error && (
            <div className="p-4 text-center text-red-500">
              <p>Error: {error}</p>
              <p className="text-sm mt-2">Please try again.</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        <div className="p-4 border-t border-border">
          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
      </Card>
    </div>
  );
}
