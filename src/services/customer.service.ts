import { Customer } from '@/models/customer.model';

export const getCustomers = (): Customer[] => {
  return JSON.parse(localStorage.getItem('customers') || '[]');
};
