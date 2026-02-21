"use client";

import { motion } from "framer-motion";

const techItems = [
    {
        id: "TC-01",
        title: "PROMOTER PROVIDES",
        content: (
            <ul className="list-square list-inside space-y-2 opacity-80">
                <li>1 DJM 900 Nexus 2 (latest firmware)</li>
                <li>2 CDJ 2000 Nexus 2 (linked, latest firmware)</li>
                <li>1 Stage monitor</li>
            </ul>
        )
    },
    {
        id: "TC-02",
        title: "SOUND CHECK",
        content: (
            <div className="space-y-4 opacity-80">
                <p>The artist requires a slot in non-operational hours with the venue's audio engineer for a thorough sound check.</p>
                <p className="text-yellow-500/80">Venue must be equipped for last minute equipment failure.</p>
                <p>At least one technician present at all times during sound check and performance.</p>
            </div>
        )
    },
    {
        id: "TC-03",
        title: "PERFORMANCE PROTOCOL",
        content: (
            <p className="opacity-80 text-primary/80">Requesting the venue to not make any announcements prior to or during the performance.</p>
        )
    }
];

const hospItems = [
    {
        id: "HS-01",
        title: "TRAVEL & FLIGHTS",
        content: (
            <p className="opacity-80">Promoter provides to and fro airfare / commuting charges. All hotel & flight bookings under <strong>Ashley Alvares</strong>.</p>
        )
    },
    {
        id: "HS-02",
        title: "ACCOMMODATION",
        content: (
            <ul className="list-square list-inside space-y-2 opacity-80">
                <li>One King Smoking room (4/5 Star, near venue)</li>
                <li>Complimentary breakfast</li>
                <li>Internet access</li>
                <li>Per day meal allowance (INR 5000/-)</li>
            </ul>
        )
    },
    {
        id: "HS-03",
        title: "VENUE ACCOMMODATIONS",
        content: (
            <ul className="list-square list-inside space-y-2 opacity-80">
                <li>2 bottles of water on stage</li>
                <li>1 meal in the quiet section of the menu</li>
            </ul>
        )
    },
    {
        id: "HS-04",
        title: "GROUND TRANSPORT",
        content: (
            <div className="space-y-4 opacity-80">
                <p>Promoter provides all on-ground transfers (Airport, Hotel, Venue).</p>
                <p>Car Preference: <strong className="text-white">Innova Crysta</strong></p>
            </div>
        )
    }
];

export default function Rider() {
    return (
        <section id="rider" className="relative w-full bg-[#050505] text-white py-24 md:py-32 border-t border-neutral-900">
            <div className="container mx-auto px-4 md:px-12 max-w-7xl">

                {/* Header Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 bg-primary animate-pulse rounded-full"></div>
                            <span className="font-mono text-xs text-primary uppercase tracking-widest">SYSTEM STATUS: REQUIRED</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-anton uppercase tracking-tight text-white leading-none">
                            LOGISTICS <br /> <span className="text-neutral-800">&</span> RIDERS
                        </h2>
                    </div>

                    {/* Decorative Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden md:block w-full max-w-sm aspect-[21/9] border border-neutral-800 relative group overflow-hidden"
                    >
                        <img src="/assets/a4.jpg" alt="DJ Equipment" className="w-full h-full object-cover filter grayscale mix-blend-luminosity group-hover:grayscale-0 transition-all duration-700 hover:scale-105" />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.div>
                </div>

                {/* Brutalist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-neutral-800 border-y border-neutral-800">

                    {/* Contact Info Span */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-[#0a0a0a] p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <span className="font-mono text-sm tracking-widest text-neutral-500 uppercase">Direct Booking Contact</span>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-mono text-xs md:text-sm">
                            <a href="mailto:ashleyalvaresofficial@gmail.com" className="hover:text-primary transition-colors">ASHLEYALVARESOFFICIAL@GMAIL.COM</a>
                            <a href="tel:+919769419233" className="hover:text-primary transition-colors">+91 97694 19233</a>
                        </div>
                    </div>

                    {/* Section Headers */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-neutral-800">
                        <div className="bg-primary text-black p-4 font-bold font-mono text-sm tracking-widest uppercase">
                            [ SECTION_01: TECHNICAL ]
                        </div>
                        <div className="bg-white text-black p-4 font-bold font-mono text-sm tracking-widest uppercase hidden lg:block">
                            [ SECTION_02: HOSPITALITY ]
                        </div>
                    </div>

                    {/* Tech Items */}
                    {techItems.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#050505] p-6 md:p-8 flex flex-col group hover:bg-[#0a0a0a] transition-colors"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h4 className="text-white font-bold font-mono text-sm tracking-wider group-hover:text-primary transition-colors">{item.title}</h4>
                                <span className="text-neutral-700 font-mono text-xs">{item.id}</span>
                            </div>
                            <div className="font-mono text-xs leading-relaxed text-neutral-400 mt-auto">
                                {item.content}
                            </div>
                        </motion.div>
                    ))}

                    {/* Hosp Items */}
                    {hospItems.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: (techItems.length + idx) * 0.1 }}
                            className="bg-[#050505] p-6 md:p-8 flex flex-col group hover:bg-[#0a0a0a] transition-colors"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h4 className="text-white font-bold font-mono text-sm tracking-wider group-hover:text-primary transition-colors">{item.title}</h4>
                                <span className="text-neutral-700 font-mono text-xs">{item.id}</span>
                            </div>
                            <div className="font-mono text-xs leading-relaxed text-neutral-400 mt-auto">
                                {item.content}
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}
