import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AgeWarning } from './components/AgeWarning';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Contact } from './pages/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'cart':
        return <Cart />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <AgeWarning />
        <Header
          onNavigate={setCurrentPage}
          currentPage={currentPage}
          onScrollToSection={scrollToSection}
        />
        <main className="flex-1">{renderPage()}</main>
        <Footer />
        <ScrollToTop />
      </div>
    </CartProvider>
  );
}

export default App;
