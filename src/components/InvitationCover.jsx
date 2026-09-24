import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';

export default function InvitationCover({ isOpening, onOpen }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        minHeight: '100svh',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        pointerEvents: isOpening ? 'none' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)'
      }}
      onClick={!isOpening ? onOpen : undefined}
      role="button"
      tabIndex={0}
      aria-label="Tap to open wedding invitation"
      onKeyDown={(e) => {
        if (!isOpening && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      {/* LEFT ROYAL GATE PANEL */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: isOpening ? '-100%' : '0%' }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '50.2%',
          background: 'linear-gradient(135deg, #fffdf8 0%, #f4ecdc 85%, #eadfc9 100%)',
          borderRight: '1px solid var(--gold)',
          boxShadow: '8px 0 30px rgba(41, 36, 31, 0.12)',
          zIndex: 1
        }}
      >
        {/* Subtle decorative vertical gold border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: '12px',
            width: '1px',
            borderRight: '1px dashed rgba(196, 154, 74, 0.45)'
          }}
        />
      </motion.div>

      {/* RIGHT ROYAL GATE PANEL */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: isOpening ? '100%' : '0%' }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '50.2%',
          background: 'linear-gradient(225deg, #fffdf8 0%, #f4ecdc 85%, #eadfc9 100%)',
          borderLeft: '1px solid var(--gold)',
          boxShadow: '-8px 0 30px rgba(41, 36, 31, 0.12)',
          zIndex: 1
        }}
      >
        {/* Subtle decorative vertical gold border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '12px',
            width: '1px',
            borderLeft: '1px dashed rgba(196, 154, 74, 0.45)'
          }}
        />
      </motion.div>

      {/* GOLDEN LIGHT SWEEP FLARE (Sweeps across screen upon opening) */}
      {isOpening && (
        <motion.div
          initial={{ opacity: 0, x: '-80%' }}
          animate={{ opacity: [0, 0.85, 0], x: '180%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-20%',
            bottom: '-20%',
            width: '60%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 241, 184, 0.65) 50%, transparent 100%)',
            transform: 'skewX(-25deg)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* CENTRAL LUXURY INVITATION CARD */}
      <motion.div
        initial={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
        animate={{
          scale: isOpening ? 1.07 : 1,
          opacity: isOpening ? 0 : 1,
          y: isOpening ? -24 : 0,
          filter: isOpening ? 'blur(8px)' : 'blur(0px)'
        }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '480px',
          minHeight: 'clamp(540px, 82vh, 680px)',
          background: 'rgba(255, 253, 248, 0.96)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 20px 60px rgba(41, 36, 31, 0.12), 0 2px 10px rgba(196, 154, 74, 0.15)',
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          cursor: isOpening ? 'default' : 'pointer'
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
            animate={
              isOpening
                ? {
                    scale: 1.2,
                    boxShadow: '0 0 45px rgba(212, 175, 95, 0.9)',
                    borderColor: 'var(--deep-gold)'
                  }
                : {
                    scale: [1, 1.04, 1],
                    boxShadow: [
                      '0 4px 16px rgba(196, 154, 74, 0.2)',
                      '0 8px 24px rgba(196, 154, 74, 0.38)',
                      '0 4px 16px rgba(196, 154, 74, 0.2)'
                    ]
                  }
            }
            transition={
              isOpening
                ? { duration: 0.5, ease: 'easeOut' }
                : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
            }
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.85rem 2.2rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #fffdf8 0%, #faecd5 100%)',
              border: '1px solid var(--gold)',
              cursor: isOpening ? 'default' : 'pointer'
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
              {isOpening ? 'Opening...' : 'Tap to Open'}
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
    </div>
  );
}
