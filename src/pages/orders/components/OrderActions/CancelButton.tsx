import { Button, Modal } from 'antd';
import { useModel } from 'umi';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { Order } from '@/services/order/order.types';

export default function CancelButton({ order }: { order: Order }) {
  const { cancelOrder } = useModel('order.model');
  
  const handleCancel = () => {
    Modal.confirm({
      title: 'Xác nhận hủy đơn?',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
      onOk: () => cancelOrder(order.id)
    });
  };

  return (
    <Button 
      danger 
      onClick={handleCancel}
      disabled={order.status !== OrderStatus.PENDING}
    >
      Hủy đơn
    </Button>
  );
}