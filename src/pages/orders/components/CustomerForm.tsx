import { useModel } from 'umi';
import { Form, Input, Button } from 'antd';
import { validation } from '@/services/validation';
import { Customer } from '@/services/order/order.types';

export default function CustomerForm({ initialValues, onClose }: {
  initialValues?: Customer;
  onClose: () => void;
}) {
  const [form] = Form.useForm();
  const { addCustomer, updateCustomer } = useModel('customer');

  const handleSubmit = (values: Customer) => {
    if (initialValues) {
      updateCustomer(initialValues.id, values);
    } else {
      addCustomer(values);
    }
    onClose();
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Form.Item label="Tên khách hàng" name="name" rules={validation.customer.name}>
        <Input />
      </Form.Item>

      <Form.Item label="Số điện thoại" name="phone" rules={validation.customer.phone}>
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {initialValues ? 'Cập nhật' : 'Thêm mới'}
      </Button>
    </Form>
  );
}