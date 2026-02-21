"use client";

import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const releases = [
    { title: "SAPNE", subtitle: "Single", artist: "artcriminal", cover: "/assets/a1.jpg" },
    { title: "MAURYA", subtitle: "feat. Mitika Kanwar", artist: "artcriminal", cover: "/assets/a2.jpg" },
    { title: "KALYANI", subtitle: "Single", artist: "ARJN, KDS, FIFTY4 & RONN", cover: "/assets/a3.jpg" },
    { title: "Kulasthree", subtitle: "Single", artist: "ThirumaLi", cover: "/assets/a4.jpg" },
    { title: "Hanumanji", subtitle: "feat. Maaru", artist: "Ramdee", cover: "/assets/a5.jpg" },
    { title: "Tension", subtitle: "Single", artist: "Dhanda Nyoliwala", cover: "/assets/an1.JPG" },
];

function VinylCard({ cover, title, subtitle, artist, index }: any) {
    const [hovered, setHovered] = useState(false);
    const discRef = useRef<HTMLDivElement>(null);
    const angleRef = useRef(0);
    const rafRef = useRef<number>(0);

    // True requestAnimationFrame spin — no React re-renders
    useEffect(() => {
        const disc = discRef.current;
        if (!disc) return;

        const animate = () => {
            if (hovered) {
                angleRef.current = (angleRef.current + 1.5) % 360;
                disc.style.transform = `rotate(${angleRef.current}deg)`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [hovered]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            className="flex-shrink-0 flex flex-col items-center gap-4"
            style={{ width: "340px" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* 3D Scene */}
            <div
                style={{
                    width: "270px",
                    height: "270px",
                    position: "relative",
                    perspective: "800px",
                    perspectiveOrigin: "50% 50%",
                    overflow: "visible",
                }}
            >
                {/* Vinyl disc — behind sleeve */}
                <div
                    ref={discRef}
                    style={{
                        position: "absolute",
                        width: "255px",
                        height: "255px",
                        top: "8px",
                        left: hovered ? "95px" : "18px",
                        borderRadius: "50%",
                        /* Lighter base so disc is visible against dark bg */
                        background: "radial-gradient(circle at 40% 35%, #585858 0%, #2e2e2e 30%, #1a1a1a 55%, #0e0e0e 80%, #060606 100%)",
                        boxShadow: hovered
                            ? "6px 6px 40px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 60px rgba(0,0,0,0.6)"
                            : "3px 3px 24px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 40px rgba(0,0,0,0.5)",
                        transition: "left 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        zIndex: 0,
                        willChange: "transform",
                    }}
                >
                    {/* Groove rings — alternating bright/dim for realism */}
                    {[18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90].map((r, i) => (
                        <div
                            key={r}
                            style={{
                                position: "absolute",
                                top: `${50 - r / 2}%`,
                                left: `${50 - r / 2}%`,
                                width: `${r}%`,
                                height: `${r}%`,
                                borderRadius: "50%",
                                border: `1px solid rgba(255,255,255,${i % 3 === 0 ? 0.14 : 0.05})`,
                            }}
                        />
                    ))}

                    {/* Strong specular sheen — top-left bright spot */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 25%, transparent 50%, rgba(255,255,255,0.06) 100%)",
                        }}
                    />
                    {/* Secondary bottom-right sheen */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            background: "radial-gradient(ellipse at 70% 70%, rgba(255,255,255,0.18) 0%, transparent 60%)",
                        }}
                    />

                    {/* Red center label */}
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "28%",
                            height: "28%",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, #ff2020 0%, #cc0000 55%, #7f0000 100%)",
                            boxShadow: "0 0 14px rgba(220,38,38,0.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ width: "22%", height: "22%", borderRadius: "50%", background: "#000" }} />
                    </div>
                </div>

                {/* Sleeve (cover art) — on top, 3D tilt on hover */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "255px",
                        height: "255px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        zIndex: 1,
                        transformStyle: "preserve-3d",
                        transform: hovered
                            ? "perspective(800px) rotateY(-12deg) rotateX(3deg) scale(1.03)"
                            : "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)",
                        transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        transformOrigin: "left center",
                        boxShadow: hovered
                            ? "-8px 8px 40px rgba(220,38,38,0.3), -4px 4px 20px rgba(0,0,0,0.8)"
                            : "0 8px 30px rgba(0,0,0,0.7)",
                    }}
                >
                    <Image src={cover} alt={title} fill className="object-cover" />
                    {/* Bottom gradient */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                        }}
                    />
                    {/* Red tint on hover */}
                    {hovered && (
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "rgba(220,38,38,0.12)",
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Track Info */}
            <div style={{ width: "270px", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {title}
                    </span>
                    <span style={{ fontSize: "9px", color: "#DC2626", fontFamily: "monospace", textTransform: "uppercase" }}>
                        {subtitle}
                    </span>
                </div>
                <p style={{ fontSize: "9px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "2px" }}>
                    {artist}
                </p>
            </div>
        </motion.div>
    );
}

export default function Releases() {
    const x = useMotionValue(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    return (
        <section
            id="releases"
            className="relative w-full bg-[#050505] py-24 overflow-hidden border-t border-neutral-900"
        >
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-16 flex justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <span className="bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                            LATEST RELEASES
                        </span>
                        <h2 className="text-3xl font-light text-white md:text-5xl text-center">
                            Fresh off the press.
                        </h2>
                    </div>
                </div>

                <p className="text-center text-neutral-600 text-[10px] uppercase tracking-widest mb-10">
                    ← Drag to explore →
                </p>
            </div>

            {/* Draggable Slider */}
            <div className="overflow-hidden w-full flex" ref={carouselRef}>
                <motion.div
                    drag="x"
                    dragConstraints={carouselRef}
                    dragElastic={0.08}
                    style={{ x, display: "flex", gap: "64px", paddingLeft: "60px", paddingRight: "60px", cursor: "grab" }}
                    whileTap={{ cursor: "grabbing" }}
                >
                    {releases.map((release, index) => (
                        <VinylCard key={index} {...release} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
