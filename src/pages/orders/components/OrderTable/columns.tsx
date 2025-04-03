import { ColumnType } from 'antd/es/table';
import { Order, OrderStatus } from '@/services/order/order.types';
import StatusTag from '../OrderActions/StatusTag';
import CancelButton from '../OrderActions/CancelButton';
import { useModel } from 'umi';
import { Input } from 'antd';

export default function useColumns(): ColumnType<Order>[] {
  const { setSearchTerm, setStatusFilter } = useModel('order');
  
  return [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
      filterDropdown: ({ confirm }) => (
        <Input.Search 
          allowClear
          onSearch={value => {
            setSearchTerm(value);
            confirm();
          }}
        />
      )
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      render: (date: Date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      render: (value: number) => `${value.toLocaleString()} VND`,
      sorter: (a, b) => a.total - b.total
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: OrderStatus) => <StatusTag status={status} />,
      filters: Object.values(OrderStatus).map(status => ({
        text: status,
        value: status
      })),
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Thao tác',
      render: (_, record) => <CancelButton order={record} />
    }
  ];
}