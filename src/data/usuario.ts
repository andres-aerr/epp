import { Usuario } from '../types/epp';

export const usuarioEjemplo: Usuario = {
  id: '1',
  nombre: 'Juan',
  apellido: 'Pérez',
  email: 'juan.perez@empresa.com',
  rol: 'usuario',
  rubro: 'construccion',
  cargo: 'Operario',
  fechaCreacion: '2024-01-01',
  ultimoAcceso: '2024-03-15',
  estado: 'activo',
  tallas: {
    ropa: 'L',
    calzado: '42',
    casco: 'M',
    guantes: 'L',
    respirador: 'M'
  },
  departamento: 'Operaciones',
  dni: '12345678',
  telefono: '+51 987654321',
  fechaNacimiento: '1990-05-15',
  direccion: 'Av. Principal 123, Lima',
  contactoEmergencia: {
    nombre: 'María Pérez',
    telefono: '+51 987654322',
    relacion: 'Esposa'
  }
}; 