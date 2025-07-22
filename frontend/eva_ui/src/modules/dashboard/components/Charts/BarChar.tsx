"use client";
import { colorsChart as colors } from "@/modules/core";
import ReactECharts from "echarts-for-react";

interface IProps {
  legends: Array<string | number>;
  dataSources?: Array<Array<string | number>>;
}

export const BarChartComponent = (props: IProps) => {
  const { legends, dataSources } = props;

  //exclude array item [0] because it is the name of the data
  const dataSerie = dataSources?.map((item) => item.slice(1));
  const namesSerie = dataSources?.map((item) => item[0]);

  // Build the series dynamically
  const series = legends?.map((logro, i) => ({
    name: logro,
    type: "bar",
    emphasis: {
      focus: "series",
    },
    data: dataSerie?.map((item) => item[i]),
    itemStyle: {
      color: colors[legends.indexOf(logro)],
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
    <>
      <ReactECharts
        theme={"theme_name"}
        notMerge={true}
        lazyUpdate={true}
        option={option}
        style={{ height: "480px", width: "100%" }}
      />
    </>
  );
};
