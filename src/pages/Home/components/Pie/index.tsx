import * as echarts from 'echarts'
import { FC, useEffect, useRef } from 'react'

interface IProps {
  style?: React.CSSProperties
}

//饼图
const Pie: FC<IProps> = ({ style }) => {
  const domRef = useRef<HTMLDivElement | null>(null)

  const chartInit = () => {
    const myChart = echarts.init(domRef.current as HTMLDivElement)
    const option = {
      title: {
        text: '互联网工作',
        subtext: '模拟数据',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '饼状图',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '后端' },
            { value: 735, name: '前端' },
            { value: 580, name: '测试' },
            { value: 484, name: '运维' },
            { value: 300, name: '产品' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
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

export default Pie
