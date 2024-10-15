import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SpinnerLoad } from '../components/SpinnerLoad';

export const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Usar la navegación para redirigir


  useEffect(() => {
    // Obtener los productos del carrito desde el localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productIds = cart.map(item => item.id);

    const updateStock = async () => {
      try {
        const response = await fetch('https://ilxazktxkpsdrvelmdfb.supabase.co/functions/v1/comfirm_payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productIds }), // Enviar los IDs de los productos
        });

        if (response.ok) {
          // Si la actualización es exitosa, limpiar el carrito
          localStorage.removeItem('cart');
          setLoading(false);

          useEffect(() => {
            // Evitar volver atrás
            window.history.pushState(null, "", window.location.href);
            
            window.addEventListener("popstate", () => {
              window.location.reload();  // Forzar la recarga de la página
            });
          
            return () => {
              window.removeEventListener("popstate", () => {
                window.location.reload();
              });
            };
          }, []);
        } else {
          console.error('Error updating stock');
        }
      } catch (error) {
        console.error('Error updating stock:', error);
      }
    };

    if (productIds.length > 0) {
      updateStock();
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className='flex justify-center items-center pt-[60px]'>
      {loading ? (
        <SpinnerLoad/>
      ) : (
        <div className='text-center w-[600px] p-5 flex flex-col items-center justify-center gap-3'>
          <img className='w-10 md:w-14' src="img/Check.svg" alt="Success" />
          <h1 className='text-xl font-montserrat font-bold text-[#FFA07D] mb-5'>¡Gracias por tu compra!</h1>
          <p className='font-montserrat text-[#333333]'>
          Empezaremos a preparar tu pedido de inmediato. El tiempo estimado de entrega es de 3 a 5 días hábiles. 
          Si tienes alguna duda o consulta, no dudes en ponerte en contacto con nosotros. ¡Estamos aquí para ayudarte!
          </p>
          <button className='mt-14 border border-[#A989AE] text-[#A989AE] w-44 h-10 transition-all duration-300 hover:bg-gradient-three hover:text-white'>
                    <a href="/">Ir a la inicio</a>
          </button>
        </div>
      )}
    </div>
  );
};
