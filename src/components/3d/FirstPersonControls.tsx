import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

interface FirstPersonControlsProps {
  active: boolean;
}

export const FirstPersonControls: React.FC<FirstPersonControlsProps> = ({ active }) => {
  const { camera, gl } = useThree();
  const keys = useRef<Record<string, boolean>>({});
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const velocity = useRef(new THREE.Vector3());

  // Eye height and laboratory room boundary limits
  const EYE_HEIGHT = 1.6;
  const BOUNDS = {
    minX: -2.7,
    maxX: 2.7,
    minZ: -0.6, // in front of bench
    maxZ: 2.6
  };

  useEffect(() => {
    if (!active) return;

    // Set initial walk position
    camera.position.set(0, EYE_HEIGHT, 1.8);
    camera.lookAt(0, 1.1, 0);
    euler.current.setFromQuaternion(camera.quaternion, 'YXZ');

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Only drag with left mouse button
      if (e.button === 0) {
        isDragging.current = true;
        previousMouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMouse.current.x;
      const deltaY = e.clientY - previousMouse.current.y;
      previousMouse.current = { x: e.clientX, y: e.clientY };

      const lookSpeed = 0.0035;
      euler.current.y -= deltaX * lookSpeed;
      euler.current.x -= deltaY * lookSpeed;

      // Clamp vertical pitch to avoid flipping
      euler.current.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, euler.current.x));
      camera.quaternion.setFromEuler(euler.current);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    gl.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      gl.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [active, camera, gl]);

  useFrame((_, delta) => {
    if (!active) return;

    const moveSpeed = (keys.current['ShiftLeft'] || keys.current['ShiftRight']) ? 3.8 : 2.2;
    const moveVector = new THREE.Vector3();

    // Direction vectors
    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), euler.current.y);
    const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), euler.current.y);

    if (keys.current['KeyW'] || keys.current['ArrowUp']) moveVector.add(forward);
    if (keys.current['KeyS'] || keys.current['ArrowDown']) moveVector.sub(forward);
    if (keys.current['KeyD'] || keys.current['ArrowRight']) moveVector.add(right);
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) moveVector.sub(right);

    if (moveVector.lengthSq() > 0) {
      moveVector.normalize().multiplyScalar(moveSpeed * delta);
      velocity.current.lerp(moveVector, 0.4);
    } else {
      velocity.current.lerp(new THREE.Vector3(0, 0, 0), 0.2);
    }

    camera.position.add(velocity.current);

    // Keep camera at fixed realistic student eye height
    camera.position.y = EYE_HEIGHT;

    // Enforce laboratory room boundaries
    camera.position.x = Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, camera.position.x));
    camera.position.z = Math.max(BOUNDS.minZ, Math.min(BOUNDS.maxZ, camera.position.z));
  });

  return null;
};
