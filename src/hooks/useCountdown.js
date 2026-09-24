import { useState, useEffect } from 'react';

/**
 * Custom hook for wedding countdown timer
 * Computes remaining time until target date with precise millisecond delta.
 * 
 * @param {string|Date} targetDateIso - ISO date string with timezone e.g. "2027-04-25T13:00:00+05:30"
 * @returns {object} { days, hours, minutes, seconds, completed }
 */
export function useCountdown(targetDateIso) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDateIso));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeLeft(targetDateIso);
      setTimeLeft(remaining);
      if (remaining.completed) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateIso]);

  return timeLeft;
}

function calculateTimeLeft(targetDateIso) {
  const targetTime = new Date(targetDateIso).getTime();
  const now = Date.now();
  const difference = targetTime - now;

  if (isNaN(targetTime)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: false };
  }

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      completed: true
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    completed: false
  };
}
