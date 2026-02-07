
import React, { useState, useRef, useEffect } from 'react';
import { Tire } from '../types';
import { BRANDS } from '../constants';
import { uploadTireImage, saveTire, updateTireData, deleteTireFromDb } from '../services/firebase';
import { useLanguage } from '../LanguageContext';

interface AdminDashboardProps {
  tires: Tire[];
  setTires: React.Dispatch<React.SetStateAction<Tire[]>>;
  setIsAdminLoginView: (isLogin: boolean) => void;
}

const SPEED_RATINGS = ['Q', 'R', 'S', 'T', 'H', 'V', 'W', 'Y', '(Y)'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ tires, setTires, setIsAdminLoginView }) => {
  const [adminStep, setAdminStep] = useState<'welcome' | 'login' | 'dashboard'>('welcome');
  const { t, language } = useLanguage();

  // INICIO DE MODIFICACIÓN: Efecto para sincronizar la visibilidad del Navbar
  useEffect(() => {
    setIsAdminLoginView(adminStep === 'login');
    return () => setIsAdminLoginView(false);
  }, [adminStep, setIsAdminLoginView]);
  
  
  // Estados para seguridad
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Estados de modales y edición
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tireToDelete, setTireToDelete] = useState<Tire | null>(null);
  
  // Estados para manejo de archivos
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // Estado inicial del formulario. Los campos numéricos se manejan como strings/numbers para permitir edición fluida.
  const [formData, setFormData] = useState<any>({
    brand: 'Michelin',
    model: '',
    width: 0,
    profile: 0,
    diameter: 0,
    construction: 'R',
    loadIndex: 0,
    speedRating: 'V',
    price: 0,
    image: '',
    season: 'all-season',
    status: 'active',
    stock: 0,
    maxWeight: 0
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'jp2024') {
      setAdminStep('dashboard');
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      brand: 'Michelin', model: '', width: 0, profile: 0, diameter: 0, 
      construction: 'R', loadIndex: 0, speedRating: 'V', price: 0, 
      image: '', season: 'all-season', status: 'active', stock: 0,
      maxWeight: 0
    });
    setImagePreview(null);
    setImageUrlInput('');
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
    setImageUrlInput(tire.image.startsWith('http') ? tire.image : '');
    setIsModalOpen(true);
  };

  const openDeleteModal = (tire: Tire) => {
    setTireToDelete(tire);
    setIsDeleteModalOpen(true);
  };

  // INICIO DE MODIFICACIÓN: Borrado en Firebase
  const handleDelete = async () => {
    if (tireToDelete) {
      try {
        await deleteTireFromDb(tireToDelete.id, tireToDelete.image);
        setIsDeleteModalOpen(false);
        setTireToDelete(null);
      } catch (err) {
        alert("Error al eliminar el producto.");
      }
    }
  };

  const toggleStatus = async (tire: Tire) => {
    try {
      const newStatus = tire.status === 'inactive' ? 'active' : 'inactive';
      await updateTireData(tire.id, { status: newStatus as any });
    } catch (err) {
      alert("Error al actualizar el estado.");
    }
  };

  // Manejo de inputs permitiendo estados vacíos para que el usuario borre el '0' inicial
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumberField = ['width', 'profile', 'diameter', 'loadIndex', 'stock', 'price', 'maxWeight'].includes(name);
    setFormData((prev: any) => ({
      ...prev,
      [name]: isNumberField ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setImageUrlInput('');
        setFormData((prev: any) => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrlInput(url);
    setImagePreview(url);
    setFormData((prev: any) => ({ ...prev, image: url }));
  };

  // INICIO DE MODIFICACIÓN: Submit con integración de Firebase Storage y Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let finalImageUrl = formData.image;

      // 1. Subir imagen si hay un archivo seleccionado
      if (selectedFile) {
        finalImageUrl = await uploadTireImage(selectedFile);
      } else if (imageUrlInput) {
        finalImageUrl = imageUrlInput;
      }

      if (!finalImageUrl) {
        alert('Por favor, selecciona una imagen.');
        setIsUploading(false);
        return;
      }

      const tirePayload = {
        ...formData,
        image: finalImageUrl,
        width: Number(formData.width) || 0,
        profile: Number(formData.profile) || 0,
        diameter: Number(formData.diameter) || 0,
        loadIndex: Number(formData.loadIndex) || 0,
        stock: Number(formData.stock) || 0,
        price: Number(formData.price) || 0,
        maxWeight: Number(formData.maxWeight) || 0
      };

      // 2. Guardar en Firestore
      if (modalMode === 'edit' && editingId) {
        await updateTireData(editingId, tirePayload);
      } else {
        await saveTire(tirePayload);
      }

      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al guardar.");
    } finally {
      setIsUploading(false);
    }
  };
  // FIN DE MODIFICACIÓN

  const cadFormatter = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' });

  // PANTALLA 1: BIENVENIDA AL ADMINISTRADOR (RESTRICTURADA)
  if (adminStep === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background-dark overflow-hidden relative pt-24 pb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[120px] animate-float"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-dark_coffee/30 rounded-full blur-[150px] animate-float" style={{ animationDelay: '-5s' }}></div>
          <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '8s' }}></div>
        </div>

        <div className="w-full max-w-2xl bg-surface-dark/40 backdrop-blur-2xl border border-white/10 rounded-[3.5rem] p-10 md:p-16 shadow-2xl space-y-10 text-center relative z-10 animate-in fade-in zoom-in duration-700">
          <div className="space-y-6">
            <div className="size-20 bg-primary/10 rounded-2xl flex items-center justify-center animate-pulse text-primary mx-auto mb-6">
              <span className="material-symbols-outlined text-5xl">admin_panel_settings</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white italic font-serif leading-tight">
              Bienvenido, <br /><span className="text-primary">Jean Plourde</span>
            </h1>
            <p className="text-pale-sky text-lg md:text-xl font-light italic max-w-md mx-auto leading-relaxed">
              Panel exclusivo para el control de inventario y actualización de precios de JP TIRES.
            </p>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => setAdminStep('login')}
              className="group relative inline-flex items-center justify-center min-w-[260px] h-16 bg-primary text-black rounded-2xl text-lg font-black uppercase tracking-widest hover:scale-105 transition-all italic overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-4">
                Acceder al Panel
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">login</span>
              </span>
            </button>
          </div>

          <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] pt-8">
            Sistema de Gestión Integral • v1.0.0
          </p>
        </div>
      </div>
    );
  }

  // PANTALLA 2: LOGIN (RESTRICTURADA)
  if (adminStep === 'login') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background-dark relative pt-24 pb-12">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="w-full max-w-md bg-surface-dark border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-2xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500 relative z-10">
          <div className="text-center space-y-3">
            <span className="material-symbols-outlined text-primary text-5xl mb-2">lock</span>
            <h2 className="text-3xl font-black text-white italic font-serif">Autenticación</h2>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Ingresa tus credenciales</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-widest pl-2 italic">Usuario</label>
              <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-primary font-outfit" placeholder="user" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-widest pl-2 italic">Contraseña</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-primary font-outfit" placeholder="••••••••" />
            </div>
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                <p className="text-red-500 text-[10px] text-center font-bold italic">Credenciales incorrectas.</p>
              </div>
            )}
            <button type="submit" className="w-full h-14 bg-primary text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all italic shadow-lg">
              Iniciar Sesión
            </button>
            <button 
                type="button"
                onClick={() => setAdminStep('welcome')}
                className="w-full h-14 rounded-2xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest italic"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Volver Atrás
              </button>
          </form>
        </div>
      </div>
    );
  }

  // PANTALLA 3: DASHBOARD
  return (
    <div className="pt-28 pb-20 px-6 lg:px-40 animate-in fade-in duration-500">
      <div className="max-w-[1440px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <h1 className="text-5xl font-black text-white tracking-tight font-serif">Gestión de Inventario</h1>
              <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase italic">Admin Mode</span>
            </div>
            <p className="text-pale-sky text-lg italic">Hola Jean Plourde, este es tu panel para la gestión de tu catálogo de neumáticos.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setAdminStep('welcome'); setUsername(''); setPassword(''); }}
              className="h-16 px-8 rounded-[2rem] border border-white/10 text-white/40 hover:text-white font-bold text-xs uppercase tracking-widest italic transition-all"
            >
              Cerrar Sesión
            </button>
            <button onClick={openAddModal} className="flex items-center justify-center rounded-[2rem] h-16 px-10 bg-primary text-black gap-4 text-sm font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all italic">
              <span className="material-symbols-outlined">add_circle</span> Nuevo Neumático
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed top-[30px] inset-x-0 bottom-0 z-40 flex  items-center justify-center p-4 md:p-10 bg-surface-dark/20 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-surface-dark w-full max-w-4xl rounded-[3rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] flex flex-col max-h-[85vh] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-5">
                  <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">{modalMode === 'edit' ? 'edit_square' : 'add_box'}</span>
                  </div>
                  <h2 className="text-2xl font-black text-white italic font-serif">{modalMode === 'edit' ? 'Editar Neumático' : 'Añadir Neumático'}</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="size-12 rounded-full hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block border-l-2 border-primary/30 pl-4 italic">Identidad Visual</label>
                    <div className="aspect-video rounded-[2.5rem] border-2 border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center overflow-hidden">
                      {imagePreview ? <img src={imagePreview} className="w-full h-full object-contain p-6" alt="Preview" /> : <span className="material-symbols-outlined text-7xl opacity-10">image_search</span>}
                    </div>
                    <div className="space-y-4">
                      <input type="url" value={imageUrlInput} onChange={handleUrlChange} placeholder="URL de la imagen" className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-white text-sm outline-none focus:border-primary font-outfit italic" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full h-14 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/5 transition-all">Subir archivo</button>
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block border-l-2 border-primary/30 pl-4 italic">Especificaciones Comerciales</label>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-white/40 pl-2">Marca</label>
                        <select name="brand" value={formData.brand} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-white focus:border-primary font-outfit">
                          {BRANDS.map(b => <option key={b} value={b} className="bg-surface-dark">{b}</option>)}
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-white/40 pl-2">Modelo</label>
                        <input required name="model" value={formData.model} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-white focus:border-primary font-outfit" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-white/40 pl-2">Precio (CAD)</label>
                        <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-primary font-black focus:border-primary font-outfit" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-white/40 pl-2">Stock</label>
                        <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-white font-black focus:border-primary font-outfit" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase text-white/40 pl-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">weight</span> Peso Máximo (Libras)
                      </label>
                      <input required type="number" name="maxWeight" value={formData.maxWeight} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-16 rounded-2xl px-6 text-2xl text-white font-black focus:border-primary font-outfit"/>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block border-l-2 border-primary/30 pl-4 italic">Ficha Técnica</label>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 pl-1 uppercase font-bold">Ancho</label>
                      <input type="number" name="width" value={formData.width} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-12 rounded-xl px-4 text-white font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 pl-1 uppercase font-bold">Perfil</label>
                      <input type="number" name="profile" value={formData.profile} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-12 rounded-xl px-4 text-white font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 pl-1 uppercase font-bold">Radio</label>
                      <input type="number" name="diameter" value={formData.diameter} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-12 rounded-xl px-4 text-white font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 pl-1 uppercase font-bold">Velocidad Max.</label>
                      <select name="speedRating" value={formData.speedRating} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-12 rounded-xl px-2 text-white font-bold">
                        {SPEED_RATINGS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </form>

              <div className="p-8 border-t border-white/5 bg-white/[0.02] flex gap-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-14 rounded-2xl border border-white/10 text-white/40 hover:text-white font-black text-xs uppercase italic transition-all">Descartar</button>
                <button onClick={handleSubmit} className="flex-[2] h-14 rounded-2xl bg-primary text-black font-black text-xs uppercase italic shadow-lg shadow-primary/20">
                  {modalMode === 'edit' ? 'Guardar Cambios' : 'Registrar Producto'}
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed top-[30px] inset-x-0 bottom-0 z-40 flex items-center justify-center p-4 bg-surface-dark/20 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-surface-dark w-full max-w-md rounded-[3rem] border border-white/10 p-10 text-center space-y-8">
              <span className="material-symbols-outlined text-red-500 text-6xl animate-pulse">delete_forever</span>
              <h3 className="text-3xl font-black text-white italic font-serif">¿Eliminar producto?</h3>
              <p className="text-white/40 italic">Esta acción no se puede deshacer y el producto desaparecerá del catálogo.</p>
              <div className="flex gap-4">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 h-14 rounded-2xl bg-white/5 text-white/40 font-bold uppercase">Cancelar</button>
                <button onClick={handleDelete} className="flex-1 h-14 rounded-2xl bg-red-500 text-white font-black uppercase shadow-lg shadow-red-500/20">Eliminar</button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-surface-dark/40 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-10 py-8 text-primary text-[10px] font-black uppercase tracking-[0.4em] italic">Producto</th>
                <th className="px-10 py-8 text-primary text-[10px] font-black uppercase tracking-[0.4em] italic">Precio (CAD)</th>
                <th className="px-10 py-8 text-primary text-[10px] font-black uppercase tracking-[0.4em] italic">Stock</th>
                <th className="px-10 py-8 text-primary text-[10px] font-black uppercase tracking-[0.4em] italic text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tires.map(tire => (
                <tr key={tire.id} className={`hover:bg-white/[0.03] transition-all group ${tire.status === 'inactive' ? 'opacity-30' : ''}`}>
                  <td className="px-10 py-8 flex items-center gap-6">
                    <div className="h-16 w-16 bg-[#fcfcfc] rounded-2xl p-2 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <img src={tire.image} className="max-w-full max-h-full object-contain" alt={tire.model} />
                    </div>
                    <div>
                      <p className="text-white text-xl font-bold font-serif italic mb-1">{tire.brand}</p>
                      <p className="text-white/30 text-[9px] uppercase tracking-widest">{tire.model}</p>
                    </div>
                  </td>
                  <td className="px-10 py-8 font-outfit text-white font-black text-xl tracking-tighter">
                    {cadFormatter.format(tire.price)}
                  </td>
                  <td className="px-10 py-8">
                    <div className={`px-4 py-2 rounded-full text-xs font-black uppercase ${tire.stock < 10 ? 'text-amber-500 bg-amber-500/10' : 'text-white/40 bg-white/5'}`}>{tire.stock} UNIDADES</div>
                  </td>
                  <td className="px-10 py-8 text-right flex items-center justify-end gap-6">
                    <button onClick={() => openEditModal(tire)} className="text-white/20 hover:text-primary transition-all hover:scale-125"><span className="material-symbols-outlined text-2xl">edit</span></button>
                    <button onClick={() => toggleStatus(tire)} className={`text-[9px] font-black px-4 py-2 rounded-lg border uppercase ${tire.status === 'inactive' ? 'text-green-500 border-green-500/20' : 'text-amber-500 border-amber-500/20'}`}>{tire.status === 'inactive' ? 'Mostrar' : 'Ocultar'}</button>
                    <button onClick={() => openDeleteModal(tire)} className="text-white/10 hover:text-red-500 hover:scale-125 transition-all"><span className="material-symbols-outlined text-2xl">delete</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tires.length === 0 && (
            <div className="py-32 text-center space-y-6">
              <span className="material-symbols-outlined text-7xl text-white/5">inventory_2</span>
              <p className="text-white/20 text-xl italic font-serif">Tu inventario está vacío. Agrega un producto para comenzar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
