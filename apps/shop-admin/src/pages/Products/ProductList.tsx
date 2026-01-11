import { Table, Button, Space, Tag, Image, Modal, message } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'

interface Product {
  id: string
  name: string
  category: string
  brand: string
  model: string
  price: number
  originalPrice?: number
  stock: number
  status: 'active' | 'inactive'
  image?: string
  isFeatured?: boolean
}

export default function ProductList() {
  const navigate = useNavigate()

  const handleEdit = (id: string) => {
    navigate(`/products/edit/${id}`)
  }

  const handleDelete = (id: string, name: string) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除商品 "${name}" 吗？此操作不可恢复。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          // TODO: 调用删除API
          message.success('商品删除成功')
        } catch (error) {
          message.error('删除失败，请重试')
        }
      },
    })
  }

  const handleAdd = () => {
    navigate('/products/new')
  }

  const columns: ColumnsType<Product> = [
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image) => (
        <Image
          src={image || 'https://via.placeholder.com/60'}
          alt="商品图片"
          width={60}
          height={60}
          style={{ objectFit: 'cover', borderRadius: 8 }}
          preview={false}
        />
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (name, record) => (
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{name}</div>
          <div style={{ fontSize: 12, color: '#999' }}>
            {record.brand} {record.model}
          </div>
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (price, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#667eea' }}>
            ¥{price.toLocaleString()}
          </div>
          {record.originalPrice && (
            <div style={{ fontSize: 12, color: '#999', textDecoration: 'line-through' }}>
              ¥{record.originalPrice.toLocaleString()}
            </div>
          )}
        </div>
      ),
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 100,
      render: (stock) => (
        <Tag color={stock > 10 ? 'green' : stock > 0 ? 'orange' : 'red'}>
          {stock} 件
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status, record) => (
        <Space direction="vertical" size={4}>
          <Tag color={status === 'active' ? 'green' : 'red'}>
            {status === 'active' ? '已上架' : '已下架'}
          </Tag>
          {record.isFeatured && <Tag color="purple">推荐</Tag>}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id, record.name)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const data: Product[] = [
    {
      id: '1',
      name: '徕卡 M11 真皮半身皮套',
      category: '徕卡 M 系列',
      brand: 'Leica',
      model: 'M11',
      price: 1280,
      originalPrice: 1580,
      stock: 50,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1606933248010-ef7d959143b9?q=80&w=200',
      isFeatured: true,
    },
    {
      id: '2',
      name: '哈苏 X2D 100C 专业皮套',
      category: '哈苏 X 系列',
      brand: 'Hasselblad',
      model: 'X2D 100C',
      price: 1880,
      originalPrice: 2280,
      stock: 30,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1606933566189-68c5b61b5684?q=80&w=200',
      isFeatured: true,
    },
    {
      id: '3',
      name: '徕卡 Q3 轻量半身套',
      category: '徕卡 Q 系列',
      brand: 'Leica',
      model: 'Q3',
      price: 980,
      stock: 15,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?q=80&w=200',
      isFeatured: false,
    },
    {
      id: '4',
      name: '徕卡 M10-P 经典皮套',
      category: '徕卡 M 系列',
      brand: 'Leica',
      model: 'M10-P',
      price: 1180,
      stock: 5,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?q=80&w=200',
      isFeatured: false,
    },
    {
      id: '5',
      name: '哈苏 X1D II 50C 皮套',
      category: '哈苏 X 系列',
      brand: 'Hasselblad',
      model: 'X1D II 50C',
      price: 1680,
      stock: 0,
      status: 'inactive',
      image: 'https://images.unsplash.com/photo-1606859511950-1076ccc67621?q=80&w=200',
      isFeatured: false,
    },
  ]

  return (
    <div>
      <div
        style={{
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>商品管理</h1>
          <p style={{ margin: '4px 0 0 0', color: '#999' }}>
            管理您的相机皮套商品
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleAdd}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            height: 44,
            paddingLeft: 24,
            paddingRight: 24,
            fontSize: 15,
          }}
        >
          添加商品
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 件商品`,
        }}
        scroll={{ x: 1200 }}
        style={{
          background: '#fff',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      />
    </div>
  )
}


