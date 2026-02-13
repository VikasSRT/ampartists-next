import artist1 from "../assets/images/artists/artist1.png";
import artist2 from "../assets/images/artists/artist2.png";
import artist3 from "../assets/images/artists/artist3.png";
import artist4 from "../assets/images/artists/artist4.png";
import bg from "../assets/images/artists/bg.png";
import tour1 from "../assets/images/tours/tour1.png";
import tour2 from "../assets/images/tours/tour2.png";
import tour3 from "../assets/images/tours/tour3.png";

import User from "../assets/icons/user.svg?react";
import Link from "../assets/icons/link.svg?react";
import Epk from "../assets/icons/epk.svg?react";

import Specs from "../assets/icons/specs.svg?react";
import Documents from "../assets/icons/documents.svg?react";
import Photos from "../assets/icons/photos.svg?react";

import Star from "../assets/icons/star.svg?react";
import Circle from "../assets/icons/ball.svg?react";
import HalfCircle from "../assets/icons/halfCircle.svg?react";
import Corner from "../assets/icons/corner.svg?react";
import important from "../assets/images/important.png";
import performance from "../assets/images/performance.png";
import docs from "../assets/images/docs.png";

import photo1 from "../assets/images/artists/list/1.png";
import photo2 from "../assets/images/artists/list/2.png";
import photo3 from "../assets/images/artists/list/3.png";
import photo4 from "../assets/images/artists/list/4.png";
import photo5 from "../assets/images/artists/list/5.png";
import photo6 from "../assets/images/artists/list/6.png";
import photo7 from "../assets/images/artists/list/7.png";
import photo8 from "../assets/images/artists/list/8.png";
import photo9 from "../assets/images/artists/list/9.png";
import photo10 from "../assets/images/artists/list/10.png";
import photo11 from "../assets/images/artists/list/11.png";
import photo12 from "../assets/images/artists/list/12.png";
import photo13 from "../assets/images/artists/list/13.png";
import photo14 from "../assets/images/artists/list/14.png";
import photo15 from "../assets/images/artists/list/15.png";

export const ROUTES = {
  home: "/",
  artists: "/artists",
} as const;

export const LANGUEGES = {
  en: "EN",
  ar: "العربية",
} as const;

export type LanguageKey = keyof typeof LANGUEGES; // "en" | "arabic"

export const LANGUAGE_TO_DIRECTION: Record<LanguageKey, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export const DIRECTION_TO_LANGUAGE: Record<"ltr" | "rtl", LanguageKey> = {
  ltr: "en",
  rtl: "arabic",
};

export const ANCHORS = {
  artists: { id: "artists", anchor: "#artists" },
  howItWorks: { id: "howItWorks", anchor: "#howItWorks" },
  findYourArtist: { id: "findYourArtist", anchor: "#findYourArtist" },
  booking: { id: "booking", anchor: "#booking" },
  contact: { id: "contact", anchor: "#contact" },
} as const;

export const LOCATIONS = [
  "New York",
  "Los Angeles",
  "WORLD MUSIC",
  "ELECTRONIC",
  "REGGAE",
  "EDM",
];

export const GENRE = [
  "Rock",
  "Pop",
  "Jazz",
  "Classical",
  "Hip Hop",
  "R&B/Soul",
  "Electronic",
  "Dance",
  "House",
  "Techno",
  "Country",
  "Reggae",
  "Dubstep",
  "Blues",
  "Folk",
  "Metal",
  "Hard Rock",
  "Latin",
  "Trap",
  "Drill",
  "Afrobeat",
  "Indie",
  "Punk",
  "Funk",
  "Disco",
  "Gospel",
  "World",
  "K-Pop",
  "J-Pop",
  "Opera",
  "Soundtrack",
  "New Age",
  "Ska",
  "Ambient",
  "Lo-Fi",
  "Grime",
  "EDM",
  "Tango",
  "Salsa",
  "Bhangra",
  "Instrumental",
  "Spoken Word",
  "Other",
];

