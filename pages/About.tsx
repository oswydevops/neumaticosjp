
import React from 'react';
import { Page } from '../types';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/public/back.png" 
          alt="About Us Background"
          className="absolute inset-0 w-full h-full object-cover bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-white text-6xl md:text-8xl font-serif font-black mb-8 drop-shadow-2xl">Quiénes Somos</h1>
          <p className="text-white/90 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed italic">
            "Compromiso con la excelencia en neumáticos premium y servicio automotriz de alta gama."
          </p>
          <div className="mt-12 flex justify-center">
            <div className="w-24 h-1.5 bg-primary rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-40 py-32 space-y-32">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h6 className="text-primary font-black tracking-[0.3em] uppercase text-sm">Legado y Pasión</h6>
              <h2 className="text-5xl md:text-6xl font-serif text-white font-bold leading-tight">Nuestra Historia</h2>
            </div>
            <div className="space-y-6 text-white/70 text-xl leading-relaxed font-light">
              <p>
                Desde nuestros inicios en 1992, Neumáticos JP se ha destacado por ofrecer soluciones de movilidad con los más altos estándares de calidad. Lo que comenzó como un pequeño taller especializado se ha transformado en el referente indiscutible del sector premium.
              </p>
              <p>
                Nuestra trayectoria está marcada por la pasión automotriz y el compromiso inquebrantable con la seguridad. Entendemos que el neumático es el único punto de contacto entre su vehículo y el camino.
              </p>
            </div>
            <div className="flex flex-wrap gap-12 pt-6">
              <div><p className="text-4xl font-black text-primary">20+</p><p className="text-sm text-pale-sky font-bold uppercase tracking-widest mt-2">Años de Exp.</p></div>
              <div><p className="text-4xl font-black text-primary">100%</p><p className="text-sm text-pale-sky font-bold uppercase tracking-widest mt-2">Calidad-Precio</p></div>
              <div><p className="text-4xl font-black text-primary">100%</p><p className="text-sm text-pale-sky font-bold uppercase tracking-widest mt-2">Calidad Certificada</p></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 h-[500px]">
            <div className="rounded-3xl overflow-hidden shadow-2xl mt-12 transform hover:scale-105 transition-transform duration-500">
              <img src="/public/images/caucho.jpg" className="w-full h-full object-cover" alt="Wheel detail" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img src="/public/images/taller.jpg" className="w-full h-full object-cover" alt="Mechanic working" />
            </div>
          </div>
        </div>

        <div className="relative py-24 border-y border-white/5 space-y-20 overflow-hidden">
        {/* Decorative background glows for blur effect */}
          <div className="absolute top-1/2 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
            <h6 className="text-primary font-black tracking-[0.3em] uppercase text-sm">Especialización</h6>
            <h2 className="text-5xl font-serif text-white font-bold">Expertos en lo que hacemos</h2>
            <p className="text-white/50 text-xl font-light leading-relaxed italic">Ofrecemos un ecosistema y amplio catálogo diseñado para mantener la integridad y el confort de su camión.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'tire_repair', title: 'Ventas', desc: 'Distribución oficial de marcas líderes mundiales como Michelin, Pirelli y Continental.' },
              { icon: 'settings_suggest', title: 'Calidad', desc: 'Productos certificados que cumplen con los estándares más exigentes de seguridad y rendimiento.' },
              { icon: 'support_agent', title: 'Asesoría Técnica', desc: 'Consultores especializados que analizan su perfil de conducción antes de recomendar.' },
              { icon: 'verified', title: 'Garantía Oficial', desc: 'Soporte oficial del fabricante y garantía extendida en todo nuestro catálogo.' }
            ].map((s, idx) => (
              <div key={idx} className="group p-10 rounded-[2.5rem] bg-surface-dark/40 backdrop-blur-xl border border-white/10 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 text-center space-y-6 shadow-2xl">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <span className="material-symbols-outlined text-4xl">{s.icon}</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-white">{s.title}</h3>
                <p className="text-white/40 text-lg font-light leading-relaxed italic">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
