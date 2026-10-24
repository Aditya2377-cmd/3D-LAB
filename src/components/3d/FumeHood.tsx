import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { QualityMode } from '../../types';

interface FumeHoodProps {
  position: [number, number, number];
  quality: QualityMode;
  isSelected?: boolean;
  onHover?: (id: string | null) => void;
  onClick?: (id: string) => void;
}

export const FumeHood: React.FC<FumeHoodProps> = ({
  position,
  quality,
  isSelected,
  onHover,
  onClick
}) => {
  const sashRef = useRef<THREE.Group>(null);
  const [sashOpen, setSashOpen] = useState(false);

  useFrame((_, delta) => {
    if (!sashRef.current) return;
    // Sash slides vertically between 0.35 (closed/safe) and 0.8 (open)
    const targetY = sashOpen ? 0.75 : 0.38;
    sashRef.current.position.y = THREE.MathUtils.damp(
      sashRef.current.position.y,
      targetY,
      6,
      delta
    );
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setSashOpen(!sashOpen);
        if (onClick) onClick('fume_hood');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        if (onHover) onHover('fume_hood');
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        if (onHover) onHover(null);
      }}
    >
      {/* 1. Outer Hood Body Structure */}
      <mesh position={[0, 0, 0]} castShadow={quality === 'high'}>
        <boxGeometry args={[1.6, 2.2, 0.9]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* 2. Stainless Steel Interior Chamber Cutout */}
      <mesh position={[0, -0.05, 0.05]}>
        <boxGeometry args={[1.4, 1.25, 0.75]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* 3. Aerodynamic Airfoil Sill at Bottom */}
      <mesh position={[0, -0.66, 0.44]}>
        <boxGeometry args={[1.4, 0.04, 0.08]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* 4. Sliding Glass Sash Frame & Polycarbonate Glass Pane */}
      <group ref={sashRef} position={[0, 0.38, 0.42]}>
        {/* Aluminum Sash Frame border */}
        <mesh>
          <boxGeometry args={[1.36, 0.65, 0.03]} />
          <meshStandardMaterial
            color="#38bdf8"
            roughness={0.1}
            metalness={0.15}
            transparent={true}
            opacity={0.45}
            depthWrite={false}
          />
        </mesh>
        {/* Sash Grip Handle */}
        <mesh position={[0, -0.32, 0.02]}>
          <boxGeometry args={[0.9, 0.03, 0.04]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      {/* 5. VAV Airflow Monitor Screen & Status Indicator */}
      <group position={[0.62, 0.78, 0.46]}>
        {/* Monitor Screen Bezel */}
        <mesh>
          <boxGeometry args={[0.18, 0.12, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        {/* Green Safe Airflow LCD */}
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.15, 0.09]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>

      {/* 6. Interior Vapor-Proof LED Light Strip */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[1.2, 0.03, 0.06]} />
        <meshBasicMaterial color="#f8fafc" />
      </mesh>
      <pointLight position={[0, 0.45, 0.1]} color="#f1f5f9" intensity={1.8} distance={2} decay={2} />

      {/* Top Exhaust Duct Collar */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.6} />
      </mesh>
    </group>
  );
};
