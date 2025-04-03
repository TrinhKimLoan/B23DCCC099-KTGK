import { Button, Table, Space } from 'antd';
import { useModel } from 'umi';
import CustomerForm from './components/CustomerForm';
import { useState } from 'react';

export default function CustomerPage() {
  const { customers } = useModel('customer');
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Thao tác',
      render: (_, record: Customer) => (
        <Space>
          <Button onClick={() => {
            setEditingCustomer(record);
            setShowForm(true);
          }}>Sửa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <Button type="primary" onClick={() => setShowForm(true)}>
          Thêm khách hàng
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={customers}
      />

      <CustomerForm 
        visible={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingCustomer(undefined);
        }}
        initialValues={editingCustomer}
      />
    </div>
  );
}