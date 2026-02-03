import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductDetail } from '../components/ProductDetail';
import { IntensityInfo } from '../components/IntensityInfo';
import { AccessoriesSection } from '../components/AccessoriesSection';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { MessageCircle, Loader } from 'lucide-react';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      if (!supabase) {
        console.warn('Supabase not configured');
        setProducts([]);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white px-6 py-2 rounded inline-block mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-black">CBDREX</h1>
          </div>
          <p className="text-xl mb-6 text-green-100">
            Cannabis legal premium de la más alta calidad. Solo para mayores de 18 años.
          </p>
          <a
            href="https://wa.me/34681872420?text=Hola%20%F0%9F%91%8B%0AGracias%20por%20contactar%20con%20CBDrex.%0AEste%20servicio%20es%20exclusivo%20para%20mayores%20de%2018%20a%C3%B1os%20y%20productos%20de%20cannabis%20legal%20(CBD%20/%20c%C3%A1%C3%B1amo).%0AIndica:%0A1%EF%B8%8F%E2%83%A3%20Producto%20que%20te%20interesa%0A2%EF%B8%8F%E2%83%A3%20Cantidad%0A3%EF%B8%8F%E2%83%A3%20Confirmaci%C3%B3n%20de%20que%20eres%20mayor%20de%20edad%0ATe%20responderemos%20lo%20antes%20posible."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Consulta por WhatsApp
          </a>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <IntensityInfo />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-12 h-12 text-green-600 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.category === 'vaper').map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No hay productos disponibles en este momento.</p>
              </div>
            )}

            <AccessoriesSection />
          </>
        )}
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
