import { ExternalLink, Link2, CheckCircle2, Globe } from 'lucide-react';
import { PROJECTS } from '../data';
import { ShaderGradient } from './ShaderGradient';
import { AutoScrollDemo } from './AutoScrollDemo';

export default function Portfolio() {
  return (
    <section id="projects" className="py-24 px-4 md:px-8 bg-brand-black relative overflow-hidden">
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

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-purple-dark/60 border border-brand-purple/40 px-3 py-1 rounded-full text-brand-gold text-xs font-semibold mb-3">
            <Globe size={12} />
            TRABALHOS RECENTES
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-brand-white mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-brand-white/70 max-w-2xl mx-auto text-sm md:text-base">
            Conheça alguns dos projetos de alta fidelidade desenvolvidos sob medida para clientes reais.
          </p>
        </div>

        {/* Cinematic Auto-Scroll Demo - Recreates the requested Infinite Reels/Stories scrolling mockup with 3D tilt perspective */}
        <div className="mb-20 bg-brand-black/40 backdrop-blur-md rounded-3xl p-4 md:p-8 border border-brand-purple/20 shadow-2xl relative" id="featured-autoscroll-studio">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-purple/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl -z-10" />
          
          <AutoScrollDemo />
        </div>

        {/* Projects Grid / List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="projects-showcase-grid">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="group flex flex-col justify-between bg-gradient-to-b from-brand-purple-dark/50 to-brand-black border border-brand-purple/30 rounded-2xl overflow-hidden hover:border-brand-gold/60 hover:shadow-xl hover:shadow-brand-purple/10 transition-all duration-500 scale-100 hover:scale-[1.01]"
              id={`project-card-${project.id}`}
            >
              
              {/* Browser Mockup Header */}
              <div className="bg-brand-purple-dark p-3 px-4 border-b border-brand-purple/30 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                {/* Simulated URL bar */}
                <div className="flex items-center justify-center gap-1 bg-brand-black/40 px-4 py-0.5 rounded-md text-[10px] text-brand-white/40 font-mono w-48 truncate">
                  <Globe size={10} className="text-brand-gold/50" />
                  <span>{project.url.replace('https://', '')}</span>
                </div>
                <div className="w-4" /> {/* Spacer */}
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                
                <div>
                  {/* Category Badge & Stats Tag */}
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">
                      {project.category}
                    </span>
                    {project.stats && (
                      <span className="text-[10px] flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <CheckCircle2 size={10} />
                        {project.stats}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-heading font-extrabold text-brand-white tracking-tight group-hover:text-brand-gold transition-colors duration-300 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-xs md:text-sm text-brand-white/70 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tags and Link */}
                <div>
                  {/* Tags Panel */}
                  <div className="flex flex-wrap gap-1.5 mb-6" id={`tags-container-${project.id}`}>
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[10px] bg-brand-black text-brand-white/85 border border-brand-purple/20 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Direct Action Link */}
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-purple-dark text-brand-white hover:bg-brand-purple border border-brand-purple/60 hover:text-brand-gold-light hover:border-brand-gold/60 font-semibold text-xs md:text-sm transition-all duration-300"
                    id={`project-link-${project.id}`}
                  >
                    <span>Acessar Site Oficial</span>
                    <ExternalLink size={14} />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Call to action card */}
        <div className="mt-16 bg-gradient-to-r from-brand-purple-dark/60 via-[#2D1554]/40 to-brand-black p-8 rounded-2xl border border-brand-purple/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-heading font-bold text-brand-white mb-2">
              Quer um site de alta performance para a sua empresa?
            </h4>
            <p className="text-brand-white/60 text-sm max-w-xl">
              Assim como os projetos acima, eu posso desenhar e desenvolver uma landing page ou portal focado em atrair leads e faturar mais.
            </p>
          </div>
          <button
            onClick={() => window.open('https://api.whatsapp.com/send?phone=5585998504580&text=Ol%C3%A1%20Victor%21%20Estava%20vendo%20o%20seu%20portf%C3%B3lio%20de%20projetos%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20alta%20performance%20para%20a%20minha%20empresa.', '_blank')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple via-brand-gold to-brand-gold-light text-brand-white md:w-auto font-bold text-sm hover:from-brand-gold hover:to-brand-purple hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-md hover:shadow-brand-gold/30 animate-gradient-btn"
            id="portfolio-cta-btn"
          >
            Quero um orçamento
          </button>
        </div>

      </div>
    </section>
  );
}
