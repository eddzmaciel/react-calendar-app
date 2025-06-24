import { Navigate, Route, Routes } from "react-router";
// Components Pages
import { LoginPage } from "../auth/";
import { CalendarPage } from "../calendar/";


export const AppRouter = () => {
        // This should be replaced with actual authentication logic;
    const authStatus = 'authenticated'; // 'not-authenticated' 'authenticated'

    return (
        <Routes>
            {
                (authStatus === 'not-authenticated')
                    ? <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />
            }
            {/* this route will manage all the alternative exceptions */}
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
