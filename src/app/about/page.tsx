"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/layout/navbar";
import Contact from "@/components/sections/contact";

const milestones = [
    { year: "2013", title: "THE DISCOVERY", desc: "First introduced to turntablism via Hip-Hop dance.", image: "/assets/an1.JPG", metadata: "SECTOR_01 // SIGNAL_ACQUISITION" },
    { year: "2016", title: "FIRST RESIDENCY", desc: "Secured first major club residency in the city.", image: "/assets/an2.JPG", metadata: "SECTOR_02 // FREQUENCY_SYNC" },
    { year: "2019", title: "FESTIVAL DEBUT", desc: "Played to a crowd of 5,000+, shifting focus to massive stages.", image: "/assets/an3.JPG", metadata: "SECTOR_03 // AMPLITUDE_PEAK" },
    { year: "2024", title: "GLOBAL EXPANSION", desc: "International dates locked. Dubai, London, SE Asia.", image: "/assets/an6.JPEG", metadata: "SECTOR_04 // GLOBAL_UPLINK" }
];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <main ref={containerRef} className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-primary selection:text-white">
            <Navbar />

            {/* Premium Hero with CRT & Parallax */}
            <section className="relative w-full h-[80vh] min-h-[700px] flex items-center justify-center border-b border-primary/20 overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 250]) }}
                        className="relative w-full h-full"
                    >
                        <Image src="/assets/an4.JPEG" alt="Ashley Origin" fill className="w-full h-full object-cover grayscale opacity-40" priority />
                    </motion.div>

                    {/* CRT Scanline Overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-20"
                        style={{ backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }}
                    ></div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent z-20"></div>
                </div>

                <div className="container mx-auto max-w-7xl text-center relative z-30 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="font-mono text-[10px] md:text-sm font-bold text-primary uppercase tracking-[0.3em] mb-6 inline-flex items-center gap-3">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            BIO_LOG // ORIGIN_STORY_SYNC
                        </span>
                        <h1 className="text-7xl md:text-9xl lg:text-[13rem] font-anton uppercase tracking-tighter text-white leading-[0.85] mb-8">
                            TEN YEARS <br /> <span className="text-transparent flex-stroke opacity-60">OF BASS.</span>
                        </h1>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                            <div>SERIAL_ID: 0293184</div>
                            <div className="hidden md:block w-px h-8 bg-neutral-800"></div>
                            <div>PHASE: EVOLUTION / MATURATION</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Editorial Content & Interactive Timeline */}
            <section className="relative z-20 container mx-auto px-4 md:px-12 max-w-7xl py-32 md:py-48">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32">

                    {/* Left Column: Editorial */}
                    <div className="lg:col-span-7 space-y-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <h3 className="text-4xl md:text-6xl font-anton uppercase leading-[1.1] tracking-tight text-white border-l-8 border-primary pl-8 py-2">
                                "I WANTED TO MAKE THE CROWD DANCE TO MY <span className="text-primary">OWN TUNES.</span>"
                            </h3>

                            <div className="font-mono text-sm md:text-lg leading-relaxed text-neutral-400 space-y-8 uppercase max-w-2xl">
                                <p className="text-white font-bold">
                                    HAILING FROM INDIA, ASHLEY'S MUSICAL JOURNEY BEGAN AT THE AGE OF 18 WHEN HIS DANCE INSTRUCTOR INTRODUCED HIM TO THE WORLD OF HIP-HOP MUSIC.
                                </p>
                                <p>
                                    LITTLE DID HE KNOW, THIS INTRODUCTION WOULD BE THE CATALYST FOR HIS LIFELONG PASSION FOR MUSIC. OVER THE YEARS, HIS DEDICATION AND ENTHUSIASM HAVE TURNED HIM INTO A FORCE TO BE RECKONED WITH IN THE NIGHTLIFE MUSIC SCENE.
                                </p>
                                <p>
                                    WHAT SETS ASHLEY APART IS NOT JUST HIS TALENT BUT ALSO HIS IMPRESSIVE COLLABORATIONS AND HIS ABILITY TO READ THE ROOM AT A CELLULAR LEVEL.
                                </p>
                            </div>
                        </motion.div>

                        {/* Technical Specs Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-12 bg-neutral-950 border border-neutral-900 relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl"></div>
                            <h4 className="font-anton text-3xl mb-8 text-white tracking-widest">NOTABLE_STAGE_COLLABS</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-neutral-500">
                                {["Nucleya", "The Doorbeen", "DJ Proof", "The Spindoctor", "DJ SA", "DJ Chetas", "Riar Saab", "MC Stan", "Gurbax"].map((name, i) => (
                                    <div key={i} className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                                        <span className="text-primary/40">[{i + 1}]</span> {name}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Interactive Timeline */}
                    <div className="lg:col-span-5 relative pt-12">
                        <div className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-neutral-900 border-l border-dashed border-neutral-800"></div>

                        <div className="space-y-24">
                            {milestones.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, delay: idx * 0.15 }}
                                    className="relative pl-16 group"
                                >
                                    {/* Indicator */}
                                    <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-[#050505] border-2 border-primary flex items-center justify-center -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                    </div>

                                    {/* Hover Reveal Image */}
                                    <div className="absolute right-0 top-0 w-32 h-32 opacity-0 group-hover:opacity-40 transition-all duration-700 pointer-events-none translate-x-8 group-hover:translate-x-0 blur-sm group-hover:blur-none grayscale">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                    </div>

                                    <div className="space-y-4 relative z-20">
                                        <div className="font-anton text-5xl md:text-6xl text-white group-hover:text-primary transition-colors duration-500">{item.year}</div>
                                        <div>
                                            <div className="font-mono text-[9px] text-primary font-bold tracking-[0.3em] uppercase mb-1">{item.metadata}</div>
                                            <div className="font-mono text-sm font-bold text-white tracking-widest uppercase">{item.title}</div>
                                        </div>
                                        <p className="font-mono text-xs text-neutral-500 uppercase leading-relaxed tracking-wider max-w-xs">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Contact />
        </main>
    );
}
