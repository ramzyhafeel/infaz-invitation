import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(3.5rem, 8vw, 6rem) var(--section-pad-x)',
        textAlign: 'center',
        backgroundColor: '#fffdf8',
        borderTop: '1px solid var(--border-gold)',
        overflow: 'hidden'
      }}
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(90vw, 450px)',
          height: 'min(90vw, 450px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234, 216, 176, 0.3) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }}
      />

      <div className="content-narrow" style={{ position: 'relative', zIndex: 2 }}>
        {/* Monogram */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '1px solid var(--gold)',
            marginBottom: '1.5rem',
            background: 'rgba(255, 253, 248, 0.9)'
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

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.55rem)',
            color: 'var(--dark)',
            fontStyle: 'italic',
            lineHeight: 1.6,
            maxWidth: '560px',
            margin: '0 auto 1.5rem auto'
          }}
        >
          "{weddingData.closingMessage}"
        </motion.p>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '0.5rem'
          }}
        >
          {weddingData.thankYouSignOff}
        </p>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 4.5vw, 2.2rem)',
            fontWeight: 500,
            color: 'var(--dark)',
            marginBottom: '1rem'
          }}
        >
          {weddingData.coupleName}
        </p>

        <div className="ornamental-divider" style={{ margin: '1.25rem auto' }}>
          <span className="divider-line" />
          <Heart size={12} color="var(--gold)" fill="var(--champagne)" />
          <span className="divider-line" />
        </div>

        <p
          className="gold-shimmer"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            letterSpacing: '0.24em',
            marginTop: '0.5rem'
          }}
        >
          {weddingData.footerDate}
        </p>
      </div>
    </footer>
  );
}
