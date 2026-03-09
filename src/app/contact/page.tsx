"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/layout/navbar";

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <main ref={containerRef} className="relative min-h-[100dvh] w-full bg-[#050505] text-white selection:bg-primary selection:text-white pb-32 overflow-hidden">
            <Navbar />

            {/* Premium Hero with CRT & Parallax */}
            <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center border-b border-primary/20 overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 200]) }}
                        className="relative w-full h-full"
                    >
                        <Image src="/assets/a5.jpg" alt="Contact Uplink" fill className="object-cover opacity-30 grayscale blur-[1px]" priority />
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
                            UPLINK_ESTABLISHED // SIGNAL_STRENGTH_MAX
                        </span>
                        <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-anton uppercase tracking-tighter text-white leading-none mb-8">
                            GET IN <br /> <span className="text-transparent flex-stroke opacity-60">TOUCH.</span>
                        </h1>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                            <div>SECURE_CHANNEL: 0x9218F</div>
                            <div className="hidden md:block w-px h-8 bg-neutral-800"></div>
                            <div>LOCATION: GLOBAL_OPERATIONS</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Immersive Contact Form & Directory */}
            <section className="container mx-auto px-4 md:px-12 max-w-7xl py-24 md:py-32 relative">

                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32">

                    {/* Left Column: Direct Directory */}
                    <div className="lg:col-span-5 space-y-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-neutral-950 border border-neutral-900 p-12 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-50"></div>
                            <h3 className="font-anton text-4xl mb-8 text-white tracking-widest">DIRECT_LINE</h3>
                            <div className="space-y-10 font-mono text-xs md:text-sm uppercase tracking-[0.2em]">
                                <div>
                                    <span className="text-neutral-600 block mb-2 text-[9px] tracking-[0.4em]">MANAGEMENT // BOOKINGS</span>
                                    <a href="mailto:ashleyalvaresofficial@gmail.com" className="text-white hover:text-primary transition-all duration-300 block break-all font-bold">
                                        ASHLEYALVARESOFFICIAL@GMAIL.COM
                                    </a>
                                </div>
                                <div className="pt-8 border-t border-neutral-900">
                                    <span className="text-neutral-600 block mb-2 text-[9px] tracking-[0.4em]">PHONE // WHATSAPP</span>
                                    <a href="tel:+919769419233" className="text-2xl md:text-3xl text-white hover:text-primary transition-all duration-300 font-anton tracking-widest">
                                        +91 97694 19233
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-6">
                            <h3 className="font-mono text-[10px] font-bold text-neutral-600 uppercase tracking-[0.4em] border-b border-neutral-900 pb-4">CORE_RESOURCES</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { label: "PRESSKIT (PDF)", href: "/assets/Ashley Alvares Presskit NEW.pdf", sub: "EPK_DOWNLOAD_v2" },
                                    { label: "TECH RIDER", href: "/technical", sub: "LOGISTICS_SEC_01" },
                                    { label: "INSTAGRAM @DJASHLEYALVARES", href: "https://instagram.com/djashleyalvares", sub: "SOCIAL_LAYER", primary: true }
                                ].map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.href}
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        className={`flex justify-between items-center p-6 border ${item.primary ? 'border-primary/30 bg-primary/5 hover:bg-primary font-bold' : 'border-neutral-900 hover:bg-white'} group transition-all duration-500`}
                                    >
                                        <div className="flex flex-col">
                                            <span className={`font-anton text-lg tracking-widest ${item.primary ? 'text-white' : 'text-neutral-300 group-hover:text-black'}`}>{item.label}</span>
                                            <span className={`font-mono text-[9px] tracking-[0.3em] ${item.primary ? 'text-white/60' : 'text-neutral-600 group-hover:text-black/40'}`}>{item.sub}</span>
                                        </div>
                                        <ArrowIcon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Brutalist Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7"
                    >
                        <form className="space-y-12 font-mono" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] text-neutral-600 uppercase tracking-[0.4em]">PROMOTER_ID // NAME</label>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-b border-neutral-800 py-4 text-white placeholder-neutral-800 focus:outline-none focus:border-primary transition-all duration-500 text-sm uppercase tracking-widest font-bold"
                                        placeholder="INPUT_IDENTITY"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] text-neutral-600 uppercase tracking-[0.4em]">UPLINK_TARGET // EMAIL</label>
                                    <input
                                        type="email"
                                        className="w-full bg-transparent border-b border-neutral-800 py-4 text-white placeholder-neutral-800 focus:outline-none focus:border-primary transition-all duration-500 text-sm uppercase tracking-widest font-bold"
                                        placeholder="TARGET_NODE@UPLINK.COM"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] text-neutral-600 uppercase tracking-[0.4em]">LOGISTICS // CITY & EVENT</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-neutral-800 py-4 text-white placeholder-neutral-800 focus:outline-none focus:border-primary transition-all duration-500 text-sm uppercase tracking-widest font-bold"
                                    placeholder="E.G. FESTIVAL_A - MUMBAI_NODE_01"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] text-neutral-600 uppercase tracking-[0.4em]">DATA_STREAM // MESSAGE</label>
                                <textarea
                                    rows={6}
                                    className="w-full bg-[#080808] border border-neutral-900 p-6 text-white placeholder-neutral-800 focus:outline-none focus:border-primary transition-all duration-500 text-sm uppercase tracking-widest font-bold resize-none"
                                    placeholder="INITIATE_MESSAGE_SEQUENCE..."
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-white text-black font-anton text-3xl py-10 hover:bg-primary hover:text-white transition-all duration-500 flex justify-center gap-6 items-center group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                <span className="relative z-10">TRANSMIT_REQUEST</span>
                                <span className="relative z-10 group-hover:translate-x-4 transition-transform duration-500 text-4xl">→</span>
                            </motion.button>
                        </form>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}

function ArrowIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="overflow-visible transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-125"
        >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
    );
}
