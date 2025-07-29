import axios from 'axios';
import { getEnvVariables } from '../helpers';
const { VITE_API_URI } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URI,
});

//TODO: configurar interceptores
calendarApi.interceptors.request.use(config => {
    config.headers = {
        // * Agregar el token de autenticación a las cabeceras
        ...config.headers,
        'x-token': localStorage.getItem('token')
    };
    return config;
});



export default calendarApi;