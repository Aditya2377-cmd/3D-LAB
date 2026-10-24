import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { SafetyScenario } from '../../types';
import {
  getVRLocomotionConfig,
  updateVRLocomotionConfig,
  subscribeVRLocomotion,
  triggerResetVRPlayerOrigin,
  VRLocomotionConfig
} from '../../xr/vrLocomotionStore';

interface VRClipboardProps {
  scenario: SafetyScenario;
  equippedPPE: {
    goggles: boolean;
    gloves: boolean;
    labCoat: boolean;
  };
  pinPulled: boolean;
  isExtinguishing: boolean;
  gasShut: boolean;
  neutralizerApplied: boolean;
  residueAbsorbed: boolean;
  isEyewashActive: boolean;
  onExecuteAction: (actionKey: string) => void;
  onEquipPPE: (key: 'goggles' | 'gloves' | 'labCoat') => void;
  onSelectScenario: (id: string) => void;
  onExitVR?: () => void;
  onRecenter?: () => void;
}

export const VRClipboard: React.FC<VRClipboardProps> = ({
  scenario,
  equippedPPE,
  pinPulled,
  isExtinguishing,
  gasShut,
  neutralizerApplied,
  residueAbsorbed,
  isEyewashActive,
  onExecuteAction,
  onEquipPPE,
  onSelectScenario,
  onExitVR,
  onRecenter
}) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'locomotion'>('mission');
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  // Synchronize VR Locomotion Settings
  const [locomotion, setLocomotion] = useState<VRLocomotionConfig>(getVRLocomotionConfig());

  useEffect(() => {
    return subscribeVRLocomotion(() => {
      setLocomotion(getVRLocomotionConfig());
    });
  }, []);

  const completedCount = scenario.steps.filter((s) => s.isCompleted).length;
  const isAllComplete = completedCount === scenario.steps.length;

  const handleResetPosition = () => {
    triggerResetVRPlayerOrigin();
    onRecenter?.();
  };

  return (
    <group position={[1.4, 1.25, 0.15]} rotation={[0, -Math.PI / 4, 0]}>
      {/* 1. Armature Stand attached to bench */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.65, 12]} />
        <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Ball joint */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* 2. Tablet Bezel & Housing */}
      <mesh position={[0, 0.16, 0]} castShadow>
        <boxGeometry args={[0.76, 0.66, 0.02]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* 3. Screen Face */}
      <mesh position={[0, 0.16, 0.011]}>
        <planeGeometry args={[0.72, 0.62]} />
        <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Top Header Banner */}
      <mesh position={[0, 0.42, 0.012]}>
        <planeGeometry args={[0.7, 0.05]} />
        <meshBasicMaterial color="#082f49" />
      </mesh>

      <Text
        position={[0, 0.42, 0.013]}
        fontSize={0.022}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
      >
        VR LABORATORY CONSOLE (AIM & CLICK TRIGGER)
      </Text>

      {/* Tab Switcher: [Mission Drill] vs [VR Locomotion] */}
      <group position={[0, 0.365, 0.014]}>
        {/* Mission Tab */}
        <group
          position={[-0.175, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('mission');
          }}
          onPointerOver={() => setHoveredBtn('tab_mission')}
          onPointerOut={() => setHoveredBtn(null)}
        >
          <mesh>
            <boxGeometry args={[0.33, 0.04, 0.008]} />
            <meshStandardMaterial
              color={activeTab === 'mission' ? '#0284c7' : hoveredBtn === 'tab_mission' ? '#1e293b' : '#0f172a'}
              emissive={activeTab === 'mission' ? '#38bdf8' : '#000000'}
              emissiveIntensity={0.25}
            />
          </mesh>
          <Text position={[0, 0, 0.005]} fontSize={0.017} color="#ffffff" anchorX="center" anchorY="middle">
            Safety Mission Drill
          </Text>
        </group>

        {/* Locomotion & Comfort Tab */}
        <group
          position={[0.175, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('locomotion');
          }}
          onPointerOver={() => setHoveredBtn('tab_loco')}
          onPointerOut={() => setHoveredBtn(null)}
        >
          <mesh>
            <boxGeometry args={[0.33, 0.04, 0.008]} />
            <meshStandardMaterial
              color={activeTab === 'locomotion' ? '#0d9488' : hoveredBtn === 'tab_loco' ? '#1e293b' : '#0f172a'}
              emissive={activeTab === 'locomotion' ? '#2dd4bf' : '#000000'}
              emissiveIntensity={0.25}
            />
          </mesh>
          <Text position={[0, 0, 0.005]} fontSize={0.017} color="#ffffff" anchorX="center" anchorY="middle">
            Locomotion & Comfort
          </Text>
        </group>
      </group>

      {/* ==================================================== */}
      {/* VIEW A: SAFETY MISSION DRILL TAB                     */}
      {/* ==================================================== */}
      {activeTab === 'mission' && (
        <>
          {/* Title */}
          <Text
            position={[-0.32, 0.31, 0.013]}
            fontSize={0.024}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
          >
            {scenario.title}
          </Text>

          {/* Progress */}
          <Text
            position={[0.32, 0.31, 0.013]}
            fontSize={0.02}
            color="#a5f3fc"
            anchorX="right"
            anchorY="middle"
          >
            {`${completedCount}/${scenario.steps.length} Tasks`}
          </Text>

          {/* Checklist items in 3D */}
          {scenario.steps.map((step, idx) => {
            const yPos = 0.25 - idx * 0.042;
            return (
              <group key={step.id} position={[-0.32, yPos, 0.013]}>
                <Text
                  position={[0, 0, 0]}
                  fontSize={0.018}
                  color={step.isCompleted ? '#4ade80' : '#cbd5e1'}
                  anchorX="left"
                  anchorY="middle"
                  maxWidth={0.64}
                >
                  {`${step.isCompleted ? '[✓]' : '[ ]'} ${step.instruction}`}
                </Text>
              </group>
            );
          })}

          {/* Status banner */}
          <mesh position={[0, 0.06, 0.012]}>
            <planeGeometry args={[0.66, 0.045]} />
            <meshBasicMaterial color={isAllComplete ? '#064e3b' : '#1e293b'} />
          </mesh>
          <Text
            position={[0, 0.06, 0.013]}
            fontSize={0.018}
            color={isAllComplete ? '#6ee7b7' : '#94a3b8'}
            anchorX="center"
            anchorY="middle"
          >
            {isAllComplete
              ? '★ Drill Protocol Mastered! Select next scenario below.'
              : 'Execute actions by pointing at equipment or clicking buttons.'}
          </Text>

          {/* Action triggers cluster */}
          <group position={[0, -0.005, 0.014]}>
            {scenario.id === 'burner_fire' && (
              <>
                {/* Pull Pin Button */}
                <group
                  position={[-0.22, 0, 0]}
                  onClick={(e) => {
                    e.stopPropagation();
                    onExecuteAction('pull_pin');
                  }}
                  onPointerOver={() => setHoveredBtn('vr_pin')}
                  onPointerOut={() => setHoveredBtn(null)}
                >
                  <mesh>
                    <boxGeometry args={[0.2, 0.04, 0.008]} />
                    <meshStandardMaterial
                      color={pinPulled ? '#15803d' : '#0284c7'}
                      emissive={hoveredBtn === 'vr_pin' ? '#38bdf8' : '#000000'}
                      emissiveIntensity={0.3}
                    />
                  </mesh>
                  <Text position={[0, 0, 0.006]} fontSize={0.016} color="#ffffff" anchorX="center" anchorY="middle">
                    {pinPulled ? 'Pin Pulled [✓]' : '1. Pull Pin (P)'}
                  </Text>
                </group>

                {/* Spray Extinguisher Button */}
                <group
                  position={[0, 0, 0]}
                  onClick={(e) => {
                    e.stopPropagation();
                    onExecuteAction('spray_extinguisher');
                  }}
                  onPointerOver={() => setHoveredBtn('vr_spray')}
                  onPointerOut={() => setHoveredBtn(null)}
                >
                  <mesh>
                    <boxGeometry args={[0.2, 0.04, 0.008]} />
                    <meshStandardMaterial
                      color={isExtinguishing ? '#dc2626' : '#b91c1c'}
                      emissive={hoveredBtn === 'vr_spray' ? '#f87171' : '#000000'}
                      emissiveIntensity={0.3}
                    />
                  </mesh>
                  <Text position={[0, 0, 0.006]} fontSize={0.016} color="#ffffff" anchorX="center" anchorY="middle">
                    {isExtinguishing ? 'Spraying...' : '2. Squeeze & Sweep (S)'}
                  </Text>
                </group>

                {/* Shut Gas Button */}
                <group
                  position={[0.22, 0, 0]}
                  onClick={(e) => {
                    e.stopPropagation();
                    onExecuteAction('shut_gas');
                  }}
                  onPointerOver={() => setHoveredBtn('vr_gas')}
                  onPointerOut={() => setHoveredBtn(null)}
                >
                  <mesh>
                    <boxGeometry args={[0.2, 0.04, 0.008]} />
                    <meshStandardMaterial
                      color={gasShut ? '#15803d' : '#475569'}
                      emissive={hoveredBtn === 'vr_gas' ? '#94a3b8' : '#000000'}
                      emissiveIntensity={0.3}
                    />
                  </mesh>
                  <Text position={[0, 0, 0.006]} fontSize={0.016} color="#ffffff" anchorX="center" anchorY="middle">
                    {gasShut ? 'Gas Shut [✓]' : '3. Shut Gas Valve'}
                  </Text>
                </group>
              </>
            )}

            {scenario.id === 'acid_spill' && (
              <>
                {/* Apply Neutralizer */}
                <group
                  position={[-0.15, 0, 0]}
                  onClick={(e) => {
                    e.stopPropagation();
                    onExecuteAction('apply_neutralizer');
                  }}
                  onPointerOver={() => setHoveredBtn('vr_neut')}
                  onPointerOut={() => setHoveredBtn(null)}
                >
                  <mesh>
                    <boxGeometry args={[0.27, 0.04, 0.008]} />
                    <meshStandardMaterial
                      color={neutralizerApplied ? '#15803d' : '#d97706'}
                      emissive={hoveredBtn === 'vr_neut' ? '#fbbf24' : '#000000'}
                      emissiveIntensity={0.3}
                    />
                  </mesh>
                  <Text position={[0, 0, 0.006]} fontSize={0.016} color="#ffffff" anchorX="center" anchorY="middle">
                    {neutralizerApplied ? 'Neutralized [✓]' : '1. Scatter Neutralizer'}
                  </Text>
                </group>

                {/* Absorb Residue */}
                <group
                  position={[0.15, 0, 0]}
                  onClick={(e) => {
                    e.stopPropagation();
                    onExecuteAction('absorb_residue');
                  }}
                  onPointerOver={() => setHoveredBtn('vr_absorb')}
                  onPointerOut={() => setHoveredBtn(null)}
                >
                  <mesh>
                    <boxGeometry args={[0.27, 0.04, 0.008]} />
                    <meshStandardMaterial
                      color={residueAbsorbed ? '#15803d' : '#0284c7'}
                      emissive={hoveredBtn === 'vr_absorb' ? '#38bdf8' : '#000000'}
                      emissiveIntensity={0.3}
                    />
                  </mesh>
                  <Text position={[0, 0, 0.006]} fontSize={0.016} color="#ffffff" anchorX="center" anchorY="middle">
                    {residueAbsorbed ? 'Absorbed [✓]' : '2. Apply Spill Pads'}
                  </Text>
                </group>
              </>
            )}

            {scenario.id === 'eye_splash' && (
              <group
                position={[0, 0, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onExecuteAction('toggle_eyewash');
                }}
                onPointerOver={() => setHoveredBtn('vr_eyewash')}
                onPointerOut={() => setHoveredBtn(null)}
              >
                <mesh>
                  <boxGeometry args={[0.42, 0.04, 0.008]} />
                  <meshStandardMaterial
                    color={isEyewashActive ? '#0284c7' : '#eab308'}
                    emissive={hoveredBtn === 'vr_eyewash' ? '#67e8f9' : '#000000'}
                    emissiveIntensity={0.3}
                  />
                </mesh>
                <Text position={[0, 0, 0.006]} fontSize={0.017} color="#ffffff" anchorX="center" anchorY="middle">
                  {isEyewashActive ? 'Eyewash Active (15 Min Flush) [✓]' : 'Push Yellow Eyewash Flag'}
                </Text>
              </group>
            )}
          </group>

          {/* Quick PPE toggles in 3D */}
          <group position={[0, -0.055, 0.014]}>
            <group
              position={[-0.15, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onEquipPPE('goggles');
              }}
              onPointerOver={() => setHoveredBtn('vr_goggles')}
              onPointerOut={() => setHoveredBtn(null)}
            >
              <mesh>
                <boxGeometry args={[0.27, 0.034, 0.008]} />
                <meshStandardMaterial
                  color={equippedPPE.goggles ? '#047857' : '#334155'}
                  emissive={hoveredBtn === 'vr_goggles' ? '#34d399' : '#000000'}
                  emissiveIntensity={0.3}
                />
              </mesh>
              <Text position={[0, 0, 0.006]} fontSize={0.015} color="#ffffff" anchorX="center" anchorY="middle">
                {equippedPPE.goggles ? 'Goggles: ON [✓]' : 'Equip Goggles'}
              </Text>
            </group>

            <group
              position={[0.15, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onEquipPPE('gloves');
              }}
              onPointerOver={() => setHoveredBtn('vr_gloves')}
              onPointerOut={() => setHoveredBtn(null)}
            >
              <mesh>
                <boxGeometry args={[0.27, 0.034, 0.008]} />
                <meshStandardMaterial
                  color={equippedPPE.gloves ? '#047857' : '#334155'}
                  emissive={hoveredBtn === 'vr_gloves' ? '#34d399' : '#000000'}
                  emissiveIntensity={0.3}
                />
              </mesh>
              <Text position={[0, 0, 0.006]} fontSize={0.015} color="#ffffff" anchorX="center" anchorY="middle">
                {equippedPPE.gloves ? 'Gloves: ON [✓]' : 'Equip Gloves'}
              </Text>
            </group>
          </group>
        </>
      )}

      {/* ==================================================== */}
      {/* VIEW B: VR LOCOMOTION & COMFORT SETTINGS TAB         */}
      {/* ==================================================== */}
      {activeTab === 'locomotion' && (
        <group position={[0, 0, 0]}>
          {/* Row 1: Locomotion Mode (Thumbstick Walking vs Teleport Arc) */}
          <Text position={[-0.32, 0.31, 0.013]} fontSize={0.019} color="#94a3b8" anchorX="left" anchorY="middle">
            Locomotion Mode:
          </Text>

          <group position={[0.07, 0.31, 0.014]}>
            {/* Thumbstick Walking */}
            <group
              position={[-0.11, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                updateVRLocomotionConfig({ mode: 'thumbstick' });
              }}
              onPointerOver={() => setHoveredBtn('mode_stick')}
              onPointerOut={() => setHoveredBtn(null)}
            >
              <mesh>
                <boxGeometry args={[0.2, 0.032, 0.008]} />
                <meshStandardMaterial
                  color={locomotion.mode === 'thumbstick' ? '#0284c7' : '#1e293b'}
                  emissive={locomotion.mode === 'thumbstick' ? '#38bdf8' : '#000000'}
                  emissiveIntensity={0.3}
                />
              </mesh>
              <Text position={[0, 0, 0.005]} fontSize={0.014} color="#ffffff" anchorX="center" anchorY="middle">
                {locomotion.mode === 'thumbstick' ? '● Thumbstick Walk' : 'Thumbstick Walk'}
              </Text>
            </group>

            {/* Teleport Arc */}
            <group
              position={[0.11, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                updateVRLocomotionConfig({ mode: 'teleport' });
              }}
              onPointerOver={() => setHoveredBtn('mode_tele')}
              onPointerOut={() => setHoveredBtn(null)}
            >
              <mesh>
                <boxGeometry args={[0.2, 0.032, 0.008]} />
                <meshStandardMaterial
                  color={locomotion.mode === 'teleport' ? '#0d9488' : '#1e293b'}
                  emissive={locomotion.mode === 'teleport' ? '#2dd4bf' : '#000000'}
                  emissiveIntensity={0.3}
                />
              </mesh>
              <Text position={[0, 0, 0.005]} fontSize={0.014} color="#ffffff" anchorX="center" anchorY="middle">
                {locomotion.mode === 'teleport' ? '● Teleport Arc' : 'Teleport Arc'}
              </Text>
            </group>
          </group>

          {/* Row 2: Walking Speed Preset */}
          <Text position={[-0.32, 0.24, 0.013]} fontSize={0.019} color="#94a3b8" anchorX="left" anchorY="middle">
            Walking Speed:
          </Text>

          <group position={[0.07, 0.24, 0.014]}>
            {(['slow', 'normal', 'fast'] as const).map((spd, i) => {
              const xPos = (i - 1) * 0.145;
              const isSelected = locomotion.speedPreset === spd;
              const labels = { slow: 'Slow 1.2m/s', normal: 'Normal 2.2m/s', fast: 'Fast 3.5m/s' };
              return (
                <group
                  key={spd}
                  position={[xPos, 0, 0]}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateVRLocomotionConfig({ speedPreset: spd });
                  }}
                  onPointerOver={() => setHoveredBtn(`spd_${spd}`)}
                  onPointerOut={() => setHoveredBtn(null)}
                >
                  <mesh>
                    <boxGeometry args={[0.135, 0.032, 0.008]} />
                    <meshStandardMaterial
                      color={isSelected ? '#0284c7' : '#1e293b'}
                      emissive={isSelected ? '#38bdf8' : '#000000'}
                      emissiveIntensity={0.25}
                    />
                  </mesh>
                  <Text position={[0, 0, 0.005]} fontSize={0.013} color="#ffffff" anchorX="center" anchorY="middle">
                    {labels[spd]}
                  </Text>
                </group>
              );
            })}
          </group>

          {/* Row 3: Turning Mode & Angle */}
          <Text position={[-0.32, 0.17, 0.013]} fontSize={0.019} color="#94a3b8" anchorX="left" anchorY="middle">
            Turn Mode:
          </Text>

          <group position={[0.07, 0.17, 0.014]}>
            {/* Snap 45 */}
            <group
              position={[-0.145, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                updateVRLocomotionConfig({ turnType: 'snap', snapDegrees: 45 });
              }}
              onPointerOver={() => setHoveredBtn('turn_snap45')}
              onPointerOut={() => setHoveredBtn(null)}
            >
              <mesh>
                <boxGeometry args={[0.135, 0.032, 0.008]} />
                <meshStandardMaterial
                  color={locomotion.turnType === 'snap' && locomotion.snapDegrees === 45 ? '#0284c7' : '#1e293b'}
                  emissive={locomotion.turnType === 'snap' && locomotion.snapDegrees === 45 ? '#38bdf8' : '#000000'}
                  emissiveIntensity={0.25}
                />
              </mesh>
              <Text position={[0, 0, 0.005]} fontSize={0.013} color="#ffffff" anchorX="center" anchorY="middle">
                Snap 45°
              </Text>
            </group>

            {/* Snap 30 */}
            <group
              position={[0, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                updateVRLocomotionConfig({ turnType: 'snap', snapDegrees: 30 });
              }}
              onPointerOver={() => setHoveredBtn('turn_snap30')}
              onPointerOut={() => setHoveredBtn(null)}
            >
              <mesh>
                <boxGeometry args={[0.135, 0.032, 0.008]} />
                <meshStandardMaterial
                  color={locomotion.turnType === 'snap' && locomotion.snapDegrees === 30 ? '#0284c7' : '#1e293b'}
                  emissive={locomotion.turnType === 'snap' && locomotion.snapDegrees === 30 ? '#38bdf8' : '#000000'}
                  emissiveIntensity={0.25}
                />
              </mesh>
              <Text position={[0, 0, 0.005]} fontSize={0.013} color="#ffffff" anchorX="center" anchorY="middle">
                Snap 30°
              </Text>
            </group>

            {/* Smooth Turn */}
            <group
              position={[0.145, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                updateVRLocomotionConfig({ turnType: 'smooth' });
              }}
              onPointerOver={() => setHoveredBtn('turn_smooth')}
              onPointerOut={() => setHoveredBtn(null)}
            >
              <mesh>
                <boxGeometry args={[0.135, 0.032, 0.008]} />
                <meshStandardMaterial
                  color={locomotion.turnType === 'smooth' ? '#0284c7' : '#1e293b'}
                  emissive={locomotion.turnType === 'smooth' ? '#38bdf8' : '#000000'}
                  emissiveIntensity={0.25}
                />
              </mesh>
              <Text position={[0, 0, 0.005]} fontSize={0.013} color="#ffffff" anchorX="center" anchorY="middle">
                Smooth Turn
              </Text>
            </group>
          </group>

          {/* Row 4: Comfort Motion Vignette */}
          <Text position={[-0.32, 0.10, 0.013]} fontSize={0.019} color="#94a3b8" anchorX="left" anchorY="middle">
            Comfort Vignette:
          </Text>

          <group position={[0.07, 0.10, 0.014]}>
            <group
              position={[0, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                updateVRLocomotionConfig({ vignetteEnabled: !locomotion.vignetteEnabled });
              }}
              onPointerOver={() => setHoveredBtn('vignette_toggle')}
              onPointerOut={() => setHoveredBtn(null)}
            >
              <mesh>
                <boxGeometry args={[0.42, 0.032, 0.008]} />
                <meshStandardMaterial
                  color={locomotion.vignetteEnabled ? '#047857' : '#334155'}
                  emissive={locomotion.vignetteEnabled ? '#34d399' : '#000000'}
                  emissiveIntensity={0.25}
                />
              </mesh>
              <Text position={[0, 0, 0.005]} fontSize={0.014} color="#ffffff" anchorX="center" anchorY="middle">
                {locomotion.vignetteEnabled
                  ? 'Motion Tunneling: ON (Minimizes Motion Sickness)'
                  : 'Motion Tunneling: OFF (Full Field of View)'}
              </Text>
            </group>
          </group>

          {/* Controller Quick Reference Summary */}
          <mesh position={[0, 0.01, 0.012]}>
            <planeGeometry args={[0.66, 0.07]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
          <Text position={[0, 0.025, 0.013]} fontSize={0.015} color="#38bdf8" anchorX="center" anchorY="middle">
            LEFT STICK: Walk & Strafe (follows head direction) · RIGHT STICK: Turn / Aim
          </Text>
          <Text position={[0, -0.005, 0.013]} fontSize={0.014} color="#94a3b8" anchorX="center" anchorY="middle">
            Click Both Thumbsticks to instantly Reset Position · Collision bounds active
          </Text>
        </group>
      )}

      {/* ==================================================== */}
      {/* BOTTOM CONTROLS: SCENARIOS, RECENTER & EXIT VR       */}
      {/* ==================================================== */}
      {/* Scenario switcher buttons in 3D */}
      <group position={[0, -0.10, 0.014]}>
        <group
          position={[-0.22, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectScenario('burner_fire');
          }}
          onPointerOver={() => setHoveredBtn('scen_fire')}
          onPointerOut={() => setHoveredBtn(null)}
        >
          <mesh>
            <boxGeometry args={[0.2, 0.032, 0.008]} />
            <meshStandardMaterial color={hoveredBtn === 'scen_fire' ? '#dc2626' : '#1e293b'} />
          </mesh>
          <Text position={[0, 0, 0.005]} fontSize={0.014} color="#fca5a5" anchorX="center" anchorY="middle">
            Flash Fire
          </Text>
        </group>

        <group
          position={[0, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectScenario('acid_spill');
          }}
          onPointerOver={() => setHoveredBtn('scen_acid')}
          onPointerOut={() => setHoveredBtn(null)}
        >
          <mesh>
            <boxGeometry args={[0.2, 0.032, 0.008]} />
            <meshStandardMaterial color={hoveredBtn === 'scen_acid' ? '#d97706' : '#1e293b'} />
          </mesh>
          <Text position={[0, 0, 0.005]} fontSize={0.014} color="#fde68a" anchorX="center" anchorY="middle">
            Acid Spill
          </Text>
        </group>

        <group
          position={[0.22, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectScenario('eye_splash');
          }}
          onPointerOver={() => setHoveredBtn('scen_eye')}
          onPointerOut={() => setHoveredBtn(null)}
        >
          <mesh>
            <boxGeometry args={[0.2, 0.032, 0.008]} />
            <meshStandardMaterial color={hoveredBtn === 'scen_eye' ? '#2563eb' : '#1e293b'} />
          </mesh>
          <Text position={[0, 0, 0.005]} fontSize={0.014} color="#bfdbfe" anchorX="center" anchorY="middle">
            Eye Splash
          </Text>
        </group>
      </group>

      {/* Session Controls: Reset Position to Bench & Exit VR */}
      <group position={[0, -0.145, 0.014]}>
        <group
          position={[-0.15, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            handleResetPosition();
          }}
          onPointerOver={() => setHoveredBtn('recenter')}
          onPointerOut={() => setHoveredBtn(null)}
        >
          <mesh>
            <boxGeometry args={[0.27, 0.034, 0.008]} />
            <meshStandardMaterial
              color={hoveredBtn === 'recenter' ? '#0284c7' : '#0f172a'}
              emissive={hoveredBtn === 'recenter' ? '#38bdf8' : '#000000'}
              emissiveIntensity={0.3}
            />
          </mesh>
          <Text position={[0, 0, 0.005]} fontSize={0.014} color="#bae6fd" anchorX="center" anchorY="middle">
            ⟲ Reset Position to Bench
          </Text>
        </group>

        <group
          position={[0.15, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onExitVR?.();
          }}
          onPointerOver={() => setHoveredBtn('exit_vr')}
          onPointerOut={() => setHoveredBtn(null)}
        >
          <mesh>
            <boxGeometry args={[0.27, 0.034, 0.008]} />
            <meshStandardMaterial
              color={hoveredBtn === 'exit_vr' ? '#ef4444' : '#450a0a'}
              emissive={hoveredBtn === 'exit_vr' ? '#f87171' : '#000000'}
              emissiveIntensity={0.4}
            />
          </mesh>
          <Text position={[0, 0, 0.005]} fontSize={0.014} color="#fca5a5" anchorX="center" anchorY="middle">
            Exit VR Session
          </Text>
        </group>
      </group>
    </group>
  );
};
