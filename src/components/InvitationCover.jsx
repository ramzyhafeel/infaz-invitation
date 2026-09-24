import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';

export default function InvitationCover({ isOpen, onOpen }) {
  if (isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(8px)',
        transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        backgroundColor: 'var(--ivory)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
        minHeight: '100svh',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label="Tap to open wedding invitation"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      {/* Background Decorative Paper Tint & Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 45%, #fffdf8 0%, #f4ecdc 70%, #eadfc9 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Floating Gold Glow Particle Effect */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234, 216, 176, 0.45) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Luxury Invitation Card Enclosure */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px',
          minHeight: 'clamp(540px, 82vh, 680px)',
          background: 'rgba(255, 253, 248, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 20px 60px rgba(41, 36, 31, 0.12), 0 2px 10px rgba(196, 154, 74, 0.15)',
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        {/* Inner Gold Foil Filigree Border */}
        <div
          style={{
            position: 'absolute',
            inset: '12px',
            border: '1px solid var(--champagne)',
            pointerEvents: 'none'
          }}
        />

        {/* 4 Corner Ornaments */}
        <div className="corner-ornament corner-tl" />
        <div className="corner-ornament corner-tr" />
        <div className="corner-ornament corner-bl" />
        <div className="corner-ornament corner-br" />

        {/* TOP SECTION: Monogram & Sub-header */}
        <div style={{ marginTop: '0.5rem', width: '100%' }}>
          {/* Circular Gold Monogram Emblem */}
          <div
            style={{
              width: '84px',
              height: '84px',
              margin: '0 auto 1.25rem auto',
              borderRadius: '50%',
              border: '1px solid var(--gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: 'radial-gradient(circle, #fffdf8 30%, #f7edd7 100%)',
              boxShadow: '0 4px 16px rgba(196, 154, 74, 0.2)'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '4px',
                borderRadius: '50%',
                border: '1px dashed var(--champagne)'
              }}
            />
            <span
              className="gold-shimmer"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                fontWeight: 600,
                letterSpacing: '0.1em'
              }}
            >
              {weddingData.initials}
            </span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--soft-brown)',
              marginBottom: '0.25rem'
            }}
          >
            Together with their families
          </p>
        </div>

        {/* MIDDLE SECTION: Couple Names & Invitation Line */}
        <div style={{ padding: '0.5rem 0', width: '100%' }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.9rem, 6vw, 2.5rem)',
              lineHeight: 1.2,
              fontWeight: 500,
              color: 'var(--dark)',
              marginBottom: '0.25rem'
            }}
          >
            {weddingData.groom}
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(2.2rem, 7vw, 2.9rem)',
              color: 'var(--gold)',
              margin: '-0.2rem 0',
              lineHeight: 1
            }}
          >
            &
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.9rem, 6vw, 2.5rem)',
              lineHeight: 1.2,
              fontWeight: 500,
              color: 'var(--dark)',
              marginTop: '0.25rem'
            }}
          >
            {weddingData.bride}
          </h1>

          <div className="ornamental-divider" style={{ margin: '1.25rem auto' }}>
            <span className="divider-line" />
            <span className="divider-icon" />
            <span className="divider-line" />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.08rem',
              fontStyle: 'italic',
              color: 'var(--soft-brown)',
              lineHeight: 1.45
            }}
          >
            invite you to celebrate their wedding
          </p>
        </div>

        {/* BOTTOM SECTION: Tap to Open Indicator */}
        <div style={{ marginBottom: '0.5rem', width: '100%' }}>
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              boxShadow: [
                '0 4px 16px rgba(196, 154, 74, 0.2)',
                '0 8px 24px rgba(196, 154, 74, 0.38)',
                '0 4px 16px rgba(196, 154, 74, 0.2)'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.8,
              ease: 'easeInOut'
            }}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.85rem 2.2rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #fffdf8 0%, #faecd5 100%)',
              border: '1px solid var(--gold)',
              cursor: 'pointer'
            }}
          >
            <span
              className="gold-shimmer"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase'
              }}
            >
              Tap to Open
            </span>
          </motion.div>

          <p
            style={{
              marginTop: '0.8rem',
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              color: 'var(--muted)',
              textTransform: 'uppercase'
            }}
          >
            {weddingData.displayDate} • {weddingData.venue}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
