import React, { useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { XROrigin } from '@react-three/xr';
import { xrStore } from '../../xr/xrStore';
import {
  getVRLocomotionConfig,
  subscribeVRLocomotion,
  onResetVRPlayerOrigin,
  VRLocomotionConfig
} from '../../xr/vrLocomotionStore';
import { VRMotionVignette } from './VRMotionVignette';
import { VRTeleportArc } from './VRTeleportArc';

// Room Boundaries and Obstacle Definitions
const MIN_X = -3.6;
const MAX_X = 3.6;
const MIN_Z = -2.2;
const MAX_Z = 2.7;

// Central Lab Bench Footprint + User Clearance Margin
const BENCH_MIN_X = -1.65;
const BENCH_MAX_X = 1.65;
const BENCH_MIN_Z = -0.75;
const BENCH_MAX_Z = 0.75;

// Rear Preparation Bench & Fume Hood
const REAR_MIN_X = -2.2;
const REAR_MAX_X = 2.2;
const REAR_MAX_Z = -1.65;

// Emergency Eyewash Station Plumbing Pedestal
const EYEWASH_MAX_X = -2.9;
const EYEWASH_MIN_Z = 0.4;
const EYEWASH_MAX_Z = 1.2;

// Flammable Cabinet Area
const CABINET_MIN_X = 2.4;
const CABINET_MAX_X = 3.5;
const CABINET_MIN_Z = -1.9;
const CABINET_MAX_Z = -1.1;

export function isInsideLabObstacle(x: number, z: number): boolean {
  // Outer laboratory walls
  if (x < MIN_X || x > MAX_X || z < MIN_Z || z > MAX_Z) {
    return true;
  }

  // Central hero lab bench
  if (x > BENCH_MIN_X && x < BENCH_MAX_X && z > BENCH_MIN_Z && z < BENCH_MAX_Z) {
    return true;
  }

  // Rear prep counter & fume hood
  if (x > REAR_MIN_X && x < REAR_MAX_X && z < REAR_MAX_Z) {
    return true;
  }

  // Left eyewash plumbing pedestal
  if (x < EYEWASH_MAX_X && z > EYEWASH_MIN_Z && z < EYEWASH_MAX_Z) {
    return true;
  }

  // Flammable cabinet
  if (x > CABINET_MIN_X && x < CABINET_MAX_X && z > CABINET_MIN_Z && z < CABINET_MAX_Z) {
    return true;
  }

  return false;
}

export const VRPlayer: React.FC = () => {
  const { camera } = useThree();
  const originRef = useRef<THREE.Group>(null);

  // Dynamic VR Locomotion Settings
  const [config, setConfig] = useState<VRLocomotionConfig>(getVRLocomotionConfig());
  const configRef = useRef(config);
  configRef.current = config;

  // Debounce latch for snap turning: must return within deadzone before next snap
  const canSnapTurnRef = useRef(true);

  // Locomotion activity states for dynamic motion vignette
  const [isMoving, setIsMoving] = useState(false);
  const [isTurning, setIsTurning] = useState(false);

  // Teleport aiming tracking
  const [teleportControllerPos, setTeleportControllerPos] = useState<THREE.Vector3 | null>(null);
  const [teleportControllerDir, setTeleportControllerDir] = useState<THREE.Vector3 | null>(null);
  const [isTriggerPressed, setIsTriggerPressed] = useState(false);
  const [isStickAiming, setIsStickAiming] = useState(false);

  // Subscribe to locomotion configuration changes
  useEffect(() => {
    return subscribeVRLocomotion(() => {
      setConfig(getVRLocomotionConfig());
    });
  }, []);

  // Reset origin handler
  const handleResetOrigin = useCallback(() => {
    if (!originRef.current) return;
    originRef.current.position.set(0, 0, 1.8);
    originRef.current.rotation.set(0, 0, 0);
  }, []);

  useEffect(() => {
    return onResetVRPlayerOrigin(handleResetOrigin);
  }, [handleResetOrigin]);

  // Rotate player rig around headset camera position (maintains eye position during turning)
  const rotatePlayerRig = useCallback(
    (angleRad: number) => {
      if (!originRef.current) return;

      const headPos = new THREE.Vector3();
      camera.getWorldPosition(headPos);

      const offset = originRef.current.position.clone().sub(headPos);
      offset.y = 0;
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), angleRad);

      originRef.current.position.x = headPos.x + offset.x;
      originRef.current.position.z = headPos.z + offset.z;
      originRef.current.rotation.y += angleRad;
    },
    [camera]
  );

  // Sliding collision resolver for thumbstick walking
  const applySafeMovement = useCallback(
    (moveDelta: THREE.Vector3) => {
      if (!originRef.current) return;

      const headPos = new THREE.Vector3();
      camera.getWorldPosition(headPos);

      const targetX = headPos.x + moveDelta.x;
      const targetZ = headPos.z + moveDelta.z;

      // 1. Direct diagonal move
      if (!isInsideLabObstacle(targetX, targetZ)) {
        originRef.current.position.x += moveDelta.x;
        originRef.current.position.z += moveDelta.z;
      } else {
        // 2. Sliding collision resolution along X
        if (!isInsideLabObstacle(targetX, headPos.z)) {
          originRef.current.position.x += moveDelta.x;
        }
        // 3. Sliding collision resolution along Z
        if (!isInsideLabObstacle(headPos.x, targetZ)) {
          originRef.current.position.z += moveDelta.z;
        }
      }

      originRef.current.position.y = 0; // Maintain level floor contact
    },
    [camera]
  );

  // Teleportation landing callback
  const handleTeleportLanding = useCallback(
    (targetFloorPos: THREE.Vector3) => {
      if (!originRef.current) return;

      const headPos = new THREE.Vector3();
      camera.getWorldPosition(headPos);

      // Offset from origin to head in world coordinates
      const headOffsetOriginX = headPos.x - originRef.current.position.x;
      const headOffsetOriginZ = headPos.z - originRef.current.position.z;

      // Teleport origin so head lands exactly on target floor marker
      originRef.current.position.x = targetFloorPos.x - headOffsetOriginX;
      originRef.current.position.z = targetFloorPos.z - headOffsetOriginZ;
      originRef.current.position.y = 0;
    },
    [camera]
  );

  // Main WebXR frame update
  useFrame((_, delta) => {
    const session = xrStore.getState().session;
    if (!session || !originRef.current) {
      if (isMoving) setIsMoving(false);
      if (isTurning) setIsTurning(false);
      return;
    }

    const { inputSourceStates } = xrStore.getState();
    const cfg = configRef.current;

    // Identify left and right controllers based on user hand dominance setting
    const moveHand = cfg.handDominance === 'right' ? 'left' : 'right';
    const turnHand = cfg.handDominance === 'right' ? 'right' : 'left';

    let moveStickX = 0;
    let moveStickY = 0;
    let turnStickX = 0;
    let turnStickY = 0;
    let triggerActive = false;
    let rightStickClick = false;
    let leftStickClick = false;

    // 1. Read input sources directly from WebXR Gamepad API & @react-three/xr states
    for (const state of inputSourceStates) {
      if (state.type !== 'controller') continue;
      const handedness = state.inputSource.handedness;
      const gp = state.inputSource.gamepad;

      // Thumbstick axes
      const thumb = state.gamepad?.['xr-standard-thumbstick'];
      let axX = thumb?.xAxis ?? 0;
      let axY = thumb?.yAxis ?? 0;

      if (gp && gp.axes && gp.axes.length >= 2) {
        if (Math.abs(axX) < 0.01 && Math.abs(axY) < 0.01) {
          // Fallback to standard Gamepad axes array
          if (gp.axes.length >= 4) {
            axX = gp.axes[2];
            axY = gp.axes[3];
          } else {
            axX = gp.axes[0];
            axY = gp.axes[1];
          }
        }
      }

      // Trigger button
      const isTrig =
        state.gamepad?.['xr-standard-trigger']?.state === 'pressed' ||
        (gp?.buttons && gp.buttons[0]?.pressed) ||
        false;

      // Thumbstick button click
      const isThumbClick = gp?.buttons && gp.buttons[3]?.pressed;

      if (handedness === moveHand) {
        moveStickX = axX;
        moveStickY = axY;
        if (isThumbClick) leftStickClick = true;
      } else if (handedness === turnHand) {
        turnStickX = axX;
        turnStickY = axY;
        if (isTrig) triggerActive = true;
        if (isThumbClick) rightStickClick = true;
      }
    }

    // Hardware shortcut: click both thumbsticks to immediately reset position to bench
    if (leftStickClick && rightStickClick) {
      handleResetOrigin();
    }

    // ============================================
    // 2. WALKING LOCOMOTION (Thumbstick Horizontal)
    // ============================================
    const moveMagnitude = Math.hypot(moveStickX, moveStickY);
    let movingThisFrame = false;

    if (cfg.mode === 'thumbstick' && moveMagnitude > cfg.deadzone) {
      movingThisFrame = true;

      // Headset horizontal forward and right vectors (ignoring head pitch!)
      const cameraForward = new THREE.Vector3();
      camera.getWorldDirection(cameraForward);
      cameraForward.y = 0; // Pure horizontal yaw
      cameraForward.normalize();

      const cameraRight = new THREE.Vector3();
      cameraRight.crossVectors(cameraForward, new THREE.Vector3(0, 1, 0)).normalize();

      // Normalize stick input past deadzone
      const normalizedMag = (moveMagnitude - cfg.deadzone) / (1 - cfg.deadzone);
      const dirX = moveStickX / moveMagnitude;
      const dirY = moveStickY / moveMagnitude;

      // In WebXR Gamepad API, pushing forward is negative Y
      const moveDelta = new THREE.Vector3();
      moveDelta.addScaledVector(cameraRight, dirX * normalizedMag);
      moveDelta.addScaledVector(cameraForward, -dirY * normalizedMag);

      const moveStep = moveDelta.multiplyScalar(cfg.moveSpeed * delta);
      applySafeMovement(moveStep);
    }

    if (movingThisFrame !== isMoving) {
      setIsMoving(movingThisFrame);
    }

    // ============================================
    // 3. TURNING LOCOMOTION (Snap / Smooth)
    // ============================================
    let turningThisFrame = false;
    const turnMagnitude = Math.abs(turnStickX);

    if (cfg.turnType === 'snap') {
      if (turnMagnitude > cfg.deadzone) {
        if (canSnapTurnRef.current) {
          canSnapTurnRef.current = false;
          turningThisFrame = true;
          const snapRad =
            (turnStickX > 0 ? -1 : 1) * THREE.MathUtils.degToRad(cfg.snapDegrees);
          rotatePlayerRig(snapRad);
        }
      } else {
        // Debounce latch resets when thumbstick returns within deadzone
        canSnapTurnRef.current = true;
      }
    } else if (cfg.turnType === 'smooth') {
      if (turnMagnitude > cfg.deadzone) {
        turningThisFrame = true;
        const smoothTurnRad =
          (turnStickX > 0 ? -1 : 1) * cfg.smoothTurnSpeed * delta;
        rotatePlayerRig(smoothTurnRad);
      }
    }

    if (turningThisFrame !== isTurning) {
      setIsTurning(turningThisFrame);
    }

    // ============================================
    // 4. TELEPORT AIMING (When mode is 'teleport')
    // ============================================
    if (cfg.mode === 'teleport') {
      // Find aiming controller ray pose
      const turnControllerState = inputSourceStates.find(
        (st) => st.type === 'controller' && st.inputSource.handedness === turnHand
      );

      const isAimingByStick = turnStickY < -0.3; // Push stick forward to aim teleport
      setIsStickAiming(isAimingByStick);
      setIsTriggerPressed(triggerActive);

      if (turnControllerState && (triggerActive || isAimingByStick)) {
        // Controller grip / ray world pose
        const gripObj = (turnControllerState as { object?: THREE.Object3D }).object;
        if (gripObj) {
          const worldPos = new THREE.Vector3();
          const worldDir = new THREE.Vector3();
          gripObj.getWorldPosition(worldPos);
          gripObj.getWorldDirection(worldDir);
          // In WebXR, ray points along negative Z
          worldDir.negate();

          setTeleportControllerPos(worldPos);
          setTeleportControllerDir(worldDir);
        }
      } else {
        setTeleportControllerPos(null);
        setTeleportControllerDir(null);
      }
    } else {
      if (teleportControllerPos) setTeleportControllerPos(null);
      if (teleportControllerDir) setTeleportControllerDir(null);
    }
  });

  return (
    <group>
      {/* 6-DoF WebXR Player Origin Anchor */}
      <XROrigin ref={originRef} position={[0, 0, 1.8]} />

      {/* Dynamic VR Motion Vignette for anti-nausea comfort */}
      <VRMotionVignette
        isMoving={isMoving}
        isTurning={isTurning}
        enabled={config.vignetteEnabled}
      />

      {/* Optional Teleport Arc & Floor Reticle */}
      {config.mode === 'teleport' && (
        <VRTeleportArc
          active={true}
          controllerPos={teleportControllerPos}
          controllerDir={teleportControllerDir}
          isTriggerPressed={isTriggerPressed}
          isStickAiming={isStickAiming}
          isValidLanding={(x, z) => !isInsideLabObstacle(x, z)}
          onTeleport={handleTeleportLanding}
        />
      )}

      {/* Primary Standing Spot Floor Indicator for VR User */}
      <group position={[0, 0.002, 1.8]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.38, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
          <circleGeometry args={[0.34, 32]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={0.12} />
        </mesh>
      </group>
    </group>
  );
};
