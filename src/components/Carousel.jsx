import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { SplitText } from "gsap/all";
import DecryptedText from './elements/DecryptedText.jsx';
import ShinyText from './elements/ShinyText.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

gsap.registerPlugin(ScrollTrigger);

const sp500Data = {
    labels: ['Jan 2023', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan 2024', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'S&P 500',
        data: [3850, 4120, 3950, 4280, 4450, 4320, 4580, 4420, 4650, 4380, 4520, 4750, 4850, 4980, 5120, 4950, 5080, 5250, 5180, 5320, 5450, 5280, 5420, 5650],
        borderColor: '#00ff88',
        backgroundColor: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 255, 0.1) 50%, rgba(138, 43, 226, 0.1) 100%)',
        tension: 0.4,
        fill: true,
        borderWidth: 4,
        pointBackgroundColor: '#00ff88',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#00ff88',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3
    }]
};

const cryptoData = {
    labels: ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'DOT', 'MATIC', 'AVAX', 'LINK', 'UNI', 'ATOM', 'FTM', 'NEAR', 'ALGO', 'VET', 'ICP', 'THETA', 'FIL', 'TRX', 'XLM'],
    datasets: [{
        label: 'Market Cap (B)',
        data: [1.8, 1.2, 0.45, 0.28, 0.65, 0.18, 0.32, 0.42, 0.25, 0.38, 0.22, 0.15, 0.35, 0.19, 0.31, 0.24, 0.27, 0.21, 0.33, 0.16],
        backgroundColor: [
            'linear-gradient(135deg, #00ff88, #00ffaa)',
            'linear-gradient(135deg, #00ffaa, #00ffcc)',
            'linear-gradient(135deg, #00ffcc, #00ffee)',
            'linear-gradient(135deg, #00ffee, #00ffff)',
            'linear-gradient(135deg, #00ffff, #00aaff)',
            'linear-gradient(135deg, #00aaff, #0088ff)',
            'linear-gradient(135deg, #0088ff, #0066ff)',
            'linear-gradient(135deg, #0066ff, #8844ff)',
            'linear-gradient(135deg, #8844ff, #aa44ff)',
            'linear-gradient(135deg, #aa44ff, #cc44ff)',
            'linear-gradient(135deg, #cc44ff, #ee44ff)',
            'linear-gradient(135deg, #ee44ff, #ff44ee)',
            'linear-gradient(135deg, #ff44ee, #ff44cc)',
            'linear-gradient(135deg, #ff44cc, #ff44aa)',
            'linear-gradient(135deg, #ff44aa, #ff4488)',
            'linear-gradient(135deg, #ff4488, #ff4466)',
            'linear-gradient(135deg, #ff4466, #ff6644)',
            'linear-gradient(135deg, #ff6644, #ff8844)',
            'linear-gradient(135deg, #ff8844, #ffaa44)',
            'linear-gradient(135deg, #ffaa44, #ffcc44)'
        ],
        borderColor: '#00ff88',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
    }]
};

const turtleIndexData = {
    labels: ['Q1 2022', 'Q2', 'Q3', 'Q4', 'Q1 2023', 'Q2', 'Q3', 'Q4', 'Q1 2024', 'Q2', 'Q3', 'Q4', 'Q1 2025', 'Q2', 'Q3', 'Q4'],
    datasets: [{
        label: 'Alpha Score',
        data: [0.32, 0.45, 0.38, 0.52, 0.48, 0.61, 0.55, 0.68, 0.72, 0.65, 0.78, 0.82, 0.85, 0.79, 0.88, 0.92],
        borderColor: '#8a2be2',
        backgroundColor: 'linear-gradient(135deg, rgba(138, 43, 226, 0.3) 0%, rgba(0, 255, 136, 0.2) 50%, rgba(0, 255, 255, 0.1) 100%)',
        tension: 0.3,
        fill: true,
        borderWidth: 4,
        pointBackgroundColor: '#8a2be2',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: '#8a2be2',
        pointHoverBorderColor: '#00ff88',
        pointHoverBorderWidth: 4,
        pointStyle: 'circle',
        pointRotation: 0
    }]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#059669',
            bodyColor: '#1f2937',
            borderColor: '#10b981',
            borderWidth: 1,
            cornerRadius: 12,
            displayColors: false,
        }
    },
    scales: {
        x: {
            ticks: { color: '#059669', font: { size: 11, weight: '600' } },
            grid: { display: false }
        },
        y: {
            ticks: { color: '#059669', font: { size: 11, weight: '600' } },
            grid: { color: 'rgba(16,185,129,0.1)' }
        }
    }
};

export default function Carousel() {
    const chartsSectionRef = useRef(null);
    const chartsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const totalWidth = 3 * window.innerWidth;

            gsap.to(chartsSectionRef.current, {
                x: -totalWidth + window.innerWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: chartsSectionRef.current,
                    start: "top 0%",
                    end: `top -500%`,
                    scrub: 1,
                    pin: true
                }
            });
        }, chartsSectionRef);

        return () => ctx.revert();
    })

    return (
        <section className="py-30 p-20 bg-white">
            <div className="text-center mb-16 px-4" id="title">
                <DecryptedText
                    text="Market Analytics"
                    animateOn="view"
                    revealDirection="center"
                    className="text-4xl md:text-5xl font-extrabold text-slate-700 mb-4"
                />
                <br />
                <ShinyText
                    text="Real-time insights powered by TurtleAI"
                    disabled={false}
                    speed={3}
                    className="text-lg md:text-xl font-medium mt-3"
                />
            </div>

            <div className="flex m-10" ref={chartsSectionRef}>
                {/* S&P 500 Chart */}
                <div
                    ref={el => chartsRef.current[0] = el}
                    className="flex-shrink-0 w-screen h-[450px] flex items-center justify-center"
                >
                    <div className="w-full max-w-xl mx-5">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg m-5">
                            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl p-6 shadow-md overflow-hidden">
                                <h3 className="text-xl font-bold text-slate-700 mb-4 text-center">
                                    S&amp;P 500 Performance
                                </h3>
                                <div className="h-[300px]">
                                    <Line data={sp500Data} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Crypto Market Cap Chart */}
                <div
                    ref={el => chartsRef.current[1] = el}
                    className="flex-shrink-0 w-screen h-[450px] flex items-center justify-center"
                >
                    <div className="w-full max-w-xl mx-5">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg m-5">
                            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl p-6 shadow-md overflow-hidden">
                                <h3 className="text-xl font-bold text-emerald-600 mb-4 text-center">
                                    Crypto Market Cap
                                </h3>
                                <div className="h-[300px]">
                                    <Bar data={cryptoData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Turtle Index Chart */}
                <div
                    ref={el => chartsRef.current[2] = el}
                    className="flex-shrink-0 w-screen h-[450px] flex items-center justify-center"
                >
                    <div className="w-full max-w-xl mx-5">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg m-5">
                            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-2xl p-6 shadow-md overflow-hidden">
                                <h3 className="text-xl font-bold text-purple-600 mb-4 text-center">
                                    Turtle Index Alpha
                                </h3>
                                <div className="h-[300px]">
                                    <Line data={turtleIndexData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
