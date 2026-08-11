import React from 'react';
import { Search, ShieldCheck, Ship, Landmark } from 'lucide-react';

export default function LogisticsFlow({ data }) {
  const getStepIcon = (index) => {
    switch (index) {
      case 0: return <Search size={20} />;
      case 1: return <ShieldCheck size={20} />;
      case 2: return <Ship size={20} />;
      default: return <Landmark size={20} />;
    }
  };

  return (
    <section id="logistica" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-klh-slate/5 dark:bg-klh-slate/10 rounded-full blur-3xl -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-klh-gold text-sm font-semibold uppercase tracking-wider block">El Flujo del Negocio</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            {data.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {data.subtitle}
          </p>
        </div>

        {/* Steps - Responsive Timeline */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-slate-200 via-klh-gold/30 to-slate-200 dark:from-klh-slate dark:via-klh-gold/40 dark:to-klh-slate -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {data.steps.map((step, idx) => (
              <div key={step.id || idx} className="glass-card p-8 rounded-2xl flex flex-col items-center lg:items-start text-center lg:text-left group relative shadow-sm dark:shadow-none">
                {/* Step number badge */}
                <div className="absolute -top-4 left-1/2 lg:left-8 -translate-x-1/2 lg:translate-x-0 bg-klh-gold text-klh-navy font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md shadow-klh-gold/20">
                  Fase {idx + 1}
                </div>

                {/* Icon Circle */}
                <div className="mt-2 mb-6 h-12 w-12 rounded-xl bg-slate-100 dark:bg-klh-navy flex items-center justify-center text-klh-gold border border-slate-200 dark:border-white/10 group-hover:scale-110 group-hover:border-klh-gold/30 transition-all">
                  {getStepIcon(idx)}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
