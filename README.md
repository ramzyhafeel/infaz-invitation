# Mohamed Infaz & Fathima Hafsa — Digital Wedding Invitation

A premium, cinematic, mobile-first digital wedding invitation website crafted for **Mohamed Infaz & Fathima Hafsa**.

Built with React, Vite, Framer Motion, and pure luxury CSS styling. 100% static, fast, responsive, and ready for instant deployment to Netlify.

---

## 🌟 Features & Highlights

- **Cinematic Invitation Opening**: Starts with an elegant invitation card and gold monogram (`M & F`). Tapping **"Tap to Open"** smoothly transitions to the full wedding page.
- **Ambient Background Music**: Starts softly upon opening the invitation with smooth fade-in, looping, and a discreet floating mute/unmute button with playing animation.
- **Interactive Scratch-to-Reveal Date**: An interactive gold foil scratch card revealing **25 April 2027 Sunday, 1:00 PM** with touch/mouse pointer interaction, auto-reveal completion at 50%, and an accessible button fallback.
- **Petal & Gold Floral Celebration**: 30 delicate rose petals and golden particles drift down immediately upon revealing the date, auto-cleaning from the DOM.
- **Accurate Live Countdown**: Live countdown to 25 April 2027 1:00 PM Sri Lanka Time (`Asia/Colombo UTC+05:30`), with a graceful sign-off once the wedding begins.
- **Story Photo & Full-Width Cinematic Banner**: Editorial layout highlighting romantic moments, framed portraits, and full-width quote section.
- **Touch-Friendly Photo Gallery & Lightbox**: Responsive grid with fullscreen lightbox supporting touch swiping, keyboard arrows/escape, and close controls.
- **Venue & Google Maps Integration**: Direct button linking to `https://share.google/LnWVdmypHZV1OQdh9` with >= 44px touch targets.
- **WhatsApp & Social Media Sharing**: Configured Open Graph (`og:image`, `og:title`, `og:description`) and Twitter cards for WhatsApp/Facebook links.
- **Mobile-First & iOS Safari Optimized**: Uses `100svh`, safe area padding `env(safe-area-inset-bottom)`, zero horizontal scrolling, and touch-action protections.

---

## 📁 Project Structure

```
infaz-invitation/
├── public/
│   ├── audio/
│   │   └── wedding-music.mp3             # Background audio track
│   ├── favicon/
│   │   └── favicon.png                   # Browser favicon (M & F monogram)
│   └── images/
│       ├── cover/
│       │   └── cover.jpg                 # Opening invitation cover image
│       ├── couple/
│       │   ├── couple-01.jpg             # Main portrait photo
│       │   ├── couple-02.jpg             # Full-width cinematic banner photo
│       │   └── couple-03.jpg             # Story photo
│       ├── gallery/
│       │   ├── gallery-01.jpg            # Gallery photo 1
│       │   ├── gallery-02.jpg            # Gallery photo 2
│       │   ├── gallery-03.jpg            # Gallery photo 3
│       │   ├── gallery-04.jpg            # Gallery photo 4
│       │   ├── gallery-05.jpg            # Gallery photo 5
│       │   └── gallery-06.jpg            # Gallery photo 6
│       ├── decorations/
│       │   ├── flower.png                # Transparent floral decoration
│       │   ├── petal.png                 # Transparent rose petal
│       │   └── gold-decoration.png       # Gold ornamental divider
│       └── preview/
│           └── wedding-preview.jpg       # WhatsApp & social share image (1200x630)
│
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx             # Monogram loading transition
│   │   ├── InvitationCover.jsx           # Cinematic tap-to-open cover
│   │   ├── MusicPlayer.jsx               # Floating audio controller
│   │   ├── HeroSection.jsx               # Hero banner with couple names
│   │   ├── ScrollIndicator.jsx           # Minimal scroll hint
│   │   ├── InvitationMessage.jsx         # Framed formal invitation message
│   │   ├── ScratchReveal.jsx             # Canvas scratch-to-reveal card
│   │   ├── PetalEffect.jsx               # Rose petal celebration burst
│   │   ├── Countdown.jsx                 # Live countdown timer
│   │   ├── PhotoSection.jsx              # Couple portraits & story banner
│   │   ├── Gallery.jsx                   # Gallery grid & swipe lightbox
│   │   ├── VenueSection.jsx              # Venue details & Google Maps button
│   │   └── Footer.jsx                    # Closing note & monogram sign-off
│   │
│   ├── data/
│   │   └── weddingData.js                # Centralized configuration (All text & paths)
│   │
│   ├── hooks/
│   │   ├── useCountdown.js               # Precise timezone countdown hook
│   │   └── useScrollAnimation.js         # Scroll animation observer & variants
│   │
│   ├── styles/
│   │   ├── variables.css                 # Color palette & font definitions
│   │   ├── animations.css                # Gold shimmer & keyframe animations
│   │   └── global.css                    # Mobile-first reset & typography
│   │
│   ├── App.jsx                           # Application orchestration
│   └── main.jsx                          # React 19 entry point
│
├── index.html                            # Meta tags, fonts & WhatsApp OG preview
├── netlify.toml                          # Netlify build & cache configuration
├── package.json                          # Dependencies & scripts
└── README.md                             # Documentation
```

