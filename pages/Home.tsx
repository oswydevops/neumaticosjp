
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
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.png" 
            alt="Luxury car in dark garage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-end">
          <div className="max-w-[800px] space-y-8 text-right">
            <h1 className="animate-gradient-text font-serif text-5xl md:text-8xl font-black leading-tight tracking-tight drop-shadow-2xl">
              Más que neumáticos, <br/> 
              <span className="text-primary italic">potencia</span> y seguridad <br/>
              para tu operación
            </h1>
            <p className="text-white/80 text-xl md:text-2xl font-light leading-relaxed italic ml-auto max-w-2xl">
              Excelencia en cada rodado. Estética premium para entusiastas del automovilismo y vehículos de alta gama.
            </p>
            <div className="pt-10 flex flex-wrap justify-end gap-6">
              <button 
                onClick={() => onNavigate('catalog')}
                className="inline-flex items-center justify-center min-w-[220px] h-16 bg-primary text-[#0A0A0A] rounded-lg text-lg font-bold tracking-tight hover:scale-105 hover:brightness-110 transition-all italic"
              >
                Ver Catálogo
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center min-w-[220px] h-16 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-lg text-lg font-bold tracking-tight hover:bg-white/20 transition-all italic"
              >
                Contactar Vendedor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="relative px-6 lg:px-40 py-32 bg-background-dark overflow-hidden">
        {/* Decorative background glows for blur effect visibility */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1440px] mx-auto space-y-20">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 className="text-white font-serif text-5xl font-bold tracking-tight">Nuestros Pilares</h2>
            <div className="h-1.5 w-24 bg-primary/40 rounded-full mx-auto md:mx-0"></div>
            <p className="text-white/60 italic text-xl font-light max-w-2xl">Calidad superior y atención especializada para tu vehículo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group flex flex-col gap-8 rounded-[2.5rem] border border-white/10 bg-surface-dark/40 backdrop-blur-xl p-10 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <div className="text-primary bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined text-4xl">star</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-white text-2xl font-bold">Ventas al Mayor</h3>
                <p className="text-white/50 text-lg leading-relaxed italic">También hacemos ventas al por mayor en contenedores.</p>
              </div>
            </div>

            <div className="group flex flex-col gap-8 rounded-[2.5rem] border border-white/10 bg-surface-dark/40 backdrop-blur-xl p-10 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <div className="text-primary bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined text-4xl">headset_mic</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-white text-2xl font-bold">Soporte Especializado</h3>
                <p className="text-white/50 text-lg leading-relaxed italic">Asesoramiento técnico personalizado brindado por el vendedor.</p>
              </div>
            </div>

            <div className="group flex flex-col gap-8 rounded-[2.5rem] border border-white/10 bg-surface-dark/40 backdrop-blur-xl p-10 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <div className="text-primary bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined text-4xl">format_list_bulleted</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-white text-2xl font-bold">Catálogo Extenso</h3>
                <p className="text-white/50 text-lg leading-relaxed italic">Variedad total de medidas y marcas disponibles para su camión o trailer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Ajustada para mezclar con el Footer */}
      <section className="px-6 lg:px-40 py-32 bg-gradient-to-b from-background-dark via-[#2f3e46] to-[#1b263b]/50 relative overflow-hidden">
        {/* Glow de fondo para la transición al footer */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
        
        <div 
          className="max-w-[1200px] mx-auto bg-gradient-to-br from-primary/10 via-surface-dark/40 to-primary/5 bg-[length:200%_200%] hover:bg-[100%_100%] border border-white/10 rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden group transition-all duration-1000 ease-in-out shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
        >
          {/* Brillos interactivos internos */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-[100px] group-hover:scale-125 group-hover:-translate-x-20 group-hover:translate-y-20 transition-all duration-1000 ease-in-out"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] group-hover:scale-150 group-hover:translate-x-20 group-hover:-translate-y-20 transition-all duration-1000 ease-in-out"></div>
          
          <div className="relative z-10 flex flex-col gap-10 items-center">
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-xs italic bg-primary/10 px-4 py-2 rounded-full">Atención Directa</span>
              <h2 className="text-white font-serif text-4xl md:text-7xl font-black max-w-4xl leading-tight drop-shadow-lg">
                ¿Buscas asesoramiento <br/> <span className="italic text-primary">para tu compra</span>?
              </h2>
            </div>
            
            <p className="text-white/70 text-xl  max-w-2xl font-light leading-relaxed">
              Habla directamente con nuestro vendedor especializado para obtener recomendaciones personalizadas y resolver todas tus dudas.
            </p>
            
            <button 
              onClick={() => onNavigate('contact')}
              className="group/btn relative flex min-w-[300px] cursor-pointer items-center justify-center rounded-2xl h-20 px-10 bg-primary text-[#0A0A0A] text-xl font-bold hover:scale-105 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 italic flex items-center gap-3">
                Contactar Vendedor
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
