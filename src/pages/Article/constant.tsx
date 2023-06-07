import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Table, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from './img/error.png'
export const getColumns = (goPublish:any,delArticle:any)=>{
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width:120,
      render: (cover:any) => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data:any) => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: (data:any) => {
        return (
          <Space size="middle">
            {/* 编辑按钮 */}
            <Button 
              type="primary" 
              shape="circle" 
              icon={<EditOutlined />} 
              onClick={()=>goPublish(data)}
              />
            {/* 删除按钮 */}
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />
                }
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  return columns
} 