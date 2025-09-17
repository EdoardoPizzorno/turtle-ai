import { btcusd } from "../static_data/btcusd";
import { domandeTana } from "../static_data/domandeTana";

export function useMergedBtcDomande() {
    const btcArray = Object.entries(btcusd["Time Series (Digital Currency Weekly)"]).map(
        ([date, values]) => ({
            date,
            close: parseFloat(values["4. close"]),
        })
    );

    const btcSortedByDate = btcArray.sort((a, b) => a.date.localeCompare(b.date));
    const domandeSortedByDate = [...domandeTana].sort((a, b) =>
        a.data.localeCompare(b.data)
    );

    let btcPointer = 0;
    let lastKnownBtcClose = null;
    const merged = [];

    for (const domanda of domandeSortedByDate) {
        const domandaDate = domanda.data;

        while (
            btcPointer < btcSortedByDate.length &&
            btcSortedByDate[btcPointer].date <= domandaDate
        ) {
            lastKnownBtcClose = btcSortedByDate[btcPointer].close;
            btcPointer += 1;
        }

        if (lastKnownBtcClose != null) {
            merged.push({
                date: domandaDate,
                btc: lastKnownBtcClose,
                domande: domanda.numero_domande,
                iscritti: domanda.iscritti ?? null,
            });
        }
    }

    return merged;
}
