import type { Order } from './order.types';

export const validation = {
  order: {
    // Nếu cần dùng, nhưng trong form thêm đơn hàng, id được tự động tạo nên không cần nhập từ form
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
    customerId: [{ required: true, message: 'Vui lòng chọn khách hàng' }],
  },
  product: {
    name: [{ required: true, message: 'Vui lòng nhập tên sản phẩm' }],
    price: [
      { required: true, message: 'Vui lòng nhập giá' },
      { type: 'number', message: 'Giá phải là số' }
    ],
  },
  customer: {
    name: [{ required: true, message: 'Vui lòng nhập tên khách hàng' }],
    phone: [
      { required: true, message: 'Vui lòng nhập số điện thoại' },
      { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\\b/, message: 'Số điện thoại không hợp lệ' }
    ],
    email: [
      { required: true, message: 'Vui lòng nhập email' },
      { type: 'email', message: 'Email không hợp lệ' }
    ]
  }
};
