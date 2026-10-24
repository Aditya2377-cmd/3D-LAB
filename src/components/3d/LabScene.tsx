import React, { Suspense, useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { XR } from '@react-three/xr';
import { xrStore } from '../../xr/xrStore';
import { VRPlayer } from './VRPlayer';
import { VRClipboard } from './VRClipboard';
import { VREquipmentInspector } from './VREquipmentInspector';
import { EquipmentItem, QualityMode, CameraMode, CameraPreset, SafetyScenario } from '../../types';
import {
  BunsenBurner,
  TripodWithWireGauze,
  RetortStand,
  ErlenmeyerFlask,
  VolumetricFlask,
  BeakerAcid,
  GraduatedCylinder,
  TestTubeRack,
  ReagentBottle,
  FireExtinguisherModel,
  FireBlanketModel,
  SpillKitModel,
  SafetyGogglesModel,
  NitrileGlovesBox,
  LabCoatPegModel,
  FlammableCabinetModel
} from './EquipmentModels';
import { LabBench } from './LabBench';
import { FumeHood } from './FumeHood';
import { EyewashStation } from './EyewashStation';
import {
  FireAccidentFx,
  SmokeParticles,
  SpreadingSpill,
  ExtinguisherSpray,
  EyewashStream
} from './AccidentEffects';
import { FirstPersonControls } from './FirstPersonControls';

// Preset target and position coordinates
const PRESET_COORDINATES: Record<CameraPreset, { pos: [number, number, number]; target: [number, number, number] }> = {
  bench: { pos: [0.3, 1.45, 1.25], target: [0.3, 1.05, -0.05] },
  fume_hood: { pos: [-0.1, 1.7, -0.5], target: [-0.1, 1.5, -1.8] },
  storage: { pos: [1.9, 1.55, -0.6], target: [2.8, 1.25, -1.5] },
  emergency: { pos: [-1.8, 1.6, 1.6], target: [-2.7, 1.25, 0.8] },
  overview: { pos: [0, 2.3, 3.2], target: [0, 1.1, 0] }
};

interface CameraAnimatorProps {
  preset: CameraPreset | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  onTransitionEnd: () => void;
}

const CameraAnimator: React.FC<CameraAnimatorProps> = ({ preset, controlsRef, onTransitionEnd }) => {
  const { camera } = useThree();
  const targetPos = useRef<THREE.Vector3 | null>(null);
  const targetLook = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (!preset) return;
    const config = PRESET_COORDINATES[preset];
    targetPos.current = new THREE.Vector3(...config.pos);
    targetLook.current = new THREE.Vector3(...config.target);
  }, [preset]);

  useFrame((_, delta) => {
    if (!targetPos.current || !targetLook.current || !controlsRef.current) return;

    // Smoothly damp camera position & orbit target
    camera.position.lerp(targetPos.current, 5 * delta);
    controlsRef.current.target.lerp(targetLook.current, 5 * delta);
    controlsRef.current.update();

    if (camera.position.distanceTo(targetPos.current) < 0.05) {
      targetPos.current = null;
      targetLook.current = null;
      onTransitionEnd();
    }
  });

  return null;
};

interface LabSceneProps {
  equipment: EquipmentItem[];
  quality: QualityMode;
  cameraMode: CameraMode;
  cameraPreset: CameraPreset | null;
  hoveredId: string | null;
  selectedId: string | null;
  isExtinguishing: boolean;
  isEyewashActive: boolean;
  scenario: SafetyScenario;
  equippedPPE: {
    goggles: boolean;
    gloves: boolean;
    labCoat: boolean;
  };
  pinPulled: boolean;
  gasShut: boolean;
  neutralizerApplied: boolean;
  residueAbsorbed: boolean;
  activeExperimentLiquidColor?: string;
  activeExperimentLiquidOpacity?: number;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  onExecuteAction: (actionKey: string) => void;
  onEquipPPE: (key: 'goggles' | 'gloves' | 'labCoat') => void;
  onSelectScenario: (id: string) => void;
  onPresetTransitionEnd: () => void;
  onPickUp?: (item: EquipmentItem) => void;
  onExitVR?: () => void;
}

