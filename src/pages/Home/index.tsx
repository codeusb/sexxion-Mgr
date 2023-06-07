import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store"
import Bar from "./components/Bar";
import { Card, Col, Row,Space } from 'antd'
import styles from './index.module.less'

const About:FC = ()=>{
  const login = useSelector((state: RootState) => state.login) //读取store
  useEffect(()=>{
    console.log(login);
  })
  return(
    <Card >
      {/* 渲染Bar组件 */}
      <Row gutter={16}>
        <Col span={12} className={styles.ca}>
          <Bar 
            title='主流框架使用满意度' 
            xData={['react','vue','angular']}
            yData={[50,40,30]}
            style={{width:'400px',height:'400px'}}
            />
        </Col>
        <Col span={12} className={styles.ca}>
          <Bar 
          title='前端语言流行度' 
          xData={['html','css','javascript']}
          yData={[30,40,50]}
          style={{width:'400px',height:'400px'}}
          />
        </Col>
      </Row>
      {/* 渲染Bar组件 */}
      <Row gutter={16}>
        <Col span={12} className={styles.ca}>
          <Bar 
            title='主流互联网职业满意度' 
            xData={['前端','后端','测试']}
            yData={[50,60,40]}
            style={{width:'400px',height:'400px'}}
            />
        </Col>
        <Col span={12} className={styles.ca}>
          <Bar 
          title='大学生各年级统计' 
          xData={['大一','大二','大三','大四']}
          yData={[30,40,50,60]}
          style={{width:'400px',height:'400px'}}
          />
        </Col>
      </Row>
    </Card>
  )
}
export default About