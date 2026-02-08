
import React, { useState } from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';

interface FooterProps {
  onNavigate: (page: Page) => void;
}


const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'docs' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer className="relative bg-gradient-to-br from-surface-dark/80 via-background-dark/75 to-surface-dark/90 backdrop-blur-2xl border-t border-white/10 px-4 sm:px-6 lg:px-40 pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-10 overflow-hidden">
      {/* Decorative background glows for the blur effect visibility */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
        <div className="max-w-[1440px] mx-auto">
          {/* Bloques Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-16 mb-12 md:mb-16 lg:mb-20 text-center md:text-left">
            
            {/* Bloque 1: Marca y Frase */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6 flex flex-col items-center md:items-start">
              <div 
                className="flex items-center gap-3 md:gap-4 group cursor-pointer w-fit justify-center md:justify-start" 
                onClick={() => onNavigate('home')}
              >
                <div className="size-8 md:size-10 transform group-hover:scale-110 transition-transform flex items-center justify-center mt-1">
                  <img 
                    src="/icons/logoJP.svg" 
                    alt="Neumáticos JP Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<span class="material-symbols-outlined text-primary text-3xl md:text-4xl">tire_repair</span>`;
                    }}
                  />
                </div>
                <h2 className="text-white/50 font-serif text-2xl md:text-3xl lg:text-4xl font-bold italic cursor-pointer hover:text-primary transition-colors">JP TIRES</h2>
              </div>
              <p className="text-white/50 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-md italic">
                {t.footer.brandDesc}
              </p>
            </div>

            {/* Bloque 2: Documentación y Sistema */}
            <div className="space-y-6 md:space-y-8 flex flex-col items-center md:items-start">
              <h4 className="text-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.35em] md:tracking-[0.4em] italic md:border-l-2 md:border-primary/30 pl-0 md:pl-4">
                {t.footer.resourcesTitle}
              </h4>
              <ul className="flex flex-col gap-3 md:gap-4">
                <li>
                  <button
                    onClick={() => setActiveModal('docs')}
                    className="text-white/40 hover:text-white transition-colors flex items-center gap-2 md:gap-3 group font-outfit text-sm md:text-base"
                  >
                    <span className="material-symbols-outlined text-lg md:text-xl group-hover:text-primary">description</span>
                    {t.footer.docs}
                  </button>
                </li>
                
                <li>
                  <a
                    href="mailto:misredes9900@gmail.com?subject=Soporte Técnico Sistema"
                    className="text-white/40 hover:text-white transition-colors flex items-center gap-2 md:gap-3 group font-outfit text-sm md:text-base"
                  >
                    <span className="material-symbols-outlined text-lg md:text-xl group-hover:text-primary">contact_support</span>
                    {t.footer.support}
                  </a>
                </li>
              </ul>
            </div>

            {/* Bloque 3: Acceso Rápido */}
            <div className="space-y-6 md:space-y-8 flex flex-col items-center md:items-start">
              <h4 className="text-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.35em] md:tracking-[0.4em] italic md:border-l-2 md:border-primary/30 pl-0 md:pl-4">
                {t.footer.legalTitle}
              </h4>
              <ul className="flex flex-col gap-3 md:gap-4">
                <li>
                  <button onClick={() => setActiveModal('terms')} className="text-white/40 hover:text-white transition-colors font-outfit text-sm md:text-base">{t.footer.terms}</button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="text-white/40 hover:text-white transition-colors font-outfit text-sm md:text-base">{t.footer.privacy}</button>
                </li>
              </ul>
            </div>
          </div>

          {/* Barra de Copyright y Redes Sociales */}
          <div className="pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-8">
            <p className="text-white/20 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] font-outfit text-center">
              {t.footer.rights} <span className="hidden sm:inline">|</span> <span className="block sm:inline italic text-white/10 mt-1 sm:mt-0">{t.footer.excellence}</span>
            </p>

            {/* REDES SOCIALES CON ICONOS LOCALES Y ENLACES */}
            <div className="flex items-center gap-8">
               <a 
                href="https://www.facebook.com/jean.plourde" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="opacity-20 hover:opacity-100 hover:scale-110 transition-all duration-300 w-6 h-6 flex items-center justify-center"
               >
                  <img 
                    src="/icons/facebook.svg" 
                    alt="Facebook" 
                    className="w-full h-full object-contain filter brightness-0 invert"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<span class="material-symbols-outlined text-white text-2xl">facebook</span>';
                    }}
                  />
               </a>
               <a 
                href="https://www.instagram.com/plourde91?igsh=MThzbXdtMnF3MmwzMQ%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="opacity-20 hover:opacity-100 hover:scale-110 transition-all duration-300 w-6 h-6 flex items-center justify-center"
               >
                  <img 
                    src="/icons/instagram.svg" 
                    alt="Instagram" 
                    className="w-full h-full object-contain filter brightness-0 invert"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<span class="material-symbols-outlined text-white text-2xl">photo_camera</span>';
                    }}
                  />
               </a>
               <a 
                href="https://www.tiktok.com/@jean_19800?_r=1&_t=ZS-93UQY5PE4Oq" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="opacity-20 hover:opacity-100 hover:scale-110 transition-all duration-300 w-6 h-6 flex items-center justify-center"
               >
                  <img 
                    src="/icons/tiktok.svg" 
                    alt="TikTok" 
                    className="w-full h-full object-contain filter brightness-0 invert"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<span class="material-symbols-outlined text-white text-2xl">smart_display</span>';
                    }}
                  />
               </a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALES LEGALES Y DOCUMENTACIÓN */}
      {activeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-background-dark backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-surface-dark w-full max-w-2xl rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">
                    {activeModal === 'docs' ? 'menu_book' : activeModal === 'terms' ? 'gavel' : 'shield_person'}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight font-serif italic capitalize">
                  {activeModal === 'docs' ? t.footer.modalDocsTitle : activeModal === 'terms' ? t.footer.modalTermsTitle : t.footer.modalPrivacyTitle}
                </h2>
              </div>
              <button onClick={closeModal} className="size-10 rounded-full hover:bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8 font-outfit">
              {activeModal === 'terms' && (
                <>
                  <section className="space-y-3">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-widest italic">{t.footer.modalTermsIntro}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{t.footer.modalTermsIntroText}</p>
                  </section>
                  <section className="space-y-3">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-widest italic">{t.footer.modalTermsUse}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{t.footer.modalTermsUseText1}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{t.footer.modalTermsUseText2}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{t.footer.modalTermsUseText3}</p>
                  </section>
                  <section className="space-y-3">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-widest italic">{t.footer.modalTermsPricing}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{t.footer.modalTermsPricingText}</p>
                  </section>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <section className="space-y-3">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-widest italic">{t.footer.modalPrivacyInfo}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{t.footer.modalPrivacyInfoPersonal}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{t.footer.modalPrivacyInfoContact}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{t.footer.modalPrivacyInfoAuto}</p>
                  </section>
                  
                  <section className="space-y-3">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-widest italic">{t.footer.modalPrivacySecurity}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{t.footer.modalPrivacySecurityText}</p>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-widest italic">{t.footer.modalPrivacyChanges}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{t.footer.modalPrivacyChangesText}</p>
                  </section>
                </>
              )}

              {activeModal === 'docs' && (
                <>
                  <section className="space-y-4">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] italic">{t.footer.modalDocsUserGuide}</h3>
                    <p className="text-white/60 leading-relaxed font-light">
                      {t.footer.modalDocsUserGuideText}
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] italic">{t.footer.modalDocsTechSpecs}</h3>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3 font-outfit">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">{t.footer.modalDocsFrontend}</span>
                        <span className="text-white">React 19 (ESM)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">{t.footer.modalDocsStyles}</span>
                        <span className="text-white">Tailwind CSS v3.4</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">{t.footer.modalDocsDatabase}</span>
                        <span className="text-white">Firebase</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">{t.footer.modalDocsVersion}</span>
                        <span className="text-white">v1.0.0 Beta</span>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>

            <div className="p-8 bg-white/[0.02] border-t border-white/5">
              <button onClick={closeModal} className="w-full h-14 rounded-2xl bg-primary text-black font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20 italic">
                {t.footer.closeWindow}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;