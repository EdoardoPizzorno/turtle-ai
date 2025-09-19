import React, { useEffect, useState } from "react";
import { Maximize2 } from "lucide-react";
import ReactECharts from "echarts-for-react";

export default function Chart({
  type = "line",
  data,
  dataKeys = [],
  colors = [],
  title,
  height = 250,
  rightAxisKeys = [],
  isPreview = false,
  detail = false,
  to,
  openPath,
  onOpen,
  fontFamily = "Inter",
}) {
  const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('theme-light');
  const [themeVersion, setThemeVersion] = useState(isLight ? 'light' : 'dark');

  useEffect(() => {
    const onTheme = () => setThemeVersion(document.documentElement.classList.contains('theme-light') ? 'light' : 'dark');
    window.addEventListener('themechange', onTheme);
    return () => window.removeEventListener('themechange', onTheme);
  }, []);

  const greenColor = "#00ff41";
  const xAxisColor = isLight ? "#d1d5db" : "#0b472d";
  const labelColor = isLight ? "#374151" : "#9ca3af";
  const gridLineColor = isLight ? "rgba(100,116,139,0.18)" : "rgba(148,163,184,0.12)";

  const numberFormatter = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 });

  const firstDatum = Array.isArray(data) && data.length > 0 ? data[0] : {};
  const availableValueKeys = Object.keys(firstDatum).filter((k) => k !== "date");
  const rightAxisSet = new Set((rightAxisKeys || []).map((k) => String(k).toLowerCase()));

  const mapLightColor = (hex) => {
    if (!hex) return hex;
    const h = hex.toLowerCase();
    if (h === '#00ff00') return '#16a34a'; // green → darker
    if (h === '#ff0000') return '#dc2626'; // red → darker
    if (h === '#00bcd4') return '#0891b2'; // cyan → darker
    if (h === '#f59e0b') return '#b45309'; // amber → darker
    if (h === '#00ff41') return '#10b981'; // matrix green → teal-ish
    return hex;
  };

  const effectiveColors = (isLight ? colors.map(mapLightColor) : colors);

  const seriesConfigs = dataKeys.map((label, i) => {
    const lowerLabel = String(label).toLowerCase();
    const matchedKey =
      availableValueKeys.find((k) => k.toLowerCase() === lowerLabel) || String(label);
    const useRightAxis = rightAxisSet.has(lowerLabel) || rightAxisSet.has(matchedKey.toLowerCase());
    return { label: String(label), key: matchedKey, color: effectiveColors[i], yAxisIndex: useRightAxis ? 1 : 0 };
  });

  const series = seriesConfigs.map((cfg) => {
    const base = {
      name: cfg.label,
      type: type === "bar" ? "bar" : "line",
      yAxisIndex: cfg.yAxisIndex,
      data: data.map((d) => [d.date, d[cfg.key]]),
      smooth: true,
      symbol: "none",
      lineStyle: { width: 1, color: cfg.color },
      itemStyle: { color: cfg.color },
    };

    if (type === "area") {
      return { ...base, areaStyle: { color: (cfg.color || "") + "22" } };
    }

    if (type === "bar") {
      return { ...base, itemStyle: { color: cfg.color } };
    }

    return base;
  });

  const watermarkImagePath = "/tartaruga/LOGO.png";
  const [watermarkImageNode, setWatermarkImageNode] = useState(null);

  useEffect(() => {
    if (!isLight) {
      setWatermarkImageNode(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = watermarkImagePath;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        ctx.putImageData(imageData, 0, 0);
        setWatermarkImageNode(canvas);
      } catch (e) {
        setWatermarkImageNode(null);
      }
    };
  }, [isLight]);

  const baseFontSize = isPreview ? 10 : 12;
  const option = {
    backgroundColor: isLight ? "#fff" : "#000",
    textStyle: {
      fontFamily,
      color: labelColor,
      fontSize: baseFontSize,
    },
    title: title
      ? {
          text: title,
          left: "center",
          top: "10px",
          textStyle: { color: (isLight ? "#111" : "#fff"), fontSize: 16, fontWeight: "bold" },
        }
      : undefined,
    tooltip: {
      trigger: "axis",
      backgroundColor: "#000",
      borderColor: "#00ff88",
      textStyle: { color: "#d1ffe8" },
      axisPointer: { type: "line" },
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
        rich[`s${i}`] = { color: effectiveColors[i] || greenColor };
      });
      return {
        show: !isPreview && labels.length > 1,
        data: labels.map((name) => ({ name, icon: "circle" })),
        formatter: (name) => {
          const idx = nameToIndex.get(name) ?? 0;
          return `{s${idx}|${name}}`;
        },
        textStyle: { rich, fontSize: baseFontSize + 2 },
        bottom: 4,
        left: "center",
        orient: "horizontal",
        itemGap: 6,
        itemWidth: 8,
        itemHeight: 8,
        padding: 0,
      };
    })(),
    grid: {
      left: isPreview ? 20 : 36,
      right: isPreview ? 20 : 36,
      top: title ? 44 : 12,
      bottom: isPreview ? 28 : 36,
      containLabel: true,
    },
    graphic: [
      {
        type: "image",
        id: "watermark",
        left: "center",
        top: "middle",
        z: 0,
        silent: true,
        style: {
          image: (isLight && watermarkImageNode) ? watermarkImageNode : watermarkImagePath,
          opacity: isLight ? (isPreview ? 0.08 : 0.06) : (isPreview ? 0.06 : 0.05),
          width: isPreview ? 140 : 220,
          height: isPreview ? 140 : 220,
        },
      },
    ],
    
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
          axisLine: { lineStyle: { color: xAxisColor, opacity: 0.4 } },
          axisLabel: {
            color: labelColor,
            rotate: 0,
            fontSize: baseFontSize - 1,
            interval: (index, value) => visibleLabelIndices.has(index),
            formatter: (value, index) => (visibleLabelIndices.has(index) ? formatMonthYear(value) : ""),
            margin: 6,
            hideOverlap: true,
          },
          axisTick: { show: false },
        },
      };
    })(),
    yAxis: [
      {
        type: "value",
        axisLine: { lineStyle: { color: xAxisColor, opacity: 0.4 } },
        axisLabel: { 
          color: labelColor,
          formatter: (value) => numberFormatter.format(value),
          show: !isPreview,
          inside: false,
          align: "right",
          verticalAlign: "middle",
          margin: 10,
          padding: [0,0,0,0],
          fontSize: baseFontSize,
          hideOverlap: true,
        },
        splitLine: { lineStyle: { color: gridLineColor, type: "dashed" } },
        axisTick: { show: false },
      },
      ...(rightAxisKeys.length > 0
        ? [
            {
              type: "value",
              position: "right",
              axisLine: { lineStyle: { color: xAxisColor, opacity: 0.4 } },
              axisLabel: { 
                color: labelColor,
                formatter: (value) => numberFormatter.format(value),
                show: !isPreview,
                inside: false,
                align: "left",
                verticalAlign: "middle",
                margin: 10,
                fontSize: baseFontSize,
                hideOverlap: true,
              },
              splitLine: { show: false },
              axisTick: { show: false },
            },
          ]
        : []),
    ],
    series,
  };

  const handleOpen = () => {
    if (typeof onOpen === 'function') {
      onOpen();
      return;
    }
    const path = openPath || (to ? `/charts/${to}` : null);
    if (path) {
      window.history.pushState(null, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="relative bg-black rounded-2xl pt-2 px-2 pb-2 shadow-lg border border-gray-700">
      {!detail && (to || openPath || onOpen) && (
        <div className="absolute top-2 right-2 z-30">
          <button
            onClick={handleOpen}
            className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-black"
            title="Apri in dettaglio"
            aria-label="Apri in dettaglio"
          >
            <Maximize2 className="w-4 h-4 hover:cursor-pointer" />
          </button>
        </div>
      )}
      {(() => {
        const effectiveHeight = detail ? Math.max(height, 560) : height;
        return <ReactECharts option={option} style={{ height: effectiveHeight, width: "100%" }} />;
      })()}
    </div>
  );
}
