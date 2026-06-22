import React, { useState, useEffect } from 'react';

interface ShuffleTextProps {
  text: string;
  className?: string;
}

export function ShuffleText({ text, className = "" }: ShuffleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "XYZKMWH$#@%&*+-!?0123456789";

  const triggerShuffle = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3; // speed of resolving (takes about 30 iterations for 10 chars)
    }, 45); // pacing is cadenced and visually impressive
  };

  useEffect(() => {
    triggerShuffle();
  }, [text]);

  return (
    <span 
      className={`inline-block font-heading font-extrabold tracking-tight cursor-default ${className}`}
      onMouseEnter={triggerShuffle}
    >
      {displayText}
    </span>
  );
}
