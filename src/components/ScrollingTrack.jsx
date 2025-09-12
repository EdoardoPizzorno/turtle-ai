import KpiCard from "./elements/KpiCard";

export default function ScrollingTrack({ elements = [], className = "", speed = 20, direction = "left" }) {
  // Duplicate array per effetto loop infinito
  const loopedElements = [...elements, ...elements];

  // Determina l'animazione in base alla direzione
  const animationName = direction === "left" ? "scroll-left" : "scroll-right";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex whitespace-nowrap animate-${animationName}`}
        style={{ animationDuration: `${speed * elements.length}s` }}
      >
        {loopedElements.map((kpi, index) => (
          <KpiCard key={index} kpi={kpi} />
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          display: flex;
          animation-name: scroll-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-scroll-right {
          display: flex;
          animation-name: scroll-right;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
