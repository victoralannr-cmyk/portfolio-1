import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, CheckCircle2, Monitor, RefreshCw, Sparkles, Smartphone, ArrowDown } from 'lucide-react';

interface SimulatedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  stats?: string;
  color: string;
  accent: string;
  url: string;
  imageColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const SIMULATED_PROJECTS: SimulatedProject[] = [
  {
    id: 'kivo',
    title: 'Kivo Agency',
    category: 'Criação de Sites',
    description: 'Web institucional premium no nicho de marketing digital com animações fluidas de outro mundo.',
    stats: 'Performance de 99% no Lighthouse',
    color: '#5606ff',
    accent: '#b13dfe',
    url: 'kivoagency.com.br',
    imageColor: 'from-violet-600 to-indigo-900',
    gradientFrom: '#5606ff',
    gradientTo: '#2D008F'
  },
  {
    id: 'pagvend',
    title: 'PagVend',
    category: 'Landing Page de Alta Conversão',
    description: 'Design estratégico com elementos persuasivos e carregamento instantâneo direcionado para checkout.',
    stats: '+35% Conversão comprovada',
    color: '#00c6ff',
    accent: '#0072ff',
    url: 'pagvend.app.br',
    imageColor: 'from-cyan-500 to-blue-800',
    gradientFrom: '#00c6ff',
    gradientTo: '#004B8F'
  },
  {
    id: 'medic',
    title: 'Kivom Medic',
    category: 'Clínica & Saúde Premium',
    description: 'Elegância médica e layout limpo focado em agendamentos de consultas de alto valor via WhatsApp.',
    stats: 'Agendamentos duplicados',
    color: '#10b981',
    accent: '#34d399',
    url: 'kivommedicc.com',
    imageColor: 'from-emerald-500 to-teal-800',
    gradientFrom: '#10b981',
    gradientTo: '#064e3b'
  },
  {
    id: 'vale',
    title: 'Casa do Vale',
    category: 'Hotel Fazenda & Resort de Luxo',
    description: 'Uma experiência editorial imersiva com fotos em alta definição e sistema de reservas direto.',
    stats: 'Design Imersivo 3D',
    color: '#eab308',
    accent: '#facc15',
    url: 'casadovale.resort.com',
    imageColor: 'from-amber-500 to-amber-800',
    gradientFrom: '#eab308',
    gradientTo: '#78350f'
  },
  {
    id: 'estetica',
    title: 'Clínica Estética',
    category: 'Estética Avançada',
    description: 'Página ultra luxuosa de procedimentos corporais de elite, destacando antes e depois.',
    stats: 'SEO Local Otimizado',
    color: '#ec4899',
    accent: '#f472b6',
    url: 'clinicaestetica.com.br',
    imageColor: 'from-pink-500 to-rose-800',
    gradientFrom: '#ec4899',
    gradientTo: '#881337'
  },
  {
    id: 'gourmet',
    title: 'Restaurante Gourmet',
    category: 'Gastronomia Exclusiva',
    description: 'Menu digital interativo e reserva de mesas vip integrado com experiência tátil refinada.',
    stats: 'Carregamento de 0.8s',
    color: '#f97316',
    accent: '#fb923c',
    url: 'gourmethouse.com.br',
    imageColor: 'from-orange-500 to-amber-700',
    gradientFrom: '#f97316',
    gradientTo: '#7c2d12'
  }
];

