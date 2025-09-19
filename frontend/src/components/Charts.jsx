import { useEffect, useMemo, useState } from "react";
import { Maximize2, Star } from "lucide-react";
import Chart from "./elements/Chart";
import { domandeTana } from "../static_data/domandeTana";
import { btcusd } from "../static_data/btcusd";

const CATEGORIES = [
  { id: "favorites", label: "Favorites" },
  { id: "tana-della-tartaruga", label: "Tana della Tartaruga" },
  { id: "risk", label: "Risk" },
  { id: "onchain", label: "On-chain" },
  { id: "momentum", label: "Momentum" },
];

const CHART_META = {
  'BTC vs Domande': {
    slug: 'btc-vs-domande',
    title: 'BTC vs Domande Tana',
    description: 'Descrizione da aggiungere',
    youtube: 'https://www.youtube.com/watch?v=isn9zalGFjs',
  },
  'Domande Area': {
    slug: 'domande-area',
    title: 'Domande Tana (Area)',
    description: 'Descrizione da aggiungere',
    youtube: 'https://www.youtube.com/watch?v=isn9zalGFjs',
  },
  'BTC Line': {
    slug: 'btc-line',
    title: 'BTC (line)',
    description: 'Descrizione da aggiungere',
    youtube: 'https://www.youtube.com/watch?v=isn9zalGFjs',
  },
  'Domande Line': {
    slug: 'domande-line',
    title: 'Domande (line)',
    description: 'Descrizione da aggiungere',
    youtube: 'https://www.youtube.com/watch?v=isn9zalGFjs',
  },
  'Momentum 1': {
    slug: 'momentum-1',
    title: 'Momentum Example 1',
    description: 'Descrizione da aggiungere',
    youtube: 'https://www.youtube.com/watch?v=isn9zalGFjs',
  },
  'Momentum 2': {
    slug: 'momentum-2',
    title: 'Momentum Example 2',
    description: 'Descrizione da aggiungere',
    youtube: 'https://www.youtube.com/watch?v=isn9zalGFjs',
  },
};

const SLUG_TO_ID = Object.fromEntries(Object.entries(CHART_META).map(([id, m]) => [m.slug, id]));

function useMergedSeries() {
  const merged = useMemo(() => {
    const btcArray = Object.entries(btcusd["Time Series (Digital Currency Weekly)"]).map(
      ([date, values]) => ({ date, close: parseFloat(values["4. close"]) })
    );
    const btcSortedByDate = btcArray.sort((a, b) => a.date.localeCompare(b.date));
    const domandeSortedByDate = [...domandeTana].sort((a, b) => a.data.localeCompare(b.data));

    let btcPointer = 0;
    let lastKnownBtcClose = null;
    const out = [];
    for (const domanda of domandeSortedByDate) {
      const domandaDate = domanda.data;
      while (btcPointer < btcSortedByDate.length && btcSortedByDate[btcPointer].date <= domandaDate) {
        lastKnownBtcClose = btcSortedByDate[btcPointer].close;
        btcPointer += 1;
      }
      if (lastKnownBtcClose != null) {
        out.push({ date: domandaDate, btc: lastKnownBtcClose, domande: domanda.numero_domande });
      }
    }
    return out;
  }, []);
  return merged;
}

function Section({ title, children }) {
  const items = Array.isArray(children) ? children : [children];
  const count = items.filter(Boolean).length;
  let gridClass = "grid-cols-1";
  if (count === 1) {
    gridClass = "grid-cols-1";
  } else if (count === 2) {
    gridClass = "grid-cols-3";
  } else if (count === 3 || count === 4) {
    gridClass = "grid-cols-3";
  } else if (count > 4) {
    gridClass = "grid-cols-4";
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-200">{title}</h3>
      <div className={`grid ${gridClass} gap-3`}>
        {items}
      </div>
    </div>
  );
}

