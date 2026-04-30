import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onScrollToSection?: (section: string) => void;
}

export const Header = ({ onNavigate, currentPage, onScrollToSection }: HeaderProps) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [showCatalogMenu, setShowCatalogMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowCatalogMenu(false);
      }
    };
    if (showCatalogMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCatalogMenu]);

  const handleCatalogClick = (section?: string) => {
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        if (section && onScrollToSection) onScrollToSection(section);
      }, 100);
    } else if (section && onScrollToSection) {
      onScrollToSection(section);
    }
    setShowCatalogMenu(false);
    setMobileMenuOpen(false);
  };

  const navTextClass = (active: boolean) =>
    active
      ? scrolled
        ? 'text-white bg-white/10'
        : 'text-white bg-white/10'
      : scrolled
        ? 'text-neutral-400 hover:text-white hover:bg-white/10'
        : 'text-white/70 hover:text-white hover:bg-white/10';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'glass border-b border-neutral-800/50' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            >
              <img
                src="/assets/logo.jpeg"
                alt="CBDREX"
                className="h-10 lg:h-12 w-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <p className={`text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${
                  scrolled ? 'text-neutral-500' : 'text-white/50'
                }`}>
                  Cannabis Legal +18
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowCatalogMenu(!showCatalogMenu)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${navTextClass(currentPage === 'home')}`}
                >
                  Catalogo
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showCatalogMenu ? 'rotate-180' : ''}`} />
                </button>

                {showCatalogMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-neutral-800 border border-neutral-600/50 rounded-2xl shadow-xl shadow-black/30 overflow-hidden min-w-[220px] animate-scale-in">
                    <div className="p-2">
                      {[
                        { id: 'vapers', label: 'Vapers' },
                        { id: 'mecheros', label: 'Mecheros' },
                        { id: 'accesorios', label: 'Estuches / Accesorios' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleCatalogClick(item.id)}
                          className="flex items-center gap-3 w-full text-left px-4 py-3 text-neutral-300 hover:text-white hover:bg-neutral-700 rounded-xl transition-colors duration-150 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform" />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${navTextClass(currentPage === 'contact')}`}
              >
                Contacto
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('cart')}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm ${
                  scrolled
                    ? 'bg-neutral-800 text-white hover:bg-neutral-700'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Carrito</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 ${
                  scrolled
                    ? 'bg-neutral-800 text-white hover:bg-neutral-700'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-neutral-900 border-l border-neutral-700/50 shadow-2xl animate-slide-in-right">
            <div className="p-6 pt-24 space-y-2">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-600 mb-4 px-4">Navegacion</p>
              {[
                { id: 'vapers', label: 'Vapers' },
                { id: 'mecheros', label: 'Mecheros' },
                { id: 'accesorios', label: 'Estuches / Accesorios' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCatalogClick(item.id)}
                  className="w-full text-left px-4 py-3 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-xl font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-neutral-700/50 my-4" />
              <button
                onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-xl font-medium transition-colors"
              >
                Contacto
              </button>
              <div className="border-t border-neutral-700/50 my-4" />
              <button
                onClick={() => { onNavigate('cart'); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 w-full btn-primary"
              >
                <ShoppingCart className="w-5 h-5" />
                Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
