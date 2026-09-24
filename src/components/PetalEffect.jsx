import React, { useState, useEffect } from 'react';

export default function PetalEffect({ active }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const timer = setTimeout(() => {
      // Generate ~30 romantic petals and golden particles
      const count = 30;
      const newParticles = [];
      const types = ['petal', 'gold', 'blossom'];

      for (let i = 0; i < count; i++) {
        const type = types[i % types.length];
        const startX = 50 + (Math.random() * 40 - 20); // Center around 50% vw
        const driftX = (Math.random() - 0.5) * 220; // Drift sideways in px
        const duration = 2.6 + Math.random() * 1.2; // 2.6 - 3.8s
        const delay = Math.random() * 0.4;
        const size = type === 'petal' ? (16 + Math.random() * 12) : (type === 'gold' ? (6 + Math.random() * 6) : (14 + Math.random() * 8));
        const rotation = (Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1));

        newParticles.push({
          id: i,
          type,
          startX,
          driftX,
          duration,
          delay,
          size,
          rotation
        });
      }

      setParticles(newParticles);
    }, 10);

    // Auto cleanup DOM after 4 seconds
    const cleanupTimer = setTimeout(() => {
      setParticles([]);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
    };
  }, [active]);

  if (particles.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9500,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {particles.map((p) => {
        let content = null;
        if (p.type === 'petal') {
          content = (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size * 1.3}px`,
                borderRadius: '50% 0 50% 50%',
                background: 'linear-gradient(135deg, #e8a7b0 0%, #cf7887 100%)',
                boxShadow: '0 2px 8px rgba(180, 110, 125, 0.3)'
              }}
            />
          );
        } else if (p.type === 'gold') {
          content = (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #fff1b8 0%, #c49a4a 100%)',
                boxShadow: '0 0 10px rgba(196, 154, 74, 0.6)'
              }}
            />
          );
        } else {
          content = (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: '50% 50% 0 50%',
                background: 'linear-gradient(45deg, #f5df9b 0%, #e28e9b 100%)',
                opacity: 0.9
              }}
            />
          );
        }

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              top: '35%',
              left: `${p.startX}%`,
              animation: `petalDrift ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              animationDelay: `${p.delay}s`,
              '--drift-x': `${p.driftX}px`,
              '--rot-z': `${p.rotation}deg`
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
