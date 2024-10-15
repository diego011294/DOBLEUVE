import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '');

serve(async (req) => {
  // Manejar las solicitudes OPTIONS para CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",  // Permitir todas las orígenes, ajusta según necesites
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method === "POST") {
    const { productIds } = await req.json();

    const { error } = await supabase
      .from('products')
      .update({ in_stock: false })
      .in('id', productIds);

    if (error) {
      return new Response(JSON.stringify({ error: 'Error updating stock' }), { 
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }  // Asegúrate de incluir este encabezado
      });
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" }  // Asegúrate de incluir este encabezado
    });
  }

  // Manejar métodos no permitidos
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { "Access-Control-Allow-Origin": "*" }
  });
});