export const LabScene: React.FC<LabSceneProps> = ({
  equipment,
  quality,
  cameraMode,
  cameraPreset,
  hoveredId,
  selectedId,
  isExtinguishing,
  isEyewashActive,
  scenario,
  equippedPPE,
  pinPulled,
  gasShut,
  neutralizerApplied,
  residueAbsorbed,
  activeExperimentLiquidColor,
  activeExperimentLiquidOpacity,
  onHover,
  onClick,
  onExecuteAction,
  onEquipPPE,
  onSelectScenario,
  onPresetTransitionEnd,
  onPickUp,
  onExitVR
}) => {
  const [isVRActive, setIsVRActive] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    return xrStore.subscribe((state) => {
      setIsVRActive(state.session != null);
    });
  }, []);

  const getEquipment = (id: string) => equipment.find((e) => e.id === id);

  const burner = getEquipment('bunsen_burner');
  const tripod = getEquipment('tripod_gauze');
  const retort = getEquipment('retort_stand');
  const flask = getEquipment('erlenmeyer_flask');
  const volumetric = getEquipment('volumetric_flask');
  const acidBeaker = getEquipment('beaker_acid');
  const cylinder = getEquipment('graduated_cylinder');
  const rack = getEquipment('test_tube_rack');
  const ethanol = getEquipment('reagent_ethanol');
  const nitric = getEquipment('reagent_hno3');
  const goggles = getEquipment('safety_goggles');
  const gloves = getEquipment('nitrile_gloves');
  const labCoat = getEquipment('lab_coat_peg');
  const extinguisher = getEquipment('fire_extinguisher');
  const fireBlanket = getEquipment('fire_blanket');
  const spillKit = getEquipment('spill_kit');
  const flammableCabinet = getEquipment('flammable_cabinet');

  const isBurnerTipped = burner?.status === 'tipped';
  const isAcidSpill = acidBeaker?.status === 'spilling' || acidBeaker?.status === 'neutralized';

  const hoveredItem = equipment.find((e) => e.id === hoveredId);

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows={quality === 'high'}
        camera={{ position: [0, 2.1, 2.9], fov: 48 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <XR store={xrStore}>
          <Suspense fallback={null}>
            {/* VR Player Feet Origin & Thumbstick Locomotion */}
            <VRPlayer />

            {/* In-VR 3D Interactive Console */}
            <VRClipboard
              scenario={scenario}
              equippedPPE={equippedPPE}
              pinPulled={pinPulled}
              isExtinguishing={isExtinguishing}
              gasShut={gasShut}
              neutralizerApplied={neutralizerApplied}
              residueAbsorbed={residueAbsorbed}
              isEyewashActive={isEyewashActive}
              onExecuteAction={onExecuteAction}
              onEquipPPE={onEquipPPE}
              onSelectScenario={onSelectScenario}
              onExitVR={onExitVR}
            />

            {/* In-VR 3D Floating Equipment Inspector Panel (Displays when equipment is selected in VR) */}
            {isVRActive && selectedId && (
              <VREquipmentInspector
                item={getEquipment(selectedId) || null}
                onClose={() => onClick('')}
                onPickUp={(it) => {
                  if (onPickUp) onPickUp(it);
                  else onExecuteAction(it.id);
                }}
                onExecuteAction={onExecuteAction}
              />
            )}

            {/* Camera Preset Animator */}
            <CameraAnimator
              preset={cameraPreset}
              controlsRef={controlsRef}
              onTransitionEnd={onPresetTransitionEnd}
            />

            {/* Professional Bright Laboratory Lighting Rig */}
            <ambientLight intensity={0.9} color="#f8fafc" />
            <directionalLight
              position={[2.5, 6, 2.5]}
              intensity={1.3}
              color="#ffffff"
              castShadow={quality === 'high'}
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0003}
            />
            {/* Soft Window Daylight Infill */}
            <directionalLight position={[5, 4, 1]} intensity={0.65} color="#e0f2fe" />
            <directionalLight position={[-4, 3, -1]} intensity={0.4} color="#f1f5f9" />

            {/* Overhead Fluorescent Troffer Lights on Ceiling */}
            {[
              [-1.2, 3.3, 0],
              [1.2, 3.3, 0],
              [0, 3.3, -1.2]
            ].map((pos, idx) => (
              <group key={idx} position={pos as [number, number, number]}>
                {/* Troffer Housing */}
                <mesh position={[0, 0.05, 0]}>
                  <boxGeometry args={[1.2, 0.08, 0.6]} />
                  <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.7} />
                </mesh>
                {/* Diffuser Lens (Emissive White) */}
                <mesh position={[0, 0, 0]}>
                  <planeGeometry args={[1.14, 0.54]} />
                  <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
                </mesh>
                <pointLight position={[0, -0.1, 0]} intensity={0.5} distance={4} decay={2} color="#ffffff" />
              </group>
            ))}

            {/* SPACIOUS BRIGHT LABORATORY ROOM ARCHITECTURE */}
            {/* 1. Floor: Crisp Light Grey Laboratory Safety Vinyl Tile */}
            <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={quality === 'high'}>
              <planeGeometry args={[14, 12]} />
              <meshStandardMaterial
                color="#e2e8f0"
                roughness={0.28}
                metalness={0.06}
              />
            </mesh>

            {/* Floor Grid Tile Dividers (Hairline seams) */}
            <gridHelper args={[14, 14, '#94a3b8', '#cbd5e1']} position={[0, 0.001, 0]} />

            {/* 2. Walls: Bright Architectural Clean Lab Off-White */}
            {/* Back Wall */}
            <mesh position={[0, 1.8, -2.6]} receiveShadow={quality === 'high'}>
              <planeGeometry args={[14, 3.8]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.7} />
            </mesh>
            {/* Back Wall PVC Protective Baseboard Trim */}
            <mesh position={[0, 0.08, -2.59]}>
              <boxGeometry args={[14, 0.16, 0.02]} />
              <meshStandardMaterial color="#334155" roughness={0.6} />
            </mesh>

            {/* Left Wall */}
            <mesh position={[-4.2, 1.8, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow={quality === 'high'}>
              <planeGeometry args={[12, 3.8]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.7} />
            </mesh>
            <mesh position={[-4.19, 0.08, 0]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[12, 0.16, 0.02]} />
              <meshStandardMaterial color="#334155" roughness={0.6} />
            </mesh>

            {/* Right Wall (Window Wall with Daylight Panes) */}
            <mesh position={[4.2, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow={quality === 'high'}>
              <planeGeometry args={[12, 3.8]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.7} />
            </mesh>
            {/* Large Architectural Laboratory Window Panes */}
            {[-1.8, 0, 1.8].map((zOffset, i) => (
              <group key={i} position={[4.18, 1.9, zOffset]} rotation={[0, -Math.PI / 2, 0]}>
                {/* Aluminum Window Frame */}
                <mesh>
                  <boxGeometry args={[1.5, 2.0, 0.04]} />
                  <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.8} />
                </mesh>
                {/* Frosted / Daylit Window Pane */}
                <mesh position={[0, 0, 0.01]}>
                  <planeGeometry args={[1.4, 1.9]} />
                  <meshStandardMaterial
                    color="#e0f2fe"
                    emissive="#bae6fd"
                    emissiveIntensity={0.6}
                    roughness={0.15}
                    metalness={0.1}
                  />
                </mesh>
              </group>
            ))}

            {/* 3. Illuminated Emergency Exit Sign (Above Back Door) */}
            <group position={[-2.4, 3.0, -2.58]}>
              <mesh>
                <boxGeometry args={[0.55, 0.22, 0.08]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              {/* Green Emissive Face Plate */}
              <mesh position={[0, 0, 0.042]}>
                <planeGeometry args={[0.51, 0.18]} />
                <meshStandardMaterial color="#15803d" emissive="#22c55e" emissiveIntensity={0.8} />
              </mesh>
            </group>

            {/* 4. Safety Wall Posters on Back Wall */}
            {/* Poster 1: PASS Protocol */}
            <group position={[1.6, 2.2, -2.58]}>
              <mesh>
                <planeGeometry args={[0.9, 1.1]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[0, 0.42, 0.001]}>
                <planeGeometry args={[0.84, 0.18]} />
                <meshBasicMaterial color="#dc2626" />
              </mesh>
              <mesh position={[0, -0.08, 0.001]}>
                <planeGeometry args={[0.8, 0.68]} />
                <meshBasicMaterial color="#0f172a" />
              </mesh>
            </group>

            {/* Poster 2: GHS Chemical Hazard Diamond Chart */}
            <group position={[-1.6, 2.2, -2.58]}>
              <mesh>
                <planeGeometry args={[0.9, 1.1]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[0, 0.42, 0.001]}>
                <planeGeometry args={[0.84, 0.18]} />
                <meshBasicMaterial color="#0284c7" />
              </mesh>
              <mesh position={[0, -0.08, 0.001]}>
                <planeGeometry args={[0.8, 0.68]} />
                <meshBasicMaterial color="#0f172a" />
              </mesh>
            </group>

            {/* Secondary Preparation Bench along the rear wall */}
            <group position={[0, 0, -2.1]}>
              {/* Countertop */}
              <mesh position={[0, 0.9, 0]} receiveShadow={quality === 'high'}>
                <boxGeometry args={[4.2, 0.08, 0.75]} />
                <meshStandardMaterial color="#0f172a" roughness={0.25} metalness={0.15} />
              </mesh>
              {/* Base Cabinets */}
              <mesh position={[0, 0.43, 0]}>
                <boxGeometry args={[4.1, 0.86, 0.7]} />
                <meshStandardMaterial color="#334155" roughness={0.7} />
              </mesh>
              {/* Analytical Balance on rear bench */}
              <mesh position={[1.4, 1.05, 0]}>
                <boxGeometry args={[0.32, 0.22, 0.26]} />
                <meshStandardMaterial color="#f1f5f9" roughness={0.4} metalness={0.3} />
              </mesh>
              {/* Reagent Wash Bottles on rear bench */}
              <mesh position={[-1.4, 1.04, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.2, 12]} />
                <meshStandardMaterial color="#f8fafc" transparent opacity={0.65} roughness={0.2} />
              </mesh>
            </group>

            {/* Central Hero Lab Bench Structure */}
            <LabBench quality={quality} />

            {/* Fume Hood at Rear Left */}
            <FumeHood
              position={[-0.1, 1.6, -1.8]}
              quality={quality}
              isSelected={selectedId === 'fume_hood'}
              onHover={onHover}
              onClick={onClick}
            />

            {/* Left Wall Emergency Eyewash & Safety Shower Station */}
            <EyewashStation
              position={[-2.7, 1.2, 0.8]}
              quality={quality}
              isActive={isEyewashActive}
              isSelected={selectedId === 'eyewash_station'}
              onHover={onHover}
              onClick={onClick}
            />
            <EyewashStream active={isEyewashActive} quality={quality} />

            {/* Contact Shadows grounding the equipment on the benchtop */}
            {quality === 'high' && (
              <ContactShadows
                position={[0, 0.941, 0]}
                opacity={0.6}
                scale={3.4}
                blur={1.4}
                far={0.6}
                resolution={512}
                color="#0f172a"
              />
            )}

            {/* 3D LAB EQUIPMENT MODELS (All using MeshStandardMaterial PBR shaders) */}
            {burner && (
              <BunsenBurner
                item={burner}
                quality={quality}
                isHovered={hoveredId === 'bunsen_burner'}
                isSelected={selectedId === 'bunsen_burner'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {tripod && (
              <TripodWithWireGauze
                item={tripod}
                quality={quality}
                isHovered={hoveredId === 'tripod_gauze'}
                isSelected={selectedId === 'tripod_gauze'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {retort && (
              <RetortStand
                item={retort}
                quality={quality}
                isHovered={hoveredId === 'retort_stand'}
                isSelected={selectedId === 'retort_stand'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {flask && (
              <ErlenmeyerFlask
                item={flask}
                quality={quality}
                isHovered={hoveredId === 'erlenmeyer_flask'}
                isSelected={selectedId === 'erlenmeyer_flask'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {volumetric && (
              <VolumetricFlask
                item={volumetric}
                quality={quality}
                isHovered={hoveredId === 'volumetric_flask'}
                isSelected={selectedId === 'volumetric_flask'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {acidBeaker && (
              <BeakerAcid
                item={acidBeaker}
                quality={quality}
                isHovered={hoveredId === 'beaker_acid'}
                isSelected={selectedId === 'beaker_acid'}
                onHover={onHover}
                onClick={onClick}
                liquidColor={activeExperimentLiquidColor}
                liquidOpacity={activeExperimentLiquidOpacity}
              />
            )}

            {cylinder && (
              <GraduatedCylinder
                item={cylinder}
                quality={quality}
                isHovered={hoveredId === 'graduated_cylinder'}
                isSelected={selectedId === 'graduated_cylinder'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {rack && (
              <TestTubeRack
                item={rack}
                quality={quality}
                isHovered={hoveredId === 'test_tube_rack'}
                isSelected={selectedId === 'test_tube_rack'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {ethanol && (
              <ReagentBottle
                item={ethanol}
                quality={quality}
                isHovered={hoveredId === 'reagent_ethanol'}
                isSelected={selectedId === 'reagent_ethanol'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {nitric && (
              <ReagentBottle
                item={nitric}
                quality={quality}
                isHovered={hoveredId === 'reagent_hno3'}
                isSelected={selectedId === 'reagent_hno3'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {goggles && (
              <SafetyGogglesModel
                item={goggles}
                quality={quality}
                isHovered={hoveredId === 'safety_goggles'}
                isSelected={selectedId === 'safety_goggles'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {gloves && (
              <NitrileGlovesBox
                item={gloves}
                quality={quality}
                isHovered={hoveredId === 'nitrile_gloves'}
                isSelected={selectedId === 'nitrile_gloves'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {labCoat && (
              <LabCoatPegModel
                item={labCoat}
                quality={quality}
                isHovered={hoveredId === 'lab_coat_peg'}
                isSelected={selectedId === 'lab_coat_peg'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {flammableCabinet && (
              <FlammableCabinetModel
                item={flammableCabinet}
                quality={quality}
                isHovered={hoveredId === 'flammable_cabinet'}
                isSelected={selectedId === 'flammable_cabinet'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {extinguisher && (
              <FireExtinguisherModel
                item={extinguisher}
                quality={quality}
                isHovered={hoveredId === 'fire_extinguisher'}
                isSelected={selectedId === 'fire_extinguisher'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {fireBlanket && (
              <FireBlanketModel
                item={fireBlanket}
                quality={quality}
                isHovered={hoveredId === 'fire_blanket'}
                isSelected={selectedId === 'fire_blanket'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {spillKit && (
              <SpillKitModel
                item={spillKit}
                quality={quality}
                isHovered={hoveredId === 'spill_kit'}
                isSelected={selectedId === 'spill_kit'}
                onHover={onHover}
                onClick={onClick}
              />
            )}

            {/* Animated Accident FX */}
            {isBurnerTipped && (
              <>
                <FireAccidentFx position={[0.65, 0.945, -0.05]} active={true} quality={quality} />
                <SmokeParticles position={[0.65, 1.1, -0.05]} active={true} quality={quality} />
              </>
            )}

            {isAcidSpill && (
              <SpreadingSpill
                position={[-0.38, 0.945, -0.05]}
                status={acidBeaker.status as 'spilling' | 'neutralized'}
                quality={quality}
              />
            )}

            <ExtinguisherSpray
              position={[1.2, 1.1, 0.2]}
              targetPosition={[0.65, 0.95, -0.05]}
              active={isExtinguishing}
              quality={quality}
            />

            {/* Hover Tooltip in 3D */}
            {hoveredItem && !isVRActive && (
              <Html
                position={[
                  hoveredItem.position[0],
                  hoveredItem.position[1] + 0.32,
                  hoveredItem.position[2]
                ]}
                center
                distanceFactor={6}
              >
                <div className="bg-slate-900/95 border border-cyan-500/60 text-white px-3 py-1.5 rounded-lg shadow-xl text-xs whitespace-nowrap pointer-events-none transform -translate-y-2">
                  <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <span>{hoveredItem.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Click to inspect safety protocol</div>
                </div>
              </Html>
            )}

            {/* Desktop Orbit Controls */}
            {!isVRActive && cameraMode === 'orbit' && (
              <OrbitControls
                ref={controlsRef}
                enableDamping
                dampingFactor={0.08}
                minDistance={0.8}
                maxDistance={5.5}
                maxPolarAngle={Math.PI / 2.02}
                target={[0, 1.05, 0]}
              />
            )}

            {/* First-Person Walk Controls */}
            {!isVRActive && cameraMode === 'walk' && (
              <FirstPersonControls active={true} />
            )}
          </Suspense>
        </XR>
      </Canvas>

      {/* Crosshair indicator in Walk mode */}
      {!isVRActive && cameraMode === 'walk' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-3 h-3 border border-white/60 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-cyan-400 rounded-full" />
          </div>
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-slate-950/80 px-3 py-1.5 rounded text-xs text-slate-300 font-medium">
            Walk Mode Active: WASD to Move · Drag Mouse to Look
          </div>
        </div>
      )}
    </div>
  );
};
