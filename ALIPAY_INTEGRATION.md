# 支付宝支付对接完整方案

## 📋 准备工作

### 1. 注册支付宝开放平台账号

1. 访问 [支付宝开放平台](https://open.alipay.com/)
2. 使用支付宝账号登录
3. 进入"开发者中心"

### 2. 创建应用

#### 网页&移动应用
1. 点击"网页&移动应用" → "创建应用"
2. 填写应用信息：
   - 应用名称：如"电商平台"
   - 应用类型：网页应用
   - 应用平台：支付宝小程序/网页应用

3. 配置应用：
   - 应用网关：`https://yourdomain.com/api/alipay/notify`
   - 授权回调地址：`https://yourdomain.com/api/alipay/return`

### 3. 获取密钥

#### 生成应用公私钥（推荐使用RSA2）

```bash
# 使用支付宝密钥生成工具
# 下载地址：https://opendocs.alipay.com/common/02kipl

# 或使用 OpenSSL 生成
openssl genrsa -out app_private_key.pem 2048
openssl rsa -in app_private_key.pem -pubout -out app_public_key.pem
```

#### 配置密钥
1. 在开放平台上传应用公钥
2. 获取支付宝公钥
3. 保存到服务器环境变量

### 4. 签约产品

1. 在应用详情页签约"手机网站支付"或"电脑网站支付"
2. 完成开发者认证和商户入驻
3. 等待审核通过（通常1-3个工作日）

## 🔧 后端实现（Node.js + Express）

### 1. 安装依赖

```bash
cd apps/shop-server
pnpm add alipay-sdk
```

### 2. 环境配置

在 `apps/shop-server/.env` 中添加：

```env
# 支付宝配置
ALIPAY_APP_ID=your_app_id
ALIPAY_PRIVATE_KEY=your_private_key
ALIPAY_PUBLIC_KEY=alipay_public_key
ALIPAY_GATEWAY=https://openapi.alipay.com/gateway.do
# 沙箱环境：https://openapi.alipaydev.com/gateway.do
ALIPAY_NOTIFY_URL=https://yourdomain.com/api/alipay/notify
ALIPAY_RETURN_URL=https://yourdomain.com/api/alipay/return
```

### 3. 创建支付宝服务

创建 `apps/shop-server/src/services/alipay.service.ts`：

```typescript
import AlipaySdk from 'alipay-sdk'
import AlipayFormData from 'alipay-sdk/lib/form'

class AlipayService {
  private alipaySdk: AlipaySdk

  constructor() {
    this.alipaySdk = new AlipaySdk({
      appId: process.env.ALIPAY_APP_ID!,
      privateKey: process.env.ALIPAY_PRIVATE_KEY!,
      alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY!,
      gateway: process.env.ALIPAY_GATEWAY!,
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
```

### 4. 创建支付路由

创建 `apps/shop-server/src/routes/payment.ts`：

```typescript
import { Router, Request, Response } from 'express'
import alipayService from '../services/alipay.service'
import { authMiddleware } from '../middleware/auth'

const router = Router()

/**
 * 创建支付订单
 */
router.post('/create', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { orderNo, totalAmount, subject, body, paymentType = 'web' } = req.body

    if (!orderNo || !totalAmount || !subject) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数',
      })
    }

    // 根据支付类型选择不同的支付方式
    let payUrl: string
    
    if (paymentType === 'wap') {
      // 手机网站支付
      payUrl = await alipayService.createWapPayment({
        orderNo,
        totalAmount,
        subject,
        body,
      })
    } else {
      // 电脑网站支付
      payUrl = await alipayService.createWebPayment({
        orderNo,
        totalAmount,
        subject,
        body,
      })
    }

    res.json({
      success: true,
      data: {
        payUrl,
      },
    })
  } catch (error) {
    console.error('创建支付订单失败:', error)
    res.status(500).json({
      success: false,
      message: '创建支付订单失败',
    })
  }
})

/**
 * 支付宝异步通知（服务器回调）
 */
router.post('/alipay/notify', async (req: Request, res: Response) => {
  try {
    console.log('收到支付宝异步通知:', req.body)

    // 验证签名
    const isValid = alipayService.checkNotifySign(req.body)
    
    if (!isValid) {
      console.error('支付宝通知签名验证失败')
      return res.send('fail')
    }

    const {
      out_trade_no,  // 商户订单号
      trade_no,       // 支付宝交易号
      trade_status,   // 交易状态
      total_amount,   // 订单金额
    } = req.body

    // 处理不同的交易状态
    if (trade_status === 'TRADE_SUCCESS' || trade_status === 'TRADE_FINISHED') {
      // TODO: 更新数据库订单状态为已支付
      console.log(`订单 ${out_trade_no} 支付成功，支付宝交易号：${trade_no}`)
      
      // 示例：更新订单
      // await Order.updateOne(
      //   { orderNo: out_trade_no },
      //   { 
      //     status: 'paid',
      //     tradeNo: trade_no,
      //     paidAmount: total_amount,
      //     paidTime: new Date(),
      //   }
      // )
    }

    // 返回 success 告诉支付宝已收到通知
    res.send('success')
  } catch (error) {
    console.error('处理支付宝通知失败:', error)
    res.send('fail')
  }
})

/**
 * 支付宝同步返回（前端回调）
 */
router.get('/alipay/return', async (req: Request, res: Response) => {
  try {
    console.log('收到支付宝同步返回:', req.query)

    // 验证签名
    const isValid = alipayService.checkNotifySign(req.query)
    
    if (!isValid) {
      return res.redirect('/checkout/fail')
    }

    const { out_trade_no } = req.query

    // 重定向到订单成功页面
    res.redirect(`/checkout/success?orderNo=${out_trade_no}`)
  } catch (error) {
    console.error('处理支付宝返回失败:', error)
    res.redirect('/checkout/fail')
  }
})

/**
 * 查询支付状态
 */
router.get('/query/:orderNo', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { orderNo } = req.params
    const result = await alipayService.queryPayment(orderNo)

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('查询支付状态失败:', error)
    res.status(500).json({
      success: false,
      message: '查询支付状态失败',
    })
  }
})

/**
 * 申请退款
 */
router.post('/refund', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { orderNo, refundAmount, refundReason } = req.body

    const result = await alipayService.refund({
      orderNo,
      refundAmount,
      refundReason,
    })

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('申请退款失败:', error)
    res.status(500).json({
      success: false,
      message: '申请退款失败',
    })
  }
})

export default router
```

### 5. 在主应用中注册路由

更新 `apps/shop-server/src/index.ts`：

```typescript
import paymentRoutes from './routes/payment'

// ... 其他代码

app.use('/api/payment', paymentRoutes)
```

## 💻 前端实现

### 1. 创建支付API服务

创建 `apps/shop-client/src/lib/payment.ts`：

```typescript
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
```

### 2. 更新结算页面

更新 `apps/shop-client/src/app/checkout/page.tsx` 中的提交订单逻辑：

```typescript
import { paymentApi } from '@/lib/payment'

// ... 其他代码

const handlePlaceOrder = async () => {
  setIsProcessing(true)
  
  try {
    // 1. 生成订单号
    const orderNo = 'ORD' + Date.now()
    
    // 2. 保存订单信息到后端（可选）
    // await orderApi.create({ orderNo, items, shippingInfo, ... })
    
    // 3. 如果选择支付宝支付，创建支付订单
    if (paymentMethod === 'alipay') {
      const response = await paymentApi.createPayment({
        orderNo,
        totalAmount: finalTotal,
        subject: `电商平台订单-${orderNo}`,
        body: `购买商品${totalItems}件`,
        paymentType: isMobile() ? 'wap' : 'web',
      })
      
      // 4. 跳转到支付宝支付页面
      if (response.success && response.data.payUrl) {
        // 在当前页面打开支付页面
        window.location.href = response.data.payUrl
      }
    } else {
      // 其他支付方式的处理
      clearCart()
      router.push(`/checkout/success?orderNo=${orderNo}&total=${finalTotal}`)
    }
  } catch (error) {
    console.error('提交订单失败:', error)
    alert('提交订单失败，请重试')
  } finally {
    setIsProcessing(false)
  }
}

// 检测是否为移动设备
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}
```

### 3. 创建支付失败页面

创建 `apps/shop-client/src/app/checkout/fail/page.tsx`：

```typescript
'use client'

import Link from 'next/link'
import { XCircle, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CheckoutFailPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>

          <h1 className="text-4xl font-bold mb-4">支付失败</h1>
          <p className="text-xl text-gray-600 mb-8">
            订单支付未完成，请重试或联系客服
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cart"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition group"
            >
              返回购物车
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-black rounded-full font-semibold hover:bg-gray-50 transition"
            >
              返回首页
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
```

## 🔄 支付流程图

```
用户提交订单
    ↓
前端调用后端创建支付API
    ↓
后端调用支付宝SDK生成支付URL
    ↓
返回支付URL给前端
    ↓
前端跳转到支付宝支付页面
    ↓
用户在支付宝完成支付
    ↓
支付宝异步通知后端（notify_url）
    ↓
后端验证签名并更新订单状态
    ↓
支付宝同步返回前端（return_url）
    ↓
前端显示支付成功页面
```

## 📱 测试流程

### 使用沙箱环境测试

1. 登录 [支付宝开放平台](https://open.alipay.com/)
2. 进入"开发者中心" → "研发服务" → "沙箱环境"
3. 获取沙箱账号信息
4. 下载"支付宝钱包沙箱版"APP
5. 使用沙箱买家账号登录测试

### 测试步骤

```bash
# 1. 配置沙箱环境变量
ALIPAY_GATEWAY=https://openapi.alipaydev.com/gateway.do

# 2. 启动后端
cd apps/shop-server
pnpm dev

# 3. 启动前端
cd apps/shop-client
pnpm dev

# 4. 测试支付流程
- 添加商品到购物车
- 进入结算页面
- 填写收货信息
- 选择支付宝支付
- 提交订单
- 在支付宝沙箱页面完成支付
- 验证回调和订单状态更新
```

## ⚠️ 注意事项

### 1. 安全性
- ✅ 私钥保存在服务器，不要泄露
- ✅ 验证所有回调签名
- ✅ 使用HTTPS加密传输
- ✅ 订单金额验证

### 2. 回调处理
- ✅ 异步通知要返回"success"
- ✅ 处理幂等性（防止重复通知）
- ✅ 记录所有通知日志
- ✅ 同步返回仅用于页面跳转

### 3. 订单状态
- ✅ TRADE_SUCCESS: 支付成功
- ✅ TRADE_FINISHED: 交易完成
- ✅ TRADE_CLOSED: 交易关闭
- ✅ WAIT_BUYER_PAY: 等待买家付款

### 4. 金额处理
- ✅ 使用元为单位（小数点后两位）
- ✅ 避免浮点数精度问题
- ✅ 前后端金额验证

## 📚 参考文档

- [支付宝开放平台文档](https://opendocs.alipay.com/)
- [网页支付产品介绍](https://opendocs.alipay.com/open/270)
- [Node.js SDK](https://github.com/alipay/alipay-sdk-nodejs)
- [签名验证说明](https://opendocs.alipay.com/common/02mse3)

---

✨ 完整的支付宝支付对接方案已提供！按照步骤配置即可实现支付功能。

