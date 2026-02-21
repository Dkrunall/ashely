"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence } from "framer-motion";

// Precise coordinates for all gig locations
const MARKERS = [
    { location: [19.0760, 72.8777], size: 0.15, label: "MUMBAI" },
    { location: [18.5204, 73.8567], size: 0.12, label: "PUNE" },
    { location: [28.7041, 77.1025], size: 0.12, label: "DELHI" },
    { location: [30.7333, 76.7794], size: 0.08, label: "CHANDIGARH" },
    { location: [22.7196, 75.8577], size: 0.08, label: "INDORE" },
    { location: [21.1458, 79.0882], size: 0.08, label: "NAGPUR" },
    { location: [15.2993, 74.1240], size: 0.12, label: "GOA" },
    { location: [26.7271, 88.3953], size: 0.08, label: "SILIGURI" },
    { location: [26.8467, 80.9462], size: 0.08, label: "LUCKNOW" },
    { location: [13.0827, 80.2707], size: 0.12, label: "CHENNAI" },
    { location: [13.7563, 100.5018], size: 0.15, label: "BANGKOK" },
    { location: [25.2048, 55.2708], size: 0.15, label: "DUBAI" },
];

// Venue Data incorporated into the Global Map Section
const venues = {
    "Mumbai Base": [
        "Opa bar and cafe", "Mitron", "Mansion", "House of Pandora", "Raasta",
        "Rodeo Drive India", "The Stables India", "St Regis",
        "Taki Taki", "Tori", "AntiSocial", "Malad Social", "Su Casa",
        "Roofberries", "The Scene", "Bombay Cocktail Bar", "Hard Rock Cafe", "Hoppipola"
    ],
    "Pune & Delhi": [
        "Kakuna (Pune)", "High Spirits Cafe (Pune)", "Nuvo Sheraton Grand (Pune)", "Vault JW Marriott (Pune)", "Elephant & Co (Pune)",
        "Playboy (Delhi)", "Dabo (Delhi)"
    ],
    "National & Int.": [
        "Chandigarh", "Indore (The Piano Project, Coco Loco, Cocktails and Dreams)", "Nagpur", "Bangkok", "Dubai"
    ],
    "Massive Open Air": [
        "Jio World Centre w/ Rashmeet Kaur", "Jio World Garden (India Cocktail Week)",
        "Nesco Centre Holi", "Peninsula Grand Lawn (Holi)",
        "MMRDA BKC w/ Sukhwinder Singh", "MC Stan Basti Ka Hasti India & Dubai Tour",
        "Riar Saab & Abhijay Sharma Obsessed Tour",
        "Sunburn Cruise", "Angriya Cruise", "Jalesh Cruise"
    ],
    // "Wedding Gigs": ["Various Elite Destinations"] // Removed to keep club theme strong
};

