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