export const genresOption = [
  { value: "rock", label: "Rock" },
  { value: "pop", label: "Pop" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
  { value: "hip_hop", label: "Hip Hop" },
  { value: "rnb", label: "R&B/Soul" },
  { value: "electronic", label: "Electronic" },
  { value: "dance", label: "Dance" },
  { value: "house", label: "House" },
  { value: "techno", label: "Techno" },
  { value: "country", label: "Country" },
  { value: "reggae", label: "Reggae" },
  { value: "dubstep", label: "Dubstep" },
  { value: "blues", label: "Blues" },
  { value: "folk", label: "Folk" },
  { value: "metal", label: "Metal" },
  { value: "hard_rock", label: "Hard Rock" },
  { value: "latin", label: "Latin" },
  { value: "trap", label: "Trap" },
  { value: "drill", label: "Drill" },
  { value: "afrobeat", label: "Afrobeat" },
  { value: "indie", label: "Indie" },
  { value: "punk", label: "Punk" },
  { value: "funk", label: "Funk" },
  { value: "disco", label: "Disco" },
  { value: "gospel", label: "Gospel" },
  { value: "world", label: "World" },
  { value: "kpop", label: "K-Pop" },
  { value: "jpop", label: "J-Pop" },
  { value: "opera", label: "Opera" },
  { value: "soundtrack", label: "Soundtrack" },
  { value: "new_age", label: "New Age" },
  { value: "ska", label: "Ska" },
  { value: "ambient", label: "Ambient" },
  { value: "lofi", label: "Lo-Fi" },
  { value: "grime", label: "Grime" },
  { value: "edm", label: "EDM" },
  { value: "tango", label: "Tango" },
  { value: "salsa", label: "Salsa" },
  { value: "bhangra", label: "Bhangra" },
  { value: "instrumental", label: "Instrumental" },
  { value: "spoken_word", label: "Spoken Word" },
  { value: "other", label: "Other" },
];

export const BUDGET = ["100 - 200", "200 - 500", "600 - 1000", "1000 - 2000"];

export const ARTISTS = [
  { id: 0, photo: artist1, name: "artist1", bg: bg },
  { id: 1, photo: artist2, name: "artist2", bg: bg },
  { id: 2, photo: artist3, name: "artist3", bg: bg },
  { id: 3, photo: artist4, name: "artist4", bg: bg },
];

export const BOOKING = [
  {
    id: 0,
    title: "SEARCH",
    description: "Search for artists by genre, location, and date",
  },
  {
    id: 1,
    title: "BOOK",
    description: "Book your favorite artist for your event",
  },
  {
    id: 2,
    title: "SIGN & PAY",
    description: "Sign and pay for your booking online",
  },
  {
    id: 3,
    title: "ENJOY!",
    description: "Relax and enjoy the show",
  },
];

export const ARTIST_REGISTRATION_STEPS = [
  {
    id: 0,
    Icon: User,
    title: "Basic Info",
    description: "Tell us about yourself",
  },
  { id: 1, Icon: Link, title: "Links", description: "Get in Touch" },
  { id: 2, Icon: Epk, title: "EPK", description: "Upload your press kit" },
];

export const PROFILE_STEPS = [
  {
    id: 0,
    Icon: User,
    title: "Basic Info",
    description: "Tell us about yourself",
    information: {
      logo: important,
      title: "Important Information",
      list1: {
        title: "",
        items: [
          "Each crew member must have valid travel documentation",
          "Ensure all passports are valid for at least 6 months from travel date",
          "Include any necessary work permits or visas",
          "Contact details should be accessible for all crew members",
          "Upload all documents in a single batch for easier processing",
        ],
      },
    },
  },
  {
    id: 1,
    Icon: Specs,
    title: "Specs",
    description: "Show format & preferences",
    information: {
      logo: performance,
      title: "Performance Information Guidelines",
      list1: {
        title: "",
        items: [
          "Live show format helps venues understand your performance setup",
          "Genre selection helps with categorization and discovery",
          "Event calendar display increases your visibility on the platform",
          "Your average rate helps venues understand your pricing range",
          "Independent artists can skip the record label information",
        ],
      },
    },
  },
  {
    id: 2,
    Icon: Documents,
    title: "Documents",
    description: "Upload requirements",
    information: {
      logo: docs,
      title: "Performance Information Guidelines",
      list1: {
        title: "Technical Rider",
        items: [
          "Stage requirements and dimensions",
          "Sound and lighting equipment needs",
          "Power requirements and setup time",
          "Any special technical considerations",
        ],
      },
      list2: {
        title: "Hospitality Rider",
        items: [
          "Accommodation requirements",
          "Catering and dietary needs",
          "Transportation arrangements",
          "Green room and backstage needs",
        ],
      },
      details: {
        title: "Passport Scans",
        info: "Upload clear, readable scans of passports for all performers. This is essential for visa processing and international travel arrangements.",
      },
    },
  },
  {
    id: 3,
    Icon: Photos,
    title: "Photos",
    description: "Show your best side",
    information: {
      logo: docs,
      title: "Photo Guidelines & Best Practices",
      list1: {
        title: "Profile Photo",
        items: [
          "High-quality, well-lit photo",
          "Clear view of artist/band",
          "Professional appearance",
          "Used in search results",
        ],
      },
      list2: {
        title: "Cover Photo",
        items: [
          "Performance or promotional image",
          "Showcases your style and brand",
          "High resolution for best quality",
          "Featured on your profile",
        ],
      },
      list3: {
        title: "Marketing Materials",
        items: [
          "3-5 high-resolution images",
          "Performance shots preferred",
          "Used for promotional materials",
          "Venues use for marketing",
        ],
      },
      tip: {
        green: "Pro tip:",
        normal:
          " Great photos significantly increase your chances of getting booked. Consider hiring a professional photographer for the best results.",
      },
    },
  },
];

export const TOURS = [
  {
    id: 0,
    photo: tour1,
    place: "Opera House",
    date: "June 24, 2025",
    location: "Dubai, UAE",
  },
  {
    id: 1,
    photo: tour2,
    place: "Opera House",
    date: "Jule 10, 2025",
    location: "Dubai, UAE",
  },
  {
    id: 2,
    photo: tour3,
    place: "Opera House",
    date: "Jule 18, 2025",
    location: "Dubai, UAE",
  },
];

export const EXPERIENCE = [
  {
    id: 0,
    icon: Star,
    text: "Performed at Dubai jazz festival",
    color: "#f94819",
  },
  {
    id: 1,
    icon: Circle,
    text: "Opened for Grammy-Winning artists",
    color: "#c1ff16",
  },
  {
    id: 2,
    icon: HalfCircle,
    text: "Regular performer at burj al Arab’s Skyview",
    color: "#8181d5",
  },
  {
    id: 3,
    icon: Corner,
    text: "Released two original albums",
    color: "#2f4acb",
  },
];

export const SERVICES = [
  {
    id: 0,
    text: "Solo piano and vocal acts",
  },
  {
    id: 1,
    text: "Jazz trio or quartet arrangements",
  },
  {
    id: 2,
    text: "Background music for sophisticated events",
  },
  {
    id: 3,
    text: "Custom song requests",
  },
];

export const TESTIMONIALS = [
  {
    id: 0,
    author: "Ahmed Al Mansouri",
    client: "Corporate Gala",
    text: "“Sarah created the  amet consectetur. Convallis tincidunt id placerat pretium tristique eget. Id eu ut nunc velit egestas quis tempor nisi sagittis. Morbi cras leo fringilla lacinia ornare a. Sodales amet et pellentesque dui mauris malesuada scelerisque aliquet ornare.”",
  },
  {
    id: 1,
    author: "Ahmed Al Mansouri1",
    client: "Corporate Gala",
    text: "“Sarah created the  amet consectetur. Convallis tincidunt id placerat pretium tristique eget. Id eu ut nunc velit egestas quis tempor nisi sagittis. Morbi cras leo fringilla lacinia ornare a. Sodales amet et pellentesque dui mauris malesuada scelerisque aliquet ornare.”",
  },
  {
    id: 2,
    author: "Ahmed Al Mansouri2",
    client: "Corporate Gala",
    text: "“Sarah created the  amet consectetur. Convallis tincidunt id placerat pretium tristique eget. Id eu ut nunc velit egestas quis tempor nisi sagittis. Morbi cras leo fringilla lacinia ornare a. Sodales amet et pellentesque dui mauris malesuada scelerisque aliquet ornare.”",
  },
  {
    id: 3,
    author: "Ahmed Al Mansouri3",
    client: "Corporate Gala",
    text: "“Sarah created the  amet consectetur. Convallis tincidunt id placerat pretium tristique eget. Id eu ut nunc velit egestas quis tempor nisi sagittis. Morbi cras leo fringilla lacinia ornare a. Sodales amet et pellentesque dui mauris malesuada scelerisque aliquet ornare.”",
  },
];

export const ARTISTS_LIST = [
  {
    id: 0,
    photo: photo1,
    name: "DJ Khalil",
    genre: "WORLD MUSIC",
    variants: ["Dj Set", "Live Mix"],
  },
  {
    id: 1,
    photo: photo2,
    name: "Nadia Pop",
    genre: "POP",
    variants: ["Live Band", "Live Mix"],
  },
  {
    id: 2,
    photo: photo3,
    name: "Bass Collective",
    genre: "HIP HOP",
    variants: ["String Quartet", "Live Mix", "Live Mix"],
  },
  {
    id: 3,
    photo: photo4,
    name: "Electric Dreams",
    genre: "ELECTRONIC",
    variants: ["Dj Set", "Live Mix"],
  },
  {
    id: 4,
    photo: photo5,
    name: "Maya Reggae",
    genre: "REGGAE",
    variants: ["String Quartet", "Live Mix", "Live Mix"],
  },
  {
    id: 5,
    photo: photo6,
    name: "Bass Drop Collective",
    genre: "EDM",
    variants: ["Dj Set", "Live Mix"],
  },
  {
    id: 6,
    photo: photo7,
    name: "DJ Khalil",
    genre: "WORLD MUSIC",
    variants: ["Dj Set", "Live Mix"],
  },
  {
    id: 7,
    photo: photo8,
    name: "Zara Folk",
    genre: "FOLK",
    variants: ["Piano Solo", "Live Mix"],
  },
  {
    id: 8,
    photo: photo9,
    name: "Tribal Beats",
    genre: "BLUES",
    variants: ["Dj Set", "Live Mix"],
  },
  {
    id: 9,
    photo: photo10,
    name: "Sara TECHNO ",
    genre: "TECHNO",
    variants: ["Dj Set", "Live Mix"],
  },
  {
    id: 10,
    photo: photo11,
    name: "Mariia",
    genre: "EDM",
    variants: ["Dj Set", "Live Mix"],
  },
  {
    id: 11,
    photo: photo12,
    name: "DJ Khalil",
    genre: "JAZZ",
    variants: ["Live Band", "Live Mix", "Live Band", "Live Mix", "Live Mix"],
  },
  {
    id: 12,
    photo: photo13,
    name: "Desert Blues",
    genre: "BLUES",
    variants: ["Solo Acoustic", "Live Mix", "Live Mix"],
  },
  {
    id: 13,
    photo: photo14,
    name: "DJ Khalil",
    genre: "HIP HOP",
    variants: ["Piano Solo", "Live Mix"],
  },
  {
    id: 14,
    photo: photo15,
    name: "Luna Indie",
    genre: "INDIE",
    variants: ["String Quartet", "Live Mix"],
  },
];

export const SUBJECT = [
  "Artist Registration",
  "Venue Partnership",
  "Technical Support",
  "Business Partnership",
  "Other",
  "EDM",
];
