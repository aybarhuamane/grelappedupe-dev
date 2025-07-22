'use client'
import ReactECharts from 'echarts-for-react'

interface ICharDataProps {
  dataGender: { value: number; name: string }[]
  dataEvaluation: { value: number; name: string }[]
}

const colors = ['#FF0000', '#00FF00', '#FFFF00']
const colorsSex = ['#1E90FF', '#FF69B4']

export const CharData = (props: ICharDataProps) => {
  const { dataGender, dataEvaluation } = props

  const legendData = ['Inadecuado', 'Adecuado', 'Omitido']

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      data: legendData,
    },
    series: [
      {
        name: 'Sexos',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        label: {
          position: 'inner',
          fontSize: 14,
        },
        labelLine: {
          show: false,
        },
        data: dataGender.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: colorsSex[index],
          },
        })),
      },
      {
        name: 'Resultado',
        type: 'pie',
        radius: ['45%', '60%'],
        labelLine: {
          length: 30,
        },
        label: {
          formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
          backgroundColor: '#F6F8FC',
          borderColor: '#8C8D8E',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: {
              color: '#6E7079',
              lineHeight: 22,
              align: 'center',
            },
            hr: {
              borderColor: '#8C8D8E',
              width: '100%',
              borderWidth: 1,
              height: 0,
            },
            b: {
              color: '#4C5058',
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 33,
            },
            per: {
              color: '#fff',
              backgroundColor: '#4C5058',
              padding: [3, 4],
              borderRadius: 4,
            },
          },
        },
        data: dataEvaluation.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: colors[index],
          },
        })),
      },
    ],
  }

  return (
    <section>
      <ReactECharts
        theme={'theme_name'}
        notMerge={true}
        lazyUpdate={true}
        option={option}
        style={{ height: '450px', width: '100%' }}
      />
    </section>
  )
}
