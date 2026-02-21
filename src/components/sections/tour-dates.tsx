"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ISO formatted event dates to easily map to the dynamic calendar grid
const EVENTS = [
    { date: "2024-10-24", city: "MUMBAI", venue: "SOHO HOUSE", status: "PAST" },
    { date: "2024-11-15", city: "BANGKOK", venue: "MUSTACHE CLUB", status: "SOLD OUT" },
    { date: "2024-12-05", city: "DUBAI", venue: "SOHO GARDEN", status: "TICKETS" },
    { date: "2024-12-14", city: "MUMBAI", venue: "ANTI-SOCIAL", status: "TICKETS" },
    { date: "2024-12-31", city: "GOA", venue: "SUNBURN FESTIVAL", status: "SOLD OUT" },
    { date: "2025-01-14", city: "LONDON", venue: "FABRIC", status: "ANNOUNCING SOON" },
];

const MONTH_NAMES = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];
const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function TourDates() {
    // Determine the very first event's month to set as the starting page, or just default to Dec 2024
    const [currentDate, setCurrentDate] = useState(new Date("2024-12-01T00:00:00"));

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Native JS calculation for a true calendar grid
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Sunday=0, Monday=1, ..., Sat=6
    const firstDayNormalized = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Make Monday=0

    // Build the grid array
    const gridCells = [];
    for (let i = 0; i < firstDayNormalized; i++) {
        gridCells.push(null); // Empty prefix days
    }
    for (let i = 1; i <= daysInMonth; i++) {
        gridCells.push(i);
    }
    // Pad end of month to complete the row if necessary
    const remainingCells = 42 - gridCells.length; // 6 rows of 7 = 42
    for (let i = 0; i < remainingCells; i++) {
        gridCells.push(null);
    }

    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

    return (
        <section id="tour-dates" className="relative w-full bg-[#050505] text-white py-24 md:py-32 border-b border-neutral-900 overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 opacity-20 md:opacity-30 pointer-events-none mix-blend-lighten">
                <img src="/assets/an5.JPEG" alt="Tour Background" className="w-full h-full object-cover filter grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]"></div>
            </div>

            {/* Background Texture & Blur */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_100%)] pointer-events-none z-0"></div>

            <div className="container mx-auto px-4 md:px-12 max-w-7xl relative z-10">
                {/* Header Sequence */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                            <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1 bg-primary/10">
                                GLOBAL SECURE ITINERARY
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-anton uppercase tracking-tight text-white leading-none">
                            TOUR <br className="hidden md:block" /> MATRIX
                        </h2>
                    </motion.div>

                    {/* Navigation Dashboard Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-start md:items-end gap-4 self-start md:self-end text-neutral-400 group"
                    >
                        {/* Fake Visualizer Graphic */}
                        <div className="hidden md:flex gap-1.5 h-6 items-end justify-end w-full saturate-0 group-hover:saturate-100 transition-all opacity-50 group-hover:opacity-100">
                            {[2, 4, 7, 3, 8, 5, 2, 9, 6, 4].map((h, i) => (
                                <div key={i} className="w-1.5 bg-primary" style={{ height: `${h * 10}%` }}></div>
                            ))}
                        </div>

                        <div className="flex items-center gap-1 border border-neutral-800 bg-[#0a0a0a] p-1 font-mono text-sm tracking-widest uppercase shadow-2xl">
                            <button onClick={prevMonth} className="px-6 py-3 bg-neutral-900 hover:bg-white hover:text-black transition-colors font-bold">
                                {'<'}
                            </button>
                            <div className="w-48 text-center text-white px-2 font-bold text-xs md:text-sm">
                                {MONTH_NAMES[month]} // '{year.toString().slice(-2)}
                            </div>
                            <button onClick={nextMonth} className="px-6 py-3 bg-neutral-900 hover:bg-primary hover:text-white transition-colors font-bold">
                                {'>'}
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Highly Technical Matrix / Sequencer Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="w-full border-t border-l border-neutral-800/80 bg-neutral-950/40 shadow-2xl relative backdrop-blur-md"
                >
                    {/* Glowing Accent line top edge */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 border-b border-neutral-800/80">
                        {WEEKDAYS.map(day => (
                            <div key={day} className="py-4 px-2 md:px-4 border-r border-neutral-800/80 text-center md:text-left font-mono text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-[0.2em] bg-black">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Days Matrix */}
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={`${year}-${month}`}
                            initial={{ opacity: 0, filter: "brightness(0.5) contrast(1.2)" }}
                            animate={{ opacity: 1, filter: "brightness(1) contrast(1)" }}
                            exit={{ opacity: 0, filter: "brightness(0.5) contrast(1.2)" }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="grid grid-cols-7"
                        >
                            {gridCells.map((dayNum, i) => {
                                // EMPTY CELLS: Complex technical pattern
                                if (dayNum === null) {
                                    return (
                                        <div key={`empty-${i}`} className="relative aspect-square md:aspect-[4/3] border-r border-b border-neutral-800/40 border-dashed bg-black/50 overflow-hidden flex items-center justify-center pointer-events-none">
                                            <span className="text-neutral-900 font-anton text-6xl md:text-8xl select-none leading-none opacity-20 transform -rotate-12">///</span>
                                        </div>
                                    );
                                }

                                const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                                const event = EVENTS.find(e => e.date === dayString);

                                // ACTIVE GIG CELLS: Brutalist high-contrast blocks
                                if (event) {
                                    return (
                                        <div key={`day-${dayNum}`} className="relative aspect-square md:aspect-[4/3] border-r border-b border-primary/40 bg-primary/[0.03] hover:bg-primary transition-all duration-300 cursor-none group overflow-hidden">

                                            {/* Massive BG Date Number */}
                                            <span className="absolute -bottom-4 -right-4 font-anton text-[100px] md:text-[180px] leading-none text-primary/10 group-hover:text-black/20 select-none transition-colors duration-300">
                                                {String(dayNum).padStart(2, '0')}
                                            </span>

                                            {/* Foreground Date */}
                                            <div className="absolute top-4 left-4 font-mono font-bold text-lg md:text-2xl text-primary group-hover:text-white z-10 transition-colors duration-300">
                                                {String(dayNum).padStart(2, '0')}
                                            </div>

                                            {/* Event Data Block */}
                                            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col items-start pt-4 border-t border-primary/20 group-hover:border-black/20 transition-colors duration-300">
                                                <h3 className="font-anton uppercase text-xl md:text-4xl leading-[0.85] text-white group-hover:text-black mt-2 tracking-wide hidden sm:block">
                                                    {event.city}
                                                </h3>
                                                <p className="font-mono text-[9px] md:text-xs text-neutral-400 group-hover:text-neutral-900 mt-2 uppercase tracking-widest hidden sm:block truncate w-full font-bold">
                                                    {event.venue}
                                                </p>
                                            </div>

                                            {/* Mobile Indicator */}
                                            <div className="absolute right-3 top-3 w-2 h-2 bg-primary rounded-full animate-ping sm:hidden group-hover:bg-white group-hover:animate-none"></div>

                                            {/* Custom Cursor Replacement on Hover */}
                                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block z-20">
                                                <div className="px-3 py-1 bg-black text-white font-mono text-[10px] font-bold tracking-widest uppercase shadow-2xl border border-neutral-800">
                                                    {event.status} ↗
                                                </div>
                                            </div>

                                            {/* Scanning Line overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                                        </div>
                                    );
                                }

                                // NORMAL (INACTIVE) DAY CELLS
                                return (
                                    <div key={`day-${dayNum}`} className="relative flex items-start justify-start aspect-square md:aspect-[4/3] border-r border-b border-dashed border-neutral-800/60 p-4 bg-transparent hover:bg-neutral-900/40 transition-colors group overflow-hidden">

                                        {/* Subtle Matrix BG */}
                                        <span className="absolute bottom-0 right-0 text-neutral-800 hidden md:block font-mono text-[9px] p-3 select-none tracking-widest opacity-50">
                                            D-{String(dayNum).padStart(2, '0')}
                                        </span>

                                        <span className="font-mono text-sm md:text-base font-bold text-neutral-600 group-hover:text-white transition-colors">
                                            {String(dayNum).padStart(2, '0')}
                                        </span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
