export interface Certificacion {
  nombre: string;
  numero: string;
  fechaEmision: string;
  fechaVencimiento: string;
}

export interface EPPItem {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen: string;
  stock: number;
  precio?: number;
  tallas: string[];
  caracteristicas: string[] | { nombre: string; valor: string }[];
  certificaciones: Certificacion[];
  fechaVencimiento?: string;
  rubrosPermitidos?: string[];
  rating?: number;
}

export type Rol = 'admin' | 'usuario';

export interface TallasUsuario {
  ropa: string;
  calzado: string;
  casco: string;
  guantes: string;
  respirador: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  rubro: string;
  cargo: string;
  cargoId?: string;
  fechaCreacion: string;
  ultimoAcceso: string;
  estado: 'activo' | 'inactivo';
  tallas: TallasUsuario;
  departamento: string;
  dni: string;
  telefono: string;
  fechaNacimiento?: string;
  direccion?: string;
  contactoEmergencia?: {
    nombre: string;
    telefono: string;
    relacion: string;
  };
  imagen?: string;
  sede: string;
  area: string;
  supervisor: {
    nombre: string;
    cargo: string;
    email: string;
    telefono: string;
  };
  fechaIngreso: string;
  turno: 'mañana' | 'tarde' | 'noche';
  condicionesTrabajo?: string[];
}

export interface CarritoItem {
  id: string;
  cantidad: number;
  talla: string;
}

export type EstadoSolicitud = 'pendiente' | 'aprobada' | 'rechazada' | 'entregada';

export interface Solicitud {
  id: string;
  usuario: Usuario;
  items: (CarritoItem & { producto: EPPItem })[];
  fechaSolicitud: string;
  fechaAprobacion?: string;
  fechaEntrega?: string;
  estado: EstadoSolicitud;
  comentarios?: string;
  aprobadoPor?: Usuario;
}

export interface Cargo {
  id: string;
  nombre: string;
  descripcion: string;
  area: string;
}

export interface CondicionTrabajo {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'ambiente' | 'ubicacion' | 'riesgo';
}

export interface AsignacionEPP {
  id: string;
  cargoId: string;
  condicionTrabajoId?: string;
  eppId: string;
  cantidadAsignada: number;
  obligatorio: boolean;
  periodoRenovacion?: number;
  observaciones?: string;
}

export const cargosDemo: Cargo[] = [
  { id: 'electricista', nombre: 'Electricista', descripcion: 'Especialista en sistemas eléctricos', area: 'Mantenimiento' },
  { id: 'soldador', nombre: 'Soldador', descripcion: 'Especialista en soldadura', area: 'Producción' },
  { id: 'operador_maquinaria', nombre: 'Operador de Maquinaria', descripcion: 'Operador de maquinaria pesada', area: 'Operaciones' },
  { id: 'geologo', nombre: 'Geólogo', descripcion: 'Especialista en estudios de suelo y minerales', area: 'Exploración' },
  { id: 'ingeniero_minas', nombre: 'Ingeniero de Minas', descripcion: 'Profesional especializado en minería', area: 'Planificación' },
  { id: 'seguridad', nombre: 'Personal de Seguridad', descripcion: 'Encargado de vigilancia y seguridad', area: 'Seguridad' },
  { id: 'mecanico', nombre: 'Mecánico', descripcion: 'Especialista en mantenimiento de equipos', area: 'Mantenimiento' },
  { id: 'supervisor', nombre: 'Supervisor', descripcion: 'Encargado de área y personal', area: 'Administración' },
  { id: 'instrumentista', nombre: 'Técnico en Instrumentación', descripcion: 'Especialista en instrumentos de medición y control', area: 'Automatización' },
];

export const condicionesDemoTrabajo: CondicionTrabajo[] = [
  { id: 'mineria_exterior', nombre: 'Minería Exterior', descripcion: 'Trabajos en minas a cielo abierto', tipo: 'ubicacion' },
  { id: 'mineria_subterranea', nombre: 'Minería Subterránea', descripcion: 'Trabajos bajo tierra en túneles y galerías', tipo: 'ubicacion' },
  { id: 'alta_temperatura', nombre: 'Alta Temperatura', descripcion: 'Trabajos con exposición a altas temperaturas', tipo: 'ambiente' },
  { id: 'baja_temperatura', nombre: 'Baja Temperatura', descripcion: 'Trabajos con exposición a bajas temperaturas', tipo: 'ambiente' },
  { id: 'altas_precipitaciones', nombre: 'Altas Precipitaciones', descripcion: 'Zonas con frecuentes lluvias o nevadas', tipo: 'ambiente' },
  { id: 'espacios_confinados', nombre: 'Espacios Confinados', descripcion: 'Trabajo en espacios reducidos o cerrados', tipo: 'ubicacion' },
  { id: 'altura', nombre: 'Trabajo en Altura', descripcion: 'Tareas realizadas por encima de 1.8 metros del suelo', tipo: 'riesgo' },
  { id: 'riesgo_electrico', nombre: 'Riesgo Eléctrico', descripcion: 'Exposición a instalaciones o equipos eléctricos', tipo: 'riesgo' },
  { id: 'ruido_excesivo', nombre: 'Ruido Excesivo', descripcion: 'Exposición a altos niveles de ruido', tipo: 'riesgo' },
  { id: 'material_particulado', nombre: 'Material Particulado', descripcion: 'Exposición a polvo o partículas en suspensión', tipo: 'riesgo' },
  { id: 'area_clasificada', nombre: 'Área Clasificada', descripcion: 'Zonas con riesgo de explosión o presencia de gases inflamables', tipo: 'riesgo' },
];

