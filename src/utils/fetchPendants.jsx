import { supabase } from "../supabaseClient";

// Fetch products with pagination
export const fetchPendants = async (page, pageSize) => {
  const { data, error, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1); // Pagination logic

  if (error) {
    console.error('Error fetching pendants:', error);
    return { data: [], count: 0 };
  }

  return { data, count };
}
