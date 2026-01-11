import { Table, Tag, Space, Button } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

interface Order {
  id: string
  orderNo: string
  user: string
  amount: number
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  createTime: string
}

export default function OrderList() {
  const statusMap = {
    pending: { text: '待付款', color: 'default' },
    paid: { text: '已付款', color: 'blue' },
    shipped: { text: '已发货', color: 'orange' },
    completed: { text: '已完成', color: 'green' },
    cancelled: { text: '已取消', color: 'red' },
  }

  const columns: ColumnsType<Order> = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount.toFixed(2)}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<EyeOutlined />}>
            查看详情
          </Button>
        </Space>
      ),
    },
  ]

  const data: Order[] = [
    {
      id: '1',
      orderNo: 'ORD202401090001',
      user: '张三',
      amount: 7999,
      status: 'paid',
      createTime: '2024-01-09 10:30:00',
    },
    {
      id: '2',
      orderNo: 'ORD202401090002',
      user: '李四',
      amount: 5999,
      status: 'shipped',
      createTime: '2024-01-09 11:20:00',
    },
  ]

  return (
    <div>
      <h1>订单管理</h1>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  )
}


