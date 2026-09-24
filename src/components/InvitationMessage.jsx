import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';

export default function InvitationMessage() {
  return (
    <section className="section-container" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card floral-corner-frame content-narrow"
        style={{
          padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3.5rem)',
          position: 'relative',
          border: '1px solid var(--border-gold)',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        {/* 4 Corner Ornaments */}
        <div className="corner-ornament corner-tl" />
        <div className="corner-ornament corner-tr" />
        <div className="corner-ornament corner-bl" />
        <div className="corner-ornament corner-br" />

        <p className="sub-title-tag">With Sincere Joy</p>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 4.5vw, 2.35rem)',
            color: 'var(--dark)',
            marginBottom: '1.25rem',
            lineHeight: 1.3
          }}
        >
          You Are Cordially Invited
        </h2>

        <div className="ornamental-divider">
          <span className="divider-line" />
          <span className="divider-icon" />
          <span className="divider-line" />
        </div>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.15rem, 3.2vw, 1.45rem)',
            lineHeight: 1.8,
            color: 'var(--soft-brown)',
            fontStyle: 'italic',
            margin: '1.5rem auto 1rem auto',
            maxWidth: '680px'
          }}
        >
          "{weddingData.invitationMessage}"
        </p>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem',
            lineHeight: 1.7,
            color: 'var(--muted)',
            marginTop: '1.25rem'
          }}
        >
          {weddingData.invitationSubMessage}
        </p>
      </motion.div>
    </section>
  );
}
