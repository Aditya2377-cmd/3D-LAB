import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { QualityMode } from '../../types';

interface FireAccidentFxProps {
  position: [number, number, number];
  active: boolean;
  quality: QualityMode;
}

export const FireAccidentFx: React.FC<FireAccidentFxProps> = ({ position, active, quality }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const flameGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!active) return;
    if (lightRef.current) {
      lightRef.current.intensity = 2.5 + Math.sin(Date.now() * 0.03) * 0.8 + Math.random() * 0.6;
    }
    if (flameGroup.current) {
      flameGroup.current.children.forEach((child, idx) => {
        const time = Date.now() * 0.015 + idx * 2.1;
        child.scale.y = 1 + Math.sin(time) * 0.35;
        child.rotation.y += delta * 1.5;
      });
    }
  });

  if (!active) return null;

  return (
    <group position={position}>
      {/* Dynamic fire light casting warm amber/red glow */}
      <pointLight
        ref={lightRef}
        position={[0, 0.25, 0]}
        color="#f97316"
        intensity={3}
        distance={3.5}
        decay={2}
      />

      {/* Scorched charred towel base */}
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <planeGeometry args={[0.28, 0.22]} />
        <meshStandardMaterial
          color="#1c1917"
          roughness={0.95}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Burning flames cluster */}
      <group ref={flameGroup} position={[0, 0.05, 0]}>
        <mesh position={[0, 0.06, 0]}>
          <coneGeometry args={[0.08, 0.22, 10]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0.04, 0.04, 0.02]}>
          <coneGeometry args={[0.06, 0.16, 8]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.85} />
        </mesh>
        <mesh position={[-0.03, 0.05, -0.02]}>
          <coneGeometry args={[0.05, 0.18, 8]} />
          <meshBasicMaterial color="#eab308" transparent opacity={0.9} />
        </mesh>
      </group>
    </group>
  );
};

interface SmokeParticlesProps {
  position: [number, number, number];
  active: boolean;
  quality: QualityMode;
}

export const SmokeParticles: React.FC<SmokeParticlesProps> = ({ position, active, quality }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = quality === 'high' ? 60 : 25;

  const [particles, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.15;
      pos[i * 3 + 1] = Math.random() * 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.15;

      vel[i * 3] = (Math.random() - 0.5) * 0.03;
      vel[i * 3 + 1] = 0.25 + Math.random() * 0.35;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
    }
    return [pos, vel];
  }, [count]);

  useFrame((_, delta) => {
    if (!active || !pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Y rising upward
      array[i * 3 + 1] += velocities[i * 3 + 1] * delta;
      // Drift sideways
      array[i * 3] += velocities[i * 3] * delta;
      array[i * 3 + 2] += velocities[i * 3 + 2] * delta;

      // Reset when reaching top
      if (array[i * 3 + 1] > 0.95) {
        array[i * 3 + 1] = 0;
        array[i * 3] = (Math.random() - 0.5) * 0.12;
        array[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
      }
    }
    posAttr.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={quality === 'high' ? 0.08 : 0.06}
        color="#94a3b8"
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
};

interface SpreadingSpillProps {
  position: [number, number, number];
  status: 'normal' | 'spilling' | 'neutralized';
  quality: QualityMode;
}

export const SpreadingSpill: React.FC<SpreadingSpillProps> = ({ position, status, quality }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentRadius = useRef(0.04);

  const isSpillActive = status === 'spilling' || status === 'neutralized';
  const isNeutralized = status === 'neutralized';

  useFrame((_, delta) => {
    if (!meshRef.current || !isSpillActive) return;
    // Puddle spreads gradually outward to max radius 0.28
    const targetRadius = isNeutralized ? 0.26 : 0.28;
    currentRadius.current = THREE.MathUtils.damp(currentRadius.current, targetRadius, 1.8, delta);
    meshRef.current.scale.set(currentRadius.current * 4, currentRadius.current * 3.5, 1);
  });

  if (!isSpillActive) return null;

  return (
    <group position={position}>
      {/* Spreading liquid decal puddle with polygonOffset to prevent z-fighting */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.003, 0]}
      >
        <circleGeometry args={[1, quality === 'high' ? 24 : 14]} />
        <meshStandardMaterial
          color={isNeutralized ? '#f1f5f9' : '#eab308'} // Neutralized slurry turns white
          roughness={isNeutralized ? 0.8 : 0.08}
          metalness={isNeutralized ? 0.1 : 0.3}
          transparent={true}
          opacity={isNeutralized ? 0.95 : 0.82}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Acid vapor fumes while actively spilling */}
      {!isNeutralized && (
        <SmokeParticles position={[0, 0.05, 0]} active={true} quality={quality} />
      )}
    </group>
  );
};

interface ExtinguisherSprayProps {
  position: [number, number, number];
  targetPosition: [number, number, number];
  active: boolean;
  quality: QualityMode;
}

export const ExtinguisherSpray: React.FC<ExtinguisherSprayProps> = ({
  position,
  active,
  quality
}) => {
  const coneRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!active || !coneRef.current) return;
    const pulse = 1 + Math.sin(Date.now() * 0.05) * 0.15;
    coneRef.current.scale.set(pulse, 1, pulse);
  });

  if (!active) return null;

  return (
    <group position={position}>
      <mesh ref={coneRef} position={[-0.4, 0.2, 0.3]} rotation={[0.4, -0.6, -0.8]}>
        <coneGeometry args={[0.22, 0.9, 12, 1, true]} />
        <meshBasicMaterial
          color="#f8fafc"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

interface EyewashStreamProps {
  active: boolean;
  quality: QualityMode;
}

export const EyewashStream: React.FC<EyewashStreamProps> = ({ active, quality }) => {
  if (!active) return null;

  return (
    <group position={[-2.1, 1.05, 0.8]}>
      {/* Left aerated water arc */}
      <mesh position={[0.04, 0.08, -0.04]} rotation={[0.3, 0, 0.2]}>
        <cylinderGeometry args={[0.007, 0.005, 0.14, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.75} />
      </mesh>
      {/* Right aerated water arc */}
      <mesh position={[0.04, 0.08, 0.04]} rotation={[-0.3, 0, 0.2]}>
        <cylinderGeometry args={[0.007, 0.005, 0.14, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.75} />
      </mesh>

      {/* Basin water puddle */}
      <mesh position={[0.05, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 16]} />
        <meshStandardMaterial color="#0284c7" roughness={0.1} transparent opacity={0.75} />
      </mesh>
    </group>
  );
};
