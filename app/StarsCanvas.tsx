'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface StarsCanvasProps {
  isMobile: boolean;
}

export default function StarsCanvas({ isMobile }: StarsCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 75 }}
      gl={{
        powerPreference: 'high-performance',
        antialias: !isMobile,
        alpha: false,
      }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.4} />
      <StarsParticles isMobile={isMobile} />
    </Canvas>
  );
}

function StarsParticles({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Points>(null);

  const starsData = useMemo(() => {
    const count = isMobile ? 1500 : 4000;
    const positions = new Float32Array(count * 3);
    let index = 0;
    
    
    const seededRandom = (seedVal: number): number => {
    const x = Math.sin(seedVal++) * 10000;  // ✅ const umjesto let
    return x - Math.floor(x);
    };


    const scaleX = isMobile ? 1000 : 2000;
    const scaleY = isMobile ? 600 : 1200;
    const scaleZ = isMobile ? 750 : 1500;

    for (let i = 0; i < count; i++) {
      const baseSeed = 42 + i * 17;
      positions[index++] = (seededRandom(baseSeed) - 0.5) * scaleX;
      positions[index++] = (seededRandom(baseSeed + 1) - 0.5) * scaleY;
      positions[index++] = (seededRandom(baseSeed + 2) - 0.5) * scaleZ;
    }
    
    return positions; // ✅ Vraća SAMO positions array
  }, [isMobile]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += isMobile ? 0.0015 : 0.0008;
      meshRef.current.rotation.x += isMobile ? 0.001 : 0.0005;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        {/* ✅ OVO JE MAGICNO - args=[array, itemSize] */}
        <bufferAttribute
          attach="attributes-position"
          args={[starsData, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={isMobile ? 0.5 : 0.7} 
        color="#ffffff" 
        sizeAttenuation 
        transparent 
        opacity={0.8} 
      />
    </points>
  );
}
