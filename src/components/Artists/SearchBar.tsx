
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick: () => void;
}

export const SearchBar = ({ value, onChange, onFilterClick }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <div className={`relative transition-all duration-200 ${isFocused ? 'scale-105' : ''}`}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder="Search artists, genres, or performance styles..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-24 h-12 text-lg bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:bg-background/80 transition-all duration-200"
        />
        
        {/* Clear button */}
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        {/* Filter button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onFilterClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick suggestions could go here */}
      {isFocused && value && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-lg z-10">
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Quick suggestions</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer">
                <span className="text-lg">🎸</span>
                <span>Jazz (Genre)</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer">
                <span className="text-lg">🎤</span>
                <span>Live Band (Format)</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer">
                <span className="text-lg">🎧</span>
                <span>DJ Set (Format)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};