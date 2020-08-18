export const resource = {
  name: 'Tài nguyên',
  permissions: [{ name: 'Xem', value: 'view:any' }],
}

export const user = {
  name: 'Người dùng',
  permissions: [
    { name: 'Tạo mới', value: 'create' },
    { name: 'Chỉnh sửa tất cả', value: 'update:any' },
    { name: 'Chỉnh sửa thông tin cá nhân', value: 'update:personal' },
    { name: 'Xem tất cả', value: 'view:any' },
    { name: 'Xem thông tin cá nhân', value: 'view:personal' },
    { name: 'Xóa', value: 'delete' },
  ],
}

export const role = {
  name: 'Vai trò',
  permissions: [
    { name: 'Tạo mới', value: 'create' },
    { name: 'Chỉnh sửa - Phân quyền', value: 'update' },
    { name: 'Xóa', value: 'delete' },
  ],
}
