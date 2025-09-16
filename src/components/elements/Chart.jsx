import React from "react";
import ReactECharts from "echarts-for-react";

export default function Chart({
  type = "line",
  data,
  dataKeys = [],
  colors = [],
  title,
  height = 250,
  rightAxisKeys = [],
}) {
  const greenColor = "#00ff41";
  const xAxisColor = "#0b472d";
  const labelColor = "#e5e7eb";
  const gridLineColor = "rgba(148,163,184,0.12)";

  const numberFormatter = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 });

  const firstDatum = Array.isArray(data) && data.length > 0 ? data[0] : {};
  const availableValueKeys = Object.keys(firstDatum).filter((k) => k !== "date");
  const rightAxisSet = new Set((rightAxisKeys || []).map((k) => String(k).toLowerCase()));

  const seriesConfigs = dataKeys.map((label, i) => {
    const lowerLabel = String(label).toLowerCase();
    const matchedKey =
      availableValueKeys.find((k) => k.toLowerCase() === lowerLabel) || String(label);
    const useRightAxis = rightAxisSet.has(lowerLabel) || rightAxisSet.has(matchedKey.toLowerCase());
    return { label: String(label), key: matchedKey, color: colors[i], yAxisIndex: useRightAxis ? 1 : 0 };
  });

  const series = seriesConfigs.map((cfg) => {
    const base = {
      name: cfg.label,
      type: type === "bar" ? "bar" : "line",
      yAxisIndex: cfg.yAxisIndex,
      data: data.map((d) => [d.date, d[cfg.key]]),
      smooth: true,
      symbol: "none",
      lineStyle: { width: 2, color: cfg.color },
      itemStyle: { color: cfg.color },
    };

    if (type === "area") {
      return { ...base, areaStyle: { color: (cfg.color || "") + "33" } };
    }

    if (type === "bar") {
      return { ...base, itemStyle: { color: cfg.color } };
    }

    return base;
  });

  const option = {
    backgroundColor: "#000",
    textStyle: {
      fontFamily:
        "'Geist', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
      color: labelColor,
    },
    title: title
      ? {
          text: title,
          left: "center",
          top: "10px",
          textStyle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
        }
      : undefined,
    tooltip: {
      trigger: "axis",
      backgroundColor: "#000",
      borderColor: "#00ff88",
      textStyle: { color: "#d1ffe8" },
      axisPointer: { type: "cross" },
      formatter: (params) => {
        if (!params || !params.length) return "";
        const date = params[0].axisValue;
        const lines = params.map((p) => {
          const value = p.value?.[1] ?? p.value;
          const text = numberFormatter.format(Number(value));
          return `${p.marker} ${p.seriesName}: ${text}`;
        });
        return `${date}<br/>${lines.join("<br/>")}`;
      },
    },
    legend: (() => {
      const labels = seriesConfigs.map((s) => s.label);
      const nameToIndex = new Map();
      labels.forEach((n, i) => nameToIndex.set(n, i));
      const rich = {};
      labels.forEach((_, i) => {
        rich[`s${i}`] = { color: colors[i] || greenColor };
      });
      return {
        data: labels.map((name) => ({ name, icon: "circle" })),
        formatter: (name) => {
          const idx = nameToIndex.get(name) ?? 0;
          return `{s${idx}|${name}}`;
        },
        textStyle: { rich },
        top: title ? "40px" : "10px",
        left: "center",
      };
    })(),
    grid: { 
      left: rightAxisKeys.length > 0 ? "12%" : "8%", 
      right: rightAxisKeys.length > 0 ? "12%" : "8%", 
      top: title ? "80px" : "60px", 
      bottom: "20%" 
    },
    
    ...(() => {
      const dateStrings = data.map((d) => d.date);
      const visibleLabelIndices = new Set();
      const seenMonthYear = new Set();
      let startYear = null;
      let startMonth = null;

      for (let i = 0; i < dateStrings.length; i++) {
        const ds = dateStrings[i];
        if (!ds) continue;
        const parts = ds.split("-");
        if (parts.length < 2) continue;
        startYear = parseInt(parts[0], 10);
        startMonth = parseInt(parts[1], 10) - 1;
        break;
      }
      dateStrings.forEach((ds, idx) => {
        if (!ds) return;
        const parts = ds.split("-");
        if (parts.length < 2) return;
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // 0-based
        if (startYear == null || startMonth == null) return;
        const monthsDiff = (year - startYear) * 12 + (month - startMonth);
        const key = `${year}-${month}`;
        if (monthsDiff % 2 === 0 && !seenMonthYear.has(key)) {
          seenMonthYear.add(key);
          visibleLabelIndices.add(idx);
        }
      });

      const monthNamesIt = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const formatMonthYear = (val) => {
        if (!val) return "";
        const [y, m] = val.split("-");
        const monthIdx = Math.max(0, parseInt(m, 10) - 1);
        const yearShort = (y || "").slice(2);
        const name = monthNamesIt[monthIdx] || "";
        return `${name}${yearShort}`;
      };

      return {
        xAxis: {
          type: "category",
          data: dateStrings,
          axisLine: { lineStyle: { color: xAxisColor } },
          axisLabel: {
            color: labelColor,
            rotate: 0,
            fontSize: 10,
            interval: (index, value) => visibleLabelIndices.has(index),
            formatter: (value, index) =>
              visibleLabelIndices.has(index) ? formatMonthYear(value) : "",
          },
        },
      };
    })(),
    yAxis: [
      {
        type: "value",
        axisLine: { lineStyle: { color: xAxisColor } },
        axisLabel: { 
          color: labelColor,
          formatter: (value) => numberFormatter.format(value),
        },
        splitLine: { lineStyle: { color: gridLineColor, type: "dashed" } },
      },
      ...(rightAxisKeys.length > 0
        ? [
            {
              type: "value",
              position: "right",
              axisLine: { lineStyle: { color: xAxisColor } },
              axisLabel: { 
                color: labelColor,
                formatter: (value) => numberFormatter.format(value),
              },
              splitLine: { show: false },
            },
          ]
        : []),
    ],
    series,
  };

  return (
    <div className="bg-black rounded-2xl p-4 shadow-lg border border-gray-700">
      <ReactECharts option={option} style={{ height, width: "100%" }} />
    </div>
  );
}
