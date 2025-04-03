import { useModel } from 'umi';
import ProductForm from '../orders/components/ProductForm';

export default function CustomerPage() {
  const { products } = useModel('product');
  
  return (
    <div>
      <ProductForm />
      <Table dataSource={products} />
    </div>
  );
}