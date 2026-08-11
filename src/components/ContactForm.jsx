import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm({ data }) {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', company: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contacto" className="py-24 bg-slate-100 dark:bg-klh-navy/20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-klh-gold text-sm font-semibold uppercase tracking-wider block">Contacto y Oficinas</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            ¿Comenzamos a trabajar juntos?
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Ponte en contacto con nuestro equipo corporativo para cotizaciones de fletes, importaciones programadas o representación comercial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="glass-card p-8 rounded-2xl space-y-6 h-full flex flex-col justify-center shadow-sm dark:shadow-none">
              


              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-klh-gold border border-slate-200 dark:border-white/5">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Teléfono</h4>
                  <a href={`tel:${data.phone}`} className="text-slate-700 dark:text-slate-300 hover:text-klh-gold dark:hover:text-klh-gold text-sm mt-1 block transition-colors">{data.phone}</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-klh-gold border border-slate-200 dark:border-white/5">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Correo Electrónico</h4>
                  <a href={`mailto:${data.email}`} className="text-slate-700 dark:text-slate-300 hover:text-klh-gold dark:hover:text-klh-gold text-sm mt-1 block transition-colors">{data.email}</a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-klh-gold border border-slate-200 dark:border-white/5">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Horario de Atención</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">{data.hours}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden shadow-sm dark:shadow-none">
              
              {submitted && (
                <div className="absolute inset-0 bg-slate-50/95 dark:bg-slate-900/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6 animate-fade-in">
                  <div className="p-4 bg-klh-gold/10 text-klh-gold rounded-full border border-klh-gold/20 mb-4">
                    <CheckCircle2 size={48} className="animate-bounce" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-slate-700 dark:text-slate-300 max-w-sm">
                    Hemos recibido tus datos correctamente. Un asesor del Grupo KLH se comunicará contigo a la brevedad.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Nombre y Apellido</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 focus:border-klh-gold rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-klh-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Email Corporativo</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="Ej. juan@empresa.com"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 focus:border-klh-gold rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-klh-gold transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Empresa / Organización</label>
                  <input 
                    type="text" 
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    placeholder="Ej. MiEmpresa S.A."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 focus:border-klh-gold rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-klh-gold transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Consulta / Requerimiento</label>
                  <textarea 
                    rows="4"
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Detalla qué tipo de productos o servicios logísticos requieres..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 focus:border-klh-gold rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-klh-gold transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-klh-gold to-klh-goldLight text-klh-navy font-bold rounded-lg hover:shadow-lg hover:shadow-klh-gold/10 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Enviar Mensaje
                  <Send size={18} />
                </button>
              </form>

            </div>
          </div>
        </div>



      </div>
    </section>
  );
}
