import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';

export default function HeroSection() {
  return (
    <header
      style={{
        position: 'relative',
        minHeight: '92svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(3rem, 8vw, 5rem) var(--section-pad-x)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Warm Aura */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(90vw, 500px)',
          height: 'min(90vw, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234, 216, 176, 0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}
      >
        {/* Monogram Crest */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            border: '1px solid var(--gold)',
            marginBottom: '1.25rem',
            background: 'rgba(255, 253, 248, 0.8)'
          }}
        >
          <span
            className="gold-shimmer"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontWeight: 600,
              letterSpacing: '0.12em'
            }}
          >
            {weddingData.initials}
          </span>
        </div>

        <p
          className="sub-title-tag"
          style={{ marginBottom: '1rem' }}
        >
          The Wedding Celebration Of
        </p>

        {/* Main Groom & Bride Names */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 7vw, 4.2rem)',
            lineHeight: 1.15,
            fontWeight: 500,
            color: 'var(--dark)'
          }}
        >
          {weddingData.groom}
        </h1>

        <div
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(3rem, 9vw, 5rem)',
            color: 'var(--gold)',
            margin: '-0.35rem 0',
            lineHeight: 1
          }}
        >
          &
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 7vw, 4.2rem)',
            lineHeight: 1.15,
            fontWeight: 500,
            color: 'var(--dark)'
          }}
        >
          {weddingData.bride}
        </h1>

        {/* Delicate Ornamental Line */}
        <div className="ornamental-divider" style={{ margin: '1.75rem auto' }}>
          <span className="divider-line" />
          <span className="divider-icon" />
          <span className="divider-line" />
        </div>

        {/* Date and Venue summary */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.15rem, 3.5vw, 1.45rem)',
            color: 'var(--deep-gold)',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem',
            textTransform: 'uppercase'
          }}
        >
          {weddingData.displayDate}
        </p>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            letterSpacing: '0.18em',
            color: 'var(--muted)',
            textTransform: 'uppercase'
          }}
        >
          {weddingData.time} • {weddingData.venue}
        </p>
      </motion.div>
    </header>
  );
}
