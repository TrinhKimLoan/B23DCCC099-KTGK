import { useState, useEffect } from 'react';
import { getOrders, addOrder as serviceAddOrder, cancelOrder as serviceCancelOrder } from '@/services/order.service';
import type { Order } from '@/services/order.types';
import { OrderStatus } from '@/services/order.types';

export default function useOrderModel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const addOrder = (order: Omit<Order, 'id'>) => {
    // Tạo id mới ở đây (model sẽ tự động thêm id)
    const newOrder: Order = { ...order, id: `ORD-${Date.now()}` };
    serviceAddOrder(newOrder);
    setOrders(getOrders());
  };

  const cancelOrder = (orderId: string) => {
    serviceCancelOrder(orderId);
    setOrders(getOrders());
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.includes(searchTerm) ||
      order.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return {
    orders,
    searchTerm,
    statusFilter,
    setSearchTerm,
    setStatusFilter,
    addOrder,
    cancelOrder,
    filteredOrders,
  };
}
