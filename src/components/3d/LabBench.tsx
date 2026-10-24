import React from 'react';
import { QualityMode } from '../../types';

interface LabBenchProps {
  quality: QualityMode;
}

export const LabBench: React.FC<LabBenchProps> = ({ quality }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Main Chemical-Resistant Black Epoxy Resin Countertop */}
      <mesh position={[0, 0.9, 0]} receiveShadow={quality === 'high'}>
        <boxGeometry args={[3.2, 0.08, 1.3]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.25}
          metalness={0.15}
        />
      </mesh>

      {/* 2. Beveled Edge Trim */}
      <mesh position={[0, 0.94, 0.655]}>
        <boxGeometry args={[3.2, 0.01, 0.01]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* 3. Base Storage Cabinets (Oak/Polypropylene finish) */}
      <mesh position={[0, 0.43, 0]} castShadow={quality === 'high'}>
        <boxGeometry args={[3.1, 0.86, 1.2]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>

      {/* Cabinet Doors with hairline divides & handles */}
      {[-1.05, -0.35, 0.35, 1.05].map((x, i) => (
        <group key={i} position={[x, 0.45, 0.61]}>
          {/* Cabinet Door panel */}
          <mesh>
            <boxGeometry args={[0.66, 0.76, 0.02]} />
            <meshStandardMaterial color="#1e293b" roughness={0.65} />
          </mesh>
          {/* Brushed Stainless Steel Handle */}
          <mesh position={[0.22, 0.2, 0.02]}>
            <boxGeometry args={[0.02, 0.14, 0.02]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* 4. Benchtop Gas Turret with Two Valve Cocks */}
      <group position={[0.65, 0.94, -0.4]}>
        {/* Brass Turret Base */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.025, 0.03, 0.08, 12]} />
          <meshStandardMaterial color="#b45309" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Left Gas Cock Nozzle */}
        <mesh position={[-0.04, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.012, 0.05, 10]} />
          <meshStandardMaterial color="#b45309" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Right Gas Cock Nozzle */}
        <mesh position={[0.04, 0.06, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.012, 0.05, 10]} />
          <meshStandardMaterial color="#b45309" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Valve Key Handle */}
        <mesh position={[0, 0.09, 0]}>
          <boxGeometry args={[0.045, 0.012, 0.012]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} />
        </mesh>
      </group>

      {/* 5. Epoxy Lab Sink with Gooseneck Faucet */}
      <group position={[-1.15, 0.94, 0]}>
        {/* Sink Basin Cavity */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.5, 0.22, 0.6]} />
          <meshStandardMaterial color="#090d16" roughness={0.6} />
        </mesh>
        {/* Stainless Steel Strainer */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Chrome Gooseneck Faucet */}
        <mesh position={[0, 0.16, -0.25]}>
          <cylinderGeometry args={[0.015, 0.018, 0.32, 12]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Curved Spout */}
        <mesh position={[0, 0.33, -0.17]} rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.16, 12]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Wrist-Blade Handles (Hot / Cold) */}
        <mesh position={[-0.07, 0.05, -0.25]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.015, 0.08, 0.015]} />
          <meshStandardMaterial color="#ef4444" roughness={0.4} />
        </mesh>
        <mesh position={[0.07, 0.05, -0.25]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.015, 0.08, 0.015]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
      </group>

      {/* 6. Reagent Shelf with Uprights */}
      <group position={[0, 1.45, -0.45]}>
        {/* Shelf Tier 1 */}
        <mesh position={[0, 0, 0]} receiveShadow={quality === 'high'}>
          <boxGeometry args={[2.2, 0.03, 0.28]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        {/* Shelf Upright Struts */}
        <mesh position={[-0.95, -0.26, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.52, 10]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.95, -0.26, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.52, 10]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};
