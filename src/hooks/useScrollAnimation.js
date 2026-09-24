import { useEffect, useState, useRef } from 'react';

/**
 * Hook for IntersectionObserver to trigger animations once elements enter viewport.
 */
export function useScrollAnimation(options = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.once !== false && elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      }
    }, {
      threshold: options.threshold || 0.15,
      rootMargin: options.rootMargin || '0px 0px -40px 0px',
      ...options
    });

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
}

/**
 * Reusable Framer Motion animation configurations
 */
export const cinematicVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1
    }
  }
};
