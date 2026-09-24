import React, { useState, useEffect } from 'react';

import LoadingScreen from './components/LoadingScreen';
import InvitationCover from './components/InvitationCover';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import InvitationMessage from './components/InvitationMessage';
import ScratchReveal from './components/ScratchReveal';
import PetalEffect from './components/PetalEffect';
import Countdown from './components/Countdown';
import PhotoSection from './components/PhotoSection';
import VenueSection from './components/VenueSection';
import Footer from './components/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
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
    if (isOpening) return;
    setIsOpening(true);

    // Smoothly finish transition and unmount cover after 1.45s
    setTimeout(() => {
      setIsOpened(true);
    }, 1450);
  };

  const handleDateRevealed = () => {
    setTriggerPetals(true);
  };

  return (
    <div className="site-wrapper">
      {/* 1. Initial Loading Screen */}
      <LoadingScreen isLoaded={isLoaded} />

      {/* 2. Opening Invitation Cover (Cinematic Gate & Gold Flare) */}
      {!isOpened && (
        <InvitationCover
          isOpening={isOpening}
          onOpen={handleOpenInvitation}
        />
      )}

      {/* 3. Background Audio Player (Begins upon user tap) */}
      <MusicPlayer shouldPlay={isOpening} />

      {/* Floral celebration effect when date is scratched */}
      <PetalEffect active={triggerPetals} />

      {/* Main Wedding Content */}
      <main
        style={{
          opacity: isOpening ? 1 : 0,
          transform: isOpening ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1), transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        {/* 4. Cinematic Video Hero Section (Mobile-first animated video) */}
        <HeroSection isOpened={isOpening} />

        {/* 5. Emotional Invitation Message */}
        <InvitationMessage />

        {/* 7. Interactive Scratch-to-Reveal Date */}
        <ScratchReveal onRevealed={handleDateRevealed} />

        {/* 8. Live Wedding Countdown */}
        <Countdown />

        {/* 9. Cinematic Couple Story & Full-width Section */}
        <PhotoSection />

        {/* 10. Wedding & Venue Details with Google Maps Button */}
        <VenueSection />

        {/* 11. Emotional Closing Footer */}
        <Footer />
      </main>
    </div>
  );
}
