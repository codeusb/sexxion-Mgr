import { FC, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Divider,
  List,
  Modal,
  Input,
  Upload,
} from 'antd'
import {FormInstance,UploadProps,UploadFile} from 'antd'
import type { RcFile } from 'antd/lib/upload';
import { useEffect, useState, useRef } from 'react'
import {
  getUserDatail,
  getUserFollow,
  getUserFollowers,
  updateUserPro,
  updateUserPhoto,
} from './api'
import { Descriptions } from 'antd'
const { TextArea } = Input;

const Staff: FC = memo(() => {
  const from = useRef<FormInstance>(null)
  const [userData, setUserData] = useState<any>()
  const [follow, setFollow] = useState<any>()
  const [fan, setFan] = useState<any>()
  const [isModal,setIsModal] = useState<boolean>(false) //开启弹窗
  const [fileList, setFileList] = useState<UploadFile[]>([]); //上传图片列表
  //上传图片
  const onUploadChange: UploadProps['onChange'] = async ({ fileList: newFileList, file: newFile }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  //上传图片
  const upload = async () =>{
    console.log(fileList,fileList[0].originFileObj);
    try{
      const body = new FormData();
      body.append('photo',fileList[0].originFileObj as File)
      console.log(body);
      const data = await updateUserPhoto(body)
      console.log(data);
    }
    catch(error){
      console.log(error);
    }
  }
  const getData = async () => {
    const res = await getUserDatail()
    setUserData(res)
  }
  const getFollow = async () => {
    const res = await getUserFollow({ page: '1', per_page: '10' })
    setFollow(res.results)
  }
  const getFans = async () => {
    const res = await getUserFollowers({ page: '1', per_page: '10' })
    setFan(res.results)
  }
  useEffect(() => {
    getData()
    getFollow()
    getFans()
  }, [])
  // 还原
  const updateUsetInfo = async () => {
    const params = {
      name: '潇洒哥',
      gender: 0,
      birthday: '2020-01-01',
      real_name: '张大帅',
      intro: '嘻嘻',
    }
    await updateUserPro(params)
  }
  // 更新-用户资料
  const handleOk = async () =>{
    const formData = from.current?.getFieldsValue()
    const day = formData.birthday?.$y + '-' + formData.birthday?.$M + '-' + formData.birthday?.$D
    const params = {
      name:formData?.userName,
      gender: formData?.gender,
      birthday: day,
      real_name: formData?.realName,
      intro: formData?.intro,
    }
    await updateUserPro(params)
    setIsModal(false)
    from.current!.resetFields() //清理表单回填数据
  }
  return (
    <Card
      title={
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to="/">首页</Link>,
            },
            {
              title: '个人中心',
            },
          ]}></Breadcrumb>
      }
      style={{ marginBottom: 20 }}>
      <Descriptions title="用户信息">
        <Descriptions.Item label="用户名">{userData?.name}</Descriptions.Item>
        <Descriptions.Item label="用户介绍">{userData?.intro}</Descriptions.Item>
        <Descriptions.Item label="发表文章数">{userData?.art_count}</Descriptions.Item>
        <Descriptions.Item label="关注数">{userData?.follow_count}</Descriptions.Item>
        <Descriptions.Item label="粉丝数">{userData?.fans_count}</Descriptions.Item>
        <Descriptions.Item label="点赞数">{userData?.like_count}</Descriptions.Item>
        <Descriptions.Item label="用户头像"><img src={userData?.photo} alt="" width={120} height={120}/></Descriptions.Item>
      </Descriptions>
      <Divider />
      <div style={{display:'flex'}}>
        <div style={{width:'50%'}}>
          <Descriptions title="关注列表"/>
            <List
              bordered
              dataSource={follow}
              renderItem={(item:any) => <List.Item>{item.name}</List.Item>}
            />
        </div>
        <div style={{width:'50%'}}>
        <Descriptions title="粉丝列表"/>
          <List
            bordered
            dataSource={fan}
            renderItem={(item:any) => <List.Item>{item.name}</List.Item>}
          />
        </div>
      </div>
      <Divider />
      <Button type='primary' onClick={()=>setIsModal(true)} style={{marginRight:16}}>更改个人资料</Button>
      <Button onClick={updateUsetInfo}>还原个人资料</Button>
      <Divider />
      <Descriptions title="更改用户头像"/>
      <Upload
        // name="photo"
        listType="picture-card"
        showUploadList
        action=''
        fileList={fileList}
        onChange={onUploadChange}
        beforeUpload={file => false} //首先阻止默认的上传请求
        onPreview={onPreview}
      >
        {fileList?.length < 1 && '+ 上传'}
      </Upload>
      <Button onClick={upload}>上传更改图片</Button>
      <Modal 
        title="填写更改信息" 
        open={isModal} 
        onOk={handleOk} 
        onCancel={()=>{
          from.current!.resetFields()
          setIsModal(false)}}
        cancelText='取消'
        okText='确认更改'
        style={{padding:'16px 8px'}}
      >
        <Form
          ref={from}
        >
          <Form.Item
            label='用户名'
            name='userName'
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='用户性别'
            name='gender'
            rules={[{ required: true, message: '请输入' }]}
          >
            <Radio.Group value={0}>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label='用户生日'
            name='birthday'
            rules={[{ required: true, message: '请输入' }]}
          >
            <DatePicker placeholder='请选择出生日期'/>
          </Form.Item>
          <Form.Item
            label='用户真名'
            name='realName'
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='用户介绍'
            name='intro'
            rules={[{ required: true, message: '请输入' }]}
          >
            <TextArea rows={4}/>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
})

export default Staff
