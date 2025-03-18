import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { catalogoEPP } from '../../data/catalogoEPP';

interface Certificacion {
  nombre: string;
  descripcion: string;
}

interface ProductoForm {
  nombre: string;
  descripcion: string;
  categoria: string;
  material: string;
  tallas: string[];
  vidaUtil: string;
  stock: number;
  imagen: string;
  certificaciones: Certificacion[];
}

const EditarProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imagenPreview, setImagenPreview] = useState<string>('');
  const [imagenesAdicionales, setImagenesAdicionales] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<ProductoForm>({
    nombre: '',
    descripcion: '',
    categoria: '',
    material: '',
    tallas: [],
    vidaUtil: '',
    stock: 0,
    imagen: '',
    certificaciones: []
  });

  const categorias = [
    'Protección de Cabeza',
    'Protección Auditiva',
    'Protección Visual',
    'Protección Respiratoria',
    'Protección de Manos',
    'Protección de Pies',
    'Ropa de Trabajo'
  ];

  const tallasDisponibles = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    if (id) {
      const producto = catalogoEPP.find(p => p.id === id);
      if (producto) {
        setFormData({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          categoria: producto.categoria,
          material: producto.material || '',
          tallas: producto.tallas || [],
          vidaUtil: producto.vidaUtil || '',
          stock: producto.stock,
          imagen: producto.imagen,
          certificaciones: producto.certificaciones || []
        });
        setImagenPreview(producto.imagen);
      }
    }
  }, [id]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
        setFormData(prev => ({ ...prev, imagen: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    console.log('Guardando producto:', formData);
    navigate('/admin/catalogo');
  };

  const handleCertificacionChange = (index: number, field: keyof Certificacion, value: string) => {
    const newCertificaciones = [...formData.certificaciones];
    newCertificaciones[index] = {
      ...newCertificaciones[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, certificaciones: newCertificaciones }));
  };

  const agregarCertificacion = () => {
    setFormData(prev => ({
      ...prev,
      certificaciones: [...prev.certificaciones, { nombre: '', descripcion: '' }]
    }));
  };

  const eliminarCertificacion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certificaciones: prev.certificaciones.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          {id ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información básica */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre del Producto
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categoría
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData(prev => ({ ...prev, categoria: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                rows={3}
                value={formData.descripcion}
                onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Material
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vida Útil Recomendada
              </label>
              <input
                type="text"
                value={formData.vidaUtil}
                onChange={(e) => setFormData(prev => ({ ...prev, vidaUtil: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tallas Disponibles
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {tallasDisponibles.map((talla) => (
                  <label key={talla} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.tallas.includes(talla)}
                      onChange={(e) => {
                        const newTallas = e.target.checked
                          ? [...formData.tallas, talla]
                          : formData.tallas.filter(t => t !== talla);
                        setFormData(prev => ({ ...prev, tallas: newTallas }));
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{talla}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Imágenes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Imágenes</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Imagen Principal
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {imagenPreview ? (
                    <div className="relative">
                      <img
                        src={imagenPreview}
                        alt="Preview"
                        className="mx-auto h-48 w-48 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagenPreview('');
                          setFormData(prev => ({ ...prev, imagen: '' }));
                        }}
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-100 rounded-full p-1"
                      >
                        <XMarkIcon className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Subir imagen</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificaciones */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Certificaciones</h2>
            <button
              type="button"
              onClick={agregarCertificacion}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Agregar Certificación
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.certificaciones.map((cert, index) => (
              <div key={index} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex-grow grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre de la Certificación
                    </label>
                    <input
                      type="text"
                      value={cert.nombre}
                      onChange={(e) => handleCertificacionChange(index, 'nombre', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Descripción
                    </label>
                    <input
                      type="text"
                      value={cert.descripcion}
                      onChange={(e) => handleCertificacionChange(index, 'descripcion', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => eliminarCertificacion(index)}
                  className="flex-shrink-0 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/catalogo')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProducto; 