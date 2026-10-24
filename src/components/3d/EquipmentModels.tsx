import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { EquipmentItem, QualityMode } from '../../types';

interface EquipmentProps {
  item: EquipmentItem;
  quality: QualityMode;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  liquidColor?: string;
  liquidOpacity?: number;
}

// Reusable shared colors and constants
const HOVER_EMISSIVE = new THREE.Color(0x38bdf8);
const SELECTED_EMISSIVE = new THREE.Color(0x10b981);
const ZERO_COLOR = new THREE.Color(0x000000);

export const BunsenBurner: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const flameOuterRef = useRef<THREE.Mesh>(null);
  const flameInnerRef = useRef<THREE.Mesh>(null);
  const fireLightRef = useRef<THREE.PointLight>(null);

  const isTipped = item.status === 'tipped';
  const isOnFire = item.status === 'on_fire' || isTipped;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smoothly tilt if tipped
    const targetTilt = isTipped ? 1.45 : 0;
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetTilt,
      8,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      isTipped ? 0.35 : 0,
      8,
      delta
    );

    // Flame flicker animation
    if (flameOuterRef.current && isOnFire) {
      const flicker = 0.95 + Math.sin(Date.now() * 0.02) * 0.12 + Math.cos(Date.now() * 0.035) * 0.08;
      flameOuterRef.current.scale.set(flicker, 1 + (flicker - 1) * 1.5, flicker);
      if (flameInnerRef.current) {
        flameInnerRef.current.scale.set(flicker * 0.9, 1 + (flicker - 1) * 1.2, flicker * 0.9);
      }
      if (fireLightRef.current) {
        fireLightRef.current.intensity = 1.8 + Math.random() * 0.8;
      }
    }
  });

  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0;

  return (
    <group
      ref={groupRef}
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* 1. Heavy Hexagonal Cast-Iron Base */}
      <mesh position={[0, 0.015, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[0.075, 0.085, 0.03, 6]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.6}
          metalness={0.7}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* 2. Gas Needle Valve Thumb Knob */}
      <mesh position={[0.045, 0.025, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.035, 12]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* 3. Serrated Gas Inlet Hose Nozzle */}
      <mesh position={[-0.05, 0.025, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.009, 0.011, 0.05, 12]} />
        <meshStandardMaterial color="#d97706" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* Red Rubber Gas Hose to Bench Tap */}
      <mesh position={[-0.14, 0.015, -0.05]} rotation={[0.2, 0.4, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.16, 8]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* 4. Brass Air Adjustment Collar with air holes */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.04, 16]} />
        <meshStandardMaterial
          color="#d97706"
          roughness={0.25}
          metalness={0.85}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* 5. Polished Chrome Barrel Tube */}
      <mesh position={[0, 0.13, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[0.016, 0.018, 0.13, 16]} />
        <meshStandardMaterial
          color="#e2e8f0"
          roughness={0.18}
          metalness={0.92}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* 6. Burner Lip Crown */}
      <mesh position={[0, 0.198, 0]}>
        <cylinderGeometry args={[0.02, 0.016, 0.012, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.25} metalness={0.9} />
      </mesh>

      {/* 7. Active Flame System */}
      {isOnFire && (
        <group position={[0, 0.205, 0]}>
          {/* Inner Hottest Reducing Cone (Pale Cyan-Blue) */}
          <mesh ref={flameInnerRef} position={[0, 0.04, 0]}>
            <coneGeometry args={[0.012, 0.08, 12]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.2}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Outer Oxidizing Cone (Luminous Orange-Yellow) */}
          <mesh ref={flameOuterRef} position={[0, 0.07, 0]}>
            <coneGeometry args={[0.022, 0.15, 12]} />
            <meshStandardMaterial
              color="#f97316"
              emissive="#ea580c"
              emissiveIntensity={1.0}
              transparent
              opacity={0.7}
            />
          </mesh>

          {/* Dynamic Fire Point Light */}
          <pointLight
            ref={fireLightRef}
            position={[0, 0.12, 0]}
            color={isTipped ? '#ef4444' : '#f59e0b'}
            intensity={2.2}
            distance={2.8}
            decay={2}
          />
        </group>
      )}
    </group>
  );
};

