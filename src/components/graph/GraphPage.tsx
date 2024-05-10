"use client";

import useRefinedTradeWSdata from "@/app/test/page";
import { symbolAtom } from "@/atoms/symbolAtom";
import { TupdatedTradeData } from "@/lib/validators";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
const ReactEcharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type DataItem = (number | string)[];

export default function GraphPage({
  data,
  symbol,
}: {
  data: string;
  symbol: string;
}) {
  function calculateMA(dayCount: number, data: DataItem[]) {
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-");
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += +data?.[i - j]?.[1]!;
      }
      result.push(sum / dayCount);
    }
    return result;
  }
  const dates = JSON.parse(data).map(function (item: TupdatedTradeData) {
    return item[0];
  });
  const datax = JSON.parse(data).map(function (item: TupdatedTradeData) {
    return [+item[1], +item[2], +item[3], +item[4]];
  });

  return (
    <div>
      <div className="relative flex flex-col items-center justify-center gap-2  text-white"></div>
      <ReactEcharts
        style={{ height: "40rem" }}
        option={{
          legend: {
            data: ["MA5", "MA10", "MA20", "MA30"],
            inactiveColor: "#777",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              animation: false,
              type: "cross",
              lineStyle: {
                color: "#376df4",
                width: 2,
                opacity: 1,
              },
            },
          },
          xAxis: {
            type: "category",
            data: dates,
            axisLine: { lineStyle: { color: "#8392A5" } },
          },
          yAxis: {
            scale: true,
            axisLine: { lineStyle: { color: "#8392A5" } },
            splitLine: { show: false },
          },
          grid: {
            bottom: 80,
          },
          dataZoom: [
            {
              textStyle: {
                color: "#8392A5",
              },
              dataBackground: {
                areaStyle: {
                  color: "#fffff",
                },
                lineStyle: {
                  opacity: 1,
                  color: "#8392A5",
                },
              },
              brushSelect: true,
            },
            {
              type: "inside",
            },
          ],
          series: [
            {
              type: "candlestick",
              name: symbol,
              data: datax,
              itemStyle: {
                color: "#FD1050",
                color0: "#0CF49B",
                borderColor: "#FD1050",
                borderColor0: "#0CF49B",
              },
            },
            {
              name: "MA5",
              type: "line",
              data: calculateMA(5, datax),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1,
              },
            },
            {
              name: "MA10",
              type: "line",
              data: calculateMA(10, datax),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1,
              },
            },
            {
              name: "MA20",
              type: "line",
              data: calculateMA(20, datax),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1,
              },
            },
            {
              name: "MA30",
              type: "line",
              data: calculateMA(30, datax),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1,
              },
            },
          ],
        }}
      />
    </div>
  );
}
