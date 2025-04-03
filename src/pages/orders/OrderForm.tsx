// File: src/pages/orders/OrderForm.tsx
import React, { useState } from 'react';
import { Form, Select, InputNumber, Button, Table, Input, message } from 'antd';
import { getCustomers } from '@/services/customer.service';
import { getProducts } from '@/services/product.service';
import type { Order, OrderItem } from '@/services/order.types';
import { useModel } from 'umi';
import { OrderStatus } from '@/services/order.types';

const OrderForm = () => {
  const [form] = Form.useForm();
  const customers = getCustomers();
  const products = getProducts();
  const { addOrder } = useModel('order');
  
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);

  const handleAddProduct = () => {
    if (!selectedProductId || quantity < 1) {
      message.error('Chọn sản phẩm và số lượng hợp lệ');
      return;
    }
    if (selectedItems.find(item => item.productId === selectedProductId)) {
      message.error('Sản phẩm đã được thêm');
      return;
    }
    setSelectedItems([...selectedItems, { productId: selectedProductId, quantity }]);
    setSelectedProductId('');
    setQuantity(1);
  };

  const removeItem = (productId: string) => {
    setSelectedItems(selectedItems.filter(item => item.productId !== productId));
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productId',
      key: 'productId',
      render: (id: string) => {
        const prod = products.find(p => p.id === id);
        return prod ? prod.name : id;
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: OrderItem) => (
        <Button danger onClick={() => removeItem(record.productId)}>Xóa</Button>
      ),
    },
  ];

  const totalAmount = selectedItems.reduce((sum, item) => {
    const prod = products.find(p => p.id === item.productId);
    return sum + (prod ? prod.price * item.quantity : 0);
  }, 0);

  const onFinish = (values: any) => {
    if (selectedItems.length === 0) {
      message.error('Vui lòng thêm ít nhất 1 sản phẩm');
      return;
    }
    const newOrder: Omit<Order, 'id'> = {
      customerId: values.customerId,
      items: selectedItems,
      status: OrderStatus.PENDING,
      orderDate: new Date().toISOString(),
      total: totalAmount,
    };
    addOrder(newOrder);
    message.success('Đơn hàng được tạo thành công');
    form.resetFields();
    setSelectedItems([]);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Khách hàng"
        name="customerId"
        rules={[{ required: true, message: 'Vui lòng chọn khách hàng' }]}
      >
        <Select placeholder="Chọn khách hàng">
          {customers.map(c => (
            <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Chọn sản phẩm">
        <Input.Group compact>
          <Select
            placeholder="Chọn sản phẩm"
            value={selectedProductId}
            onChange={setSelectedProductId}
            style={{ width: '50%' }}
          >
            {products.map(p => (
              <Select.Option key={p.id} value={p.id}>
                {p.name} ({p.price.toLocaleString()} VND)
              </Select.Option>
            ))}
          </Select>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => setQuantity(value)}
            style={{ width: '20%' }}
            placeholder="Số lượng"
          />
          <Button type="primary" onClick={handleAddProduct} style={{ width: '30%' }}>
            Thêm
          </Button>
        </Input.Group>
      </Form.Item>

      {selectedItems.length > 0 && (
        <Table
          dataSource={selectedItems}
          columns={columns}
          rowKey="productId"
          pagination={false}
          style={{ marginBottom: 16 }}
        />
      )}

      <Form.Item label="Tổng tiền">
        <Input value={totalAmount.toLocaleString()} disabled />
      </Form.Item>

      <Button type="primary" htmlType="submit">Tạo đơn hàng</Button>
    </Form>
  );
};

export default OrderForm;
