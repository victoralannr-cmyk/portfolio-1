import { useEffect } from 'react';

interface FloatingLogo {
  x: number;
  y: number;
  vx: number; // velocity x
  vy: number; // velocity y
  size: number;
  angle: number;
  spinSpeed: number;
  opacity: number;
  baseY: number; // for wave floating motion
  waveOffset: number;
  waveSpeed: number;
}

export default function BackgroundLogoOrbit() {
  useEffect(() => {
    // 1. Create canvas element dynamically
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100\%;height:100\%;z-index:-1;pointer-events:none;';
    canvas.id = 'orbit-logo-canvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set background of body to verify visibility
    document.body.style.backgroundColor = '#110620';

    // 2. Load the logo image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://i.postimg.cc/yxZC2M0L/3bdb5ef7-e8bf-4277-b955-8d0825e5942e.png';

    let animFrameId: number;
    let logos: FloatingLogo[] = [];
    const LOGO_COUNT = 10; // Number of floating logos on the screen

    // Handle resize and re-populate / adjust coords
    const handleResize = () => {
      const prevWidth = canvas.width;
      const prevHeight = canvas.height;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Initialize logos if not already created, or reposition them proportionally
      if (logos.length === 0) {
        for (let i = 0; i < LOGO_COUNT; i++) {
          const size = 50 + Math.random() * 60; // Sizes between 50px and 110px
          logos.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6, // Slow drifting horizontal speed
            vy: (Math.random() - 0.5) * 0.4, // Slow drifting vertical speed
            size: size,
            angle: Math.random() * Math.PI * 2,
            spinSpeed: (Math.random() - 0.5) * 0.015, // rotation speed
            opacity: 0.18 + Math.random() * 0.1, // Softer background opacity for lower exposure
            baseY: 0,
            waveOffset: Math.random() * Math.PI * 2,
            waveSpeed: 0.002 + Math.random() * 0.005
          });
        }
      } else {
        // Scaling coordinates gracefully on window resize
        logos.forEach(logo => {
          logo.x = (logo.x / (prevWidth || window.innerWidth)) * canvas.width;
          logo.y = (logo.y / (prevHeight || window.innerHeight)) * canvas.height;
        });
      }
    };

    // Initial size
    handleResize();
    window.addEventListener('resize', handleResize);

    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas every frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render each floating logo
      logos.forEach((logo) => {
        // Move logos slowly
        logo.x += logo.vx;
        logo.y += logo.vy;
        logo.angle += logo.spinSpeed;
        logo.waveOffset += logo.waveSpeed;

        // Apply a subtle floating wave effect to vertical coordinate
        const currentY = logo.y + Math.sin(logo.waveOffset) * 15;

        // Wrap around screen boundaries seamlessly
        const halfSize = logo.size / 2;
        if (logo.x < -halfSize) logo.x = canvas.width + halfSize;
        if (logo.x > canvas.width + halfSize) logo.x = -halfSize;
        if (logo.y < -halfSize) logo.y = canvas.height + halfSize;
        if (logo.y > canvas.height + halfSize) logo.y = -halfSize;

        // Draw the logo with high-quality opacity context
        ctx.globalAlpha = logo.opacity;
        
        ctx.save();
        ctx.translate(logo.x, currentY);
        ctx.rotate(logo.angle);
        
        // Draw centered only if loaded and has width
        if (img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, -halfSize, -halfSize, logo.size, logo.size);
        }
        ctx.restore();
      });

      animFrameId = requestAnimationFrame(draw);
    };

    // Start single, unified animation loop
    animFrameId = requestAnimationFrame(draw);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    };
  }, []);

  return null; // pure background canvas renderer
}

