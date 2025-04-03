import { Tag } from 'antd';
import { OrderStatus } from '@/services/order/order.types';

const statusColor: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'gold',
  [OrderStatus.DELIVERING]: 'blue',
  [OrderStatus.COMPLETED]: 'green',
  [OrderStatus.CANCELLED]: 'red'
};

export default function StatusTag({ status }: { status: OrderStatus }) {
  return <Tag color={statusColor[status]}>{status}</Tag>;
}