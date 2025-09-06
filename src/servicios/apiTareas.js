import axios from 'axios';

// Define la URL base de la API. 
const API_URL = 'http://127.0.0.1:8000/tareas/';

//Obtiene todas las tareas desde el backend.

export const obtenerTareas = async () => {
    try {
        const respuesta = await axios.get(API_URL);
        return respuesta.data;
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        // Retorna un array vacío en caso de error para evitar que la app se rompa.
        return [];
    }
};

// Crea una nueva tarea enviando los datos al backend.

export const crearTarea = async (datosTarea) => {
    try {
        const respuesta = await axios.post(API_URL, datosTarea);
        return respuesta.data;
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        throw error;
    }
};
