import React, { useState } from 'react';
import { Table, Input } from 'antd';
import { getProducts } from '@/services/product.service';
import { Product } from '@/models/product.model';

const ProductList = () => {
  const [products] = useState<Product[]>(getProducts());
  const [search, setSearch] = useState<string>('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Input placeholder="Tìm sản phẩm..." onChange={e => setSearch(e.target.value)} />
      <Table dataSource={filteredProducts} columns={[
        { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
        { title: 'Giá', dataIndex: 'price', key: 'price' },
        { title: 'Số lượng tồn kho', dataIndex: 'stock', key: 'stock' },
      ]}/>
    </>
  );
};

export default ProductList;
