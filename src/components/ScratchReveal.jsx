import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function ScratchReveal({ onRevealed }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);
  const lastPoint = useRef(null);
  const sampleCounter = useRef(0);
  const hasTriggered = useRef(false);

  // Initialize canvas surface
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // High DPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.scale(dpr, dpr);

    // Luxury Champagne Gold Foil Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#d9be85');
    gradient.addColorStop(0.3, '#f5e8c4');
    gradient.addColorStop(0.6, '#caa458');
    gradient.addColorStop(1, '#b78a3f');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle inner border on the scratch cover
    ctx.strokeStyle = '#fff1b8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Scratch Prompt Text on canvas
    ctx.fillStyle = '#4a3b2c';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Subtitle
    ctx.font = '600 11px Montserrat, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('A SACRED MOMENT AWAITS', width / 2, height / 2 - 28);

    // Main scratch call to action
    ctx.font = '500 22px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#29241f';
    ctx.fillText('✦ Scratch to Reveal Date ✦', width / 2, height / 2 + 6);

    // Touch hint
    ctx.font = '400 10px Montserrat, sans-serif';
    ctx.fillStyle = '#614d3a';
    ctx.fillText('Use your finger or cursor to scratch', width / 2, height / 2 + 34);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  // Calculate percentage of canvas cleared using efficient grid sampling
  const calculateScratchedArea = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Sample a 24x16 grid across canvas
    const sampleCols = 24;
    const sampleRows = 16;
    let transparentCount = 0;
    const totalPoints = sampleCols * sampleRows;

    const stepX = canvas.width / sampleCols;
    const stepY = canvas.height / sampleRows;

    for (let r = 0; r < sampleRows; r++) {
      for (let c = 0; c < sampleCols; c++) {
        const x = Math.floor(c * stepX + stepX / 2);
        const y = Math.floor(r * stepY + stepY / 2);
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        // If alpha is almost 0
        if (pixel[3] < 40) {
          transparentCount++;
        }
      }
    }

    return (transparentCount / totalPoints) * 100;
  };

  const completeReveal = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setIsRevealed(true);
    if (onRevealed) {
      onRevealed();
    }
  }, [onRevealed]);

  const scratch = (currentX, currentY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 36 * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x * dpr, lastPoint.current.y * dpr);
      ctx.lineTo(currentX * dpr, currentY * dpr);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(currentX * dpr, currentY * dpr, 20 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPoint.current = { x: currentX, y: currentY };
  };

  const handlePointerDown = (e) => {
    if (isRevealed) return;
    isDrawing.current = true;
    e.target.setPointerCapture?.(e.pointerId);
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPoint.current = { x, y };

    scratch(x, y);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing.current || isRevealed) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    scratch(x, y);

    // Throttle calculation
    sampleCounter.current += 1;
    if (sampleCounter.current % 6 === 0) {
      const percent = calculateScratchedArea();
      if (percent >= 45 && !hasTriggered.current) {
        completeReveal();
      }
    }
  };

  const handlePointerUp = (e) => {
    isDrawing.current = false;
    lastPoint.current = null;
    try {
      e.target.releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignored for environments without pointer capture
    }
  };

  return (
    <section className="section-container" style={{ paddingBottom: '3.5rem' }}>
      <div className="content-narrow">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sub-title-tag"
        >
          Interactive Save The Date
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
          A Special Date Awaits
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: '0.9rem',
            color: 'var(--muted)',
            marginBottom: '2rem'
          }}
        >
          {isRevealed
            ? "✦ The special date has been revealed! ✦"
            : "Scratch below with your finger or mouse to unveil the wedding date"}
        </motion.p>

        {/* Scratch Card Card Box */}
        <div
          ref={containerRef}
          className="glass-card floral-corner-frame"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '520px',
            minHeight: '260px',
            margin: '0 auto',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--border-gold)',
            boxShadow: isRevealed
              ? '0 12px 40px rgba(196, 154, 74, 0.3)'
              : 'var(--shadow-card)',
            transition: 'box-shadow 0.8s ease'
          }}
        >
          {/* UNDERLYING CONTENT (Revealed Wedding Date) */}
          <div
            style={{
              padding: 'clamp(2rem, 5vw, 2.75rem) 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              backgroundColor: '#fffdf8',
              minHeight: '260px'
            }}
          >
            <div className="corner-ornament corner-tl" />
            <div className="corner-ornament corner-tr" />
            <div className="corner-ornament corner-bl" />
            <div className="corner-ornament corner-br" />

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--deep-gold)',
                marginBottom: '0.75rem'
              }}
            >
              <Calendar size={18} />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}
              >
                Wedding Date
              </span>
            </div>

            {/* Revealed Date in Premium Serif */}
            <h3
              className={isRevealed ? "gold-shimmer" : ""}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 6.5vw, 3.1rem)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                lineHeight: 1.15,
                color: 'var(--dark)',
                marginBottom: '0.35rem'
              }}
            >
              {weddingData.displayDate.toUpperCase()}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: 'var(--soft-brown)',
                letterSpacing: '0.12em',
                marginBottom: '0.75rem',
                textTransform: 'uppercase'
              }}
            >
              {weddingData.displayDay}
            </p>

            <div className="ornamental-divider" style={{ margin: '0.5rem auto' }}>
              <span className="divider-line" />
              <span className="divider-icon" />
              <span className="divider-line" />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                marginTop: '0.75rem',
                flexWrap: 'wrap'
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'var(--dark)',
                  fontWeight: 500
                }}
              >
                <Clock size={15} color="var(--gold)" />
                {weddingData.time}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'var(--dark)',
                  fontWeight: 500
                }}
              >
                <MapPin size={15} color="var(--gold)" />
                {weddingData.venue}
              </span>
            </div>
          </div>

          {/* SCRATCH CANVAS OVERLAY */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                touchAction: 'none',
                cursor: 'grab',
                zIndex: 10,
                transition: 'opacity 0.65s ease'
              }}
              aria-label="Scratch card canvas to reveal date"
            />
          )}
        </div>

        {/* Fallback button for accessibility */}
        {!isRevealed && (
          <div style={{ marginTop: '1.25rem' }}>
            <button
              onClick={completeReveal}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--deep-gold)',
                textDecoration: 'underline',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                opacity: 0.85
              }}
            >
              Can't scratch? Tap here to reveal date
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
