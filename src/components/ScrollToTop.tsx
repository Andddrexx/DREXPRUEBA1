import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white hover:bg-neutral-200 text-neutral-900 rounded-2xl shadow-lg shadow-black/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
      aria-label="Volver arriba"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
