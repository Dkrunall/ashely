"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// -- WebAudio Synthesis Functions --
// We use simple oscillators so we don't need external audio files!
const playKick = (ctx: AudioContext, time: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);
    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
    osc.start(time);
    osc.stop(time + 0.5);
};

const playSnare = (ctx: AudioContext, time: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Noise buffer for snare
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;

    noise.connect(noiseFilter);
    noiseFilter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.connect(gain);

    osc.frequency.setValueAtTime(250, time);
    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

    osc.start(time);
    noise.start(time);
    osc.stop(time + 0.2);
    noise.stop(time + 0.2);
};

const playHihat = (ctx: AudioContext, time: number) => {
    const gain = ctx.createGain();
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 10000;

    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

    noise.start(time);
    noise.stop(time + 0.1);
};

const playBeep = (ctx: AudioContext, time: number, pitch = 440) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(pitch, time);

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

    osc.start(time);
    osc.stop(time + 0.1);
};

const TRACK_NAMES = ["KICK", "SNARE", "HIHAT", "SYNTH"];

export default function BeatMixer() {
    const [isOpen, setIsOpen] = useState(false);

    // 4 Tracks, 8 Steps each
    const [grid, setGrid] = useState<boolean[][]>(
        Array(4).fill(null).map(() => Array(8).fill(false))
    );

    // We need a ref for the grid so the WebAudio scheduler doesn't read a stale closure!
    const gridRef = useRef(grid);
    useEffect(() => {
        gridRef.current = grid;
    }, [grid]);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [bpm, setBpm] = useState(120);

    // Audio Context State
    const audioCtxRef = useRef<AudioContext | null>(null);
    const stepRef = useRef(0);
    const nextNoteTimeRef = useRef(0);
    const timerIDRef = useRef<number | null>(null);
    const lookahead = 25.0; // ms
    const scheduleAheadTime = 0.1; // s

    // Toggle pad function
    const togglePad = (trackIndex: number, stepIndex: number) => {
        const newGrid = [...grid];
        newGrid[trackIndex] = [...newGrid[trackIndex]];
        newGrid[trackIndex][stepIndex] = !newGrid[trackIndex][stepIndex];
        setGrid(newGrid);

        // Play sample instantly if opened and clicking
        if (newGrid[trackIndex][stepIndex] && audioCtxRef.current) {
            const time = audioCtxRef.current.currentTime;
            if (trackIndex === 0) playKick(audioCtxRef.current, time);
            if (trackIndex === 1) playSnare(audioCtxRef.current, time);
            if (trackIndex === 2) playHihat(audioCtxRef.current, time);
            if (trackIndex === 3) playBeep(audioCtxRef.current, time, 440 + stepIndex * 50);
        }
    };

    // Core Scheduler
    const nextNote = () => {
        const secondsPerBeat = 60.0 / bpm;
        // 16th notes
        nextNoteTimeRef.current += 0.25 * secondsPerBeat;
        stepRef.current = (stepRef.current + 1) % 8;
    };

    const scheduleNote = (stepNumber: number, time: number) => {
        // Queue UI visual update
        requestAnimationFrame(() => {
            setCurrentStep(stepNumber);
        });

        // Play sounds exactly on time using the REF to avoid stale closures
        const currentGrid = gridRef.current;
        if (currentGrid[0][stepNumber]) playKick(audioCtxRef.current!, time);
        if (currentGrid[1][stepNumber]) playSnare(audioCtxRef.current!, time);
        if (currentGrid[2][stepNumber]) playHihat(audioCtxRef.current!, time);
        if (currentGrid[3][stepNumber]) playBeep(audioCtxRef.current!, time, 440 + stepNumber * 50);
    };

    const scheduler = () => {
        while (nextNoteTimeRef.current < audioCtxRef.current!.currentTime + scheduleAheadTime) {
            scheduleNote(stepRef.current, nextNoteTimeRef.current);
            nextNote();
        }
        timerIDRef.current = window.setTimeout(scheduler, lookahead);
    };

    useEffect(() => {
        if (isPlaying) {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            if (audioCtxRef.current.state === "suspended") {
                audioCtxRef.current.resume();
            }

            stepRef.current = 0;
            nextNoteTimeRef.current = audioCtxRef.current.currentTime + 0.1;
            setCurrentStep(0);
            scheduler();
        } else {
            if (timerIDRef.current !== null) {
                window.clearTimeout(timerIDRef.current);
            }
        }
        return () => {
            if (timerIDRef.current !== null) {
                window.clearTimeout(timerIDRef.current);
            }
        };
    }, [isPlaying, bpm]);

    // Initial Beat Pattern
    useEffect(() => {
        const initGrid = Array(4).fill(null).map(() => Array(8).fill(false));
        // Basic house beat
        initGrid[0][0] = true; initGrid[0][4] = true; // Kick
        initGrid[1][4] = true; // Snare
        initGrid[2][2] = true; initGrid[2][6] = true; // Hihat offbeat
        setGrid(initGrid);
    }, []);

    return (
        <>
            {/* Floating Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-12 right-6 md:right-12 z-[9999] bg-primary text-white font-mono font-bold text-xs uppercase tracking-widest py-3 px-4 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:scale-110 transition-transform flex items-center gap-2 border border-red-400 group overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform z-0"></div>
                <svg className="w-5 h-5 relative z-10 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <span className="hidden sm:block relative z-10 group-hover:text-black transition-colors">MIX A BEAT</span>
            </motion.button>

            {/* Mixer Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-4xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden relative"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 md:p-6 border-b border-neutral-800 bg-[#050505]">
                                <div className="flex items-center gap-4">
                                    <h3 className="font-anton text-2xl md:text-3xl uppercase tracking-widest text-white">
                                        BEAT<span className="text-primary">MAKER</span> 808
                                    </h3>
                                    <div className="hidden sm:flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-neutral-600'}`}></div>
                                        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                                            {isPlaying ? 'SEQ RUNNING' : 'SEQ STOPPED'}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setIsPlaying(false); setIsOpen(false); }}
                                    className="p-2 bg-neutral-900 hover:bg-white hover:text-black text-neutral-400 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Controls Bar */}
                            <div className="flex flex-wrap items-center justify-between p-4 bg-neutral-900/50 border-b border-neutral-800 gap-4">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className={`px-8 py-3 font-mono font-bold text-sm tracking-widest uppercase transition-all duration-300 ${isPlaying ? 'bg-white text-black drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-primary text-white hover:bg-red-600'}`}
                                >
                                    {isPlaying ? 'STOP SEQUENCE' : 'PLAY SEQUENCE'}
                                </button>

                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-xs text-neutral-400">BPM</span>
                                    <input
                                        type="range"
                                        min="60"
                                        max="180"
                                        value={bpm}
                                        onChange={(e) => setBpm(Number(e.target.value))}
                                        className="w-32 accent-primary"
                                    />
                                    <span className="font-mono font-bold text-white w-8 text-right">{bpm}</span>
                                </div>

                                <button
                                    onClick={() => setGrid(Array(4).fill(null).map(() => Array(8).fill(false)))}
                                    className="text-neutral-500 hover:text-white font-mono text-xs uppercase tracking-widest border border-neutral-800 p-2"
                                >
                                    CLEAR GRID
                                </button>
                            </div>

                            {/* Sequencer Grid */}
                            <div className="p-4 md:p-8 overflow-x-auto">
                                <div className="min-w-[500px] flex flex-col gap-2">
                                    {/* Visual Tracker Line */}
                                    <div className="flex ml-24 mb-2">
                                        {Array(8).fill(null).map((_, i) => (
                                            <div key={`tracker-${i}`} className="flex-1 flex justify-center">
                                                <div className={`w-2 h-2 rounded-full transition-colors duration-75 ${isPlaying && currentStep === i ? 'bg-primary shadow-[0_0_10px_rgba(220,38,38,0.8)]' : 'bg-transparent'}`}></div>
                                            </div>
                                        ))}
                                    </div>

                                    {grid.map((row, trackIndex) => (
                                        <div key={`track-${trackIndex}`} className="flex items-stretch gap-4">
                                            <div className="w-20 flex items-center justify-end pr-4 text-right border-r border-neutral-800 shrink-0">
                                                <span className="font-mono text-xs font-bold text-neutral-400 tracking-widest">
                                                    {TRACK_NAMES[trackIndex]}
                                                </span>
                                            </div>
                                            <div className="flex-1 flex gap-2">
                                                {row.map((isActive, stepIndex) => (
                                                    <button
                                                        key={`step-${trackIndex}-${stepIndex}`}
                                                        onClick={() => togglePad(trackIndex, stepIndex)}
                                                        className={`flex-1 aspect-square md:aspect-video rounded-sm flex items-center justify-center transition-all duration-100 relative overflow-hidden focus:outline-none
                                                            ${isActive
                                                                ? (trackIndex === 0 ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                                                                    : trackIndex === 1 ? 'bg-primary shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                                                                        : trackIndex === 2 ? 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                                                                            : 'bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.4)]')
                                                                : 'bg-neutral-900 hover:bg-neutral-800'
                                                            }
                                                            ${isPlaying && currentStep === stepIndex ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-95' : ''}
                                                        `}
                                                    >
                                                        {isActive && (
                                                            <div className="absolute inset-0 bg-white opacity-20" />
                                                        )}
                                                        {/* Sub-beat markers (every 4th step is lighter in a normal 16-step seq, here we just do alternating) */}
                                                        {!isActive && stepIndex % 2 === 0 && (
                                                            <div className="absolute inset-0 bg-white/[0.02]" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer info */}
                            <div className="p-4 border-t border-neutral-800 flex justify-between items-center text-neutral-500 font-mono text-[10px] uppercase">
                                <span>Powered by WebAudio API</span>
                                <div>Click pads to synthesize sound. <span className="text-primary font-bold">Try creating your own groove.</span></div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
