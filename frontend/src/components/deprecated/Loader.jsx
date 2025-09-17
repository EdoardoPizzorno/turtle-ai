import React from "react";

export default function Loader({ fullscreen = false, label = "Loading" }) {
    return (
        <div
            className={`grid place-items-center gap-3.5 p-6 ${
                fullscreen
                    ? "fixed inset-0 z-[100] bg-[radial-gradient(1000px_400px_at_10%_-10%,rgba(16,185,129,0.08),transparent),linear-gradient(180deg,rgba(7,10,14,0.9),rgba(5,8,12,0.9))]"
                    : ""
            }`}
            aria-live="polite"
            role="status"
        >
            {/* Turtle */}
            <div className="relative w-[180px] h-[120px] animate-turtle-bob" aria-hidden="true">
                {/* Shell */}
                <div className="absolute left-[25px] top-[18px] w-[130px] h-[90px] rounded-[60%_60%_50%_50%/70%_70%_50%_50%] bg-[radial-gradient(120px_80px_at_60%_40%,#2f855a,#14532d)] shadow-[inset_0_0_0_6px_rgba(22,163,74,0.7),0_12px_24px_rgba(0,0,0,0.35)]">
                    <div className="absolute inset-3 rounded-inherit bg-[radial-gradient(closest-side,rgba(0,0,0,0.15),transparent)_25%_35%/34%_34%_no-repeat,radial-gradient(closest-side,rgba(0,0,0,0.15),transparent)_75%_35%/34%_34%_no-repeat,radial-gradient(closest-side,rgba(0,0,0,0.18),transparent)_50%_55%/36%_36%_no-repeat,radial-gradient(closest-side,rgba(255,255,255,0.12),transparent)_50%_35%/22%_22%_no-repeat]" />
                </div>

                {/* Head */}
                <div className="absolute left-[132px] top-[30px] w-[46px] h-[38px] rounded-[50%_60%_50%_50%/60%_70%_40%_40%] bg-[radial-gradient(40px_34px_at_40%_40%,#86efac,#22c55e)] origin-[5%_50%] animate-head-peek">
                    <span className="absolute right-2.5 top-3 w-3 h-3 bg-slate-50 rounded-full grid place-items-center">
                        <span className="w-[5px] h-[5px] bg-slate-900 rounded-full" />
                    </span>
                </div>

                {/* Tail */}
                <div className="absolute left-3 top-16 w-0 h-0 border-l-[12px] border-l-transparent border-r-0 border-r-transparent border-t-[12px] border-t-[#14532d] origin-[100%_0%] animate-tail-wag" />

                {/* Legs */}
                <div className="absolute top-[88px] left-[42px] w-[34px] h-[22px] rounded-[50%_50%_40%_40%/60%_60%_40%_40%] bg-gradient-to-b from-green-600 to-green-900 origin-[10%_10%] animate-leg-front" />
                <div className="absolute top-[88px] left-[18px] w-[34px] h-[22px] rounded-[50%_50%_40%_40%/60%_60%_40%_40%] bg-gradient-to-b from-green-600 to-green-900 origin-[10%_10%] animate-leg-back" />
                <div className="absolute top-[88px] left-[108px] w-[34px] h-[22px] rounded-[50%_50%_40%_40%/60%_60%_40%_40%] bg-gradient-to-b from-green-600 to-green-900 origin-[90%_10%] animate-leg-back" />
                <div className="absolute top-[88px] left-[134px] w-[34px] h-[22px] rounded-[50%_50%_40%_40%/60%_60%_40%_40%] bg-gradient-to-b from-green-600 to-green-900 origin-[90%_10%] animate-leg-front" />
            </div>

            {/* Ground */}
            <div
                className="relative w-[220px] h-[2px] bg-[linear-gradient(90deg,rgba(170,240,207,0.35)_0,rgba(170,240,207,0.05)_50%,rgba(170,240,207,0.35)_100%)] overflow-hidden"
                aria-hidden="true"
            >
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(170,240,207,0.5)_0_12px,rgba(170,240,207,0.1)_12px_24px)] animate-ground-move" />
            </div>

            {/* Label */}
            <div className="text-[#bfeedd] text-sm tracking-[0.3px]">{label}…</div>
        </div>
    );
}
