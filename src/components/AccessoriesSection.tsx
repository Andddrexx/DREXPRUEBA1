import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ProductDetail } from './ProductDetail';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { Loader } from 'lucide-react';

export const AccessoriesSection = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    loadAccessories();
  }, []);

  const loadAccessories = async () => {
    try {
      if (!supabase) {
        setAccessories([]);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'accesorio')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAccessories(data || []);
    } catch (error) {
      console.error('Error loading accessories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }

  if (accessories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Accesorios</h2>
      <p className="text-gray-600 mb-8">Complementos premium para mejorar tu experiencia</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {accessories.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};
