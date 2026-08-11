import React from 'react';

// Single Responsibility: Labeled text input (Responsive to Light / Dark Mode)
export function InputField({ label, value, onChange, type = "text", placeholder = "", extraClass = "" }) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</label>}
      <input 
        type={type} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 focus:border-klh-gold dark:focus:border-klh-gold rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-klh-gold transition-all ${extraClass}`}
      />
    </div>
  );
}

// Single Responsibility: Labeled textarea (Responsive to Light / Dark Mode)
export function TextAreaField({ label, value, onChange, rows = 4, placeholder = "", extraClass = "" }) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</label>}
      <textarea 
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 focus:border-klh-gold dark:focus:border-klh-gold rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-klh-gold transition-all resize-none ${extraClass}`}
      ></textarea>
    </div>
  );
}

// Single Responsibility: Sidebar Navigation Button (Responsive to Light / Dark Mode)
export function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
        active 
          ? 'bg-klh-gold text-klh-navy shadow-md shadow-klh-gold/10' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
      }`}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
}

// Single Responsibility: Heading separator (Responsive to Light / Dark Mode)
export function SectionHeader({ title, description }) {
  return (
    <div className="border-b border-slate-200 dark:border-white/5 pb-2">
      <h3 className="text-sm font-bold uppercase tracking-widest text-klh-gold">{title}</h3>
      {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
    </div>
  );
}
