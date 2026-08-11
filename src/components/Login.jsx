import React, { useState } from 'react';
import { Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { API_BASE } from '../config';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        onLogin(data.token);
      } else {
        setError(data.error || 'Credenciales incorrectas.');
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden pt-24">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-klh-slate/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="glass-panel w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 p-8 z-10">
        
        {/* Back Button */}
        <a 
          href="/"
          className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Volver a la Web
        </a>

        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <div className="h-12 w-12 bg-klh-gold/10 border border-klh-gold/20 text-klh-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={24} />
          </div>
          <h2 className="font-display font-bold text-2xl text-white">Consola de Administración</h2>
          <p className="text-sm text-slate-400 mt-1">Ingresa para editar el contenido de la landing page</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex gap-2 items-center p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Usuario</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User size={16} />
              </div>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-900 border border-white/10 focus:border-klh-gold rounded-lg pl-10 pr-4 py-3 text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-klh-gold transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock size={16} />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-white/10 focus:border-klh-gold rounded-lg pl-10 pr-4 py-3 text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-klh-gold transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-klh-gold hover:bg-klh-goldLight text-klh-navy font-bold rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {loading ? 'Validando...' : 'Ingresar'}
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-slate-500">
          <p>Credenciales por defecto: <span className="font-mono text-klh-gold">admin</span> / <span className="font-mono text-klh-gold">admin123</span></p>
        </div>

      </div>
    </div>
  );
}
