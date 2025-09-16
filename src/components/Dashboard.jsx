import Chart from "./elements/Chart"; 
import VideoCard from "./elements/VideoCard";
import Screener from "./Screener";
import { useMergedBtcDomande } from "../hooks/useMergedBtcDomande";

export default function Dashboard() {
    const mergedBtcDomande = useMergedBtcDomande();

    return (
        <div className="flex h-screen w-full bg-black text-white p-4 gap-4 overflow-hidden">
            {/* Colonna principale */}
            <div className="flex-1 flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Chart
                            type="line"
                            title="BTC vs Domande Tana"
                            data={mergedBtcDomande}
                            dataKeys={["BTC", "Domande"]}
                            colors={["#00ff00", "#ff0000"]}
                            rightAxisKeys={["Domande"]}
                            height={324}
                        />
                    </div>

                    <div className="flex-1">
                        <Chart
                            type="line"
                            title="BTC vs Iscritti Tana"
                            data={mergedBtcDomande}
                            dataKeys={["BTC", "Iscritti"]}
                            colors={["#00ff00", "#ff0000"]}
                            rightAxisKeys={["Iscritti"]}
                            height={324}
                        />
                    </div>
                </div>
            </div>

            {/* Colonna destra */}
            <div className="w-80 flex flex-col gap-4">
                <VideoCard
                    title="Latest Premium Video"
                    videoUrl="https://www.youtube.com/embed/isn9zalGFjs?si=zI18v5tIblPxe7R2"
                />

                <Screener
                    assets={[
                        { symbol: "BTC", icon: "₿", price: "$115,997 ↑2.3%", change: 2.3, risk: 0.55 },
                        { symbol: "ETH", icon: "Ξ", price: "$4,664 ↓1.2%", change: -1.2, risk: 0.71 },
                        { symbol: "ADA", icon: "₳", price: "$0.93 →0.0%", change: 0.0, risk: 0.58 },
                        { symbol: "DOT", icon: "◎", price: "$4.51 ↑0.8%", change: 0.8, risk: 0.27 },
                    ]}
                />
            </div>
        </div>
    );
}
