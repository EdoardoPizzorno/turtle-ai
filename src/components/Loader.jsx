import React from "react";

export default function Loader({ fullscreen = false, label = "Loading" }) {
    return (
        <div className={`loader ${fullscreen ? "loader-fullscreen" : ""}`} aria-live="polite" role="status">
            <div className="turtle-css" aria-hidden="true">
                <div className="shell">
                    <div className="scutes" />
                </div>
                <div className="head">
                    <span className="eye">
                        <span className="pupil" />
                    </span>
                </div>
                <div className="tail" />
                <div className="leg leg-front-left" />
                <div className="leg leg-front-right" />
                <div className="leg leg-back-left" />
                <div className="leg leg-back-right" />
            </div>

            <div className="ground" aria-hidden="true" />
            <div className="loader-label">{label}…</div>
        </div>
    );
}


