import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const galleryItems = weddingData.gallery || [];

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (selectedIdx === null) return;
    if (e.key === 'Escape') {
      setSelectedIdx(null);
    } else if (e.key === 'ArrowLeft') {
      setSelectedIdx((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
    } else if (e.key === 'ArrowRight') {
      setSelectedIdx((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
    }
  }, [selectedIdx, galleryItems.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (selectedIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, selectedIdx]);

  // Touch swipe support for mobile lightbox
  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      // Swiped left -> Next
      setSelectedIdx((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
    } else if (diff < -50) {
      // Swiped right -> Prev
      setSelectedIdx((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
    }
    setTouchStart(null);
  };

  return (
    <section className="section-container" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="content-narrow">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sub-title-tag"
        >
          Cherished Memories
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.9rem, 5vw, 2.6rem)',
            color: 'var(--dark)',
            marginBottom: '0.75rem'
          }}
        >
          Moments Of Grace
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
          A glimpse into the milestones and warmth that brought us here
        </motion.p>
      </div>

      {/* Responsive Gallery Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(150px, 45vw, 320px), 1fr))',
          gap: 'clamp(0.75rem, 2.5vw, 1.5rem)',
          maxWidth: '1080px',
          margin: '0 auto'
        }}
      >
        {galleryItems.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
            onClick={() => setSelectedIdx(idx)}
            role="button"
            tabIndex={0}
            aria-label={`View photo ${idx + 1}: ${item.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedIdx(idx);
              }
            }}
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              backgroundColor: '#fffdf8',
              border: '1px solid var(--border-gold)',
              boxShadow: 'var(--shadow-subtle)',
              aspectRatio: idx % 3 === 0 ? '4/5' : '1/1'
            }}
          >
            <img
              src={item.url}
              alt={item.title || `Gallery photograph ${idx + 1}`}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />

            {/* Subtle Gradient & Hover Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 60%, rgba(41, 36, 31, 0.6) 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1rem',
                color: '#fffdf8'
              }}
            >
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  {item.title}
                </span>
                <ZoomIn size={16} style={{ opacity: 0.85 }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedIdx(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(25, 21, 18, 0.94)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              userSelect: 'none'
            }}
          >
            {/* Top Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: 'calc(1rem + var(--safe-top))',
                left: 0,
                right: 0,
                padding: '0 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'var(--champagne)',
                zIndex: 10
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em'
                }}
              >
                {selectedIdx + 1} / {galleryItems.length}
              </span>

              <button
                onClick={() => setSelectedIdx(null)}
                aria-label="Close fullscreen gallery"
                style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  border: '1px solid rgba(234, 216, 176, 0.3)',
                  cursor: 'pointer'
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
              }}
              aria-label="Previous photograph"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(234, 216, 176, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Active Image */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '92vw',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <motion.img
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={galleryItems[selectedIdx].url}
                alt={galleryItems[selectedIdx].title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '74vh',
                  objectFit: 'contain',
                  borderRadius: '6px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
                }}
              />

              {/* Title Caption */}
              <div style={{ marginTop: '0.85rem', textAlign: 'center', color: '#fffdf8' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  {galleryItems[selectedIdx].title}
                </p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
              }}
              aria-label="Next photograph"
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(234, 216, 176, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
