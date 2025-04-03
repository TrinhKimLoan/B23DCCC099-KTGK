import { Button, Table, Space } from 'antd';
import { useModel } from 'umi';
import ProductForm from './components/ProductForm';
import { useState } from 'react';

export default function ProductPage() {
  const { products, deleteProduct } = useModel('product');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Giá (VND)',
      dataIndex: 'price',
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
    },
    {
      title: 'Thao tác',
      render: (_, record: Product) => (
        <Space>
          <Button onClick={() => {
            setEditingProduct(record);
            setShowForm(true);
          }}>Sửa</Button>
          <Button danger onClick={() => deleteProduct(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <Button type="primary" onClick={() => setShowForm(true)}>
          Thêm sản phẩm
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
      />

      <ProductForm
        visible={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingProduct(undefined);
        }}
        initialValues={editingProduct}
      />
    </div>
  );
}