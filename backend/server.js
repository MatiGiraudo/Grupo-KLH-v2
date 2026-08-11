import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'klh_jwt_secret_token_2026';

app.use(cors());
app.use(express.json({ limit: '100mb' }));

// Ensure upload folder exists and serve statically
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Default data to seed the database
const defaultData = {
  hero: {
    title: "Grupo KLH",
    subtitle: "Importador Directo de China para Latinoamérica y el Mundo",
    description: "Conectamos industrias y comercios con los fabricantes líderes en Asia. Aseguramos la cadena de valor completa: desde la negociación en origen y control de calidad estricto, hasta el despacho aduanero y la logística de última milla.",
    ctaText: "Nuestras Empresas",
    ctaLink: "#empresas",
    contactCtaText: "Contáctanos",
    contactCtaLink: "#contacto",
    bgImageUrl: "/Banner.mp4"
  },
  about: {
    title: "Líderes en Comercio Internacional",
    description: "Grupo KLH se consolida como un holding estratégico de importación y logística. Con oficinas y auditores propios en los principales centros industriales de China, garantizamos transacciones seguras, optimización de costos y entregas a término. Proveemos soluciones integrales a diversos sectores de la economía.",
    stats: [
      { id: "stat-1", value: "+1,200", label: "Contenedores Anuales" },
      { id: "stat-2", value: "100%", label: "Control de Calidad" },
      { id: "stat-3", value: "15+", label: "Años de Experiencia" },
      { id: "stat-4", value: "5", label: "Empresas Especializadas" }
    ]
  },
  companies: [
    {
      id: "company-1",
      name: "Tela 770 SRL",
      category: "Textil e Insumos",
      tagline: "Importación mayorista de hilados, telas y materias primas",
      description: "Especialistas en la importación de telas de alta calidad para la confección y la industria de la tapicería. Abastecemos de forma directa desde las tejedurías más tecnificadas de China a distribuidores e industrias locales con precios altamente competitivos.",
      icon: "Scissors",
      details: ["Telas Planas y de Punto", "Hilados Sintéticos y Algodón", "Insumos de Confección", "Desarrollo de Diseños Exclusivos"]
    },
    {
      id: "company-2",
      name: "Feina SA",
      category: "Metalúrgica e Industria",
      tagline: "Herramientas, maquinaria y componentes para la producción",
      description: "Dedicada a proveer repuestos, componentes mecánicos, herramientas eléctricas y maquinaria industrial pesada. Feina SA actúa como el puente tecnológico directo con fabricantes chinos certificados bajo estándares internacionales de seguridad y rendimiento.",
      icon: "Wrench",
      details: ["Herramientas de Precisión", "Maquinaria de Manufactura", "Componentes de Acero y Metal", "Garantía de Servicio Técnico"]
    },
    {
      id: "company-3",
      name: "Harlye SA",
      category: "Tecnología y Consumo",
      tagline: "Dispositivos electrónicos, electrodomésticos y bazar",
      description: "Importamos tendencias de consumo global. Harlye SA se enfoca en la distribución de productos electrónicos para el hogar, accesorios tecnológicos, y artículos de bazar de alta rotación, abasteciendo a cadenas de retail con productos testeados.",
      icon: "Laptop",
      details: ["Electrónica de Consumo", "Accesorios Smart", "Artículos de Bazar y Hogar", "Certificaciones de Seguridad Eléctrica"]
    },
    {
      id: "company-4",
      name: "Aleshur Logistics",
      category: "Logística y Comercio Exterior",
      tagline: "Cadena de suministro y fletes internacionales sin intermediarios",
      description: "La columna vertebral logística del holding. Aleshur coordina fletes marítimos, aéreos y terrestres, consolidación de carga en puertos chinos (Ningbo, Shanghái, Shenzhen) y gestiones aduaneras complejas para asegurar entregas rápidas y seguras.",
      icon: "Ship",
      details: ["Fletes Marítimos (FCL/LCL)", "Consolidación en China", "Despacho de Aduana Dedicado", "Trazabilidad de Carga en Tiempo Real"]
    },
    {
      id: "company-5",
      name: "KLH Corp",
      category: "Corporativo y Finanzas",
      tagline: "Estructuración de negocios internacionales y representación de marcas",
      description: "Representa el núcleo estratégico y de inversión del grupo. KLH Corp facilita el financiamiento de operaciones a gran escala, cartas de crédito, auditorías de fábricas en origen en China, y consultoría de comercio exterior para grandes empresas.",
      icon: "Briefcase",
      details: ["Financiamiento de Importaciones", "Auditoría de Fábricas en China", "Contratos Internacionales", "Representación Comercial de Marcas"]
    }
  ],
  logistics: {
    title: "Nuestro Proceso de Importación Directa",
    subtitle: "Garantizamos excelencia y control absoluto en cada etapa de la cadena de suministro",
    steps: [
      {
        id: "step-1",
        title: "Selección y Auditoría",
        description: "Evaluamos y seleccionamos fábricas en China con auditorías de calidad en sitio antes de emitir cualquier pago."
      },
      {
        id: "step-2",
        title: "Control de Calidad",
        description: "Inspectores propios supervisan la producción y el empaque en la fábrica, previniendo defectos antes del embarque."
      },
      {
        id: "step-3",
        title: "Consolidación y Embarque",
        description: "Aleshur Logistics consolida la carga en puertos principales y gestiona la estiba optimizando el espacio físico."
      },
      {
        id: "step-4",
        title: "Despacho y Entrega",
        description: "Gestionamos la nacionalización aduanera y el flete local, entregando la mercadería directamente en los almacenes del cliente."
      }
    ]
  },
  contact: {
    email: "contacto@grupoklh.com",
    phone: "+54 (11) 5234-5678",
    address: "Av. Alicia Moreau de Justo 1150, Puerto Madero, CABA, Argentina",
    hours: "Lunes a Viernes de 9:00 a 18:00 hs",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.844146059296!2d-58.36783938477026!3d-34.60809228045864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a33528b9d8df29%3A0x63c3d517c5bcf071!2sAv.%20Alicia%20Moreau%20de%20Justo%201150%2C%20C1107AFB%20CABA!5e0!3m2!1ses-419!2sar!4v1628588383849!5m2!1ses-419!2sar"
  }
};

