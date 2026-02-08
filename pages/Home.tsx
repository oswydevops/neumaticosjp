
import React from 'react';
import { Page, Tire } from '../types';
import { useLanguage } from '../LanguageContext';



interface HomeProps {
  onNavigate: (page: Page) => void;
  onProductClick: (tire: Tire) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-20 px-4 md:px-6 lg:px-10">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.png" 
            alt="Luxury car in dark garage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center md:items-end">
          <div className="max-w-[800px] space-y-6 md:space-y-8 text-center md:text-right px-4">
            <h1 className="animate-gradient-text font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-tight tracking-tight drop-shadow-2xl">
              {t.hero.title}
            </h1>
            <p className="text-white/80 text-lg sm:text-xl md:text-2xl font-light leading-relaxed italic mx-auto md:ml-auto max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="pt-6 md:pt-10 flex flex-col sm:flex-row flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              <button
                onClick={() => onNavigate('catalog')}
                className="inline-flex items-center justify-center w-full sm:w-auto sm:min-w-[200px] md:min-w-[220px] h-14 md:h-16 bg-primary text-[#0A0A0A] rounded-lg text-base md:text-lg font-bold tracking-tight hover:scale-105 hover:brightness-110 transition-all italic"
              >
                {t.hero.viewCatalog}
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center w-full sm:w-auto sm:min-w-[200px] md:min-w-[220px] h-14 md:h-16 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-lg text-base md:text-lg font-bold tracking-tight hover:bg-white/20 transition-all italic"
              >
                {t.hero.contactVendor}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="relative px-4 sm:px-6 lg:px-40 py-16 md:py-24 lg:py-32 bg-background-dark overflow-hidden">
        {/* Decorative background glows for blur effect visibility */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1440px] mx-auto space-y-12 md:space-y-16 lg:space-y-20">
          <div className="flex flex-col gap-4 md:gap-6 text-center md:text-left">
            <h2 className="text-white font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{t.home.pillars.title}</h2>
            <div className="h-1.5 w-20 md:w-24 bg-primary/40 rounded-full mx-auto md:mx-0"></div>
            <p className="text-white/60 italic text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto md:mx-0">{t.home.pillars.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="group flex flex-col gap-6 md:gap-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-surface-dark/40 backdrop-blur-xl p-6 md:p-8 lg:p-10 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <div className="text-primary bg-primary/10 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined text-3xl md:text-4xl">star</span>
              </div>
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-white text-xl md:text-2xl font-bold">{t.home.pillars.wholesale.title}</h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed italic">{t.home.pillars.wholesale.desc}</p>
              </div>
            </div>

            <div className="group flex flex-col gap-6 md:gap-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-surface-dark/40 backdrop-blur-xl p-6 md:p-8 lg:p-10 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <div className="text-primary bg-primary/10 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined text-3xl md:text-4xl">headset_mic</span>
              </div>
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-white text-xl md:text-2xl font-bold">{t.home.pillars.support.title}</h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed italic">{t.home.pillars.support.desc}</p>
              </div>
            </div>

            <div className="group flex flex-col gap-6 md:gap-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-surface-dark/40 backdrop-blur-xl p-6 md:p-8 lg:p-10 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 shadow-2xl md:col-span-2 lg:col-span-1">
              <div className="text-primary bg-primary/10 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined text-3xl md:text-4xl">format_list_bulleted</span>
              </div>
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-white text-xl md:text-2xl font-bold">{t.home.pillars.catalog.title}</h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed italic">{t.home.pillars.catalog.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Ajustada para mezclar con el Footer */}
      <section className="px-4 sm:px-6 lg:px-40 py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background-dark via-[#2f3e46] to-[#1b263b]/50 relative overflow-hidden">
        {/* Glow de fondo para la transición al footer */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
        
        <div 
          className="max-w-[1200px] mx-auto bg-gradient-to-br from-primary/10 via-surface-dark/40 to-primary/5 bg-[length:200%_200%] hover:bg-[100%_100%] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[40px] p-8 sm:p-10 md:p-16 lg:p-24 text-center relative overflow-hidden group transition-all duration-1000 ease-in-out shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
        >
          {/* Brillos interactivos internos */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-[100px] group-hover:scale-125 group-hover:-translate-x-20 group-hover:translate-y-20 transition-all duration-1000 ease-in-out"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] group-hover:scale-150 group-hover:translate-x-20 group-hover:-translate-y-20 transition-all duration-1000 ease-in-out"></div>
          
          <div className="relative z-10 flex flex-col gap-6 md:gap-8 lg:gap-10 items-center">
            <div className="space-y-3 md:space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs italic bg-primary/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full">{t.home.cta.badge}</span>
              <h2 className="text-white font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black max-w-4xl leading-tight drop-shadow-lg">
                {t.home.cta.title}
              </h2>
            </div>
            
            <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed px-4">
              {t.home.cta.description}
            </p>
            
            <button
              onClick={() => onNavigate('contact')}
              className="group/btn relative flex w-full sm:w-auto sm:min-w-[280px] md:min-w-[300px] cursor-pointer items-center justify-center rounded-xl md:rounded-2xl h-16 md:h-20 px-8 md:px-10 bg-primary text-[#0A0A0A] text-lg md:text-xl font-bold hover:scale-105 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 italic flex items-center gap-3">
                {t.home.cta.button}
                <span className="material-symbols-outlined group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
