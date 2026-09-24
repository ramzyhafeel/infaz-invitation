import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, SkipForward } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function HeroSection({ isOpened }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef([]);

  const videos = weddingData.heroVideos || [
    { id: 1, src: '/video/hero-1.mp4', poster: '/video/hero-frame.jpg' },
    { id: 2, src: '/video/hero-2.mp4', poster: '/video/hero-2-frame.jpg' },
    { id: 3, src: '/video/hero-3.mp4', poster: '/video/hero-3-frame.jpg' }
  ];

  // Smoothly scroll down to the next section
  const scrollToNextSection = useCallback(() => {
    const nextElem = document.getElementById('invitation-message');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Handle switching to next video or auto-scrolling if all videos ended
  const handleNextVideo = useCallback(() => {
    if (currentIndex < videos.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setProgress(0);

      // Play next video immediately
      const nextVideo = videoRefs.current[nextIdx];
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch((err) => console.log('Video play handled:', err));
      }
    } else {
      // Finished hero-3! Auto scroll down smoothly
      scrollToNextSection();
    }
  }, [currentIndex, videos.length, scrollToNextSection]);

  // Handle video ended event
  const onVideoEnded = (idx) => {
    if (idx === currentIndex) {
      handleNextVideo();
    }
  };

  // Track playback time for the current video progress bar
  const onTimeUpdate = (idx) => {
    if (idx === currentIndex) {
      const vid = videoRefs.current[idx];
      if (vid && vid.duration) {
        setProgress((vid.currentTime / vid.duration) * 100);
      }
    }
  };

  // Start playback when opened
  useEffect(() => {
    if (isOpened) {
      const currentVid = videoRefs.current[currentIndex];
      if (currentVid) {
        currentVid.muted = true;
        currentVid.defaultMuted = true;
        currentVid.play().catch((err) => console.log('Autoplay handled:', err));
      }
    }
  }, [isOpened, currentIndex]);

  return (
    <header
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--ivory)',
        overflow: 'hidden',
        padding: 0
      }}
    >
      {/* Background ambient lighting for wide screens */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(234, 216, 176, 0.35) 0%, var(--ivory) 80%)',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          height: '100svh',
          maxHeight: '940px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#fffdf8',
          boxShadow: '0 16px 45px rgba(41, 36, 31, 0.1)'
        }}
      >
        {/* STORY-STYLE TOP PROGRESS BARS */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(0.75rem + var(--safe-top))',
            left: '1rem',
            right: '1rem',
            zIndex: 10,
            display: 'flex',
            gap: '6px'
          }}
        >
          {videos.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setProgress(0);
                const vid = videoRefs.current[i];
                if (vid) {
                  vid.currentTime = 0;
                  vid.play().catch(() => {});
                }
              }}
              style={{
                flex: 1,
                height: '3px',
                borderRadius: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(4px)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundColor: '#c49a4a',
                  width:
                    i < currentIndex
                      ? '100%'
                      : i === currentIndex
                      ? `${progress}%`
                      : '0%',
                  transition: i === currentIndex ? 'width 0.15s linear' : 'none',
                  boxShadow: '0 0 8px rgba(196, 154, 74, 0.8)'
                }}
              />
            </div>
          ))}
        </div>

        {/* DISCREET SKIP BUTTON */}
        <button
          onClick={handleNextVideo}
          aria-label={currentIndex < videos.length - 1 ? 'Next video' : 'Scroll down'}
          style={{
            position: 'absolute',
            top: 'calc(2.2rem + var(--safe-top))',
            right: '1rem',
            zIndex: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(28, 22, 17, 0.45)',
            backdropFilter: 'blur(8px)',
            color: 'var(--champagne)',
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            border: '1px solid rgba(234, 216, 176, 0.3)',
            cursor: 'pointer'
          }}
        >
          <span>{currentIndex < videos.length - 1 ? 'Next' : 'Skip'}</span>
          {currentIndex < videos.length - 1 ? (
            <SkipForward size={11} />
          ) : (
            <ChevronDown size={12} />
          )}
        </button>

        {/* STACKED VIDEOS WITH SEAMLESS CROSS-FADE */}
        {videos.map((vid, idx) => {
          const isActive = idx === currentIndex;
          return (
            <video
              key={vid.id || idx}
              ref={(el) => (videoRefs.current[idx] = el)}
              src={vid.src}
              poster={vid.poster}
              autoPlay={idx === 0}
              muted
              playsInline
              webkit-playsinline="true"
              preload="auto"
              onEnded={() => onVideoEnded(idx)}
              onTimeUpdate={() => onTimeUpdate(idx)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1,
                pointerEvents: isActive ? 'auto' : 'none',
                transition: 'opacity 0.45s ease-in-out'
              }}
            />
          );
        })}

        {/* Soft bottom gradient to smoothly bridge into the next invitation message section */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(250, 247, 240, 0.85) 75%, var(--ivory) 100%)',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        />
      </motion.div>
    </header>
  );
}
