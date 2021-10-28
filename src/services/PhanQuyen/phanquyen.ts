import axios from '@/utils/axios';
import { ip3 } from '@/utils/ip';

/**
 * thanhpq 27/10/2021
 * get danh sách tất cả nhóm vai trò
 * @param payload condition theo vai trò, vd: can_bo, giang_vien
 * @returns danh sách nhóm vai trò
 */

export async function getAllNhomVaiTro(payload: { condition?: any }) {
  return axios.get(`${ip3}/phan-quyen/nhom-vai-tro/all`, { params: payload });
}

/**
 * thanhpq 27/10/2021
 * thêm 1 nhóm vai trò mới
 * @param payload data nhóm vai trò muốn thêm
 * @returns nhóm vai trò mới
 */

export async function postNhomVaiTro(payload: { _id: string; vaiTro: string }) {
  return axios.post(`${ip3}/phan-quyen/nhom-vai-tro`, payload);
}

/**
 * thanhpq 27/10/2021
 * xóa 1 nhóm vai trò
 * @param payload id nhóm vai trò muốn xóa
 * @returns nhóm vai trò mới
 */

export async function deleteNhomVaiTro(payload: { idNhomVaiTro: string }) {
  return axios.delete(`${ip3}/phan-quyen/nhom-vai-tro/${payload.idNhomVaiTro}`);
}

/**
 * thanhpq 27/10/2021
 * get danh sách tất cả chức năng có thể phân quyền
 * @param payload condition theo vai trò, vd: can_bo, giang_vien
 * @returns danh sách chức năng
 */

export async function getAllChucNang(payload: { condition?: any }) {
  return axios.get(`${ip3}/phan-quyen/chuc-nang/all`, { params: payload });
}

/**
 * thanhpq 27/10/2021
 * get danh sách tất cả loại chức năng có thể phân quyền (mỗi chức năng thuộc một loại chức năng)
 * @returns danh sách loại chức năng
 */

export async function getAllLoaiChucNang() {
  return axios.get(`${ip3}/phan-quyen/loai-chuc-nang/all`);
}

/**
 * thanhpq 28/10/2021
 * phân quyền cho 1 nhóm chức năng
 *
 */
export async function putPhanQuyenChucNangNhomVaiTro(
  payload: { idNhomVaiTro: string; idChucNang: string }[],
) {
  return axios.put(`${ip3}/phan-quyen/nhom-vai-tro-chuc-nang/bulk`, payload);
}
