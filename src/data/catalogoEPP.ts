import { EPPItem } from '../types/epp';

export const catalogoEPP: EPPItem[] = [
  {
    id: '1',
    nombre: 'Casco MSA V-Gard',
    descripcion: 'Casco de seguridad premium con suspensión Fas-Trac III. Diseñado para proporcionar protección superior contra impactos y penetración. Incluye ranuras para accesorios como protectores auditivos y faciales.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_cabeza',
    tallas: ['Universal', 'S', 'M', 'L', 'XL'],
    certificaciones: [
      {
        nombre: 'ANSI/ISEA Z89.1-2014',
        numero: 'CERT-2024-001',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2029-01-01'
      },
      {
        nombre: 'EN 397:2012',
        numero: 'CERT-2024-002',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2029-01-01'
      }
    ],
    fechaVencimiento: '2029-01-01',
    stock: 50,
    rubrosPermitidos: ['mineria', 'construccion', 'industrial'],
    caracteristicas: [
      'Material: Polietileno de alta densidad',
      'Peso: 350g',
      'Suspensión ajustable de 4 puntos',
      'Almohadilla de sudor reemplazable',
      'Ranuras para accesorios universales',
      'Resistente a temperaturas de -30°C a +50°C',
      'Canal de lluvia integrado'
    ],
    rating: 4.5
  },
  {
    id: '2',
    nombre: 'Lentes de Seguridad 3M',
    descripcion: 'Lentes de seguridad con protección UV y antiempañante. Marco ligero y resistente con patillas ajustables para mayor comodidad. Ideal para uso prolongado en ambientes industriales.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_visual',
    tallas: ['Universal'],
    certificaciones: [
      {
        nombre: 'ANSI Z87.1-2020',
        numero: 'CERT-2024-003',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2029-01-01'
      }
    ],
    fechaVencimiento: '2029-01-01',
    stock: 100,
    rubrosPermitidos: ['mineria', 'construccion', 'industrial', 'laboratorio'],
    caracteristicas: [
      'Protección UV 99.9%',
      'Tratamiento antiempañante',
      'Resistente a impactos',
      'Patillas ajustables',
      'Peso: 25g',
      'Incluye cordón de seguridad'
    ],
    rating: 4.8
  },
  {
    id: '3',
    nombre: 'Respirador 3M 6200',
    descripcion: 'Respirador de media cara reutilizable diseñado para brindar protección confiable y cómoda. Compatible con una amplia gama de filtros y cartuchos para diferentes aplicaciones.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_respiratoria',
    tallas: ['S', 'M', 'L'],
    certificaciones: [
      {
        nombre: 'NIOSH 42 CFR 84',
        numero: 'TC-84A-1234',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2029-01-01'
      }
    ],
    fechaVencimiento: '2029-01-01',
    stock: 75,
    rubrosPermitidos: ['mineria', 'industrial', 'quimico'],
    caracteristicas: [
      'Diseño de bajo perfil',
      'Válvula de exhalación Cool Flow™',
      'Arnés de cabeza ajustable',
      'Compatible con filtros serie 2000, 2200, 5000 y 6000',
      'Material hipoalergénico',
      'Peso: 82g'
    ],
    rating: 4.7
  },
  {
    id: '4',
    nombre: 'Guantes de Nitrilo',
    descripcion: 'Guantes de protección química y mecánica, resistentes a aceites y solventes.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_manos',
    tallas: ['S', 'M', 'L', 'XL'],
    certificaciones: [
      {
        nombre: 'EN 388:2016',
        numero: '4544',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2025-06-01'
      }
    ],
    fechaVencimiento: '2025-06-01',
    stock: 200,
    rubrosPermitidos: ['industrial', 'quimico', 'laboratorio'],
    caracteristicas: [
      'Resistencia al corte nivel 4',
      'Resistencia a la abrasión nivel 4',
      'Grip texturizado',
      'Longitud: 30cm'
    ]
  },
  {
    id: '5',
    nombre: 'Zapatos de Seguridad Caterpillar',
    descripcion: 'Calzado de seguridad con punta de acero y suela antideslizante.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_pies',
    tallas: ['38', '39', '40', '41', '42', '43', '44'],
    certificaciones: [
      {
        nombre: 'ASTM F2413-18',
        numero: 'F2413-18',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2026-01-01'
      }
    ],
    fechaVencimiento: '2026-01-01',
    stock: 45,
    rubrosPermitidos: ['construccion', 'mineria', 'industrial'],
    caracteristicas: [
      'Punta de acero',
      'Suela antideslizante',
      'Resistente al agua',
      'Plantilla antimicrobiana'
    ]
  },
  {
    id: '6',
    nombre: 'Protector Auditivo 3M Peltor',
    descripcion: 'Orejeras de protección auditiva con alto nivel de atenuación.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_auditiva',
    tallas: ['Universal'],
    certificaciones: [
      {
        nombre: 'ANSI S3.19-1974',
        numero: 'NRR 24dB',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2026-01-01'
      }
    ],
    fechaVencimiento: '2026-01-01',
    stock: 75,
    rubrosPermitidos: ['construccion', 'mineria', 'industrial'],
    caracteristicas: [
      'NRR: 24 dB',
      'Diadema ajustable',
      'Almohadillas reemplazables',
      'Peso: 220g'
    ]
  },
  {
    id: '7',
    nombre: 'Overol de Trabajo',
    descripcion: 'Overol de trabajo resistente a salpicaduras y con alta visibilidad.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'ropa_trabajo',
    tallas: ['S', 'M', 'L', 'XL', 'XXL'],
    certificaciones: [
      {
        nombre: 'EN ISO 20471:2013',
        numero: 'Clase 3',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2025-01-01'
      }
    ],
    fechaVencimiento: '2025-01-01',
    stock: 60,
    rubrosPermitidos: ['construccion', 'industrial'],
    caracteristicas: [
      'Material: 65% poliéster, 35% algodón',
      'Cintas reflectivas 3M',
      'Múltiples bolsillos',
      'Cierre YKK'
    ]
  },
  {
    id: '8',
    nombre: 'Arnés de Seguridad',
    descripcion: 'Arnés de cuerpo completo con cinco puntos de anclaje.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_altura',
    tallas: ['M/L', 'XL/XXL'],
    certificaciones: [
      {
        nombre: 'ANSI Z359.11-2014',
        numero: 'Z359.11-2014',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2025-01-01'
      }
    ],
    fechaVencimiento: '2025-01-01',
    stock: 25,
    rubrosPermitidos: ['construccion', 'industrial'],
    caracteristicas: [
      '5 puntos de anclaje',
      'Hebillas de conexión rápida',
      'Indicador de impacto',
      'Capacidad: 140 kg'
    ]
  },
  {
    id: '9',
    nombre: 'Traje Tyvek Classic Xpert',
    descripcion: 'Traje de protección química y contra partículas.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_corporal',
    tallas: ['S', 'M', 'L', 'XL', 'XXL'],
    certificaciones: [
      {
        nombre: 'EN 14126',
        numero: 'CERT-505',
        fechaEmision: '2023-08-01',
        fechaVencimiento: '2024-08-01'
      }
    ],
    stock: 150,
    rubrosPermitidos: ['laboratorio', 'industrial'],
    caracteristicas: [
      { nombre: 'Tipo', valor: 'Tipo 5 y 6' },
      { nombre: 'Material', valor: 'Tyvek' },
      { nombre: 'Costuras', valor: 'Selladas' }
    ]
  },
  {
    id: '10',
    nombre: 'Pantalla Facial 3M Speedglas 9100',
    descripcion: 'Pantalla de soldadura con filtro auto-oscurecente.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_visual',
    tallas: ['Universal'],
    certificaciones: [
      {
        nombre: 'EN 379',
        numero: 'CERT-606',
        fechaEmision: '2023-09-01',
        fechaVencimiento: '2024-09-01'
      }
    ],
    stock: 15,
    rubrosPermitidos: ['industrial', 'construccion'],
    caracteristicas: [
      { nombre: 'Tiempo de conmutación', valor: '0.1 ms' },
      { nombre: 'Clasificación óptica', valor: '1/1/1/2' },
      { nombre: 'Campo visual', valor: '73 x 107 mm' }
    ]
  },
  {
    id: '11',
    nombre: 'Chaleco Reflectante 3M',
    descripcion: 'Chaleco de alta visibilidad con cintas reflectantes.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_corporal',
    tallas: ['S', 'M', 'L', 'XL', 'XXL'],
    certificaciones: [
      {
        nombre: 'EN ISO 20471',
        numero: 'CERT-707',
        fechaEmision: '2023-10-01',
        fechaVencimiento: '2024-10-01'
      }
    ],
    stock: 100,
    rubrosPermitidos: ['mineria', 'construccion', 'industrial'],
    caracteristicas: [
      { nombre: 'Clase', valor: 'Clase 2' },
      { nombre: 'Material', valor: 'Poliéster' },
      { nombre: 'Cintas reflectantes', valor: '2 horizontales, 2 verticales' }
    ]
  },
  {
    id: '12',
    nombre: 'Guantes de Nitrilo Ansell TouchNTuff',
    descripcion: 'Guantes desechables de nitrilo para protección química.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_manos',
    tallas: ['S', 'M', 'L', 'XL'],
    certificaciones: [
      {
        nombre: 'EN 374-1:2016',
        numero: 'CERT-808',
        fechaEmision: '2023-11-01',
        fechaVencimiento: '2024-11-01'
      }
    ],
    stock: 500,
    rubrosPermitidos: ['laboratorio', 'industrial'],
    caracteristicas: [
      { nombre: 'Espesor', valor: '0.12 mm' },
      { nombre: 'Sin polvo', valor: 'Sí' },
      { nombre: 'Longitud', valor: '240 mm' }
    ]
  },
  {
    id: '13',
    nombre: 'Botas de Goma Dunlop Purofort',
    descripcion: 'Botas de seguridad impermeables con punta de acero.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_pies',
    tallas: ['38', '39', '40', '41', '42', '43', '44', '45'],
    certificaciones: [
      {
        nombre: 'EN ISO 20345:2011',
        numero: 'CERT-909',
        fechaEmision: '2023-12-01',
        fechaVencimiento: '2024-12-01'
      }
    ],
    stock: 40,
    rubrosPermitidos: ['mineria', 'industrial'],
    caracteristicas: [
      { nombre: 'Material', valor: 'PU Purofort' },
      { nombre: 'Resistencia', valor: 'Productos químicos' },
      { nombre: 'Suela', valor: 'SRC antideslizante' }
    ]
  },
  {
    id: '14',
    nombre: 'Protector Solar Industrial Bullfrog',
    descripcion: 'Protector solar resistente al agua y sudor, FPS 50+.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_piel',
    tallas: ['Universal'],
    certificaciones: [
      {
        nombre: 'FDA Approved',
        numero: 'CERT-010',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2025-01-01'
      }
    ],
    stock: 200,
    rubrosPermitidos: ['mineria', 'construccion', 'industrial'],
    caracteristicas: [
      { nombre: 'FPS', valor: '50+' },
      { nombre: 'Resistencia al agua', valor: '80 minutos' },
      { nombre: 'Contenido', valor: '250ml' }
    ]
  },
  {
    id: '15',
    nombre: 'Tapones Auditivos 3M E-A-R Classic',
    descripcion: 'Tapones auditivos de espuma con alto nivel de atenuación.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_auditiva',
    tallas: ['Universal'],
    certificaciones: [
      {
        nombre: 'ANSI S3.19-1974',
        numero: 'CERT-111',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2025-01-01'
      }
    ],
    stock: 1000,
    rubrosPermitidos: ['mineria', 'construccion', 'industrial'],
    caracteristicas: [
      { nombre: 'NRR', valor: '29 dB' },
      { nombre: 'Material', valor: 'Espuma de poliuretano' },
      { nombre: 'Uso', valor: 'Desechable' }
    ]
  },
  {
    id: '16',
    nombre: 'Rodilleras Profesionales DeWalt',
    descripcion: 'Rodilleras con gel y carcasa externa resistente.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_corporal',
    tallas: ['Universal'],
    certificaciones: [
      {
        nombre: 'EN 14404',
        numero: 'CERT-212',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2025-01-01'
      }
    ],
    stock: 50,
    rubrosPermitidos: ['construccion'],
    caracteristicas: [
      { nombre: 'Material exterior', valor: 'PVC resistente' },
      { nombre: 'Relleno', valor: 'Gel' },
      { nombre: 'Ajuste', valor: 'Velcro elástico' }
    ]
  },
  {
    id: '17',
    nombre: 'Máscara para Soldadura Miller Digital Elite',
    descripcion: 'Máscara de soldadura con tecnología de auto-oscurecimiento y 4 sensores.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_visual',
    tallas: ['Universal'],
    certificaciones: [
      {
        nombre: 'ANSI Z87.1',
        numero: 'CERT-313',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2025-01-01'
      }
    ],
    stock: 20,
    rubrosPermitidos: ['industrial', 'construccion'],
    caracteristicas: [
      { nombre: 'Modos', valor: 'Soldadura/Corte/Pulido/X-Mode' },
      { nombre: 'Sensores', valor: '4' },
      { nombre: 'Tiempo de reacción', valor: '1/20,000 seg' }
    ]
  },
  {
    id: '18',
    nombre: 'Delantal de Cuero para Soldador',
    descripcion: 'Delantal de cuero resistente al calor y chispas.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_corporal',
    tallas: ['Universal'],
    certificaciones: [
      {
        nombre: 'EN ISO 11611',
        numero: 'CERT-414',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2025-01-01'
      }
    ],
    stock: 30,
    rubrosPermitidos: ['industrial'],
    caracteristicas: [
      { nombre: 'Material', valor: 'Cuero vacuno' },
      { nombre: 'Largo', valor: '90 cm' },
      { nombre: 'Ajuste', valor: 'Correas ajustables' }
    ]
  },
  {
    id: '19',
    nombre: 'Línea de Vida Retráctil DBI-SALA',
    descripcion: 'Línea de vida autorretráctil con cable de acero galvanizado.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_contra_caidas',
    tallas: ['Universal'],
    certificaciones: [
      {
        nombre: 'ANSI Z359.14',
        numero: 'CERT-515',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2025-01-01'
      }
    ],
    stock: 15,
    rubrosPermitidos: ['mineria', 'construccion'],
    caracteristicas: [
      { nombre: 'Longitud', valor: '15 m' },
      { nombre: 'Material cable', valor: 'Acero galvanizado' },
      { nombre: 'Capacidad', valor: '140 kg' }
    ]
  },
  {
    id: '20',
    nombre: 'Guantes Anticorte Ansell HyFlex',
    descripcion: 'Guantes con resistencia al corte y agarre en aceite.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_manos',
    tallas: ['7', '8', '9', '10', '11'],
    certificaciones: [
      {
        nombre: 'EN 388:2016',
        numero: 'CERT-616',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2025-01-01'
      }
    ],
    stock: 100,
    rubrosPermitidos: ['industrial', 'mineria'],
    caracteristicas: [
      { nombre: 'Nivel de corte', valor: 'B (3)' },
      { nombre: 'Recubrimiento', valor: 'Nitrilo' },
      { nombre: 'Galga', valor: '18' }
    ]
  },
  {
    id: '21',
    nombre: 'Protector Facial para Arco Eléctrico',
    descripcion: 'Protector facial con protección contra arco eléctrico y UV.',
    imagen: '/images/epp/product-photo.svg',
    precio: 0,
    categoria: 'proteccion_visual',
    tallas: ['Universal'],
    certificaciones: [
      {
        nombre: 'ASTM F2178',
        numero: 'CERT-717',
        fechaEmision: '2024-01-01',
        fechaVencimiento: '2025-01-01'
      }
    ],
    stock: 25,
    rubrosPermitidos: ['industrial'],
    caracteristicas: [
      { nombre: 'Calificación ATPV', valor: '12 cal/cm²' },
      { nombre: 'Material visor', valor: 'Policarbonato' },
      { nombre: 'Protección UV', valor: '99.9%' }
    ]
  }
];

export const getProductosRelacionados = (productoId: string, categoria: string): EPPItem[] => {
  return catalogoEPP
    .filter(producto => producto.id !== productoId && producto.categoria === categoria)
    .slice(0, 4);
}; 