'use client'
import ReactECharts from 'echarts-for-react'
import { colorsChart as colors } from '@/modules/core'

interface IProps {
  names: string[]
  data: (string | number)[][]
}

function calcularCantidadDeSeries(datos: (string | number)[][]): number {
  if (datos.length === 0) return 0 // Si el array está vacío, no hay series
  const primeraFila = datos[0] // Obtenemos la primera fila que contiene los nombres de los logros
  return primeraFila.length - 1 // Restamos 1 porque la primera columna es el nombre de la competencia
}

export const BarChartDirectorEvaluation = (props: IProps) => {
  const { names, data } = props

  const seriesCount = calcularCantidadDeSeries(data)

  const optionOther = {
    legend: {},
    tooltip: {},
    dataset: {
      source: data,
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: Array.from({ length: seriesCount }, (_, i) => ({
      type: 'bar',
      itemStyle: {
        color: colors[i],
      },
    })),
  }
  return (
    <ReactECharts
      theme={'theme_name'}
      notMerge={true}
      lazyUpdate={true}
      option={optionOther}
      style={{ height: '450px', width: '100%' }}
    />
  )
}
