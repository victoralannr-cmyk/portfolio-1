import { Sparkles, CheckCircle, Smartphone, Layout, Rocket } from 'lucide-react';
import { SERVICES } from '../data';
import LightfallBackground from './LightfallBackground';

export default function Services() {
  return (
    <LightfallBackground id="services" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-purple-dark/60 border border-brand-purple/40 px-3 py-1 rounded-full text-brand-gold text-xs font-semibold mb-3">
            <Sparkles size={12} className="animate-spin duration-[6000ms]" />
            SOLUÇÕES & SERVIÇOS
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-brand-white mb-4">
            Serviços Especializados
          </h2>
          <p className="text-brand-white/70 max-w-2xl mx-auto text-sm md:text-base">
            Do planejamento visual ao código de alta performance, eu entrego a tecnologia que sua marca precisa para se destacar no ambiente digital.
          </p>
        </div>

        {/* Services Grid (Landing pages, Sites e apps) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="services-cards-grid">
          {SERVICES.map((service, idx) => {
            // Pick corresponding icon
            let ServiceIcon = Layout; // default landing pages
            if (service.id === 'sites-institucionais') ServiceIcon = Rocket;
            if (service.id === 'apps') ServiceIcon = Smartphone;

            return (
              <div 
                key={service.id}
                className="relative bg-gradient-to-b from-brand-purple-dark/30 to-brand-black border border-brand-purple/20 rounded-2xl p-6 md:p-8 hover:border-brand-purple hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
                id={`service-card-${service.id}`}
              >
                
                {/* Decorative gold badge if present */}
                {service.badge && (
                  <span className="absolute top-4 right-4 bg-brand-gold/10 text-brand-gold text-[10px] font-bold px-2.5 py-1 rounded-full border border-brand-gold/20">
                    {service.badge}
                  </span>
                )}

                <div>
                  {/* Icon container */}
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/20 text-brand-gold-light border border-brand-purple/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ServiceIcon size={24} />
                  </div>

                  <h3 className="text-xl md:text-2xl font-heading font-extrabold text-brand-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-xs md:text-sm text-brand-white/70 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features Bullet List */}
                  <ul className="space-y-3 mb-8" id={`service-features-${service.id}`}>
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-brand-white/80">
                        <CheckCircle size={14} className="text-brand-gold mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Simulated Pricing or CTA anchor */}
                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      // Pre-fill type of service or select it
                      const selectEl = document.getElementById('service-select') as HTMLSelectElement;
                      if (selectEl) {
                        if (service.id === 'landing-pages') selectEl.value = 'Landing Page';
                        if (service.id === 'sites-institucionais') selectEl.value = 'Web Site';
                        if (service.id === 'apps') selectEl.value = 'Aplicativo';
                        
                        // Fire change event
                        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
                      }
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-brand-black hover:bg-brand-purple-dark text-brand-white font-semibold text-xs border border-brand-purple/40 hover:border-brand-gold-light hover:text-brand-gold transition-all duration-300 cursor-pointer"
                  id={`service-cta-btn-${service.id}`}
                >
                  Solicitar Serviços de {service.title}
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </LightfallBackground>
  );
}
