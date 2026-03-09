"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/layout/navbar";
import Contact from "@/components/sections/contact";

const techSpecs = [
    { id: "REQ-01", item: "3x Pioneer CDJ 3000s", spec: "Linked via LAN hub. Latest firmware (v3.0+) required.", image: "/assets/a1.jpg", category: "DECK_ARRAY" },
    { id: "REQ-02", item: "1x Pioneer DJM V10 / 900 NXS2", spec: "Strictly Pioneer mixing desk. No substitutes. 4-channel minimum.", image: "/assets/a2.jpg", category: "MIX_ENGINE" },
    { id: "REQ-03", item: "2x Pro Stage Monitors", spec: "L'Acoustics, d&b, or equivalent. Independent booth control.", image: "/assets/a3.jpg", category: "MONITOR_SYNC" },
];

const hospitalitySpecs = [
    { id: "HOS-01", item: "Flight Logistics", spec: "3x Business / Premium Economy (Artist + Manager + Tech)", icon: "✈️" },
    { id: "HOS-02", item: "Accommodation", spec: "2x 5-Star Hotel Rooms (Late checkout / Soundproof mandatory)", icon: "🏨" },
    { id: "HOS-03", item: "Green Room", spec: "Grey Goose, Red Bull, Alkaline Water, Fresh Fruit, Tech Hooks", icon: "🍸" }
];

export default function TechnicalPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <main ref={containerRef} className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-primary selection:text-white pb-32">
            <Navbar />

            {/* Premium Hero with CRT & Parallax */}
            <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center border-b border-primary/20 overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 200]) }}
                        className="relative w-full h-full"
                    >
                        <Image src="/assets/a4.jpg" alt="Logistics Layer" fill className="object-cover opacity-30 grayscale brightness-50" priority />
                    </motion.div>

                    {/* CRT Scanline Overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-20"
                        style={{ backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }}
                    ></div>

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 z-10 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-20"></div>
                </div>

                <div className="container mx-auto max-w-7xl text-center relative z-30 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="font-mono text-[10px] md:text-sm font-bold text-primary uppercase tracking-[0.3em] mb-6 inline-flex items-center gap-3">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            LOGISTICS_LAYER // SYSTEM_REQUIREMENTS
                        </span>
                        <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-anton uppercase tracking-tighter text-white leading-none mb-8">
                            MISSION <br /> <span className="text-transparent flex-stroke opacity-60">CONTROL</span>
                        </h1>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                            <div>TECH_RIDER: v4.2.0</div>
                            <div className="hidden md:block w-px h-8 bg-neutral-800"></div>
                            <div>ENCRYPTED_UPLINK / READ_ONLY</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Control Spreadsheet */}
            <section className="container mx-auto px-4 md:px-12 max-w-7xl py-24 md:py-32">

                {/* Section 1: Equipment */}
                <div className="mb-32">
                    <div className="flex justify-between items-end mb-12 border-b border-neutral-900 pb-8">
                        <div>
                            <span className="font-mono text-[9px] text-primary uppercase tracking-[0.4em] mb-2 block">SEC_01</span>
                            <h2 className="text-4xl md:text-6xl font-anton uppercase tracking-tight">BOOTH / <span className="text-neutral-500">CONFIG</span></h2>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="hidden md:flex items-center gap-4 font-mono text-[10px] border border-neutral-800 px-6 py-3 uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                        >
                            <span>DL_FULL_RIDER.PDF</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 gap-[1px] bg-neutral-900 border border-neutral-900">
                        {techSpecs.map((spec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative grid grid-cols-1 md:grid-cols-12 bg-[#050505] hover:bg-neutral-950 transition-colors duration-500"
                            >
                                {/* Hover Equipment Snapshot */}
                                <div className="absolute right-0 top-0 h-full w-48 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none grayscale translate-x-12 group-hover:translate-x-0">
                                    <Image src={spec.image} alt={spec.item} fill className="object-cover" />
                                </div>

                                <div className="md:col-span-2 p-8 font-mono text-[10px] text-primary border-r border-neutral-900 flex items-center">
                                    [{spec.id}]
                                </div>
                                <div className="md:col-span-1 p-8 font-mono text-[10px] text-neutral-600 border-r border-neutral-900 hidden md:flex items-center">
                                    {spec.category}
                                </div>
                                <div className="md:col-span-4 p-8 flex flex-col justify-center border-r border-neutral-900">
                                    <h3 className="font-anton text-2xl text-white group-hover:text-primary transition-colors">{spec.item}</h3>
                                </div>
                                <div className="md:col-span-5 p-8 flex items-center font-mono text-xs text-neutral-500 uppercase leading-relaxed tracking-wider">
                                    {spec.spec}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Hospitality */}
                <div>
                    <div className="flex justify-between items-end mb-12 border-b border-neutral-900 pb-8">
                        <div>
                            <span className="font-mono text-[9px] text-primary uppercase tracking-[0.4em] mb-2 block">SEC_02</span>
                            <h2 className="text-4xl md:text-6xl font-anton uppercase tracking-tight">GLOBAL / <span className="text-neutral-500">HOSPITALITY</span></h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {hospitalitySpecs.map((spec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 border border-neutral-900 bg-neutral-950 hover:border-primary/30 transition-all duration-500 relative group overflow-hidden"
                            >
                                <div className="absolute -right-4 -top-4 text-6xl opacity-5 grayscale group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                                    {spec.icon}
                                </div>
                                <div className="font-mono text-[10px] text-primary mb-6">[{spec.id}]</div>
                                <h3 className="font-anton text-3xl mb-4 text-white uppercase">{spec.item}</h3>
                                <p className="font-mono text-xs text-neutral-500 uppercase leading-relaxed tracking-widest">{spec.spec}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-24 py-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[9px] text-neutral-600 uppercase tracking-[0.4em]">
                    <div>© 2024 ASHLEY_OPERATIONS</div>
                    <div className="flex gap-12">
                        <span>SECURITY_LEVEL: ALPHA</span>
                        <span>ENC: AES-256</span>
                    </div>
                </div>

            </section>

            <Contact />
        </main>
    );
}
