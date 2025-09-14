import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Chart({ type = "line", data, dataKeys = [], colors = [], title, height = 250, rightAxisKeys = [] }) {
    const ChartComponent = type === "line" ? LineChart : type === "area" ? AreaChart : BarChart;

    return (
        <div className="bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-700">
            {title && <h2 className="text-lg font-semibold mb-2 text-gray-200">{title}</h2>}
            <ResponsiveContainer width="100%" height={height}>
                <ChartComponent data={data}>
                    <CartesianGrid horizontal={false} vertical strokeDasharray="1 8" stroke="rgba(0,255,140,0.12)" />
                    <XAxis dataKey="date" stroke="#0b472d" tick={{ fill: "#66ffb3" }} axisLine={{ stroke: "#0b472d" }} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#0b472d" tick={{ fill: "#66ffb3" }} axisLine={{ stroke: "#0b472d" }} tickLine={false} />
                    {rightAxisKeys.length > 0 && (
                        <YAxis yAxisId="right" orientation="right" stroke="#0b472d" tick={{ fill: "#66ffb3" }} axisLine={{ stroke: "#0b472d" }} tickLine={false} />
                    )}
                    <Tooltip contentStyle={{ backgroundColor: "#081c11", border: "1px solid #00ff88" }} itemStyle={{ color: "#d1ffe8" }} labelStyle={{ color: "#66ffb3" }} />
                    <Legend wrapperStyle={{ color: "#66ffb3" }} />
                    {dataKeys.map((key, i) => {
                        const axisId = rightAxisKeys.includes(key) ? "right" : "left";
                        return type === "line" ? (
                            <Line key={key} yAxisId={axisId} type="monotone" dataKey={key} stroke={colors[i]} strokeWidth={1} strokeOpacity={0.9} dot={false} />
                        ) : type === "area" ? (
                            <Area key={key} yAxisId={axisId} type="monotone" dataKey={key} stroke={colors[i]} fill={colors[i] + "33"} strokeWidth={1} />
                        ) : (
                            <Bar key={key} yAxisId={axisId} dataKey={key} fill={colors[i]} />
                        );
                    })}
                </ChartComponent>
            </ResponsiveContainer>
        </div>
    );
}