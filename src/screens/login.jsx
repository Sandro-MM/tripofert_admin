import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import React, {useState} from "react";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import { useAuth } from '../providers/authProvider';

function Login() {
    const { supabase } = useAuth();

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) console.error('Login failed:', error.message);
        else console.log('Logged in successfully!');
    };


        return (
            <Card style={{maxWidth: '800px', margin: 'auto', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', justifyContent:'center'}} title="Tripofert Admin Login">
                <div style={{margin:'10px 0 3px'}}>Email</div>
                <InputText inputId="email" value={email} onChange={(e) => setEmail(e.target.value)} tabIndex={1}/>
                <div style={{margin:'10px 0 3px'}}>Password</div>
                <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} tabIndex={2}/>

                <Button onClick={()=>handleLogin()} style={{display:'block', margin:'20px auto 0'}}>Login</Button>
            </Card>
        );
}

export default Login;
