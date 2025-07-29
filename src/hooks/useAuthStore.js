import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../apis";
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store/";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const startLogin = async ({ email, password }) => {
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
            }, 10);
        }
    }

    const startRegister = async ({ registerName, registerEmail, registerPassword }) => {
        dispatch(onChecking());
        try {
            await calendarApi.post('auth/new', { name: registerName, email: registerEmail, password: registerPassword });
            // * Iniciar sesion automaticamente despues de registrarse
            await startLogin({ email: registerEmail, password: registerPassword });
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || 'Hay un error con el registro'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout());
        };
    };

    const startLogout = () => {
        localStorage.clear();
        // * Disparar la accion de logout
        dispatch(onLogout());
    }

    return {
        // * propiedades
        status, // 'checking', 'not-authenticated', 'authenticated'
        user, // { name: '', email: '' }
        errorMessage, // undefined | string

        // * metodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}
