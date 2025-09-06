import React from 'react';
import Tarea from './Tarea.jsx';

// Componente para mostrar la lista de tareas.

function ListaTareas({ tareas }) {

  // Si no hay tareas, muestra un mensaje amigable.
  if (!tareas || tareas.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        <h3 className="text-xl font-semibold mb-2">¡Todo listo por hoy!</h3>
        <p>No tienes tareas pendientes. ¡Añade una para empezar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      //Mapea el array de tareas y renderiza un componente 'Tarea' por cada una.
      {tareas.map((tarea) => (
        <Tarea key={tarea.id} tarea={tarea} />
      ))}
    </div>
  );
}

export default ListaTareas;