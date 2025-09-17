import Chart from "./elements/Chart";
import { domandeTana } from "../static_data/domandeTana";
import { btcusd } from "../static_data/btcusd";

export default function Charts() {
  // Build BTC array from weekly series
  const btcArray = Object.entries(btcusd["Time Series (Digital Currency Weekly)"]).map(
    ([date, values]) => ({ date, close: parseFloat(values["4. close"]) })
  );
  const btcSortedByDate = btcArray.sort((a, b) => a.date.localeCompare(b.date));
  const domandeSortedByDate = [...domandeTana].sort((a, b) => a.data.localeCompare(b.data));

  let btcPointer = 0;
  let lastKnownBtcClose = null;
  const merged = [];
  for (const domanda of domandeSortedByDate) {
    const domandaDate = domanda.data;
    while (btcPointer < btcSortedByDate.length && btcSortedByDate[btcPointer].date <= domandaDate) {
      lastKnownBtcClose = btcSortedByDate[btcPointer].close;
      btcPointer += 1;
    }
    if (lastKnownBtcClose != null) {
      merged.push({ date: domandaDate, btc: lastKnownBtcClose, domande: domanda.numero_domande });
    }
  }

  return (
    <div className="w-full min-h-[70vh] bg-black text-white p-4 gap-4 overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Tutti i grafici</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Chart
          type="line"
          title="BTC vs Domande Tana"
          data={merged}
          dataKeys={["BTC", "Domande"]}
          colors={["#00ff00", "#ff0000"]}
          rightAxisKeys={["Domande"]}
          height={320}
        />
        <Chart
          type="area"
          title="Domande Tana (Area)"
          data={merged}
          dataKeys={["Domande"]}
          colors={["#ff0000"]}
          rightAxisKeys={[]}
          height={320}
        />
      </div>
    </div>
  );
}


