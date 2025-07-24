import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../apis";
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store/";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        console.log('startLogin', { email, password });
        // * Disparar la accion de checking
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            // * guardar el token en el localStorage
            localStorage.setItem('token', data.token);
            // * checar si el token es valido basado en la fecha de expiracion
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            });
        }

    }


    return {
        // * propiedades
        status, // 'checking', 'not-authenticated', 'authenticated'
        user, // { name: '', email: '' }
        errorMessage, // undefined | string

        // * metodos
        startLogin
    }
}