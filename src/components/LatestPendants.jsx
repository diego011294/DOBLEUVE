import React, { useEffect, useState } from 'react';
import { fetchLatestPendants } from '../utils/fetchLatestPendants';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

export const LatestPendants = () => {
    const [pendants, setPendants] = useState([]);

    useEffect(() => {
        const getPendants = async () => {
            const data = await fetchLatestPendants();
            setPendants(data);
        };

        getPendants();
    }, []);

    return (
        <div className='pt-[60px]'>
            <div className='flex flex-col justify-center items-center gap-4 pb-[50px]'>
                <img src="/img/detail1.svg" alt="Detalle naranja" />
                <h1 className='text-[#333333] text-2xl md:text-3xl font-montserrat font-extralight'>
                    <span className='text-[#FFA07D] font-semibold'>NUEVOS</span> MODELOS
                </h1>
            </div>
            <div className='flex justify-center items-center'>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-20 gap-5">
                    {pendants.map((pendant, index) => (
                        <div key={index} className="relative group">
                            <Link className="block overflow-hidden relative mb-2" to={`/product/${pendant.id}`}>
                                <img 
                                    src={pendant.image_url} 
                                    alt={pendant.name} 
                                    className="w-80 h-96 object-cover transition-transform duration-500 transform group-hover:scale-125"
                                />
                            </Link>
                            <div className='absolute top-0 right-0 bg-white transition-colors duration-500 group-hover:bg-gradient-three p-2 rounded-full m-3'>
                                <Icon 
                                    className='text-2xl text-[#333333] group-hover:text-white' 
                                    icon="iconamoon:arrow-right-2-thin" 
                                />
                            </div>
                            <div className='flex items-center justify-between p-3 border-t-2 border-[#A989AE]'>
                                <h2 className="text-lg font-semibold font-lato text-[#333333]">{pendant.name}</h2>
                                <p className="text-gray-600 font-lato font-light">{pendant.price.toFixed(2)} €</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center items-center pt-[60px] font-montserrat'>
                <button className='border border-[#A989AE] text-[#A989AE] w-44 h-10 transition-all duration-300 hover:bg-gradient-three hover:text-white'>
                    Ir a la tienda
                </button>
            </div>
        </div>
    );
};
