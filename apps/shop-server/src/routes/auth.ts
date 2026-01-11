import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// 模拟用户数据
const users = [
  {
    id: '1',
    username: 'admin',
    password: '$2a$10$XYZ...', // 实际应该是加密后的密码
    email: 'admin@example.com',
    role: 'admin',
  },
]

// 登录
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: '请提供用户名和密码',
      })
    }

    // TODO: 从数据库查询用户
    // 这里使用模拟登录
    const token = jwt.sign(
      { userId: '1', username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: '1',
          username,
          role: 'admin',
        },
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '登录失败',
    })
  }
})

// 注册
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: '请提供完整的注册信息',
      })
    }

    // TODO: 保存到数据库
    const hashedPassword = await bcrypt.hash(password, 10)

    res.json({
      success: true,
      message: '注册成功',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '注册失败',
    })
  }
})

// 获取当前用户信息
router.get('/me', async (req: Request, res: Response) => {
  try {
    // TODO: 从 token 中解析用户信息
    res.json({
      success: true,
      data: {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取用户信息失败',
    })
  }
})

export default router


