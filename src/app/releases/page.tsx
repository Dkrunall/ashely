"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/layout/navbar";
import Contact from "@/components/sections/contact";

const tracks = [
    { title: "SAPNE", subtitle: "Single", artist: "artcriminal", cover: "/assets/a1.jpg", year: "2023", label: "Indie", bpm: "124", key: "Amin" },
    { title: "MAURYA", subtitle: "feat. Mitika Kanwar", artist: "artcriminal", cover: "/assets/a2.jpg", year: "2023", label: "DefJam", bpm: "128", key: "F#maj" },
    { title: "KALYANI", subtitle: "Single", artist: "ARJN, KDS", cover: "/assets/a3.jpg", year: "2022", label: "Sony Music", bpm: "122", key: "Cmin" },
    { title: "KULASTHREE", subtitle: "Single", artist: "ThirumaLi", cover: "/assets/a4.jpg", year: "2022", label: "Mass Appeal", bpm: "95", key: "Gmaj" },
    { title: "HANUMANJI", subtitle: "feat. Maaru", artist: "Ramdee", cover: "/assets/a5.jpg", year: "2021", label: "Indie", bpm: "130", key: "D#min" },
    { title: "TENSION", subtitle: "Single", artist: "Dhanda Nyoliwala", cover: "/assets/an1.JPG", year: "2021", label: "Universal", bpm: "126", key: "Amin" },
];

export default function ReleasesPage() {
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
                        <Image src="/assets/an3.JPG" alt="Archival Vault" fill className="object-cover opacity-40 grayscale blur-sm" priority />
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
                            ARCHIVE_SYNC // DISCO_VAULT_DEEP
                        </span>
                        <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-anton uppercase tracking-tighter text-white leading-none mb-8">
                            THE <span className="text-transparent flex-stroke opacity-60">VAULT.</span>
                        </h1>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                            <div>COMPLETE_CATALOG / VER: 2.1.0</div>
                            <div className="hidden md:block w-px h-8 bg-neutral-800"></div>
                            <div>64 TRACKS / 10 YEARS / ACTIVE_LOG</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Premium Grid with Dynamic Metadata */}
            <section className="container mx-auto px-4 md:px-12 max-w-7xl py-24 md:py-32">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-6xl font-anton uppercase mb-6 tracking-tight">ARCHIVAL / <span className="text-primary text-opacity-50">FREQUENCIES</span></h2>
                        <p className="font-mono text-xs md:text-sm text-neutral-500 uppercase leading-relaxed tracking-wider">
                            A comprehensive deep-dive into the technical evolution of the Ashley sound. Filtered by era and frequency, these are the original masters from the vault.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                    {tracks.map((track, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative bg-transparent border border-neutral-900 px-6 py-8 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]"
                        >
                            {/* Technical Header */}
                            <div className="flex justify-between items-center mb-6 font-mono text-[9px] text-neutral-600 uppercase tracking-widest">
                                <span>REC_ID: 0{idx + 1}</span>
                                <span className="text-primary/50">{track.year} // {track.label}</span>
                            </div>

                            <div className="aspect-square relative overflow-hidden mb-8 bg-black">
                                <Image
                                    src={track.cover}
                                    alt={track.title}
                                    fill
                                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                />

                                {/* Overlay Metadata on Hover */}
                                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                    <div className="font-mono text-[10px] text-primary uppercase mb-4 tracking-[0.2em]">TRACK_SPEC</div>
                                    <div className="space-y-4 text-center">
                                        <div className="flex flex-col">
                                            <span className="text-neutral-500 text-[9px] uppercase">BPM</span>
                                            <span className="text-2xl font-anton text-white tracking-widest">{track.bpm}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-neutral-500 text-[9px] uppercase">KEY</span>
                                            <span className="text-2xl font-anton text-white tracking-widest">{track.key}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-anton text-3xl md:text-4xl mb-2 text-white group-hover:text-primary transition-colors duration-500 tracking-tight leading-none">
                                        {track.title}
                                    </h3>
                                    <p className="font-mono text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest">
                                        {track.artist} <span className="mx-2 text-neutral-800">/</span> {track.subtitle}
                                    </p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 border border-neutral-800 font-mono text-[10px] text-white uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center gap-4 relative overflow-hidden"
                                >
                                    <span>STREAM_UPLINK</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Contact />
        </main>
    );
}
