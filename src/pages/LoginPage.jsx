import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
            setError('Error al iniciar sesión. Verifica tus credenciales.');
        } else {
            navigate('/shop'); // Redirige a la tienda después de iniciar sesión
        }
    };

    return (
        <div className="flex flex-col justify-center items-center pt-[60px]">
            <h2 className='pb-5 font-montserrat font-bold text-2xl text-[#A989AE]'>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className='flex flex-col w-[300px] gap-5'>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border-b border-[#A989AE]'
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='border-b border-[#A989AE]'
                />
                <div className='flex justify-center items-center font-montserrat'>
                    <button className='border border-[#A989AE] text-[#A989AE] w-44 h-10 transition-all duration-300 hover:bg-gradient-three hover:text-white'>
                        Entrar
                    </button>
                </div>
            </form>
            {error && <p className='text-white bg-red-600 rounded-md w-82 p-2 mt-5'>{error}</p>}
            <p className='mt-5'>¿No tienes una cuenta? <a className='font-bold text-[#FFA07D]' href="/register">Regístrate aquí</a></p>
        </div>
    );
};
