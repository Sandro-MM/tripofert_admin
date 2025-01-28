import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {Button} from "primereact/button";

// Lazy-loaded components
const Login = lazy(() => import("./screens/login"));
const SeoPanel = lazy(() => import("./screens/seo_panel"));

// Simulated authentication function
const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(() => {

        return Boolean(sessionStorage.getItem("authToken"));
    });

    const login = (token) => {
        // Save token to sessionStorage and update state
        sessionStorage.setItem("authToken", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Remove token from sessionStorage and update state
        sessionStorage.removeItem("authToken");
        setIsLoggedIn(false);
    };

    return { isLoggedIn, login, logout };
};

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
  const auth = useAuth();

    return (
        <>
            {auth.isLoggedIn && (
                <div style={{ marginBottom: "16px" }}>
                    <Button onClick={auth.logout}>Logout</Button>
                </div>
            )}


            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <Login
                                onLogin={(token) => {
                                    auth.login(token);
                                }}
                            />
                        }
                    />
                    <Route
                        path="/seo_panel"
                        element={
                            <PrivateRoute isLoggedIn={auth.isLoggedIn}>
                                <SeoPanel />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Suspense>
        </Router>
        </>
    );
};

export default App;
