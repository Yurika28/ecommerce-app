'use client'
import { useEffect, useState } from "react";

const getTimeLeft = (targetTimestamp: number) => {
  const now = Date.now();
  const difference = targetTimestamp - now;

  if (difference <= 0) return [0, 0, 0, 0];

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return [days, hours, minutes, seconds];
};

export const useCountdown = (targetTimestamp: number) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetTimestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetTimestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return timeLeft;
};
