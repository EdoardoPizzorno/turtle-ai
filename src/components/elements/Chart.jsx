import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Chart({ type = "line", data, dataKeys = [], colors = [], title, height = 250 }) {
    const ChartComponent = type === "line" ? LineChart : type === "area" ? AreaChart : BarChart;

    return (
        <div className="bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-700">
            {title && <h2 className="text-lg font-semibold mb-2 text-gray-200">{title}</h2>}
            <ResponsiveContainer width="100%" height={height}>
                <ChartComponent data={data}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#333" />
                    <XAxis dataKey="date" stroke="#555" tick={{ fill: "#888" }} />
                    <YAxis stroke="#555" tick={{ fill: "#888" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#222", border: "1px solid #444" }} itemStyle={{ color: "#fff" }} labelStyle={{ color: "#aaa" }} />
                    <Legend wrapperStyle={{ color: "#bbb" }} />
                    {dataKeys.map((key, i) =>
                        type === "line" ? (
                            <Line key={key} type="monotone" dataKey={key} stroke={colors[i]} strokeWidth={2} />
                        ) : type === "area" ? (
                            <Area key={key} type="monotone" dataKey={key} stroke={colors[i]} fill={colors[i] + "33"} strokeWidth={2} />
                        ) : (
                            <Bar key={key} dataKey={key} fill={colors[i]} />
                        )
                    )}
                </ChartComponent>
            </ResponsiveContainer>
        </div>
    );
}