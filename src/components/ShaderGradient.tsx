import React, { useEffect, useRef } from 'react';

export interface ShaderGradientProps {
  animate?: "on" | "off";
  axesHelper?: "on" | "off";
  bgColor1?: string;
  bgColor2?: string;
  brightness?: number;
  cAzimuthAngle?: number;
  cDistance?: number;
  cPolarAngle?: number;
  cameraZoom?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  destination?: string;
  embedMode?: string;
  envPreset?: string;
  format?: string;
  fov?: number;
  frameRate?: number;
  gizmoHelper?: string;
  grain?: "on" | "off";
  lightType?: string;
  pixelDensity?: number;
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  range?: string;
  rangeEnd?: number;
  rangeStart?: number;
  reflection?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  shader?: string;
  type?: string;
  uAmplitude?: number;
  uDensity?: number;
  uFrequency?: number;
  uSpeed?: number;
  uStrength?: number;
  uTime?: number;
  wireframe?: boolean;
}

// Helper to convert hex colors to rgb normalized vec3 arrays [r, g, b]
const hexToRgbVec3 = (hex: string): [number, number, number] => {
  let cleanedHex = hex.replace('#', '');
  if (cleanedHex.length === 3) {
    cleanedHex = cleanedHex.split('').map(char => char + char).join('');
  }
  const num = parseInt(cleanedHex, 16);
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  return [r, g, b];
};

