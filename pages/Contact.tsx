
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-40 animate-in fade-in duration-500">
      <div className="max-w-[1440px] mx-auto space-y-16">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-6xl font-black font-serif text-white tracking-tight">Contacta a Neumáticos JP</h1>
          <p className="text-primary text-xl max-w-2xl mx-auto">Premium tire retail experience. Estamos aquí para asesorarte con la mejor calidad.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <a href="tel:+14388266657" className="group p-8 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-4 text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">call</span>
                  <span className="text-sm uppercase font-black tracking-widest">Llámanos</span>
                </div>
                <p className="text-white text-2xl font-bold group-hover:text-primary transition-colors">+1 438-826-6657</p>
              </a>
              <a href="mailto:contacto@neumaticosjp.com" className="group p-8 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-4 text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">mail</span>
                  <span className="text-sm uppercase font-black tracking-widest">Escríbenos</span>
                </div>
                <p className="text-white text-2xl font-bold group-hover:text-primary transition-colors truncate">jenad@hotmail.com</p>
              </a>
            </div>

            <div className="space-y-10 border-t border-white/10 pt-10">
              <div className="flex flex-col gap-4">
                <h4 className="text-primary text-sm uppercase font-black tracking-[0.3em]">Dirección</h4>
                <p className="text-white text-3xl font-serif">Av. del Libertador 4500, Palermo, CABA, Argentina</p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-primary text-sm uppercase font-black tracking-[0.3em]">Horarios de Atención</h4>
                <div className="space-y-2">
                  <p className="text-white text-xl">Lunes a Viernes: 09:00 am — 19:00 pm</p>
                  <p className="text-white text-xl">Sábados: 09:00 am — 16:00 pm</p>
                  <p className="text-white text-xl">Domingos: Cerrado</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <h3 className="text-white text-[20px] font-bold">Métodos de Pago</h3>
              <div className="flex gap-10">
                {['credit_card', 'payments', 'account_balance_wallet'].map((icon, i) => (
                   <div key={i} className="flex flex-col items-center gap-3">
                     <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-white/50">
                       <span className="material-symbols-outlined text-3xl">{icon}</span>
                     </div>
                     <span className="text-[10px] text-primary uppercase font-black tracking-widest">
                       {i === 0 ? 'Visa' : i === 1 ? 'Mastercard' : 'Efectivo'}
                     </span>
                   </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[600px] h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Simulation of a dark mode map using an image with an overlay */}
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE_akO1epHSFXbs13UDXxsPzeEFG5wAcWoWjT9O3yD7H8x6fvH32TckBlgsHluAxy5mppnzK_g4Yk0vL_S0w5tz9ecZggmO0AkFjBe6M3LaGCDLU3WNPIbkzd3el-NeFMQB8HdrEVaU95FZRE2Sj2vmx42NYfdiZo_2LIM66-tcEyvh3-iOinKNaRT4-0ElcahS11ZEcjh7FXvPVAu8Gz62jwL5dcjxxQ2GkUplIs6Jn0hXET464L73rg4M1Ye4HAqgbCys5x6AEA" 
              alt="Map location"
              className="w-full h-full object-cover grayscale invert brightness-50"
            />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded-lg font-bold shadow-2xl whitespace-nowrap animate-bounce">
                  Neumáticos JP
                </div>
                <div className="size-8 bg-primary rounded-full border-4 border-white shadow-[0_0_30px_rgba(193,165,123,0.8)]"></div>
              </div>
            </div>
            <div className="absolute bottom-8 right-8 flex flex-col gap-3">
              <button className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center shadow-2xl hover:bg-primary transition-colors"><span className="material-symbols-outlined">add</span></button>
              <button className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center shadow-2xl hover:bg-primary transition-colors"><span className="material-symbols-outlined">remove</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
