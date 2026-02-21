"use client";

import { motion } from "framer-motion";

const bars = [1, 2, 3, 2, 1, 4, 5, 4, 2, 1, 3, 4];

export default function Equalizer() {
    return (
        <div className="flex h-12 w-full items-end gap-1 overflow-hidden opacity-50">
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="w-4 bg-primary"
                    animate={{
                        height: [
                            "20%",
                            `${Math.random() * 80 + 20}%`,
                            "40%",
                            `${Math.random() * 90 + 10}%`,
                            "20%",
                        ],
                    }}
                    transition={{
                        duration: Math.random() * 0.5 + 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
