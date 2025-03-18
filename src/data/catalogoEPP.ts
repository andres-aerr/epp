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
  },
  {
    id: 'casco001',
    nombre: 'Casco MSA V-Gard para Minería',
    descripcion: 'Casco de seguridad certificado para minería con soporte para lámpara y alta resistencia a impactos.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_cabeza',
    tallas: ['Universal'],
    stock: 120,
    precio: 0,
    caracteristicas: [
      'Soporte para lámpara frontal',
      'Suspensión de 6 puntos',
      'Resistencia a impactos laterales',
      'Material de alta visibilidad',
      'Compatible con barbiquejos'
    ],
    certificaciones: [
      {
        nombre: 'ANSI/ISEA Z89.1-2014 Tipo I Clase E',
        numero: 'MINE-001',
        fechaEmision: '2023-05-10',
        fechaVencimiento: '2028-05-10'
      }
    ]
  },
  {
    id: 'casco002',
    nombre: 'Casco con Careta para Soldador',
    descripcion: 'Casco con careta abatible para soldadura y protección contra chispas y radiación.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_cabeza',
    tallas: ['Universal'],
    stock: 45,
    precio: 0,
    caracteristicas: [
      'Careta abatible',
      'Filtro oscuro DIN 10',
      'Resistente a altas temperaturas',
      'Protección frontal extendida',
      'Compatible con protección respiratoria'
    ],
    certificaciones: [
      {
        nombre: 'EN 175:1997',
        numero: 'WELD-002',
        fechaEmision: '2023-06-15',
        fechaVencimiento: '2028-06-15'
      }
    ]
  },
  {
    id: 'gafas001',
    nombre: 'Gafas de Protección para Electricistas',
    descripcion: 'Gafas de seguridad con protección contra arco eléctrico y resistencia dieléctrica.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_visual',
    tallas: ['Universal'],
    stock: 80,
    precio: 0,
    caracteristicas: [
      'Marcos no conductivos',
      'Protección lateral integrada',
      'Resistente a impactos',
      'Lentes anti-rayado y anti-empañante',
      'Certificación dieléctrica'
    ],
    certificaciones: [
      {
        nombre: 'ANSI Z87.1+',
        numero: 'ELEC-003',
        fechaEmision: '2023-07-10',
        fechaVencimiento: '2025-07-10'
      }
    ]
  },
  {
    id: 'gafas002',
    nombre: 'Gafas de Protección UV para Exteriores',
    descripcion: 'Gafas de seguridad con protección UV avanzada para trabajos a la intemperie.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_visual',
    tallas: ['Universal'],
    stock: 95,
    precio: 0,
    caracteristicas: [
      'Filtro UV 400',
      'Polarizadas para reducir reflejos',
      'Diseño envolvente',
      'Puente nasal ajustable',
      'Patillas flexibles'
    ],
    certificaciones: [
      {
        nombre: 'EN 166:2001',
        numero: 'OUT-004',
        fechaEmision: '2023-08-05',
        fechaVencimiento: '2025-08-05'
      }
    ]
  },
  {
    id: 'guantes002',
    nombre: 'Guantes Dieléctricos Clase 0',
    descripcion: 'Guantes aislantes para trabajo eléctrico hasta 1000V AC.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_manos',
    tallas: ['9', '10', '11'],
    stock: 60,
    precio: 0,
    caracteristicas: [
      'Resistencia hasta 1000V AC',
      'Clase 0 según normativa',
      'Largo 36 cm para protección del antebrazo',
      'Alta flexibilidad',
      'Requiere guantes de protección mecánica externos'
    ],
    certificaciones: [
      {
        nombre: 'IEC 60903',
        numero: 'DIEL-005',
        fechaEmision: '2023-09-10',
        fechaVencimiento: '2024-09-10'
      }
    ]
  },
  {
    id: 'guantes003',
    nombre: 'Guantes para Soldador con Manga',
    descripcion: 'Guantes de cuero reforzado con manga para protección en soldadura.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_manos',
    tallas: ['L', 'XL'],
    stock: 40,
    precio: 0,
    caracteristicas: [
      'Cuero vacuno de primera calidad',
      'Manga de 20 cm para protección del antebrazo',
      'Costuras con hilo Kevlar',
      'Forro interno térmico',
      'Refuerzos en palma y dedos'
    ],
    certificaciones: [
      {
        nombre: 'EN 12477 Tipo A',
        numero: 'WSOLD-006',
        fechaEmision: '2023-10-15',
        fechaVencimiento: '2025-10-15'
      }
    ]
  },
  {
    id: 'botas001',
    nombre: 'Botas Dieléctricas de Seguridad',
    descripcion: 'Botas con aislamiento eléctrico y puntera de composite.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_pies',
    tallas: ['38', '39', '40', '41', '42', '43', '44'],
    stock: 55,
    precio: 0,
    caracteristicas: [
      'Puntera de composite no conductiva',
      'Suela resistente a 18kV',
      'Plantilla antiperforación no metálica',
      'Absorción de impactos en talón',
      'Resistente a hidrocarburos'
    ],
    certificaciones: [
      {
        nombre: 'ASTM F2413-18',
        numero: 'BOOT-007',
        fechaEmision: '2023-11-20',
        fechaVencimiento: '2025-11-20'
      }
    ]
  },
  {
    id: 'botas002',
    nombre: 'Botas para Minería con Puntera Reforzada',
    descripcion: 'Botas resistentes a perforación con puntera metálica y suela antideslizante.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_pies',
    tallas: ['39', '40', '41', '42', '43', '44', '45'],
    stock: 65,
    precio: 0,
    caracteristicas: [
      'Puntera de acero resistente a 200J',
      'Plantilla antipenetración metálica',
      'Cuero impermeable tratado',
      'Suela resistente a ácidos y aceites',
      'Refuerzo en tobillo y talón'
    ],
    certificaciones: [
      {
        nombre: 'EN ISO 20345:2011 S3 HRO SRC',
        numero: 'MINE-008',
        fechaEmision: '2023-12-10',
        fechaVencimiento: '2025-12-10'
      }
    ]
  },
  {
    id: 'arnes001',
    nombre: 'Arnés de Cuerpo Completo para Trabajo en Altura',
    descripcion: 'Arnés de seguridad con 5 puntos de anclaje y ajuste completo.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_contra_caidas',
    tallas: ['M/L', 'XL/XXL'],
    stock: 30,
    precio: 0,
    caracteristicas: [
      'Puntos de anclaje dorsal, frontal y laterales',
      'Hebillas de conexión rápida',
      'Acolchado en hombros y piernas',
      'Indicador de caída visible',
      'Bandas reflectantes integradas'
    ],
    certificaciones: [
      {
        nombre: 'ANSI Z359.11-2014',
        numero: 'FALL-009',
        fechaEmision: '2024-01-05',
        fechaVencimiento: '2026-01-05'
      }
    ]
  },
  {
    id: 'careta001',
    nombre: 'Careta Facial para Soldador con Oscurecimiento Automático',
    descripcion: 'Careta de soldar con filtro de oscurecimiento automático y amplio campo visual.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_visual',
    tallas: ['Universal'],
    stock: 25,
    precio: 0,
    caracteristicas: [
      'Oscurecimiento automático DIN 4/9-13',
      'Tiempo de reacción 0.04ms',
      'Amplio campo visual',
      'Panel solar con batería de respaldo',
      'Ajuste a la cabeza con sistema de trinquete'
    ],
    certificaciones: [
      {
        nombre: 'EN 379:2003+A1:2009',
        numero: 'WSOLD-010',
        fechaEmision: '2024-01-15',
        fechaVencimiento: '2026-01-15'
      }
    ]
  },
  {
    id: 'auditivos001',
    nombre: 'Protectores Auditivos para Operadores de Maquinaria',
    descripcion: 'Orejeras de alto rendimiento para ambientes de alto ruido industrial.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_auditiva',
    tallas: ['Universal'],
    stock: 70,
    precio: 0,
    caracteristicas: [
      'Atenuación NRR 31dB',
      'Almohadillas rellenas de gel',
      'Diadema acolchada ajustable',
      'Copas pivotantes para ajuste perfecto',
      'Peso ultraligero'
    ],
    certificaciones: [
      {
        nombre: 'ANSI S3.19-1974',
        numero: 'HEAR-011',
        fechaEmision: '2024-01-25',
        fechaVencimiento: '2026-01-25'
      }
    ]
  },
  {
    id: 'respirador001',
    nombre: 'Respirador para Partículas en Minería',
    descripcion: 'Respirador de media cara con filtros P100 para polvo y partículas en minería.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_respiratoria',
    tallas: ['S', 'M', 'L'],
    stock: 50,
    precio: 0,
    caracteristicas: [
      'Filtros P100 (99.97% eficiencia)',
      'Diseñado para polvo de sílice y minerales',
      'Válvula de exhalación CoolFlow',
      'Sello facial de silicona',
      'Compatible con otros EPPs'
    ],
    certificaciones: [
      {
        nombre: 'NIOSH 42 CFR 84',
        numero: 'RESP-012',
        fechaEmision: '2024-02-05',
        fechaVencimiento: '2026-02-05'
      }
    ]
  },
  {
    id: 'delantal001',
    nombre: 'Delantal de Protección para Soldador',
    descripcion: 'Delantal de cuero tratado para resistencia a salpicaduras y chispas.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_corporal',
    tallas: ['Universal'],
    stock: 40,
    precio: 0,
    caracteristicas: [
      'Cuero vacuno de 1.2mm de espesor',
      'Tratamiento ignífugo',
      'Correas ajustables para cuello y cintura',
      'Cubre desde el pecho hasta debajo de la rodilla',
      'Costuras reforzadas con hilo Kevlar'
    ],
    certificaciones: [
      {
        nombre: 'EN ISO 11611:2015',
        numero: 'WSOLD-013',
        fechaEmision: '2024-02-15',
        fechaVencimiento: '2026-02-15'
      }
    ]
  },
  {
    id: 'polainas001',
    nombre: 'Polainas de Cuero para Soldador',
    descripcion: 'Polainas de cuero con cierre lateral para protección en soldadura.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_corporal',
    tallas: ['Universal'],
    stock: 35,
    precio: 0,
    caracteristicas: [
      'Cuero vacuno de primera calidad',
      'Cierre lateral con velcro',
      'Protección desde el tobillo hasta la rodilla',
      'Base reforzada para mayor durabilidad',
      'Ajuste elastizado superior'
    ],
    certificaciones: [
      {
        nombre: 'EN ISO 11611:2015',
        numero: 'WSOLD-014',
        fechaEmision: '2024-02-25',
        fechaVencimiento: '2026-02-25'
      }
    ]
  },
  {
    id: 'lampara001',
    nombre: 'Lámpara Frontal para Casco Minero',
    descripcion: 'Lámpara LED recargable de alta potencia para trabajo en minería subterránea.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'iluminacion',
    tallas: ['Universal'],
    stock: 60,
    precio: 0,
    caracteristicas: [
      'LED de 10000 lux',
      'Batería recargable de litio',
      'Autonomía de 12 horas',
      'Resistente al agua IP67',
      'Soporte universal para casco'
    ],
    certificaciones: [
      {
        nombre: 'ATEX II 2G Ex ib IIC T4',
        numero: 'LAMP-015',
        fechaEmision: '2024-03-05',
        fechaVencimiento: '2026-03-05'
      }
    ]
  },
  {
    id: 'protector001',
    nombre: 'Protector Solar Industrial FPS 50+',
    descripcion: 'Protector solar resistente al agua y sudor para trabajo en exteriores.',
    imagen: '/images/epp/product-photo.svg',
    categoria: 'proteccion_piel',
    tallas: ['Universal'],
    stock: 100,
    precio: 0,
    caracteristicas: [
      'FPS 50+ UVA/UVB',
      'Resistente al agua por 80 minutos',
      'No graso y de rápida absorción',
      'Hipoalergénico',
      'Formato de 120ml de fácil transporte'
    ],
    certificaciones: [
      {
        nombre: 'FDA Approved',
        numero: 'SUN-016',
        fechaEmision: '2024-03-15',
        fechaVencimiento: '2025-03-15'
      }
    ]
  }
];

export const getProductosRelacionados = (productoId: string, categoria: string): EPPItem[] => {
  return catalogoEPP
    .filter(producto => producto.id !== productoId && producto.categoria === categoria)
    .slice(0, 4);
}; 