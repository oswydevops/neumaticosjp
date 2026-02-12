
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

// Función para verificar si la sesión ha expirado (24 horas = 86400000 ms)
const isSessionExpired = (): boolean => {
  if (typeof window === 'undefined') return true;
  const loginTime = localStorage.getItem('adminLoginTime');
  if (!loginTime) return true;
  const now = Date.now();
  const expirationTime = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
  return (now - parseInt(loginTime)) > expirationTime;
};

// Función para obtener tiempo restante en milisegundos
const getSessionTimeRemaining = (): number => {
  if (typeof window === 'undefined') return 0;
  const loginTime = localStorage.getItem('adminLoginTime');
  if (!loginTime) return 0;
  const now = Date.now();
  const expirationTime = 24 * 60 * 60 * 1000;
  const remaining = expirationTime - (now - parseInt(loginTime));
  return Math.max(0, remaining);
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ tires, setTires, setIsAdminLoginView }) => {
  const [adminStep, setAdminStep] = useState<'welcome' | 'login' | 'dashboard'>(() => {
    // Recuperar estado de admin del localStorage si existe y es válido
    if (typeof window !== 'undefined') {
      try {
        const savedStep = localStorage.getItem('adminStep');
        // Solo si el estado es 'dashboard' (usuario autenticado), recupera de localStorage
        // Pero primero verifica que la sesión no haya expirado
        if (savedStep === 'dashboard' && !isSessionExpired()) {
          return 'dashboard';
        } else if (savedStep === 'dashboard' && isSessionExpired()) {
          // Si expiró, limpiar datos de sesión
          localStorage.removeItem('adminStep');
          localStorage.removeItem('adminLoginTime');
        }
      } catch (e) {
        console.error('Error reading localStorage:', e);
      }
    }
    return 'welcome';
  });
  const { t, language } = useLanguage();

  // INICIO DE MODIFICACIÓN: Efecto para sincronizar la visibilidad del Navbar y guardar en localStorage
  useEffect(() => {
    setIsAdminLoginView(adminStep === 'login');
    // Guardar el estado de admin en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminStep', adminStep);
    }
    return () => setIsAdminLoginView(false);
  }, [adminStep, setIsAdminLoginView]);

  // Efecto para verificar y cerrar sesión automáticamente después de 24 horas
  useEffect(() => {
    if (adminStep !== 'dashboard') return;

    // Verificar inmediatamente si la sesión ya expiró
    if (isSessionExpired()) {
      setAdminStep('welcome');
      localStorage.removeItem('adminStep');
      localStorage.removeItem('adminLoginTime');
      return;
    }

    // Configurar intervalo para verificar cada minuto si la sesión expiró
    const checkInterval = setInterval(() => {
      if (isSessionExpired()) {
        setAdminStep('welcome');
        localStorage.removeItem('adminStep');
        localStorage.removeItem('adminLoginTime');
        clearInterval(checkInterval);
      }
    }, 60000); // Verifica cada minuto

    return () => clearInterval(checkInterval);
  }, [adminStep]);
  
  
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
      // Guardar el timestamp del login para la expiración de 24 horas
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminLoginTime', Date.now().toString());
      }
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

  const handleCloseSession = () => {
    setAdminStep('welcome');
    setUsername('');
    setPassword('');
    // Limpiar datos de sesión del localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminLoginTime');
    }
    // El efecto automáticamente guardará 'welcome' en localStorage
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

        <div className="w-full max-w-2xl bg-surface-dark/40 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[3.5rem] p-8 md:p-16 shadow-2xl space-y-8 md:space-y-10 text-center relative z-10 animate-in fade-in zoom-in duration-700">
          <div className="space-y-4 md:space-y-6">
            <div className="size-16 md:size-20 bg-primary/10 rounded-2xl flex items-center justify-center animate-pulse text-primary mx-auto mb-4 md:mb-6">
              <span className="material-symbols-outlined text-4xl md:text-5xl">admin_panel_settings</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-white italic font-serif leading-tight">
              {t.admin.welcomeBanner} <br /><span className="text-primary">{t.admin.welcomeName}</span>
            </h1>
            <p className="text-pale-sky text-base md:text-xl font-light italic max-w-md mx-auto leading-relaxed">
              {t.admin.welcomeDescription}
            </p>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => setAdminStep('login')}
              className="group relative inline-flex items-center justify-center min-w-[240px] md:min-w-[260px] h-14 md:h-16 bg-primary text-black rounded-xl md:rounded-2xl text-sm md:text-lg font-black uppercase tracking-widest hover:scale-105 transition-all italic overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-3 md:gap-4">
                {t.admin.accessPanel}
                <span className="material-symbols-outlined text-base md:text-xl group-hover:translate-x-2 transition-transform">login</span>
              </span>
            </button>
          </div>

          <p className="text-white/20 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] pt-6 md:pt-8">
            {t.admin.systemVersion}
          </p>
        </div>
      </div>
    );
  }

  // PANTALLA 2: LOGIN (RESTRICTURADA)
  if (adminStep === 'login') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-background-dark relative pt-24 pb-12">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="w-full max-w-md bg-surface-dark border border-white/10 rounded-2xl md:rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500 relative z-10">
          <div className="text-center space-y-2 md:space-y-3">
            <span className="material-symbols-outlined text-primary text-4xl md:text-5xl mb-2 block">lock</span>
            <h2 className="text-2xl md:text-3xl font-black text-white italic font-serif">{t.admin.authentication}</h2>
            <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{t.admin.enterCredentials}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest pl-2 italic">{t.admin.userLabel}</label>
              <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full h-12 md:h-14 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 text-white text-sm outline-none focus:border-primary font-outfit" placeholder={t.admin.userPlaceholder} />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest pl-2 italic">{t.admin.passLabel}</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 md:h-14 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 text-white text-sm outline-none focus:border-primary font-outfit" placeholder={t.admin.passPlaceholder} />
            </div>
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg md:rounded-xl">
                <p className="text-red-500 text-[9px] md:text-[10px] text-center font-bold italic">{t.admin.incorrectCredentials}</p>
              </div>
            )}
            <button type="submit" className="w-full h-12 md:h-14 bg-primary text-black rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:brightness-110 transition-all italic shadow-lg">
              {t.admin.loginButton}
            </button>
            <button 
                type="button"
                onClick={() => setAdminStep('welcome')}
                className="w-full h-12 md:h-14 rounded-xl md:rounded-2xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-3 font-black text-[9px] md:text-[10px] uppercase tracking-widest italic"
              >
                <span className="material-symbols-outlined text-base md:text-lg">arrow_back</span>
                {t.admin.goBack}
              </button>
          </form>
        </div>
      </div>
    );
  }

  // PANTALLA 3: DASHBOARD
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-40 animate-in fade-in duration-500">
      <div className="max-w-[1440px] mx-auto space-y-8 md:space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 border-b border-white/5 pb-8 md:pb-10">
          <div className="space-y-2 md:space-y-3 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <h1 className="text-4xl sm:text-5xl md:text-5xl font-black text-white tracking-tight font-serif">{t.admin.inventoryManagement}</h1>
              <span className="bg-primary/10 text-primary text-[9px] md:text-[10px] font-black px-3 py-1 rounded-full uppercase italic inline-block md:inline-block w-fit">{t.admin.adminMode}</span>
            </div>
            <p className="text-pale-sky text-base md:text-lg italic">{t.admin.greeting}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4">
            <button 
              onClick={handleCloseSession}
              className="w-full sm:w-auto h-12 md:h-16 px-4 md:px-8 rounded-lg md:rounded-2xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 font-bold text-xs md:text-sm uppercase tracking-widest italic transition-all"
            >
              {t.admin.closeSession}
            </button>
            <button onClick={openAddModal} className="w-full sm:w-auto flex items-center justify-center rounded-lg md:rounded-2xl h-12 md:h-16 px-4 md:px-10 bg-primary text-black gap-2 md:gap-4 text-xs md:text-sm font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all italic">
              <span className="material-symbols-outlined text-base md:text-xl">add_circle</span> <span className="hidden sm:inline text-xs md:text-sm">{t.admin.newTireButton}</span>
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed top-0 inset-x-0 bottom-0 z-40 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-surface-dark/20 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-surface-dark w-full max-w-2xl md:max-w-4xl rounded-2xl md:rounded-[3rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] flex flex-col max-h-[90vh] md:max-h-[85vh] overflow-hidden">
              <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
                  <div className="size-12 md:size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl md:text-3xl">{modalMode === 'edit' ? 'edit_square' : 'add_box'}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white italic font-serif min-w-0">{modalMode === 'edit' ? t.admin.editTire : t.admin.addTire}</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="size-10 md:size-12 rounded-full hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl md:text-3xl">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 md:space-y-12 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-6 md:space-y-8">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary block border-l-2 border-primary/30 pl-3 md:pl-4 italic">{t.admin.visualIdentity}</label>
                    <div className="aspect-video rounded-2xl md:rounded-[2.5rem] border-2 border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center overflow-hidden">
                      {imagePreview ? <img src={imagePreview} className="w-full h-full object-contain p-6" alt="Preview" /> : <span className="material-symbols-outlined text-7xl opacity-10">image_search</span>}
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <input type="url" value={imageUrlInput} onChange={handleUrlChange} placeholder={t.admin.imageUrl} className="w-full bg-white/5 border border-white/10 h-11 md:h-14 rounded-xl md:rounded-2xl px-3 md:px-6 text-white text-xs md:text-sm outline-none focus:border-primary font-outfit italic" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full h-11 md:h-14 border border-white/10 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/5 transition-all whitespace-nowrap">{t.admin.uploadFile}</button>
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    </div>
                  </div>

                  <div className="space-y-6 md:space-y-8">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary block border-l-2 border-primary/30 pl-3 md:pl-4 italic">{t.admin.commercialSpecs}</label>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[8px] md:text-[10px] font-bold uppercase text-white/40 pl-2 whitespace-nowrap">{t.admin.brandLabel}</label>
                        <select name="brand" value={formData.brand} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-11 md:h-14 rounded-lg md:rounded-2xl px-3 md:px-6 text-white focus:border-primary font-outfit text-xs md:text-sm">
                          {BRANDS.map(b => <option key={b} value={b} className="bg-surface-dark">{b}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[8px] md:text-[10px] font-bold uppercase text-white/40 pl-2 whitespace-nowrap">{t.admin.modelLabel}</label>
                        <input required name="model" value={formData.model} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-11 md:h-14 rounded-lg md:rounded-2xl px-3 md:px-6 text-white focus:border-primary font-outfit text-xs md:text-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[8px] md:text-[10px] font-bold uppercase text-white/40 pl-2 whitespace-nowrap">{t.admin.priceLabel}</label>
                        <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-11 md:h-14 rounded-lg md:rounded-2xl px-3 md:px-6 text-primary font-black focus:border-primary font-outfit text-xs md:text-sm" />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[8px] md:text-[10px] font-bold uppercase text-white/40 pl-2 whitespace-nowrap">{t.admin.stockLabel}</label>
                        <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-11 md:h-14 rounded-lg md:rounded-2xl px-3 md:px-6 text-white font-black focus:border-primary font-outfit text-xs md:text-sm" />
                      </div>
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase text-white/40 pl-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm md:text-base">weight</span> <span className="whitespace-nowrap">{t.admin.maxWeight}</span>
                      </label>
                      <input required type="number" name="maxWeight" value={formData.maxWeight} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-12 md:h-16 rounded-xl md:rounded-2xl px-3 md:px-6 text-lg md:text-2xl text-white font-black focus:border-primary font-outfit"/>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary block border-l-2 border-primary/30 pl-3 md:pl-4 italic">{t.admin.techSpecs}</label>
                  <div className="grid grid-cols-4 gap-2 md:gap-4">
                    <div className="space-y-2">
                      <label className="text-[8px] md:text-[10px] text-white/40 pl-1 md:pl-2 uppercase font-bold font-outfit">{t.admin.width}</label>
                      <input type="number" name="width" value={formData.width} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-11 md:h-12 rounded-lg md:rounded-xl px-2 md:px-4 text-white font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] md:text-[10px] text-white/40 pl-1 md:pl-2 uppercase font-bold font-outfit">{t.admin.profile}</label>
                      <input type="number" name="profile" value={formData.profile} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-11 md:h-12 rounded-lg md:rounded-xl px-2 md:px-4 text-white font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] md:text-[10px] text-white/40 pl-1 md:pl-2 uppercase font-bold font-outfit">{t.admin.diameter}</label>
                      <input type="number" name="diameter" value={formData.diameter} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-11 md:h-12 rounded-lg md:rounded-xl px-2 md:px-4 text-white font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] md:text-[10px] text-white/40 pl-1 md:pl-2 uppercase font-bold font-outfit">{t.admin.speedMax}</label>
                      <select name="speedRating" value={formData.speedRating} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-11 md:h-12 rounded-lg md:rounded-xl px-1 md:px-2 text-white font-bold text-sm">
                        {SPEED_RATINGS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </form>

              <div className="p-6 md:p-8 border-t border-white/5 bg-white/[0.02] flex flex-col sm:flex-row gap-4 md:gap-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-14 md:h-16 rounded-xl md:rounded-2xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 font-black text-sm md:text-base uppercase italic transition-all">{t.admin.discardButton}</button>
                <button onClick={handleSubmit} className="flex-1 sm:flex-[2] h-14 md:h-16 rounded-xl md:rounded-2xl bg-primary text-black font-black text-sm md:text-base uppercase italic shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                  {modalMode === 'edit' ? t.admin.saveChanges : t.admin.registerProduct}
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed top-0 inset-x-0 bottom-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-surface-dark/20 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-surface-dark w-full max-w-sm rounded-2xl md:rounded-[3rem] border border-white/10 p-8 md:p-10 text-center space-y-6 md:space-y-8">
              <span className="material-symbols-outlined text-5xl md:text-6xl text-red-500 animate-pulse block">delete_forever</span>
              <h3 className="text-2xl md:text-3xl font-black text-white italic font-serif">{t.admin.deleteProduct}</h3>
              <p className="text-white/40 text-sm md:text-base italic">{t.admin.deleteWarning}</p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl bg-white/5 text-white/40 hover:text-white font-bold text-xs md:text-sm uppercase transition-all">{t.admin.cancelButton}</button>
                <button onClick={handleDelete} className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl bg-red-500 text-white font-black text-xs md:text-sm uppercase shadow-lg shadow-red-500/20">{t.admin.deleteButton}</button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto rounded-2xl md:rounded-[3rem] border border-white/10 bg-surface-dark/40 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <table className="w-full text-left border-collapse min-w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-4 md:px-10 py-4 md:py-8 text-primary text-[7px] md:text-[10px] font-black uppercase tracking-[0.25em] md:tracking-[0.4em] italic text-left">{t.admin.productColumn}</th>
                <th className="px-3 md:px-10 py-4 md:py-8 text-primary text-[7px] md:text-[10px] font-black uppercase tracking-[0.25em] md:tracking-[0.4em] italic text-right">{t.admin.priceColumn}</th>
                <th className="px-3 md:px-10 py-4 md:py-8 text-primary text-[7px] md:text-[10px] font-black uppercase tracking-[0.25em] md:tracking-[0.4em] italic text-center">{t.admin.stockColumn}</th>
                <th className="px-4 md:px-10 py-4 md:py-8 text-primary text-[7px] md:text-[10px] font-black uppercase tracking-[0.25em] md:tracking-[0.4em] italic text-right">{t.admin.actionsColumn}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tires.map(tire => (
                <tr key={tire.id} className={`hover:bg-white/[0.03] transition-all group ${tire.status === 'inactive' ? 'opacity-30' : ''}`}>
                  <td className="px-4 md:px-10 py-6 md:py-8 flex items-center gap-3 md:gap-6">
                    <div className="h-11 md:h-16 w-11 md:w-16 bg-[#fcfcfc] rounded-lg md:rounded-2xl p-1.5 md:p-2 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 flex-shrink-0">
                      <img src={tire.image} className="max-w-full max-h-full object-contain" alt={tire.model} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-xs md:text-xl font-bold font-serif italic mb-0 md:mb-1 truncate leading-tight">{tire.brand}</p>
                      <p className="text-white/30 text-[7px] md:text-[9px] uppercase tracking-widest truncate">{tire.model}</p>
                    </div>
                  </td>
                  <td className="px-3 md:px-10 py-6 md:py-8 font-outfit text-white font-black text-xs md:text-xl tracking-tighter whitespace-nowrap text-right">
                    {cadFormatter.format(tire.price)}
                  </td>
                  <td className="px-3 md:px-10 py-6 md:py-8 text-center">
                    <div className={`px-2 md:px-4 py-1 md:py-2 rounded-md md:rounded-full text-[7px] md:text-xs font-black uppercase whitespace-nowrap inline-block ${tire.stock < 10 ? 'text-amber-500 bg-amber-500/10 border border-amber-500/20' : 'text-white/40 bg-white/5 border border-white/10'}`}>{tire.stock} {t.admin.units}</div>
                  </td>
                  <td className="px-3 md:px-10 py-6 md:py-8 text-right flex items-center justify-end gap-2 md:gap-4">
                    <button onClick={() => openEditModal(tire)} className="text-white/20 hover:text-primary transition-all hover:scale-125 p-1.5 md:p-2 rounded-lg hover:bg-white/5" title={t.admin.editTire}><span className="material-symbols-outlined text-base md:text-2xl">edit</span></button>
                    <button onClick={() => toggleStatus(tire)} className={`text-[7px] md:text-[9px] font-black px-1.5 md:px-4 py-1 md:py-2 rounded-md md:rounded-lg border uppercase whitespace-nowrap transition-all ${tire.status === 'inactive' ? 'text-green-500 border-green-500/20 hover:border-green-500/40 hover:bg-green-500/5' : 'text-amber-500 border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/5'}`} title={tire.status === 'inactive' ? t.admin.show : t.admin.hide}>{tire.status === 'inactive' ? t.admin.show : t.admin.hide}</button>
                    <button onClick={() => openDeleteModal(tire)} className="text-white/10 hover:text-red-500 hover:scale-125 transition-all p-1.5 md:p-2 rounded-lg hover:bg-red-500/5" title={t.admin.deleteProduct}><span className="material-symbols-outlined text-base md:text-2xl">delete</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tires.length === 0 && (
            <div className="py-20 md:py-32 text-center space-y-4 md:space-y-6 px-4">
              <span className="material-symbols-outlined text-5xl md:text-7xl text-white/5 block">inventory_2</span>
              <p className="text-white/20 text-lg md:text-xl italic font-serif">{t.admin.emptyInventory}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
