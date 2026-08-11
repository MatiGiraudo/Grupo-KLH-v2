import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CompanyGrid from './components/CompanyGrid';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import { Loader2 } from 'lucide-react';
import { API_BASE } from './config';

function App() {
  const [data, setData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('grupoklh_token') || null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('grupoklh_theme') || 'dark');

  // Handle dark mode toggle
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('grupoklh_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  // Handle path routing
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (href && href.includes('/admin')) {
        e.preventDefault();
        const base = import.meta.env.BASE_URL || '/';
        const adminPath = base.endsWith('/') ? `${base}admin` : `${base}/admin`;
        window.history.pushState({}, '', adminPath);
        setCurrentPath(adminPath);
      } else if (href === '/' || href === '' || (import.meta.env.BASE_URL && href === import.meta.env.BASE_URL)) {
        e.preventDefault();
        window.history.pushState({}, '', import.meta.env.BASE_URL || '/');
        setCurrentPath(import.meta.env.BASE_URL || '/');
      }
    };

    document.addEventListener('click', (e) => {
      // Find the closest anchor tag (to handle clicks on SVG/span inside anchor)
      const anchor = e.target.closest('a');
      if (anchor) {
        handleAnchorClick(anchor);
      }
    });

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Fetch landing page content from Postgres API on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/content`);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          setError('No se pudo cargar la información de la base de datos.');
        }
      } catch (err) {
        setError('Error al comunicar con la API del servidor.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleLogin = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem('grupoklh_token', jwtToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('grupoklh_token');
    window.location.href = '/';
  };

  const handleSaveData = async (updatedData) => {
    try {
      const response = await fetch(`${API_BASE}/api/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        setData(updatedData);
        alert('Cambios guardados con éxito en PostgreSQL.');
        // Redirect to homepage after saving
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      } else {
        const errJson = await response.json();
        alert(`Error al guardar: ${errJson.error || 'Error desconocido'}`);
        if (response.status === 401 || response.status === 403) {
          handleLogout();
        }
      }
    } catch (err) {
      alert('Error de conexión al guardar.');
      console.error(err);
    }
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300">
        <Loader2 className="animate-spin text-klh-gold mb-4" size={40} />
        <p className="font-display font-medium tracking-wider">Cargando base de datos corporativa...</p>
      </div>
    );
  }

  // Error Screen
  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 p-4 text-center">
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full mb-4">
          ⚠
        </div>
        <p className="font-display font-medium text-lg mb-2">{error || 'Ha ocurrido un error inesperado.'}</p>
        <p className="text-sm text-slate-500 mb-6">Asegúrate de que los contenedores de Docker (backend y db) estén corriendo.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-klh-gold text-klh-navy font-bold rounded-lg">
          Reintentar
        </button>
      </div>
    );
  }

  // ROUTER: Admin View
  if (currentPath.endsWith('/admin') || currentPath.endsWith('/admin/')) {
    return token ? (
      <AdminPanel 
        data={data} 
        onSave={handleSaveData} 
        onLogout={handleLogout} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
    ) : (
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar 
          onLogout={handleLogout} 
          isAdmin={!!token} 
          isPageAdmin={true} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  // ROUTER: Public Landing Page View (default)
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-klh-gold selection:text-klh-navy">
      <Navbar 
        onLogout={handleLogout} 
        isAdmin={!!token} 
        isPageAdmin={false} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <Hero data={data.hero} />
      <About data={data.about} />
      <CompanyGrid companies={data.companies} />

      <ContactForm data={data.contact} />

      <Footer />
    </div>
  );
}

export default App;
