import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden border border-klh-gold shrink-0">
                <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
              </div>
              <span className="font-display font-bold text-md tracking-wider text-white">GRUPO <span className="text-klh-gold">KLH</span></span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Consorcio corporativo líder en la importación directa desde China y gestión logística internacional. Conectando industrias y optimizando suministros.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Secciones</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/#inicio" className="hover:text-klh-gold transition-colors">Inicio</a></li>
              <li><a href="/#nosotros" className="hover:text-klh-gold transition-colors">Nosotros</a></li>
              <li><a href="/#empresas" className="hover:text-klh-gold transition-colors">Nuestras Empresas</a></li>
              <li><a href="/#logistica" className="hover:text-klh-gold transition-colors">Proceso Importador</a></li>
              <li><a href="/#contacto" className="hover:text-klh-gold transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Soporte</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-klh-gold transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-klh-gold transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Grupo KLH. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5">
            <span>Diseño Premium</span>
            <span className="h-1 w-1 rounded-full bg-klh-gold"></span>
            <span>Importador Directo China</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
