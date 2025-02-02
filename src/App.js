import React, {lazy, Suspense, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./providers/PrivateRoute";
import {useAuthStore} from "./store/useAuthStore";


const Login = lazy(() => import("./screens/login"));
const SeoPanel = lazy(() => import("./screens/seo_panel"));


const App = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        console.log('Persisted state on initial load:', {
            isLoggedIn: !!accessToken, // Determine login status
            user,
        });
    }, [accessToken, user]);

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/seo_panel"
                        element={
                            <PrivateRoute requiredRoles={['seo_admin', 'super_admin']}>
                                <SeoPanel />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute requiredRoles={['super_admin']}>

                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Suspense>
        </Router>
    );
};
export default App;