export const asignacionesEPPDemo: AsignacionEPP[] = [
  { id: 'elect-casco', cargoId: 'electricista', eppId: 'casco001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365 },
  { id: 'elect-guantes-dielectricos', cargoId: 'electricista', eppId: 'guantes002', cantidadAsignada: 2, obligatorio: true, periodoRenovacion: 180 },
  { id: 'elect-botas-dielectricas', cargoId: 'electricista', eppId: 'botas001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365 },
  { id: 'elect-proteccion-ocular', cargoId: 'electricista', eppId: 'gafas001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 180 },
  { id: 'elect-arnes', cargoId: 'electricista', condicionTrabajoId: 'altura', eppId: 'arnes001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365 },
  { id: 'sold-casco', cargoId: 'soldador', eppId: 'casco002', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365 },
  { id: 'sold-careta', cargoId: 'soldador', eppId: 'careta001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 180 },
  { id: 'sold-guantes', cargoId: 'soldador', eppId: 'guantes003', cantidadAsignada: 2, obligatorio: true, periodoRenovacion: 90 },
  { id: 'sold-delantal', cargoId: 'soldador', eppId: 'delantal001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 180 },
  { id: 'sold-polainas', cargoId: 'soldador', eppId: 'polainas001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 180 },
  { id: 'oper-casco', cargoId: 'operador_maquinaria', eppId: 'casco001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365 },
  { id: 'oper-proteccion-auditiva', cargoId: 'operador_maquinaria', eppId: 'auditivos001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 180 },
  { id: 'oper-botas', cargoId: 'operador_maquinaria', eppId: 'botas002', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365 },
  { id: 'geo-casco', cargoId: 'geologo', eppId: 'casco001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365 },
  { id: 'geo-lentes', cargoId: 'geologo', eppId: 'gafas002', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 180 },
  { id: 'geo-protector-solar', cargoId: 'geologo', condicionTrabajoId: 'mineria_exterior', eppId: 'protector001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 90 },
  { id: 'geo-lampara', cargoId: 'geologo', condicionTrabajoId: 'mineria_subterranea', eppId: 'lampara001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 180 },
  { id: 'geo-respirador', cargoId: 'geologo', condicionTrabajoId: 'mineria_subterranea', eppId: 'respirador001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 180 },
  { id: 'inst-casco', cargoId: 'instrumentista', eppId: 'casco001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365 },
  { id: 'inst-gafas', cargoId: 'instrumentista', eppId: 'gafas001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 180 },
  { id: 'inst-guantes-dielectricos', cargoId: 'instrumentista', eppId: 'guantes002', cantidadAsignada: 2, obligatorio: true, periodoRenovacion: 180 },
  { id: 'inst-botas', cargoId: 'instrumentista', eppId: 'botas001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365 },
  { id: 'inst-arnes', cargoId: 'instrumentista', condicionTrabajoId: 'altura', eppId: 'arnes001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365 },
  { id: 'inst-protector-solar', cargoId: 'instrumentista', condicionTrabajoId: 'mineria_exterior', eppId: 'protector001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 90 },
  { id: 'elec-botas-atex', cargoId: 'electricista', condicionTrabajoId: 'area_clasificada', eppId: 'botas001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365, observaciones: 'Se requieren botas certificadas para áreas ATEX' },
  { id: 'inst-equipos-atex', cargoId: 'instrumentista', condicionTrabajoId: 'area_clasificada', eppId: 'respirador001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 180, observaciones: 'Respirador certificado para áreas con gases' },
  { id: 'oper-ropa-ignifuga', cargoId: 'operador_maquinaria', condicionTrabajoId: 'area_clasificada', eppId: 'delantal001', cantidadAsignada: 1, obligatorio: true, periodoRenovacion: 365, observaciones: 'Ropa ignífuga obligatoria en áreas clasificadas' },
]; 