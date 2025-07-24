import { Navigate, Route, Routes } from "react-router";
// Components Pages
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { getEnvVariables } from "../helpers";


export const AppRouter = () => {
        // This should be replaced with actual authentication logic;
    const authStatus = 'not-authenticated'; // 'not-authenticated' 'authenticated';
    console.log('EnvVariables: ',getEnvVariables());

    return (
        <Routes>
            {
                (authStatus !== 'authenticated')
                    ? <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />
            }
            {/* this route will manage all the alternative exceptions */}
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
