import Chart from "./elements/Chart";
import VideoCard from "./elements/VideoCard";
import Screener from "./Screener";
import { useMergedBtcDomande } from "../hooks/useMergedBtcDomande";

export default function Dashboard() {
    const mergedBtcDomande = useMergedBtcDomande();

    return (
        <div className="flex min-h-screen w-full bg-black text-white p-4 gap-4 overflow-y-auto overflow-x-hidden">
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
                            height={283}
                            isPreview
                            to="btc-vs-domande"
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
                            height={283}
                            isPreview
                            to="btc-vs-domande"
                        />
                    </div>

                </div>

                <div className="flex gap-4">

                    <div className="flex-1">
                        <Chart
                            type="line"
                            title="BTC vs Domande Tana"
                            data={mergedBtcDomande}
                            dataKeys={["BTC", "Domande"]}
                            colors={["#00ff00", "#ff0000"]}
                            rightAxisKeys={["Domande"]}
                            height={283}
                            isPreview
                            to="btc-vs-domande"
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
                            height={283}
                            isPreview
                            to="btc-line"
                        />
                    </div>

                </div>

            </div>

            {/* Colonna destra */}
            <div className="w-80 flex flex-col gap-4">
                <VideoCard
                    title="Guarda il mio ultimo video"
                    videoUrl="https://www.youtube.com/embed/isn9zalGFjs?si=zI18v5tIblPxe7R2"
                />

                <Screener limit={6} />
            </div>
        </div>
    );
}