export const ShaderGradient: React.FC<ShaderGradientProps> = ({
  animate = "on",
  brightness = 1.1,
  color1 = "#5606ff",
  color2 = "#b13dfe",
  color3 = "#000000",
  uDensity = 1.1,
  uSpeed = 0.1,
  uStrength = 2.4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) {
      console.warn("WebGL not supported in this browser.");
      return;
    }

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source (Beautiful Liquid Domain Warping Plasma)
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_color3;
      uniform float u_brightness;
      uniform float u_speed;
      uniform float u_density;
      uniform float u_strength;

      // Pseudo-noise for magnificent visual fluidity
      vec2 grad(vec2 p) {
        float h = sin(p.x * 127.1 + p.y * 311.7) * 43758.5453123;
        return vec2(cos(h), sin(h));
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(dot(grad(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
                       dot(grad(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
                   mix(dot(grad(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
                       dot(grad(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = uv - 0.5;
        p.x *= aspect;
        
        // Scale with density
        p *= (u_density * 1.5 + 0.5);

        // Time-based animation
        float t = u_time * u_speed;

        // Domain warping for organic liquid flow
        vec2 q = vec2(0.0);
        q.x = noise(p + vec2(t * 0.15, t * 0.1));
        q.y = noise(p + vec2(t * 0.2, t * 0.12));

        vec2 r = vec2(0.0);
        r.x = noise(p + q * u_strength + vec2(1.7, 3.4) + t * 0.05);
        r.y = noise(p + q * u_strength + vec2(5.6, 2.1) + t * 0.08);

        float f = noise(p + r * u_strength);

        // Dynamically blend colors
        vec3 col = mix(u_color1 * u_brightness, u_color2 * u_brightness, clamp(f * 2.5, 0.0, 1.0));
        
        // Add subtle depth with color3
        col = mix(col, u_color3 * 0.5, clamp(length(q) * 1.2, 0.0, 1.0));

        // Satin-like dark gradient highlight overlay
        col += vec3(0.05, 0.02, 0.08) * sin(f * 8.0 + t);

        // Gentle vignette to blend borders perfectly
        float vignette = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y);
        vignette = clamp(pow(vignette * 16.0, 0.35), 0.0, 1.0);
        col *= mix(0.4, 1.0, vignette);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Compile Shader Helper
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compiler error: ", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    // Link Program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Shader Program linking error: ", gl.getProgramInfoLog(program));
      return;
    }

    // Set up geometry - Fullscreen quad (two triangles)
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uColor1Loc = gl.getUniformLocation(program, "u_color1");
    const uColor2Loc = gl.getUniformLocation(program, "u_color2");
    const uColor3Loc = gl.getUniformLocation(program, "u_color3");
    const uBrightnessLoc = gl.getUniformLocation(program, "u_brightness");
    const uSpeedLoc = gl.getUniformLocation(program, "u_speed");
    const uDensityLoc = gl.getUniformLocation(program, "u_density");
    const uStrengthLoc = gl.getUniformLocation(program, "u_strength");

    // Convert colors
    const rgb1 = hexToRgbVec3(color1);
    const rgb2 = hexToRgbVec3(color2);
    const rgb3 = hexToRgbVec3(color3);

    // Bind non-changing uniforms
    gl.uniform3fv(uColor1Loc, rgb1);
    gl.uniform3fv(uColor2Loc, rgb2);
    gl.uniform3fv(uColor3Loc, rgb3);
    gl.uniform1f(uBrightnessLoc, brightness);
    gl.uniform1f(uSpeedLoc, uSpeed);
    gl.uniform1f(uDensityLoc, uDensity);
    gl.uniform1f(uStrengthLoc, uStrength);

    // Resize handler
    const resizeCanvas = () => {
      // Scale down the canvas resolution for the abstract fluid gradient background.
      // Since it's a smooth, blurry gradient, rendering at a lower pixel resolution (e.g. 25%)
      // looks identical to the eye (due to bi-linear scaling up in the browser) but operates
      // with a ~16x performance boost, reducing CPU/GPU overhead to near-zero.
      const scaleFactor = 0.25;
      const displayWidth = Math.max(128, Math.floor(canvas.clientWidth * scaleFactor));
      const displayHeight = Math.max(128, Math.floor(canvas.clientHeight * scaleFactor));
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();

    // Render loop
    let animationId: number;
    let startTime = performance.now();

    const render = () => {
      if (canvas.width > 0 && canvas.height > 0) {
        if (animate === "on") {
          const elapsedSeconds = (performance.now() - startTime) / 1000;
          gl.uniform1f(uTimeLoc, elapsedSeconds);
        } else {
          gl.uniform1f(uTimeLoc, 39.5); // Static fallback
        }

        gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationId = requestAnimationFrame(render);
    };

    render();

    // Clean up
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, [animate, color1, color2, color3, brightness, uSpeed, uDensity, uStrength]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-brand-black">
      {/* Ambient background blur blobs as fallback & enhanced depth */}
      <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] bg-[#5c2d8c]/15 rounded-full blur-[100px] animate-pulse duration-[8000ms] mix-blend-screen" />
      <div className="absolute bottom-[20%] right-[10%] w-[45%] h-[45%] bg-[#d4a843]/10 rounded-full blur-[120px] animate-pulse duration-[12000ms] mix-blend-screen" />
      <div className="absolute top-[40%] right-[30%] w-[35%] h-[35%] bg-[#5606ff]/10 rounded-full blur-[100px] animate-pulse duration-[10000ms] mix-blend-screen" />

      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
        style={{ zIndex: 1, mixBlendMode: 'normal' }}
      />

      {/* Slow rotating premium brand logo watermark */}
      <div 
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center select-none overflow-visible w-[320px] h-[320px] sm:w-[560px] sm:h-[560px] opacity-[0.06] sm:opacity-[0.08]"
        style={{ zIndex: 2 }}
      >
        {/* Outer orbital line */}
        <div className="absolute inset-0 rounded-full border border-dashed border-brand-purple/50 animate-spin-slow" />
        
        {/* Middle orbital line */}
        <div className="absolute inset-[10%] rounded-full border border-dashed border-brand-gold/30 animate-spin-slow-reverse" />
        
        {/* Inner orbital line */}
        <div className="absolute inset-[20%] rounded-full border border-brand-white/10 animate-spin-slow" />

        {/* Center logo container with user's uploaded logo image */}
        <div className="absolute inset-[30%] flex items-center justify-center animate-spin-slow-reverse">
          <img 
            src="https://i.postimg.cc/yxZC2M0L/3bdb5ef7-e8bf-4277-b955-8d0825e5942e.png" 
            alt="V S Logo Watermark" 
            className="w-[120px] h-[120px] sm:w-[220px] sm:h-[220px] object-contain invert brightness-[1.5] opacity-80"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Seamless transition overlays to blend with #1A0A2E (bg-brand-black) */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{ 
          zIndex: 3,
          background: 'linear-gradient(to bottom, #1A0A2E 0%, rgba(26, 10, 46, 0.4) 50%, transparent 100%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ 
          zIndex: 3,
          background: 'linear-gradient(to top, #1A0A2E 0%, rgba(26, 10, 46, 0.4) 50%, transparent 100%)'
        }}
      />
    </div>
  );
};
