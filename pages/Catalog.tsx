
import React, { useState, useMemo } from 'react';
import { Tire, FilterState } from '../types';
import { BRANDS, WIDTHS, PROFILES, DIAMETERS } from '../constants';

interface CatalogProps {
  tires: Tire[];
  onProductClick: (tire: Tire) => void;
}

const Catalog: React.FC<CatalogProps> = ({ tires, onProductClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    widths: [],
    profiles: [],
    diameters: [],
    brands: [],
    search: '',
  });

  const filteredTires = useMemo(() => {
    return tires.filter(tire => {
      const matchWidth = filters.widths.length === 0 || filters.widths.includes(tire.width.toString());
      const matchProfile = filters.profiles.length === 0 || filters.profiles.includes(tire.profile.toString());
      const matchDiameter = filters.diameters.length === 0 || filters.diameters.includes(tire.diameter.toString());
      const matchBrand = filters.brands.length === 0 || filters.brands.includes(tire.brand);
      const matchSearch = !filters.search || 
        tire.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        tire.model.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchWidth && matchProfile && matchDiameter && matchBrand && matchSearch && tire.status !== 'inactive';
    });
  }, [tires, filters]);

  const toggleFilter = (category: keyof Omit<FilterState, 'search'>, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: next };
    });
  };

  const removeFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      if (category === 'search') return { ...prev, search: '' };
      const current = prev[category] as string[];
      return { ...prev, [category]: current.filter(v => v !== value) };
    });
  };

  const clearFilters = () => {
    setFilters({
      widths: [],
      profiles: [],
      diameters: [],
      brands: [],
      search: '',
    });
  };

  const activeFiltersCount = filters.widths.length + filters.profiles.length + filters.diameters.length + filters.brands.length + (filters.search ? 1 : 0);
  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <div className="pt-28 pb-20 px-6 lg:px-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-[1440px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-6xl font-black font-serif text-white tracking-tight">Catálogo de Neumáticos</h1>
            <p className="text-white/60 text-xl font-monrope italic">Explora nuestra selección premium de neumáticos de alto rendimiento.</p>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center justify-center gap-3 bg-white/5 hover:bg-primary hover:text-black border border-white/10 hover:border-primary px-8 py-4 rounded-2xl transition-all duration-300 group shadow-xl"
          >
            <span className="material-symbols-outlined transition-transform group-hover:rotate-180">tune</span>
            <span className="font-black uppercase tracking-widest text-sm">Filtros</span>
            {hasActiveFilters && (
              <span className="bg-primary text-black group-hover:bg-black group-hover:text-primary size-6 rounded-full flex items-center justify-center text-[10px] font-black transition-colors">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sliding Sidebar Filters */}
        <aside className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-surface-dark z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-white/10 transition-transform duration-500 ease-expo ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-background-dark/50">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">filter_list</span>
                <h3 className="text-2xl font-black text-white tracking-tight font-serif">Configurar Búsqueda</h3>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="size-12 rounded-full hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary block mb-4">Palabra Clave</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    placeholder="Ej: Pilot Sport..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-base text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-12 placeholder:text-white/20"
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/20">search</span>
                </div>
              </div>

              <FilterGroup 
                label="Marcas de Élite" 
                options={BRANDS} 
                selected={filters.brands} 
                onToggle={(val) => toggleFilter('brands', val)} 
              />

              <div className="grid grid-cols-1 gap-12">
                <FilterGroup 
                  label="Ancho (mm)" 
                  options={WIDTHS} 
                  selected={filters.widths} 
                  onToggle={(val) => toggleFilter('widths', val)} 
                />

                <FilterGroup 
                  label="Perfil (%)" 
                  options={PROFILES} 
                  selected={filters.profiles} 
                  onToggle={(val) => toggleFilter('profiles', val)} 
                />

                <FilterGroup 
                  label="Diámetro (R)" 
                  options={DIAMETERS} 
                  selected={filters.diameters} 
                  onToggle={(val) => toggleFilter('diameters', val)} 
                  prefix="R"
                />
              </div>
            </div>

            <div className="p-8 border-t border-white/10 bg-background-dark/50 flex flex-col gap-4">
              <div className="flex items-center justify-between text-white/40 text-xs font-black uppercase tracking-widest px-1">
                <span>Resultados estimados</span>
                <span className="text-primary">{filteredTires.length}</span>
              </div>
              <div className="flex gap-4">
                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="flex-1 h-14 rounded-2xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 font-black text-xs uppercase tracking-widest transition-all"
                  >
                    Limpiar
                  </button>
                )}
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex-[2] h-14 rounded-2xl bg-primary text-black font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                >
                  Ver Resultados
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="space-y-10">
          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-4 bg-white/[0.03] p-6 rounded-[2rem] border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2 mr-2 border-r border-white/10 pr-6">
                <span className="material-symbols-outlined text-primary text-2xl">filter_alt</span>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.25em]">Activos</span>
              </div>
              {filters.search && (
                <FilterChip label={`"${filters.search}"`} onRemove={() => removeFilter('search', '')} />
              )}
              {filters.brands.map(v => <FilterChip key={v} label={v} onRemove={() => removeFilter('brands', v)} />)}
              {filters.widths.map(v => <FilterChip key={v} label={`${v} mm`} onRemove={() => removeFilter('widths', v)} />)}
              {filters.profiles.map(v => <FilterChip key={v} label={`${v}%`} onRemove={() => removeFilter('profiles', v)} />)}
              {filters.diameters.map(v => <FilterChip key={v} label={`R${v}`} onRemove={() => removeFilter('diameters', v)} />)}
              
              <button 
                onClick={clearFilters}
                className="text-[10px] font-black text-white/30 hover:text-primary transition-colors ml-auto uppercase tracking-[0.2em] border-b border-transparent hover:border-primary pb-1"
              >
                Borrar todo
              </button>
            </div>
          )}

          <div className="flex justify-between items-center px-2">
            <p className="text-white/40 text-xl font-monrope">
              Mostrando <span className="text-primary font-black text-xl ml-1">{filteredTires.length}</span> neumáticos seleccionados
            </p>
          </div>

          {filteredTires.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTires.map(tire => (
                <div 
                  key={tire.id}
                  onClick={() => onProductClick(tire)}
                  className="group flex flex-col bg-surface-dark border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(193,165,123,0.1)] transition-all duration-500 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] bg-white p-8 overflow-hidden flex items-center justify-center">
                    <img 
                      src={tire.image} 
                      alt={`${tire.brand} ${tire.model}`} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                    {tire.status === 'low-stock' && (
                      <div className="absolute top-6 left-6 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                        Stock Bajo
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-1 gap-5">
                    <div>
                      <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">{tire.brand}</p>
                      <h3 className="text-white text-xl font-bold font-serif leading-tight group-hover:text-primary transition-colors h-14 line-clamp-2">{tire.model}</h3>
                      <p className="text-pale-sky text-xs font-bold mt-2 bg-white/5 inline-block px-3 py-1 rounded-lg">
                        {tire.width}/{tire.profile} R{tire.diameter}
                      </p>
                    </div>
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/10">
                      <div className="flex flex-col">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Desde</span>
                        <span className="text-white font-black text-2xl">${tire.price.toLocaleString('es-CL')}</span>
                      </div>
                      {/* Botón icónico intuitivo */}
                      <div className="size-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm">
                        <span className="material-symbols-outlined text-2xl">visibility</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 bg-surface-dark rounded-[3rem] border border-dashed border-white/10 text-center space-y-8 shadow-inner">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-white/10">search_off</span>
              </div>
              <div className="space-y-2">
                <p className="text-white/60 text-2xl font-serif font-bold">Sin resultados precisos</p>
                <p className="text-white/30 text-lg max-w-sm mx-auto">No encontramos neumáticos con estas especificaciones exactas.</p>
              </div>
              <button onClick={clearFilters} className="bg-primary/10 text-primary px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-all">Restablecer búsqueda</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterGroup: React.FC<{ 
  label: string; 
  options: string[]; 
  selected: string[]; 
  onToggle: (val: string) => void;
  prefix?: string;
}> = ({ label, options, selected, onToggle, prefix = '' }) => (
  <div className="space-y-6">
    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary block border-l-2 border-primary/30 pl-3">{label}</label>
    <div className="grid grid-cols-2 gap-3">
      {options.map(option => (
        <button 
          key={option}
          onClick={() => onToggle(option)}
          className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 group ${
            selected.includes(option) 
              ? 'bg-primary border-primary text-black shadow-lg shadow-primary/10' 
              : 'bg-white/5 border-white/5 hover:border-white/20 text-white/40 hover:text-white/80'
          }`}
        >
          <div className={`size-5 rounded flex items-center justify-center transition-colors ${selected.includes(option) ? 'bg-black/20' : 'bg-white/10 group-hover:bg-white/20'}`}>
            {selected.includes(option) && <span className="material-symbols-outlined text-sm font-black">check</span>}
          </div>
          <span className="text-sm font-bold tracking-tight">
            {prefix}{option}
          </span>
        </button>
      ))}
    </div>
  </div>
);

const FilterChip: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
  <div className="flex items-center gap-5 bg-primary text-black pl-6 pr-2 py-2.5 rounded-full text-sm font-black shadow-2xl shadow-primary/20 hover:scale-105 hover:shadow-primary/40 transition-all duration-500 group/chip cursor-default border border-white/20">
    <span className="tracking-tighter whitespace-nowrap">{label}</span>
    <button 
      onClick={(e) => { e.stopPropagation(); onRemove(); }} 
      className="flex items-center justify-center w-9 h-9 rounded-full bg-black/10 hover:bg-black/30 transition-all group/close"
      aria-label={`Eliminar filtro ${label}`}
    >
      <span className="material-symbols-outlined text-2xl leading-none transition-transform group-hover/close:rotate-90">close</span>
    </button>
  </div>
);

export default Catalog;
