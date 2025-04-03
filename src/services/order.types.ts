// File: src/services/order/typings.d.ts

export interface OrderItem {
  productId: string;
  quantity: number;
}

export enum OrderStatus {
  PENDING = 'Chờ xác nhận',
  COMPLETED = 'Hoàn thành',
  CANCELLED = 'Hủy',
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  orderDate: string;
  total: number;
}
