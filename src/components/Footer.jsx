import { motion } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <div className='md:pt-[100px]'>
            <div className='flex flex-col md:flex-row justify-center md:justify-around items-center md:items-start'>
                <div className='pb-10 pt-14 md:pt-0 md:order-1'>
                    <img src="/img/logoGrande.svg" alt="Logo DOBLEUVE" />
                </div>
                <div className='flex flex-col justify-center items-center gap-4 pb-10 md:order-2'>
                    <h2 className='font-montserrat font-bold text-[#333333]'>
                        ÚNETE A NUESTRA COMUNIDAD
                    </h2>
                    <p className='font-montserrat font-light text-[#333333] text-center'>
                        Registrate para enterarte de todas las novedades
                    </p>
                    <a href="/register">
                    <motion.div
                        className="button-container"
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                        variants={{
                            rest: { scale: 1, backgroundColor: '#ffffff', color: '#A989AE' },
                            hover: { scale: 1.1, backgroundColor: '#A989AE', color: '#ffffff' },
                        }}
                        style={{
                            border: '2px solid #A989AE',
                            borderRadius: '50px',
                            padding: '10px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            width: '200px',
                        }}
                    >
                        <motion.span
                            style={{ flex: 1, textAlign: 'center', zIndex: '10' }}
                            variants={{
                                rest: { color: '#A989AE' },
                                hover: { color: '#ffffff' },
                            }}
                            transition={{ duration: 0.3 }}
                            className='font-lato'
                        >
                            Registrate ahora
                        </motion.span>
                        <motion.div
                            className="icon-container"
                            style={{
                                backgroundColor: '#A989AE',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            variants={{
                                rest: { scale: 1 },
                                hover: { scale: 10, borderRadius: '0px' },
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                variants={{
                                    rest: { opacity: 1, scale: 1 },
                                    hover: { opacity: 0, scale: 0.5 },
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <Icon className='text-white' icon="eva:diagonal-arrow-right-up-fill" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    </a>
                </div>
                <div className='flex flex-col items-start gap-4 pb-10 md:order-3'>
                    <h2 className='font-montserrat font-bold text-[#333333] text-center md:text-start'>
                        CONTACTO
                    </h2>
                    <div className='flex items-center gap-4'>
                        <Icon className='text-2xl text-[#A989AE]' icon="bi:phone" />
                        630 00 51 41
                    </div>
                    <div className='text-[#A989AE] font-montserrat flex items-center gap-4'>
                        <Icon className='text-2xl' icon="iconoir:send-mail" />
                        <a className='font-semibold underline' href="mailto:dobleuveartesania@gmail.com">Correo</a>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 items-center md:gap-[490px] md:items-start md:justify-around border-t-2 text-[#333333] p-7">
                <div className='flex gap-4 items-center text-[#33333383]'>
                    <a href="https://www.instagram.com/dobleuve_artesania/">@dobleuve_artesania</a>
                    
                </div>
                <div className="flex flex-wrap gap-5 justify-center items-center text-[#333333] font-lato pb-5">
                    <p>
                        Aviso Legal
                    </p>
                    <p>
                        Pol. Privacidad
                    </p>
                    <p>
                        Términos y condiciones
                    </p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-5'>
                <p className="text-xs text-[#333333] font-lato font-light">DOBLEUVE ARTESANÍA © 2024</p>
                <p className="text-xs text-gray-600 font-lato font-semibold pb-5">Create by - DROCH.ART</p>
            </div>
        </div>
    )
}
