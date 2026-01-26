
import React, { useState } from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Inicio', value: 'home' },
    { label: 'Catálogo', value: 'catalog' },
    { label: 'Nosotros', value: 'about' },
    { label: 'Contacto', value: 'contact' },
  ];

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-background-dark/80 border-b border-white/10 px-4 md:px-10 lg:px-20 py-4">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="text-primary size-8 transform group-hover:scale-110 transition-transform">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-white text-xl font-serif font-bold tracking-tight">Neumáticos JP</h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => onNavigate(item.value)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === item.value ? 'text-primary' : 'text-white/70'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('admin')}
            className="hidden lg:flex items-center justify-center rounded-lg h-10 px-5 border border-white/10 text-white/50 text-sm hover:text-white hover:bg-white/5 transition-all"
          >
            Admin
          </button>
          <button 
            onClick={() => onNavigate('contact')}
            className="hidden sm:flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-[#0A0A0A] text-sm font-bold tracking-wide hover:brightness-110 transition-all"
          >
            Contactar
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface-dark border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onNavigate(item.value);
                setIsMenuOpen(false);
              }}
              className={`text-lg font-medium text-left transition-colors ${
                currentPage === item.value ? 'text-primary' : 'text-white/70'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
             onClick={() => {
               onNavigate('admin');
               setIsMenuOpen(false);
             }}
             className="text-lg font-medium text-left text-white/40"
          >
            Panel de Control
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
