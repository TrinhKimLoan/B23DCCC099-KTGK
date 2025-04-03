import type { Order, OrderStatus } from './order.types';

export const getOrders = (): Order[] => {
  return JSON.parse(localStorage.getItem('orders') || '[]');
};

export const addOrder = (newOrder: Order): Order[] => {
  const orders = getOrders();
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  return orders;
};

export const updateOrderStatus = (orderId: string, newStatus: OrderStatus): void => {
  const orders = getOrders();
  const updatedOrders = orders.map(order =>
    order.id === orderId ? { ...order, status: newStatus } : order
  );
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
};

export const cancelOrder = (orderId: string): void => {
  const orders = getOrders();
  const updatedOrders = orders.map(order =>
    order.id === orderId && order.status === OrderStatus.PENDING
      ? { ...order, status: OrderStatus.CANCELLED }
      : order
  );
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
};
