export type LocomotionMode = 'thumbstick' | 'teleport';
export type SpeedPreset = 'slow' | 'normal' | 'fast';
export type TurnType = 'snap' | 'smooth';
export type SnapDegrees = 30 | 45;
export type HandDominance = 'right' | 'left';

export interface VRLocomotionConfig {
  mode: LocomotionMode;
  speedPreset: SpeedPreset;
  moveSpeed: number; // in meters/sec (slow: 1.2, normal: 2.2, fast: 3.5)
  turnType: TurnType;
  snapDegrees: SnapDegrees;
  smoothTurnSpeed: number; // in rad/sec (~2.5)
  deadzone: number; // 0.15
  vignetteEnabled: boolean;
  handDominance: HandDominance;
}

const SPEED_MAP: Record<SpeedPreset, number> = {
  slow: 1.2,
  normal: 2.2,
  fast: 3.5
};

const DEFAULT_CONFIG: VRLocomotionConfig = {
  mode: 'thumbstick',
  speedPreset: 'normal',
  moveSpeed: 2.2,
  turnType: 'snap',
  snapDegrees: 45,
  smoothTurnSpeed: 2.5,
  deadzone: 0.15,
  vignetteEnabled: true,
  handDominance: 'right'
};

let currentConfig: VRLocomotionConfig = { ...DEFAULT_CONFIG };
const listeners = new Set<() => void>();
const resetOriginListeners = new Set<() => void>();

export function getVRLocomotionConfig(): VRLocomotionConfig {
  return currentConfig;
}

export function updateVRLocomotionConfig(partial: Partial<VRLocomotionConfig>) {
  currentConfig = {
    ...currentConfig,
    ...partial
  };

  if (partial.speedPreset && !partial.moveSpeed) {
    currentConfig.moveSpeed = SPEED_MAP[partial.speedPreset];
  }

  listeners.forEach((cb) => cb());
}

export function subscribeVRLocomotion(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function triggerResetVRPlayerOrigin() {
  resetOriginListeners.forEach((cb) => cb());
}

export function onResetVRPlayerOrigin(callback: () => void): () => void {
  resetOriginListeners.add(callback);
  return () => {
    resetOriginListeners.delete(callback);
  };
}
