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
  imagen: string;
  precio: number;
  categoria: string;
  tallas: string[];
  certificaciones: Certificacion[];
  fechaVencimiento: string;
  stock: number;
  rubrosPermitidos: string[];
  caracteristicas: string[];
  rating?: number;
}

export type Rol = 'admin' | 'usuario';

export interface TallasUsuario {
  ropa: string;         // S, M, L, XL, XXL
  calzado: string;      // 35-46
  casco: string;        // Universal, S, M, L
  guantes: string;      // S, M, L, XL
  respirador: string;   // S, M, L
}

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  rubro: string;
  cargo: string;
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
  // Información laboral adicional
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
}

export interface CarritoItem {
  id: string;
  talla: string;
  cantidad: number;
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