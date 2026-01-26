
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
                <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Precio de lista</span>
                <p className="text-5xl font-black text-white tracking-tighter">
                  ${tire.price.toLocaleString('es-CL')}
                </p>
              </div>
              <span className="text-xs font-bold text-white/40 mb-1">IVA Incluido</span>
            </div>
            
            <div className="flex flex-col gap-5">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#22bf5b] text-white py-6 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(37,211,102,0.2)] transition-all active:scale-[0.98] group"
              >
                <svg className="w-8 h-8 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                </svg>
                Contactar Vendedor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
