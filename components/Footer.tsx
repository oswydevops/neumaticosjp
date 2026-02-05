
import React, { useState } from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}


const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'docs' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer className="relative bg-gradient-to-br from-surface-dark/80 via-background-dark/75 to-surface-dark/90 backdrop-blur-2xl border-t border-white/10 px-6 lg:px-40 pt-20 pb-10 overflow-hidden">
      {/* Decorative background glows for the blur effect visibility */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
        <div className="max-w-[1440px] mx-auto">
          {/* Bloques Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            
            {/* Bloque 1: Marca y Frase */}
            <div className="lg:col-span-2 space-y-6">
              <div 
                className="flex items-center gap-4 group cursor-pointer w-fit" 
                onClick={() => onNavigate('home')}
              >
                <div className="size-10 transform group-hover:scale-110 transition-transform flex items-center justify-center mt-1">
                  <img 
                    src="/icons/logoJP.svg" 
                    alt="Neumáticos JP Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<span class="material-symbols-outlined text-primary text-4xl">tire_repair</span>`;
                    }}
                  />
                </div>
                <h2 className="text-white/50 font-serif text-4xl font-bold italic cursor-pointer hover:text-primary transition-colors">JP TIRES</h2>
              </div>
              <p className="text-white/50 text-xl font-light leading-relaxed max-w-md italic">
                "Elevando tu experiencia de conducción al siguiente nivel de lujo y rendimiento..."
              </p>
            </div>

            {/* Bloque 2: Documentación y Sistema */}
            <div className="space-y-8">
              <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.4em] italic border-l-2 border-primary/30 pl-4">
                Recursos
              </h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <button 
                    onClick={() => setActiveModal('docs')}
                    className="text-white/40 hover:text-white transition-colors flex items-center gap-3 group font-outfit"
                  >
                    <span className="material-symbols-outlined text-xl group-hover:text-primary">description</span>
                    Guía de Usuario
                  </button>
                </li>
                
                <li>
                  <a 
                    href="mailto:misredes9900@gmail.com?subject=Soporte Técnico Sistema"
                    className="text-white/40 hover:text-white transition-colors flex items-center gap-3 group font-outfit"
                  >
                    <span className="material-symbols-outlined text-xl group-hover:text-primary">contact_support</span>
                    Soporte y Asistencia
                  </a>
                </li>
              </ul>
            </div>

            {/* Bloque 3: Acceso Rápido */}
            <div className="space-y-8">
              <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.4em] italic border-l-2 border-primary/30 pl-4">
                Información Legal
              </h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <button onClick={() => setActiveModal('terms')} className="text-white/40 hover:text-white transition-colors font-outfit">Términos y Condiciones</button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="text-white/40 hover:text-white transition-colors font-outfit">Política de Privacidad</button>
                </li>
              </ul>
            </div>
          </div>

          {/* Barra de Copyright y Redes Sociales */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] font-outfit text-center md:text-left">
              © 2026 JP TIRES, CANADÁ. TODOS LOS DERECHOS RESERVADOS. <span className="hidden sm:inline">|</span> <span className="italic text-white/10">EXCELENCIA AUTOMOTRIZ</span>
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
                  {activeModal === 'docs' ? 'Guía de Usuario' : activeModal === 'terms' ? 'Términos y Condiciones' : 'Política de Privacidad'}
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
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-widest italic">1. Garantía de Productos</h3>
                    <p className="text-white/60 text-sm leading-relaxed">Todos nuestros neumáticos cuentan con garantía oficial de fábrica contra defectos de fabricación por un periodo de 5 años desde la fecha de compra.</p>
                  </section>
                  <section className="space-y-3">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-widest italic">2. Devoluciones</h3>
                    <p className="text-white/60 text-sm leading-relaxed">Se aceptan cambios dentro de los 30 días posteriores a la compra, siempre que el neumático no haya sido montado ni rodado.</p>
                  </section>
                  <section className="space-y-3">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-widest italic">3. Precios y Stock</h3>
                    <p className="text-white/60 text-sm leading-relaxed">Los precios publicados están sujetos a cambios sin previo aviso. La disponibilidad de stock debe ser confirmada vía WhatsApp antes de concretar el pago.</p>
                  </section>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <section className="space-y-3">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-widest italic">Recolección de Datos</h3>
                    <p className="text-white/60 text-sm leading-relaxed">Neumáticos JP solo solicita datos de contacto básicos (Nombre y WhatsApp) para procesar sus consultas de presupuesto de forma personalizada.</p>
                  </section>
                  <section className="space-y-3">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-widest italic">Seguridad de la Información</h3>
                    <p className="text-white/60 text-sm leading-relaxed">Sus datos nunca serán compartidos con terceros con fines publicitarios. La información se utiliza exclusivamente para la relación comercial cliente-empresa.</p>
                  </section>
                </>
              )}

              {activeModal === 'docs' && (
                <>
                  <section className="space-y-4">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] italic">Guía de Usuario</h3>
                    <p className="text-white/60 leading-relaxed font-light">
                      Navega por nuestro catálogo premium utilizando los filtros laterales. Puedes buscar por marca, ancho, perfil o diámetro. Al seleccionar un neumático, se desplegará una ficha técnica detallada con acceso directo a WhatsApp para consulta de stock.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] italic">Gestión de Inventario</h3>
                    <p className="text-white/60 leading-relaxed font-light">
                      El panel de administración permite cargar nuevos productos, editar especificaciones técnicas y gestionar el stock en tiempo real. Los estados "Stock Bajo" y "Borrador" ayudan a mantener el catálogo actualizado para el cliente final.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] italic">Especificaciones Técnicas</h3>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3 font-outfit">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">Frontend Framework</span>
                        <span className="text-white">React 19 (ESM)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">Estilos</span>
                        <span className="text-white">Tailwind CSS v3.4</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">Iconografía</span>
                        <span className="text-white">Google Material Symbols</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">Tipografías</span>
                        <span className="text-white">Manrope, Playfair, Outfit</span>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>

            <div className="p-8 bg-white/[0.02] border-t border-white/5">
              <button onClick={closeModal} className="w-full h-14 rounded-2xl bg-primary text-black font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20 italic">
                Cerrar Ventana
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;