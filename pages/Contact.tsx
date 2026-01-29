
import React from 'react';

const Contact: React.FC = () => {
  const mapAddress = "1412 Bernier St Saint-Jean-sur-Richelieu,J2W 1G3, Quebec";
  const encodedAddress = encodeURIComponent(mapAddress);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const paymentMethods = [
    { name: 'Visa', iconPath: './public/icons/visa.svg' },
    { name: 'Mastercard', iconPath: './public/icons/mastercard.svg' },
    { name: 'PayPal', iconPath: './public/icons/paypal.svg' },
    { name: 'Transferencia', iconPath: './public/icons/bank.svg' },
    { name: 'Efectivo', iconPath: './public/icons/cash.svg' }
  ];

  return (
    <div className="pt-28 pb-20 px-6 lg:px-40 animate-in fade-in duration-500">
      <div className="max-w-[1440px] mx-auto space-y-16">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-6xl font-black font-serif text-white tracking-tight">Contacto  [JP TIRES]</h1>
          <p className="text-white text-xl max-w-2xl mx-auto italic">Experiencia premium en retail de neumáticos. Estamos aquí para asesorarte con la mejor calidad.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <a 
                href="tel:+14388266657" 
                className="group p-8 rounded-2xl bg-surface-dark/50 border border-white/10 hover:border-primary/50 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-4 text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">call</span>
                  <span className="text-sm uppercase font-black tracking-widest">Llámanos Ahora</span>
                </div>
                <p className="text-white text-2xl font-bold group-hover:text-primary transition-colors">+1 438-826-6657</p>
              </a>
              <a 
                href="mailto:ventas@neumaticosjp.com" 
                className="group p-8 rounded-2xl bg-surface-dark/50 border border-white/10 hover:border-primary/50 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-4 text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">mail</span>
                  <span className="text-sm uppercase font-black tracking-widest">Email Directo</span>
                </div>
                <p className="text-white text-xl font-bold group-hover:text-primary transition-colors truncate">Jean_plourde@hotmail.com</p>
              </a>
            </div>

            <div className="space-y-10 border-t border-white/10 pt-10">
              <div className="flex flex-col gap-4">
                <h4 className="text-primary text-sm uppercase font-black tracking-[0.3em]">Ubicación Central</h4>
                <p className="text-white text-3xl font-serif">{mapAddress}</p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-primary text-sm uppercase font-black tracking-[0.3em]">Horarios de Atención</h4>
                <div className="space-y-3">
                  <p className="text-white text-xl">Lunes a Viernes: 09:00 am — 19:00 pm</p>
                  <p className="text-white text-xl">Sábados: 09:00 am — 16:00 pm</p>
                  <p className="text-white text-xl">Domingos: Cerrado</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <h3 className="text-primary text-sm uppercase font-black tracking-[0.3em]">Aceptamos diferentes métodos de pago</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {paymentMethods.map((method, i) => (
                   <div key={i} className="flex flex-col items-center gap-3 group">
                     <div>
                        <img 
                          src={method.iconPath} 
                          alt={method.name}
                          className="w-[50px] h-[50px] object-contain filter brightness-100 invert group-hover:opacity-10 transition-opacity mr-16"
                          onError={(e) => {
                            // Fallback si la imagen local no existe (muestra el texto)
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML += `<span class="text-[10px] font-bold text-white/20">${method.name}</span>`;
                          }}
                        />
                     </div>
                     <span className="text-[10px] text-white uppercase font-black tracking-widest mr-16">
                       {method.name}
                     </span>
                   </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[500px] h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
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
              <div className="relative transform -translate-y-8">
                <div className="absolute -top-14 right-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-lg font-bold shadow-2xl whitespace-nowrap animate-bounce text-sm">
                  JP TIRES
                </div>
                <div className="size-6 bg-primary rounded-full border-4 border-white shadow-[0_0_20px_rgba(154,136,115,0.6)]"></div>
              </div>
            </div>
            
            {/* Overlay para forzar modo oscuro sobre los controles de google si aparecen blancos */}
            <div className="absolute top-4 right-4 bg-background-dark/80 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden md:block">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Quebec</p>
              <p className="text-white text-xs font-medium">Zona de Atención</p>
            </div>

            <div className="absolute bottom-8 right-8">
              <a 
                href={`https://www.google.com/maps/place/1412+Rue+Bernier,+Saint-Jean-sur-Richelieu,+QC+J2W+1G3,+Canad%C3%A1/@45.3486324,-73.3000457,103m/data=!3m1!1e3!4m15!1m8!3m7!1s0x4cc9a139b8f267b9:0xbce111f187300eea!2s1412+Rue+Bernier,+Saint-Jean-sur-Richelieu,+QC+J2W+1G3,+Canad%C3%A1!3b1!8m2!3d45.3486439!4d-73.299711!16s%2Fg%2F11c21y75mv!3m5!1s0x4cc9a139b8f267b9:0xbce111f187300eea!8m2!3d45.3486439!4d-73.299711!16s%2Fg%2F11c21y75mv?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D=${encodedAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm shadow-2xl hover:bg-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">directions</span>
                Cómo Llegar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

