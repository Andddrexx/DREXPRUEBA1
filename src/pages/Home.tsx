import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductDetail } from '../components/ProductDetail';
import { IntensityInfo } from '../components/IntensityInfo';
import { products as productsData } from '../data/products';
import { useCart } from '../context/CartContext';
import { MessageCircle, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../lib/constants';

export const Home = () => {
  const [products] = useState<Product[]>(productsData);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSection, setActiveSection] = useState('vapers');
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();
  const whatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

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

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    if (!normalizedQuery) return true;
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.flavor.toLowerCase().includes(normalizedQuery)
    );
  });

  const vapers = filteredProducts.filter(p => p.category === '10-OH-HHC');
  const mecheros = filteredProducts.filter(p => p.category === 'mechero');
  const accesorios = filteredProducts.filter(p => p.category === 'accesorio');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <img
            src="/assets/logo.jpeg"
            alt="CBDREX"
            className="h-24 w-auto mx-auto mb-4"
          />
              <p className="text-xl mb-6 text-gray-300">
                Cannabis legal premium de la más alta calidad. Solo para mayores de 18 años.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Consulta por WhatsApp
              </a>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8 max-w-4xl mx-auto text-sm">
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Venta exclusiva +18</span>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>Entrega en mano</span>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Calidad premium</span>
                </div>
              </div>
            </div>
          </section>

      <nav className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-1 py-3">
            <button
              onClick={() => scrollToSection('vapers')}
              className={`px-6 py-2 font-semibold transition rounded-lg ${
                activeSection === 'vapers'
                  ? 'bg-black text-white'
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
                  ? 'bg-black text-white'
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
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Estuches/Accesorios
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, descripción o sabor..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent"
          />
          {!!normalizedQuery && (
            <p className="text-sm text-gray-500 mt-2">
              Mostrando resultados para: <span className="font-semibold text-gray-700">{query}</span>
            </p>
          )}
        </div>

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
