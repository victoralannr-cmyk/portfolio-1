import { CheckCircle, Smartphone, Layout, Rocket } from 'lucide-react';
import { SERVICES } from '../data';
import LightfallBackground from './LightfallBackground';

export default function Services() {
  return (
    <LightfallBackground id="services" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-brand-white mb-4">
            Serviços Especializados
          </h2>
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

                {/* Simulated Pricing or CTA anchor pointing directly to WhatsApp */}
                <button
                  onClick={() => {
                    const messageText = `Olá Victor! Tenho interesse em contratar os seus serviços de *${service.title}*. Gostaria de saber mais sobre prazos e valores.`;
                    const whatsappUrl = `https://api.whatsapp.com/send?phone=5585998504580&text=${encodeURIComponent(messageText)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full py-3 rounded-xl text-brand-black font-extrabold text-xs tracking-wider uppercase border border-brand-gold/30 hover:scale-105 transition-all duration-300 cursor-pointer shadow-md animate-gold-silver"
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
