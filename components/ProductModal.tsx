
import React, { useState } from 'react';
import { Tire } from '../types';

interface ProductModalProps {
  tire: Tire;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ tire, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const whatsappUrl = `https://wa.me/541112345678?text=Hola,%20estoy%20interesado%20en%20el%20neumático%20${tire.brand}%20${tire.model}%20medida%20${tire.width}/${tire.profile}%20R${tire.diameter}.%20¿Tienen%20stock?`;

  const handleCloseRequest = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all duration-500 cursor-pointer ${
        isClosing ? 'opacity-0 backdrop-blur-none' : 'opacity-100 animate-in fade-in'
      }`}
      onClick={handleCloseRequest}
    >
      <div 
        className={`bg-background-dark w-full max-w-[1150px] h-auto max-h-[95vh] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row relative border border-white/10 cursor-default transition-all duration-500 ${
          isClosing ? 'scale-95 opacity-0 translate-y-4' : 'scale-100 opacity-100 translate-y-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleCloseRequest}
          className="absolute top-8 right-8 z-[110] p-4 bg-white/10 hover:bg-primary hover:text-black text-white rounded-full transition-all duration-300 shadow-2xl"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Left: Gallery */}
        <div className="w-full md:w-3/5 p-12 bg-white flex flex-col items-center justify-center relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none"></div>
          
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}

          <div 
            className={`relative aspect-square w-full max-w-[550px] flex items-center justify-center transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)
              ${imageLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'} 
              ${isClosing ? 'scale-[0.85] opacity-0 transition-transform duration-500 ease-in-out' : ''}`}
          >
            <img 
              src={tire.image} 
              alt={tire.model} 
              onLoad={() => setImageLoaded(true)}
              className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-out hover:scale-110 cursor-zoom-in"
            />
          </div>
          <div className="absolute bottom-8 flex items-center gap-3 text-black/30 text-[10px] font-black uppercase tracking-[0.3em]">
            <span className="material-symbols-outlined text-base">zoom_in</span>
            Vista de alta resolución
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-2/5 p-12 flex flex-col bg-surface-dark overflow-y-auto custom-scrollbar">
          <div className="space-y-6 mb-12">
            <div className="flex flex-wrap gap-3">
              <span className="bg-primary text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 italic">Edición Premium</span>
              <span className="bg-white/5 border border-white/10 text-white/60 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">ac_unit</span> {tire.season}
              </span>
              {tire.status === 'low-stock' && (
                <span className="bg-amber-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 animate-pulse shadow-lg shadow-amber-500/20">
                  <span className="material-symbols-outlined text-xs">warning</span> Stock Bajo
                </span>
              )}
            </div>
            <h1 className="text-5xl font-black font-serif text-white leading-tight tracking-tight">{tire.brand} <span className="text-primary">{tire.model}</span></h1>
            <p className="text-white/30 text-xs tracking-[0.4em] font-black uppercase">Código SKU: {tire.brand.substring(0,3).toUpperCase()}-{tire.width}-{tire.diameter}X</p>
          </div>

          <div className="grid grid-cols-2 gap-y-12 gap-x-8 border-y border-white/5 py-12 mb-12">
            {[
              { label: 'Ancho de banda', value: `${tire.width} mm` },
              { label: 'Relación Perfil', value: `${tire.profile} %` },
              { label: 'Tipo Rodado', value: `R${tire.diameter}"` },
              { label: 'Construcción', value: `${tire.construction} Radial` },
              { label: 'Carga Máxima', value: `${tire.loadIndex} Lbs` },
              { label: 'Rango Velocidad', value: `${tire.speedRating} Max` },
            ].map((spec, i) => (
              <div key={i} className="space-y-2">
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] opacity-80">{spec.label}</span>
                <p className="text-xl font-black text-white">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-10">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Precio por unidad</span>
                <p className="text-5xl font-black text-white tracking-tighter">
                  ${tire.price.toLocaleString('es-CL')}
                </p>
              </div>
              <span className="text-xs font-bold text-white/40 mb-1">IVA Incluido</span>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
