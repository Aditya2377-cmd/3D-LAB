import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { QualityMode } from '../../types';

interface EyewashStationProps {
  position: [number, number, number];
  quality: QualityMode;
  isActive: boolean;
  isSelected?: boolean;
  onHover?: (id: string | null) => void;
  onClick?: (id: string) => void;
}

export const EyewashStation: React.FC<EyewashStationProps> = ({
  position,
  quality,
  isActive,
  isSelected,
  onHover,
  onClick
}) => {
  const flagRef = useRef<THREE.Group>(null);
  const showerChainRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!flagRef.current) return;
    // Push lever tilts forward when activated
    const targetTilt = isActive ? 0.6 : 0;
    flagRef.current.rotation.x = THREE.MathUtils.damp(
      flagRef.current.rotation.x,
      targetTilt,
      8,
      delta
    );
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick('eyewash_station');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        if (onHover) onHover('eyewash_station');
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        if (onHover) onHover(null);
      }}
    >
      {/* 1. Floor Mounting Flange */}
      <mesh position={[0, -1.18, 0]}>
        <cylinderGeometry args={[0.15, 0.16, 0.04, 16]} />
        <meshStandardMaterial color="#ca8a04" roughness={0.5} />
      </mesh>

      {/* 2. Vertical Safety Yellow Galvanized Pipe Stanchion */}
      <mesh position={[0, 0, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[0.035, 0.035, 2.4, 16]} />
        <meshStandardMaterial color="#eab308" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* 3. Stainless Steel Eyewash Collection Basin */}
      <mesh position={[0.18, -0.15, 0]}>
        <cylinderGeometry args={[0.18, 0.14, 0.1, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.25} metalness={0.9} />
      </mesh>

      {/* Dual Aerator Spray Heads */}
      <mesh position={[0.14, -0.07, -0.05]}>
        <cylinderGeometry args={[0.018, 0.022, 0.05, 12]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} />
      </mesh>
      <mesh position={[0.14, -0.07, 0.05]}>
        <cylinderGeometry args={[0.018, 0.022, 0.05, 12]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} />
      </mesh>

      {/* 4. Yellow "PUSH" Activation Flag Lever */}
      <group ref={flagRef} position={[0.34, -0.12, 0.1]}>
        {/* Lever axle rod */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>
        {/* Yellow Push Flag Blade */}
        <mesh position={[0, 0.06, 0.01]}>
          <boxGeometry args={[0.012, 0.14, 0.1]} />
          <meshStandardMaterial color="#eab308" roughness={0.3} />
        </mesh>
      </group>

      {/* 5. Overhead Emergency Drench Shower Deluge Head */}
      <mesh position={[0.3, 1.15, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.6, 12]} />
        <meshStandardMaterial color="#eab308" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Curved elbow pipe to shower head */}
      <mesh position={[0.55, 1.15, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.5, 12]} />
        <meshStandardMaterial color="#eab308" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* High-flow stainless shower head funnel */}
      <mesh position={[0.75, 1.05, 0]}>
        <coneGeometry args={[0.16, 0.12, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 6. Triangular Shower Pull Chain & Handle */}
      <mesh ref={showerChainRef} position={[0.75, 0.65, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.7, 6]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Triangular ring handle */}
      <mesh position={[0.75, 0.28, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.045, 0.006, 6, 16]} />
        <meshStandardMaterial color="#eab308" roughness={0.3} />
      </mesh>

      {/* 7. Safety Protocol Instruction Sign Plate */}
      <mesh position={[-0.04, 0.45, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.32, 0.42, 0.01]} />
        <meshStandardMaterial color="#0284c7" roughness={0.4} />
      </mesh>
      <mesh position={[-0.047, 0.45, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.28, 0.38]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};
