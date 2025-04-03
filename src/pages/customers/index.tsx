import { useModel } from 'umi';
import CustomerForm from '../orders/components/CustomerForm';

export default function CustomerPage() {
  const { customers } = useModel('customer');
  
  return (
    <div>
      <CustomerForm />
      <Table dataSource={customers} />
    </div>
  );
}