
import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { Language } from '../translations';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const isAdminPage = currentPage === 'admin';

  const navItems: { label: string; value: Page }[] = [
    { label: t.nav.home, value: 'home' },
    { label: t.nav.catalog, value: 'catalog' },
    { label: t.nav.about, value: 'about' },
    { label: t.nav.contact, value: 'contact' },
  ];

  const currentLang = languageOptions.find(l => l.code === language) || languageOptions[0];

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-background-dark/80 border-b border-white/10 px-4 md:px-10 lg:px-20 py-4">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="size-15 transform group-hover:scale-110 transition-transform flex items-center justify-center">
            <img 
              src="/icons/logoJP.svg" 
              alt="Neumáticos JP Logo" 
              className="w-[40px] h-[40px] object-contain"
              onError={(e) => {
                // Fallback en caso de que la imagen local no exista aún
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="text-primary">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                  </div>
                `;
              }}
            />
          </div>
          <h2 className="text-white text-3xl font-serif font-bold tracking-tight ml-3">JP TIRES</h2>
        </div>

        {/* Desktop Nav */}
        {!isAdminPage && (
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => onNavigate(item.value)}
              className={`text-xl font-medium transition-colors hover:text-primary ${
                currentPage === item.value ? 'text-primary' : 'text-white/70'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        )}

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
            >
              <span className="text-lg">{currentLang.flag}</span>
              <span className="hidden sm:inline text-white/80 text-sm font-medium">{currentLang.code.toUpperCase()}</span>
              <span className="material-symbols-outlined text-white/60 text-sm transition-transform duration-200" style={{ transform: isLangMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                expand_more
              </span>
            </button>
            
            {isLangMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-surface-dark border border-white/10 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      language === lang.code 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.label}</span>
                    {language === lang.code && (
                      <span className="material-symbols-outlined text-primary text-sm ml-auto">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!isAdminPage && (
          <>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          
          </button>
          </>
          )}
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {!isAdminPage && isMenuOpen && (
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
        </div>
      )}
    </header>
  );
};

export default Navbar;
