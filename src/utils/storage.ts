// File: src/utils/storage.ts
export const initializeData = () => {
    const customers = JSON.parse(localStorage.getItem('customers') || 'null');
    const products = JSON.parse(localStorage.getItem('products') || 'null');
  
    if (!customers) {
      const sampleCustomers = [
        { id: 'C001', name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0901234567' },
        { id: 'C002', name: 'Trần Thị B', email: 'b@example.com', phone: '0912345678' },
        { id: 'C003', name: 'Lê Văn C', email: 'c@example.com', phone: '0923456789' },
        { id: 'C004', name: 'Phạm Thị D', email: 'd@example.com', phone: '0934567890' },
        { id: 'C005', name: 'Hoàng Văn E', email: 'e@example.com', phone: '0945678901' },
      ];
      localStorage.setItem('customers', JSON.stringify(sampleCustomers));
    }
  
    if (!products) {
      const sampleProducts = [
        { id: 'P001', name: 'Laptop Dell', price: 15000000 },
        { id: 'P002', name: 'Điện thoại iPhone', price: 22000000 },
        { id: 'P003', name: 'Tai nghe Sony', price: 2000000 },
        { id: 'P004', name: 'Bàn phím cơ', price: 1800000 },
        { id: 'P005', name: 'Chuột không dây', price: 800000 },
        { id: 'P006', name: 'Màn hình LG', price: 5000000 },
        { id: 'P007', name: 'SSD 1TB', price: 3500000 },
      ];
      localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
  };
  