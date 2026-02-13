
import { X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface FilterChipsProps {
  filters: {
    location: string;
    priceRange: number[];
    dateRange: any;
    eventTypes: string[];
    genres: string[];
  };
  searchQuery: string;
  onClearFilter: (key: string, value?: any) => void;
  onClearAll: () => void;
}

export const FilterChips = ({ filters, searchQuery, onClearFilter, onClearAll }: FilterChipsProps) => {
  const hasActiveFilters = searchQuery || 
    filters.location || 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000) ||
    filters.dateRange ||
    (filters.eventTypes && filters.eventTypes.length > 0) ||
    (filters.genres && filters.genres.length > 0);

  if (!hasActiveFilters) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-muted/30 rounded-lg">
      <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
      
      {searchQuery && (
        <Badge variant="secondary" className="gap-1">
          Search: {searchQuery}
          <button onClick={() => onClearFilter('search')}>
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {filters.location && (
        <Badge variant="secondary" className="gap-1">
          Location: {filters.location}
          <button onClick={() => onClearFilter('location')}>
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {(filters.priceRange[0] > 0 || filters.priceRange[1] < 50000) && (
        <Badge variant="secondary" className="gap-1">
          Budget: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
          <button onClick={() => onClearFilter('priceRange')}>
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {filters.genres && filters.genres.map((genre) => (
        <Badge key={genre} variant="secondary" className="gap-1">
          {genre}
          <button onClick={() => onClearFilter('genres', genre)}>
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {filters.eventTypes && filters.eventTypes.map((eventType) => (
        <Badge key={eventType} variant="secondary" className="gap-1">
          {eventType}
          <button onClick={() => onClearFilter('eventTypes', eventType)}>
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      <Button
        variant="ghost" 
        size="sm" 
        onClick={onClearAll}
        className="text-xs h-6 px-2 ml-2"
      >
        Clear all
      </Button>
    </div>
  );
};