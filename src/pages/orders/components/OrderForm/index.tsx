import { Form, Select, Button } from 'antd';
import { useModel } from 'umi';
import type { Order } from '@/services/order/order.types';
import ProductSelector from './ProductSelector';
import { validation } from '@/services/validation';

export default function OrderForm({ initialValues, onFinish }: { initialValues?: Order; onFinish: () => void; }) {
  const [form] = Form.useForm();
  const { customers } = useModel('customer');
  const { products } = useModel('product');
  const { addOrder } = useModel('order');

  // Theo dõi giá trị `items` trong form
  const items = Form.useWatch('items', form) || [];

  // Tính tổng tiền trực tiếp
  const total = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handleSubmit = (values: Omit<Order, 'total' | 'createdAt'>) => {
    addOrder({
      ...values,
      total,
      createdAt: new Date(),
    });
    onFinish();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item label="Khách hàng" name="customerId" rules={validation.order.customerId}>
        <Select options={customers.map(c => ({ label: c.name, value: c.id }))} />
      </Form.Item>

      <Form.Item label="Sản phẩm" name="items" rules={[{ required: true }]}>
        <ProductSelector />
      </Form.Item>

      <div className="total-section">
        Tổng tiền: {total.toLocaleString()} VND
      </div>

      <Button type="primary" htmlType="submit">
        Lưu đơn hàng
      </Button>
    </Form>
  );
}
