import { Product } from '../types';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onViewDetails, onAddToCart }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-64 overflow-hidden group cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            Destacado
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>

        <div className="mb-3">
          <span className="text-xs text-gray-500 font-semibold">Sabor: </span>
          <span className="text-xs text-gray-700">{product.flavor}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-green-700">{product.price.toFixed(2)}€</span>
            <span className="text-xs text-gray-500 ml-2">{product.format}</span>
          </div>
        </div>

        {product.stock > 0 ? (
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="flex-1 border-2 border-green-600 text-green-600 py-2 px-4 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              Ver detalles
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-semibold cursor-not-allowed"
          >
            Sin stock
          </button>
        )}
      </div>
    </div>
  );
};
