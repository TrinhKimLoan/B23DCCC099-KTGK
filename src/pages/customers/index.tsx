import React, { useState } from 'react';
import { Table, Input } from 'antd';
import { getCustomers } from '@/services/customer.service';
import { Customer } from '@/models/customer.model';

const CustomerList = () => {
  const [customers] = useState<Customer[]>(getCustomers());
  const [search, setSearch] = useState<string>('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Input placeholder="Tìm khách hàng..." onChange={e => setSearch(e.target.value)} />
      <Table dataSource={filteredCustomers} columns={[
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
      ]}/>
    </>
  );
};

export default CustomerList;
