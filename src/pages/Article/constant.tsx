import { Button, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from './img/error.png'
import { articleResultData } from './types'
import { ColumnsType } from 'antd/es/table'

export const getColumns = (
  goPublish: (id: string) => void,
  delArticle: (id: string) => void
) => {
  const columns: ColumnsType<articleResultData> = [
    {
      title: '封面',
      dataIndex: 'cover',
      align: 'center',
      width: 120,
      render: (_, record) => {
        return (
          <img
            src={record.cover.images[0] || img404}
            width={80}
            height={60}
            alt=""
          />
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: () => <Tag color="green">审核通过</Tag>,
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
      align: 'center',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
      align: 'center',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      align: 'center',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => goPublish(record?.id)}
            />
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(record.id)}
              okText="确认"
              cancelText="取消">
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
  return columns
}
