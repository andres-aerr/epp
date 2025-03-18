import { Usuario } from '../types/epp';

export const usuarios: Usuario[] = [
  {
    id: '1',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@empresa.com',
    dni: '12345678',
    telefono: '987654321',
    fechaNacimiento: '1990-05-15',
    direccion: 'Av. Principal 123',
    // Información laboral (editable por admin)
    departamento: 'Operaciones',
    cargo: 'Operario de Maquinaria Pesada',
    rubro: 'mineria',
    rol: 'usuario',
    // Información del supervisor (editable por admin)
    supervisor: {
      nombre: 'Carlos',
      apellido: 'González',
      email: 'carlos.gonzalez@empresa.com',
      telefono: '999888777',
      cargo: 'Supervisor de Operaciones'
    },
    // Información del sistema
    fechaCreacion: '2024-01-01',
    ultimoAcceso: '2024-03-15',
    estado: 'activo',
    // Información de contacto de emergencia
    contactoEmergencia: {
      nombre: 'María',
      apellido: 'Pérez',
      parentesco: 'Esposa',
      telefono: '999777666'
    },
    // Tallas registradas
    tallas: {
      ropa: 'L',
      calzado: '42',
      casco: 'M',
      guantes: 'L',
      respirador: 'M'
    }
  },
  {
    id: '2',
    nombre: 'Ana',
    apellido: 'Silva',
    email: 'ana.silva@empresa.com',
    dni: '87654321',
    telefono: '999111222',
    fechaNacimiento: '1995-08-20',
    direccion: 'Jr. Los Pinos 456',
    // Información laboral (editable por admin)
    departamento: 'Seguridad',
    cargo: 'Supervisora de Seguridad',
    rubro: 'industrial',
    rol: 'supervisor',
    // Información del supervisor (editable por admin)
    supervisor: {
      nombre: 'Roberto',
      apellido: 'Martínez',
      email: 'roberto.martinez@empresa.com',
      telefono: '999222333',
      cargo: 'Jefe de Seguridad'
    },
    // Información del sistema
    fechaCreacion: '2024-01-15',
    ultimoAcceso: '2024-03-14',
    estado: 'activo',
    // Información de contacto de emergencia
    contactoEmergencia: {
      nombre: 'Jorge',
      apellido: 'Silva',
      parentesco: 'Hermano',
      telefono: '999444555'
    },
    // Tallas registradas
    tallas: {
      ropa: 'M',
      calzado: '37',
      casco: 'S',
      guantes: 'M',
      respirador: 'S'
    }
  },
  {
    id: '3',
    nombre: 'Pedro',
    apellido: 'Ramírez',
    email: 'pedro.ramirez@empresa.com',
    dni: '45678912',
    telefono: '999333444',
    fechaNacimiento: '1988-11-10',
    direccion: 'Calle Las Flores 789',
    // Información laboral (editable por admin)
    departamento: 'Mantenimiento',
    cargo: 'Técnico Mecánico',
    rubro: 'construccion',
    rol: 'usuario',
    // Información del supervisor (editable por admin)
    supervisor: {
      nombre: 'Luis',
      apellido: 'Torres',
      email: 'luis.torres@empresa.com',
      telefono: '999555666',
      cargo: 'Supervisor de Mantenimiento'
    },
    // Información del sistema
    fechaCreacion: '2024-02-01',
    ultimoAcceso: '2024-03-13',
    estado: 'activo',
    // Información de contacto de emergencia
    contactoEmergencia: {
      nombre: 'Carmen',
      apellido: 'Ramírez',
      parentesco: 'Madre',
      telefono: '999666777'
    },
    // Tallas registradas
    tallas: {
      ropa: 'XL',
      calzado: '44',
      casco: 'L',
      guantes: 'XL',
      respirador: 'L'
    }
  }
]; 