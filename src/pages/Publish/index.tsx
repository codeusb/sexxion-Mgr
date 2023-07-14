import { FC, useEffect, useRef, useState } from 'react'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
  RadioChangeEvent,
} from 'antd'
import { FormInstance } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getUrlQueryString } from '../../utils/tool'
import { addArticle, getChannel, getArticleDetail, updateArticle } from './api'
import styles from './index.module.less'
import { channelsData } from '../Article/types'
const { Option } = Select

const Publish: FC = () => {
  const navigate = useNavigate()
  const fromRef = useRef<FormInstance>(null)
  const [channel, setChannel] = useState<channelsData[]>([]) //频道列表
  const [imgCount, setImgCount] = useState(1) //图片上传数量
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fileList, setFileList] = useState<any[]>([]) //图片文件列表(url)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cacheImgList = useRef<any>() //缓存图片文件
  const id = getUrlQueryString('id')
  // 频道列表
  const getChannelDate = async () => {
    const res = await getChannel()
    setChannel(res.channels)
  }
  useEffect(() => {
    getChannelDate()
  }, [])
  //新增/更新文章
  const onFinish = async (values: {
    channel_id: number
    content: string
    title: string
    type: number
  }) => {
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        images: fileList.map((item: any) => item?.url),
      },
    }
    // console.log(params)
    if (id) {
      await updateArticle(id, params)
    } else {
      await addArticle(params)
    }
    navigate('/article')
    message.success(`${id ? '更新成功' : '发布成功'}`)
  }
  //切换图片上传模式
  const radioChange = (e: RadioChangeEvent) => {
    const rawValue = e.target.value
    setImgCount(rawValue) //单图：1，三图：3，无图：0
    //图片回显
    if (rawValue === 1) {
      const img = cacheImgList.current ? cacheImgList.current[0] : [] //缓存里有图片就用第一张
      setFileList([img])
    } else if (rawValue === 3) {
      setFileList(cacheImgList.current)
    }
  }
  //图片上传
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUploadChange = (info: { fileList: any[] }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileList = info.fileList.map((file: any) => {
      if (file.response) {
        //上传完毕
        return {
          url: file.response.data.url,
        }
      }
      return file
    })
    setFileList(fileList)
    cacheImgList.current = fileList //上传完成同时把图片列表存入暂存仓库
  }
  // 文章详情
  const getArticle = async () => {
    const res = await getArticleDetail(id as string)
    const { cover, ...formValue } = res
    //表单回显
    fromRef.current?.setFieldsValue({ ...formValue, type: cover.type }) //!.认为form.curren不为空
    const imageList = cover.images.map((url: string) => ({ url })) //es6对象简写
    setFileList(imageList) //调用setFileList方法回填upload
    cacheImgList.current = imageList //暂存图片列表
  }

  useEffect(() => {
    if (id) {
      getArticle()
    } else {
      fromRef.current?.resetFields() //清理表单回填数据
      setFileList([]) //清理uoload
      cacheImgList.current = [] //清理缓存
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <div className={styles.publish}>
      <Card
        title={
          <Breadcrumb
            separator=">"
            items={[
              {
                title: <Link to="/">首页</Link>,
              },
              {
                title: `${id ? '编辑' : '发布'}文章`,
              },
            ]}>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          ref={fromRef}
          // initialValues={{ type: 1,content:'this is content' }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}>
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channel?.map((item: channelsData) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                maxCount={imgCount}
                multiple={imgCount > 1}
                // progress={{strokeWidth: 3, showInfo: false}}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          {/* 富文本编辑器的输入内容会在onFinshed事件回调中被获取 */}
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}>
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? '更新' : '发布'}
                文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Publish
