import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartContext } from '../context/CartProvider';
import { CheckoutButton } from '../components/CheckoutButton';
import { Icon } from '@iconify/react/dist/iconify.js';
import { SpinnerLoad } from '../components/SpinnerLoad';

export const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <div className='text-center text-2xl p-20 font-montserrat'>
          Tu carrito está vacío.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='relative w-full md:pr-8 lg:pr-8 md:pl-8 lg:pl-8'>
        <div style={{ backgroundImage: "url('/img/fondoPatron.jpg')" }} className="bg-cover w-full h-[200px] flex justify-center items-center">
          <h1 className="text-white text-3xl md:text-4xl font-montserrat text-center font-extrabold">
            CARRITO
          </h1>
        </div>
      </div>
      <div className="container mt-[60px] gap-10 flex justify-center flex-wrap">
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3 items-center justify-between border-b py-4 md:w-[500px] lg:w-[650px]">
              <button
                className="text-red-500"
                onClick={() => removeFromCart(item.id)}
              >
                <Icon icon="carbon:close" className='text-2xl' />
              </button>
              <img src={item.image_url} alt={item.name} className="w-14 h-14 md:w-20 md:h-20 object-cover" />
              <div className='w-[180px] font-montserrat font-light italic'>
                <h2 className="text-lg">{item.name}</h2>
              </div>
              <p>{item.price.toFixed(2)} €</p>
            </div>
          ))}
          <button onClick={() => navigate('/shop')} className="flex items-center group md:pt-3 text-[#333333] font-montserrat mt-3">
            <Icon className="text-2xl rotate-180 transition-transform duration-500 group-hover:-translate-x-2" icon="iconamoon:arrow-right-2-thin" />
            Volver a la tienda
          </button>
        </div>
        <div className='lg:border-l border-[#A989AE] md:w-[400px] p-10'>
          <h1 className='text-[#333333] text-2xl mb-5 md:text-3xl font-montserrat font-extralight'>
            TOTAL <span className='text-[#FFA07D] font-semibold'>CARRITO</span>
          </h1>
          <div className="flex justify-between border-b border-black pb-4">
            <h2 className="font-normal text-lg">Subtotal:</h2>
            <p className="font-normal text-lg">{calculateSubtotal().toFixed(2)} €</p>
          </div>
          <div className="flex justify-between">
            <h2 className="font-bold text-xl">Total:</h2>
            <p className="font-bold text-xl">{calculateSubtotal().toFixed(2)} €</p>
          </div>
          <div className="mt-10 flex justify-center font-montserrat">
            <CheckoutButton cartItems={cartItems} />
          </div>
        </div>
      </div>
    </>
  );
};
