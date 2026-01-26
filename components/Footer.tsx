
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-background-dark border-t border-white/10 px-6 lg:px-40 py-20">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16 items-center text-center">
        <div className="flex flex-col items-center gap-6 group cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="text-primary size-12 group-hover:scale-110 transition-transform">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-white font-serif text-3xl font-bold">Neumáticos JP</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-x-16 gap-y-6">
          <button onClick={() => onNavigate('home')} className="text-white/40 hover:text-primary transition-colors text-lg uppercase font-bold tracking-[0.2em]">Inicio</button>
          <button onClick={() => onNavigate('catalog')} className="text-white/40 hover:text-primary transition-colors text-lg uppercase font-bold tracking-[0.2em]">Catálogo</button>
          <button onClick={() => onNavigate('contact')} className="text-white/40 hover:text-primary transition-colors text-lg uppercase font-bold tracking-[0.2em]">Contacto</button>
          <button onClick={() => onNavigate('about')} className="text-white/40 hover:text-primary transition-colors text-lg uppercase font-bold tracking-[0.2em]">Nosotros</button>
        </div>

        <div className="flex gap-10">
          <a href="#" className="text-white/40 hover:text-primary hover:scale-125 transition-all">
            <span className="material-symbols-outlined text-4xl">photo_camera</span>
          </a>
          <a href="#" className="text-white/40 hover:text-primary hover:scale-125 transition-all">
            <span className="material-symbols-outlined text-4xl">public</span>
          </a>
          <a href="#" className="text-white/40 hover:text-primary hover:scale-125 transition-all">
            <span className="material-symbols-outlined text-4xl">chat</span>
          </a>
        </div>

        <div className="space-y-6">
          <p className="text-white/30 text-base font-light tracking-wide max-w-lg mx-auto leading-relaxed">
            Lunes-Viernes 9:00 - 18:00 | Sábados 9:00 - 13:00<br/>
            Av. del Libertador 4500, Palermo, CABA.
          </p>
          <p className="text-white/10 text-xs uppercase tracking-[0.4em]">
            © 2024 NEUMÁTICOS JP. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
