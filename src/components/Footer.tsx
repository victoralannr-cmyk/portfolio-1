import { Instagram, Mail, ArrowUpCircle, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-black border-t border-brand-purple/20 py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background soft lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-brand-purple/5 rounded-full blur-3xl -z-10" />

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

        {/* Brand identity */}
        <div className="text-center mb-8">
          <h3 className="font-heading font-extrabold text-2xl text-brand-white tracking-tight mb-2">
            V <span className="text-brand-gold">Santiago</span>
          </h3>
          <p className="text-xs md:text-sm text-brand-white/50 max-w-md mx-auto">
            Criando experiências digitais memoráveis que convertem acessos em faturamento de forma escalável.
          </p>
        </div>

        {/* Social connections (Required: instagram: victorys.sites, email: victorsites77@gmail.com) */}
        <div className="flex flex-col sm:flex-row gap-6 items-center mb-10" id="footer-social-channels">
          
          {/* Instagram Link */}
          <a 
            href="https://instagram.com/victorys.sites" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-2.5 px-6 rounded-2xl bg-brand-purple-dark/40 border border-brand-purple/20 hover:border-brand-gold/60 hover:bg-brand-purple-dark text-brand-white/90 hover:text-brand-gold transition-all duration-300 group shadow-sm"
            id="instagram-social-link"
          >
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform duration-300">
              <Instagram size={18} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-brand-white/40 uppercase font-bold tracking-wider font-mono">Instagram</p>
              <p className="text-sm font-semibold tracking-tight">@victorys.sites</p>
            </div>
          </a>

          {/* Email Link */}
          <a 
            href="mailto:victorsites77@gmail.com"
            className="flex items-center gap-3 py-2.5 px-6 rounded-2xl bg-brand-purple-dark/40 border border-brand-purple/20 hover:border-brand-gold/60 hover:bg-brand-purple-dark text-brand-white/90 hover:text-brand-gold transition-all duration-300 group shadow-sm"
            id="email-social-link"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-105 transition-transform duration-300">
              <Mail size={18} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-brand-white/40 uppercase font-bold tracking-wider font-mono">E-mail Comercial</p>
              <p className="text-sm font-semibold tracking-tight">victorsites77@gmail.com</p>
            </div>
          </a>

        </div>

        {/* Separator */}
        <div className="w-full max-w-3xl border-t border-brand-purple/20 my-6" />

        {/* Bottom Credits */}
        <div className="text-center text-[11px] md:text-xs text-brand-white/30 flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl gap-4">
          <p>© 2026 Victor Santiago • Desenvolvedor Web e Designer. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Desenvolvido com <Heart size={10} className="text-rose-500 fill-rose-500 animate-pulse" /> por{' '}
            <span className="text-brand-gold font-semibold">Victor Santiago</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
