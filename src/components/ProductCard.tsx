import { Product } from '../types';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onViewDetails, onAddToCart }: ProductCardProps) => {
  return (
    <div className="card-premium overflow-hidden group">
      <div className="relative h-72 overflow-hidden cursor-pointer bg-black" onClick={() => onViewDetails(product)}>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-100 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {product.featured && (
          <div className="absolute top-3 right-3 badge-gold">
            <Star className="w-3 h-3 fill-current" />
            Destacado
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
            className="w-full bg-neutral-900/80 text-white py-2.5 rounded-xl font-semibold text-sm backdrop-blur-md border border-white/10"
          >
            Ver detalles
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500">
            {product.category === '10-OH-HHC' ? '10-OH-HHC' : product.category}
          </span>
        </div>

        <h3 className="font-bold text-white mb-1.5 leading-snug line-clamp-2 text-[15px]">
          {product.name}
        </h3>

        <p className="text-xs text-neutral-500 mb-3 line-clamp-1">{product.flavor}</p>

        <div className="flex items-end justify-between pt-3 border-t border-neutral-700/50">
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">
              {product.price.toFixed(2)}<span className="text-base font-semibold text-neutral-500">€</span>
            </span>
            <p className="text-[10px] text-neutral-500 mt-0.5">{product.format}</p>
          </div>

          {product.stock > 0 ? (
            <button
              onClick={() => onAddToCart(product)}
              className="bg-white hover:bg-neutral-200 text-neutral-900 p-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs font-semibold text-neutral-500 bg-neutral-700 px-3 py-1.5 rounded-lg">
              Sin stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
