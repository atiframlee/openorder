// src/components/GlobalUI.js
import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';
import { cartAtom, isCustomModalOpenAtom } from '../store/atoms';
import MiniCart from './MiniCart';

export default function GlobalUI() {
  const [cart] = useAtom(cartAtom);
  const [isCustomModalOpen] = useAtom(isCustomModalOpenAtom);
  const location = useLocation();

  // Hide MiniCart if: empty, on /cart, or custom modal open
  if (cart.length === 0 || location.pathname === '/cart' || isCustomModalOpen) {
    return null;
  }

  return <MiniCart />;
}