export const TripodWithWireGauze: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* Top Cast Iron Support Ring */}
      <mesh position={[0, 0.23, 0]}>
        <torusGeometry args={[0.085, 0.007, 8, 20]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.5}
          metalness={0.7}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* 3 Flared Steel Legs */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
        <group key={i} rotation={[0, angle, 0]}>
          <mesh position={[0.065, 0.115, 0]} rotation={[0, 0, -0.16]} castShadow={quality === 'high'}>
            <cylinderGeometry args={[0.005, 0.006, 0.23, 8]} />
            <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Rubber foot cap */}
          <mesh position={[0.084, 0.006, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.012, 8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Ceramic-Centered Wire Gauze Sheet */}
      <mesh position={[0, 0.24, 0]}>
        <boxGeometry args={[0.18, 0.004, 0.18]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.6} metalness={0.6} />
      </mesh>
      {/* Circular white heat-diffusing ceramic center */}
      <mesh position={[0, 0.243, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.055, 20]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.85} metalness={0.1} />
      </mesh>
    </group>
  );
};

export const RetortStand: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* Heavy Rectangular Steel Base Plate */}
      <mesh position={[0, 0.012, 0]} castShadow={quality === 'high'}>
        <boxGeometry args={[0.22, 0.024, 0.14]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.5}
          metalness={0.7}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Vertical Solid Chrome Rod */}
      <mesh position={[0.07, 0.35, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[0.007, 0.007, 0.7, 12]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.92} />
      </mesh>

      {/* Bosshead Clamp Body */}
      <mesh position={[0.07, 0.42, 0]}>
        <boxGeometry args={[0.03, 0.035, 0.03]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.8} />
      </mesh>
      {/* T-Screw Knob */}
      <mesh position={[0.095, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.004, 0.004, 0.03, 8]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Extension Arm reaching toward the flask */}
      <mesh position={[-0.04, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.005, 0.005, 0.2, 8]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* 3-Prong Clamp with Vinyl Sleeves */}
      <group position={[-0.14, 0.42, 0]}>
        <mesh position={[0, 0.02, 0.018]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.04, 0.008, 0.04]} />
          <meshStandardMaterial color="#dc2626" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.02, 0.018]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.04, 0.008, 0.04]} />
          <meshStandardMaterial color="#dc2626" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};

export const ErlenmeyerFlask: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick,
  liquidColor,
  liquidOpacity
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* 1. Conical Borosilicate Glass Flask Body with PBR StandardMaterial */}
      <mesh position={[0, 0.085, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[0.035, 0.09, 0.16, 20]} />
        <meshStandardMaterial
          color="#f1f5f9"
          roughness={0.08}
          metalness={0.1}
          transparent={true}
          opacity={0.45}
          depthWrite={false}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* 2. Cylindrical Neck */}
      <mesh position={[0, 0.19, 0]}>
        <cylinderGeometry args={[0.032, 0.034, 0.06, 16]} />
        <meshStandardMaterial
          color="#f1f5f9"
          roughness={0.08}
          metalness={0.1}
          transparent={true}
          opacity={0.45}
          depthWrite={false}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* 3. Beveled Rim Lip */}
      <mesh position={[0, 0.222, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.034, 0.004, 8, 20]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.15} metalness={0.15} transparent opacity={0.7} />
      </mesh>

      {/* 4. Inside Solution (CuSO4 Blue Solution or Dynamic Experiment Color) */}
      <mesh position={[0, 0.048, 0]}>
        <cylinderGeometry args={[0.055, 0.082, 0.085, 16]} />
        <meshStandardMaterial
          color={liquidColor || "#0284c7"}
          roughness={0.1}
          metalness={0.15}
          transparent={true}
          opacity={liquidOpacity ?? 0.82}
        />
      </mesh>

      {/* 5. Black Rubber Stopper */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.033, 0.029, 0.035, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* 6. Glass Outlet Delivery Tube */}
      <mesh position={[0, 0.255, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.06, 8]} />
        <meshStandardMaterial
          color="#e0f2fe"
          roughness={0.15}
          transparent={true}
          opacity={0.65}
        />
      </mesh>

      {/* Volume Graduation Lines */}
      <mesh position={[0, 0.09, 0.065]}>
        <boxGeometry args={[0.028, 0.002, 0.002]} />
        <meshBasicMaterial color="#ffffff" opacity={0.9} transparent />
      </mesh>
      <mesh position={[0, 0.07, 0.075]}>
        <boxGeometry args={[0.034, 0.002, 0.002]} />
        <meshBasicMaterial color="#ffffff" opacity={0.9} transparent />
      </mesh>
    </group>
  );
};

