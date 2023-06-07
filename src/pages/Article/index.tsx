import { FC } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Table, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect,useState } from 'react'
import { http,setToken,getToken,removeToken } from '../../utils'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { getArticle, getChannel, deleteArticle } from './api'
import { articleReq } from './types'
import { getColumns } from './constant'
const { Option } = Select
const { RangePicker } = DatePicker

const Article:FC = ()=>{
  const [channel,setChannel] = useState<any>(); //频道列表
  const [articleData,setArticleData]= useState<any>() //文章列表
  // 频道列表
  const getChannelDate = async  () =>{
    const res = await getChannel()
    setChannel(res.channels)
  }
  useEffect(()=>{
    getChannelDate()
    onFinish({})
  },[])
  // 文章列表(筛选)
  const onFinish = async (value: any)=>{
    console.log(value);
    const { status, channel_id, date } = value
    const _params:articleReq = {}
    if(value){
      if(status !==-1){
      _params.status = status
      }
      if(channel_id){
        _params.channel_id = channel_id
      }
      if(date){//接口需要的日期格式
        _params.begin_pubdate = date[0].format('YYYY-MM-DD')
        _params.end_pubdate = date[1].format('YYYY-MM-DD')
      }
    }
    const res = await getArticle(_params)
    console.log(res);
    setArticleData(res)
  }

  // 分页
  // 删除
  const delArticle = ()=>{
    console.log(2);
  }
  // 跳转
  const goPublish = ()=>{
    console.log(1);
  }
  return(
    <div>
      <Card
        title={
          <Breadcrumb separator=">"
            items={[
              {
                title:<Link to='/'>首页</Link>
              },
              {
                title:'内容管理'
              },
            ]}
          >
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form 
          onFinish={onFinish}
          initialValues={{ status: -1 }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channel?.map((item:any) =>
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>)}       
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到 ${articleData?.count} 条结果：`}>
        <Table 
          rowKey="id" 
          columns={getColumns(goPublish,delArticle)} 
          dataSource={articleData?.results}
          pagination={{
            pageSize:articleData?.pre_page,
            total:articleData?.count,
            // onChange:pageChange
          }
          }
          />
      </Card>
    </div>
  )
}
export default Article