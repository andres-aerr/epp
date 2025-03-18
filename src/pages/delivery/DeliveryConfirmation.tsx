import { useState } from 'react';

interface DeliveryItem {
  id: string;
  solicitante: string;
  fecha: string;
  items: {
    nombre: string;
    talla: string;
    cantidad: number;
  }[];
  estado: 'pendiente' | 'entregado' | 'cancelado';
}

const DeliveryConfirmation = () => {
  // Datos de ejemplo - En producción esto vendría de una API
  const [deliveries] = useState<DeliveryItem[]>([
    {
      id: '1',
      solicitante: 'Juan Pérez',
      fecha: '2024-03-16',
      items: [
        { nombre: 'Casco de Seguridad', talla: 'M', cantidad: 1 },
        { nombre: 'Guantes de Protección', talla: 'L', cantidad: 2 },
      ],
      estado: 'pendiente',
    },
  ]);

  const handleConfirmDelivery = (deliveryId: string) => {
    // TODO: Implementar lógica de confirmación
    console.log('Confirmando entrega:', deliveryId);
  };

  const handleCancelDelivery = (deliveryId: string) => {
    // TODO: Implementar lógica de cancelación
    console.log('Cancelando entrega:', deliveryId);
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Confirmar Entregas
          </h2>
        </div>
      </div>

      <div className="mt-8">
        <div className="space-y-6">
          {deliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-white shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Entrega #{delivery.id}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Solicitado por {delivery.solicitante} el {delivery.fecha}
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Items</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {delivery.items.map((item, index) => (
                          <li
                            key={index}
                            className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                          >
                            <div className="w-0 flex-1 flex items-center">
                              <span className="ml-2 flex-1 w-0 truncate">
                                {item.nombre} - Talla: {item.talla} - Cantidad: {item.cantidad}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Estado</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {delivery.estado}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleCancelDelivery(delivery.id)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleConfirmDelivery(delivery.id)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Confirmar Entrega
                </button>
              </div>
            </div>
          ))}

          {deliveries.length === 0 && (
            <div className="text-center text-gray-500">
              No hay entregas pendientes
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfirmation; 