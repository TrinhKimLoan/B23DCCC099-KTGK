import { Order } from './order.types';
import { Customer } from './order.types';
import { Product } from './order.types';
const ORDERS_KEY = 'orders';
const CUSTOMERS_KEY = 'customers';
const PRODUCTS_KEY = 'products';

export const OrderService = {
  getOrders: (): Order[] => JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'),
  
  saveOrder: (order: Order) => {
    const orders = OrderService.getOrders();
    const existing = orders.find(o => o.id === order.id);
    const newOrders = existing 
      ? orders.map(o => o.id === order.id ? order : o) 
      : [...orders, order];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(newOrders));
    return newOrders;
  },

  getCustomers: (): Customer[] => JSON.parse(localStorage.getItem(CUSTOMERS_KEY) || '[]'),
  
  getProducts: (): Product[] => JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]')
};