---

## ✏️ How to Edit Wedding Information

All wedding details are centralized in **one single file**:
👉 [`src/data/weddingData.js`](file:///c:/Users/ramzy/Desktop/infaz-invitation/src/data/weddingData.js)

You do **not** need to touch component code to change wedding details.

### 1. Change Couple Names
Edit lines in `src/data/weddingData.js`:
```javascript
groom: "Mohamed Infaz",
bride: "Fathima Hafsa",
coupleName: "Mohamed Infaz & Fathima Hafsa",
initials: "M & F",
```

### 2. Change Wedding Date & Time
Edit lines in `src/data/weddingData.js`:
```javascript
date: "2027-04-25T13:00:00+05:30",  // ISO 8601 format with timezone
displayDate: "25 April 2027",
displayDay: "Sunday",
numericDate: "25.04.2027",
time: "1:00 PM",
```

### 3. Change Venue & Location URL
Edit lines in `src/data/weddingData.js`:
```javascript
venue: "Ilma Reception Hall",
address: "Ilma Reception Hall, Sri Lanka",
locationUrl: "https://share.google/LnWVdmypHZV1OQdh9",
```

### 4. Change Invitation Message & Quotes
Edit lines in `src/data/weddingData.js`:
```javascript
invitationMessage: "With love in our hearts and the blessings of our families...",
storyQuote: "Two hearts. One journey. A lifetime together.",
closingMessage: "We look forward to celebrating this beautiful day with you.",
```

---

## 🖼️ How to Replace Photos & Audio

Simply replace the files inside the `public/` directory:

| Item | File Location | Recommended Dimensions |
| :--- | :--- | :--- |
| **Cover Photo** | `public/images/cover/cover.jpg` | 1200 × 1600 px (Portrait) |
| **Main Couple Portrait** | `public/images/couple/couple-01.jpg` | 1000 × 1250 px (4:5) |
| **Cinematic Banner Photo** | `public/images/couple/couple-02.jpg` | 1920 × 1080 px (Landscape) |
| **Story Portrait** | `public/images/couple/couple-03.jpg` | 1000 × 1200 px |
| **Gallery Images (6)** | `public/images/gallery/gallery-01.jpg` to `gallery-06.jpg` | 1000 × 1000 px or 1000 × 1250 px |
| **WhatsApp Preview Card** | `public/images/preview/wedding-preview.jpg` | 1200 × 630 px (Standard OG) |
| **Background Music** | `public/audio/wedding-music.mp3` | MP3 format (Gentle acoustic / piano) |
| **Favicon** | `public/favicon/favicon.png` | 512 × 512 px PNG |

> **Note:** If you add more gallery photos or change filenames, simply update the `gallery` or `couplePhotos` array in `src/data/weddingData.js`.

---

## 📲 WhatsApp & Social Sharing Setup

WhatsApp, Facebook, and iMessage require an absolute URL for the preview image.

Once deployed to Netlify (e.g. `https://infaz-hafsa.netlify.app`), update [`index.html`](file:///c:/Users/ramzy/Desktop/infaz-invitation/index.html):
```html
<meta property="og:url" content="https://YOUR-SITE-NAME.netlify.app/" />
<meta property="og:image" content="https://YOUR-SITE-NAME.netlify.app/images/preview/wedding-preview.jpg" />
<meta name="twitter:image" content="https://YOUR-SITE-NAME.netlify.app/images/preview/wedding-preview.jpg" />
```

---

## 🚀 Netlify Deployment Guide

The repository includes a ready-to-use [`netlify.toml`](file:///c:/Users/ramzy/Desktop/infaz-invitation/netlify.toml).

### Option 1: Git Push (Recommended)
1. Push this project to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial luxury wedding invitation"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. Log into [Netlify](https://www.netlify.com/) and click **"Add new site"** -> **"Import an existing project"**.
3. Select your GitHub repository.
4. Netlify will automatically detect settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**!

### Option 2: Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting check
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```
