
import React from 'react';
import { Page, Tire } from '../types';


interface HomeProps {
  onNavigate: (page: Page) => void;
  onProductClick: (tire: Tire) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/public/hero.png" 
            alt="Luxury car in dark garage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-[1200px] space-y-8 md:w-2xl">
          <h1 className="text-white font-serif text-6xl md:text-8xl font-black leading-tight tracking-tight drop-shadow-2xl">
            Más que neumáticos, potencia y seguridad para tu operación
          </h1>
          <p className="text-white/80 text-xl md:text-2xl font-light leading-relaxed  mx-auto italic">
            Somos tu aliado de confianza para la seguridad de tu flota y de tu camión. Especializados en neumáticos para camiones y trailers, ofrecemos productos de calidad y asesoramiento técnico.
          </p>
          <div className="pt-10 flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => onNavigate('catalog')}
              className="inline-flex items-center justify-center min-w-[220px] h-16 bg-primary text-[#0A0A0A] rounded-lg text-lg font-bold tracking-tight hover:scale-105 hover:brightness-110 transition-all"
            >
              Ver Catálogo
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center min-w-[220px] h-16 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg text-lg font-bold tracking-tight hover:bg-white/20 transition-all"
            >
              Contactar Vendedor
            </button>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="px-6 lg:px-40 py-32 bg-background-dark">
        <div className="max-w-[1440px] mx-auto space-y-20">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 className="text-white font-serif text-5xl font-bold tracking-tight">Nuestros Pilares</h2>
            <div className="h-1.5 w-24 bg-primary/40 rounded-full mx-auto md:mx-0"></div>
            <p className="text-white/60 text-xl font-light italic max-w-2xl">Calidad superior y atención especializada para tu vehículo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group flex flex-col gap-8 rounded-2xl border border-white/10 bg-surface-dark p-10 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2">
              <div className="text-primary bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined text-4xl">star</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-white text-2xl font-bold">Calidad Premium</h3>
                <p className="text-white/50 text-lg leading-relaxed">Solo las mejores marcas del mercado internacional seleccionadas para el máximo rendimiento y seguridad.</p>
              </div>
            </div>

            <div className="group flex flex-col gap-8 rounded-2xl border border-white/10 bg-surface-dark p-10 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2">
              <div className="text-primary bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined text-4xl">headset_mic</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-white text-2xl font-bold">Soporte Especializado</h3>
                <p className="text-white/50 text-lg leading-relaxed">Asesoramiento técnico personalizado brindado por el vendedor.</p>
              </div>
            </div>

            <div className="group flex flex-col gap-8 rounded-2xl border border-white/10 bg-surface-dark p-10 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2">
              <div className="text-primary bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined text-4xl">format_list_bulleted</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-white text-2xl font-bold">Catálogo Extenso</h3>
                <p className="text-white/50 text-lg leading-relaxed">Variedad total de medidas para autos deportivos, camionetas, camiones de cargas y SUVs de lujo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-40 py-32 bg-gradient-to-b from-background-dark to-[#151515]">
        <div className="max-w-[1200px] mx-auto bg-primary/5 border border-primary/20 rounded-[32px] p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-700"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-700"></div>
          
          <div className="relative z-10 flex flex-col gap-10 items-center">
            <h2 className="text-white font-serif text-4xl md:text-6xl font-black max-auto leading-tight">
              ¿Buscas asesoramiento para la compra?
            </h2>
            <p className="text-white/70 text-xl md:text-2xl max-w-3xl font-light">
              Habla directamente con nuestro vendedor, especializado para ayudarte a encontrar la mejor opción para tu estilo de conducción.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="flex min-w-[230px] cursor-pointer items-center justify-center rounded-xl h-16 px-10 bg-primary text-[#0A0A0A] text-xl font-bold hover:scale-105 hover:brightness-110 transition-all animate-bounce"
            >
              Contactar Vendedor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
