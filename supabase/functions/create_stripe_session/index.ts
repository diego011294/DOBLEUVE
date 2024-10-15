import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe?target=deno&no-check';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

serve(async (req) => {
  if (req.method === "OPTIONS") {
    // Responder a las solicitudes de preflight (CORS)
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const { cartItems } = await req.json();

    // Crear la sesión de Stripe Checkout con recolección de dirección de envío
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: [item.image_url],
          },
          unit_amount: Math.round(item.price * 100), // Precio en centavos
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://tu-dominio.com/cancel',
      shipping_address_collection: {
        allowed_countries: ['ES'], // Puedes ajustar esto a los países que permitas
      },
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Permitir CORS desde cualquier origen
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Permitir CORS desde cualquier origen
        },
      }
    );
  }
});
