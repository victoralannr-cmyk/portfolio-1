import { useState, useEffect } from 'react';
import { Menu, X, Landmark, Send } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCollapsed(true);
    }, 2500); // 2.5 seconds delay before collapsing
    return () => clearTimeout(timer);
  }, []);

  const shouldCollapse = (isCollapsed || isMinimized) && !isHovered;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Classify as scrolled if past top threshold
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check scroll direction and set minimization state
      if (currentScrollY <= 50) {
        // Always expanded close to the top
        setIsMinimized(false);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down -> Minimize header
        setIsMinimized(true);
      } else {
        // Scrolling up -> Restore header to normal size
        setIsMinimized(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Curved / Rounded Header container with futuristic spaceship style */}
      <div 
        className={`w-full transition-all duration-300 flex items-center justify-between border relative ${
          isMinimized
            ? 'py-1.5 md:py-2 px-4 md:px-8 bg-brand-black/95 backdrop-blur-md border-brand-purple/60 shadow-lg shadow-brand-black/80 rounded-xl md:rounded-full'
            : isScrolled
              ? 'py-4 px-6 md:px-10 bg-brand-black/90 backdrop-blur-md border-brand-purple/50 shadow-lg shadow-brand-black/75 rounded-2xl md:rounded-full' 
              : 'py-4 px-6 md:px-10 bg-brand-purple-dark/85 backdrop-blur-md border-brand-purple/30 rounded-2xl md:rounded-full shadow-md shadow-brand-purple-dark/20'
        }`}
        id="app-header-container"
      >
        {/* Spaceship Left Wingtip / Sensor Beacon */}
        <div className="absolute -left-2 md:-left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none z-20">
          <div className="w-[3px] h-[16px] md:h-[24px] bg-gradient-to-b from-brand-purple to-transparent rounded-full shadow-[0_0_8px_#5C2D8C]" />
          <div className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse" />
          <div className="absolute w-1 h-1 bg-brand-white rounded-full left-[5px] md:left-[6px]" />
        </div>

        {/* Spaceship Right Wingtip / Sensor Beacon */}
        <div className="absolute -right-2 md:-right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none z-20 flex-row-reverse">
          <div className="w-[3px] h-[16px] md:h-[24px] bg-gradient-to-b from-brand-gold to-transparent rounded-full shadow-[0_0_8px_#D4A843]" />
          <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />
          <div className="absolute w-1 h-1 bg-brand-white rounded-full right-[5px] md:right-[6px]" />
        </div>

        {/* Spaceship thruster plasma light trail */}
        <div className="absolute -bottom-[1px] left-[15%] right-[15%] h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-90 blur-[0.5px] z-20 animate-pulse" />
        <div className="absolute -bottom-[2px] left-[25%] right-[25%] h-[3px] bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-75 blur-[2px] z-20" />

        {/* Futuristic top hull plate line */}
        <div className="absolute -top-[1px] left-[30%] right-[30%] h-[1px] bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent z-20" />

        {/* Logo / Brand */}
        <div 
          onClick={() => scrollToSection('top')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer flex items-center group"
          id="logo-brand-container"
        >
          {/* Custom Styled Monogram Logo using user's uploaded logo image */}
          <div className={`transition-all duration-300 flex items-center justify-center relative flex-shrink-0 ${
            isMinimized
              ? 'w-14 h-14 md:w-16 md:h-16 -my-3 md:-my-4'
              : 'w-20 h-20 md:w-24 md:h-24 -my-5 md:-my-6'
          }`}>
            {/* Soft static white & gold glowing background aura to pop the logo */}
            <div className="absolute inset-1 bg-gradient-to-tr from-brand-purple/40 to-brand-gold/40 rounded-full blur-md opacity-80 pointer-events-none animate-pulse duration-[3000ms]" />
            
            <img 
              src="https://i.postimg.cc/yxZC2M0L/3bdb5ef7-e8bf-4277-b955-8d0825e5942e.png" 
              alt="V S Logo" 
              className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 contrast-[1.3] brightness-[1.1] saturate-[1.1] drop-shadow-[0_0_12px_rgba(212,168,67,0.7)]" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="text-sm font-medium text-brand-white/80 hover:text-brand-gold transition-colors hover:scale-105"
            id="nav-link-sobre"
          >
            Sobre Mim
          </button>
          <button 
            onClick={() => scrollToSection('projects')} 
            className="text-sm font-medium text-brand-white/80 hover:text-brand-gold transition-colors hover:scale-105"
            id="nav-link-portfolio"
          >
            Portfólio
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="text-sm font-medium text-brand-white/80 hover:text-brand-gold transition-colors hover:scale-105"
            id="nav-link-servicos"
          >
            Serviços
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-sm font-medium text-brand-white/80 hover:text-brand-gold transition-colors hover:scale-105"
            id="nav-link-contato"
          >
            Contato
          </button>
        </nav>

        {/* Action Button - redirects to WhatsApp */}
        <div className="hidden md:block">
          <button
            onClick={() => window.open('https://api.whatsapp.com/send?phone=5585998504580&text=Ol%C3%A1%20Victor%21%20Gostaria%20de%20fechar%20neg%C3%B3cio%20e%20iniciar%20um%20projeto.', '_blank')}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-purple via-brand-gold to-brand-gold-light text-brand-white font-bold text-sm hover:from-brand-gold hover:to-brand-purple hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-brand-gold/30 flex items-center gap-2 cursor-pointer animate-gradient-btn"
            id="header-cta-button"
          >
            <span>Fechar Negócio</span>
            <Send size={15} />
          </button>
        </div>

        {/* Mobile menu triggers */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => window.open('https://api.whatsapp.com/send?phone=5585998504580&text=Ol%C3%A1%20Victor%21%20Gostaria%20de%20fechar%20neg%C3%B3cio%20e%20iniciar%20um%20projeto.', '_blank')}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-purple via-brand-gold to-brand-gold-light text-brand-white font-extrabold text-xs hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer animate-gradient-btn"
            id="header-cta-mobile"
          >
            Fechar Negócio
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-brand-purple-dark border border-brand-purple/40 text-brand-white hover:text-brand-gold transition-colors cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Alternar Menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div 
          className="md:hidden mt-2 p-6 rounded-2xl bg-brand-black/95 backdrop-blur-lg border border-brand-purple/40 animate-fade-in flex flex-col gap-4 shadow-xl"
          id="mobile-drawer"
        >
          <button 
            onClick={() => scrollToSection('hero')} 
            className="text-left py-2 px-3 rounded-lg hover:bg-brand-purple-dark text-brand-white font-medium hover:text-brand-gold transition-all"
            id="mobile-nav-link-sobre"
          >
            Sobre Mim
          </button>
          <button 
            onClick={() => scrollToSection('projects')} 
            className="text-left py-2 px-3 rounded-lg hover:bg-brand-purple-dark text-brand-white font-medium hover:text-brand-gold transition-all"
            id="mobile-nav-link-portfolio"
          >
            Portfólio / Projetos
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="text-left py-2 px-3 rounded-lg hover:bg-brand-purple-dark text-brand-white font-medium hover:text-brand-gold transition-all"
            id="mobile-nav-link-servicos"
          >
            Serviços
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-left py-2 px-3 rounded-lg hover:bg-brand-purple-dark text-brand-white font-medium hover:text-brand-gold transition-all"
            id="mobile-nav-link-contato"
          >
            Contato
          </button>
        </div>
      )}
    </header>
  );
}