export default function Charts() {
  const [active, setActive] = useState("tana-della-tartaruga");
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("turtleai_favCharts") || "[]");
      const arr = Array.isArray(raw) ? raw : [];
      const normalized = arr
        .map((entry) => {
          if (typeof entry !== 'string') return null;
          // If already a slug
          if (SLUG_TO_ID[entry]) return entry;
          // If it's an ID, convert to slug
          if (CHART_META[entry]?.slug) return CHART_META[entry].slug;
          return null;
        })
        .filter(Boolean);
      return normalized;
    } catch {
      return [];
    }
  });
  const [favFilterId, setFavFilterId] = useState(null);
  const merged = useMergedSeries();
  const [detailId, setDetailId] = useState(null);

  // Parse route on mount and listen to history changes
  useEffect(() => {
    const applyPath = () => {
      const path = window.location.pathname;
      if (path.startsWith('/charts/')) {
        const slug = path.split('/')[2];
        const categoryIds = new Set(CATEGORIES.map((c) => c.id));
        if (categoryIds.has(slug)) {
          setActive(slug);
          setDetailId(null);
        } else {
          const id = SLUG_TO_ID[slug];
          setDetailId(id || null);
        }
      } else {
        setDetailId(null);
      }
    };
    applyPath();
    const onPop = () => applyPath();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const toggleFav = (id) => {
    const slug = CHART_META[id]?.slug;
    if (!slug) return;
    setFavorites((prev) => {
      const next = prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug];
      localStorage.setItem("turtleai_favCharts", JSON.stringify(next));
      return next;
    });
  };

  const ChartCard = ({ id, ...props }) => (
    <div className="relative group">
      <div className="absolute inset-x-0 top-2 z-20 flex items-center justify-end gap-2 px-2 pointer-events-none">
        {!detailId && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              const slug = CHART_META[id]?.slug;
              if (slug) { window.history.pushState(null, '', `/charts/${slug}`); window.dispatchEvent(new PopStateEvent('popstate')); }
            }}
            className={`pointer-events-auto ${detailId ? 'text-sm px-3 py-1.5' : 'text-xs px-2 py-1'} rounded bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-black hover:cursor-pointer`}
            title="Apri a schermo intero"
            aria-label="Apri a schermo intero"
          >
            <Maximize2 className={`${detailId ? 'w-5 h-5' : 'w-4 h-4'}`} />
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFav(id); }}
          className={`pointer-events-auto ${detailId ? 'text-sm px-3 py-1.5' : 'text-xs px-2 py-1'} rounded ${favorites.includes(CHART_META[id]?.slug) ? 'bg-yellow-300 text-black' : 'bg-gray-800 text-gray-300'} hover:bg-yellow-600 hover:text-black hover:cursor-pointer`}
          title="Toggle favorite"
          aria-label="Toggle favorite"
        >
          <Star className={`${detailId ? 'w-5 h-5' : 'w-4 h-4'}`} />
        </button>
      </div>
      <Chart {...props} isPreview={!detailId} detail={!!detailId} fontFamily="'Space Grotesk', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif" />
    </div>
  );

  // Helper to render a chart by its id (used in Favorites)
  const renderChartById = (id) => {
    switch (id) {
      case 'BTC vs Domande':
        return (
          <ChartCard
            id="BTC vs Domande"
            type="line"
            title="BTC vs Domande Tana"
            data={merged}
            dataKeys={["BTC", "Domande"]}
            colors={["#00ff00", "#ff0000"]}
            rightAxisKeys={["Domande"]}
            height={300}
          />
        );
      case 'Domande Area':
        return (
          <ChartCard
            id="Domande Area"
            type="area"
            title="Domande Tana (Area)"
            data={merged}
            dataKeys={["Domande"]}
            colors={["#ff0000"]}
            rightAxisKeys={[]}
            height={300}
          />
        );
      case 'BTC Line':
        return (
          <ChartCard
            id="BTC Line"
            type="line"
            title="BTC (line)"
            data={merged.map(({ date, btc }) => ({ date, btc }))}
            dataKeys={["BTC"]}
            colors={["#00ff00"]}
            rightAxisKeys={[]}
            height={300}
          />
        );
      case 'Domande Line':
        return (
          <ChartCard
            id="Domande Line"
            type="line"
            title="Domande (line)"
            data={merged.map(({ date, domande }) => ({ date, domande }))}
            dataKeys={["Domande"]}
            colors={["#ff0000"]}
            rightAxisKeys={[]}
            height={300}
          />
        );
      case 'Momentum 1':
        return (
          <ChartCard
            id="Momentum 1"
            type="line"
            title="Momentum Example 1"
            data={merged}
            dataKeys={["BTC"]}
            colors={["#00bcd4"]}
            rightAxisKeys={[]}
            height={300}
          />
        );
      case 'Momentum 2':
        return (
          <ChartCard
            id="Momentum 2"
            type="line"
            title="Momentum Example 2"
            data={merged}
            dataKeys={["Domande"]}
            colors={["#f59e0b"]}
            rightAxisKeys={[]}
            height={300}
          />
        );
      default:
        return (
          <div key={id} className="rounded-2xl border border-gray-700 flex items-center justify-center h-[300px] text-gray-500">{id}</div>
        );
    }
  };

  return (
    <div className="w-full min-h-[70vh] bg-black text-white p-4 gap-4 overflow-hidden flex">
      {/* Sidebar */}
      <aside className="w-64 pr-4 border-r border-gray-800">
        <div className="mb-6">
          <h4 className="text-xs uppercase text-gray-400 mb-2">Categories</h4>
          <ul className="space-y-1">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-900 hover:cursor-pointer ${active === c.id ? 'bg-gray-900 text-white' : 'text-gray-300'}`}
                  onClick={() => {
                    setActive(c.id);
                    setDetailId(null);
                    window.history.pushState(null, '', `/charts/${c.id}`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase text-gray-400 mb-2">Favorites</h4>
          {favorites.length === 0 ? (
            <p className="text-sm text-gray-500">Nessun preferito</p>
          ) : (
            <ul className="text-sm text-gray-300 space-y-1">
            {favorites.map((slug) => {
              const id = SLUG_TO_ID[slug];
              if (!id) return null;
              const label = CHART_META[id]?.title || id;
              return (
                <li key={slug}>
                  <button
                    className={`w-full text-left px-2 py-1 rounded hover:cursor-pointer ${favFilterId === id && active === 'favorites' ? 'bg-gray-800 text-white' : 'bg-gray-900 hover:bg-gray-800'}`}
                    onClick={() => {
                      setActive('favorites');
                      setFavFilterId(id);
                      setDetailId(null);
                      window.history.pushState(null, '', `/charts/${slug}`);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                  >{label}</button>
                </li>
              );
            })}
            </ul>
          )}
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 pl-4">
        {/* Detail view */}
        {detailId && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">{CHART_META[detailId]?.title || detailId}</h3>
            <div className="rounded-2xl overflow-hidden">
              {renderChartById(detailId)}
            </div>
            <div className="mt-4 text-gray-300">
              <p className="mb-3">{CHART_META[detailId]?.description}</p>
              {CHART_META[detailId]?.youtube && (
                <a
                  href={CHART_META[detailId].youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Guarda il video su YouTube
                </a>
              )}
            </div>
          </div>
        )}
        {!detailId && active === 'tana-della-tartaruga' && (
          <>
            <Section title="Tana della Tartaruga">
              <ChartCard
                id="BTC vs Domande"
                type="line"
                title="BTC vs Domande Tana"
                data={merged}
                dataKeys={["BTC", "Domande"]}
                colors={["#00ff00", "#ff0000"]}
                rightAxisKeys={["Domande"]}
                height={300}
              />
              <ChartCard
                id="Domande Area"
                type="area"
                title="Domande Tana (Area)"
                data={merged}
                dataKeys={["Domande"]}
                colors={["#ff0000"]}
                rightAxisKeys={[]}
                height={300}
              />
              <ChartCard
                id="BTC Line"
                type="line"
                title="BTC (line)"
                data={merged.map(({ date, btc }) => ({ date, btc }))}
                dataKeys={["BTC"]}
                colors={["#00ff00"]}
                rightAxisKeys={[]}
                height={300}
              />
              <ChartCard
                id="Domande Line"
                type="line"
                title="Domande (line)"
                data={merged.map(({ date, domande }) => ({ date, domande }))}
                dataKeys={["Domande"]}
                colors={["#ff0000"]}
                rightAxisKeys={[]}
                height={300}
              />
            </Section>

            <Section title="Momentum">
              <ChartCard
                id="Momentum 1"
                type="line"
                title="Momentum Example 1"
                data={merged}
                dataKeys={["BTC"]}
                colors={["#00bcd4"]}
                rightAxisKeys={[]}
                height={300}
              />
              <ChartCard
                id="Momentum 2"
                type="line"
                title="Momentum Example 2"
                data={merged}
                dataKeys={["Domande"]}
                colors={["#f59e0b"]}
                rightAxisKeys={[]}
                height={300}
              />
              <div className="rounded-2xl border border-gray-700 flex items-center justify-center text-gray-500">Coming soon</div>
              <div className="rounded-2xl border border-gray-700 flex items-center justify-center text-gray-500">Coming soon</div>
            </Section>
          </>
        )}

        {!detailId && active === 'risk' && (
          <Section title="Risk">
            <div className="rounded-2xl border border-gray-700 flex items-center justify-center h-[300px] text-gray-500">Risk charts here</div>
            <div className="rounded-2xl border border-gray-700 flex items-center justify-center h-[300px] text-gray-500">Risk charts here</div>
            <div className="rounded-2xl border border-gray-700 flex items-center justify-center h-[300px] text-gray-500">Risk charts here</div>
            <div className="rounded-2xl border border-gray-700 flex items-center justify-center h-[300px] text-gray-500">Risk charts here</div>
          </Section>
        )}

        {!detailId && active === 'onchain' && (
          <Section title="On-chain">
            <div className="rounded-2xl border border-gray-700 flex items-center justify-center h-[300px] text-gray-500">On-chain charts</div>
            <div className="rounded-2xl border border-gray-700 flex items-center justify-center h-[300px] text-gray-500">On-chain charts</div>
            <div className="rounded-2xl border border-gray-700 flex items-center justify-center h-[300px] text-gray-500">On-chain charts</div>
            <div className="rounded-2xl border border-gray-700 flex items-center justify-center h-[300px] text-gray-500">On-chain charts</div>
          </Section>
        )}
        {!detailId && active === 'favorites' && (
          <Section title={favFilterId ? `Favorites: ${favFilterId}` : 'Favorites'}>
            {(favFilterId ? [favFilterId] : favorites).map((id) => (
              <div key={id}>{renderChartById(id)}</div>
            ))}
          </Section>
        )}
      </main>
    </div>
  );
}
