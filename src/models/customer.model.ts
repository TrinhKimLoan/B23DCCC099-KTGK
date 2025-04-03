import { useState, useEffect } from 'react';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const CUSTOMERS_KEY = 'customers';

export default function useCustomerModel() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(CUSTOMERS_KEY);
    setCustomers(saved ? JSON.parse(saved) : []);
  }, []);

  const save = (newCustomers: Customer[]) => {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(newCustomers));
    setCustomers(newCustomers);
  };

  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer = { ...customer, id: `CUST-${Date.now()}` };
    save([...customers, newCustomer]);
  };

  const updateCustomer = (id: string, newData: Partial<Customer>) => {
    const updated = customers.map(c => (c.id === id ? { ...c, ...newData } : c));
    save(updated);
  };

  return { customers, addCustomer, updateCustomer };
}
