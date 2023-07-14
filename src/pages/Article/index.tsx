import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
} from 'antd'
import { useEffect, useState } from 'react'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { getArticle, getChannel, deleteArticle } from './api'
import { articleReq, articleResultData, channelsData } from './types'
import { getColumns } from './constant'
import { Moment } from 'moment'
const { Option } = Select
const { RangePicker } = DatePicker

const Article: FC = () => {
  const [tablePage, setTablePage] = useState<number>(1) //页码
  const [tablePageSize, setTablePageSize] = useState<number>(10) //每页数据
  const [dataSource, setDataSource] = useState<articleResultData[]>([]) // 表格数据
  const [dataSourceNum, setDataSourceNum] = useState<number>(0) // 表格数据总数
  const navigate = useNavigate()
  const [channel, setChannel] = useState<channelsData[]>([]) //频道列表

  // 频道列表
  const getChannelDate = async () => {
    const res = await getChannel()
    setChannel(res.channels)
  }

  useEffect(() => {
    getChannelDate()
  }, [])

  // 文章列表(筛选)
  const onFinish = async (value: {
    status?: string
    channel_id?: string
    date?: Moment[]
  }) => {
    const { status, channel_id, date } = value
    const _params: articleReq = {
      channel_id: channel_id,
    }
    if (status !== '-1') {
      _params.status = status
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD') //接口需要的日期格式
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    if (value) {
      _params.page = '' + tablePage
      _params.per_page = '10'
    }
    const res = await getArticle(_params)
    setDataSource(res?.results)
    setDataSourceNum(res?.total_count)
  }

  useEffect(() => {
    onFinish({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePage])

  // 删除
  const delArticle = async (id: string) => {
    await deleteArticle(id)
    onFinish({})
  }

  // 编辑跳转
  const goPublish = (id: string) => {
    navigate(`/publish?id=${id}`)
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            separator=">"
            items={[
              {
                title: <Link to="/">首页</Link>,
              },
              {
                title: '内容管理',
              },
            ]}></Breadcrumb>
        }
        style={{ marginBottom: 20 }}>
        <Form onFinish={onFinish} initialValues={{ status: '-1' }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={'-1'}>全部</Radio>
              <Radio value={'0'}>草稿</Radio>
              <Radio value={'1'}>待审核</Radio>
              <Radio value={'2'}>审核通过</Radio>
              <Radio value={'3'}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channel?.map((item: channelsData) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="reset"
              onClick={() => onFinish({})}>
              重置
            </Button>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${dataSourceNum} 条结果：`}>
        <Table
          rowKey="id"
          columns={getColumns(goPublish, delArticle)}
          dataSource={dataSource}
          pagination={{
            pageSize: tablePageSize,
            total: dataSourceNum,
            onChange: (page, pageSize) => {
              setTablePage(page)
              setTablePageSize(pageSize)
            },
          }}
        />
      </Card>
    </div>
  )
}
export default Article
