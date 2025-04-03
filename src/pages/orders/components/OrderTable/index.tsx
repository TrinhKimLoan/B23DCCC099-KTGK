import { Table } from 'antd';
import useColumns from './columns';
import { useModel } from 'umi';

export default function OrderTable() {
  const columns = useColumns();
  const { orders, searchTerm, statusFilter } = useModel('order');
  
  return (
    <Table
      size="middle"
      rowKey="id"
      columns={columns}
      dataSource={orders}
      locale={{
        emptyText: searchTerm || statusFilter 
          ? 'Không tìm thấy đơn hàng phù hợp' 
          : 'Chưa có đơn hàng nào'
      }}
      scroll={{ x: 1000 }}
    />
  );
}