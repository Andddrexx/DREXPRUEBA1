import { useCart } from '../context/CartContext';
import { CartToast } from './CartToast';

export const CartToastWrapper = () => {
  const { toast } = useCart();
  return <CartToast key={toast.key} visible={toast.visible} productName={toast.productName} />;
};
