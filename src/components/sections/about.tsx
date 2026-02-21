"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden border-t border-b border-neutral-900">
            {/* Background ambient light */}
            <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-primary rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-12 max-w-7xl relative z-10">

                {/* Top Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-neutral-900 pb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-9xl lg:text-[12rem] font-anton uppercase tracking-tight text-white leading-none"
                    >
                        THE STORY
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="mt-8 md:mt-0 max-w-sm md:text-right"
                    >
                        <p className="font-mono text-xs leading-relaxed text-neutral-400 mb-6 uppercase tracking-wider">
                            A DECADE OF IGNITING DANCE FLOORS. FROM LOCAL CLUBS TO NATIONAL TOURS, DJ ASHELY REDEFINES THE MUSIC EXPERIENCE.
                        </p>
                        <a href="/assets/Ashley Alvares Presskit NEW.pdf" target="_blank" rel="noopener noreferrer" className="inline-block">
                            <button className="rounded-full bg-primary px-8 py-4 font-mono text-xs font-bold text-black transition-all hover:bg-white hover:scale-105">
                                DOWNLOAD PRESSKIT
                            </button>
                        </a>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left: Image / Visual anchor */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="aspect-[4/5] w-full bg-[#0a0a0a] border border-neutral-800 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 z-10"></div>

                            {/* Tape / Film visual element top corner */}
                            <div className="absolute top-4 left-4 w-12 h-4 bg-white/10 backdrop-blur-sm -rotate-6 z-20"></div>
                            <div className="absolute bottom-4 right-4 w-12 h-4 bg-white/10 backdrop-blur-sm rotate-3 z-20"></div>

                            {/* Image representation */}
                            <div className="absolute inset-0 m-4 transition-transform duration-700 group-hover:scale-105 overflow-hidden border border-neutral-800">
                                <img
                                    src="/assets/an4.JPEG"
                                    className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                    alt="Ashley Portrait"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Text Blocks */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-7 flex flex-col justify-center"
                    >

                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-12 text-neutral-200">
                            "I wanted to make the crowd dance to my own tunes."
                        </h3>

                        <div className="space-y-8 font-mono text-sm leading-relaxed text-neutral-400 max-w-2xl">
                            <p className="text-base text-neutral-300">
                                HAILING FROM INDIA, ASHLEY'S MUSICAL JOURNEY BEGAN AT THE AGE OF 18 WHEN HIS DANCE INSTRUCTOR INTRODUCED HIM TO THE WORLD OF HIP-HOP MUSIC. LITTLE DID HE KNOW, THIS INTRODUCTION WOULD BE THE CATALYST FOR HIS LIFELONG PASSION FOR MUSIC.
                            </p>

                            <div className="pl-6 border-l-2 border-primary py-2 text-white bg-gradient-to-r from-primary/10 to-transparent pr-4">
                                OVER THE YEARS, HIS DEDICATION AND ENTHUSIASM HAVE TURNED HIM INTO A FORCE TO BE RECKONED WITH IN THE NIGHTLIFE MUSIC SCENE.
                            </div>

                            <p>
                                WHAT SETS ASHLEY APART IS NOT JUST HIS TALENT BUT ALSO HIS IMPRESSIVE COLLABORATIONS. HE HAS SHARED THE STAGE WITH RENOWNED ARTISTS SUCH AS NUCLEYA, THE DOORBEEN, DJ PROOF, THE SPINDOCTOR, DJ SA, DJ CHETAS, DJ SUKETU, RIAR SAAB, RASHMEET KAUR, AND MC STAN.
                            </p>
                            <p>
                                WITH HIS DYNAMIC MIXES AND UNWAVERING FOCUS ON CREATING MEMORABLE MUSICAL EXPERIENCES, ASHLEY CONTINUES TO MAKE WAVES IN THE PARTY HUBS ACROSS INDIA. HIS JOURNEY EXEMPLIFIES THE POWER OF PASSION AND THE ABILITY TO CREATE LASTING MUSICAL EXPERIENCES.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
