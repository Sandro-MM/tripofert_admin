import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {Button} from "primereact/button";
import {AuthProvider} from "./providers/authProvider";

// Lazy-loaded components
const Login = lazy(() => import("./screens/login"));
const SeoPanel = lazy(() => import("./screens/seo_panel"));

// Simulated authentication function


// PrivateRoute component
const PrivateRoute = ({
                          isLoggedIn,
                          children,
                      }: {
    isLoggedIn: boolean;
    children: React.ReactElement;
}) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// App component
const App = () => {


    return (
        <>
            <AuthProvider>



            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <Login
                                onLogin={(token) => {

                                }}
                            />
                        }
                    />
                    <Route
                        path="/seo_panel"
                        element={
                            <PrivateRoute>
                                <SeoPanel />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Suspense>
        </Router>
            </AuthProvider>
        </>
    );
};

export default App;
