import { useState, FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ContactFormData } from '../types';
import LightfallBackground from './LightfallBackground';

export default function Form() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    contact: '',
    serviceType: 'Landing Page',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const servicesList = [
    { value: 'Landing Page', label: 'Landing Page de Alta Conversão' },
    { value: 'Web Site', label: 'Site Completo / Institucional' },
    { value: 'Aplicativo', label: 'Aplicativo Web ou Sistema sob medida' },
    { value: 'Outro', label: 'Outro Projeto Especial' }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Basics validation
    if (!formData.name.trim()) {
      setError('Por favor, informe seu nome.');
      return;
    }
    if (!formData.contact.trim()) {
      setError('Por favor, informe seu e-mail ou telefone de contato.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format whatsapp message template
      const formattedNumber = '5585998504580'; // (85) 99850-4580
      const messageText = `Olá Victor! Tenho interesse em iniciar um projeto com você.%0A%0A*DADOS DO FORMULÁRIO:*%0A👤 *Nome:* ${encodeURIComponent(formData.name)}%0A📞 *E-mail / Telefone:* ${encodeURIComponent(formData.contact)}%0A💼 *Tipo de Serviço:* ${encodeURIComponent(formData.serviceType)}%0A${formData.message ? `💬 *Detalhes:* ${encodeURIComponent(formData.message)}` : ''}%0A%0A_Enviado através do seu portfólio online._`;

      const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${messageText}`;

      // Simulate a fast feedback, then open in new window
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
        
        // Redirect the user to WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Soft reset
        setFormData({
          name: '',
          contact: '',
          serviceType: 'Landing Page',
          message: ''
        });
      }, 1000);

    } catch (err: any) {
      setIsSubmitting(false);
      setError('Ocorreu um erro ao direcionar para o WhatsApp. Tente novamente.');
    }
  };

  return (
    <LightfallBackground id="contact" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-brand-white mb-4">
            Vamos Fechar Negócio?
          </h2>
          <p className="text-brand-white/70 max-w-xl mx-auto text-sm md:text-base">
            Preencha os campos abaixo de forma simples. Ao clicar no botão de confirmação, você será direcionado para o meu WhatsApp com os dados prontos.
          </p>
        </div>

        {/* Contact Form Container card */}
        <div className="bg-gradient-to-tr from-brand-purple-dark/70 to-brand-black p-6 md:p-10 rounded-3xl border border-brand-purple/40 shadow-2xl relative overflow-hidden" id="contact-form-container">
          
          {/* Subtle gold line accent at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple via-brand-gold to-brand-gold-light" />

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-start gap-3 animate-fade-in" id="form-success-banner">
              <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Pronto, redirecionando!</p>
                <p className="text-xs text-white/70">Uma nova janela de chat no WhatsApp foi disparada. Se não abrir automaticamente, clique em fechar negócio novamente.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-start gap-3 animate-fade-in" id="form-error-banner">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="font-semibold text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" id="whatsapp-portfolio-form">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Field 1: Nome */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-name" className="text-xs md:text-sm font-semibold text-brand-white/90">
                  Qual é o seu nome? <span className="text-brand-gold">*</span>
                </label>
                <input 
                  type="text" 
                  id="form-name"
                  placeholder="Ex: João Silva"
                  className="w-full px-4 py-3.5 rounded-xl bg-brand-black/60 border border-brand-purple/30 text-brand-white placeholder-brand-white/30 focus:border-brand-gold-light focus:outline-none focus:ring-1 focus:ring-brand-gold-light/40 transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Field 2: Email ou Telefone */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-contact" className="text-xs md:text-sm font-semibold text-brand-white/90">
                  Seu E-mail ou Telefone <span className="text-brand-gold">*</span>
                </label>
                <input 
                  type="text" 
                  id="form-contact"
                  placeholder="Ex: joao@gmail.com ou (85) 99999-9999"
                  className="w-full px-4 py-3.5 rounded-xl bg-brand-black/60 border border-brand-purple/30 text-brand-white placeholder-brand-white/30 focus:border-brand-gold-light focus:outline-none focus:ring-1 focus:ring-brand-gold-light/40 transition-colors"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                />
              </div>

            </div>

            {/* Field 3: Tipo de Serviço */}
            <div className="flex flex-col gap-2">
              <label htmlFor="service-select" className="text-xs md:text-sm font-semibold text-brand-white/90">
                Que tipo de projeto você precisa? <span className="text-brand-gold">*</span>
              </label>
              <select
                id="service-select"
                className="w-full px-4 py-3.5 rounded-xl bg-brand-black border border-brand-purple/30 text-brand-white focus:border-brand-gold-light focus:outline-none focus:ring-1 focus:ring-brand-gold-light/40 transition-colors cursor-pointer"
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
              >
                {servicesList.map((serviceOption) => (
                  <option 
                    className="bg-brand-black text-brand-white" 
                    key={serviceOption.value} 
                    value={serviceOption.value}
                  >
                    {serviceOption.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Field: Brief message / contextual details */}
            <div className="flex flex-col gap-2">
              <label htmlFor="form-message" className="text-xs md:text-sm font-semibold text-brand-white/95">
                Conte brevemente sobre o seu projeto (Opcional)
              </label>
              <textarea 
                id="form-message"
                rows={4}
                placeholder="Ex: Quero criar um site institucional para minha clínica de estética..."
                className="w-full px-4 py-3.5 rounded-xl bg-brand-black/60 border border-brand-purple/30 text-brand-white placeholder-brand-white/30 focus:border-brand-gold-light focus:outline-none focus:ring-1 focus:ring-brand-gold-light/40 transition-colors resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* CTA Submit Button (Fechar negocio) */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-brand-black font-extrabold text-sm md:text-base uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-brand-gold/30 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 cursor-pointer animate-gold-silver"
                id="form-submit-cta"
              >
                <span>{isSubmitting ? 'Redirecionando...' : 'Fechar negócio'}</span>
                <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
              </button>
            </div>

          </form>

          {/* Trust and privacy badges */}
          <div className="mt-8 flex items-center justify-center gap-6 border-t border-brand-purple/20 pt-6 text-[10px] md:text-xs text-brand-white/40 font-medium">
            <span className="flex items-center gap-1.5">
              🛡️ Conexão Segura WhatsApp
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              ⚡ Retorno Rápido em até 2 horas
            </span>
          </div>

        </div>

      </div>
    </LightfallBackground>
  );
}
