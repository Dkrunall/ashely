"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/layout/navbar";
import Contact from "@/components/sections/contact";

const genres = [
    { title: "TRAP", desc: "Heavy 808s, rapid hi-hats, and synth-heavy melodies designed for massive club energy.", image: "/assets/an1.JPG", tech: "FREQ: 30-200Hz // RHYTHM: HYPER_SYNC" },
    { title: "COMMERCIAL HOUSE", desc: "High-BPM vocal anthems and four-on-the-floor kick patterns that unite festival crowds globally.", image: "/assets/an2.JPG", tech: "FREQ: 128 BPM // PATTERN: 4/4_STEADY" },
    { title: "AFRO HOUSE", desc: "Deep, tribal percussions and spiritual vocal loops creating a hypnotic, marathon dance experience.", image: "/assets/an5.JPEG", tech: "FREQ: ORGANIC_WOOD // LOOP: POLYRHYTHMIC" },
    { title: "JUNGLE", desc: "Frantic breakbeats and deep sub-bass originating from the UK underground rave scene.", image: "/assets/an6.JPEG", tech: "FREQ: BREAKS_FIXED // BASS: SUB_REESE" },
];

export default function GenresPage() {
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
                        <Image src="/assets/an5.JPEG" alt="Sound Spectrum" fill className="object-cover opacity-40 grayscale blur-sm" priority />
                    </motion.div>

                    {/* CRT Scanline Overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-20"
                        style={{ backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }}
                    ></div>

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
                            SOUND_SPECTRUM // FREQ_SCAN_ACTIVE
                        </span>
                        <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-anton uppercase tracking-tighter text-white leading-none mb-8">
                            SOUND <br /> <span className="text-transparent flex-stroke opacity-60">PALETTE</span>
                        </h1>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                            <div>SPECTRUM: 20Hz — 20kHz</div>
                            <div className="hidden md:block w-px h-8 bg-neutral-800"></div>
                            <div>4 PRIMARY NODES / ACTIVE_SYNTH</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Kinetic Blocks Layout */}
            <section className="w-full py-24 md:py-32">
                <div className="container mx-auto px-4 md:px-12 max-w-7xl mb-24">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-6xl font-anton uppercase mb-6 tracking-tight">SONIC / <span className="text-primary text-opacity-50">ARCHITECTURE</span></h2>
                        <p className="font-mono text-xs md:text-sm text-neutral-500 uppercase leading-relaxed tracking-wider">
                            The Ashley sound is built on four core architectural pillars. Each genre is a distinct frequency profile, meticulously crafted for high-performance club environments.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col w-full border-t border-neutral-900 shadow-[20px_0_100px_rgba(220,38,38,0.05)]">
                    {genres.map((g, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="group relative w-full border-b border-neutral-900 overflow-hidden bg-[#050505] cursor-crosshair"
                        >
                            {/* Animated Background Image reveal on hover */}
                            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
                                <Image src={g.image} alt={g.title} fill className="object-cover grayscale" />
                            </div>

                            <div className="container mx-auto px-4 md:px-12 py-20 md:py-32 relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 group-hover:px-12 md:group-hover:px-20 transition-all duration-700">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-6">
                                        <span className="font-mono text-xs md:text-sm font-bold text-primary">0{i + 1}</span>
                                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-anton uppercase tracking-tighter text-white group-hover:text-primary transition-all duration-500 leading-none">
                                            {g.title}
                                        </h2>
                                    </div>
                                    <div className="font-mono text-[9px] md:text-[10px] text-neutral-600 uppercase tracking-[0.4em] translate-x-12 mt-2 group-hover:text-white transition-colors">
                                        {g.tech}
                                    </div>
                                </div>

                                <div className="max-w-md space-y-8 lg:text-right">
                                    <p className="font-mono text-xs md:text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors uppercase leading-relaxed tracking-widest leading-loose">
                                        {g.desc}
                                    </p>
                                    <div className="flex justify-start lg:justify-end gap-4 overflow-hidden">
                                        {[1, 2, 3].map((dot) => (
                                            <div key={dot} className="w-8 h-px bg-neutral-800 group-hover:bg-primary group-hover:w-16 transition-all duration-700" style={{ transitionDelay: `${dot * 0.1}s` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Contact />
        </main>
    );
}
