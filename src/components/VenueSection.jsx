import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Calendar, Clock } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function VenueSection() {
  return (
    <section className="section-container" style={{ paddingTop: '2rem', paddingBottom: '4.5rem' }}>
      <div className="content-narrow">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sub-title-tag"
        >
          Ceremony & Reception
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.9rem, 5vw, 2.7rem)',
            color: 'var(--dark)',
            marginBottom: '0.75rem'
          }}
        >
          The Wedding Celebration
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: '0.9rem',
            color: 'var(--muted)',
            marginBottom: '2.5rem'
          }}
        >
          We invite you to join us on this auspicious occasion
        </motion.p>

        {/* Premium Venue Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="glass-card floral-corner-frame"
          style={{
            maxWidth: '620px',
            margin: '0 auto',
            padding: 'clamp(2rem, 5vw, 3.25rem) clamp(1.25rem, 4vw, 2.5rem)',
            border: '1px solid var(--border-gold)',
            boxShadow: 'var(--shadow-card)',
            textAlign: 'center'
          }}
        >
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />

          {/* Location Badge Icon */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              margin: '0 auto 1.25rem auto',
              backgroundColor: '#fffdf8',
              border: '1px solid var(--gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--deep-gold)',
              boxShadow: '0 4px 16px rgba(196, 154, 74, 0.2)'
            }}
          >
            <MapPin size={26} />
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4.5vw, 2.3rem)',
              color: 'var(--dark)',
              marginBottom: '0.5rem',
              fontWeight: 600
            }}
          >
            {weddingData.venue}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              color: 'var(--soft-brown)',
              marginBottom: '1.5rem'
            }}
          >
            {weddingData.address}
          </p>

          <div className="ornamental-divider">
            <span className="divider-line" />
            <span className="divider-icon" />
            <span className="divider-line" />
          </div>

          {/* Date & Time Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              margin: '1.5rem 0 2rem 0',
              padding: '1.25rem 0.5rem',
              borderTop: '1px dashed var(--champagne)',
              borderBottom: '1px dashed var(--champagne)'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  color: 'var(--deep-gold)',
                  marginBottom: '0.25rem'
                }}
              >
                <Calendar size={15} />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 600
                  }}
                >
                  Date
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  color: 'var(--dark)',
                  fontWeight: 500
                }}
              >
                {weddingData.displayDate}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                {weddingData.displayDay}
              </p>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  color: 'var(--deep-gold)',
                  marginBottom: '0.25rem'
                }}
              >
                <Clock size={15} />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 600
                  }}
                >
                  Time
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  color: 'var(--dark)',
                  fontWeight: 500
                }}
              >
                {weddingData.time}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                Sri Lanka Time
              </p>
            </div>
          </div>

          {/* Premium Google Maps Action Button */}
          <div style={{ marginTop: '0.5rem' }}>
            <a
              href={weddingData.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              aria-label="Open wedding venue location in Google Maps"
            >
              <Navigation size={17} color="var(--deep-gold)" />
              <span>Open in Google Maps</span>
              <ExternalLink size={14} style={{ opacity: 0.65 }} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
