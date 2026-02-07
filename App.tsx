
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
  const [currentPage, setCurrentPage] = useState<Page>('home');
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
      if (['home', 'catalog', 'about', 'contact', 'admin'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Verificar hash inicial
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
