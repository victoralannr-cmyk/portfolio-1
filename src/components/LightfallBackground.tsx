import React, { useMemo } from 'react';

interface LightfallBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function LightfallBackground({ children, className = '', id }: LightfallBackgroundProps) {
  // Generate configuration for 18 elegant light strands
  const beams = useMemo(() => {
    return Array.from({ length: 18 }).map((_, idx) => {
      const left = Math.random() * 100; // positions randomly across width
      const duration = 7 + Math.random() * 9; // speed profiles (7s to 16s)
      const delay = Math.random() * -15; // staggered birthtimes
      const scaleY = 0.5 + Math.random() * 0.9; // random height variations
      const opacity = 0.08 + Math.random() * 0.25; // darker ambient brightness
      const width = Math.random() > 0.75 ? '1.5px' : '1px'; // realistic thin fiber widths
      
      // Warm golden, deep indigo/purple & magenta highlights
      const accent = idx % 3 === 0 
        ? 'rgba(212, 168, 67, 0.45)' 
        : idx % 3 === 1 
          ? 'rgba(139, 92, 246, 0.35)' 
          : 'rgba(236, 72, 153, 0.3)';
          
      return { left, duration, delay, scaleY, opacity, width, accent };
    });
  }, []);

  return (
    <div className={`lightfall-container isolate ${className}`} id={id}>
      {/* Absolute dark base backing */}
      <div className="absolute inset-0 bg-brand-black -z-20 pointer-events-none" />

      {/* Decorative colored glow backdrops */}
      <div className="absolute top-[20%] left-[-15%] w-[55%] h-[40%] bg-brand-purple/6 rounded-full blur-[130px] -z-15 pointer-events-none animate-pulse duration-[11000ms]" />
      <div className="absolute bottom-[10%] right-[-15%] w-[50%] h-[50%] bg-brand-gold/3 rounded-full blur-[150px] -z-15 pointer-events-none animate-pulse duration-[14000ms]" />

      {/* Animated Light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {beams.map((beam, idx) => (
          <div
            key={idx}
            className="lightfall-beam"
            style={{
              left: `${beam.left}%`,
              width: beam.width,
              opacity: beam.opacity,
              animationDuration: `${beam.duration}s`,
              animationDelay: `${beam.delay}s`,
              transform: `scaleY(${beam.scaleY})`,
              background: `linear-gradient(to bottom, transparent, ${beam.accent} 25%, rgba(139, 92, 246, 0.5) 60%, transparent)`
            }}
          />
        ))}
      </div>

      {/* Seamless transition overlays to blend with #1A0A2E (bg-brand-black) */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-brand-black to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-black to-transparent pointer-events-none z-0" />

      {/* Embedded section or page content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
