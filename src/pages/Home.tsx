import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductDetail } from '../components/ProductDetail';
import { IntensityInfo } from '../components/IntensityInfo';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { MessageCircle, Loader } from 'lucide-react';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('vapers');
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['vapers', 'mecheros', 'accesorios'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const vapers = products.filter(p => p.category === 'vaper');
  const mecheros = products.filter(p => p.category === 'mechero');
  const accesorios = products.filter(p => p.category === 'accesorio');

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

      <nav className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-1 py-3">
            <button
              onClick={() => scrollToSection('vapers')}
              className={`px-6 py-2 font-semibold transition rounded-lg ${
                activeSection === 'vapers'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Vapers
            </button>
            <span className="text-gray-300 flex items-center">|</span>
            <button
              onClick={() => scrollToSection('mecheros')}
              className={`px-6 py-2 font-semibold transition rounded-lg ${
                activeSection === 'mecheros'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Mecheros
            </button>
            <span className="text-gray-300 flex items-center">|</span>
            <button
              onClick={() => scrollToSection('accesorios')}
              className={`px-6 py-2 font-semibold transition rounded-lg ${
                activeSection === 'accesorios'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Estuches/Accesorios
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-12 h-12 text-green-600 animate-spin" />
          </div>
        ) : (
          <>
            <section id="vapers" className="scroll-mt-32 mb-16">
              <IntensityInfo />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vapers.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
              {vapers.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No hay vapers disponibles en este momento.</p>
                </div>
              )}
            </section>

            <section id="mecheros" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Mecheros</h2>
              <p className="text-gray-600 mb-8">Encendido confiable con diseños únicos</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mecheros.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
              {mecheros.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No hay mecheros disponibles en este momento.</p>
                </div>
              )}
            </section>

            <section id="accesorios" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Estuches y Accesorios</h2>
              <p className="text-gray-600 mb-8">Complementos premium para proteger y transportar</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {accesorios.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
              {accesorios.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No hay accesorios disponibles en este momento.</p>
                </div>
              )}
            </section>
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
