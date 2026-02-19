import React from "react";
import { X, MapPin, DollarSign, Music } from "lucide-react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

interface FacetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    location: string;
    priceRange: number[];
    genres: string[];
  };
  onFiltersChange: React.Dispatch<
    React.SetStateAction<{
      location: string;
      priceRange: number[];
      genres: string[];
    }>
  >;
}

const genres = [
  'Electronic',
  'Jazz',
  'Afrobeat',
  'Classical',
  'Rock',
  'Pop',
  'Hip Hop',
  'Folk',
  'Reggae',
  'World Music',
  'Indie',
  'Latin',
  'R&B',
  'Blues',
  'Techno',
  'Traditional',
  'EDM'
];

export const FacetDrawer = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: FacetDrawerProps) => {
  if (!isOpen) return null;

  const updateFilter = (
    key: keyof FacetDrawerProps["filters"],
    value: string | number[] | string[],
  ) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleGenre = (genre: string) => {
    const current = filters.genres || [];
    const updated = current.includes(genre)
      ? current.filter(g => g !== genre)
      : [...current, genre];
    updateFilter('genres', updated);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-background border-l border-border z-50 md:z-40 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Location */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Location</Label>
              </div>
              <Input
                placeholder="Enter city name..."
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
              />
            </div>

            {/* Budget (formerly Price Range) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Budget (USD)</Label>
              </div>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilter("priceRange", value)}
                  max={50000}
                  min={0}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>{filters.priceRange[0].toLocaleString()}</span>
                  <span>{filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Genres</Label>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {genres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={genre}
                      checked={filters.genres?.includes(genre)}
                      onCheckedChange={() => toggleGenre(genre)}
                    />
                    <Label
                      htmlFor={genre}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {genre}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() =>
                  onFiltersChange({
                    location: "",
                    priceRange: [0, 50000],
                    genres: [],
                  })
                }
              >
                Clear All
              </Button>
              <Button className="flex-1" onClick={onClose}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};