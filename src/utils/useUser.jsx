import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para recuperar el usuario actual desde Supabase
  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
        setUser(null);
      } else {
        setUser(user);
      }
    } catch (error) {
      setError('Error fetching user');
    } finally {
      setLoading(false);
    }
  };

  // Función para desloguear al usuario
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Ejecutar la función al cargar el hook y suscribirse a cambios de autenticación
  useEffect(() => {
    fetchUser(); // Llama a la función para obtener el usuario

    // Suscribirse a cambios en la autenticación
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // No es necesario desuscribirse en versiones más recientes de Supabase
    return () => {
      // Si necesitas hacer algo al desmontar el componente, lo harías aquí.
    };
  }, []);

  return { user, loading, error, logout };
};
