import React from 'react';
import * as Icons from 'lucide-react';

export default function CompanyCard({ company }) {
  // Resolve Lucide icon component dynamically
  const IconComponent = Icons[company.icon] || Icons.HelpCircle;

  return (
    <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden group shadow-sm dark:shadow-none">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-klh-gold/10 to-transparent rounded-bl-full transition-all group-hover:scale-125"></div>

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-slate-100 dark:bg-klh-navy/80 rounded-xl border border-slate-200 dark:border-white/10 text-klh-gold group-hover:text-klh-goldLight group-hover:border-klh-gold/30 transition-colors">
            <IconComponent size={24} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-klh-gold px-2.5 py-1 rounded-full bg-klh-gold/5 border border-klh-gold/10 dark:border-klh-gold/20">
            {company.category}
          </span>
        </div>

        {/* Content */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-klh-gold transition-colors">
          {company.name}
        </h3>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 italic mb-4 leading-snug">
          "{company.tagline}"
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
          {company.description}
        </p>
      </div>

      {/* Details list */}
      <div className="border-t border-slate-200 dark:border-white/5 pt-4 mt-auto">
        <ul className="space-y-2">
          {company.details.map((detail, index) => (
            <li key={index} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="h-1 w-1 rounded-full bg-klh-gold"></span>
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
