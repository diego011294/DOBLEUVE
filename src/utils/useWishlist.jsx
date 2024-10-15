import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useUser } from "./useUser";

export const useWishlist = (productId) => {
  const { user } = useUser(); // Usamos el hook de usuario existente
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      if (user && productId) {
        const { data: wishlistItems, error } = await supabase
          .from('wishlist')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (!error && wishlistItems.length > 0) {
          setIsInWishlist(true);
        } else {
          setIsInWishlist(false);
        }
      }
    };

    checkWishlist();
  }, [user, productId]);

  const toggleWishlist = async () => {
    if (!user) {
      return; // Si no hay usuario, se debería manejar esto en el componente
    }

    try {
      if (isInWishlist) {
        // Eliminar de la wishlist si ya está
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;

        setIsInWishlist(false);
      } else {
        // Añadir a la wishlist si no está
        const { error } = await supabase
          .from('wishlist')
          .insert([{ user_id: user.id, product_id: productId }]);

        if (error) throw error;

        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Error al actualizar la lista de deseos:', error);
    }
  };

  return { isInWishlist, toggleWishlist };
};
