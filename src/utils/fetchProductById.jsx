import { supabase } from "../supabaseClient";

export const fetchProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single(); // Para obtener solo un producto

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
};
