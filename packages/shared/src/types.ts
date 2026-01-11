// 用户相关类型
export interface User {
  id: string
  username: string
  email: string
  phone?: string
  avatar?: string
  role: 'user' | 'admin'
  status: 'active' | 'disabled'
  createTime: string
  updateTime?: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterRequest {
  username: string
  password: string
  email: string
  phone?: string
}

// 商品相关类型
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  categoryId?: string
  stock: number
  sales?: number
  images: string[]
  thumbnail?: string
  status: 'active' | 'inactive' | 'soldout'
  attributes?: Record<string, any>
  createTime: string
  updateTime?: string
}

export interface Category {
  id: string
  name: string
  description?: string
  parentId?: string
  icon?: string
  sort: number
  status: 'active' | 'inactive'
}

// 订单相关类型
export interface OrderItem {
  productId: string
  productName: string
  productImage?: string
  quantity: number
  price: number
  subtotal: number
}

export interface Order {
  id: string
  orderNo: string
  userId: string
  userName?: string
  items: OrderItem[]
  totalAmount: number
  discountAmount?: number
  finalAmount: number
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled' | 'refunded'
  paymentMethod?: 'alipay' | 'wechat' | 'card'
  shippingAddress?: Address
  remark?: string
  createTime: string
  updateTime?: string
  paidTime?: string
  shippedTime?: string
  completedTime?: string
}

export interface Address {
  id?: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault?: boolean
}

// 购物车类型
export interface CartItem {
  id: string
  productId: string
  productName: string
  productImage?: string
  price: number
  quantity: number
  selected?: boolean
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  code?: number
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginationResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages?: number
}

// 统计数据类型
export interface Statistics {
  todayOrders: number
  totalUsers: number
  todaySales: number
  growthRate: number
}


