import React, { createContext, useContext, useState, useEffect} from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        //VERIFICAR EL ESTADO DE LA AUTENTICACIÓN AL CARGAR LA APP
        const session = supabase.auth.getSession();
        setUser(session?.user || null);

        //ESCUCHAR LOS CAMBIOS DE LA SESIÓN DE AUTENTICACIÓN
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });

        //LIMPIAR EL LISTENER AL DESMONTAR EL COMPONENTE
        return () => {
            authListener.subscription.unsubscribe();
        };
    },[]);

    const signIn = async (email, password) => {
        const { data, error} = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setUser(data.user);
    };

    const signUp = async (email, password) => {
        const{ data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setUser(data.user);
    };
    
    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, signOut}}>
            {children}
        </AuthContext.Provider>
  )
}

//HOOK PERSONALIZADO PARA USAR EL CONTEXTO DE AUTENTICACIÓN
export const useAuth = () => {
    return useContext(AuthContext);
};
