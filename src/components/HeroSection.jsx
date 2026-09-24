import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';

export default function HeroSection({ isOpened }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure muted for reliable autoplay on mobile browsers
      video.muted = true;
      video.defaultMuted = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Video autoplay prevented or pending gesture:', err);
        });
      }
    }
  }, [isOpened]);

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
        padding: '0'
      }}
    >
      {/* Ambient background glow for larger displays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(234, 216, 176, 0.3) 0%, var(--ivory) 75%)',
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
          boxShadow: '0 12px 40px rgba(41, 36, 31, 0.08)'
        }}
      >
        {/* Animated Hero Video (Mobile-first 9:16) */}
        <video
          ref={videoRef}
          src={weddingData.heroVideo}
          poster={weddingData.heroPoster}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block'
          }}
        />

        {/* Soft bottom gradient to smoothly bridge into the next invitation message section */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '90px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(250, 247, 240, 0.85) 75%, var(--ivory) 100%)',
            pointerEvents: 'none'
          }}
        />
      </motion.div>
    </header>
  );
}
