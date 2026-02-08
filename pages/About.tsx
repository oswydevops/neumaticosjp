
import React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/back.png" 
          alt="About Us Background"
          className="absolute inset-0 w-full h-full object-cover bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"
        />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif font-black mb-6 md:mb-8 drop-shadow-2xl">{t.about.heroTitle}</h1>
          <p className="text-white/90 text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed italic">
            {t.about.heroQuote}
          </p>
          <div className="mt-8 md:mt-12 flex justify-center">
            <div className="w-20 md:w-24 h-1.5 bg-primary rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-40 py-16 md:py-24 lg:py-32 space-y-16 md:space-y-24 lg:space-y-32">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <div className="space-y-3 md:space-y-4">
              <h6 className="text-primary font-black tracking-[0.25em] md:tracking-[0.3em] uppercase text-xs md:text-sm">{t.about.legacyTitle}</h6>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">{t.about.historyTitle}</h2>
            </div>
            <div className="space-y-4 md:space-y-6 text-white/70 text-base md:text-lg lg:text-xl leading-relaxed font-light">
              <p>
                {t.about.historyP1}
              </p>
              <p>
                {t.about.historyP2}
              </p>
            </div>
            <div className="flex flex-wrap gap-8 md:gap-12 pt-4 md:pt-6">
              <div><p className="text-3xl md:text-4xl font-black text-primary">20+</p><p className="text-xs md:text-sm text-pale-sky font-bold uppercase tracking-widest mt-2">{t.about.stats.years}</p></div>
              <div><p className="text-3xl md:text-4xl font-black text-primary">100%</p><p className="text-xs md:text-sm text-pale-sky font-bold uppercase tracking-widest mt-2">{t.about.stats.priceQuality}</p></div>
              <div><p className="text-3xl md:text-4xl font-black text-primary">100%</p><p className="text-xs md:text-sm text-pale-sky font-bold uppercase tracking-widest mt-2">{t.about.stats.quality}</p></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mt-8 md:mt-12 transform hover:scale-105 transition-transform duration-500">
              <img src="/images/caucho.jpg" className="w-full h-full object-cover" alt="Wheel detail" />
            </div>
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img src="/images/taller.jpg" className="w-full h-full object-cover" alt="Mechanic working" />
            </div>
          </div>
        </div>

        <div className="relative py-16 md:py-20 lg:py-24 border-y border-white/5 space-y-12 md:space-y-16 lg:space-y-20 overflow-hidden">
        {/* Decorative background glows for blur effect */}
          <div className="absolute top-1/2 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 md:space-y-6 px-4">
            <h6 className="text-primary font-black tracking-[0.25em] md:tracking-[0.3em] uppercase text-xs md:text-sm">{t.about.servicesTitle}</h6>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-bold">{t.about.servicesSubtitle}</h2>
            <p className="text-white/50 text-base md:text-lg lg:text-xl font-light leading-relaxed italic">{t.about.servicesDesc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: 'tire_repair', title: t.about.s1.title, desc: t.about.s1.desc },
              { icon: 'settings_suggest', title: t.about.s2.title, desc: t.about.s2.desc },
              { icon: 'support_agent', title: t.about.s3.title, desc: t.about.s3.desc },
              { icon: 'verified', title: t.about.s4.title, desc: t.about.s4.desc }
            ].map((s, idx) => (
              <div key={idx} className="group p-6 md:p-8 lg:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-surface-dark/40 backdrop-blur-xl border border-white/10 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 text-center space-y-4 md:space-y-6 shadow-2xl">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <span className="material-symbols-outlined text-3xl md:text-4xl">{s.icon}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-serif text-white">{s.title}</h3>
                <p className="text-white/40 text-base md:text-lg font-light leading-relaxed italic">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
