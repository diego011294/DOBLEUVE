import React, { useEffect, useState } from 'react';
import { useUser } from '../utils/useUser';
import { supabase } from '../supabaseClient'; // Asegúrate de importar tu cliente Supabase
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

const UserPanel = () => {
    const { user } = useUser();  // Obtener el usuario actual
    const [wishlist, setWishlist] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // Para verificar si el usuario es admin
    const navigate = useNavigate(); // Inicializa el hook para navegación

    // Función para obtener la wishlist del usuario
    const fetchWishlist = async (userId) => {
        const { data, error } = await supabase
            .from('wishlist')
            .select('*, products(*)')
            .eq('user_id', userId);

        if (error) {
            console.error('Error al obtener la wishlist:', error);
            return [];
        }

        return data;
    };

    // Verificar si el usuario es admin
    const checkAdmin = async () => {
        if (user) {
            const { data, error } = await supabase
                .from('user_profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error verificando el rol del usuario:', error);
            } else {
                setIsAdmin(data.role === 'admin');
            }
        }
    };

    useEffect(() => {
        if (user) {
            const loadWishlist = async () => {
                const data = await fetchWishlist(user.id);
                console.log(data); // Verifica la estructura de los datos
                setWishlist(data);
            };
            loadWishlist();
            checkAdmin(); // Verificar si el usuario es admin
        }
    }, [user]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/'); // Redirigir a la página de inicio
    };

    // Función para eliminar un producto de la wishlist
    const handleRemoveFromWishlist = async (productId) => {
        const { error } = await supabase
            .from('wishlist')
            .delete()
            .eq('product_id', productId)
            .eq('user_id', user.id);

        if (error) {
            console.error('Error al eliminar de la wishlist:', error);
        } else {
            // Actualiza el estado de la wishlist para reflejar el cambio
            setWishlist((prevWishlist) => prevWishlist.filter(item => item.product_id !== productId));
        }
    };

    if (!user) {
        return <p className='text-xl font-montserrat text-center p-10'>Por favor, inicia sesión para ver tu panel.</p>;
    }

    return (
        <div className='pt-10'>
            <div className='flex flex-col justify-center items-center gap-2'>
                <div className='flex items-center gap-5 flex-wrap'>
                    <img className=' w-10 md:w-14' src="img/IconUser.svg" alt="icono usuario" />
                    <h2 className='text-[#333333] text-center text-xl md:text-3xl font-montserrat font-extralight'> {user.email}</h2>
                </div>
                <div className='flex items-center justify-center gap-5 mt-5 flex-wrap font-montserrat'>
                <div className='flex justify-center items-center'>
                    <button onClick={handleLogout} className='bg-red-600 shadow-md text-white w-40 rounded-full transition-transform p-2 hover:scale-105'>
                        Cerrar sesión
                    </button>
                </div>
                {/* Botón para acceder al panel de administrador */}
                {isAdmin && (
                    <div>
                        <button onClick={() => navigate('/adminpanel')} className='bg-[#A989AE] shadow-md text-white w-56 rounded-full transition-transform p-2 hover:scale-105'>
                            Panel de Administrador
                        </button>
                    </div>
                )}
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center gap-5 bg-[#e3dce343] w-auto rounded-lg shadow-sm p-10 mt-10'>
                    <h3 className='font-montserrat text-xl font-semibold'>Tu lista de deseos:</h3>
                    {wishlist.length === 0 ? (
                        <p className='font-montserrat'>De momento no tienes ningún producto en tu lista de deseos.</p> 
                    ) : (
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                            {wishlist.map((item) => (
                                <div key={item.product_id}>
                                    {item.products ? (
                                        <div>
                                            <Link to={`/product/${item.product_id}`}>
                                                <img className='w-40 rounded-md shadow-md' src={item.products.image_url} alt={item.products.name} />
                                            </Link>
                                            <button className='bg-red-600 rounded-full p-1 transform -translate-y-28 -translate-x-2' onClick={() => handleRemoveFromWishlist(item.product_id)}>
                                                <Icon className='text-white text-xl' icon="material-symbols-light:close" />
                                            </button>
                                        </div>
                                    ) : (
                                        <p>Producto no disponible</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPanel;
