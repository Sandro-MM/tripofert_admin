import { createContext, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useAuthStore } from "../store/useAuthStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const setUser = useAuthStore((state) => state.setUser);
    const setRole = useAuthStore((state) => state.setRole);

    useEffect(() => {
        const getUser = async () => {
            const { data: session } = await supabase.auth.getSession();
            if (session?.session) {
                setUser(session.session.user, session.session.access_token);
                fetchUserRole(session.session.user.id);
            }
        };

        getUser();

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser(session.user, session.access_token);
                fetchUserRole(session.user.id);
            } else {
                setUser(null, null);
                setRole(null);
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const fetchUserRole = async (userId) => {
        const { data, error } = await supabase
            .from("admin_users_roles")
            .select("user_role")
            .eq("user_id", userId)
            .single();

        if (data) {
            setRole(data.user_role);
        }
    };

    return <AuthContext.Provider value={{ supabase }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