export const VolumetricFlask: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* 1. Flat Bottom Base */}
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.045, 0.05, 0.03, 16]} />
        <meshStandardMaterial
          color="#f1f5f9"
          roughness={0.1}
          metalness={0.1}
          transparent={true}
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Pear-Shaped Bulb Body */}
      <mesh position={[0, 0.075, 0]} castShadow={quality === 'high'}>
        <sphereGeometry args={[0.075, 20, 16]} />
        <meshStandardMaterial
          color="#f1f5f9"
          roughness={0.1}
          metalness={0.1}
          transparent={true}
          opacity={0.45}
          depthWrite={false}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* 3. Inside Solution (Vibrant Violet KMnO4) */}
      <mesh position={[0, 0.065, 0]}>
        <sphereGeometry args={[0.07, 16, 14]} />
        <meshStandardMaterial
          color="#9333ea"
          roughness={0.1}
          metalness={0.15}
          transparent={true}
          opacity={0.85}
        />
      </mesh>

      {/* 4. Long Calibrated Neck */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.016, 0.018, 0.2, 16]} />
        <meshStandardMaterial
          color="#f1f5f9"
          roughness={0.1}
          metalness={0.1}
          transparent={true}
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>

      {/* Etched Ring Meniscus Line (White 250mL Mark) */}
      <mesh position={[0, 0.22, 0]}>
        <torusGeometry args={[0.0175, 0.0015, 6, 16]} />
        <meshBasicMaterial color="#ffffff" opacity={0.9} transparent />
      </mesh>

      {/* 5. Ground-Glass Pennyhead Stopper */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.017, 0.014, 0.03, 14]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} transparent opacity={0.6} />
      </mesh>
      {/* Flat Pennyhead disc */}
      <mesh position={[0, 0.342, 0]}>
        <cylinderGeometry args={[0.024, 0.024, 0.01, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.25} transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

export const BeakerAcid: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick,
  liquidColor,
  liquidOpacity
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const isSpilling = item.status === 'spilling';

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetZ = isSpilling ? 1.55 : 0;
    const targetY = isSpilling ? item.position[1] - 0.08 : item.position[1];
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetZ, 8, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 8, delta);
  });

  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0;

  return (
    <group
      ref={groupRef}
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* 1. Cylindrical Glass Beaker Body */}
      <mesh position={[0, 0.1, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[0.075, 0.075, 0.19, 20]} />
        <meshStandardMaterial
          color="#f1f5f9"
          roughness={0.08}
          metalness={0.1}
          transparent={true}
          opacity={0.45}
          depthWrite={false}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* 2. Pour Spout Lip */}
      <mesh position={[0.076, 0.194, 0]} rotation={[0, 0, -0.4]}>
        <coneGeometry args={[0.016, 0.022, 4]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.15} transparent opacity={0.65} />
      </mesh>

      {/* 3. Liquid Solution inside (Default acid or simulated reaction color) */}
      {!isSpilling && (
        <mesh position={[0, 0.065, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.11, 16]} />
          <meshStandardMaterial
            color={liquidColor || "#fbbf24"}
            roughness={0.1}
            metalness={0.15}
            transparent={true}
            opacity={liquidOpacity ?? 0.78}
          />
        </mesh>
      )}

      {/* 4. Glass Stir Rod resting diagonally inside */}
      <mesh position={[0.02, 0.13, 0.02]} rotation={[0.2, 0.3, -0.28]}>
        <cylinderGeometry args={[0.004, 0.004, 0.24, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.1}
          transparent={true}
          opacity={0.6}
        />
      </mesh>

      {/* 5. Printed White Graduations Decal */}
      <mesh position={[0, 0.1, 0.076]}>
        <planeGeometry args={[0.04, 0.08]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.75} />
      </mesh>
    </group>
  );
};

