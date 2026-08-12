import React, { useState } from 'react';
import * as Icons from 'lucide-react';

export default function CompanyGrid({ companies }) {
  const [selectedId, setSelectedId] = useState(companies[0]?.id || '');
  const selectedCompany = companies.find(c => c.id === selectedId) || companies[0];

  // Resolve Lucide icon component dynamically
  const getIconComponent = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon size={24} /> : <Icons.HelpCircle size={24} />;
  };

  const getLargeIconComponent = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon size={48} className="text-klh-gold" /> : <Icons.HelpCircle size={48} className="text-klh-gold" />;
  };

  return (
    <section id="empresas" className="py-24 bg-slate-50 dark:bg-klh-navy/40 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-klh-gold text-sm font-semibold uppercase tracking-wider block">Nuestras Unidades de Negocio</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            Un Holding Sólido y Diversificado
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Haz clic en cualquiera de nuestras 5 firmas especializadas para conocer en detalle su catálogo de servicios y rol en la cadena de importación.
          </p>
        </div>

        {/* Row of 5 Companies */}
        <div className="flex gap-4 overflow-x-auto snap-x md:grid md:grid-cols-5 md:gap-0 mb-12 scrollbar-none pb-3 px-2">
          {companies.map((company, idx) => {
            const isSelected = company.id === selectedId;
            // Estables URLs de imágenes de Unsplash relativas al negocio de cada firma
            const bgImages = [
              'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
            ];
            const currentBg = bgImages[idx % bgImages.length];

            return (
              <button
                key={company.id}
                onClick={() => setSelectedId(company.id)}
                className={`h-[280px] md:h-[350px] w-[220px] md:w-auto shrink-0 snap-start p-5 flex flex-col items-center justify-between text-center relative overflow-hidden group cursor-pointer transition-all duration-300 border ${isSelected
                  ? 'border-klh-gold bg-white dark:bg-slate-900 shadow-md shadow-klh-gold/10 md:scale-110 scale-105 z-10'
                  : 'border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/60'
                  }`}
              >
                {/* Imagen de fondo clara y definida (sin difuminado ni overlay plano) */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={currentBg}
                    alt=""
                    className="w-full h-full object-cover opacity-85 dark:opacity-75 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradiente vertical que deja el centro libre para ver la imagen nítida, pero oscurece/aclara extremos para legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-white/70 dark:from-slate-950/95 dark:via-transparent dark:to-slate-950/80 transition-opacity duration-300"></div>
                </div>

                {/* Background Accent */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-klh-gold/20 to-transparent rounded-bl-full z-10"></div>
                )}

                {/* Content wrapper with relative positioning to sit on top of bg image */}
                <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
                  {/* Icon Container */}
                  <div className={`p-3.5 rounded-xl border mb-4 transition-colors duration-300 ${isSelected
                    ? 'bg-klh-gold/10 border-klh-gold/30 text-klh-gold'
                    : 'bg-slate-100 dark:bg-klh-navy/80 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:text-klh-gold'
                    }`}>
                    {getIconComponent(company.icon)}
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1">
                    <h3 className={`font-display font-bold text-sm tracking-tight transition-colors ${isSelected ? 'text-klh-gold' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                      {company.name}
                    </h3>
                    <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
                      {company.category}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Expansion Box */}
        {selectedCompany && (
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg animate-fade-in relative overflow-hidden">
            {/* Background design */}
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-klh-gold/5 to-transparent rounded-tl-full pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

              {/* Header / Info Column */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="p-4 bg-slate-100 dark:bg-klh-navy/60 border border-slate-200 dark:border-white/10 rounded-2xl w-fit">
                    {getLargeIconComponent(selectedCompany.icon)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-klh-gold uppercase tracking-wider px-2.5 py-1 rounded-full bg-klh-gold/5 border border-klh-gold/25">
                      {selectedCompany.category}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-2">
                      {selectedCompany.name}
                    </h3>
                  </div>
                </div>

                <p className="font-display font-semibold text-lg text-slate-700 dark:text-slate-200 italic leading-snug">
                  "{selectedCompany.tagline}"
                </p>

                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  {selectedCompany.description}
                </p>
              </div>

              {/* Specialties Bullet Points Column */}
              <div className="lg:col-span-4 bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 p-6 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/5 pb-2">
                  Especialidades y Servicios
                </h4>
                <ul className="space-y-3">
                  {selectedCompany.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="h-2 w-2 rounded-full bg-klh-gold mt-1.5 shrink-0"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
