"use client";

import { useGLTF, Html, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

const MODEL_PATH = "/assets/vinyl-record-and-sleeve-2026-01-07-03-54-20-utc/icons8_pink_vinyl_record_with_mo\u0441kup_cover.glb";

export default function VinylRecord({ position, rotation, title, artist, onClick }: any) {
    const group = useRef<THREE.Group>(null);
    const { scene } = useGLTF(MODEL_PATH);
    const [hovered, setHovered] = useState(false);

    // Clone and apply custom black + red material
    const clone = useMemo(() => {
        const clonedScene = scene.clone(true);

        // Create a custom canvas texture for the cover art (black with red center label)
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d")!;

        // --- Draw Vinyl Disc ---
        // Black background
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, 512, 512);

        // Vinyl grooves (concentric circles, dark grey)
        for (let r = 30; r < 240; r += 6) {
            ctx.beginPath();
            ctx.arc(256, 256, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255,255,255,${0.03 + (r % 12 === 0 ? 0.04 : 0)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Red center label
        const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 70);
        gradient.addColorStop(0, "#ff2222");
        gradient.addColorStop(0.6, "#cc0000");
        gradient.addColorStop(1, "#880000");
        ctx.beginPath();
        ctx.arc(256, 256, 70, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // White "DJ ASHELY" text on label
        ctx.fillStyle = "white";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("DJ ASHELY", 256, 248);
        ctx.font = "10px Arial";
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fillText("OFFICIAL", 256, 268);

        // Center hole
        ctx.beginPath();
        ctx.arc(256, 256, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.fill();

        const texture = new THREE.CanvasTexture(canvas);

        // Apply to all meshes
        clonedScene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.material = new THREE.MeshStandardMaterial({
                    map: texture,
                    roughness: 0.15,
                    metalness: 0.7,
                    envMapIntensity: 1.5,
                });
            }
        });

        return clonedScene;
    }, [scene]);

    useFrame((state, delta) => {
        if (group.current) {
            const targetY = hovered ? 0.3 : 0;
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, delta * 8);
            // Slow spin when hovered
            if (hovered) {
                group.current.rotation.y += delta * 0.5;
            }
        }
    });

    return (
        <group
            ref={group}
            position={position}
            rotation={rotation}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={onClick}
            dispose={null}
        >
            <Center>
                <primitive object={clone} />
            </Center>

            {/* Label Strip */}
            <Html
                transform
                occlude
                position={[0, -1.4, 0]}
                style={{ width: '160px', pointerEvents: 'none', userSelect: 'none' }}
            >
                <div style={{
                    background: 'rgba(0,0,0,0.92)',
                    color: 'white',
                    padding: '6px 10px',
                    borderTop: '2px solid #DC2626',
                    backdropFilter: 'blur(8px)',
                    width: '100%'
                }}>
                    <div style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
                    <div style={{ fontSize: '7px', color: '#aaa', fontFamily: 'monospace', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{artist}</div>
                </div>
            </Html>
        </group>
    );
}

useGLTF.preload(MODEL_PATH);
