import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { SpinnerLoad } from './SpinnerLoad';

export const AddProduct = ({ onProductAdded, selectedProduct, setSelectedProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setPrice(selectedProduct.price);
            setInStock(selectedProduct.in_stock);
            setImageFile(null); // No se necesita cargar una nueva imagen para editar
        } else {
            // Reiniciar los campos si no hay producto seleccionado
            setName('');
            setPrice('');
            setInStock(true);
            setImageFile(null);
        }
    }, [selectedProduct]);

    const uploadImage = async (file) => {
        const fileName = `${Date.now()}_${file.name}`;

        const { data, error: uploadError } = await supabase
            .storage
            .from('product-images')
            .upload(fileName, file);

        if (uploadError) {
            console.error('Error al subir la imagen:', uploadError);
            return null;
        }

        const manualPublicUrl = `https://ilxazktxkpsdrvelmdfb.supabase.co/storage/v1/object/public/product-images/${fileName}`;
        return manualPublicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProduct && !imageFile) {
            alert('Por favor, selecciona una imagen para el producto.');
            return;
        }

        setLoading(true);

        let imageUrl = selectedProduct?.image_url; // Usar la URL existente si estamos editando

        if (imageFile) {
            imageUrl = await uploadImage(imageFile);
            if (!imageUrl) {
                alert('Hubo un problema al subir la imagen.');
                setLoading(false);
                return;
            }
        }

        if (!name || !price) {
            alert('Por favor, completa todos los campos.');
            setLoading(false);
            return;
        }

        // Si estamos editando un producto, actualizamos en lugar de insertar
        if (selectedProduct) {
            const { data, error: updateError } = await supabase
                .from('products')
                .update({ name, price: parseFloat(price), in_stock: inStock, image_url: imageUrl })
                .eq('id', selectedProduct.id)
                .select();

            setLoading(false);

            if (updateError) {
                console.error('Error al actualizar el producto:', updateError.message);
            } else {
                console.log('Producto actualizado correctamente', data[0]);
                onProductAdded(data[0]); // Actualizar la lista con el producto editado
                setSelectedProduct(null); // Reiniciar la selección después de editar
            }
        } else {
            // Insertar un nuevo producto
            const { data, error: insertError } = await supabase
                .from('products')
                .insert([{ name, price: parseFloat(price), in_stock: inStock, image_url: imageUrl }])
                .select();

            setLoading(false);

            if (insertError) {
                console.error('Error al añadir producto:', insertError.message);
            } else {
                console.log('Producto añadido correctamente', data[0]);
                onProductAdded(data[0]); // Pasar el nuevo producto al AdminPanel
            }
        }
    };

    return (
        <div className='w-auto md:w-[400px] bg-[#e3dce343] p-10 rounded-lg shadow-md'>
            <form className='flex flex-col text-[#A989AE] font-montserrat' onSubmit={handleSubmit}>
                <label>Nombre del producto:</label>
                <input className='bg-transparent border-b border-[#A989AE]' type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Precio:</label>
                <input className='bg-transparent border-b border-[#A989AE]' type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

                <label className="flex items-center space-x-2 mt-3">
                    <span>En Stock:</span>
                    <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                    />
                </label>

                <label className="mt-5">
                    Cargar imagen del producto:
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="mt-3 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />

                <button className='mt-7 border border-[#A989AE] text-[#A989AE] w-44 h-10 transition-all duration-300 hover:bg-gradient-three hover:text-white' type="submit" disabled={loading}>{selectedProduct ? 'Actualizar producto' : 'Añadir producto'}</button>
                {loading && <p><SpinnerLoad /></p>}
            </form>
        </div>
    );
};
