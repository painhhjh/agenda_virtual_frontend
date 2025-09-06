import React from 'react';

// Componente para mostrar una única tarea.
function Tarea({ tarea }) {

  // Función para obtener clases de estilo según la prioridad de la tarea.
  const obtenerEstiloPrioridad = (prioridad) => {
    switch (prioridad) {
      case 'alta':
        return 'border-l-red-500';
      case 'media':
        return 'border-l-yellow-500';
      case 'baja':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const badgePrioridad = (prioridad) => {
    switch (prioridad) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className={`bg-white p-4 rounded-lg shadow-md flex items-start justify-between border-l-4 ${obtenerEstiloPrioridad(tarea.prioridad)} transition-shadow duration-200 hover:shadow-lg`}
    >
      <div className="flex-grow">
        <div className="flex items-center mb-2">
            <input type="checkbox" checked={tarea.completada} readOnly className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" />
            <h3 className={`text-lg font-semibold text-gray-800 ${tarea.completada ? 'line-through text-gray-400' : ''}`}>
                {tarea.titulo}
            </h3>
        </div>
        
        {tarea.descripcion && (
          <p className={`text-gray-600 ml-8 ${tarea.completada ? 'line-through text-gray-400' : ''}`}>
            {tarea.descripcion}
          </p>
        )}
      </div>
      <div className="ml-4 flex-shrink-0">
         <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${badgePrioridad(tarea.prioridad)}`}>
            {tarea.prioridad}
         </span>
      </div>
    </div>
  );
}

export default Tarea;