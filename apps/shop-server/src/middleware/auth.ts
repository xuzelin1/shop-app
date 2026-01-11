import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface AuthRequest extends Request {
  user?: {
    userId: string
    username: string
    role: string
  }
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        message: '未提供认证令牌',
      })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
      username: string
      role: string
    }

    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: '无效的认证令牌',
    })
  }
}

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: '权限不足',
    })
  }
  next()
}


