"use client";

import { motion } from "framer-motion";
import Equalizer from "@/components/ui/equalizer";

export default function Hero() {
    return (
        <section className="relative flex h-screen w-full flex-col justify-between overflow-hidden px-4 py-8 md:px-12 md:py-12">
            {/* Main Title Area */}
            <div className="relative z-20 flex w-full flex-col">
                <div className="mx-auto w-full max-w-[90vw] md:max-w-[70vw]">
                    <div
                        className="aspect-[4/1] w-full bg-primary"
                        style={{
                            maskImage: "url('/assets/logo.png')",
                            maskSize: "contain",
                            maskRepeat: "no-repeat",
                            maskPosition: "center",
                            WebkitMaskImage: "url('/assets/logo.png')",
                            WebkitMaskSize: "contain",
                            WebkitMaskRepeat: "no-repeat",
                            WebkitMaskPosition: "center"
                        }}
                    />
                </div>

                {/* Location Bar */}
                <div className="mt-2 flex w-full items-start justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 md:text-sm">
                    <span>Los Angeles</span>
                    <span>New York</span>
                    <span>London</span>
                    <span>Paris</span>
                </div>
            </div>

            {/* Decorative Image */}
            <div className="absolute left-0 top-[65%] z-0 w-full -translate-y-1/2 md:top-[60%]">
                <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    src="/assets/an2.png"
                    alt="Decorative Abstract"
                    className="h-[30vh] w-full object-top object-cover opacity-80 mix-blend-screen md:h-[40vh]"
                />
            </div>

            {/* Tagline - Bottom Right */}
            <div className="absolute bottom-12 right-8 z-40 md:right-12">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-right"
                >
                    <p className="text-xl font-light leading-tight text-white md:text-4xl">
                        Sound that speaks <br /> for you.
                    </p>
                </motion.div>
            </div>

            {/* Bottom Visualization */}
            <div className="absolute bottom-0 left-0 w-full opacity-80 mix-blend-screen">
                <Equalizer />
            </div>
        </section>
    );
}
