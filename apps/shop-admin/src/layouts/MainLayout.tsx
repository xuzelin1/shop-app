import { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Badge, Input } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  SearchOutlined,
  SettingOutlined,
  ProjectOutlined,
  BarChartOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { useAuthStore } from '../store/auth'

const { Header, Sider, Content } = Layout

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuthStore((state) => state.logout)

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: '商品管理',
    },
    {
      key: '/orders',
      icon: <ShoppingCartOutlined />,
      label: '订单管理',
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: '用户管理',
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
    },
    {
      key: '/projects',
      icon: <ProjectOutlined />,
      label: 'Projects',
    },
  ]

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        logout()
        navigate('/login')
      },
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            paddingLeft: collapsed ? 0 : 24,
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              flexShrink: 0,
            }}
          >
            S
          </div>
          {!collapsed && (
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1f2937' }}>
              Shop Admin
            </div>
          )}
        </div>

        {!collapsed && (
          <div style={{ padding: '0 16px 16px' }}>
            <Input
              placeholder="Start searching here"
              prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
              style={{
                borderRadius: 12,
                background: '#f9fafb',
                border: 'none',
                height: 40,
                fontSize: 14,
              }}
              styles={{
                input: {
                  background: 'transparent',
                },
              }}
            />
          </div>
        )}

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ border: 'none', marginTop: 8 }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: '0 32px',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
            position: 'sticky',
            top: 0,
            zIndex: 99,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar
              size={48}
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              style={{ border: '2px solid #e5e7eb' }}
            />
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#1f2937', lineHeight: 1.3 }}>
                Hey, Markus
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: '#9ca3af', lineHeight: 1.3 }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Badge count={2} style={{ background: '#667eea' }}>
              <BellOutlined style={{ fontSize: 20, color: '#6b7280', cursor: 'pointer' }} />
            </Badge>
            <SettingOutlined style={{ fontSize: 20, color: '#6b7280', cursor: 'pointer' }} />
          </div>
        </Header>

        <Content
          style={{
            margin: '24px',
            padding: 0,
            minHeight: 'calc(100vh - 112px)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
