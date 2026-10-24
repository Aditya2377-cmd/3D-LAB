import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

interface VRMotionVignetteProps {
  isMoving: boolean;
  isTurning: boolean;
  enabled: boolean;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uOpacity;
  uniform float uInner;
  uniform float uOuter;

  void main() {
    vec2 c = vUv - vec2(0.5);
    float dist = length(c) * 2.0;
    float t = smoothstep(uInner, uOuter, dist);
    gl_FragColor = vec4(0.01, 0.03, 0.08, t * uOpacity);
  }
`;

export const VRMotionVignette: React.FC<VRMotionVignetteProps> = ({
  isMoving,
  isTurning,
  enabled
}) => {
  const { camera } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const currentOpacity = useRef(0);

  // Attach vignette mesh directly to VR camera so it stays fixed in headset field-of-view
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    camera.add(mesh);
    return () => {
      camera.remove(mesh);
    };
  }, [camera]);

  useFrame((_, delta) => {
    if (!materialRef.current || !meshRef.current) return;

    const targetOpacity = enabled && (isMoving || isTurning) ? 0.78 : 0.0;
    currentOpacity.current = THREE.MathUtils.lerp(
      currentOpacity.current,
      targetOpacity,
      Math.min(1, delta * 12)
    );

    materialRef.current.uniforms.uOpacity.value = currentOpacity.current;
    meshRef.current.visible = currentOpacity.current > 0.005;
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, -0.22]}
      renderOrder={9999}
      visible={false}
    >
      <planeGeometry args={[0.55, 0.55]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthTest={false}
        depthWrite={false}
        uniforms={{
          uOpacity: { value: 0 },
          uInner: { value: 0.58 },
          uOuter: { value: 0.95 }
        }}
      />
    </mesh>
  );
};
