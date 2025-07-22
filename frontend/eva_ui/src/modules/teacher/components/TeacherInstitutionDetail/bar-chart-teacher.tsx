"use client";
import { colorsChart as colors } from "@/modules/core";
import ReactECharts from "echarts-for-react";

interface BarChartProps {
  legends: Array<string | number>;
  dataSources?: Array<Array<string | number>>;
  xAxisData?: Array<string | number>;
  height?: string;
  width?: string;
}

export const BarChartTeacher = (props: BarChartProps) => {
  const {
    legends,
    dataSources,
    xAxisData,
    height = "450px",
    width = "100%",
  } = props;

  const namesSerie = xAxisData || dataSources?.map((item) => item[0]);

  const dataSerie = dataSources?.map((item) => item.slice(1));

  const series = legends?.map((logro, i) => ({
    name: logro,
    type: "bar",
    emphasis: {
      focus: "series",
    },
    data: dataSerie?.map((item) => item[i]),
    itemStyle: {
      color: colors[i % colors.length],
    },
  }));

  const option = {
    grid: { right: 8, bottom: 80, left: 56 },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: legends || [],
      bottom: 0,
    },
    toolbox: {
      show: true,
      orient: "horizontal",
      left: "right",
      top: "top",
      feature: {
        mark: { show: true },
        magicType: { show: true, type: ["line", "bar", "stack"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: namesSerie || [],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: series || [],
  };

  return (
    <ReactECharts
      theme={"theme_name"}
      notMerge={true}
      lazyUpdate={true}
      option={option}
      style={{ height, width }}
    />
  );
};
