import { supabase } from "../supabaseClient";

export const fetchLatestPendants = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching latest pendientes:', error);
    return [];
  }

  return data;
}
