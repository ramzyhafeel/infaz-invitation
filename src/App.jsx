import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import InvitationCover from './components/InvitationCover';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import ScrollIndicator from './components/ScrollIndicator';
import InvitationMessage from './components/InvitationMessage';
import ScratchReveal from './components/ScratchReveal';
import PetalEffect from './components/PetalEffect';
import Countdown from './components/Countdown';
import PhotoSection from './components/PhotoSection';
import Gallery from './components/Gallery';
import VenueSection from './components/VenueSection';
import Footer from './components/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [triggerPetals, setTriggerPetals] = useState(false);

  // Short elegant loading state while page resources prepare
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  const handleDateRevealed = () => {
    setTriggerPetals(true);
  };

  return (
    <div className="site-wrapper">
      {/* 1. Initial Loading Screen */}
      <LoadingScreen isLoaded={isLoaded} />

      {/* 2. Opening Invitation Cover (Tap to Open) */}
      <AnimatePresence>
        {!isOpened && (
          <InvitationCover
            isOpen={isOpened}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* 3. Background Audio Player (Begins upon user tap) */}
      <MusicPlayer shouldPlay={isOpened} />

      {/* Floral celebration effect when date is scratched */}
      <PetalEffect active={triggerPetals} />

      {/* Main Wedding Content */}
      <main
        style={{
          opacity: isOpened ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        {/* 4. Cinematic Hero Section */}
        <HeroSection />

        {/* 5. Smooth Scroll Indicator */}
        <ScrollIndicator />

        {/* 6. Emotional Invitation Message */}
        <InvitationMessage />

        {/* 7. Interactive Scratch-to-Reveal Date */}
        <ScratchReveal onRevealed={handleDateRevealed} />

        {/* 8. Live Wedding Countdown */}
        <Countdown />

        {/* 9. Cinematic Couple Photography & Full-width Section */}
        <PhotoSection />

        {/* 10. Photo Gallery with Fullscreen Lightbox */}
        <Gallery />

        {/* 11. Wedding & Venue Details with Google Maps Button */}
        <VenueSection />

        {/* 12. Emotional Closing Footer */}
        <Footer />
      </main>
    </div>
  );
}
