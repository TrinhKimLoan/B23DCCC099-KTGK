// File: src/models/product.model.ts
import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: string;
}

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
