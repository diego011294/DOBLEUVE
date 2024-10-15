import React, { useEffect, useState } from 'react';
import { useUser } from '../utils/useUser';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { AddProduct } from '../components/AddProduct';
import { Icon } from '@iconify/react/dist/iconify.js';
import { SpinnerLoad } from '../components/SpinnerLoad';

export const AdminPanel = () => {
    const { user } = useUser();
    const [isAdmin, setIsAdmin] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6; // Número de productos a mostrar por página
    const navigate = useNavigate();

    const checkAdmin = async () => {
        if (user) {
            const { data, error } = await supabase
                .from('user_profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error verificando el rol del usuario:', error);
                setIsAdmin(false);
            } else {
                setIsAdmin(data.role === 'admin');
            }
        }
    };

    useEffect(() => {
        if (user) {
            checkAdmin();
        }
    }, [user]);

    useEffect(() => {
        if (isAdmin) {
            fetchProducts();
        }
    }, [isAdmin]);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false }); 

        if (error) {
            console.error('Error al obtener productos:', error);
        } else {
            setProducts(data);
        }
    };

    const handleProductAdded = (product) => {
        setProducts((prevProducts) => {
            const productExists = prevProducts.find((p) => p.id === product.id);
            if (productExists) {
                return prevProducts.map((p) => (p.id === product.id ? product : p));
            } else {
                return [product, ...prevProducts];
            }
        });
        setSelectedProduct(null);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
    };

    const handleDelete = async (productId) => {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', productId);

        if (error) {
            console.error('Error al eliminar el producto:', error);
        } else {
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        }
    };

    // Calcular los productos que se deben mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Cambiar de página
    const paginateNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const paginatePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (isAdmin === null) {
        return <p className='flex justify-center p-10'><SpinnerLoad/></p>;
    }

    if (!user) {
        return <p className='text-xl font-montserrat text-center p-10'>Por favor, inicia sesión para acceder al panel de administrador.</p>;
    }

    if (!isAdmin) {
        return <p className='text-xl font-montserrat text-center p-10'>No tienes acceso a esta página.</p>;
    }

    // Calcular el número total de páginas
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className='font-montserrat text-[#333333]'>
            <h1 className='text-center font-light text-2xl p-10'>PANEL DE ADMINISTRADOR</h1>

            <div className='flex justify-center gap-20 flex-wrap'>
                <AddProduct
                    onProductAdded={handleProductAdded}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />

                {currentProducts.length === 0 ? (
                    <p>No hay productos disponibles</p>
                ) : (
                    <div className='text-sm'>
                        <table className='w-auto md:w-[600px] text-center'>
                            <thead>
                                <tr>
                                    <th className='text-start'>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((product) => (
                                    <tr className='border-b border-[#A989AE]' key={product.id}>
                                        <td><img className='w-20' src={product.image_url} alt={product.name} /></td>
                                        <td>{product.name}</td>
                                        <td>{product.price}€</td>
                                        <td>{product.in_stock ? 'Sí' : 'No'}</td>
                                        <td className='text-xl'>
                                            <button className='mr-2 text-green-500' onClick={() => handleEdit(product)}><Icon icon="material-symbols:edit-outline" /></button>
                                            <button className='text-red-600' onClick={() => handleDelete(product.id)}><Icon icon="mdi:trash-outline" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='flex gap-5 justify-center items-center mt-5'>
                            <button
                                onClick={paginatePrev}
                                className='transition-colors duration-500 bg-gradient-three p-1 rounded-full'
                                disabled={currentPage === 1}
                            >
                                <Icon
                                    className='text-xl text-[#ffffff]'
                                    icon="iconamoon:arrow-left-2-thin"
                                />
                            </button>
                            <button
                                onClick={paginateNext}
                                className='transition-colors duration-500 bg-gradient-three p-1 rounded-full'
                                disabled={currentPage === totalPages}
                            >
                                <Icon
                                    className='text-xl text-[#ffffff]'
                                    icon="iconamoon:arrow-right-2-thin"
                                />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
