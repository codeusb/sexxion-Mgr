import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

//饼图 
const Line = ({style}:any) =>{
  const domRef = useRef<HTMLDivElement>(null)
  console.log(style);
  
  const chartInit = () =>{
    const myChart = echarts.init(domRef.current as HTMLDivElement);
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
    myChart.setOption(option)
  }
  useEffect(()=>{
    chartInit()
    console.log(1);
  },[])
  return(
    <div>
      <div ref={domRef} style={style}></div>
    </div>
  )
}

export default Line