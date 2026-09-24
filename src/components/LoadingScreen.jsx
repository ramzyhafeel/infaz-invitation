import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ isLoaded }) {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--ivory)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            pointerEvents: 'none'
          }}
        >
          {/* Subtle floral emblem / monogram */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'relative',
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              border: '1px solid var(--gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 20px rgba(196, 154, 74, 0.15)'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '5px',
                borderRadius: '50%',
                border: '1px dashed var(--champagne)'
              }}
            />
            <span
              className="gold-shimmer"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.9rem',
                letterSpacing: '0.15em',
                fontWeight: 500
              }}
            >
              I & H
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.95rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--deep-gold)'
            }}
          >
            The Wedding Celebration
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
