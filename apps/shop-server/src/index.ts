import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import productRoutes from './routes/products'
import orderRoutes from './routes/orders'
import userRoutes from './routes/users'
import paymentRoutes from './routes/payment'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: '欢迎使用电商平台 API' })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/api/payment', paymentRoutes)

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: err.message || '服务器内部错误',
  })
})

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: '请求的资源不存在',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`)
})

export default app


