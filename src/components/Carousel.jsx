import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

gsap.registerPlugin(ScrollTrigger);

export default function Carousel() {
  const containerRef = useRef(null);
  const chartsRef = useRef([]);

  // Chart data - separate objects
  const sp500Data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'S&P 500',
      data: [4000, 4200, 3800, 4500, 4700, 4600],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const cryptoData = {
    labels: ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'DOT'],
    datasets: [{
      label: 'Market Cap (B)',
      data: [1.2, 0.8, 0.3, 0.15, 0.4, 0.1],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(52, 211, 153, 0.8)',
        'rgba(34, 197, 94, 0.6)',
        'rgba(16, 185, 129, 0.6)',
        'rgba(52, 211, 153, 0.6)'
      ]
    }]
  };

  const turtleIndexData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Alpha Score',
      data: [0.45, 0.52, 0.48, 0.62],
      borderColor: 'rgb(168, 85, 247)',
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = 3 * window.innerWidth; // 3 charts
      
      gsap.to(containerRef.current, {
        x: -totalWidth + window.innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 8%",
          end: `top -500%`,
          scrub: 1,
          pin: true
        }
      });

      // Animate S&P 500 Chart
      if (chartsRef.current[0]) {
        gsap.fromTo(chartsRef.current[0], 
          {
            opacity: 0,
            scale: 0.8,
            y: 0
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chartsRef.current[0],
              start: "left 80%",
              end: "right 20%",
              containerAnimation: gsap.getById("horizontal-scroll"),
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animate Crypto Chart
      if (chartsRef.current[1]) {
        gsap.fromTo(chartsRef.current[1], 
          {
            opacity: 0,
            scale: 0.8,
            y: 0
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chartsRef.current[1],
              start: "left 80%",
              end: "right 20%",
              containerAnimation: gsap.getById("horizontal-scroll"),
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animate Turtle Index Chart
      if (chartsRef.current[2]) {
        gsap.fromTo(chartsRef.current[2], 
          {
            opacity: 0,
            scale: 0.8,
            y: 0
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chartsRef.current[2],
              start: "left 80%",
              end: "right 20%",
              containerAnimation: gsap.getById("horizontal-scroll"),
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        color: '#f1f5f9',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#94a3b8'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      }
    }
  };

  return (
    <section ref={containerRef} className="py-20 p-20">
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl font-bold text-white mb-4">
          Market Analytics
        </h2>
        <p className="text-slate-300 text-lg">
          Real-time insights powered by TurtleAI
        </p>
      </div>

      <div className="flex m-10">
        {/* S&P 500 Chart */}
        <div 
          ref={el => chartsRef.current[0] = el}
          className="flex-shrink-0 w-screen h-[500px] flex items-center justify-center"
        >
          <div className="w-full max-w-4xl mx-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 shadow-2xl">
              <div className="h-80">
                <Line data={sp500Data} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Crypto Market Cap Chart */}
        <div 
          ref={el => chartsRef.current[1] = el}
          className="flex-shrink-0 w-screen h-[500px] flex items-center justify-center"
        >
          <div className="w-full max-w-4xl mx-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 shadow-2xl">
              <div className="h-80">
                <Bar data={cryptoData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Turtle Index Chart */}
        <div 
          ref={el => chartsRef.current[2] = el}
          className="flex-shrink-0 w-screen h-[500px] flex items-center justify-center"
        >
          <div className="w-full max-w-4xl mx-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 shadow-2xl">
              <div className="h-80">
                <Line data={turtleIndexData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
