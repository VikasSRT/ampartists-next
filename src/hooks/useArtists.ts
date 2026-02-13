
// import laylaStringsPortrait from '@/assets/layla-strings-portrait.jpg';
// import elSaxoDeLuis from '@/assets/el-saxo-de-luis.png';
import { useQuery } from '@tanstack/react-query';

// Mock data - in real app this would come from your API
const mockArtists = [
  {
    id: '1',
    stageName: 'DJ Khalil',
    primaryGenre: 'Electronic',
    performanceFormats: ['DJ Set', 'Live Mix'],
    city: 'Dubai',
    country: 'UAE',
    startingFeeAED: 5000,
    rating: 4.8,
    reviewCount: 127,
    availability: [{ from: '2025-06-15', to: '2025-07-15' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
    bioTeaser: 'Award-winning DJ specializing in electronic and house music with over 10 years of experience in the Dubai club scene.'
  },
  {
    id: '2',
    stageName: 'Amira Jazz Ensemble',
    primaryGenre: 'Jazz',
    performanceFormats: ['Live Band', 'Acoustic Set'],
    city: 'Abu Dhabi',
    country: 'UAE',
    startingFeeAED: 8000,
    rating: 4.9,
    reviewCount: 89,
    availability: [{ from: '2025-06-01', to: '2025-08-31' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop&sat=-100',
    bioTeaser: 'Sophisticated jazz ensemble perfect for upscale events, weddings, and corporate gatherings with smooth vocals and expert musicianship.'
  },
  {
    id: '3',
    stageName: 'Omar Afrobeat',
    primaryGenre: 'Afrobeat',
    performanceFormats: ['Live Band', 'DJ Set'],
    city: 'Sharjah',
    country: 'UAE',
    startingFeeAED: 6500,
    rating: 4.7,
    reviewCount: 203,
    availability: [{ from: '2025-05-20', to: '2025-09-15' }],
    verified: false,
    heroImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
    bioTeaser: 'High-energy Afrobeat artist bringing authentic rhythms and modern production to create unforgettable dance experiences.'
  },
  {
    id: '4',
    stageName: 'Layla Strings',
    primaryGenre: 'Classical',
    performanceFormats: ['String Quartet', 'Solo Violin'],
    city: 'Dubai',
    country: 'UAE',
    startingFeeAED: 4000,
    rating: 4.6,
    reviewCount: 156,
    availability: [{ from: '2025-06-10', to: '2025-12-31' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
    bioTeaser: 'Elegant classical musician offering beautiful string arrangements for weddings, galas, and intimate gatherings.'
  },
  {
    id: '5',
    stageName: 'Rock Fusion',
    primaryGenre: 'Rock',
    performanceFormats: ['Live Band', 'Acoustic Set'],
    city: 'Al Ain',
    country: 'UAE',
    startingFeeAED: 7500,
    rating: 4.5,
    reviewCount: 92,
    availability: [{ from: '2025-07-01', to: '2025-10-31' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
    bioTeaser: 'Dynamic rock band blending classic and modern sounds for festivals, clubs, and corporate events.'
  },
  {
    id: '6',
    stageName: 'Nadia Pop',
    primaryGenre: 'Pop',
    performanceFormats: ['Solo Performance', 'With Band'],
    city: 'Dubai',
    country: 'UAE',
    startingFeeAED: 12000,
    rating: 4.9,
    reviewCount: 78,
    availability: [{ from: '2025-06-01', to: '2025-08-15' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
    bioTeaser: 'Chart-topping pop artist with international experience, perfect for high-profile events and festivals.'
  },
  {
    id: '7',
    stageName: 'Bass Collective',
    primaryGenre: 'Hip Hop',
    performanceFormats: ['Live Band', 'DJ Set', 'Freestyle'],
    city: 'Abu Dhabi',
    country: 'UAE',
    startingFeeAED: 6000,
    rating: 4.4,
    reviewCount: 142,
    availability: [{ from: '2025-06-05', to: '2025-09-20' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    bioTeaser: 'Underground hip-hop collective with sharp lyrics and innovative beats.'
  },
  {
    id: '8',
    stageName: 'Zara Folk',
    primaryGenre: 'Folk',
    performanceFormats: ['Solo Acoustic', 'Duo'],
    city: 'Fujairah',
    country: 'UAE',
    startingFeeAED: 3500,
    rating: 4.7,
    reviewCount: 201,
    availability: [{ from: '2025-05-15', to: '2025-11-30' }],
    verified: false,
    heroImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop',
    bioTeaser: 'Soulful folk artist with storytelling that captures hearts and minds.'
  },
  {
    id: '9',
    stageName: 'Electric Dreams',
    primaryGenre: 'Electronic',
    performanceFormats: ['DJ Set', 'Live Electronic'],
    city: 'Dubai',
    country: 'UAE',
    startingFeeAED: 8500,
    rating: 4.8,
    reviewCount: 167,
    availability: [{ from: '2025-06-12', to: '2025-08-25' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop',
    bioTeaser: 'Cutting-edge electronic producer pushing boundaries with immersive soundscapes.'
  },
  {
    id: '10',
    stageName: 'Maya Reggae',
    primaryGenre: 'Reggae',
    performanceFormats: ['Live Band', 'Acoustic'],
    city: 'Ras Al Khaimah',
    country: 'UAE',
    startingFeeAED: 5500,
    rating: 4.6,
    reviewCount: 98,
    availability: [{ from: '2025-07-08', to: '2025-10-15' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=500&h=500&fit=crop',
    bioTeaser: 'Authentic reggae vibes with positive energy and conscious lyrics.'
  },
  {
    id: '11',
    stageName: 'Ahmed Classical',
    primaryGenre: 'Classical',
    performanceFormats: ['Piano Solo', 'Chamber Music'],
    city: 'Dubai',
    country: 'UAE',
    startingFeeAED: 4500,
    rating: 4.9,
    reviewCount: 134,
    availability: [{ from: '2025-06-01', to: '2025-12-31' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
    bioTeaser: 'Virtuoso pianist specializing in romantic and contemporary classical repertoire.'
  },
  {
    id: '12',
    stageName: 'Tribal Beats',
    primaryGenre: 'World Music',
    performanceFormats: ['Traditional Ensemble', 'Fusion'],
    city: 'Abu Dhabi',
    country: 'UAE',
    startingFeeAED: 7000,
    rating: 4.5,
    reviewCount: 76,
    availability: [{ from: '2025-05-25', to: '2025-09-30' }],
    verified: false,
    heroImageUrl: 'https://images.unsplash.com/photo-1506629905607-d2c8cc28ad5a?w=500&h=500&fit=crop',
    bioTeaser: 'Authentic world music ensemble celebrating cultural heritage through rhythm.'
  },
  {
    id: '13',
    stageName: 'Luna Indie',
    primaryGenre: 'Indie',
    performanceFormats: ['Solo', 'Band', 'Acoustic'],
    city: 'Sharjah',
    country: 'UAE',
    startingFeeAED: 4200,
    rating: 4.7,
    reviewCount: 189,
    availability: [{ from: '2025-06-20', to: '2025-11-15' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop',
    bioTeaser: 'Indie artist with dreamy melodies and introspective songwriting.'
  },
  {
    id: '14',
    stageName: 'Salsa Fire',
    primaryGenre: 'Latin',
    performanceFormats: ['Live Band', 'Dance Show'],
    city: 'Dubai',
    country: 'UAE',
    startingFeeAED: 9000,
    rating: 4.8,
    reviewCount: 112,
    availability: [{ from: '2025-07-05', to: '2025-10-20' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=500&h=500&fit=crop',
    bioTeaser: 'Fiery Latin band bringing authentic salsa rhythms and passionate performances.'
  },
  {
    id: '15',
    stageName: 'Neo Soul Sisters',
    primaryGenre: 'R&B',
    performanceFormats: ['Vocal Duo', 'With Band'],
    city: 'Abu Dhabi',
    country: 'UAE',
    startingFeeAED: 6800,
    rating: 4.6,
    reviewCount: 156,
    availability: [{ from: '2025-06-15', to: '2025-09-10' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&h=500&fit=crop',
    bioTeaser: 'Smooth neo-soul duo with powerful harmonies and contemporary R&B styling.'
  },
  {
    id: '16',
    stageName: 'Desert Blues',
    primaryGenre: 'Blues',
    performanceFormats: ['Solo Guitar', 'Blues Band'],
    city: 'Al Ain',
    country: 'UAE',
    startingFeeAED: 3800,
    rating: 4.5,
    reviewCount: 87,
    availability: [{ from: '2025-05-30', to: '2025-12-15' }],
    verified: false,
    heroImageUrl: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=500&h=500&fit=crop',
    bioTeaser: 'Raw blues guitarist with soulful voice and authentic desert sound.'
  },
  {
    id: '17',
    stageName: 'Techno Prophet',
    primaryGenre: 'Techno',
    performanceFormats: ['DJ Set', 'Live PA'],
    city: 'Dubai',
    country: 'UAE',
    startingFeeAED: 11000,
    rating: 4.9,
    reviewCount: 203,
    availability: [{ from: '2025-06-08', to: '2025-08-30' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop',
    bioTeaser: 'Underground techno pioneer with hypnotic beats and industrial soundscapes.'
  },
  {
    id: '18',
    stageName: 'Jazz Café Trio',
    primaryGenre: 'Jazz',
    performanceFormats: ['Jazz Trio', 'Quartet'],
    city: 'Dubai',
    country: 'UAE',
    startingFeeAED: 5200,
    rating: 4.7,
    reviewCount: 145,
    availability: [{ from: '2025-06-01', to: '2025-11-30' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=500&fit=crop',
    bioTeaser: 'Intimate jazz trio perfect for sophisticated lounges and upscale dining.'
  },
  {
    id: '19',
    stageName: 'Arabian Nights Orchestra',
    primaryGenre: 'Traditional',
    performanceFormats: ['Full Orchestra', 'Chamber Group'],
    city: 'Abu Dhabi',
    country: 'UAE',
    startingFeeAED: 15000,
    rating: 4.8,
    reviewCount: 67,
    availability: [{ from: '2025-07-01', to: '2025-12-31' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=500&h=500&fit=crop',
    bioTeaser: 'Majestic traditional orchestra celebrating Middle Eastern musical heritage.'
  },
  {
    id: '20',
    stageName: 'Bass Drop Collective',
    primaryGenre: 'EDM',
    performanceFormats: ['DJ Set', 'Live Electronic', 'VJ Show'],
    city: 'Dubai',
    country: 'UAE',
    startingFeeAED: 13000,
    rating: 4.6,
    reviewCount: 298,
    availability: [{ from: '2025-06-10', to: '2025-09-05' }],
    verified: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=500&h=500&fit=crop',
    bioTeaser: 'High-energy EDM collective with massive drops and festival-ready productions.'
  },
  {
    id: '21',
    stageName: 'El Saxo De Luis',
    primaryGenre: 'Latin Jazz',
    performanceFormats: ['Saxophonist', 'Lounge Sax', 'Latin Jazz'],
    city: 'Dubai',
    country: 'UAE',
    startingFeeAED: 6500,
    rating: 4.8,
    reviewCount: 156,
    availability: [{ from: '2025-06-01', to: '2025-12-31' }],
    verified: true,
    heroImageUrl: '/lovable-uploads/62283778-5aca-413c-8f91-a27ae5522532.png',
    bioTeaser: 'El Saxo De Luis is a Colombian saxophonist and composer based in Dubai. With over 20 years of experience, he masterfully blends Latin music, electro, house, jazz, and R&B. Played with Grammy-Winning International Bands, Nominated for Latin Grammy.'
  }
];

interface UseArtistsParams {
  searchQuery: string;
  filters: {
    location: string;
    priceRange: number[];
    dateRange: any;
    eventTypes: string[];
    genres: string[];
  };
  sortBy: string;
}

export const useArtists = ({ searchQuery, filters, sortBy }: UseArtistsParams) => {
  return useQuery({
    queryKey: ['artists', searchQuery, filters, sortBy],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredArtists = [...mockArtists];

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredArtists = filteredArtists.filter(artist =>
          artist.stageName.toLowerCase().includes(query) ||
          artist.primaryGenre.toLowerCase().includes(query) ||
          artist.performanceFormats.some(format => format.toLowerCase().includes(query))
        );
      }

      // Apply location filter
      if (filters.location) {
        const location = filters.location.toLowerCase();
        filteredArtists = filteredArtists.filter(artist =>
          artist.city.toLowerCase().includes(location) ||
          artist.country.toLowerCase().includes(location)
        );
      }

      // Apply price range filter
      filteredArtists = filteredArtists.filter(artist =>
        artist.startingFeeAED >= filters.priceRange[0] &&
        artist.startingFeeAED <= filters.priceRange[1]
      );

      // Apply genres filter
      if (filters.genres && filters.genres.length > 0) {
        filteredArtists = filteredArtists.filter(artist =>
          filters.genres.includes(artist.primaryGenre)
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-asc':
          filteredArtists.sort((a, b) => a.startingFeeAED - b.startingFeeAED);
          break;
        case 'price-desc':
          filteredArtists.sort((a, b) => b.startingFeeAED - a.startingFeeAED);
          break;
        case 'rating':
          filteredArtists.sort((a, b) => b.rating - a.rating);
          break;
        case 'popularity':
          filteredArtists.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default:
          // Relevance - keep original order
          break;
      }

      return filteredArtists;
    },
  });
};