import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, Sun, Moon } from 'lucide-react';

export default function Navbar({ onLogout, isAdmin, isPageAdmin, theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
      ? 'bg-white/95 dark:bg-klh-navy/90 backdrop-blur-md py-3 shadow-lg border-b border-slate-200 dark:border-white/10'
      : 'bg-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className='w-20 rounded-full overflow-hidden border-2 border-klh-gold'>
              <img className="w-20" src="/logo.png" alt="Logo KLH" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-wider text-slate-900 dark:text-white">GRUPO <span className="text-klh-gold">KLH</span></span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 tracking-widest -mt-1">IMPORTACIONES</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#inicio" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-klh-gold dark:hover:text-klh-gold transition-colors">Inicio</a>
            <a href="/#nosotros" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-klh-gold dark:hover:text-klh-gold transition-colors">Nosotros</a>
            <a href="/#empresas" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-klh-gold dark:hover:text-klh-gold transition-colors">Empresas</a>
            <a href="/#logistica" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-klh-gold dark:hover:text-klh-gold transition-colors">Proceso</a>
            <a href="/#contacto" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-klh-gold dark:hover:text-klh-gold transition-colors">Contacto</a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-klh-gold transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Show logout ONLY if they are logged in AND on the admin page */}
            {isAdmin && isPageAdmin && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <LogOut size={14} />
                Salir Admin
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-klh-gold transition-all"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-b border-slate-200 dark:border-white/10 animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-center">
            <a
              href="/#inicio"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            >
              Inicio
            </a>
            <a
              href="/#nosotros"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            >
              Nosotros
            </a>
            <a
              href="/#empresas"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            >
              Empresas
            </a>
            <a
              href="/#logistica"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            >
              Proceso
            </a>
            <a
              href="/#contacto"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            >
              Contacto
            </a>

            {isAdmin && isPageAdmin && (
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-md border border-red-500/30 bg-red-500/10 text-red-400 font-semibold"
              >
                <LogOut size={16} />
                Salir Admin
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
