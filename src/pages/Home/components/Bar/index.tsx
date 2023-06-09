//组件——封装echart图表组件
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

type BarType = {
  title: string
  xData: string[]
  yData: number[]
  style: React.CSSProperties
}

//柱状图
function Bar({ title, xData, yData, style }: BarType) {
  const domRef = useRef<HTMLDivElement | null>(null)
  const chartInit = () => {
    const myChart = echarts.init(domRef.current as HTMLDivElement)
    // 绘制图表
    myChart.setOption({
      title: {
        text: title,
      },
      tooltip: {},
      xAxis: {
        data: xData,
      },
      yAxis: {},
      series: [
        {
          name: '程度',
          type: 'bar',
          data: yData,
        },
      ],
    })
  }
  //执行初始化函数
  useEffect(() => {
    chartInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <div ref={domRef} style={style}></div>
    </div>
  )
}

export default Bar
