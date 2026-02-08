
import React from 'react';
import { useLanguage } from '../LanguageContext';

const Contact: React.FC = () => {
  const mapAddress = "1412 Bernier St Saint-Jean-sur-Richelieu,J2W 1G3, Quebec";
  const encodedAddress = encodeURIComponent(mapAddress);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const { t } = useLanguage();

  const paymentMethods = [
    { name: 'Visa', iconPath: '/icons/visa.svg' },
    { name: 'Mastercard', iconPath: '/icons/mastercard.svg' },
    { name: 'PayPal', iconPath: '/icons/paypal.svg' },
    { name: t.contact.transfer, iconPath: '/icons/bank.svg' },
    { name: t.contact.cash, iconPath: '/icons/cash.svg' }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-40 animate-in fade-in duration-500">
      <div className="max-w-[1440px] mx-auto space-y-12 md:space-y-16">
        <div className="flex flex-col gap-3 md:gap-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight">{t.contact.title} <span className="text-primary/80">[JP TIRES]</span>
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto italic">{t.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          <div className="space-y-6 md:space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              <a 
                href="tel:+14388266657" 
                className="group p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-surface-dark/35 border border-white/10 hover:border-primary/50 transition-all flex flex-col justify-between min-h-[120px] md:min-h-[140px] text-center md:text-left"
              >
                <div className="flex items-center gap-3 md:gap-4 text-primary mb-3 md:mb-6 justify-center md:justify-start">
                  <span className="material-symbols-outlined text-xl md:text-3xl">call</span>
                  <span className="text-[9px] md:text-sm uppercase font-black tracking-widest">{t.contact.callUs}</span>
                </div>
                <p className="text-white text-lg sm:text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">+1 438-826-6657</p>
              </a>
              <a 
                href="mailto:Jean_plourde@hotmail.com" 
                className="group p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-surface-dark/35 border border-white/10 hover:border-primary/50 transition-all flex flex-col justify-between min-h-[120px] md:min-h-[140px] text-center md:text-left"
              >
                <div className="flex items-center gap-3 md:gap-4 text-primary mb-3 md:mb-6 justify-center md:justify-start">
                  <span className="material-symbols-outlined text-xl md:text-3xl">mail</span>
                  <span className="text-[9px] md:text-sm uppercase font-black tracking-widest">{t.contact.email}</span>
                </div>
                <p className="text-white text-base sm:text-lg md:text-xl font-bold group-hover:text-primary transition-colors truncate">Jean_plourde@hotmail.com</p>
              </a>
            </div>

            <div className="space-y-6 md:space-y-10 border-t border-white/10 pt-6 md:pt-10">
              <div className="flex flex-col gap-2 md:gap-4 text-center md:text-left">
                <h4 className="text-primary text-[9px] md:text-sm uppercase font-black tracking-[0.25em] md:tracking-[0.3em]">{t.contact.showroom}</h4>
                <p className="text-white text-lg sm:text-xl md:text-3xl font-serif leading-relaxed">{mapAddress}</p>
              </div>
              <div className="flex flex-col gap-2 md:gap-4 text-center md:text-left">
                <h4 className="text-primary text-[9px] md:text-sm uppercase font-black tracking-[0.25em] md:tracking-[0.3em]">{t.contact.hours}</h4>
                <div className="space-y-2 md:space-y-3">
                  <p className="text-white text-base md:text-lg lg:text-xl">{t.contact.monday}: 09:00 am — 19:00 pm</p>
                  <p className="text-white text-base md:text-lg lg:text-xl">{t.contact.saturday}: 09:00 am — 16:00 pm</p>
                  <p className="text-white text-base md:text-lg lg:text-xl">{t.contact.sunday}: {t.contact.closed}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-8">
              <h3 className="text-primary text-[9px] md:text-sm uppercase font-black tracking-[0.25em] md:tracking-[0.3em] text-center md:text-left">{t.contact.paymentMethods}</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-8 justify-items-center">
                {paymentMethods.map((method, i) => (
                   <div key={i} className="flex flex-col items-center gap-1 md:gap-3 group">
                     <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
                        <img 
                          src={method.iconPath} 
                          alt={method.name}
                          className="w-full h-full object-contain filter brightness-100 invert group-hover:opacity-70 transition-opacity"
                          onError={(e) => {
                            // Fallback si la imagen local no existe (muestra el texto)
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML += `<span class="text-[10px] font-bold text-white/20">${method.name}</span>`;
                          }}
                        />
                     </div>
                     <span className="text-[8px] md:text-[10px] text-white uppercase font-black tracking-widest text-center">
                       {method.name}
                     </span>
                   </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[300px] md:min-h-[500px] h-full rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
            {/* Mapa Real con Filtro Dark Mode */}
            <iframe 
              src={mapUrl}
              className="w-full h-full border-0 grayscale  brightness-[0.4] contrast-[1.2] opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
            
            {/* Marcador personalizado flotante */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative transform -translate-y-6 md:-translate-y-8">
                <div className="absolute -top-10 md:-top-14 right-1/2 -translate-x-1/2 bg-white text-black px-3 md:px-4 py-2 rounded-lg font-bold shadow-2xl whitespace-nowrap animate-bounce text-xs md:text-sm">
                  JP TIRES
                </div>
                <div className="size-5 md:size-6 bg-primary rounded-full border-3 md:border-4 border-white shadow-[0_0_20px_rgba(154,136,115,0.6)]"></div>
              </div>
            </div>
            
            {/* Overlay para forzar modo oscuro sobre los controles de google si aparecen blancos */}
            <div className="absolute top-4 right-4 bg-background-dark/80 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden md:block">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Quebec</p>
              <p className="text-white text-xs font-medium">Zona de Atención</p>
            </div>

            <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8">
              <a 
                href={`https://www.google.com/maps/place/1412+Rue+Bernier,+Saint-Jean-sur-Richelieu,+QC+J2W+1G3,+Canad%C3%A1/@45.3486324,-73.3000457,103m/data=!3m1!1e3!4m15!1m8!3m7!1s0x4cc9a139b8f267b9:0xbce111f187300eea!2s1412+Rue+Bernier,+Saint-Jean-sur-Richelieu,+QC+J2W+1G3,+Canad%C3%A1!3b1!8m2!3d45.3486439!4d-73.299711!16s%2Fg%2F11c21y75mv!3m5!1s0x4cc9a139b8f267b9:0xbce111f187300eea!8m2!3d45.3486439!4d-73.299711!16s%2Fg%2F11c21y75mv?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D=${encodedAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:gap-3 bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm shadow-2xl hover:bg-primary transition-colors"
              >
                <span className="material-symbols-outlined text-xs md:text-sm">directions</span>
                {t.contact.openMaps}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