export const GraduatedCylinder: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* 1. Hexagonal Stability Foot Base */}
      <mesh position={[0, 0.008, 0]}>
        <cylinderGeometry args={[0.05, 0.055, 0.016, 6]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* 2. Slender Precision Cylinder */}
      <mesh position={[0, 0.17, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[0.026, 0.026, 0.32, 16]} />
        <meshStandardMaterial
          color="#f1f5f9"
          roughness={0.08}
          metalness={0.1}
          transparent={true}
          opacity={0.45}
          depthWrite={false}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* 3. Blue Protective Bumper Collar */}
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[0.03, 0.007, 8, 16]} />
        <meshStandardMaterial color="#0284c7" roughness={0.4} />
      </mesh>

      {/* 4. Sodium Hydroxide Liquid Column with Meniscus */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.18, 12]} />
        <meshStandardMaterial color="#10b981" roughness={0.1} transparent opacity={0.65} />
      </mesh>
    </group>
  );
};

export const TestTubeRack: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0;

  const tubeColors = [
    '#f59e0b', // FeCl3 yellow
    '#0284c7', // CuSO4 blue
    '#10b981', // NiSO4 green
    '#a855f7', // KMnO4 violet
    '#ec4899', // CoCl2 pink
    '#38bdf8', // indicator
  ];

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* Wooden Rack Base */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.09]} />
        <meshStandardMaterial
          color="#92400e"
          roughness={0.7}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Top Shelf with Holes */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.3, 0.015, 0.09]} />
        <meshStandardMaterial color="#92400e" roughness={0.7} />
      </mesh>

      {/* Upright Supports */}
      <mesh position={[-0.14, 0.045, 0]}>
        <boxGeometry args={[0.015, 0.08, 0.085]} />
        <meshStandardMaterial color="#78350f" roughness={0.7} />
      </mesh>
      <mesh position={[0.14, 0.045, 0]}>
        <boxGeometry args={[0.015, 0.08, 0.085]} />
        <meshStandardMaterial color="#78350f" roughness={0.7} />
      </mesh>

      {/* 6 Borosilicate Test Tubes */}
      {tubeColors.map((color, index) => {
        const xOffset = -0.1 + index * 0.04;
        return (
          <group key={index} position={[xOffset, 0.08, 0]}>
            <mesh castShadow={quality === 'high'}>
              <cylinderGeometry args={[0.011, 0.011, 0.12, 10]} />
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.08}
                metalness={0.1}
                transparent={true}
                opacity={0.45}
                depthWrite={false}
              />
            </mesh>
            <mesh position={[0, -0.06, 0]}>
              <sphereGeometry args={[0.011, 8, 8]} />
              <meshStandardMaterial color="#f8fafc" transparent opacity={0.45} depthWrite={false} />
            </mesh>
            {/* Liquid */}
            <mesh position={[0, -0.02, 0]}>
              <cylinderGeometry args={[0.009, 0.009, 0.07, 8]} />
              <meshStandardMaterial color={color} roughness={0.1} transparent opacity={0.85} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export const ReagentBottle: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0;

  const isNitric = item.id === 'reagent_hno3';

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* 1. Amber Glass Bottle Body */}
      <mesh position={[0, 0.075, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[0.045, 0.045, 0.14, 16]} />
        <meshStandardMaterial
          color={isNitric ? '#78350f' : '#92400e'}
          roughness={0.2}
          metalness={0.1}
          transparent={true}
          opacity={0.8}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* 2. Rounded Shoulder */}
      <mesh position={[0, 0.145, 0]}>
        <cylinderGeometry args={[0.02, 0.045, 0.03, 16]} />
        <meshStandardMaterial color="#78350f" roughness={0.25} transparent opacity={0.8} />
      </mesh>

      {/* 3. Neck & Pennyhead Stopper */}
      <mesh position={[0, 0.175, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.035, 14]} />
        <meshStandardMaterial color="#581c87" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.198, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 0.012, 16]} />
        <meshStandardMaterial color="#451a03" roughness={0.3} />
      </mesh>

      {/* GHS Red Hazard Diamond Label */}
      <mesh position={[0, 0.075, 0.046]}>
        <planeGeometry args={[0.05, 0.06]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.08, 0.047]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.022, 0.022]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
};

