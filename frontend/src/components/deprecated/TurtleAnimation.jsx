import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TurtleAnimation() {
    const containerRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const pieces = gsap.utils.toArray(".piece");
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.fromTo(
                pieces,
                {
                    opacity: 0,
                    scale: 3,
                    rotation: 90,
                    filter: "blur(20px)",
                    transformOrigin: "50% 50%",
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    filter: "blur(0px)",
                    duration: 0.5,
                    stagger: { each: 0.05, from: "center" },
                }
            );

            tl.to(
                '[alt="Centro guscio"]',
                {
                    scale: 1.1,
                    duration: 0.2,
                    ease: "back.out(4)",
                    yoyo: true,
                    repeat: 1,
                },
                "-=0.2"
            );

            tl.to(containerRef.current, {
                scale: 0.05,
                x: "-30vw",
                y: "-2.5vh",
                transformOrigin: "top left",
                duration: 1,
                delay: 0.5,
                ease: "power2.inOut",
            });

            tl.to(overlayRef.current, { opacity: 0, duration: 0.5 }, "-=0.5");
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div
                ref={overlayRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "black",
                    opacity: 0.95,
                    zIndex: 999,
                }}
            />
            <div
                ref={containerRef}
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 520,
                    height: 640,
                    zIndex: 1000,
                }}
            >
                <img src="/tartaruga/testa.png" alt="Testa" className="piece" style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 100 }} />
                <img src="/tartaruga/petto_sinistro.png" alt="Petto sinistro" className="piece" style={{ position: "absolute", top: 135, left: 132, width: 130 }} />
                <img src="/tartaruga/petto_destro.png" alt="Petto destro" className="piece" style={{ position: "absolute", top: 135, left: 257, width: 130 }} />
                <img src="/tartaruga/ala_destra.png" alt="Ala destra" className="piece" style={{ position: "absolute", top: 160, left: 355, width: 120 }} />
                <img src="/tartaruga/ala_sinistra.png" alt="Ala sinistra" className="piece" style={{ position: "absolute", top: 160, left: 46, width: 120 }} />
                <img src="/tartaruga/centro.png" alt="Centro guscio" className="piece" style={{ position: "absolute", top: 236, left: "50%", transform: "translateX(-50%)", width: 100 }} />
                <img src="/tartaruga/polmone_destro.png" alt="Polmone destro" className="piece" style={{ position: "absolute", top: 259, left: 310, width: 86 }} />
                <img src="/tartaruga/polmone_sinistro.png" alt="Polmone sinistro" className="piece" style={{ position: "absolute", top: 254, left: 120, width: 90 }} />
                <img src="/tartaruga/rene_destro.png" alt="Rene destro" className="piece" style={{ position: "absolute", top: 355, left: 262, width: 97 }} />
                <img src="/tartaruga/rene_sinistro.png" alt="Rene sinistro" className="piece" style={{ position: "absolute", top: 354, left: 159, width: 99 }} />
                <img src="/tartaruga/zampa_destra.png" alt="Zampa destra" className="piece" style={{ position: "absolute", top: 410, left: 310, width: 80 }} />
                <img src="/tartaruga/zampa_sinistra.png" alt="Zampa sinistra" className="piece" style={{ position: "absolute", top: 410, left: 128, width: 80 }} />
                <img src="/tartaruga/coda.png" alt="Coda" className="piece" style={{ position: "absolute", bottom: 115, left: "50%", transform: "translateX(-50%)", width: 60 }} />
            </div>
        </>
    );
}
