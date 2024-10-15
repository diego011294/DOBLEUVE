import React, { useEffect, useState } from 'react';
import { fetchPendants } from '../utils/fetchPendants';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

export const Allpendants = () => {
    const [pendants, setPendants] = useState([]);
    const [filteredPendants, setFilteredPendants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const pageSize = 12; // Number of products per page

    useEffect(() => {
        const getPendants = async () => {
            const { data, count } = await fetchPendants(currentPage, pageSize);
            setPendants(data);
            setFilteredPendants(data);
            setTotalProducts(count);
            setTotalPages(Math.ceil(count / pageSize));
        };

        getPendants();
    }, [currentPage]);

    // Filter pendants based on search term
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredPendants(pendants);
        } else {
            setFilteredPendants(pendants.filter(pendant =>
                pendant.name.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
    }, [searchTerm, pendants]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className='relative w-full md:pr-8 lg:pr-8 md:pl-8 lg:pl-8'>
            <div style={{ backgroundImage: "url('/img/fondoPatron.jpg')" }} className=" bg-cover w-full h-[200px] flex flex-col justify-center items-center">
                <h1 className="text-white text-3xl md:text-4xl font-montserrat text-center font-extrabold">
                    TIENDA
                </h1>
                <div className="text-center my-2">
                    <p className="text-lg font-montserrat text-white">{totalProducts} artículos</p>
                </div>
            </div>
            {/* Search Bar */}
            <div className='flex justify-center items-center mb-8 mt-[60px] gap-5'>
                <Icon className='text-3xl text-[#A989AE]' icon="basil:search-outline" />
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    className="border border-gray-300 p-2 rounded-lg w-72 md:w-[500px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
            </div>
            <div className='flex justify-center items-center'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:pl-32 md:pr-32">
                    {filteredPendants.map((pendant, index) => (
                        <div key={index} className="relative group">
                            {/* Enlace a la página del producto usando Link */}
                            <Link to={`/product/${pendant.id}`} className="block overflow-hidden relative mb-2">
                                {/* Imagen del producto con efecto de stock */}
                                <img
                                    src={pendant.image_url}
                                    alt={pendant.name}
                                    className={`w-80 h-80 object-cover transition-transform duration-500 transform ${pendant.in_stock ? 'group-hover:scale-125' : 'opacity-50'}`}
                                />
                                {/* Mostrar botón de "Agotado" si no está en stock */}
                                {!pendant.in_stock && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <button className="bg-[#FFA07D] text-white p-2 rounded-full cursor-not-allowed w-32">
                                            Agotado
                                        </button>
                                    </div>
                                )}
                            

                            <div className='absolute top-0 right-0 bg-white transition-colors duration-500 group-hover:bg-gradient-three p-2 rounded-full m-3'>
                                <Icon
                                    className='text-2xl text-[#333333] group-hover:text-white'
                                    icon="iconamoon:arrow-right-2-thin"
                                />
                            </div>
                            </Link>
                            <div className='flex items-center justify-between p-3 border-t-2 border-[#A989AE]'>
                                <h2 className="text-lg font-semibold font-lato text-[#333333]">{pendant.name}</h2>
                                <p className="text-gray-600 font-lato font-light">{pendant.price.toFixed(2)} €</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center items-center gap-4 pt-[60px]'>
                <button
                    onClick={handlePrevPage}
                    className='transition-colors duration-500 bg-gradient-three p-1 rounded-full'
                    disabled={currentPage === 1}
                >
                    <Icon
                        className='text-xl rotate-180 text-[#ffffff]'
                        icon="iconamoon:arrow-right-2-thin"
                    />
                </button>
                <span className='text-[#333333]'>
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
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
    );
};
