'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function NewsFilter({
  categories,
  timeFrames,
  sources,
  activeCategory,
  activeTimeFrame,
  activeSource,
  searchQuery,
  onCategoryChange,
  onTimeFrameChange,
  onSourceChange,
  onSearchChange,
}) {
  const [showAllFilters, setShowAllFilters] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <button 
          onClick={() => setShowAllFilters(!showAllFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
            showAllFilters 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-secondary border-border hover:bg-secondary/80'
          }`}
        >
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>
      
      {showAllFilters && (
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Time Frame</h4>
            <div className="flex flex-wrap gap-2">
              {timeFrames.map((timeFrame) => (
                <button
                  key={timeFrame.id}
                  onClick={() => onTimeFrameChange(timeFrame.id)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeTimeFrame === timeFrame.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {timeFrame.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Sources</h4>
            <div className="flex flex-wrap gap-2">
              {sources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => onSourceChange(source.id)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeSource === source.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {source.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
