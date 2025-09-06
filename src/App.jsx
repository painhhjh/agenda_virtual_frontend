import React, { useState, useEffect, useCallback } from 'react';
import ListaTareas from './componentes/ListaTareas';
import FormularioTarea from './componentes/FormularioTarea';
import { obtenerTareas } from './servicios/apiTareas';

function App() {
  // Estado para almacenar la lista de tareas
  const [tareas, setTareas] = useState([]);
  // Estado para manejar la carga de datos inicial
  const [cargando, setCargando] = useState(true);
  // Estado para manejar errores de la API
  const [error, setError] = useState(null);

  // Función para cargar las tareas desde la API.
  // Usamos useCallback para memorizar la función y evitar re-renders innecesarios.
  const cargarTareas = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const tareasObtenidas = await obtenerTareas();
      setTareas(tareasObtenidas);
    } catch (err) {
      setError("No se pudieron cargar las tareas. Revisa la conexión con el backend.");
      console.error(err);
    } finally {
      setCargando(false);
    }
  }, []);

  // useEffect para cargar las tareas cuando el componente se monta por primera vez.
  useEffect(() => {
    cargarTareas();
  }, [cargarTareas]);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Agenda Virtual
        </h1>
        <p className="text-gray-500 mt-2">Organiza tu día, una tarea a la vez.</p>
      </header>
      
      <main>
        {/* El formulario para agregar nuevas tareas */}
        <FormularioTarea onTareaCreada={cargarTareas} />
        
        <div className="mt-8">
          {/* Muestra un mensaje de error si la carga falla */}
          {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
          
          {/* Muestra un indicador de carga mientras se obtienen los datos */}
          {cargando ? (
            <p className="text-center text-gray-500">Cargando tareas...</p>
          ) : (
            /* Renderiza la lista de tareas una vez que los datos están disponibles */
            <ListaTareas tareas={tareas} />
          )}
        </div>
      </main>

      <footer className="text-center mt-12 text-gray-400 text-sm">
        <p>Desarrollado con FastAPI, React y MySQL.</p>
      </footer>
    </div>
  );
}

export default App;