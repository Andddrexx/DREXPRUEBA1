import { TrendingDown } from 'lucide-react';
import { Promotion } from '../types';

interface PromotionBadgeProps {
  promotions: Promotion[];
}

export const PromotionBadge = ({ promotions }: PromotionBadgeProps) => {
  return (
    <div className="mt-3 space-y-2">
      {promotions.map((promo) => (
        <div
          key={promo.id}
          className="flex items-center gap-2 text-sm bg-green-50 border border-green-200 rounded-lg p-2"
        >
          <TrendingDown className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="text-green-700 font-medium">{promo.description}</span>
        </div>
      ))}
    </div>
  );
};
