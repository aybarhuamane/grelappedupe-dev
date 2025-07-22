'use client'
import ReactECharts from 'echarts-for-react'

type ResultType = {
  name: string
  [key: string]: number | string
}

interface IProps {
  legends: string[]
  names: string[]
  data: ResultType[]
}

export const BarChartComponent = (props: IProps) => {
  const { legends, names, data } = props

  // Extract series keys from the first data entry

  // Build the series dynamically
  const series = legends?.map((logro) => ({
    name: logro,
    type: 'bar',
    emphasis: {
      focus: 'series',
    },
    data: data.map((entry) => entry[logro]),
  }))

  const option = {
    grid: { right: 8, bottom: 80, left: 56 },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: legends || [],
    },
    toolbox: {
      show: true,
      orient: 'horizontal',
      left: 'right',
      top: 'top',
      feature: {
        mark: { show: true },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: names || [],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: series || [],
  }

  return (
    <>
      <ReactECharts
        theme={'theme_name'}
        notMerge={true}
        lazyUpdate={true}
        option={option}
        style={{ height: '450px', width: '100%' }}
      />
    </>
  )
}
