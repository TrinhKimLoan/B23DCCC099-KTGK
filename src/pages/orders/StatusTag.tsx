import React from 'react';
import { Tag } from 'antd';
import { OrderStatus } from '../../services/order.types';

interface StatusTagProps {
  status: OrderStatus;
}

const statusColors: Record<OrderStatus, string> = {
  PENDING: 'orange',
  COMPLETED: 'green',
  CANCELLED: 'red',
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  return <Tag color={statusColors[status]}>{status}</Tag>;
};

export default StatusTag;
