"use client";

import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section
            id="contact"
            className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden flex flex-col justify-between min-h-screen"
        >
            {/* Background Pattern (Concentric Circles) with a top fade out mask */}
            <div
                className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center"
                style={{ maskImage: "linear-gradient(to bottom, transparent, black 15%, black)" }}
            >
                <div className="w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] rounded-full border-[1px] border-white absolute"></div>
                <div className="w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] rounded-full border-[1px] border-white absolute"></div>
                <div className="w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] rounded-full border-[1px] border-white absolute"></div>
                <div className="w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full border-[1px] border-white absolute"></div>
                <div className="w-[30vw] h-[30vw] md:w-[20vw] md:h-[20vw] rounded-full border-[1px] border-white absolute"></div>

                {/* Thick vertical line to mimic the center split in the reference */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white opacity-20"></div>
                <div className="absolute top-0 bottom-0 left-[25%] -translate-x-1/2 w-[2px] bg-white opacity-10"></div>
                <div className="absolute top-0 bottom-0 left-[75%] -translate-x-1/2 w-[2px] bg-white opacity-10"></div>
            </div>

            <div className="container mx-auto px-4 z-10 flex flex-col items-center justify-center flex-1 w-full mt-20">

                {/* Main Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl font-light text-center mb-16 max-w-4xl tracking-tight leading-[1.1]"
                >
                    The experience starts<br />
                    with what people hear.
                </motion.h2>

                {/* Pill Buttons Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="flex flex-wrap justify-center gap-4 max-w-3xl mb-32 md:mb-28"
                >
                    <a
                        href="mailto:ashleyalvaresofficial@gmail.com"
                        className="group flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 text-xs md:text-sm font-mono tracking-wider"
                    >
                        ASHLEYALVARESOFFICIAL@GMAIL.COM
                        <ArrowIcon />
                    </a>
                    <a
                        href="tel:+919769419233"
                        className="group flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 text-xs md:text-sm font-mono tracking-wider"
                    >
                        +91 97694 19233
                        <ArrowIcon />
                    </a>

                    <a
                        href="/assets/Ashley Alvares Presskit NEW.pdf"
                        target="_blank"
                        className="group flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 text-xs md:text-sm font-mono tracking-wider"
                    >
                        PRESSKIT
                        <ArrowIcon />
                    </a>
                    <a
                        href="#"
                        className="group flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 text-xs md:text-sm font-mono tracking-wider"
                    >
                        TECH RIDER
                        <ArrowIcon />
                    </a>
                    <a
                        href="https://instagram.com/djashleyalvares"
                        target="_blank"
                        className="group flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 text-xs md:text-sm font-mono tracking-wider"
                    >
                        INSTAGRAM
                        <ArrowIcon />
                    </a>
                </motion.div>
            </div>

            {/* Bottom Giant Text & Copyright */}
            <div className="z-10 w-full px-4 mt-48 md:mt-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="w-full flex justify-center"
                >
                    <h1
                        className="font-anton text-primary w-full text-center leading-[0.8] tracking-tight selection:bg-white selection:text-black"
                        style={{ fontSize: "clamp(5rem, 20vw, 22rem)" }}
                    >
                        ASHELY
                    </h1>
                </motion.div>

                {/* Footer Meta Row */}
                <div className="flex justify-between items-end w-full mt-4 text-[10px] md:text-xs text-neutral-400 font-mono tracking-widest uppercase">
                    <div>
                        © {new Date().getFullYear()} DJ ASHELY LLC
                    </div>
                    <div className="text-right">
                        SITE BY HIGHLY NECESSARY
                    </div>
                </div>
            </div>
        </section>
    );
}

// Simple Up-Right Arrow Icon used in the pills
function ArrowIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="overflow-visible transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
    );
}
