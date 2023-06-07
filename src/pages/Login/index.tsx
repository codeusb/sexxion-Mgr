import React, { useEffect } from 'react';
import { Card,Form, Input, Button, Checkbox, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store"
import { setUserState, setPasswordState } from '../../store/login';
import { setToken } from '../../utils'
import { loginIn } from './api'

interface LoginData{
  username: string,
  password: string
}

const Login:React.FC = ()=>{
  const navigate = useNavigate() //路由跳转
  const dispatch: Dispatch = useDispatch(); //注册钩子函数
  const login = useSelector((state: RootState) => state.login) //读取store

  useEffect(()=>{
    console.log(login);
    // eslint-disable-next-line
  },[])

  const onFinish = async (values: LoginData) => {
    try{
      const { token } = await loginIn({
          mobile:values.username,
          code:values.password
      })
      setToken(token) // 设置token(token持久化)
      dispatch(setUserState(values.username)) //修改redux中的store
      dispatch(setPasswordState(values.password)) //修改redux中的store
      navigate('/',{replace:true})
      message.success('登录成功')
      // eslint-disable-next-line
    }catch(e:any){
      message.error(e.response?.data?.message ||'登录失败')
    }
  };

  return(
    <div className={styles.login}>
      <Card className={styles.loginFrom}>
        <div className={styles.logo}></div>
        <Form
          name="loginForm"
          initialValues={{ 
            username: '13811111111', //11位的手机号就行
            password:'246810',       //固定246810
            remember: true 
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '输入用户名' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur'
              },
            ]}
          >
            <Input 
              prefix={<UserOutlined/>} 
              placeholder="输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '输入密码' },
              { len: 6, message: '请输入6位密码', validateTrigger: 'onBlur' },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
            登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login