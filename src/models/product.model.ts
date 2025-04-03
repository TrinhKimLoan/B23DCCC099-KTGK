import { useState, useEffect } from 'react';
import type { Product } from '@/services/order/order.types';
import type { Order, OrderItem } from '@/services/order/order.types';

const PRODUCTS_KEY = 'products';

export default function useProductModel() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    setProducts(saved ? JSON.parse(saved) : []);
  }, []);

  const save = (newProducts: Product[]) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  // Kiểm tra sản phẩm có trong đơn hàng nào không trước khi xóa
  const canDelete = (productId: string) => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return !orders.some((o: Order) => 
      o.items.some((item: OrderItem) => item.productId === productId)
    );
  };

  const deleteProduct = (productId: string) => {
    if (!canDelete(productId)) {
      alert('Không thể xóa sản phẩm đã có trong đơn hàng');
      return;
    }
    const updated = products.filter(p => p.id !== productId);
    save(updated);
  };

  return { products, save, deleteProduct };
}