export enum OrderStatus {
    PENDING = 'Chờ xác nhận',
    DELIVERING = 'Đang giao',
    COMPLETED = 'Hoàn thành',
    CANCELLED = 'Hủy'
  }
  
  export interface Customer {
    id: string;
    name: string;
    phone: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
  }
  
  export interface OrderItem {
    productId: string;
    quantity: number;
  }
  
  export interface Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: Date;
  }