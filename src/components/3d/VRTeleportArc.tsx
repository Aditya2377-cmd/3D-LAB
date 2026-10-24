import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export interface TeleportArcProps {
  active: boolean;
  controllerPos: THREE.Vector3 | null;
  controllerDir: THREE.Vector3 | null;
  isTriggerPressed: boolean;
  isStickAiming: boolean;
  isValidLanding: (x: number, z: number) => boolean;
  onTeleport: (targetPos: THREE.Vector3) => void;
}

const ARC_STEPS = 28;
const INITIAL_VELOCITY = 8.0; // m/s
const GRAVITY = 9.8; // m/s^2

export const VRTeleportArc: React.FC<TeleportArcProps> = ({
  active,
  controllerPos,
  controllerDir,
  isTriggerPressed,
  isStickAiming,
  isValidLanding,
  onTeleport
}) => {
  const reticleRef = useRef<THREE.Group>(null);
  const wasAimingRef = useRef(false);
  const lastValidTargetRef = useRef<THREE.Vector3 | null>(null);

  const [landingState, setLandingState] = useState<{
    pos: THREE.Vector3;
    isValid: boolean;
  } | null>(null);

  // BufferGeometry for the parabolic line
  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(ARC_STEPS * 3);
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  // Material for the arc line
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: '#38bdf8',
      linewidth: 3,
      transparent: true,
      opacity: 0.85
    });
  }, []);

  // Three.js Line object rendered via <primitive> to avoid SVG line conflict
  const lineObject = useMemo(() => {
    const line = new THREE.Line(lineGeometry, lineMaterial);
    line.visible = false;
    return line;
  }, [lineGeometry, lineMaterial]);

  useFrame(() => {
    const isAiming = active && (isTriggerPressed || isStickAiming);

    // If was aiming and just released: teleport!
    if (wasAimingRef.current && !isAiming) {
      if (lastValidTargetRef.current) {
        onTeleport(lastValidTargetRef.current.clone());
      }
      setLandingState(null);
      lastValidTargetRef.current = null;
      wasAimingRef.current = false;
      lineObject.visible = false;
      if (reticleRef.current) reticleRef.current.visible = false;
      return;
    }

    wasAimingRef.current = isAiming;

    if (!isAiming || !controllerPos || !controllerDir) {
      lineObject.visible = false;
      if (reticleRef.current) reticleRef.current.visible = false;
      setLandingState(null);
      lastValidTargetRef.current = null;
      return;
    }

    // Trace parabolic arc
    const positions = lineGeometry.attributes.position.array as Float32Array;
    let hitFloor = false;
    let hitX = 0;
    let hitZ = 0;
    let hitIndex = ARC_STEPS - 1;

    const v0x = controllerDir.x * INITIAL_VELOCITY;
    const v0y = controllerDir.y * INITIAL_VELOCITY;
    const v0z = controllerDir.z * INITIAL_VELOCITY;

    let prevX = controllerPos.x;
    let prevY = controllerPos.y;
    let prevZ = controllerPos.z;

    const dt = 0.04;

    for (let i = 0; i < ARC_STEPS; i++) {
      const t = i * dt;
      const x = controllerPos.x + v0x * t;
      const y = controllerPos.y + v0y * t - 0.5 * GRAVITY * t * t;
      const z = controllerPos.z + v0z * t;

      if (!hitFloor && y <= 0.005) {
        // Linear interpolate intersection with floor y = 0
        const factor = (prevY - 0.005) / (prevY - y + 0.0001);
        hitX = prevX + (x - prevX) * THREE.MathUtils.clamp(factor, 0, 1);
        hitZ = prevZ + (z - prevZ) * THREE.MathUtils.clamp(factor, 0, 1);
        hitFloor = true;
        hitIndex = i;

        positions[i * 3] = hitX;
        positions[i * 3 + 1] = 0.005;
        positions[i * 3 + 2] = hitZ;
      } else if (!hitFloor) {
        positions[i * 3] = x;
        positions[i * 3 + 1] = Math.max(0.005, y);
        positions[i * 3 + 2] = z;
        prevX = x;
        prevY = y;
        prevZ = z;
      } else {
        // Clamp remaining points to floor hit
        positions[i * 3] = hitX;
        positions[i * 3 + 1] = 0.005;
        positions[i * 3 + 2] = hitZ;
      }
    }

    lineGeometry.setDrawRange(0, hitIndex + 1);
    lineGeometry.attributes.position.needsUpdate = true;

    if (hitFloor) {
      const valid = isValidLanding(hitX, hitZ);
      const hitVec = new THREE.Vector3(hitX, 0.008, hitZ);
      setLandingState({ pos: hitVec, isValid: valid });

      lineMaterial.color.set(valid ? '#38bdf8' : '#ef4444');
      lineObject.visible = true;

      if (valid) {
        lastValidTargetRef.current = hitVec;
      } else {
        lastValidTargetRef.current = null;
      }

      if (reticleRef.current) {
        reticleRef.current.visible = true;
        reticleRef.current.position.set(hitX, 0.008, hitZ);
      }
    } else {
      setLandingState(null);
      lastValidTargetRef.current = null;
      lineObject.visible = false;
      if (reticleRef.current) reticleRef.current.visible = false;
    }
  });

  const isValid = landingState?.isValid ?? false;

  return (
    <group>
      {/* 1. Parabolic Arc Beam via Primitive */}
      <primitive object={lineObject} />

      {/* 2. Holographic Floor Landing Reticle */}
      <group ref={reticleRef} visible={false}>
        {/* Outer Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.35, 32]} />
          <meshBasicMaterial
            color={isValid ? '#38bdf8' : '#ef4444'}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Disc with soft transparency */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
          <circleGeometry args={[0.28, 32]} />
          <meshBasicMaterial
            color={isValid ? '#0284c7' : '#991b1b'}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Direction Indicator Chevron facing towards main bench [0,0] */}
        {isValid && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
            <ringGeometry args={[0.1, 0.15, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
          </mesh>
        )}
      </group>
    </group>
  );
};
