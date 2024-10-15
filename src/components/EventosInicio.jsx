import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion, AnimatePresence } from 'framer-motion';

export const EventosInicio = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        "/img/Event1.jpg",
        "/img/Event2.jpg",
    ];

    const handlePrev = () => {
        setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    };

    const handleNext = () => {
        setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    };

    return (
        <div className="pt-10 md:pt-[60px]">
            <div className='flex flex-col justify-center items-center gap-4 pb-[50px]'>
                <img src="/img/detail3.svg" alt="Detalle naranja" />
                <h1 className='text-[#333333] text-2xl md:text-3xl font-montserrat font-extralight'>
                    NUESTROS <span className='text-[#A989AE] font-semibold'>EVENTOS</span>
                </h1>
            </div>
            <div className='flex items-center justify-center flex-wrap'>
                {/* Contenedor del Slider */}
                <div className="relative w-full max-w-md h-96"> {/* max-w-md para ajustar el tamaño */}
                    <div className="relative h-full overflow-hidden">
                        <AnimatePresence>
                            <motion.img
                                key={currentSlide}
                                src={slides[currentSlide]}
                                alt={`Slide ${currentSlide + 1}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full object-contain md:object-cover absolute inset-0"
                            />
                        </AnimatePresence>
                    </div>

                    {/* Botones de navegación */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-[320px] md:top-[350px] transform -translate-y-1/2 bg-white text-3xl text-[#333333] rounded-full w-10 h-10 flex items-center justify-center shadow-md"
                    >
                        <Icon
                            className='text-3xl text-black group-hover:text-white transform rotate-180'
                            icon="iconamoon:arrow-right-2-thin"
                        />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute left-20 top-[320px] md:top-[350px] transform -translate-y-1/2 bg-white text-3xl text-[#333333] rounded-full w-10 h-10 flex items-center justify-center shadow-md"
                    >
                        <Icon
                            className='text-3xl text-black group-hover:text-white'
                            icon="iconamoon:arrow-right-2-thin"
                        />
                    </button>
                </div>

                {/* Contenedor del Texto */}
                <div className="flex flex-col gap-5 md:gap-16 transform md:-translate-x-[29px] pt-10 md:pt-0"> {/* max-w-lg para ajustar el ancho del texto */}
                    <div className='flex items-start gap-4 mb-4 p-3 md:p-0 md:mt-10 w-[500px]'>
                        <img src="/img/iconCalen.svg" alt="Calendario icono" className="w-20 h-20" /> {/* Tamaño ajustado */}
                        <div className='flex flex-col gap-3 p-3'>
                            <h2 className="text-xl font-semibold text-[#A989AE]">
                                11/05/24, FEIRARRÚA SOHO ORZÁN.
                            </h2>
                            <p className="text-[#333333]">
                                Estaremos en Calle de Orzán en horario de 12:00h a 20:30h.
                                ¡ Os esperamos allí !
                            </p>
                        </div>
                    </div>
                    <div className='flex items-start gap-4 p-3 md:p-0 w-[500px]'>
                        <img src="/img/iconCalen.svg" alt="Calendario icono" className="w-20 h-20" /> {/* Tamaño ajustado */}
                        <div className='flex flex-col p-3 gap-3'>
                            <h2 className="text-xl font-semibold text-[#A989AE]">
                                03/08/24 - 04/08/24 , FESTIVAL DE PARDIÑAS
                            </h2>
                            <p className="text-[#333333]">
                                Sábado empezaremos de 12:00 h a 12:00h y el domingo comenzaremos a las 12:00 y finalizaremos a las 21:00. 
                                ¡Os espero por allí!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


