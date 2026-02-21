export default function GrainOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full select-none opacity-20 contrast-[120%] mix-blend-overlay">
            <svg className="h-full w-full opacity-[0.2]">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.6"
                        stitchTiles="stitch"
                        numOctaves="3"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
}
