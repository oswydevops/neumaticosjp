
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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [tires, setTires] = useState<Tire[]>(INITIAL_TIRES);
  const [selectedTire, setSelectedTire] = useState<Tire | null>(null);

  // Simple scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
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
        return <AdminDashboard tires={tires} setTires={setTires} />;
      default:
        return <Home onNavigate={setCurrentPage} onProductClick={setSelectedTire} />;
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />

      {selectedTire && (
        <ProductModal 
          tire={selectedTire} 
          onClose={() => setSelectedTire(null)} 
        />
      )}
    </div>
  );
};

export default App;
