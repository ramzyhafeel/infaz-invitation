import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { weddingData } from '../data/weddingData';

export default function Countdown() {
  const { days, hours, minutes, seconds, completed } = useCountdown(weddingData.date);

  const timeUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds }
  ];

  return (
    <section className="section-container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="content-narrow">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sub-title-tag"
        >
          Counting Down The Moments
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.85rem, 5vw, 2.5rem)',
            color: 'var(--dark)',
            marginBottom: '2rem'
          }}
        >
          Until We Say "I Do"
        </motion.h2>

        {completed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
            style={{
              padding: '2.5rem 1.5rem',
              maxWidth: '540px',
              margin: '0 auto',
              border: '1px solid var(--gold)'
            }}
          >
            <p
              className="gold-shimmer"
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '2.6rem',
                marginBottom: '0.5rem'
              }}
            >
              Our beautiful journey has begun
            </p>
            <p style={{ color: 'var(--soft-brown)', fontStyle: 'italic' }}>
              Thank you for being part of our special celebration.
            </p>
          </motion.div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 'clamp(0.5rem, 2vw, 1.25rem)',
              maxWidth: '640px',
              margin: '0 auto'
            }}
          >
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass-card"
                style={{
                  padding: 'clamp(1.2rem, 3.5vw, 1.8rem) clamp(0.4rem, 1.5vw, 1rem)',
                  textAlign: 'center',
                  border: '1px solid var(--border-gold)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Subtle top gold accent bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '15%',
                    right: '15%',
                    height: '2px',
                    background: 'var(--gold-gradient)'
                  }}
                />

                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.8rem, 5.5vw, 2.75rem)',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    color: 'var(--dark)'
                  }}
                >
                  {String(unit.value).padStart(2, '0')}
                </span>

                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.62rem, 1.8vw, 0.75rem)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--deep-gold)',
                    marginTop: '0.5rem',
                    fontWeight: 600
                  }}
                >
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
