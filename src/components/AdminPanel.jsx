import React, { useState } from 'react';
import { Save, Layout, Info, Building2, ClipboardList, PhoneCall, RefreshCw, Eye, EyeOff, LogOut, Globe, Sun, Moon } from 'lucide-react';
import Hero from './Hero';
import About from './About';
import CompanyGrid from './CompanyGrid';
import { API_BASE } from '../config';
import LogisticsFlow from './LogisticsFlow';
import ContactForm from './ContactForm';
import { InputField, TextAreaField, TabButton, SectionHeader } from './FormControls';

export default function AdminPanel({ data, onSave, onLogout, theme, toggleTheme }) {
  const [activeTab, setActiveTab] = useState('hero');
  const [editedData, setEditedData] = useState(JSON.parse(JSON.stringify(data))); // Deep copy
  const [showPreview, setShowPreview] = useState(true);

  const handleSave = () => {
    onSave(editedData);
  };

  const handleReset = () => {
    if (window.confirm("¿Seguro que deseas revertir todos los cambios no guardados?")) {
      setEditedData(JSON.parse(JSON.stringify(data)));
    }
  };

  const handleHeroChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const handleAboutChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      about: { ...prev.about, [field]: value }
    }));
  };

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...editedData.about.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setEditedData(prev => ({
      ...prev,
      about: { ...prev.about, stats: updatedStats }
    }));
  };

  const handleCompanyChange = (index, field, value) => {
    const updatedCompanies = [...editedData.companies];
    updatedCompanies[index] = { ...updatedCompanies[index], [field]: value };
    setEditedData(prev => ({
      ...prev,
      companies: updatedCompanies
    }));
  };

  const handleAddCompany = () => {
    const newId = `company-${Date.now()}`;
    const newCompany = {
      id: newId,
      name: "Nueva Empresa",
      category: "Insumos / Categoría",
      tagline: "Lema corporativo",
      description: "Escribe la descripción de la actividad comercial de esta firma...",
      icon: "Briefcase",
      details: ["Especialidad 1", "Especialidad 2", "Especialidad 3", "Especialidad 4"]
    };
    setEditedData(prev => ({
      ...prev,
      companies: [...prev.companies, newCompany]
    }));
  };

  const handleDeleteCompany = (index) => {
    if (window.confirm("¿Seguro que deseas eliminar esta empresa del holding?")) {
      const updated = [...editedData.companies];
      updated.splice(index, 1);
      setEditedData(prev => ({
        ...prev,
        companies: updated
      }));
    }
  };

  const handleCompanyDetailChange = (compIndex, detailIndex, value) => {
    const updatedCompanies = [...editedData.companies];
    const updatedDetails = [...updatedCompanies[compIndex].details];
    updatedDetails[detailIndex] = value;
    updatedCompanies[compIndex] = { ...updatedCompanies[compIndex], details: updatedDetails };
    setEditedData(prev => ({
      ...prev,
      companies: updatedCompanies
    }));
  };

  const handleLogisticsStepChange = (index, field, value) => {
    const updatedSteps = [...editedData.logistics.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setEditedData(prev => ({
      ...prev,
      logistics: { ...prev.logistics, steps: updatedSteps }
    }));
  };

  const handleContactChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  return (
    <div className="w-full h-screen bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100">

      {/* Top Header Bar */}
      <header className="h-16 border-b border-slate-200 dark:border-white/10 px-6 flex items-center justify-between bg-slate-100 dark:bg-slate-900 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full overflow-hidden border border-klh-gold shrink-0">
            <img src={'/logo.png'} alt="Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-slate-900 dark:text-white">Grupo KLH — Administración</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 tracking-widest uppercase font-semibold">Base de datos de producción</p>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-4">
          {/* Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-klh-gold dark:hover:text-klh-gold transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 rounded-lg text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPreview ? 'Ocultar Vista Previa' : 'Vista Previa'}
          </button>

          <a
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 rounded-lg text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300 transition-all"
          >
            <Globe size={14} />
            Ver Web Pública
          </a>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 rounded-lg text-xs font-semibold tracking-wide text-red-500 transition-all cursor-pointer"
          >
            <LogOut size={14} />
            Salir
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* Left Toolbar + Form Editor Panel */}
        <div className={`flex flex-col h-full border-r border-slate-200 dark:border-white/10 ${showPreview ? 'hidden lg:flex lg:w-1/2' : 'w-full'} transition-all duration-300`}>

          <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="flex flex-row sm:flex-col border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-slate-950/40 p-3 sm:p-4 gap-1.5 shrink-0 overflow-x-auto sm:overflow-y-auto scrollbar-none">
              <TabButton active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} icon={Layout} label="Banner Principal" />
              <TabButton active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon={Info} label="Nosotros" />
              <TabButton active={activeTab === 'companies'} onClick={() => setActiveTab('companies')} icon={Building2} label="Empresas" />
              <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} icon={PhoneCall} label="Contacto" />
            </div>

            {/* Editing forms (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-900/10 space-y-6">

              {/* HERO EDITOR */}
              {activeTab === 'hero' && (
                <div className="space-y-5 animate-fade-in">
                  <SectionHeader title="Banner Principal" description="Modifica el título, subtítulo y el llamado a la acción." />
                  <InputField label="Título Principal" value={editedData.hero.title} onChange={(val) => handleHeroChange('title', val)} />
                  <InputField label="Subtítulo" value={editedData.hero.subtitle} onChange={(val) => handleHeroChange('subtitle', val)} />
                  <TextAreaField label="Descripción Breve" value={editedData.hero.description} onChange={(val) => handleHeroChange('description', val)} />
                  <div className="space-y-2.5">
                    <InputField label="Fondo (URL de Imagen o Video)" value={editedData.hero.bgImageUrl} onChange={(val) => handleHeroChange('bgImageUrl', val)} extraClass="font-mono text-xs" />

                    <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg space-y-2">
                      <span className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subir Archivo Local de Imagen o Video</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;

                          const reader = new FileReader();
                          reader.onloadend = async () => {
                            try {
                              const token = localStorage.getItem('grupoklh_token');
                              const res = await fetch(`${API_BASE}/api/upload`, {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({
                                  image: reader.result,
                                  name: file.name
                                })
                              });

                              if (res.ok) {
                                const resJson = await res.json();
                                handleHeroChange('bgImageUrl', resJson.url);
                                alert('Imagen subida con éxito y asignada al fondo.');
                              } else {
                                const errJson = await res.json();
                                alert(`Error al subir imagen: ${errJson.error || 'Intenta de nuevo'}`);
                              }
                            } catch (err) {
                              alert('Error de conexión al intentar subir.');
                              console.error(err);
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="block w-full text-xs text-slate-500 dark:text-slate-400
                          file:mr-4 file:py-1.5 file:px-3
                          file:rounded-md file:border-0
                          file:text-xs file:font-semibold
                          file:bg-klh-gold/10 file:text-klh-gold
                          hover:file:bg-klh-gold/25 file:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ABOUT EDITOR */}
              {activeTab === 'about' && (
                <div className="space-y-5 animate-fade-in">
                  <SectionHeader title="Sobre Nosotros" description="Administra la descripción institucional y los hitos del holding." />
                  <InputField label="Título" value={editedData.about.title} onChange={(val) => handleAboutChange('title', val)} />
                  <TextAreaField label="Descripción del Grupo" value={editedData.about.description} onChange={(val) => handleAboutChange('description', val)} rows={6} />

                  <div className="space-y-3 pt-3 border-t border-white/5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Estadísticas y Métricas</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {editedData.about.stats.map((stat, idx) => (
                        <div key={stat.id || idx} className="p-3 bg-slate-950/40 border border-white/10 rounded-xl space-y-2">
                          <InputField label="Hito/Valor" value={stat.value} onChange={(val) => handleStatChange(idx, 'value', val)} />
                          <InputField label="Texto Informativo" value={stat.label} onChange={(val) => handleStatChange(idx, 'label', val)} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* COMPANIES EDITOR */}
              {activeTab === 'companies' && (
                <div className="space-y-6 animate-fade-in">
                  <SectionHeader title="Catálogo de Empresas" description="Configura el nombre, categoría, slogans e iconos de cada una de las firmas." />

                  {editedData.companies.map((company, index) => (
                    <div key={company.id} className="p-5 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-xl space-y-3.5 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-1">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">ID: {company.id}</span>
                        <button
                          onClick={() => handleDeleteCompany(index)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-500 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Eliminar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InputField label="Nombre de la Empresa" value={company.name} onChange={(val) => handleCompanyChange(index, 'name', val)} />
                        <InputField label="Categoría" value={company.category} onChange={(val) => handleCompanyChange(index, 'category', val)} />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InputField label="Eslogan corporativo" value={company.tagline} onChange={(val) => handleCompanyChange(index, 'tagline', val)} />

                        {/* Selector de Icono de Empresa */}
                        <div className="space-y-2">
                          <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Icono</label>
                          <select
                            value={company.icon}
                            onChange={(e) => handleCompanyChange(index, 'icon', e.target.value)}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 focus:border-klh-gold rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-klh-gold transition-all"
                          >
                            <option value="Scissors">✂ Tijeras (Textil)</option>
                            <option value="Wrench">🔧 Llave (Industria)</option>
                            <option value="Laptop">💻 Laptop (Tecnología)</option>
                            <option value="Ship">🚢 Barco (Logística)</option>
                            <option value="Briefcase">💼 Maletín (Negocios)</option>
                            <option value="ShoppingBag">🛍 Bolsa (Consumo)</option>
                            <option value="Boxes">📦 Cajas (Depósito)</option>
                            <option value="Cpu">🔌 CPU (Hardware)</option>
                            <option value="Globe">🌐 Mundo (Comercio)</option>
                            <option value="Coins">🪙 Monedas (Finanzas)</option>
                          </select>
                        </div>
                      </div>

                      <TextAreaField label="Descripción Comercial" value={company.description} onChange={(val) => handleCompanyChange(index, 'description', val)} rows={3} />

                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Especialidades (4 ítems)</label>
                        <div className="grid grid-cols-2 gap-2">
                          {company.details.map((detail, detIdx) => (
                            <input
                              key={detIdx}
                              type="text"
                              value={detail}
                              onChange={(e) => handleCompanyDetailChange(index, detIdx, e.target.value)}
                              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 focus:border-klh-gold rounded-md px-2.5 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-klh-gold transition-all"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Botón para agregar nueva empresa */}
                  <button
                    onClick={handleAddCompany}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-dashed border-slate-300 dark:border-white/10 hover:border-klh-gold dark:hover:border-klh-gold text-slate-600 dark:text-slate-400 hover:text-klh-gold hover:bg-klh-gold/5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    + Agregar Nueva Empresa al Holding
                  </button>
                </div>
              )}

              {/* CONTACT EDITOR */}
              {activeTab === 'contact' && (
                <div className="space-y-5 animate-fade-in">
                  <SectionHeader title="Datos de Contacto" description="Configura correos, teléfonos y horarios del grupo." />
                  <InputField label="Correo Electrónico Corporativo" value={editedData.contact.email} onChange={(val) => handleContactChange('email', val)} type="email" />
                  <InputField label="Teléfono" value={editedData.contact.phone} onChange={(val) => handleContactChange('phone', val)} />
                  <InputField label="Horario Comercial" value={editedData.contact.hours} onChange={(val) => handleContactChange('hours', val)} />
                </div>
              )}

            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-100 dark:bg-slate-900 shrink-0">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              <RefreshCw size={14} />
              Revertir
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-klh-gold hover:bg-klh-goldLight text-klh-navy font-bold rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-klh-gold/10"
            >
              <Save size={14} />
              Guardar en Postgres
            </button>
          </div>

        </div>

        {/* Right Live Preview Panel */}
        {showPreview && (
          <div className="w-full lg:w-1/2 h-full bg-slate-100 dark:bg-slate-950 flex flex-col overflow-hidden">
            {/* Preview Status Bar */}
            <div className="h-10 border-b border-slate-200 dark:border-white/5 px-4 bg-slate-200/50 dark:bg-slate-900/60 flex items-center justify-between shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-klh-gold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping"></span>
                Vista Previa en Vivo (React State)
              </span>
              <span className="text-[9px] text-slate-600 dark:text-slate-500 italic">Los cambios se renderizan según editas</span>
            </div>

            {/* Actual Landing Rendering inside scrollable frame */}
            <div className="flex-1 overflow-y-auto bg-slate-950 border-l border-white/10">
              <div className="pointer-events-none select-none">
                <Hero data={editedData.hero} />
                <About data={editedData.about} />
                <CompanyGrid companies={editedData.companies} />
                <ContactForm data={editedData.contact} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
