import apiClient from './api'

export const paymentApi = {
  /**
   * 创建支付订单
   */
  async createPayment(data: {
    orderNo: string
    totalAmount: number
    subject: string
    body?: string
    paymentType?: 'web' | 'wap'
  }) {
    return apiClient.post('/payment/create', data)
  },

  /**
   * 查询支付状态
   */
  async queryPayment(orderNo: string) {
    return apiClient.get(`/payment/query/${orderNo}`)
  },

  /**
   * 申请退款
   */
  async refund(data: {
    orderNo: string
    refundAmount: number
    refundReason?: string
  }) {
    return apiClient.post('/payment/refund', data)
  },
}

