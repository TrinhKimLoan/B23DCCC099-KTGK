import { Modal, Form, InputNumber, Input } from 'antd';
import { useModel } from 'umi';
import { validation } from '@/services/validation';
import { Product } from '@/services/order/order.types';

export default function ProductForm({ visible, onClose, initialValues }: {
  visible: boolean;
  onClose: () => void;
  initialValues?: Product;
}) {
  const [form] = Form.useForm();
  const { save } = useModel('product');

  const handleSubmit = (values: Product) => {
    save(values);
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
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
        <Form.Item label="Tên sản phẩm" name="name" rules={validation.product.name}>
          <Input />
        </Form.Item>

        <Form.Item label="Giá" name="price" rules={validation.product.price}>
          <InputNumber
            min={0}
            formatter={value => `${value} VND`}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="Số lượng tồn" name="stock" rules={validation.product.stock}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}