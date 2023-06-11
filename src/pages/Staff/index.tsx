import {FC,memo} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Table } from 'antd'
import { useEffect,useState } from 'react'
import locale from 'antd/es/date-picker/locale/zh_CN'
import {getUserDatail,getUserFollow,getUserFollowers,updateUserPro,updateUserPhoto} from './api'

const Staff:FC = memo(()=>{
  const getData = async () =>{
    const res = await getUserDatail()
    console.log(res);
  }
  const getFollow = async () =>{
    const res = await getUserFollow({page:'1',per_page:'10'})
    console.log(res);
  }
  const getFans = async () =>{
    const res = await getUserFollowers({page:'1',per_page:'10'})
    console.log(res);
  }
  useEffect(()=>{
    getData()
    getFollow()
    getFans()
  },[])
  const updateUsetInfo = async ()=>{
    const params = {
      name:'潇洒哥',
      gender:0,
      birthday:'2020-01-01',
      real_name:'张大帅',
      intro:'嘻嘻'
    }
    await updateUserPro(params)
  }
  return(
    <Card
      title={
        <Breadcrumb separator=">"
          items={[
            {
              title:<Link to='/'>首页</Link>
            },
            {
              title:'个人中心'
            },
          ]}
        >
        </Breadcrumb>
      }
      style={{ marginBottom: 20 }}
    >
      <Button onClick={updateUsetInfo}>更改</Button>
    </Card>
  )
})

export default Staff