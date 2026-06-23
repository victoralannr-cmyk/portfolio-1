import { Mail, ArrowUpCircle, Heart } from 'lucide-react';
import { BackgroundCircles } from './ui/background-circles';

function OldInstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block transition-transform duration-300"
    >
      {/* Outer camera border */}
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      
      {/* Upper body horizontal division */}
      <line x1="2" y1="9" x2="22" y2="9" />
      
      {/* Viewfinder on top right */}
      <rect x="16" y="5" width="3" height="3" rx="0.5" />
      
      {/* Central lens */}
      <circle cx="12" cy="14.5" r="4" />
      <circle cx="12" cy="14.5" r="1.5" />
      
      {/* Classic Instagram Vintage stripes on the top-left */}
      <line x1="5" y1="2" x2="5" y2="9" stroke="#E52129" strokeWidth="1.3" />
      <line x1="6.3" y1="2" x2="6.3" y2="9" stroke="#F48325" strokeWidth="1.3" />
      <line x1="7.6" y1="2" x2="7.6" y2="9" stroke="#FFBC0F" strokeWidth="1.3" />
      <line x1="8.9" y1="2" x2="8.9" y2="9" stroke="#37A849" strokeWidth="1.3" />
      <line x1="10.2" y1="2" x2="10.2" y2="9" stroke="#00A1E4" strokeWidth="1.3" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-black border-t border-brand-purple/20 py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Dynamic Animated Background Circles with brand colors */}
      <BackgroundCircles className="opacity-60 -z-10" variant="quaternary" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Scroll back to top button */}
        <button 
          onClick={scrollToTop}
          className="mb-8 p-2 rounded-full border border-brand-purple/30 bg-brand-purple-dark text-brand-white/60 hover:text-brand-gold hover:border-brand-gold transition-all duration-300 group cursor-pointer"
          id="scroll-to-top-footer"
          aria-label="Voltar para o topo"
        >
          <ArrowUpCircle size={24} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Brand identity - Larger Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-28 h-28 md:w-32 md:h-32 relative group">
            {/* Soft static white glowing background aura */}
            <div className="absolute inset-4 bg-brand-white/10 rounded-full blur-xl opacity-60 pointer-events-none" />
            
            <img 
              src="https://i.postimg.cc/yxZC2M0L/3bdb5ef7-e8bf-4277-b955-8d0825e5942e.png" 
              alt="V S Logo" 
              className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 brightness-0 invert drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] cursor-pointer" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Social connections (Required: instagram: victorys.sites, email: victorsites77@gmail.com) */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-10 w-full" id="footer-social-channels">
          
          {/* Instagram Link */}
          <a 
            href="https://instagram.com/victorys.sites" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-2.5 px-6 rounded-xl bg-brand-white/[0.02] border border-white/10 hover:border-brand-gold hover:bg-brand-white/[0.04] text-brand-white/90 hover:text-brand-white transition-all duration-300 group shadow-sm"
            id="instagram-social-link"
          >
            <span className="text-brand-white/60 group-hover:text-brand-gold group-hover:scale-110 transition-all duration-300">
              <OldInstagramIcon size={22} />
            </span>
            <div className="text-left">
              <p className="text-[10px] text-brand-white/40 uppercase font-bold tracking-widest font-mono">Instagram</p>
              <p className="text-sm font-semibold tracking-tight">@victorys.sites</p>
            </div>
          </a>

          {/* Email Link */}
          <a 
            href="mailto:victorsites77@gmail.com"
            className="flex items-center gap-3 py-2.5 px-6 rounded-xl bg-brand-white/[0.02] border border-white/10 hover:border-brand-gold hover:bg-brand-white/[0.04] text-brand-white/90 hover:text-brand-white transition-all duration-300 group shadow-sm"
            id="email-social-link"
          >
            <span className="text-brand-white/60 group-hover:text-brand-gold group-hover:scale-110 transition-all duration-300">
              <Mail size={18} />
            </span>
            <div className="text-left">
              <p className="text-[10px] text-brand-white/40 uppercase font-bold tracking-widest font-mono">E-mail</p>
              <p className="text-sm font-semibold tracking-tight">victorsites77@gmail.com</p>
            </div>
          </a>

        </div>

        {/* Separator */}
        <div className="w-full max-w-3xl border-t border-brand-purple/20 my-6" />

        {/* Bottom Credits */}
        <div className="text-center text-[11px] md:text-xs text-brand-white/30 flex flex-col sm:flex-row items-center justify-center w-full max-w-3xl gap-4">
          <p>© 2026 Victor Santiago • Desenvolvedor Web e Designer. Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
}
