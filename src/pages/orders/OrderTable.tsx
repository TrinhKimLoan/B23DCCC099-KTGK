import {useState} from 'react';
import { Table, Modal, message } from 'antd';
import { useModel } from 'umi';
import type { Order } from '@/services/order.types';
import { OrderStatus } from '@/services/order.types';
import { getCustomers } from '@/services/customer.service';
import { getProducts } from '@/services/product.service';
import StatusTag from './StatusTag';
import SearchBar from './SearchBar'

const OrderTable = () => {
  const { filteredOrders, cancelOrder } = useModel('order');
  const customers = getCustomers();
  const products = getProducts();

  // Tính danh sách tên khách hàng duy nhất từ đơn hàng hiện có
  const customerNames = Array.from(
    new Set(filteredOrders.map(order => {
      const customer = customers.find(c => c.id === order.customerId);
      return customer ? customer.name : order.customerId;
    }))
  );

  // Tạo bộ lọc cho cột khách hàng
  const customerFilters = customerNames.map(name => ({ text: name, value: name }));

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : customerId;
  };

  const renderProducts = (items: any) => {
    return items
      .map((item: any) => {
        const prod = products.find(p => p.id === item.productId);
        return prod ? `${prod.name} x ${item.quantity}` : item.productId;
      })
      .join(', ');
  };

  const handleCancel = (order: Order) => {
    if (order.status !== OrderStatus.PENDING) {
      message.error("Chỉ cho phép hủy đơn hàng ở trạng thái 'Chờ xác nhận'");
      return;
    }
    Modal.confirm({
      title: 'Xác nhận hủy đơn hàng?',
      onOk: () => {
        cancelOrder(order.id);
        message.success('Đơn hàng đã bị hủy');
      }
    });
  };
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredData = filteredOrders.filter(order =>
    order.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    getCustomerName(order.customerId).toLowerCase().includes(searchKeyword.toLowerCase())
);


  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (id: string) => getCustomerName(id),
      filters: customerFilters,
      onFilter: (value: string, record: Order) => {
        const name = getCustomerName(record.customerId);
        return name === value;
      },
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => total.toLocaleString() + ' VND',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status: OrderStatus) => <StatusTag status={status} />,
        filters: [
          { text: 'Chờ xử lý', value: OrderStatus.PENDING },
          { text: 'Hoàn thành', value: OrderStatus.COMPLETED },
          { text: 'Đã hủy', value: OrderStatus.CANCELLED },
        ],
        onFilter: (value: string, record: Order) => record.status === value,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'items',
      key: 'items',
      render: renderProducts,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Order) => (
        record.status === OrderStatus.PENDING && (
          <a onClick={() => handleCancel(record)}>Hủy đơn</a>
        )
      ),
    },
  ];

  return (
    <div>
        <SearchBar placeholder="Tìm kiếm đơn hàng..." onSearch={setSearchKeyword} />
        <Table dataSource={filteredData} columns={columns} rowKey="id" />
    </div>
  ); 
};

export default OrderTable;
