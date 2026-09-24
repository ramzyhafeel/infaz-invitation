import React, { useState, useEffect, useRef } from 'react';
import { VolumeX, Music } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function MusicPlayer({ shouldPlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Attempt playback when invitation opens
  useEffect(() => {
    if (shouldPlay && audioRef.current && !isPlaying) {
      const audio = audioRef.current;
      audio.volume = 0;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            // Smooth fade-in to comfortable volume (0.38)
            let vol = 0;
            const fadeInInterval = setInterval(() => {
              vol += 0.04;
              if (vol >= 0.38) {
                audio.volume = 0.38;
                clearInterval(fadeInInterval);
              } else {
                audio.volume = vol;
              }
            }, 120);
          })
          .catch((err) => {
            console.log('Audio autoplay handled:', err);
            setIsPlaying(false);
          });
      }
    }
  }, [shouldPlay, isPlaying]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !isMuted) {
      // Mute
      audio.muted = true;
      setIsMuted(true);
    } else if (isPlaying && isMuted) {
      // Unmute
      audio.muted = false;
      setIsMuted(false);
    } else {
      // Start playing if stopped
      audio.volume = 0.38;
      audio.muted = false;
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((e) => console.log('Playback error:', e));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingData.music}
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      {/* Floating Audio Button */}
      <button
        onClick={togglePlayback}
        className={`music-floating-btn ${isPlaying && !isMuted ? 'is-playing' : ''}`}
        aria-label={isPlaying && !isMuted ? "Mute background music" : "Play background music"}
        title={isPlaying && !isMuted ? "Mute music" : "Play music"}
        style={{
          position: 'fixed',
          bottom: 'calc(1.25rem + var(--safe-bottom))',
          right: '1.25rem',
          zIndex: 8000,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 253, 248, 0.92)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid var(--gold)',
          boxShadow: '0 4px 18px rgba(196, 154, 74, 0.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--deep-gold)',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          cursor: 'pointer'
        }}
      >
        {isPlaying && !isMuted ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Music size={19} className="animate-spin-slow" />
          </div>
        ) : (
          <VolumeX size={19} style={{ opacity: 0.65 }} />
        )}
      </button>
    </>
  );
}
