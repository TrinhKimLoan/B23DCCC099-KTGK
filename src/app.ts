import { initializeData } from '@/utils/storage';

export async function getInitialState() {
  initializeData(); // Chạy khi ứng dụng khởi động
  return {};
}

