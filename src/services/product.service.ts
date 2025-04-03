import { Product } from '@/models/product.model';

export const getProducts = (): Product[] => {
  return JSON.parse(localStorage.getItem('products') || '[]');
};
