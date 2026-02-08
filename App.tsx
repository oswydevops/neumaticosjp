
import React, { useState, useEffect } from 'react';
import { Page, Tire } from './types';
import { INITIAL_TIRES } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import ProductModal from './components/ProductModal';
import { subscribeToTires } from './services/firebase';
import { LanguageProvider } from './LanguageContext';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // Recuperar página del localStorage si existe, pero respetando hash en URL
    if (typeof window !== 'undefined') {
      // Primero verificar si hay hash en la URL
      const hashPage = window.location.hash.replace('#', '') as Page;
      if (hashPage && ['home', 'catalog', 'about', 'contact', 'admin'].includes(hashPage)) {
        return hashPage;
      }
      // Si no hay hash, usar localStorage
      const savedPage = localStorage.getItem('currentPage') as Page;
      return savedPage && ['home', 'catalog', 'about', 'contact', 'admin'].includes(savedPage) ? savedPage : 'home';
    }
    return 'home';
  });
  const [selectedTire, setSelectedTire] = useState<Tire | null>(null);
  const [isAdminLoginView, setIsAdminLoginView] = useState(false);

  // INICIO DE MODIFICACIÓN: El estado inicial ahora es vacío y se llena desde Firebase
  const [tires, setTires] = useState<Tire[]>([]);

  useEffect(() => {
    // Suscribirse a los cambios de Firebase (reemplaza a localStorage)
    const unsubscribe = subscribeToTires((updatedTires) => {
      setTires(updatedTires);
    });

    return () => unsubscribe(); // Limpiar suscripción al desmontar
  }, []);
  // FIN DE MODIFICACIÓN


  // Escuchar cambios en el hash para navegación manual (ej: /#admin)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      const validPages: Page[] = ['home', 'catalog', 'about', 'contact', 'admin'];
      if (hash && validPages.includes(hash)) {
        setCurrentPage(hash);
        localStorage.setItem('currentPage', hash);
      } else if (!hash) {
        // Si el hash está vacío, ir a home
        setCurrentPage('home');
        localStorage.setItem('currentPage', 'home');
      }
    };

    // Manejar la carga inicial del hash
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Guardar página actual en localStorage cuando cambia desde dentro de la app
  // (No duplicar lo que el listener de hash ya hace)
  useEffect(() => {
    // Solo guardar y actualizar hash si cambió programáticamente (no por hash change)
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash !== currentPage) {
      localStorage.setItem('currentPage', currentPage);
      window.location.hash = currentPage;
    }
  }, [currentPage]);

  // Simple scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    // Resetear el estado si navegamos fuera de admin para evitar bloqueos visuales
    if (currentPage !== 'admin') {
      setIsAdminLoginView(false);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} onProductClick={setSelectedTire} />;
      case 'catalog':
        return <Catalog tires={tires} onProductClick={setSelectedTire} />;
      case 'about':
        return <About onNavigate={setCurrentPage} />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <AdminDashboard tires={tires} setTires={setTires} setIsAdminLoginView={setIsAdminLoginView} />;
      default:
        return <Home onNavigate={setCurrentPage} onProductClick={setSelectedTire} />;
    }
  };


  return (
    <LanguageProvider>
    <div className="flex flex-col min-h-screen">
      {!isAdminLoginView && <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />}
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Solo mostramos el footer si NO estamos en el panel de administración */}
      {currentPage !== 'admin' && <Footer onNavigate={setCurrentPage} />}

      {selectedTire && (
        <ProductModal 
          tire={selectedTire} 
          onClose={() => setSelectedTire(null)} 
        />
      )}
    </div>
    </LanguageProvider>
  );
};

export default App;
