import { useState, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartProvider";
import { useUser } from "../utils/useUser";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation(); // Hook para obtener la ruta actual
    const { cartItemsCount } = useContext(CartContext); // Usa el estado del carrito desde el contexto
    const { user } = useUser();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const menuVariants = {
        open: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        closed: {
            x: "-100%",
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    };

    // Actualiza activeLink basado en la ruta actual
    const [activeLink, setActiveLink] = useState('/');

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]); // Dependencia en la ruta actual

    useEffect(() => {
        console.log("Usuario actualizado:", user);
    }, [user]); 

    return (
        <div className="sticky top-0 z-50 bg-[#ffffff] w-full shadow-md">
            {/* Main Navbar */}
            <div className="flex items-center justify-between  w-full h-auto p-4  max-w-7xl mx-auto">
                <NavLink to="/">
                    <img src="/img/logo.svg" alt="Logo" className="pl-10" />
                </NavLink>

                {/* Navbar Links */}
                <div className="hidden md:flex gap-20 text-[#333333] font-montserrat">
                    <a
                        href="/"
                        onClick={() => setActiveLink('/')}
                        className={`relative ${activeLink === '/' ? 'text-[#A989AE]' : 'text-[#333333]'} hover:text-[#A989AE]`}
                    >
                        INICIO
                        {activeLink === '/' && <span className="block h-1 bg-[#A989AE] absolute -bottom-1 left-0 right-0" />}
                    </a>
                    <a
                        href="/shop"
                        onClick={() => setActiveLink('/shop')}
                        className={`relative ${activeLink === '/shop' ? 'text-[#A989AE]' : 'text-[#333333]'} hover:text-[#A989AE]`}
                    >
                        TIENDA
                        {activeLink === '/shop' && <span className="block h-1 bg-[#A989AE] absolute -bottom-1 left-0 right-0" />}
                    </a>
                    <a
                        href="/aboutus"
                        onClick={() => setActiveLink('/aboutus')}
                        className={`relative ${activeLink === '/aboutus' ? 'text-[#A989AE]' : 'text-[#333333]'} hover:text-[#A989AE]`}
                    >
                        SOBRE NOSOTROS
                        {activeLink === '/aboutus' && <span className="block h-1 bg-[#A989AE] absolute -bottom-1 left-0 right-0" />}
                    </a>
                    <a
                        href="/contact"
                        onClick={() => setActiveLink('/contact')}
                        className={`relative ${activeLink === '/contact' ? 'text-[#A989AE]' : 'text-[#333333]'} hover:text-[#A989AE]`}
                    >
                        CONTACTO
                        {activeLink === '/contact' && <span className="block h-1 bg-[#A989AE] absolute -bottom-1 left-0 right-0" />}
                    </a>
                </div>

                {/* Navbar Icon cart, login */}
                <div className="flex gap-10 md:pr-10 lg:pr-10 text-[#333333] relative">
                    <div>
                        <NavLink to="/cart">
                            <Icon className="text-[30px]" icon="ph:bag-thin" />
                            {cartItemsCount > 0 && (
                                <span className="transform -translate-y-3 bg-[#FFA07D] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartItemsCount}
                                </span>
                            )}
                        </NavLink>
                    </div>
                    {user ? (
                        <a href="/userpanel"><Icon className="text-[30px] text-[#A989AE]" icon="mdi:heart" /></a>
                    ) : (
                        <a href="/login"><Icon className="text-[30px]" icon="ph:user-thin" /></a>
                    )}
                    
                </div>

                {/* Responsive Menu Button */}
                <button className="pr-10 md:hidden text-[#333333]" onClick={toggleMenu}>
                    <Icon className="text-[30px]" icon="material-symbols:menu" />
                </button>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial="closed"
                animate={menuOpen ? "open" : "closed"}
                variants={menuVariants}
                className="fixed top-0 left-0 w-full h-full z-40 font-montserrat bg-[#A989AE] text-white flex flex-col items-center justify-center space-y-4 md:hidden"
            >
                {/* Close Button */}
                <button className="absolute top-5 right-5 text-white" onClick={toggleMenu}>
                    <Icon icon="mdi:close" className="text-3xl" />
                </button>

                <NavLink to="/" className="text-2xl" onClick={toggleMenu}>INICIO</NavLink>
                <NavLink to="/shop" className="text-2xl" onClick={toggleMenu}>TIENDA</NavLink> {/* Corregido aquí también */}
                <NavLink to="#" className="text-2xl" onClick={toggleMenu}>SOBRE NOSOTROS</NavLink>
                <NavLink to="#" className="text-2xl" onClick={toggleMenu}>CONTACTO</NavLink>
            </motion.div>
        </div>
    );
};