export default function TourMap() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const venueEntries = Object.entries(venues);

    useEffect(() => {
        if (!canvasRef.current) return;
        let currentWidth = canvasRef.current.offsetWidth;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: currentWidth * 2,
            height: currentWidth * 2,
            phi: 0,
            theta: 0.2, // Slightly tilted slightly forward to show India
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.35, 0.35, 0.35],
            markerColor: [1, 0, 0],
            glowColor: [0.3, 0.3, 0.3],
            markers: MARKERS.map(m => ({ location: m.location as [number, number], size: m.size })),
            onRender: (state) => {
                const basePhi = 4.8; // Roughly India 77E
                let autoPhi = 0;
                if (!pointerInteracting.current) {
                    autoPhi = Math.sin(Date.now() / 15000) * 0.5;
                }
                state.phi = basePhi + autoPhi + pointerInteractionMovement.current;
                state.theta = 0.2 + Math.sin(Date.now() / 8000) * 0.05;

                // Responsive Resizing
                if (canvasRef.current) {
                    currentWidth = canvasRef.current.offsetWidth;
                    state.width = currentWidth * 2;
                    state.height = currentWidth * 2;
                }
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <section id="tour-map" className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden border-b border-neutral-900 border-t">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-12 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Left: Text & Data HUD Context + The Venues App */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 space-y-8 relative z-20 w-full"
                    >
                        <div className="flex flex-col items-start gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-primary animate-ping rounded-full"></div>
                                <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest border border-primary/30 px-2 py-1 bg-primary/10">
                                    GLOBAL INTELLIGENCE
                                </span>
                            </div>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-anton uppercase tracking-tight text-white leading-[0.9]">
                                TARGET <br /> L<span className="text-primary">O</span>CATIONS
                            </h2>
                        </div>

                        {/* Interactive Accordion for Venues - Replaces old standalone Clients section */}
                        <div className="flex flex-col border-t border-neutral-800 mt-8 max-w-2xl bg-black/50 backdrop-blur-md overflow-y-auto h-[400px] lg:h-[450px]">
                            {venueEntries.map(([category, list], idx) => {
                                const isOpen = openIndex === idx;
                                return (
                                    <div key={category} className="flex flex-col border-b border-neutral-800">
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                                            className={`w-full flex justify-between items-center py-5 md:py-6 px-4 text-left transition-colors duration-300 group hover:bg-neutral-900/50 ${isOpen ? 'bg-neutral-900/80 border-l-2 border-primary' : 'border-l-2 border-transparent hover:border-neutral-600'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className={`text-xs font-mono transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : 'text-neutral-600 group-hover:text-white'}`}>
                                                    ▶
                                                </span>
                                                <span className="text-xl md:text-2xl font-anton uppercase tracking-widest text-white group-hover:text-primary transition-colors">
                                                    {category}
                                                </span>
                                            </div>
                                            <span className="font-mono text-[10px] md:text-xs text-neutral-500 bg-black px-2 py-1 border border-neutral-800">
                                                {list.length} OPS
                                            </span>
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden bg-neutral-950/40"
                                                >
                                                    <div className="p-4 pl-10">
                                                        <ul className="flex flex-wrap gap-2">
                                                            {list.map((item, i) => (
                                                                <li
                                                                    key={i}
                                                                    className="font-mono text-[10px] md:text-xs text-neutral-400 bg-black border border-neutral-800 px-3 py-1.5 hover:border-primary hover:text-white transition-all cursor-crosshair uppercase tracking-widest shadow-xl"
                                                                >
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right: 3D Globe w/ Radar HUD Overlay */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="flex-1 w-full max-w-[500px] lg:max-w-[600px] aspect-square relative flex items-center justify-center mx-auto group sticky top-24"
                    >
                        {/* HUD Targeting Elements Outer */}
                        <div className="absolute inset-0 border border-neutral-800/50 rounded-full pointer-events-none transition-colors duration-700 group-hover:border-primary/20 bg-primary/5"></div>

                        {/* Radar Ring Inner (Globe boundary) */}
                        <div className="absolute inset-4 md:inset-8 border border-neutral-800/30 rounded-full pointer-events-none border-dashed animate-[spin_60s_linear_infinite]"></div>

                        {/* Corner Brackets */}
                        <div className="absolute top-0 left-0 w-8 h-8 md:w-16 md:h-16 border-t-2 border-l-2 border-primary/50 transition-all duration-300 group-hover:border-primary pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 md:w-16 md:h-16 border-t-2 border-r-2 border-primary/50 transition-all duration-300 group-hover:border-primary pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 md:w-16 md:h-16 border-b-2 border-l-2 border-primary/50 transition-all duration-300 group-hover:border-primary pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 md:w-16 md:h-16 border-b-2 border-r-2 border-primary/50 transition-all duration-300 group-hover:border-primary pointer-events-none"></div>

                        {/* Center Crosshairs */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-20 group-hover:opacity-50 transition-opacity z-30">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary"></div>
                            <div className="absolute top-0 left-1/2 h-full w-[1px] bg-primary"></div>
                        </div>

                        {/* The Canvas - Forced boundary */}
                        <div className="absolute inset-4 md:inset-8 z-20 rounded-full overflow-hidden shadow-[0_0_80px_rgba(255,0,0,0.15)] bg-transparent">
                            <canvas
                                ref={canvasRef}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    contain: "layout paint size",
                                    opacity: 1
                                }}
                                className="w-full h-full cursor-grab active:cursor-grabbing mix-blend-screen"
                                onPointerDown={(e) => {
                                    pointerInteracting.current = e.clientX;
                                    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
                                }}
                                onPointerUp={() => {
                                    pointerInteracting.current = null;
                                    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
                                }}
                                onPointerOut={() => {
                                    pointerInteracting.current = null;
                                    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
                                }}
                                onPointerMove={(e) => {
                                    if (pointerInteracting.current !== null) {
                                        const delta = e.clientX - pointerInteracting.current;
                                        pointerInteractionMovement.current = delta / 200;
                                    }
                                }}
                            />
                        </div>

                        {/* Ambient Core Glow */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10 group-hover:bg-primary/30 transition-colors duration-700"></div>

                        {/* Live Markers Tooltip/Legend */}
                        <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-max text-center">
                            <div className="flex gap-4">
                                <span className="font-mono text-[9px] text-primary border border-primary/30 px-2 py-1 bg-primary/5 uppercase">
                                    LIVE COORDINATE TRACKING
                                </span>
                                <span className="font-mono text-[9px] text-neutral-500 border border-neutral-800 px-2 py-1 uppercase">
                                    DRAG TO ROTATE GLOBE
                                </span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
