import { useModel } from 'umi';
import { Form, Input, InputNumber, Button } from 'antd';
import { validation } from '@/services/validation';
import type { Product } from '@/services/order/order.types';

export default function ProductForm({ initialValues, onClose }: {
  initialValues?: Product;
  onClose: () => void;
}) {
  const [form] = Form.useForm();
  const { products, save } = useModel('product');

  const handleSubmit = (values: Product) => {
    const newProduct = { 
      ...values, 
      id: initialValues?.id || `PROD-${Date.now()}`
    };
    
    const updated = initialValues 
      ? products.map(p => p.id === initialValues.id ? newProduct : p)
      : [...products, newProduct];
    
    save(updated);
    onClose();
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item label="Tên sản phẩm" name="name" rules={validation.product.name}>
        <Input />
      </Form.Item>

      <Form.Item label="Giá" name="price" rules={validation.product.price}>
        <InputNumber min={0} formatter={value => `${value} VND`} />
      </Form.Item>

      <Form.Item label="Số lượng tồn" name="stock" rules={validation.product.stock}>
        <InputNumber min={0} />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {initialValues ? 'Cập nhật' : 'Thêm mới'}
      </Button>
    </Form>
  );
}