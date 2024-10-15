import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe('pk_test_51PpzF7H9PONPEqsgS47cI9PvJWThLmbFTNBE5C8P4tm1nrgwKlkJDFd47cScGny8gaJzvU2CmnRHFoPya6K0bLDO005ZSWFH5i');

export const CheckoutButton = ({ cartItems }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Crear una sesión de Stripe llamando a tu backend (Supabase Edge Function)
      const response = await fetch('https://ilxazktxkpsdrvelmdfb.supabase.co/functions/v1/create_stripe_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Error desconocido al crear la sesión de Stripe');
      }

      const session = await response.json();
      const stripe = await stripePromise;
      
      const { error } = await stripe.redirectToCheckout({ sessionId: session.sessionId });

      if (error) {
        console.error("Error al redirigir a Checkout:", error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error en el proceso de pago:", error.message);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading}
      className="border border-[#A989AE] text-[#A989AE] w-44 h-10 transition-all duration-300 hover:bg-gradient-three hover:text-white font-montserrat"
    >
      {loading ? 'Procesando...' : 'Pagar ahora'}
    </button>
  );
};