export const FireExtinguisherModel: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.5 : isHovered ? 0.35 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* 1. Red High-Pressure Seamless Cylinder */}
      <mesh position={[0, 0.22, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[0.09, 0.09, 0.38, 20]} />
        <meshStandardMaterial
          color="#dc2626"
          roughness={0.25}
          metalness={0.35}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Domed Caps */}
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.09, 16, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#991b1b" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.41, 0]}>
        <sphereGeometry args={[0.09, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#dc2626" roughness={0.25} metalness={0.35} />
      </mesh>

      {/* 2. Brass Valve Assembly */}
      <mesh position={[0, 0.47, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 0.06, 12]} />
        <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 3. Black Squeeze Lever & Handle */}
      <mesh position={[0.04, 0.51, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.12, 0.015, 0.025]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.7} />
      </mesh>
      <mesh position={[-0.03, 0.48, 0]}>
        <boxGeometry args={[0.08, 0.012, 0.025]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* 4. Pressure Gauge with Green Safe Zone */}
      <mesh position={[0, 0.46, 0.035]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.015, 16]} />
        <meshStandardMaterial color="#10b981" roughness={0.3} />
      </mesh>

      {/* 5. Pull Pin */}
      <mesh position={[0.02, 0.485, 0.03]}>
        <torusGeometry args={[0.014, 0.003, 6, 12]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 6. Discharge Horn & Flexible Hose */}
      <mesh position={[-0.08, 0.35, 0.06]} rotation={[0.2, 0, -0.6]}>
        <cylinderGeometry args={[0.008, 0.008, 0.25, 8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      <mesh position={[-0.16, 0.22, 0.09]} rotation={[0, 0, 1.2]}>
        <coneGeometry args={[0.035, 0.12, 12]} />
        <meshStandardMaterial color="#020617" roughness={0.7} />
      </mesh>

      {/* White Instruction Decal */}
      <mesh position={[0, 0.22, 0.092]}>
        <planeGeometry args={[0.12, 0.16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

export const FireBlanketModel: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.5 : isHovered ? 0.35 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* Red Steel Wall Cabinet Case */}
      <mesh castShadow={quality === 'high'}>
        <boxGeometry args={[0.28, 0.42, 0.08]} />
        <meshStandardMaterial
          color="#dc2626"
          roughness={0.3}
          metalness={0.4}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* White Front Decal with "FIRE BLANKET" Text & Cross */}
      <mesh position={[0, 0.02, 0.041]}>
        <planeGeometry args={[0.22, 0.32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Red Cross Symbol */}
      <mesh position={[0, 0.08, 0.042]}>
        <boxGeometry args={[0.08, 0.025, 0.001]} />
        <meshBasicMaterial color="#dc2626" />
      </mesh>
      <mesh position={[0, 0.08, 0.042]}>
        <boxGeometry args={[0.025, 0.08, 0.001]} />
        <meshBasicMaterial color="#dc2626" />
      </mesh>

      {/* Hanging Black Release Tabs */}
      <mesh position={[-0.04, -0.25, 0]}>
        <boxGeometry args={[0.02, 0.1, 0.005]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      <mesh position={[0.04, -0.25, 0]}>
        <boxGeometry args={[0.02, 0.1, 0.005]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
    </group>
  );
};

export const SpillKitModel: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.35 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* High-Visibility Yellow Pail Container */}
      <mesh position={[0, 0.15, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[0.13, 0.11, 0.3, 16]} />
        <meshStandardMaterial
          color="#eab308"
          roughness={0.4}
          metalness={0.1}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* White Lid with Handle */}
      <mesh position={[0, 0.305, 0]}>
        <cylinderGeometry args={[0.138, 0.138, 0.025, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.33, 0]}>
        <boxGeometry args={[0.08, 0.025, 0.015]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Label Decal */}
      <mesh position={[0, 0.16, 0.125]}>
        <planeGeometry args={[0.14, 0.1]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
    </group>
  );
};

export const SafetyGogglesModel: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.5 : isHovered ? 0.35 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* Clear Polycarbonate Curved Visor Lens with StandardMaterial */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.04, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.1}
          metalness={0.15}
          transparent={true}
          opacity={0.65}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Silicone Frame Edge */}
      <mesh position={[0, 0.03, 0.005]}>
        <torusGeometry args={[0.072, 0.006, 6, 16, Math.PI]} />
        <meshStandardMaterial color="#0284c7" roughness={0.5} />
      </mesh>

      {/* Elastic Headband Strap */}
      <mesh position={[0, 0.03, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.065, 0.004, 4, 16, Math.PI]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
    </group>
  );
};

