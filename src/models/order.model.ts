import { useState, useEffect } from 'react';
import { OrderService } from '@/services/order/order.service';
import type { Order } from '@/services/order/order.types';

export default function useOrderModel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);

  useEffect(() => {
    setOrders(OrderService.getOrders());
  }, []);

  const addOrder = (order: Order) => {
    const updated = OrderService.saveOrder(order);
    setOrders(updated);
  };

  const cancelOrder = (orderId: string) => {
    const updated = orders.map(o => 
      o.id === orderId ? { ...o, status: OrderStatus.CANCELLED } : o
    );
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    setOrders(updated);
  };
  const filterOrders = () => {
    return orders.filter(order => {
      const matchesSearch = order.id.includes(searchTerm) || 
        order.customerId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !statusFilter || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };
  
  return {
    orders,
    searchTerm,
    statusFilter,
    setSearchTerm,
    setStatusFilter,
    addOrder,
    cancelOrder,
    filteredOrders: filterOrders()
  };
}