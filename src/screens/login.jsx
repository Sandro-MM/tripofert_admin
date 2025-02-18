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
            console.log('Session Data:', data.session);
            useAuthStore.getState().setUser(data.session.user, data.session.access_token);
            const { data: roleData, error: roleError } = await supabase
                .from("admin_users_roles")
                .select("user_role")
                .eq("user_id", data.session.user.id)
                .single();

            if (roleError || !roleData) {
                console.error("Error fetching role:", roleError);
                show("Failed to fetch user role", "error");
                return;
            }

            const userRole = roleData.user_role;
            useAuthStore.getState().setRole(userRole);

            const route = roleToRoute[userRole] || '/login';
            navigate(route);

            show('Login Successful', 'success');
        }
    };



    return (
        <Card style={{
            marginTop:'24px',
            maxWidth: '800px',
            margin: '50px auto',

            gap: '10px',
            justifyContent: 'center'
        }} title="Tripofert Admin Login">
            <form style={{width:"100%", display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',}} onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                handleLogin(email, password);
            }}>
                <div>
                    <div style={{margin: '10px 0 3px'}}>Email</div>
                    <InputText type="email" name="email" tabIndex={1}/>
                    <div style={{margin: '10px 0 3px'}}>Password</div>
                    <Password type="password" name="password"
                              feedback={false} tabIndex={2}/>
                    <Button type="submit" style={{display: 'block', margin: '20px auto 0'}}>Login</Button>
                </div>
            </form>
        </Card>
    );
}


export default Login;
