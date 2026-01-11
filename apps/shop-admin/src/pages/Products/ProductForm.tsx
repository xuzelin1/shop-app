import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Card,
  Space,
  Upload,
  message,
  Switch,
  Row,
  Col,
  Divider,
  Tag,
} from 'antd'
import {
  ArrowLeftOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'

const { TextArea } = Input
const { Option } = Select

interface ProductFormValues {
  name: string
  slogan?: string
  price: number
  originalPrice?: number
  category: string
  brand: string
  model: string
  colors: string[]
  specs: string[]
  description: string
  features: Array<{
    title: string
    description: string
  }>
  dimensions?: {
    length: number
    width: number
    height: number
    weight: number
  }
  materials: string[]
  stock: number
  status: 'active' | 'inactive'
  images: string[]
  isFeatured?: boolean
  isNew?: boolean
}

export default function ProductForm() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const isEdit = Boolean(id)

  useEffect(() => {
    if (isEdit) {
      // TODO: 从后端加载商品数据
      // 这里使用模拟数据
      const mockData: ProductFormValues = {
        name: '徕卡 M11 真皮半身皮套',
        slogan: '经典设计，完美贴合',
        price: 1280,
        originalPrice: 1580,
        category: '徕卡 M 系列',
        brand: 'Leica',
        model: 'M11',
        colors: ['经典黑', '复古棕', '大地褐'],
        specs: [
          '意大利进口头层牛皮',
          '手工缝制，精密裁剪',
          '预留电池仓快速开口',
          '不影响三脚架使用',
        ],
        description: '专为徕卡 M11 设计的真皮半身皮套，采用意大利进口头层牛皮制作...',
        features: [
          {
            title: '顶级材质',
            description: '精选意大利头层牛皮，手感细腻，历久弥新',
          },
          {
            title: '完美贴合',
            description: '根据 M11 机身精确测量，完美贴合不松动',
          },
        ],
        dimensions: {
          length: 145,
          width: 85,
          height: 42,
          weight: 120,
        },
        materials: ['意大利头层牛皮', '日本YKK拉链', '德国进口缝线'],
        stock: 50,
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1606933248010-ef7d959143b9?q=80&w=800',
        ],
        isFeatured: true,
        isNew: false,
      }
      form.setFieldsValue(mockData)
    }
  }, [id, isEdit, form])

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      setLoading(true)
      console.log('表单数据:', values)
      
      // TODO: 调用后端API保存数据
      // if (isEdit) {
      //   await updateProduct(id, values)
      // } else {
      //   await createProduct(values)
      // }
      
      message.success(isEdit ? '商品更新成功！' : '商品创建成功！')
      navigate('/products')
    } catch (error) {
      message.error('操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/products')
  }

  // 品牌选项
  const brandOptions = [
    { label: 'Leica 徕卡', value: 'Leica' },
    { label: 'Hasselblad 哈苏', value: 'Hasselblad' },
  ]

  // 分类选项
  const categoryOptions = [
    { label: '徕卡 M 系列', value: '徕卡 M 系列' },
    { label: '徕卡 Q 系列', value: '徕卡 Q 系列' },
    { label: '徕卡 SL 系列', value: '徕卡 SL 系列' },
    { label: '哈苏 X 系列', value: '哈苏 X 系列' },
    { label: '哈苏中画幅', value: '哈苏中画幅' },
    { label: '相机配件', value: '相机配件' },
  ]

  // 常用颜色
  const colorOptions = [
    '经典黑',
    '复古棕',
    '大地褐',
    '深海蓝',
    '橄榄绿',
    '酒红色',
    '烟灰色',
    '卡其色',
  ]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          返回列表
        </Button>
      </div>

      <Card
        title={
          <div style={{ fontSize: 20, fontWeight: 600 }}>
            {isEdit ? '编辑商品' : '添加商品'}
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'active',
            stock: 0,
            isFeatured: false,
            isNew: false,
            colors: [],
            specs: [''],
            materials: [''],
            features: [{ title: '', description: '' }],
          }}
        >
          {/* 基本信息 */}
          <Divider orientation="left">基本信息</Divider>
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Form.Item
                label="商品名称"
                name="name"
                rules={[{ required: true, message: '请输入商品名称' }]}
              >
                <Input placeholder="如：徕卡 M11 真皮半身皮套" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="商品标语" name="slogan">
                <Input placeholder="如：经典设计，完美贴合" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="品牌"
                name="brand"
                rules={[{ required: true, message: '请选择品牌' }]}
              >
                <Select placeholder="选择品牌" size="large">
                  {brandOptions.map((brand) => (
                    <Option key={brand.value} value={brand.value}>
                      {brand.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="型号"
                name="model"
                rules={[{ required: true, message: '请输入型号' }]}
              >
                <Input placeholder="如：M11, Q3, X2D" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="分类"
                name="category"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select placeholder="选择分类" size="large">
                  {categoryOptions.map((cat) => (
                    <Option key={cat.value} value={cat.value}>
                      {cat.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="库存数量"
                name="stock"
                rules={[{ required: true, message: '请输入库存数量' }]}
              >
                <InputNumber
                  placeholder="库存"
                  min={0}
                  style={{ width: '100%' }}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* 价格信息 */}
          <Divider orientation="left">价格信息</Divider>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="售价（¥）"
                name="price"
                rules={[{ required: true, message: '请输入售价' }]}
              >
                <InputNumber
                  placeholder="售价"
                  min={0}
                  precision={2}
                  style={{ width: '100%' }}
                  size="large"
                  prefix="¥"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="原价（¥）" name="originalPrice">
                <InputNumber
                  placeholder="原价（选填）"
                  min={0}
                  precision={2}
                  style={{ width: '100%' }}
                  size="large"
                  prefix="¥"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* 商品描述 */}
          <Divider orientation="left">商品描述</Divider>
          <Form.Item
            label="详细描述"
            name="description"
            rules={[{ required: true, message: '请输入商品描述' }]}
          >
            <TextArea
              rows={4}
              placeholder="请输入商品的详细描述..."
              showCount
              maxLength={1000}
            />
          </Form.Item>

          {/* 颜色选项 */}
          <Divider orientation="left">颜色选项</Divider>
          <Form.Item
            label="可选颜色"
            name="colors"
            rules={[{ required: true, message: '请选择至少一种颜色' }]}
          >
            <Select
              mode="tags"
              placeholder="选择或输入颜色"
              size="large"
              tokenSeparators={[',']}
            >
              {colorOptions.map((color) => (
                <Option key={color} value={color}>
                  {color}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* 产品规格 */}
          <Divider orientation="left">产品规格</Divider>
          <Form.List name="specs">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                      {...field}
                      style={{ marginBottom: 0, flex: 1 }}
                      rules={[{ required: true, message: '请输入规格' }]}
                    >
                      <Input
                        placeholder={`规格 ${index + 1}`}
                        size="large"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ color: '#ff4d4f' }}
                      />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加规格
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* 材料列表 */}
          <Divider orientation="left">材料清单</Divider>
          <Form.List name="materials">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                      {...field}
                      style={{ marginBottom: 0, flex: 1 }}
                      rules={[{ required: true, message: '请输入材料' }]}
                    >
                      <Input
                        placeholder={`材料 ${index + 1}`}
                        size="large"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ color: '#ff4d4f' }}
                      />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加材料
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* 产品特性 */}
          <Divider orientation="left">产品特性</Divider>
          <Form.List name="features">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    size="small"
                    title={`特性 ${index + 1}`}
                    extra={
                      fields.length > 1 && (
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                          style={{ color: '#ff4d4f' }}
                        />
                      )
                    }
                    style={{ marginBottom: 16 }}
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, 'title']}
                      label="特性标题"
                      rules={[{ required: true, message: '请输入特性标题' }]}
                    >
                      <Input placeholder="如：顶级材质" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'description']}
                      label="特性描述"
                      rules={[{ required: true, message: '请输入特性描述' }]}
                    >
                      <TextArea rows={2} placeholder="请输入特性的详细描述" />
                    </Form.Item>
                  </Card>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加特性
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* 产品尺寸 */}
          <Divider orientation="left">产品尺寸（选填）</Divider>
          <Row gutter={16}>
            <Col xs={12} sm={6}>
              <Form.Item label="长度 (mm)" name={['dimensions', 'length']}>
                <InputNumber
                  placeholder="长度"
                  min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item label="宽度 (mm)" name={['dimensions', 'width']}>
                <InputNumber
                  placeholder="宽度"
                  min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item label="高度 (mm)" name={['dimensions', 'height']}>
                <InputNumber
                  placeholder="高度"
                  min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item label="重量 (g)" name={['dimensions', 'weight']}>
                <InputNumber
                  placeholder="重量"
                  min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* 商品图片 */}
          <Divider orientation="left">商品图片</Divider>
          <Form.Item
            label="图片链接"
            name="images"
            extra="请输入图片URL，支持京东CDN、Unsplash等"
          >
            <Select
              mode="tags"
              placeholder="输入图片URL后按回车添加"
              size="large"
              tokenSeparators={[',']}
            >
            </Select>
          </Form.Item>

          {/* 商品状态 */}
          <Divider orientation="left">商品状态</Divider>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item label="上架状态" name="status" valuePropName="checked">
                <Switch
                  checkedChildren="已上架"
                  unCheckedChildren="已下架"
                  onChange={(checked) =>
                    form.setFieldValue('status', checked ? 'active' : 'inactive')
                  }
                  checked={form.getFieldValue('status') === 'active'}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="首页推荐" name="isFeatured" valuePropName="checked">
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="新品标记" name="isNew" valuePropName="checked">
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </Form.Item>
            </Col>
          </Row>

          {/* 操作按钮 */}
          <Form.Item style={{ marginTop: 32 }}>
            <Space size="large">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                icon={<SaveOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  minWidth: 120,
                }}
              >
                {isEdit ? '保存更改' : '创建商品'}
              </Button>
              <Button size="large" onClick={handleBack}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

