'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  MessageSquare, 
  Newspaper, 
  Home, 
  Settings, 
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { state, actions } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Chat Analysis', href: '/chat', icon: MessageSquare },
    { name: 'News', href: '/news', icon: Newspaper },
  ];

  // Toggle sidebar on small screens
  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-secondary rounded-md"
        onClick={toggleMobileSidebar}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <div 
        className={`fixed lg:static inset-0 z-10 transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 lg:transition-none h-full w-64 bg-card border-r border-border flex flex-col`}
      >
        <div className="flex items-center gap-2 p-6 mb-8">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold gradient-text">FinanceAI</h1>
        </div>
        
        <nav className="space-y-1 px-3 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-secondary'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Theme Toggle */}
        <div className="p-4 border-t border-border">
          <button 
            onClick={actions.toggleTheme}
            className="flex items-center gap-3 px-4 py-3 rounded-md w-full hover:bg-secondary"
          >
            <span>Theme: {state.ui.theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>
      
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-0"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
}