// Initial database setup
async function initDb() {
  try {
    // Create content table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS landing_content (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if configuration already exists
    const res = await pool.query("SELECT * FROM landing_content WHERE id = 'main_content'");
    if (res.rows.length === 0) {
      await pool.query(
        "INSERT INTO landing_content (id, data) VALUES ($1, $2)",
        ['main_content', JSON.stringify(defaultData)]
      );
      console.log('Database initialized with default landing page content.');
    }
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Acceso denegado. Token no provisto.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido o expirado.' });
    req.user = user;
    next();
  });
}

// Endpoints
app.get('/api/content', async (req, res) => {
  try {
    const result = await pool.query("SELECT data FROM landing_content WHERE id = 'main_content'");
    if (result.rows.length > 0) {
      res.json(result.rows[0].data);
    } else {
      res.status(404).json({ error: 'Contenido no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/content', authenticateToken, async (req, res) => {
  try {
    const updatedData = req.body;
    await pool.query(
      "UPDATE landing_content SET data = $1, updated_at = CURRENT_TIMESTAMP WHERE id = 'main_content'",
      [JSON.stringify(updatedData)]
    );
    res.json({ message: 'Contenido guardado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/upload', authenticateToken, async (req, res) => {
  try {
    const { image, name } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'No se envió ningún archivo.' });
    }

    // Decodificar data URL en base64 (admite tanto image/ como video/)
    const matches = image.match(/^data:(image|video)\/([A-Za-z0-9-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 4) {
      return res.status(400).json({ error: 'Formato de archivo inválido.' });
    }

    const format = matches[2];
    const ext = format === 'jpeg' ? 'jpg' : format;
    const buffer = Buffer.from(matches[3], 'base64');
    
    const cleanName = (name || 'upload.jpg').replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const filename = `uploaded_${Date.now()}_${cleanName}`;
    const filepath = path.join(UPLOADS_DIR, filename);

    fs.writeFileSync(filepath, buffer);
    res.json({ url: `/uploads/${filename}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === adminUser && password === adminPass) {
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }
});

// Middleware to ensure DB connection is ready (Crucial for Vercel Serverless environment)
let dbInitialized = false;
async function ensureDb(req, res, next) {
  if (dbInitialized) {
    return next();
  }
  
  let connected = false;
  let retries = 3;
  while (!connected && retries > 0) {
    try {
      await pool.query('SELECT NOW()');
      connected = true;
    } catch (e) {
      console.error(`Failed to connect to DB. Retrying... (${retries} attempts left)`);
      retries--;
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  if (connected) {
    await initDb();
    dbInitialized = true;
    next();
  } else {
    res.status(500).json({ error: 'Could not connect to PostgreSQL database.' });
  }
}

app.use('/api', ensureDb);

// Start Server (only if not running as a Vercel Serverless function)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
