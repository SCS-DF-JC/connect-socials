import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function CountdownTimer({ planName, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const storageKey = `countdown_${planName}`;
    const stored = localStorage.getItem(storageKey);
    
    let endTime;
    if (stored) {
      endTime = parseInt(stored, 10);
    } else {
      endTime = Date.now() + (60 * 60 * 1000); // 1 hour from now
      localStorage.setItem(storageKey, endTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const remaining = endTime - now;

      if (remaining <= 0) {
        setIsExpired(true);
        setTimeLeft({ minutes: 0, seconds: 0 });
        if (onExpire) onExpire();
        return;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeLeft({ minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [planName, onExpire]);

  if (isExpired) {
    return (
      <div className="text-center text-sm text-gray-500 mt-3">
        Offer expired
      </div>
    );
  }

  if (!timeLeft) return null;

  return (
    <div className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold">
      <Clock className="w-4 h-4 text-red-600 animate-pulse" />
      <span className="text-red-600">
        Offer expires in:{" "}
        <span className="font-mono text-lg">
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </span>
    </div>
  );
}