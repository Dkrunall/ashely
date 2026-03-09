"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Navbar from "@/components/layout/navbar";
import Contact from "@/components/sections/contact";

const dates = [
    { date: "MAR 15", monthYear: "2024", city: "MUMBAI", venue: "ANTISOCIAL", status: "SOLD OUT", image: "/assets/an1.JPG", coords: "19.0760° N, 72.8777° E" },
    { date: "APR 02", monthYear: "2024", city: "GOA", venue: "THALASSA", status: "TICKETS", image: "/assets/an2.JPG", coords: "15.2993° N, 74.1240° E" },
    { date: "MAY 18", monthYear: "2024", city: "DUBAI", venue: "SOHO GARDEN", status: "TICKETS", image: "/assets/an3.JPG", coords: "25.2048° N, 55.2708° E" },
    { date: "JUN 05", monthYear: "2024", city: "LONDON", venue: "PRINTWORKS", status: "WAITING LIST", image: "/assets/an6.JPEG", coords: "51.5074° N, 0.1278° W" },
    { date: "JUL 12", monthYear: "2024", city: "BERLIN", venue: "WATERGATE", status: "TICKETS", image: "/assets/an5.JPEG", coords: "52.5200° N, 13.4050° E" },
    { date: "AUG 22", monthYear: "2024", city: "PUNE", venue: "SUNBURN ARENA", status: "COMING SOON", image: "/assets/an4.JPEG", coords: "18.5204° N, 73.8567° E" },
];

export default function TourPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <main ref={containerRef} className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-primary selection:text-white">
            <Navbar />

            {/* Premium Hero with CRT & Parallax */}
            <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center border-b border-primary/20 overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 200]) }}
                        className="relative w-full h-full"
                    >
                        <Image src="/assets/a3.jpg" alt="Tour Background" fill className="object-cover opacity-40 grayscale" priority />
                    </motion.div>

                    {/* CRT Scanline Overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-20"
                        style={{ backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }}
                    ></div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-20"></div>
                </div>

                <div className="container mx-auto max-w-7xl text-center relative z-30 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="font-mono text-[10px] md:text-sm font-bold text-primary uppercase tracking-[0.3em] mb-6 inline-flex items-center gap-3">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            LIVE SATELLITE FEED / ON TOUR
                        </span>
                        <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-anton uppercase tracking-tighter text-white leading-none mb-8">
                            GLOBAL <br /> <span className="text-transparent flex-stroke opacity-60">CIRCUIT</span>
                        </h1>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                            <div>EST. 2013 — 2024</div>
                            <div className="hidden md:block w-px h-8 bg-neutral-800"></div>
                            <div>6 CONTINENTS / 42 CITIES / PHASE I</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Data Table */}
            <section className="relative z-10 container mx-auto px-4 md:px-12 max-w-7xl py-32">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-anton uppercase mb-6 tracking-tight">UPCOMING / <span className="text-primary text-opacity-50">TRANSMISSIONS</span></h2>
                        <p className="font-mono text-xs md:text-sm text-neutral-500 uppercase leading-relaxed tracking-wider">
                            Real-time schedule for the next leg of the Global Circuit. Each performance is a distinct sonic experiment tailored to the city's architectural acoustics.
                        </p>
                    </div>
                    <div className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest border border-neutral-800 p-6 bg-neutral-950/50 backdrop-blur-md">
                        <div className="flex justify-between gap-12 mb-2"><span>ACTIVE UPDATES:</span> <span className="text-white">TRUE</span></div>
                        <div className="flex justify-between gap-12"><span>LAST SYNC:</span> <span className="text-white">GMT+5:30</span></div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="hidden md:grid grid-cols-12 gap-4 mb-8 border-b border-neutral-900 pb-4 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                        <div className="col-span-2">INDEX</div>
                        <div className="col-span-3">LOCATION / COORDINATES</div>
                        <div className="col-span-3">VENUE / BOOTH</div>
                        <div className="col-span-4 text-right">ACCESS STATUS</div>
                    </div>

                    <div className="flex flex-col">
                        {dates.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="group relative w-full grid grid-cols-1 md:grid-cols-12 gap-4 py-10 border-b border-neutral-900 hover:border-primary/50 transition-all duration-500 px-4 md:-mx-4 md:px-6 cursor-crosshair overflow-hidden"
                            >
                                {/* Static Background Image reveal on hover */}
                                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-40 opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-0 pointer-events-none scale-110 group-hover:scale-100 transition-transform duration-1000">
                                    <Image src={item.image} alt={item.city} fill className="object-cover grayscale" />
                                </div>

                                <div className="col-span-2 flex flex-col justify-center relative z-10">
                                    <span className="font-mono text-xs text-primary mb-2">0{idx + 1}</span>
                                    <span className="font-anton text-2xl md:text-3xl text-white group-hover:tracking-widest transition-all duration-500">{item.date}</span>
                                </div>

                                <div className="col-span-3 flex flex-col justify-center relative z-10 pt-4 md:pt-0">
                                    <span className="font-mono text-xs font-bold uppercase text-white group-hover:text-primary transition-colors">{item.city}</span>
                                    <span className="font-mono text-[9px] text-neutral-600 uppercase mt-1 tracking-tighter">{item.coords}</span>
                                </div>

                                <div className="col-span-3 flex flex-col justify-center relative z-10 pt-2 md:pt-0">
                                    <span className="font-mono text-xs font-bold uppercase text-neutral-400 group-hover:text-white transition-colors">{item.venue}</span>
                                </div>

                                <div className="col-span-4 flex items-center justify-end relative z-10 pt-6 md:pt-0">
                                    {item.status === "TICKETS" ? (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-primary text-white font-mono text-[10px] font-bold px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest relative overflow-hidden group/btn"
                                        >
                                            <span className="relative z-10">GET TICKETS</span>
                                            <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                                        </motion.button>
                                    ) : item.status === "SOLD OUT" ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-[1px] bg-neutral-800"></div>
                                            <span className="font-mono text-[10px] font-bold text-neutral-600 uppercase italic">UNAVAILABLE / SOLD OUT</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-[1px] bg-neutral-800"></div>
                                            <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase">{item.status}</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Footer Spacer */}
            <section className="w-full py-24 border-t border-neutral-900">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-block p-12 border border-primary/10 rounded-full relative">
                        <div className="absolute inset-0 border border-primary/5 rounded-full animate-ping opacity-20"></div>
                        <div className="w-4 h-4 bg-primary rounded-full mx-auto shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
                    </div>
                    <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.5em] mt-12">TRANSMISSION OVER / END OF CIRCUIT PHASE I</p>
                </div>
            </section>

            <Contact />
        </main>
    );
}
