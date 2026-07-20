import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, Briefcase, Award, ArrowUpRight } from 'lucide-react';
import { ShaderGradient } from './ShaderGradient';

function CountUp({ end, duration = 4500, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    let animFrameId: number;

    // Cubic ease-out function for a beautiful cadenced progression
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.floor(easedProgress * (end - startValue) + startValue));

      if (progress < 1) {
        animFrameId = requestAnimationFrame(animate);
      }
    };

    animFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameId);
  }, [end, duration]);

  return <>{count}{suffix}</>;
}

export default function Hero() {
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRest(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-20 md:py-40 px-4 md:px-8 overflow-hidden bg-brand-black"
    >
      {/* Background ambient shader gradient */}
      <ShaderGradient
        animate="on"
        axesHelper="on"
        bgColor1="#000000"
        bgColor2="#000000"
        brightness={0.8}
        cAzimuthAngle={220}
        cDistance={3.7}
        cPolarAngle={135}
        cameraZoom={1}
        color1="#5606ff"
        color2="#b13dfe"
        color3="#000000"
        destination="onCanvas"
        embedMode="off"
        envPreset="dawn"
        format="gif"
        fov={40}
        frameRate={10}
        gizmoHelper="hide"
        grain="off"
        lightType="env"
        pixelDensity={1}
        positionX={-0.4}
        positionY={0.1}
        positionZ={0}
        range="disabled"
        rangeEnd={40}
        rangeStart={39.5}
        reflection={0.1}
        rotationX={0}
        rotationY={0}
        rotationZ={235}
        shader="defaults"
        type="waterPlane"
        uAmplitude={0}
        uDensity={1.1}
        uFrequency={5.5}
        uSpeed={0.1}
        uStrength={2.4}
        uTime={39.5}
        wireframe={false}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
        
        {/* Full-width Stacked Column Layout */}
        <div className="w-full flex flex-col items-center justify-center" id="hero-info-column">
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-brand-white leading-tight tracking-tight mb-6">
            Sites / Pages é; <br />
            <span className="inline-flex items-center gap-2">
              <span 
                className="inline-block transition-all duration-1000 ease-out text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-white"
                style={{
                  opacity: showRest ? 1 : 0,
                  transform: showRest ? 'translateY(0)' : 'translateY(10px)',
                }}
              >
                Victor Santiago
              </span>
              <motion.span 
                className="inline-block text-xl md:text-2xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                aria-hidden="true"
              >
                💻
              </motion.span>
            </span>
          </h1>

          {/* Photo with custom premium frame (Placed right below the title) */}
          <div className="relative group max-w-xs md:max-w-sm w-full px-4 mb-8" id="hero-photo-wrapper">
            {/* Outer decorative gradient border */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-brand-purple via-brand-gold to-brand-gold-light rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 group-hover:scale-[1.01]" />
            
            {/* Main Image frame */}
            <div className="relative bg-brand-black rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-purple/50">
              <img 
                src="https://i.postimg.cc/WzCfr8fN/Whats-App-Image-2026-06-16-at-20-28-18.jpg" 
                alt="Victor Santiago - Desenvolvedor Web" 
                className="w-full h-[320px] md:h-[400px] object-cover object-top transition duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                id="developer-profile-image"
              />
              
              {/* Gold gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/10 to-transparent opacity-80" />
              
              {/* Small floating tag on the image */}
              <div className="absolute bottom-4 left-4 right-4 bg-brand-black/80 backdrop-blur-md px-4 py-3 rounded-xl border border-brand-purple/30 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">Victor Santiago</p>
                  <p className="text-white/60 text-xs">Desenvolvedor Web & Designer</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs text-emerald-400 font-medium">Online agora</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-8 w-full max-w-md">
            <button
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5585998504580&text=Ol%C3%A1%20Victor%21%20Tenho%20interesse%20em%20fechar%20neg%C3%B3cio%20e%20fazer%20um%20or%C3%A7amento%20para%20o%20meu%20projeto.', '_blank')}
              className="px-8 py-4 rounded-xl text-brand-black font-extrabold text-center shadow-lg shadow-brand-gold/15 hover:shadow-brand-gold/40 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 cursor-pointer animate-gold-silver w-full sm:w-auto"
              id="hero-cta-button-deal"
            >
              <span>Fechar Negócio</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5585998504580&text=Ol%C3%A1%20Victor%21%20Gostaria%20de%20ver%20mais%20projetos%20e%20conhecer%20os%20seus%20trabalhos.', '_blank')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-purple-dark/80 via-brand-purple/20 to-brand-purple-dark/80 hover:bg-brand-purple-dark/95 border border-brand-gold/40 text-brand-white font-bold text-center hover:border-brand-gold-light hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md w-full sm:w-auto"
              id="hero-cta-button-projects"
            >
              <span>Ver Projetos</span>
              <ArrowUpRight size={18} />
            </button>
          </div>

          <motion.div 
            className="font-editorial italic text-2xl md:text-3xl text-brand-gold-light/95 tracking-wide mb-8 max-w-xl flex flex-wrap gap-x-[0.25em] justify-center"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.18,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {"Transformo visitantes em clientes".split(" ").map((word, index) => (
              <motion.span
                key={index}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 25,
                      damping: 11,
                      mass: 0.9
                    }
                  }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>


          {/* Core Required Stats Block: under the elements */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-4 w-full max-w-lg mx-auto" id="hero-priority-stats">
            {/* Clientes Satisfeitos: 250 */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-purple-dark/80 to-brand-black border border-brand-purple/30 hover:border-brand-gold/40 transition-all duration-300 group shadow-md shadow-brand-black/30 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-105 transition-transform duration-300">
                  <Users size={20} />
                </div>
                <span className="text-stone-400 text-xs md:text-sm font-medium">Clientes</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-white group-hover:text-brand-gold transition-colors">
                <CountUp end={250} suffix="+" />
              </h3>
              <p className="text-brand-white/60 text-xs md:text-sm mt-1">
                Clientes Satisfeitos
              </p>
            </div>

            {/* 1 ano de experiencia */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-purple-dark/80 to-brand-black border border-brand-purple/30 hover:border-brand-gold/40 transition-all duration-300 group shadow-md shadow-brand-black/30 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-105 transition-transform duration-300">
                  <Briefcase size={20} />
                </div>
                <span className="text-stone-400 text-xs md:text-sm font-medium">Atuação</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-white group-hover:text-brand-gold transition-colors">
                1 Ano
              </h3>
              <p className="text-brand-white/60 text-xs md:text-sm mt-1">
                De Experiência Sólida
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
