import { Table, Tag, Space, Button } from 'antd'
import { EditOutlined, LockOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

interface User {
  id: string
  username: string
  email: string
  phone: string
  status: 'active' | 'disabled'
  createTime: string
}

export default function UserList() {
  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '正常' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" danger icon={<LockOutlined />}>
            禁用
          </Button>
        </Space>
      ),
    },
  ]

  const data: User[] = [
    {
      id: '1',
      username: '张三',
      email: 'zhangsan@example.com',
      phone: '13800138000',
      status: 'active',
      createTime: '2024-01-01 10:00:00',
    },
    {
      id: '2',
      username: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      status: 'active',
      createTime: '2024-01-02 15:30:00',
    },
  ]

  return (
    <div>
      <h1>用户管理</h1>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  )
}


