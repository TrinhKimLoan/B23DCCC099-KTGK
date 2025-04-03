import { Order } from './order/order.types';
export const validation = {
    order: {
      id: [
        { required: true, message: 'Vui lòng nhập mã đơn' },
        { validator: (_, value) => {
          const orders = JSON.parse(localStorage.getItem('orders') || '[]');
          if (orders.some((o: Order) => o.id === value)) {
            return Promise.reject('Mã đơn đã tồn tại');
          }
          return Promise.resolve();
        }}
      ],
      customerId: [{ required: true, message: 'Vui lòng chọn khách hàng' }]
    },
    product: {
      name: [{ required: true, message: 'Vui lòng nhập tên sản phẩm' }],
      price: [{ required: true, message: 'Vui lòng nhập giá' }]
    },
    customer: {
      name: [{ required: true, message: 'Vui lòng nhập tên khách hàng' }],
      phone: [
        { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ' }
      ]
    }
  };