import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import React from "react";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import { useAuth } from '../providers/authProvider';
import {useToast} from "../providers/toast";
import {useAuthStore} from "../store/useAuthStore";
import {useNavigate} from "react-router-dom";

function Login() {
    const { supabase } = useAuth();
    const navigate = useNavigate();
    const toastRef = useToast();

    const show = (messege, status) => {
        toastRef.current.show({ severity: status, summary: 'Info', detail: messege });
    };

    const roleToRoute = {
        seo_admin: '/seo_panel',
        super_admin: '/dashboard',
    };

    const handleLogin = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            show(`Login Failed: ${error.message}`, 'error');
            return;
        }

        if (data.session) {
            console.log('Session Data:', data.session); // Debug the session data

            // Update auth store state before navigation
            useAuthStore.getState().setAuth(data.session);

            const role = data.session.user?.role;
            const route = roleToRoute[role] || '/login';  // Default to login if no matching role

            // Navigate to the correct route after state update
            navigate(route);

            show('Login Successful', 'success');
        }
    };


    return (
        <Card style={{
            maxWidth: '800px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'center'
        }} title="Tripofert Admin Login">
            <form onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                handleLogin(email, password);
            }}>
                <div style={{margin: '10px 0 3px'}}>Email</div>
                <InputText type="email" name="email" tabIndex={1}/>
                <div style={{margin: '10px 0 3px'}}>Password</div>
                <Password type="password" name="password"
                          feedback={false} tabIndex={2}/>
                <Button type="submit" style={{display: 'block', margin: '20px auto 0'}}>Login</Button>
            </form>
        </Card>
);
}

export default Login;
