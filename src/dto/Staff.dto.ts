export interface StaffDTO {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  roleId: number
  role?: string
  status: 'pending' | 'active' | 'inactive'
}
