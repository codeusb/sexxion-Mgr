import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { Layout, Menu, Popconfirm } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { removeToken } from '../../utils'
import { getUserInfo } from './api'
const { Header, Sider } = Layout
import PageLoading from '../../components/PageLoading'
import { Suspense } from 'react'

const LayoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation() //获取当前路由信息
  const [userInfo, setUserInfo] = useState<any>()
  // 退出登录
  const onConfirm = () => {
    removeToken()
    navigate('/login')
  }
  // 获取用户信息
  const getData = async () => {
    const res = await getUserInfo()
    setUserInfo(res)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout className={styles.antLayout}>
      <Header style={{ padding: 0 }}>
        <div className={styles.logo}></div>
        <div className={styles.userCon}>
          <span style={{ marginRight: 20 }}>{userInfo?.name}</span>
          <span>
            <Popconfirm
              onConfirm={onConfirm}
              title="是否确认退出？"
              okText="退出"
              cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            // defaultOpenKeys={['/']}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: '/',
                label: '数据概览',
                onClick: () => navigate('/'),
              },
              {
                key: '/article',
                label: '内容管理',
                onClick: () => navigate('/article'),
              },
              {
                key: '/publish',
                label: '发布文章',
                onClick: () => navigate('/publish'),
              },
              {
                key: '/staff',
                label: '个人中心',
                onClick: () => navigate('/staff'),
              },
            ]}
          />
        </Sider>
        <Layout style={{ padding: '16px 24px 24px' }}>
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
