"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
    { name: "ABOUT", href: "#about" },
    { name: "CLIENTS", href: "#clients" },
    { name: "TEAM", href: "#team" },
    { name: "SERVICES", href: "#services" },
    { name: "CONTACT", href: "#contact" },
    { name: "WHY", href: "#why" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-6 left-4 md:bottom-12 md:left-12 z-40 flex items-center gap-3 md:gap-6 font-mono text-[9px] md:text-xs font-bold">
            {/* Visual Icon - Rotating Asterisk */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                }}
            >
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-primary w-10 h-10 md:w-16 md:h-16">
                    <path d="M12 2.5L14.5 9.5H21.5L16 13.5L18 20.5L12 16.5L6 20.5L8 13.5L2.5 9.5H9.5L12 2.5Z" />
                </svg>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex flex-col gap-2 md:gap-3"
            >
                <div className="flex gap-2 md:gap-3">
                    <Link href="/about" className="nav-pill bg-primary text-black px-3 py-1.5 md:px-5 md:py-2 rounded-full hover:bg-white transition-colors">ABOUT</Link>
                    <Link href="/genres" className="nav-pill bg-primary text-black px-3 py-1.5 md:px-5 md:py-2 rounded-full hover:bg-white transition-colors">GENRES</Link>
                    <Link href="/releases" className="nav-pill bg-primary text-black px-3 py-1.5 md:px-5 md:py-2 rounded-full hover:bg-white transition-colors">RELEASES</Link>
                </div>
                <div className="flex gap-2 md:gap-3">
                    <Link href="/tour" className="nav-pill bg-primary text-black px-3 py-1.5 md:px-5 md:py-2 rounded-full hover:bg-white transition-colors">TOUR</Link>
                    <Link href="/technical" className="nav-pill bg-primary text-black px-3 py-1.5 md:px-5 md:py-2 rounded-full hover:bg-white transition-colors">RIDER</Link>
                    <Link href="/contact" className="nav-pill bg-primary text-black px-3 py-1.5 md:px-5 md:py-2 rounded-full hover:bg-white transition-colors">CONTACT</Link>
                </div>
            </motion.div>

        </nav>
    );
}
