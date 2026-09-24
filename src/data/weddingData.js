/**
 * WEDDING CONFIGURATION & DATA SOURCE
 * 
 * Edit this file to update wedding details without touching the UI components.
 * All couple information, dates, venue, photos, music, and messages are managed here.
 */

export const weddingData = {
  // Couple Information
  groom: "Mohamed Infaz",
  bride: "Fathima Hafsa",
  coupleName: "Mohamed Infaz & Fathima Hafsa",
  initials: "I & F",
  
  // Date & Time (Asia/Colombo UTC+05:30)
  date: "2027-04-25T13:00:00+05:30",
  displayDate: "25 April 2027",
  displayDay: "Sunday",
  numericDate: "25.04.2027",
  time: "1:00 PM",
  
  // Venue & Location
  venue: "Ilma Reception Hall",
  address: "Ilma Reception Hall, Sri Lanka",
  locationUrl: "https://share.google/LnWVdmypHZV1OQdh9",
  
  // Invitation Copy
  invitationMessage: "With love in our hearts and the blessings of our families, we invite you to celebrate the beginning of our beautiful journey together. Your presence would make our special day even more meaningful.",
  invitationSubMessage: "Together with our families, we cordially request the honor of your presence and warm blessings as we unite in holy matrimony.",
  
  // Story / Cinematic Quote
  storyQuote: "Two hearts. One journey. A lifetime together.",
  storySubtitle: "Every step has led us to this sacred moment.",
  
  // Media Assets
  heroVideo: "/video/hero-1.mp4",
  heroPoster: "/video/hero-frame.jpg",
  coverImage: "/images/cover/cover.jpg",
  couplePhotos: [
    {
      url: "/images/couple/couple-01.jpg",
      title: "A Sacred Union",
      subtitle: "Two Souls Bound in Faith & Love"
    },
    {
      url: "/images/couple/couple-02.jpg",
      title: "Eternal Promise",
      subtitle: "Walking Together Towards Tomorrow"
    },
    {
      url: "/images/couple/couple-03.jpg",
      title: "With Every Heartbeat",
      subtitle: "Blessed by Families, Cherished Forever"
    }
  ],
  gallery: [
    { id: 1, url: "/images/gallery/gallery-01.jpg", title: "Quiet Moments", category: "Cherished" },
    { id: 2, url: "/images/gallery/gallery-02.jpg", title: "Sweet Anticipation", category: "Joy" },
    { id: 3, url: "/images/gallery/gallery-03.jpg", title: "Gilded Horizons", category: "Hope" },
    { id: 4, url: "/images/gallery/gallery-04.jpg", title: "Family Blessings", category: "Gratitude" },
    { id: 5, url: "/images/gallery/gallery-05.jpg", title: "The Journey Begins", category: "Love" },
    { id: 6, url: "/images/gallery/gallery-06.jpg", title: "Hand in Hand", category: "Forever" }
  ],
  
  // Background Audio
  music: "/audio/wedding-music.mp3",
  musicTitle: "Romantic Wedding Melody",
  
  // Social Preview & Metadata
  previewImage: "/images/preview/wedding-preview.jpg",
  siteUrl: "https://infaz-hafsa.netlify.app", // Update with your deployed domain
  
  // Closing Note
  closingMessage: "We look forward to celebrating this beautiful day with you.",
  thankYouSignOff: "With Love,",
  footerDate: "25 • 04 • 2027"
};
