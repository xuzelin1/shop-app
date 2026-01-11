import AlipaySdk from 'alipay-sdk'
import AlipayFormData from 'alipay-sdk/lib/form'

class AlipayService {
  private alipaySdk: AlipaySdk

  constructor() {
    this.alipaySdk = new AlipaySdk({
      appId: process.env.ALIPAY_APP_ID!,
      privateKey: process.env.ALIPAY_PRIVATE_KEY!,
      alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY!,
      gateway: process.env.ALIPAY_GATEWAY || 'https://openapi.alipay.com/gateway.do',
      signType: 'RSA2',
      charset: 'utf-8',
      version: '1.0',
    })
  }

  /**
   * 创建支付订单（网页支付）
   */
  async createWebPayment(params: {
    orderNo: string
    totalAmount: number
    subject: string
    body?: string
  }) {
    const formData = new AlipayFormData()
    
    formData.setMethod('get')
    formData.addField('returnUrl', process.env.ALIPAY_RETURN_URL)
    formData.addField('notifyUrl', process.env.ALIPAY_NOTIFY_URL)
    formData.addField('bizContent', {
      out_trade_no: params.orderNo,
      product_code: 'FAST_INSTANT_TRADE_PAY',
      total_amount: params.totalAmount,
      subject: params.subject,
      body: params.body,
    })

    const result = await this.alipaySdk.exec(
      'alipay.trade.page.pay',
      {},
      { formData }
    )

    return result
  }

  /**
   * 创建支付订单（手机网站支付）
   */
  async createWapPayment(params: {
    orderNo: string
    totalAmount: number
    subject: string
    body?: string
  }) {
    const formData = new AlipayFormData()
    
    formData.setMethod('get')
    formData.addField('returnUrl', process.env.ALIPAY_RETURN_URL)
    formData.addField('notifyUrl', process.env.ALIPAY_NOTIFY_URL)
    formData.addField('bizContent', {
      out_trade_no: params.orderNo,
      product_code: 'QUICK_WAP_WAY',
      total_amount: params.totalAmount,
      subject: params.subject,
      body: params.body,
      quit_url: process.env.ALIPAY_RETURN_URL,
    })

    const result = await this.alipaySdk.exec(
      'alipay.trade.wap.pay',
      {},
      { formData }
    )

    return result
  }

  /**
   * 验证支付宝回调签名
   */
  checkNotifySign(postData: any): boolean {
    return this.alipaySdk.checkNotifySign(postData)
  }

  /**
   * 查询订单支付状态
   */
  async queryPayment(orderNo: string) {
    const result = await this.alipaySdk.exec('alipay.trade.query', {
      bizContent: {
        out_trade_no: orderNo,
      },
    })
    return result
  }

  /**
   * 退款
   */
  async refund(params: {
    orderNo: string
    refundAmount: number
    refundReason?: string
  }) {
    const result = await this.alipaySdk.exec('alipay.trade.refund', {
      bizContent: {
        out_trade_no: params.orderNo,
        refund_amount: params.refundAmount,
        refund_reason: params.refundReason,
      },
    })
    return result
  }

  /**
   * 关闭订单
   */
  async closeOrder(orderNo: string) {
    const result = await this.alipaySdk.exec('alipay.trade.close', {
      bizContent: {
        out_trade_no: orderNo,
      },
    })
    return result
  }
}

export default new AlipayService()

