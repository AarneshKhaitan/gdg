'use client';

import { useState } from 'react';
import { SendIcon } from 'lucide-react';

export default function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about a stock or market trend..."
        className="w-full px-4 py-3 bg-secondary rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <SendIcon size={18} />
      </button>
    </form>
  );
}