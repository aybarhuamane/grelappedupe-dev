'use client'
import ReactECharts from 'echarts-for-react'
import { detailDashboard } from '@/types'
const colors = ['#FF0000', '#FFA500', '#17C964', '#0E8AAA']

interface IRenderDonusProps {
  title: string
  subTitle: string
  dataList: detailDashboard.ICapacityByCompetence | null
}
export const RenderDonus = (props: IRenderDonusProps) => {
  const { dataList, title } = props

  const dataSeries =
    dataList?.logros.map((logro) => ({
      value: logro.valor,
      name: logro.logro,
      itemStyle: {
        color: colors[dataList.logros.indexOf(logro)],
      },
    })) || []

  const option = {
    title: {
      text: `${title || ''}`,
      subtext: 'resumen',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        name: 'Logro',
        type: 'pie',
        radius: '70%',
        data: dataSeries,
      },
    ],
  }

  return (
    <section className="flex flex-col items-center justify-center pt-6">
      {dataList && (
        <ReactECharts
          theme={'theme_name'}
          notMerge={true}
          lazyUpdate={true}
          option={option}
          style={{ height: '450px', width: '100%' }}
        />
      )}
    </section>
  )
}
