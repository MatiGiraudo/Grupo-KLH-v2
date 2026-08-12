import React from 'react';
import { Award, Compass, Layers, Milestone } from 'lucide-react';

export default function About({ data }) {
  const getIcon = (index) => {
    switch (index) {
      case 0: return <Award className="text-klh-gold" size={24} />;
      case 1: return <Compass className="text-klh-gold" size={24} />;
      case 2: return <Layers className="text-klh-gold" size={24} />;
      default: return <Milestone className="text-klh-gold" size={24} />;
    }
  };

  return (
    <section id="nosotros" className="py-24 bg-slate-100 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-klh-slate/10 dark:bg-klh-slate/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-klh-gold/5 rounded-full blur-3xl translate-y-1/3 translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-klh-gold text-sm font-semibold uppercase tracking-wider block">Sobre Nosotros</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                {data.title}
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              {data.description}
            </p>
            
            {/* Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4 items-start p-4 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                <div className="p-3 bg-slate-100 dark:bg-klh-navy rounded-lg">
                  {getIcon(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Negociación Directa</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Trato directo con fabricantes en China sin intermediarios molestos.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                <div className="p-3 bg-slate-100 dark:bg-klh-navy rounded-lg">
                  {getIcon(1)}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Inspección In-Situ</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Control de calidad exhaustivo en fábrica antes de realizar el embarque.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {data.stats.map((stat, idx) => (
              <div key={stat.id || idx} className="glass-card p-4 sm:p-6 lg:p-8 rounded-2xl flex flex-col justify-between text-center lg:text-left shadow-sm dark:shadow-none">
                <span className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-klh-gold tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
