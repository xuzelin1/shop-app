// 订单状态常量
export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  SHIPPED: 'shipped',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const

export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.PENDING]: '待付款',
  [ORDER_STATUS.PAID]: '已付款',
  [ORDER_STATUS.SHIPPED]: '已发货',
  [ORDER_STATUS.COMPLETED]: '已完成',
  [ORDER_STATUS.CANCELLED]: '已取消',
  [ORDER_STATUS.REFUNDED]: '已退款',
}

// 商品状态常量
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SOLDOUT: 'soldout',
} as const

export const PRODUCT_STATUS_TEXT = {
  [PRODUCT_STATUS.ACTIVE]: '上架',
  [PRODUCT_STATUS.INACTIVE]: '下架',
  [PRODUCT_STATUS.SOLDOUT]: '售罄',
}

// 用户状态常量
export const USER_STATUS = {
  ACTIVE: 'active',
  DISABLED: 'disabled',
} as const

export const USER_STATUS_TEXT = {
  [USER_STATUS.ACTIVE]: '正常',
  [USER_STATUS.DISABLED]: '禁用',
}

// 用户角色常量
export const USER_ROLE = {
  USER: 'user',
  ADMIN: 'admin',
} as const

export const USER_ROLE_TEXT = {
  [USER_ROLE.USER]: '普通用户',
  [USER_ROLE.ADMIN]: '管理员',
}

// 支付方式常量
export const PAYMENT_METHOD = {
  ALIPAY: 'alipay',
  WECHAT: 'wechat',
  CARD: 'card',
} as const

export const PAYMENT_METHOD_TEXT = {
  [PAYMENT_METHOD.ALIPAY]: '支付宝',
  [PAYMENT_METHOD.WECHAT]: '微信支付',
  [PAYMENT_METHOD.CARD]: '银行卡',
}

// 分页默认值
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
}

// API 响应码
export const API_CODE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}


