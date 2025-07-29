import { Navigate, Route, Routes } from "react-router";
// Components Pages
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { getEnvVariables } from "../helpers";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";


export const AppRouter = () => {
    // This should be replaced with actual authentication logic;
    // const authStatus = 'not-authenticated'; // 'not-authenticated' 'authenticated';
    
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <h1>cargando...</h1>
        );
    }

    return (
        <Routes>
        {/* haciendolo de manera forzada */}
            {
                (status !== 'authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            {/* this route will manage all the alternative exceptions */}
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                             <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }

        </Routes>
    )
}
