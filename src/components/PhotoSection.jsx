import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';

export default function PhotoSection() {
  const photos = weddingData.couplePhotos || [];
  const photo1 = photos[0]?.url || '/images/couple/couple-01.jpg';
  const photo2 = photos[1]?.url || '/images/couple/couple-02.jpg';
  const photo3 = photos[2]?.url || '/images/couple/couple-03.jpg';

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* SECTION 1: ELEGANT FRAMED PORTRAIT */}
      <section className="section-container" style={{ paddingBottom: '2.5rem' }}>
        <div className="content-narrow">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sub-title-tag"
          >
            Our Eternal Journey
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.9rem, 5vw, 2.7rem)',
              color: 'var(--dark)',
              marginBottom: '2rem'
            }}
          >
            Written In The Stars
          </motion.h2>

          {/* Framed Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              maxWidth: '560px',
              margin: '0 auto',
              padding: 'clamp(0.75rem, 2vw, 1.25rem)',
              backgroundColor: '#fffdf8',
              border: '1px solid var(--border-gold)',
              boxShadow: 'var(--shadow-card)',
              borderRadius: '8px'
            }}
          >
            <div className="corner-ornament corner-tl" />
            <div className="corner-ornament corner-tr" />
            <div className="corner-ornament corner-bl" />
            <div className="corner-ornament corner-br" />

            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '125%', // 4:5 elegant portrait ratio
                overflow: 'hidden',
                borderRadius: '4px'
              }}
            >
              <img
                src={photo1}
                alt={`${weddingData.coupleName} Portrait`}
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>

            {photos[0]?.title && (
              <div style={{ padding: '1.25rem 0.5rem 0.5rem 0.5rem', textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--dark)',
                    marginBottom: '0.2rem'
                  }}
                >
                  {photos[0].title}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    color: 'var(--muted)'
                  }}
                >
                  {photos[0].subtitle}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FULL-WIDTH CINEMATIC PHOTO BANNER */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 'clamp(380px, 58vh, 520px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2.5rem 0 4rem 0',
          overflow: 'hidden'
        }}
      >
        <img
          src={photo2}
          alt={`${weddingData.coupleName} Full Width`}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />

        {/* Soft Luxury Cream & Dark Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(250, 247, 240, 0.75) 0%, rgba(41, 36, 31, 0.45) 50%, rgba(250, 247, 240, 0.85) 100%)'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1 }}
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '2rem 1.5rem',
            maxWidth: '680px'
          }}
        >
          <div
            style={{
              display: 'inline-block',
              width: '40px',
              height: '1px',
              backgroundColor: 'var(--champagne)',
              marginBottom: '1rem'
            }}
          />
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
              color: '#fffdf8',
              lineHeight: 1.35,
              fontWeight: 500,
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.45)',
              marginBottom: '0.75rem'
            }}
          >
            {weddingData.storyQuote}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#f5df9b',
              textShadow: '0 1px 8px rgba(0, 0, 0, 0.5)'
            }}
          >
            {weddingData.storySubtitle}
          </p>
        </motion.div>
      </section>

      {/* SECTION 3: ASYMMETRIC OVERLAPPING EDITORIAL SECTION */}
      <section className="section-container" style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            alignItems: 'center',
            maxWidth: '920px',
            margin: '0 auto'
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            style={{
              position: 'relative',
              backgroundColor: '#fffdf8',
              padding: '1rem',
              border: '1px solid var(--border-gold)',
              boxShadow: 'var(--shadow-card)',
              borderRadius: '8px'
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '120%',
                overflow: 'hidden',
                borderRadius: '4px'
              }}
            >
              <img
                src={photo3}
                alt={`${weddingData.coupleName} Story`}
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            style={{ padding: '1rem' }}
          >
            <p className="sub-title-tag">A Union of Hearts</p>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)',
                lineHeight: 1.25,
                color: 'var(--dark)',
                marginBottom: '1rem'
              }}
            >
              {photos[2]?.title || "Blessed by Families"}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                color: 'var(--soft-brown)',
                lineHeight: 1.7,
                marginBottom: '1.25rem'
              }}
            >
              "{photos[2]?.subtitle || "Hand in hand, we step forward into our new life together, grounded in devotion and faith."}"
            </p>
            <div className="ornamental-divider" style={{ margin: '1rem 0' }}>
              <span className="divider-line" />
              <span className="divider-icon" />
              <span className="divider-line" />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--deep-gold)'
              }}
            >
              {weddingData.numericDate} • {weddingData.venue}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
