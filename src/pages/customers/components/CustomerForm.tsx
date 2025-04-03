import { Modal, Form, Input } from 'antd';
import { useModel } from 'umi';
import { validation } from '@/services/validation';

export default function CustomerForm({ visible, onClose, initialValues }: {
  visible: boolean;
  onClose: () => void;
  initialValues?: Customer;
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
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Cập nhật khách hàng" : "Thêm khách hàng mới"}
      visible={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item label="Tên" name="name" rules={validation.customer.name}>
          <Input />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phone" rules={validation.customer.phone}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}