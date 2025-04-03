// File: src/pages/orders/index.tsx
import React from 'react';
import { Row, Col, Divider } from 'antd';
import OrderForm from './OrderForm';
import OrderTable from './OrderTable';

const OrdersPage = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <h2>Tạo đơn hàng</h2>
          <OrderForm />
        </Col>
        <Col span={16}>
          <h2>Danh sách đơn hàng</h2>
          <OrderTable />
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export default OrdersPage;
