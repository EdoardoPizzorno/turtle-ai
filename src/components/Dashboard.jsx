import { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Maximize2, TrendingUp, BarChart3, PieChart, X } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra i componenti Chart.js necessari
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Componente singolo grafico
const ChartCard = ({ title, chart, icon: Icon, onMaximize }) => (
  <div className="bg-white rounded-lg shadow-lg p-4 h-80 flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <button
        onClick={() => onMaximize(title, chart)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        title="Ingrandisci grafico"
      >
        <Maximize2 className="w-4 h-4 text-gray-600" />
      </button>
    </div>
    <div className="flex-1">
      {chart}
    </div>
  </div>
);

// Componente Modal per grafici ingranditi
const ChartModal = ({ isOpen, onClose, title, chart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-5/6 flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="flex-1 p-6">
          {chart}
        </div>
      </div>
    </div>
  );
};

// Componente Screener Crypto
const CryptoScreener = () => {
  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43250, change: 2.5, volume: '28.5B' },
    { symbol: 'ETH', name: 'Ethereum', price: 2850, change: -1.2, volume: '15.2B' },
    { symbol: 'BNB', name: 'Binance Coin', price: 315, change: 0.8, volume: '2.1B' },
    { symbol: 'SOL', name: 'Solana', price: 98, change: 4.2, volume: '1.8B' },
    { symbol: 'XRP', name: 'XRP', price: 0.52, change: -2.1, volume: '1.2B' },
    { symbol: 'ADA', name: 'Cardano', price: 0.48, change: 1.5, volume: '800M' },
    { symbol: 'AVAX', name: 'Avalanche', price: 28, change: 3.1, volume: '600M' },
    { symbol: 'DOT', name: 'Polkadot', price: 7.2, change: -0.5, volume: '300M' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Crypto Screener</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {cryptos.map((crypto) => (
            <div key={crypto.symbol} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-800">{crypto.symbol}</div>
                  <div className="text-xs text-gray-500">{crypto.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${crypto.price.toLocaleString()}</div>
                  <div className={`text-xs ${crypto.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Vol: {crypto.volume}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [modalData, setModalData] = useState({ isOpen: false, title: '', chart: null });

  // Dati di esempio per i grafici
  const lineChartData = {
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
    datasets: [
      {
        label: 'Prezzo BTC',
        data: [35000, 38000, 42000, 39000, 43000, 45000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['BTC', 'ETH', 'BNB', 'SOL', 'XRP'],
    datasets: [
      {
        label: 'Volume (B$)',
        data: [28.5, 15.2, 2.1, 1.8, 1.2],
        backgroundColor: [
          'rgba(249, 115, 22, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Bitcoin', 'Ethereum', 'Altri'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#f59e0b', '#10b981', '#6b7280'],
        hoverBackgroundColor: ['#d97706', '#059669', '#4b5563'],
      },
    ],
  };

  const candlestickData = {
    labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    datasets: [
      {
        label: 'ETH/USDT',
        data: [2800, 2850, 2820, 2880, 2860, 2900],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const handleMaximize = (title, chart) => {
    setModalData({ isOpen: true, title, chart });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, title: '', chart: null });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Trading</h1>
        
        <div className="flex gap-6">
          {/* Sezione Grafici (3/4 della larghezza) */}
          <div className="w-3/4">
            <div className="grid grid-cols-2 gap-4">
              {/* Grafico Linea - Bitcoin */}
              <ChartCard
                title="Andamento Bitcoin"
                chart={<Line data={lineChartData} options={chartOptions} />}
                icon={TrendingUp}
                onMaximize={handleMaximize}
              />

              {/* Grafico Barre - Volume */}
              <ChartCard
                title="Volume Crypto"
                chart={<Bar data={barChartData} options={chartOptions} />}
                icon={BarChart3}
                onMaximize={handleMaximize}
              />

              {/* Grafico Ethereum */}
              <ChartCard
                title="Ethereum Prezzo"
                chart={<Line data={candlestickData} options={chartOptions} />}
                icon={TrendingUp}
                onMaximize={handleMaximize}
              />

              {/* Grafico Torta - Market Cap */}
              <ChartCard
                title="Market Cap Distribution"
                chart={<Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />}
                icon={PieChart}
                onMaximize={handleMaximize}
              />
            </div>
          </div>

          {/* Sezione Screener (1/4 della larghezza) */}
          <div className="w-1/4">
            <CryptoScreener />
          </div>
        </div>
      </div>

      {/* Modal per grafici ingranditi */}
      <ChartModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        chart={modalData.chart}
      />
    </div>
  );
};

export default Dashboard;