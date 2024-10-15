import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../utils/fetchProductById';
import { Icon } from '@iconify/react/dist/iconify.js';
import { toast, ToastContainer } from 'react-toastify'; // Importamos toast y ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../context/CartProvider'; // Importamos el contexto del carrito
import { supabase } from '../supabaseClient';
import { useUser } from '../utils/useUser';
import { SpinnerLoad } from './SpinnerLoad';
import { useWishlist } from '../utils/useWishlist';

export const PendienteDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart, cartItems } = useContext(CartContext);
    const { user, loading } = useUser();
    const { isInWishlist, toggleWishlist } = useWishlist(id);

    useEffect(() => {
        const getProduct = async () => {
            const data = await fetchProductById(id);
            setProduct(data);
            setIsLoading(false);
        };

        const checkWishlist = async () => {
            if (user && product) {
                const { data: wishlistItems, error } = await supabase
                    .from('wishlist')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('product_id', product.id);

                if (!error && wishlistItems.length > 0) {
                    setIsInWishlist(true);
                }
            }
        };

        getProduct();
        if (user && product) {
            checkWishlist();
        }
    }, [id, user, product]);

    useEffect(() => {
        const getProduct = async () => {
            const data = await fetchProductById(id);
            setProduct(data);
            setIsLoading(false);
        };

        getProduct();
    }, [id]);

    const handleAddToWishlist = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await toggleWishlist(); // Usamos la función toggleWishlist del hook
            if (isInWishlist) {
                toast.info('Producto eliminado de la lista de deseos', { position: "top-right" });
            } else {
                toast.success('Producto añadido a la lista de deseos', { position: "top-right" });
            }
        } catch (error) {
            toast.error('Error al actualizar la lista de deseos');
        }
    };

    const handleAddToCart = () => {
        if (product.in_stock > 0) { // Verifica la propiedad `in_stock` directamente
            const productExists = cartItems.find(item => item.id === product.id);

            if (!productExists) {
                addToCart(product); // Usamos la función addToCart del contexto

                // Mostrar el toast de éxito
                toast.success('Producto añadido al carrito', {
                    position: "top-right",
                    autoClose: 3000, // Duración en ms antes de cerrar automáticamente (3 segundos)
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    icon: <Icon icon="akar-icons:check" className="text-green-500" /> // Ícono de check
                });
            } else {
                toast.info('Este producto ya está en el carrito', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        }
    };

    if (isLoading) {
        return <div>
            <SpinnerLoad />
        </div>;
    }

    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className="container mx-auto md:py-[60px]">
            <div className="flex justify-center gap-4 lg:gap-24 items-center flex-wrap">
                {/* Imagen del producto */}
                <div>
                    <div className='border-[#A989AE] border-0 lg:border-r'>
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className=" w-full h-[340px] p-4 md:p-0 lg:w-[500px] lg:h-[500px] object-cover object-[-100px] mr-3"
                        />
                    </div>
                    <button onClick={() => navigate('/shop')} className="flex items-center group md:pt-3 text-[#333333] font-montserrat">
                        <Icon className="text-2xl rotate-180 transition-transform duration-500 group-hover:-translate-x-2" icon="iconamoon:arrow-right-2-thin" />
                        Volver a la tienda
                    </button>
                </div>

                {/* Detalles del producto */}
                <div>
                    <h1 className="text-3xl font-bold text-[#333333]">{product.name}</h1>
                    <p className="text-xl font-normal font-montserrat text-[#333333] mt-4">{product.price.toFixed(2)} €</p>

                    {/* Botón para añadir al carrito y wishlist */}
                    <div className='font-montserrat mt-4 pb-3 md:mt-12 relative flex flex-col'>
                        <button
                            className={`border border-[#A989AE] text-[#A989AE] w-44 h-10 transition-all duration-300 ${product.in_stock > 0 ? 'hover:bg-gradient-three hover:text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                            onClick={handleAddToCart}
                            disabled={product.in_stock <= 0} // Desactiva el botón si no hay stock
                        >
                            Añadir al carrito
                        </button>
                        {/* Mostrar mensaje de "Producto agotado" si no está en stock */}
                        {product.in_stock <= 0 && (
                            <div className="text-red-500 font-montserrat text-sm">
                                Producto agotado
                            </div>
                        )}
                        <button
                            className="cursor-pointer font-montserrat flex items-center gap-3 my-5"
                            onClick={handleAddToWishlist}
                        >
                            <div className="flex items-center justify-center">
                                <div className='w-7 h-7 rounded-full absolute'>

                                </div>
                                <Icon
                                    icon={isInWishlist ? "mdi:heart" : "mdi:heart-outline"}
                                    className="text-red-500 text-2xl"
                                />
                            </div>
                            {isInWishlist ? "En tu lista de deseos" : "Añadir a la lista de deseos"}
                        </button>
                    </div>

                    {/* Acordeón de información */}
                    <div className="mt-6 w-80 font-montserrat">
                        <details className="mb-4 border-b border-[#333333]">
                            <summary className="cursor-pointer text-lg font-semibold">Materiales</summary>
                            <p className="mt-2 text-gray-600 mb-2">
                                Material principal: Arcilla polimérica <br />
                                Postes y anillas: Acero inoxidable hipoalergénico
                            </p>
                        </details>
                        <details className="mb-4 border-b border-[#333333]">
                            <summary className="cursor-pointer text-lg font-semibold mb-2">Envío</summary>
                            <p className="mt-2 mb-2 text-gray-600">El pedido tarda entre 1 y 5 días en procesarse y una vez enviado tardará otras 24-48h en llegar a la dirección correspondiente.</p>
                        </details>
                        <details className="mb-4 border-b border-[#333333]">
                            <summary className="cursor-pointer text-lg font-semibold mb-2">Cuidados</summary>
                            <p className="mt-2 mb-2 text-gray-600">
                                <li>Guarda tus pendientes en un estuche rígido.</li>
                                <li>Evita doblarlos o ponerles peso encima.</li>
                                <li>Puedes limpiarlos con un poco de alcohol o acetona pura y un algodón (excepto si llevan resina, ya que pueden perder su brillo).</li>
                            </p>
                        </details>
                    </div>
                </div>
            </div>
            {/* ToastContainer para los toasts */}
            <ToastContainer />
        </div>
    );
};
