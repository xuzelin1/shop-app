import { Card, Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      // TODO: 实际调用登录 API
      await login(values.username, values.password)
      message.success('登录成功')
      navigate('/')
    } catch (error) {
      message.error('登录失败，请检查用户名和密码')
    }
  }

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card 
        title={<div style={{ textAlign: 'center', fontSize: 24 }}>电商后台管理系统</div>}
        style={{ width: 400 }}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}