export const NitrileGlovesBox: React.FC<EquipmentProps> = ({
  item,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.35 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* Blue Cardboard Dispenser Box */}
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.16, 0.07, 0.1]} />
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.6}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Oval Perforation Slot */}
      <mesh position={[0, 0.071, 0]}>
        <planeGeometry args={[0.09, 0.04]} />
        <meshBasicMaterial color="#0369a1" />
      </mesh>

      {/* Cyan Nitrile Glove Peeking Out */}
      <mesh position={[0, 0.076, 0]} rotation={[0.1, 0.2, 0]}>
        <boxGeometry args={[0.06, 0.015, 0.03]} />
        <meshStandardMaterial color="#06b6d4" roughness={0.4} />
      </mesh>
    </group>
  );
};

export const LabCoatPegModel: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* Wall Hook Peg Plate */}
      <mesh position={[0, 0.15, -0.04]}>
        <boxGeometry args={[0.12, 0.06, 0.015]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Chrome Hook Pin */}
      <mesh position={[0, 0.15, -0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.05, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* White 100% Cotton Lab Coat Hanging */}
      <group position={[0, -0.22, 0]}>
        {/* Torso & Coat Body */}
        <mesh castShadow={quality === 'high'}>
          <boxGeometry args={[0.32, 0.65, 0.12]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.8}
            metalness={0.05}
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
        {/* Collar Lapels */}
        <mesh position={[0, 0.28, 0.065]}>
          <boxGeometry args={[0.18, 0.08, 0.02]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
        </mesh>
        {/* Left Sleeve */}
        <mesh position={[-0.2, -0.05, 0]} rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.09, 0.52, 0.1]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.8} />
        </mesh>
        {/* Right Sleeve */}
        <mesh position={[0.2, -0.05, 0]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.09, 0.52, 0.1]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

export const FlammableCabinetModel: React.FC<EquipmentProps> = ({
  item,
  quality,
  isHovered,
  isSelected,
  onHover,
  onClick
}) => {
  const emissiveColor = isSelected ? SELECTED_EMISSIVE : isHovered ? HOVER_EMISSIVE : ZERO_COLOR;
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0;

  return (
    <group
      position={item.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(item.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {/* Yellow Heavy 18-Gauge Steel Storage Cabinet Body */}
      <mesh castShadow={quality === 'high'}>
        <boxGeometry args={[0.95, 1.4, 0.55]} />
        <meshStandardMaterial
          color="#eab308"
          roughness={0.35}
          metalness={0.4}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Double Doors Hairline Divide */}
      <mesh position={[0, 0, 0.28]}>
        <boxGeometry args={[0.006, 1.34, 0.005]} />
        <meshBasicMaterial color="#713f12" />
      </mesh>

      {/* Paddle Handle Assembly with Keyhole */}
      <mesh position={[0.06, 0.05, 0.285]}>
        <boxGeometry args={[0.04, 0.12, 0.02]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Red Printed Hazard Warning Banner: "FLAMMABLE - KEEP FIRE AWAY" */}
      <mesh position={[0, 0.38, 0.282]}>
        <planeGeometry args={[0.7, 0.16]} />
        <meshBasicMaterial color="#b91c1c" />
      </mesh>
      <mesh position={[0, 0.38, 0.283]}>
        <planeGeometry args={[0.66, 0.12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Red Text Bar */}
      <mesh position={[0, 0.38, 0.284]}>
        <planeGeometry args={[0.6, 0.04]} />
        <meshBasicMaterial color="#b91c1c" />
      </mesh>

      {/* Dual Flame Arrestor Ventilation Bungs on Side */}
      <mesh position={[0.48, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[0.48, -0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
};
