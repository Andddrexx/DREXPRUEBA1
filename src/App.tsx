import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AgeWarning } from './components/AgeWarning';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Contact } from './pages/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        <main className="flex-1">{renderPage()}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
