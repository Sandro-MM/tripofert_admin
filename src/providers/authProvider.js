import { createContext, useEffect, useState, useContext } from 'react';
import {supabase} from "../utils/supabase";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data) setUser(data.user);
        };

        getUser();

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={{ user, supabase }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);