import { Row, Col, Card, Statistic, Table, Tag, Progress, Avatar, Space } from 'antd'
import {
  TeamOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import { Line, Column } from '@ant-design/plots'
import { useState } from 'react'

export default function Dashboard() {
  // 模拟数据
  const statsData = [
    {
      title: 'Active Employees',
      value: 547,
      icon: <TeamOutlined style={{ color: '#667eea' }} />,
      bgColor: '#eef2ff',
      change: '+12%',
      changeType: 'up',
    },
    {
      title: 'Number of Projects',
      value: 339,
      icon: <ProjectOutlined style={{ color: '#f59e0b' }} />,
      bgColor: '#fffbeb',
      change: '+8%',
      changeType: 'up',
    },
    {
      title: 'Number of Task',
      value: 147,
      icon: <CheckCircleOutlined style={{ color: '#10b981' }} />,
      bgColor: '#ecfdf5',
      change: '+23%',
      changeType: 'up',
    },
    {
      title: 'Target Percentage Completed',
      value: '89.75%',
      icon: <RiseOutlined style={{ color: '#ef4444' }} />,
      bgColor: '#fef2f2',
      change: '+5%',
      changeType: 'up',
    },
  ]

  // 进行中的任务数据
  const ongoingTasks = [
    {
      key: '1',
      name: 'Journey Scarves',
      description: 'Rebranding and Website Design',
      status: 'On Going',
      progress: 51,
      dueDate: 'Aug, 17 2024',
      team: ['👤', '👤', '👤', '👤'],
    },
    {
      key: '2',
      name: 'Edifier',
      description: 'Web Design & Development',
      status: 'On Going',
      progress: 51,
      dueDate: 'Aug, 17 2024',
      team: ['👤', '👤'],
    },
    {
      key: '3',
      name: 'Ugreen',
      description: 'Web App & Dashboard',
      status: 'On Going',
      progress: 89,
      dueDate: 'Aug, 15 2024',
      team: ['👤', '👤', '👤'],
    },
    {
      key: '4',
      name: 'CNN',
      description: 'Rebranding and Soemed Content',
      status: 'On Going',
      progress: 65,
      dueDate: 'Aug, 20 2024',
      team: ['👤', '👤', '👤', '👤'],
    },
  ]

  // 顶级表现者
  const topPerformers = [
    {
      key: '1',
      name: 'Maylina',
      position: '1st',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    },
    {
      key: '2',
      name: 'Jonathan',
      position: '2nd',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    {
      key: '3',
      name: 'Yasmine',
      position: '3rd',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    {
      key: '4',
      name: 'Ronald',
      position: '4th',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    },
  ]

  // 图表数据
  const monthlyData = [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 180 },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: 220 },
    { month: 'Mei', value: 380 },
    { month: 'Jun', value: 280 },
    { month: 'Jul', value: 200 },
    { month: 'Aug', value: 240 },
    { month: 'Sep', value: 180 },
  ]

  const columnConfig = {
    data: monthlyData,
    xField: 'month',
    yField: 'value',
    color: '#667eea',
    columnStyle: {
      radius: [8, 8, 0, 0],
    },
    xAxis: {
      label: {
        style: {
          fill: '#8c8c8c',
          fontSize: 12,
        },
      },
    },
    yAxis: false,
  }

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{text}</div>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color="blue">{status}</Tag>,
    },
    {
      title: 'Procentation',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => <Progress percent={progress} size="small" />,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      render: (team: string[]) => (
        <Avatar.Group maxCount={4}>
          {team.map((_, idx) => (
            <Avatar key={idx} icon={<UserOutlined />} />
          ))}
        </Avatar.Group>
      ),
    },
  ]

  return (
    <div className="fade-in-up">
      {/* 顶部通知卡片 */}
      <Card
        style={{
          marginBottom: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: 16,
        }}
        bodyStyle={{ padding: '20px 24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              <ClockCircleOutlined style={{ fontSize: 24, color: 'white' }} />
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>Dear Manager</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 14 }}>
                We have observed a decline in{' '}
                <span style={{ color: '#fbbf24', fontWeight: 600 }}>[Hermawan]</span>'s performance over the past 2 weeks.
              </div>
            </div>
          </div>
          <button
            style={{
              padding: '8px 24px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            View Detail
          </button>
        </div>
      </Card>

      {/* 统计卡片 */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              style={{
                height: '100%',
                borderRadius: 16,
                transition: 'all 0.3s ease',
              }}
              bodyStyle={{ padding: 24 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 14, color: '#8c8c8c', marginBottom: 8 }}>
                    {stat.title}
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>
                    {stat.change} this month
                  </div>
                </div>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                  }}
                >
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 主要内容区域 */}
      <Row gutter={[24, 24]}>
        {/* 进行中的任务 */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>On Going Task</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c', fontWeight: 'normal' }}>
                    Best performing employee ranking.
                  </div>
                </div>
              </div>
            }
            bordered={false}
            style={{ borderRadius: 16 }}
          >
            <Table
              columns={columns}
              dataSource={ongoingTasks}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        {/* 图表和顶级表现者 */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>Graphs and Analysis</div>
                <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                  Projects completed per month based on trends.
                </div>
              </div>
            }
            bordered={false}
            style={{ marginBottom: 24, borderRadius: 16 }}
          >
            <Column {...columnConfig} height={200} />
          </Card>

          <Card
            title={
              <div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>Top Performance</div>
                <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                  Best performing employee ranking.
                </div>
              </div>
            }
            bordered={false}
            style={{ borderRadius: 16 }}
          >
            <Row gutter={[12, 12]}>
              {topPerformers.map((performer) => (
                <Col span={12} key={performer.key}>
                  <div
                    style={{
                      textAlign: 'center',
                      padding: 16,
                      background: '#f9fafb',
                      borderRadius: 12,
                    }}
                  >
                    <Avatar size={64} src={performer.avatar} style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>{performer.position}</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{performer.name}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
