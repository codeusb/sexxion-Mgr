import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store"
import Bar from "./components/Bar";
import Line from "./components/Line";
import Pie from "./components/Pie";
import Scatter from "./components/Scatter";
import { Card, Col, Row,Breadcrumb } from 'antd'
import styles from './index.module.less'
import { Link } from 'react-router-dom'


const About:FC = ()=>{
  const login = useSelector((state: RootState) => state.login) //读取store
  useEffect(()=>{
    console.log(login);
  })
  return(
    <Card 
      title={
        <Breadcrumb separator=">"
          items={[
            {
              title:<Link to='/'>首页</Link>
            },
          ]}
        >
        </Breadcrumb>
      }
      style={{ marginBottom: 20 }}
    >
      <Row gutter={16}>
        <Col span={12} className={styles.ca}>
          <Bar 
            title='主流框架使用满意度' 
            xData={['react','vue','angular']}
            yData={[50,40,30]}
            style={{width:'500px',height:'400px'}}
            />
        </Col>
        <Col span={12} className={styles.ca}>
          <Line style={{width:'500px',height:'400px'}} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12} className={styles.ca}>
          <Pie style={{width:'500px',height:'400px'}} />
        </Col>
        <Col span={12} className={styles.ca}>
          <Scatter style={{width:'500px',height:'400px'}} />
        </Col>
      </Row>
    </Card>
  )
}
export default About