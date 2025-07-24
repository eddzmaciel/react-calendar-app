import axios from 'axios';
import { getEnvVariables } from '../helpers';
const { VITE_API_URI } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URI,
});

//TODO: configurar interceptores
export default calendarApi;