import { useModel } from 'umi';
import OrderTable from './components/OrderTable';
import OrderForm from './components/OrderForm';

export default function OrderPage() {
  const { orders, searchTerm, statusFilter } = useModel('order');
  
  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <OrderForm />
      </div>
      
      <OrderTable 
        data={orders}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />
    </div>
  );
}