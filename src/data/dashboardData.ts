import { Usuario } from '../types/epp';

// Estadísticas generales
export const estadisticasGenerales = {
  usuariosActivos: 245,
  solicitudesPendientes: 18,
  solicitudesAprobadas: 156,
  solicitudesRechazadas: 12,
  eppEntregado: 423,
  eppPorVencer: 45,
  eppVencido: 12,
  presupuestoAnual: 150000,
  presupuestoUtilizado: 98500,
};

// Datos para el gráfico de solicitudes por mes
export const solicitudesPorMes = [
  { mes: 'Enero', cantidad: 45 },
  { mes: 'Febrero', cantidad: 38 },
  { mes: 'Marzo', cantidad: 52 },
  { mes: 'Abril', cantidad: 41 },
  { mes: 'Mayo', cantidad: 47 },
  { mes: 'Junio', cantidad: 53 },
  { mes: 'Julio', cantidad: 49 },
  { mes: 'Agosto', cantidad: 55 },
  { mes: 'Septiembre', cantidad: 48 },
  { mes: 'Octubre', cantidad: 43 },
  { mes: 'Noviembre', cantidad: 51 },
  { mes: 'Diciembre', cantidad: 44 },
];

// Datos para el gráfico de EPP por departamento
export const eppPorDepartamento = [
  { departamento: 'Operaciones', cantidad: 156 },
  { departamento: 'Mantenimiento', cantidad: 98 },
  { departamento: 'Laboratorio', cantidad: 45 },
  { departamento: 'Seguridad', cantidad: 67 },
  { departamento: 'Almacén', cantidad: 34 },
  { departamento: 'Supervisión', cantidad: 23 },
];

// Datos para el gráfico de EPP por tipo
export const eppPorTipo = [
  { tipo: 'Cascos', cantidad: 245, porcentaje: 25 },
  { tipo: 'Guantes', cantidad: 312, porcentaje: 32 },
  { tipo: 'Lentes', cantidad: 198, porcentaje: 20 },
  { tipo: 'Respiradores', cantidad: 156, porcentaje: 16 },
  { tipo: 'Calzado', cantidad: 67, porcentaje: 7 },
];

// Datos de solicitudes recientes
export const solicitudesRecientes = [
  {
    id: 'SOL-001',
    usuario: 'Carlos Rodríguez',
    departamento: 'Operaciones',
    fecha: '2024-03-15',
    estado: 'pendiente',
    items: [
      { nombre: 'Casco MSA V-Gard', cantidad: 1 },
      { nombre: 'Guantes de Nitrilo', cantidad: 2 },
    ],
  },
  {
    id: 'SOL-002',
    usuario: 'Ana Silva',
    departamento: 'Laboratorio',
    fecha: '2024-03-14',
    estado: 'aprobado',
    items: [
      { nombre: 'Respirador 3M 6200', cantidad: 1 },
      { nombre: 'Filtros P100', cantidad: 2 },
    ],
  },
  {
    id: 'SOL-003',
    usuario: 'Pedro Ramírez',
    departamento: 'Mantenimiento',
    fecha: '2024-03-14',
    estado: 'entregado',
    items: [
      { nombre: 'Botas de Seguridad', cantidad: 1 },
      { nombre: 'Lentes de Seguridad', cantidad: 1 },
    ],
  },
  {
    id: 'SOL-004',
    usuario: 'María Torres',
    departamento: 'Seguridad',
    fecha: '2024-03-13',
    estado: 'rechazado',
    items: [
      { nombre: 'Arnés de Seguridad', cantidad: 1 },
    ],
  },
  {
    id: 'SOL-005',
    usuario: 'Juan Pérez',
    departamento: 'Operaciones',
    fecha: '2024-03-13',
    estado: 'pendiente',
    items: [
      { nombre: 'Protector Auditivo', cantidad: 1 },
      { nombre: 'Chaleco Reflectivo', cantidad: 1 },
    ],
  },
];

// Datos de EPP por vencer
export const eppPorVencer = [
  {
    id: 'EPP-001',
    tipo: 'Casco MSA V-Gard',
    usuario: 'Carlos Rodríguez',
    fechaVencimiento: '2024-04-15',
    diasRestantes: 30,
  },
  {
    id: 'EPP-002',
    tipo: 'Respirador 3M 6200',
    usuario: 'Ana Silva',
    fechaVencimiento: '2024-04-20',
    diasRestantes: 35,
  },
  {
    id: 'EPP-003',
    tipo: 'Filtros P100',
    usuario: 'Pedro Ramírez',
    fechaVencimiento: '2024-04-10',
    diasRestantes: 25,
  },
  {
    id: 'EPP-004',
    tipo: 'Arnés de Seguridad',
    usuario: 'María Torres',
    fechaVencimiento: '2024-04-05',
    diasRestantes: 20,
  },
];

// Datos de stock crítico
export const stockCritico = [
  {
    id: 'PROD-001',
    nombre: 'Casco MSA V-Gard',
    stockActual: 5,
    stockMinimo: 10,
    estado: 'crítico',
  },
  {
    id: 'PROD-002',
    nombre: 'Guantes de Nitrilo',
    stockActual: 15,
    stockMinimo: 20,
    estado: 'advertencia',
  },
  {
    id: 'PROD-003',
    nombre: 'Filtros P100',
    stockActual: 8,
    stockMinimo: 15,
    estado: 'crítico',
  },
  {
    id: 'PROD-004',
    nombre: 'Lentes de Seguridad',
    stockActual: 12,
    stockMinimo: 25,
    estado: 'crítico',
  },
];

// Datos de actividad reciente
export const actividadReciente = [
  {
    id: 'ACT-001',
    tipo: 'solicitud',
    descripcion: 'Nueva solicitud de EPP creada',
    usuario: 'Carlos Rodríguez',
    fecha: '2024-03-15T10:30:00',
  },
  {
    id: 'ACT-002',
    tipo: 'aprobacion',
    descripcion: 'Solicitud de EPP aprobada',
    usuario: 'Admin',
    fecha: '2024-03-15T09:45:00',
  },
  {
    id: 'ACT-003',
    tipo: 'entrega',
    descripcion: 'EPP entregado a usuario',
    usuario: 'Ana Silva',
    fecha: '2024-03-14T16:20:00',
  },
  {
    id: 'ACT-004',
    tipo: 'rechazo',
    descripcion: 'Solicitud de EPP rechazada',
    usuario: 'Admin',
    fecha: '2024-03-14T14:15:00',
  },
  {
    id: 'ACT-005',
    tipo: 'stock',
    descripcion: 'Stock actualizado',
    usuario: 'Admin',
    fecha: '2024-03-14T11:30:00',
  },
];

// KPIs para el dashboard de administrador
export const kpisAdmin = {
  tasaAprobacion: 85, // porcentaje
  tiempoPromedioAprobacion: 2.5, // días
  tasaRenovacionEPP: 92, // porcentaje
  cumplimientoPresupuesto: 65.6, // porcentaje
  satisfaccionUsuarios: 4.2, // de 5 estrellas
  incidentesReportados: 8,
};

// KPIs para el dashboard de usuario
export const kpisUsuario = {
  eppActivo: 5,
  solicitudesPendientes: 2,
  proximosVencimientos: 1,
  ultimaEntrega: '2024-03-10',
  proximaRenovacion: '2024-04-15',
  estadoCompliance: 'Completo',
}; 