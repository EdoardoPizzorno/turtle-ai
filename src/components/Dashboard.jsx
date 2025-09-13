import Chart from "./elements/Chart";
import { riskData } from "../static_data/riskData";
import { macroData } from "../static_data/macroData";
import { marketCapData } from "../static_data/markerCapData";
import { dominanceData } from "../static_data/dominanceData";
import { volumeData } from "../static_data/volumeData";

export default function Dashboard() {
    return (
        <div className="flex h-screen w-full bg-gray-900 text-white p-4 gap-4 overflow-hidden">
            {/* Colonna principale */}
            <div className="flex-1 flex flex-col gap-4">
                {/* Riga 1 */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Chart
                            type="area"
                            title="Crypto Risk Indicators"
                            data={riskData}
                            dataKeys={["summary", "price", "onChain"]}
                            colors={["#00ff88", "#00c8ff", "#ff9900"]}
                            className="h-64"
                        />
                    </div>
                    <div className="flex-1">
                        <Chart
                            type="line"
                            title="Macro Recession Indicators"
                            data={macroData}
                            dataKeys={["employment", "income", "production"]}
                            colors={["#00ff00", "#ffcc00", "#ff4444"]}
                            className="h-64"
                        />
                    </div>
                </div>

                {/* Riga 2 */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Chart
                            type="line"
                            title="Total Market Cap"
                            data={marketCapData}
                            dataKeys={["value"]}
                            colors={["#00c8ff"]}
                            className="h-64"
                        />
                    </div>
                    <div className="flex-1">
                        <Chart
                            type="line"
                            title="BTC / ETH Dominance"
                            data={dominanceData}
                            dataKeys={["btc", "eth"]}
                            colors={["#ff9900", "#627eea"]}
                            className="h-64"
                        />
                    </div>
                </div>
            </div>

            {/* Colonna destra */}
            <div className="w-80 flex flex-col gap-4">
                {/* Ultimo video di Fede (statico) */}
                <div className="bg-gray-800 rounded-2xl p-4 shadow-lg">
                    <h2 className="text-lg font-semibold mb-2">Latest Premium Video</h2>
                    <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/isn9zalGFjs?si=zI18v5tIblPxe7R2"
                            allowFullScreen
                            className="rounded-lg"
                        />
                    </div>
                </div>

                {/* Screener */}
                <div className="bg-gray-800 rounded-2xl p-4 shadow-lg flex-1 overflow-hidden">
                    <h2 className="text-lg font-semibold mb-2">Screener</h2>
                    <table className="w-full text-sm font-mono">
                        <thead>
                            <tr className="text-gray-400 uppercase text-xs">
                                <th className="text-left py-2">Asset</th>
                                <th className="text-right py-2">Price</th>
                                <th className="text-right py-2">24h %</th>
                                <th className="text-right py-2">Risk</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-700 transition">
                                <td className="flex items-center gap-2">
                                    BTC <span className="text-gray-400 text-xs">₿</span>
                                </td>
                                <td className="text-right">
                                    $115,997 <span className="text-green-400">↑2.3%</span>
                                </td>
                                <td className="text-right text-green-400">+2.3%</td>
                                <td className="text-right text-red-500 font-bold">0.55</td>
                            </tr>
                            <tr className="hover:bg-gray-700 transition">
                                <td className="flex items-center gap-2">
                                    ETH <span className="text-gray-400 text-xs">Ξ</span>
                                </td>
                                <td className="text-right">
                                    $4,664 <span className="text-red-400">↓1.2%</span>
                                </td>
                                <td className="text-right text-red-400">-1.2%</td>
                                <td className="text-right text-red-500 font-bold">0.71</td>
                            </tr>
                            <tr className="hover:bg-gray-700 transition">
                                <td className="flex items-center gap-2">
                                    ADA <span className="text-gray-400 text-xs">₳</span>
                                </td>
                                <td className="text-right">
                                    $0.93 <span className="text-yellow-400">→0.0%</span>
                                </td>
                                <td className="text-right text-yellow-400">0.0%</td>
                                <td className="text-right text-yellow-400 font-bold">0.58</td>
                            </tr>
                            <tr className="hover:bg-gray-700 transition">
                                <td className="flex items-center gap-2">
                                    DOT <span className="text-gray-400 text-xs">◎</span>
                                </td>
                                <td className="text-right">
                                    $4.51 <span className="text-green-400">↑0.8%</span>
                                </td>
                                <td className="text-right text-green-400">+0.8%</td>
                                <td className="text-right text-green-400 font-bold">0.27</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
