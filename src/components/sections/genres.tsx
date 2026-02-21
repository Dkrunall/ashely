"use client";

import { motion } from "framer-motion";

const genres = [
    "HIP HOP",
    "TRAP",
    "DRILL",
    "BREAKBEAT",
    "BAILE-FUNK",
    "COMMERCIAL",
    "TECH HOUSE",
    "AFRO HOUSE",
    "DRUM & BASS",
    "JUNGLE",
    "BOLLYWOOD X PUNJABI"
];

export default function Genres() {
    // Duplicate the array to ensure seamless infinite scrolling
    const duplicatedGenres = [...genres, ...genres, ...genres];

    return (
        <section className="relative w-full overflow-hidden bg-primary py-8 md:py-12 flex items-center border-t border-b border-neutral-900 border-opacity-50">
            {/* 
                Framer Motion Marquee
                We animate `x` from 0 to -50% to create a seamless loop since the content is duplicated 
            */}
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: ["0%", "-33.333%"]
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30 // Adjust speed here
                }}
            >
                {duplicatedGenres.map((genre, index) => {
                    const imgs = ["/assets/an1.JPG", "/assets/an3.JPG", "/assets/an5.JPEG"];
                    const imgIndex = index % imgs.length;

                    return (
                        <div key={index} className="flex items-center">
                            <span
                                className="text-4xl md:text-7xl lg:text-8xl font-anton text-black uppercase tracking-tight mx-4 md:mx-8"
                            >
                                {genre}
                            </span>
                            {/* Star or Image separator */}
                            {index % 4 === 1 ? (
                                <img
                                    src={imgs[imgIndex]}
                                    alt="Genre Vibe"
                                    className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-full filter grayscale mx-2 md:mx-4 border-2 border-black"
                                />
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-2 md:mx-4 opacity-50">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="black" />
                                </svg>
                            )}
                        </div>
                    );
                })}
            </motion.div>
        </section>
    );
}
