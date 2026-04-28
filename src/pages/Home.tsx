import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductDetail } from '../components/ProductDetail';
import { IntensityInfo } from '../components/IntensityInfo';
import { products as productsData } from '../data/products';
import { useCart } from '../context/CartContext';
import { MessageCircle, ArrowDown, Flame, Shield, Truck } from 'lucide-react';

export const Home = () => {
  const [products] = useState<Product[]>(productsData);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSection, setActiveSection] = useState('vapers');
  const { addToCart } = useCart();

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

  const vapers = products.filter(p => p.category === '10-OH-HHC');
  const mecheros = products.filter(p => p.category === 'mechero');
  const accesorios = products.filter(p => p.category === 'accesorio');

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-500">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-400" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <img
              src="/assets/logo.jpeg"
              alt="CBDREX"
              className="h-28 w-auto mx-auto mb-8 rounded-2xl shadow-2xl animate-float"
            />
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 animate-fade-in-up stagger-1">
            CBDREX
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 mb-4 max-w-xl mx-auto animate-fade-in-up stagger-2">
            Cannabis legal premium de la mas alta calidad
          </p>

          <p className="text-sm text-neutral-600 mb-10 tracking-widest uppercase animate-fade-in-up stagger-3">
            Solo para mayores de 18 anos
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-4">
            <a
              href="https://wa.me/34681872420?text=Hola%20%F0%9F%91%8B%0AGracias%20por%20contactar%20con%20CBDrex.%0AEste%20servicio%20es%20exclusivo%20para%20mayores%20de%2018%20a%C3%B1os%20y%20productos%20de%20cannabis%20legal%20(CBD%20/%20c%C3%A1%C3%B1amo).%0AIndica:%0A1%EF%B8%8F%E2%83%A3%20Producto%20que%20te%20interesa%0A2%EF%B8%8F%E2%83%A3%20Cantidad%0A3%EF%B8%8F%E2%83%A3%20Confirmaci%C3%B3n%20de%20que%20eres%20mayor%20de%20edad%0ATe%20responderemos%20lo%20antes%20posible."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-neutral-900 px-8 py-3.5 rounded-xl font-semibold hover:bg-neutral-200 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              Consulta por WhatsApp
            </a>
            <button
              onClick={() => scrollToSection('vapers')}
              className="inline-flex items-center gap-2 border border-neutral-700 text-neutral-300 px-8 py-3.5 rounded-xl font-semibold hover:bg-neutral-800 hover:border-neutral-600 transition-all duration-300"
            >
              Ver catalogo
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-500 to-transparent" />
      </section>

      {/* Trust badges */}
      <section className="py-12 border-b border-neutral-700/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Flame, title: '97% 10-OH-HHC', desc: 'Maxima concentracion legal' },
              { icon: Shield, title: '100% Legal', desc: 'THC menor a 0.2%' },
              { icon: Truck, title: 'Entrega en mano', desc: 'Verificacion de edad +18' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 p-5 bg-neutral-800/60 rounded-2xl border border-neutral-600/40 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-neutral-700 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-neutral-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category nav */}
      <nav className="sticky top-16 lg:top-20 z-30 glass border-b border-neutral-600/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 py-3">
            {[
              { id: 'vapers', label: 'Vapers' },
              { id: 'mecheros', label: 'Mecheros' },
              { id: 'accesorios', label: 'Estuches / Accesorios' },
            ].map((item, i) => (
              <span key={item.id} className="flex items-center gap-2">
                {i > 0 && <span className="text-neutral-500 hidden sm:block">|</span>}
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`px-5 py-2 font-medium transition-all duration-200 rounded-xl text-sm ${
                    activeSection === item.id
                      ? 'bg-white text-neutral-900'
                      : 'text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* Products */}
      <div className="container mx-auto px-4 py-16">
        <section id="vapers" className="scroll-mt-40 mb-24">
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
              <p className="text-neutral-400 text-lg">No hay vapers disponibles en este momento.</p>
            </div>
          )}
        </section>

        <section id="mecheros" className="scroll-mt-40 mb-24">
          <h2 className="section-heading mb-2">Mecheros</h2>
          <p className="text-neutral-400 mb-3 text-lg">Encendido confiable con disenos unicos</p>
          <div className="divider-dark mb-8" />
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
              <p className="text-neutral-400 text-lg">No hay mecheros disponibles en este momento.</p>
            </div>
          )}
        </section>

        <section id="accesorios" className="scroll-mt-40 mb-16">
          <h2 className="section-heading mb-2">Estuches y Accesorios</h2>
          <p className="text-neutral-400 mb-3 text-lg">Complementos premium para proteger y transportar</p>
          <div className="divider-dark mb-8" />
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
              <p className="text-neutral-400 text-lg">No hay accesorios disponibles en este momento.</p>
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
