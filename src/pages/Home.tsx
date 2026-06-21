import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductDetail } from '../components/ProductDetail';
import { WhatsAppConsultModal } from '../components/WhatsAppConsultModal';
import { ComingSoon } from '../components/ComingSoon';
import { products as productsData } from '../data/products';
import { useCart } from '../context/CartContext';
import { MessageCircle, ArrowDown, Flame, Shield, Lock } from 'lucide-react';

export const Home = () => {
  const [products] = useState<Product[]>(productsData);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSection, setActiveSection] = useState('vapers'); 
  const [showCategoryNav, setShowCategoryNav] = useState(true);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsappProductName, setWhatsappProductName] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const sections = ['vapers', 'accesorios'];
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

      const currentScroll = window.scrollY;
      const isMobile = window.matchMedia('(max-width: 1023px)').matches;
      if (isMobile) {
        if (currentScroll > lastScroll && currentScroll > 160) {
          setShowCategoryNav(false);
        } else {
          setShowCategoryNav(true);
        }
      } else {
        setShowCategoryNav(true);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleWhatsAppConsult = (productName?: string) => {
    setWhatsappProductName(productName || '');
    setShowWhatsAppModal(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-500">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-400" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center h-full">
          <img
            src="/assets/logo.png"
            alt="CBDREX"
            className="w-[180vw] sm:w-[70vw] md:w-[50vw] max-w-[1000px] max-h-[50vh] h-auto animate-float relative z-10 object-contain flex-shrink-0"
          /> 

          <p className="text-lg md:text-xl text-neutral-200 mt-4 mb-5 max-w-xl mx-auto text-center animate-fade-in-up stagger-2">
 Calidad garantizada. Diseño discreto.        </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-2">
            <button
              onClick={() => handleWhatsAppConsult()}
              className="inline-flex items-center gap-2 bg-white text-neutral-900 px-8 py-3.5 rounded-xl font-semibold hover:bg-neutral-200 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              Consulta por WhatsApp
            </button>
            <button
              onClick={() => scrollToSection('vapers')}
              className="inline-flex items-center gap-2 border border-neutral-700 text-neutral-300 px-8 py-3.5 rounded-xl font-semibold hover:bg-neutral-800 hover:border-neutral-600 transition-all duration-300"
            >
              Ver catálogo
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
              { icon: Flame, title: '97% 10-OH-HHC', desc: 'Máxima concentración legal' },
              { icon: Shield, title: '100% Legal', desc: 'THC menor a 0.2%' },
              { icon: Lock, title: 'Entrega discreta', desc: 'Verificación +18' },
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
      <nav
        className={`sticky top-16 lg:top-20 z-30 glass border-b border-neutral-600/30 transition-transform duration-300 landscape-mobile-hidden ${
          showCategoryNav ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 py-3">
            {[
              { id: 'vapers', label: 'Vapers', comingSoon: false },
              { id: 'accesorios', label: 'Smoke Accessories', comingSoon: true },
            ].map((item, i) => (
              <span key={item.id} className="flex items-center gap-2">
                {i > 0 && <span className="text-neutral-500 hidden sm:block">|</span>}
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`px-5 py-2 font-medium transition-all duration-200 rounded-xl text-sm ${
                    item.comingSoon
                      ? 'text-neutral-500 hover:bg-white/5 hover:text-neutral-400 relative'
                      : activeSection === item.id
                        ? 'bg-white text-neutral-900'
                        : 'text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.comingSoon && (
                    <span className="ml-1.5 text-[9px] font-bold tracking-wider uppercase text-neutral-600">
                      Soon
                    </span>
                  )}
                </button>
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* Products */}
      <div className="container mx-auto px-4 py-16">
        <section id="vapers" className="scroll-mt-40 mb-24">
          <h2 className="section-heading mb-2">Nuestros Vapers de 10-OH-HHC</h2>
          <div className="divider-dark mt-4 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vapers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
                onAddToCart={handleAddToCart}
                onWhatsAppConsult={(name) => handleWhatsAppConsult(name)}
              />
            ))}
          </div>
          {vapers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-400 text-lg">No hay vapers disponibles en este momento.</p>
            </div>
          )}
        </section>

        <section id="accesorios" className="scroll-mt-40 mb-16">
          <ComingSoon
            title="Smoke Accessories"
            items={[  'Mecheros', 'Grinders',
  'Bandejas',
  'Joint Holders',
  'Ceniceros',
  'Bongs',
  'Pipas']}
          />
        </section>
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <WhatsAppConsultModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        productName={whatsappProductName}
      />
    </div>
  );
};