export function AutoScrollDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile'>('desktop');
  const [tilt, setTilt] = useState({ x: 12, y: -12 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollState, setScrollState] = useState<'scrolling' | 'pausing' | 'rewinding'>('scrolling');

  // Interactive 3D tilt calculations based on mouse movement over the showcase container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = mockupRef.current;
    if (!card) return;
    setIsHovered(true);

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordinates from center of card (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Convert mouse movement to degree rotations (max 20 degrees)
    const rotateY = (mouseX / width) * 20; 
    const rotateX = -(mouseY / height) * 20;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Snap back gracefully to beautiful, default 3D perspective display angle
    setTilt({ x: 12, y: -12 });
  };

  // Automated Scroll and Loop Perfect Engine
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let lastTime = performance.now();
    let scrollY = 0;
    let localState: 'scrolling' | 'waitingBottom' | 'resetting' | 'waitingTop' = 'scrolling';
    let localStateTime = 0;

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const maxScroll = container.scrollHeight - container.clientHeight;

      if (localState === 'scrolling') {
        setScrollState('scrolling');
        // Very smooth cinematic speed
        scrollY += 0.045 * delta; 
        if (scrollY >= maxScroll) {
          scrollY = maxScroll;
          localState = 'waitingBottom';
          localStateTime = 0;
        }
        container.scrollTop = scrollY;
        setCurrentScroll(scrollY);
      } else if (localState === 'waitingBottom') {
        setScrollState('pausing');
        localStateTime += delta;
        if (localStateTime > 3000) { // Keep bottom viewport of CTA active for 3 seconds
          localState = 'resetting';
          localStateTime = 0;
        }
      } else if (localState === 'resetting') {
        setScrollState('rewinding');
        // Visually clear high-speed smooth rewind back to top
        scrollY -= 0.65 * delta; 
        if (scrollY <= 0) {
          scrollY = 0;
          localState = 'waitingTop';
          localStateTime = 0;
        }
        container.scrollTop = scrollY;
        setCurrentScroll(scrollY);
      } else if (localState === 'waitingTop') {
        setScrollState('pausing');
        localStateTime += delta;
        if (localStateTime > 1800) { // Hold top position for a moment before starting loop
          localState = 'scrolling';
          localStateTime = 0;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 md:p-6" id="loop-demo-container">
      
      {/* Visual Controls / Header */}
      <div className="flex items-center justify-between w-full max-w-4xl mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5 font-mono">
            <Sparkles size={12} />
            Auto-Scroll Demo (Em Loop)
          </span>
        </div>

        {/* Viewport switcher tabs */}
        <div className="flex bg-brand-black/80 border border-brand-purple/20 p-1 rounded-xl shadow-lg">
          <button 
            type="button"
            onClick={() => setActiveTab('desktop')}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'desktop' 
                ? 'bg-brand-purple text-brand-gold shadow-md shadow-brand-purple/20' 
                : 'text-brand-white/60 hover:text-brand-white'
            }`}
          >
            <Monitor size={14} />
            <span>Navegador 3D</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'mobile' 
                ? 'bg-brand-purple text-brand-gold shadow-md shadow-brand-purple/20' 
                : 'text-brand-white/60 hover:text-brand-white'
            }`}
          >
            <Smartphone size={14} />
            <span>Celular 3D</span>
          </button>
        </div>
      </div>

      {/* Primary 3D Canvas Area */}
      <div 
        className="relative w-full max-w-4xl h-[560px] flex items-center justify-center bg-transparent select-none cursor-grab active:cursor-grabbing"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Dynamic Shadow underneath the browser window to match perspective angle */}
        <div 
          className="absolute w-[80%] h-[20px] rounded-full bg-brand-purple/35 blur-2xl transition-all duration-300"
          style={{
            bottom: '20px',
            transform: `rotateX(90deg) rotateY(${tilt.y * 0.2}deg) scale(${isHovered ? 1.05 : 1})`,
            opacity: isHovered ? 0.7 : 0.5,
          }}
        />

        {/* The 3D Mockup Box */}
        <div
          ref={mockupRef}
          className={`relative border bg-brand-black border-brand-purple/30 shadow-2xl transition-all ${
            activeTab === 'desktop' 
              ? 'w-full max-w-2xl h-[480px] rounded-2xl' 
              : 'w-[280px] h-[500px] rounded-[36px]'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1200px',
            transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: isHovered ? 'none' : 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease',
            boxShadow: isHovered 
              ? '0 30px 60px -15px rgba(89, 6, 255, 0.25), 0 0 50px 5px rgba(177, 61, 254, 0.15)' 
              : '0 20px 45px -12px rgba(0, 0, 0, 0.7), 0 0 20px 2px rgba(89, 6, 255, 0.05)',
          }}
        >
          
          {/* Simulated hardware elements for phone tab */}
          {activeTab === 'mobile' && (
            <>
              {/* Speaker receiver */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-brand-purple-dark/80 rounded-full border border-brand-purple/20 z-50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-black mr-1" />
                <span className="w-10 h-1 bg-neutral-800 rounded" />
              </div>
              {/* Home Indicator */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-brand-white/30 rounded-full z-50" />
            </>
          )}

          {/* Browser Header Panel */}
          <div className={`bg-brand-purple-dark/80 backdrop-blur-md px-4 border-b border-brand-purple/30 flex items-center justify-between z-30 relative ${
            activeTab === 'desktop' ? 'h-11 rounded-t-2xl' : 'h-14 pt-4 rounded-t-[36px]'
          }`}>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-sm" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-sm" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-sm" />
            </div>

            {/* Simulated Address Bar */}
            <div className="flex items-center justify-center gap-1.5 bg-brand-black/50 border border-brand-purple/20 px-3 py-1 rounded-lg text-[10px] text-brand-white/50 font-mono w-44 md:w-60 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="tracking-wide">vsantiago.web/portfolio-reels</span>
            </div>

            {/* Loop status indicator */}
            <div className="flex items-center gap-1">
              <RefreshCw 
                size={11} 
                className={`text-brand-gold/60 ${scrollState === 'scrolling' ? 'animate-spin duration-[4000ms]' : ''} ${scrollState === 'rewinding' ? 'animate-spin duration-700' : ''}`}
              />
              <span className="text-[8px] font-mono font-bold text-brand-gold/60 uppercase hidden md:inline">
                {scrollState}
              </span>
            </div>
          </div>

          {/* Simulated Web Viewport (Scrolling container) */}
          <div 
            ref={containerRef}
            className={`overflow-y-auto bg-brand-black w-full relative custom-scroll`}
            style={{ 
              height: activeTab === 'desktop' ? 'calc(480px - 44px)' : 'calc(500px - 56px - 14px)',
              borderBottomLeftRadius: activeTab === 'desktop' ? '15px' : '36px',
              borderBottomRightRadius: activeTab === 'desktop' ? '15px' : '36px',
            }}
          >
            
            {/* Inner Portal Simulator Content */}
            <div className="w-full relative px-3 py-6 md:p-6 text-left flex flex-col gap-6 select-none" id="simulated-iframe-body">
              
              {/* Virtual Header */}
              <div className="text-center pb-4 border-b border-brand-purple/10">
                <h4 className="text-sm font-heading font-extrabold text-brand-white text-center flex items-center justify-center gap-1 mb-1">
                  <Sparkles size={12} className="text-brand-gold" />
                  V SANTIAGO PORTFÓLIO
                </h4>
                <p className="text-[10px] text-brand-white/40 font-semibold uppercase tracking-wider">
                  Desenvolvimento de Softwares & Landing Pages
                </p>
              </div>

              {/* Loop Rendering Simulated Projects with Scroll Reveal logic */}
              {SIMULATED_PROJECTS.map((p, idx) => {
                // Approximate triggering thresholds inside mock container (container scrollHeight is ~1500px)
                const cardHeight = 160; 
                const cardOffset = 80 + idx * cardHeight;
                // Reveal logic: as scroll reaches within 300px of cardOffset, activate translate & opacity
                const isRevealed = currentScroll + (activeTab === 'desktop' ? 440 : 430) > cardOffset;

                return (
                  <div 
                    key={p.id}
                    className={`bg-gradient-to-br from-brand-purple-dark/40 to-brand-black border border-brand-purple/20 p-4 rounded-xl relative overflow-hidden transition-all duration-700 ${
                      isRevealed 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-12 scale-95'
                    }`}
                    style={{
                      borderLeft: `3px solid ${p.color}`,
                    }}
                  >
                    
                    {/* Simulated visual mockup display inside card */}
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-[8px] uppercase tracking-widest font-extrabold px-1.5 py-0.5 rounded text-brand-gold bg-brand-gold/10 border border-brand-gold/20">
                            {p.category}
                          </span>
                          {p.stats && (
                            <span className="text-[8px] flex items-center gap-0.5 px-1.5 py-0.5 rounded text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20">
                              <CheckCircle2 size={8} />
                              {p.stats}
                            </span>
                          )}
                        </div>
                        <h5 className="text-xs font-extrabold text-brand-white group-hover:text-brand-gold transition-colors">
                          {p.title}
                        </h5>
                        <p className="text-[10px] text-brand-white/60 mt-1 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      {/* Site Graphic Asset Preview */}
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-tr ${p.imageColor} border border-brand-purple/20 flex flex-col justify-between p-1.5 shadow-md flex-shrink-0 relative group-hover:scale-105 transition-transform`}>
                        <div className="flex justify-between items-center w-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-white/40" />
                          <span className="text-[6px] text-brand-white/50 font-mono">{p.url}</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="flex flex-col gap-0.5">
                            <span className="w-4 h-0.5 bg-brand-white/40 rounded" />
                            <span className="w-5 h-0.5 bg-brand-white/40 rounded" />
                          </div>
                          <ExternalLink size={8} className="text-brand-white/60" />
                        </div>
                        {/* Shimmer backdrop effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffffff0f] to-transparent -translate-x-full animate-shimmer" style={{ animationDuration: '3s' }} />
                      </div>
                    </div>

                  </div>
                );
              })}

              {/* Dynamic scroll-to-bottom call to action inside simulated iframe */}
              <div 
                className={`my-4 bg-gradient-to-r from-brand-purple-dark/80 via-brand-purple-dark/50 to-brand-black p-5 rounded-2xl border border-brand-purple/35 text-center flex flex-col items-center justify-center transition-all duration-1000 ${
                  currentScroll + (activeTab === 'desktop' ? 440 : 430) > 1000
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
              >
                <Sparkles size={16} className="text-brand-gold mb-1.5 animate-bounce" />
                <h5 className="text-xs font-bold text-brand-white mb-1.5">
                  Quer um site premium assim?
                </h5>
                <p className="text-[10px] text-brand-white/60 max-w-xs mb-3 leading-relaxed">
                  Design e tecnologia integrados de forma refinada, focada em maximizar o seu faturamento digital.
                </p>
                <button 
                  type="button"
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-extrabold text-[11px] shadow-lg flex items-center justify-center gap-1"
                >
                  <span>Quero um orçamento</span>
                  <ExternalLink size={10} />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Scroll status helper tag at bottom of 3D canvas */}
        <div className="absolute bottom-1 right-4 flex items-center gap-1.5 bg-brand-black/90 border border-brand-purple/30 px-3 py-1 rounded-full text-[9px] text-brand-white/50 tracking-wider font-mono shadow-md pointer-events-none">
          <ArrowDown size={10} className="text-brand-gold animate-bounce" />
          <span>ROLANDO AUTOMATICAMENTE</span>
        </div>

      </div>

    </div>
  );
}
