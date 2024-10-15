import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
    
        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }
    
        // Validación de campos para evitar valores vacíos o incorrectos
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setError('Correo no válido.');
            return;
        }
        
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
    
        try {
            const { error } = await supabase.auth.signUp({ email, password });
    
            if (error) {
                console.error('Error en el registro:', error); // Mostrar error en la consola para depurar
                if (error.status === 429) {
                    setError('Has enviado demasiadas solicitudes. Intenta de nuevo en unos minutos.');
                } else {
                    setError(error.message || 'Error al registrarse. Verifica los datos.');
                }
                return;
            }
    
            setSuccessMessage('Registro exitoso. Ya puedes iniciar sesión.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            console.error('Error general al registrar:', err);
            setError('Hubo un error. Intenta nuevamente.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center pt-[60px]">
            <h2 className='pb-5 font-montserrat font-bold text-2xl text-[#A989AE]'>Regístrate</h2>
            <form onSubmit={handleRegister} className='flex flex-col w-[300px] gap-5'>
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
                <p className='text-sm font-montserrat text-[#3333335c]'>
                    *Mínimo de 6 caracteres.
                </p>
                <div className='flex justify-center items-center font-montserrat'>
                    <button className='border border-[#A989AE] text-[#A989AE] w-44 h-10 transition-all duration-300 hover:bg-gradient-three hover:text-white'>
                        Registrarse
                    </button>
                </div>
            </form>
            {error && <p className='text-white bg-red-600 rounded-md w-82 p-2 mt-5'>{error}</p>}
            {successMessage && <p className='text-white bg-green-600 rounded-md w-82 p-2 mt-5'>{successMessage}</p>}
            <p className='mt-5'>¿Ya tienes una cuenta? <a className='font-bold text-[#FFA07D]' href="/login">Inicia sesión aquí</a></p>
        </div>
    );
};
