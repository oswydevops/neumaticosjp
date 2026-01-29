
import React, { useState, useRef } from 'react';
import { Tire } from '../types';
import { BRANDS } from '../constants';

interface AdminDashboardProps {
  tires: Tire[];
  setTires: React.Dispatch<React.SetStateAction<Tire[]>>;
}

const SPEED_RATINGS = ['Q', 'R', 'S', 'T', 'H', 'V', 'W', 'Y', '(Y)'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ tires, setTires }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tireToDelete, setTireToDelete] = useState<Tire | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Tire>>({
    brand: 'Michelin',
    model: '',
    width: 205,
    profile: 55,
    diameter: 16,
    construction: 'R',
    loadIndex: 91,
    speedRating: 'V',
    price: 0,
    image: '',
    season: 'all-season',
    status: 'active',
    stock: 0
  });

  const resetForm = () => {
    setFormData({
      brand: 'Michelin',
      model: '',
      width: 205,
      profile: 55,
      diameter: 16,
      construction: 'R',
      loadIndex: 91,
      speedRating: 'V',
      price: 0,
      image: '',
      season: 'all-season',
      status: 'active',
      stock: 0
    });
    setImagePreview(null);
    setEditingId(null);
  };

  const openAddModal = () => {
    setModalMode('add');
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (tire: Tire) => {
    setModalMode('edit');
    setEditingId(tire.id);
    setFormData(tire);
    setImagePreview(tire.image);
    setIsModalOpen(true);
  };

  const openDeleteModal = (tire: Tire) => {
    setTireToDelete(tire);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (tireToDelete) {
      setTires(prev => prev.filter(t => t.id !== tireToDelete.id));
      setIsDeleteModalOpen(false);
      setTireToDelete(null);
    }
  };

  const toggleStatus = (id: string) => {
    setTires(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'inactive' ? 'active' : 'inactive' };
      }
      return t;
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumber = ['width', 'profile', 'diameter', 'loadIndex', 'stock'].includes(name);
    setFormData(prev => ({
      ...prev,
      [name]: isNumber ? Number(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Por favor, selecciona una imagen para el neumático.');
      return;
    }

    if (modalMode === 'edit' && editingId) {
      setTires(prev => prev.map(t => t.id === editingId ? { ...formData as Tire, id: editingId } : t));
    } else {
      const tireToAdd: Tire = {
        ...formData as Tire,
        id: Date.now().toString(),
      };
      setTires(prev => [tireToAdd, ...prev]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div className="pt-28 pb-20 px-6 lg:px-40 animate-in fade-in duration-500">
      <div className="max-w-[1440px] mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">Panel de Inventario</h1>
            <p className="text-pale-sky">Control total de stock, ediciones y bajas del catálogo.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center justify-center rounded-xl h-14 px-8 bg-primary text-black gap-3 text-lg font-bold shadow-xl shadow-primary/20 hover:brightness-110 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">add</span>
            Añadir Neumático
          </button>
        </div>

        {/* Modal de Confirmación de Eliminación */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-[#1a1a1a] w-full max-w-md rounded-[2.5rem] border border-red-500/20 shadow-[0_0_100px_rgba(239,68,68,0.15)] p-8 text-center space-y-6">
              <div className="size-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">delete_forever</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">¿Borrar Registro?</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Estás a punto de eliminar <strong className="text-white">{tireToDelete?.brand} {tireToDelete?.model}</strong>.<br/> Esta acción es irreversible.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 h-14 rounded-2xl bg-white/5 text-white/60 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 h-14 rounded-2xl bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                >
                  Sí, Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Formulario (Alta y Edición) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-surface-dark w-full max-w-4xl rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">
                      {modalMode === 'edit' ? 'edit_note' : 'tire_repair'}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    {modalMode === 'edit' ? 'Actualizar Producto' : 'Nuevo Neumático'}
                  </h2>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="size-10 rounded-full hover:bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary">Imagen</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative aspect-square rounded-[2rem] border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center group ${
                        imagePreview ? 'border-primary/50' : 'border-white/10 hover:border-primary/30 bg-white/[0.02]'
                      }`}
                    >
                      {imagePreview ? (
                        <>
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-8" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold text-sm uppercase tracking-widest">Cambiar</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center space-y-4 p-8">
                          <span className="material-symbols-outlined text-5xl text-white/10 group-hover:text-primary transition-colors">add_a_photo</span>
                          <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Subir Imagen</p>
                        </div>
                      )}
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Marca</label>
                        <select name="brand" value={formData.brand} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-4 text-white focus:border-primary outline-none">
                          {BRANDS.map(b => <option key={b} value={b} className="bg-surface-dark">{b}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Modelo</label>
                        <input required type="text" name="model" value={formData.model} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-4 text-white focus:border-primary outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Velocidad</label>
                        <select name="speedRating" value={formData.speedRating} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-4 text-white focus:border-primary outline-none font-bold">
                          {SPEED_RATINGS.map(r => <option key={r} value={r} className="bg-surface-dark">{r}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Stock</label>
                        <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-4 text-white focus:border-primary outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/5 pb-2">Especificaciones Técnicas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/50">Ancho (mm)</label>
                      <input type="number" name="width" value={formData.width} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/50">Perfil (%)</label>
                      <input type="number" name="profile" value={formData.profile} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/50">Diámetro (R)</label>
                      <input type="number" name="diameter" value={formData.diameter} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/50">Índice Carga</label>
                      <input type="number" name="loadIndex" value={formData.loadIndex} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white outline-none" />
                    </div>
                  </div>
                </div>
              </form>

              <div className="p-8 border-t border-white/5 bg-white/[0.02] flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-14 rounded-2xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 font-black text-xs uppercase tracking-widest transition-all">Cancelar</button>
                <button onClick={handleSubmit} className="flex-[2] h-14 rounded-2xl bg-primary text-black font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                  {modalMode === 'edit' ? 'Guardar Cambios' : 'Confirmar Alta'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de Gestión */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-dark shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-8 py-5 text-primary text-xs font-black uppercase tracking-[0.2em]">Producto</th>
                <th className="px-8 py-5 text-primary text-xs font-black uppercase tracking-[0.2em]">Medidas</th>
                <th className="px-8 py-5 text-primary text-xs font-black uppercase tracking-[0.2em]">Stock</th>
                <th className="px-8 py-5 text-primary text-xs font-black uppercase tracking-[0.2em] text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tires.map(tire => (
                <tr key={tire.id} className={`hover:bg-white/[0.02] transition-colors ${tire.status === 'inactive' ? 'opacity-40 grayscale' : ''}`}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-lg bg-white border border-white/10 p-1 flex-shrink-0 shadow-sm">
                        <img src={tire.image} alt={tire.model} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-bold">{tire.brand}</span>
                        <span className="text-white/40 text-[10px] uppercase tracking-widest">{tire.model}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs text-pale-sky font-bold bg-white/5 px-2 py-1 rounded">
                      {tire.width}/{tire.profile} R{tire.diameter}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-sm font-bold ${tire.stock < 10 ? 'text-amber-500' : 'text-white'}`}>
                      {tire.stock} unidades
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-6">
                      <button 
                        onClick={() => openEditModal(tire)}
                        className="text-white/40 hover:text-primary transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                      >
                        <span className="material-symbols-outlined text-xl">edit</span>
                        Editar
                      </button>
                      <button 
                        onClick={() => toggleStatus(tire.id)}
                        className={`text-[10px] font-black uppercase tracking-widest transition-all ${
                          tire.status === 'inactive' ? 'text-green-500 hover:text-green-400' : 'text-amber-500 hover:text-amber-400'
                        }`}
                      >
                        {tire.status === 'inactive' ? 'Habilitar' : 'Deshabilitar'}
                      </button>
                      <button 
                        onClick={() => openDeleteModal(tire)}
                        className="size-10 rounded-full text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center group"
                        title="Eliminar Neumático"
                      >
                        <span className="material-symbols-outlined text-2xl">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tires.length === 0 && (
            <div className="py-24 text-center space-y-4">
              <span className="material-symbols-outlined text-6xl text-white/5">inventory_2</span>
              <p className="text-white/20 font-bold uppercase tracking-widest">No hay neumáticos registrados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
