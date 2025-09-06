import React, { useState } from 'react';
import { crearTarea } from '../servicios/apiTareas.js';

// Componente para el formulario de creación de tareas.
function FormularioTarea({ onTareaCreada }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Maneja el envío del formulario
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    if (!titulo.trim()) {
      setError('El título es obligatorio.');
      return;
    }

    setError('');
    setEnviando(true);

    const nuevaTarea = {
      titulo,
      descripcion,
      prioridad,
    };

    try {
      await crearTarea(nuevaTarea);
      // Limpia el formulario
      setTitulo('');
      setDescripcion('');
      setPrioridad('media');
      // Llama a la función del padre para actualizar la lista de tareas
      onTareaCreada();
    } catch (err) {
      setError('No se pudo crear la tarea. Inténtalo de nuevo.');
      console.error("Error en el formulario:", err);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Agregar Nueva Tarea</h2>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
      <form onSubmit={manejarEnvio}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-gray-600 font-medium mb-2">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. Estudiar para el examen"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-gray-600 font-medium mb-2">Descripción (Opcional)</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Ej. Repasar los capítulos 1 al 5"
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="prioridad" className="block text-gray-600 font-medium mb-2">Prioridad</label>
          <select
            id="prioridad"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300 transition-colors duration-300"
        >
          {enviando ? 'Agregando...' : 'Agregar Tarea'}
        </button>
      </form>
    </div>
  );
}

export default FormularioTarea;