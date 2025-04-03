import { Select, InputNumber, Button, Space, Table, Typography } from 'antd';
import { useModel } from 'umi';
import type { Product, OrderItem } from '@/services/order/order.types';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Text } = Typography;

interface ProductSelectorProps {
  value?: OrderItem[];
  onChange?: (items: OrderItem[]) => void;
}

export default function ProductSelector({ value = [], onChange }: ProductSelectorProps) {
  const { products } = useModel('product');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Danh sách sản phẩm chưa được chọn
  const availableProducts = products.filter(
    p => !value.some(item => item.productId === p.id) && p.stock > 0
  );

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productId',
      render: (id: string) => {
        const product = products.find(p => p.id === id);
        return product ? `${product.name} (${product.price.toLocaleString()} VND)` : 'N/A';
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (value: number, record: OrderItem) => (
        <InputNumber
          min={1}
          max={products.find(p => p.id === record.productId)?.stock}
          value={value}
          onChange={(newValue) => handleQuantityChange(record.productId, newValue)}
        />
      )
    },
    {
      title: 'Thao tác',
      render: (_, record: OrderItem) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(record.productId)}
        />
      )
    }
  ];

  const handleAdd = () => {
    if (!selectedProductId || quantity < 1) return;
    
    const newItems = [...value, { 
      productId: selectedProductId, 
      quantity: quantity 
    }];
    
    onChange?.(newItems);
    setSelectedProductId('');
    setQuantity(1);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const newItems = value.map(item => 
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    onChange?.(newItems);
  };

  const handleRemove = (productId: string) => {
    const newItems = value.filter(item => item.productId !== productId);
    onChange?.(newItems);
  };

  return (
    <div className="product-selector">
      <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
        <Select
          placeholder="Chọn sản phẩm"
          value={selectedProductId}
          onChange={setSelectedProductId}
          options={availableProducts.map(p => ({
            label: `${p.name} (Tồn kho: ${p.stock})`,
            value: p.id,
            disabled: p.stock <= 0
          }))}
          style={{ width: '70%' }}
        />
        
        <InputNumber
          placeholder="Số lượng"
          min={1}
          max={products.find(p => p.id === selectedProductId)?.stock}
          value={quantity}
          onChange={setQuantity}
          style={{ width: '20%' }}
        />
        
        <Button 
          type="primary" 
          onClick={handleAdd}
          disabled={!selectedProductId}
          style={{ width: '10%' }}
        >
          Thêm
        </Button>
      </Space.Compact>

      <Table
        size="small"
        columns={columns}
        dataSource={value}
        rowKey="productId"
        pagination={false}
        bordered
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={2}>
              <Text strong>Tổng cộng:</Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={1}>
              <Text strong>
                {value.reduce((total, item) => {
                  const product = products.find(p => p.id === item.productId);
                  return total + (product?.price || 0) * item.quantity;
                }, 0).toLocaleString()} VND
              </Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </div>
  );
}