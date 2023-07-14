import * as echarts from 'echarts'
import { FC, useEffect, useRef } from 'react'

interface IProps {
  style?: React.CSSProperties
}

//饼图
const Line: FC<IProps> = ({ style }) => {
  const domRef = useRef<HTMLDivElement>(null)

  const chartInit = () => {
    const myChart = echarts.init(domRef.current as HTMLDivElement)
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    }
    myChart.setOption(option)
  }
  useEffect(() => {
    chartInit()
  }, [])
  return (
    <div>
      <div ref={domRef} style={style}></div>
    </div>
  )
}

export default Line
