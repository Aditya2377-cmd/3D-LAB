import React, { useState } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { EquipmentItem } from '../../types';

interface VREquipmentInspectorProps {
  item: EquipmentItem | null;
  onClose: () => void;
  onPickUp: (item: EquipmentItem) => void;
  onExecuteAction: (actionKey: string) => void;
}

export const VREquipmentInspector: React.FC<VREquipmentInspectorProps> = ({
  item,
  onClose,
  onPickUp,
  onExecuteAction
}) => {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  if (!item) return null;

  const actions = item.actions || [];
  const sds = item.sds;
  const ppeList: string[] = sds?.ppeRequired || ['Splash Goggles', 'Nitrile Gloves', 'Lab Coat'];

  return (
    <group position={[0, 1.45, 0.65]} rotation={[-0.22, 0, 0]}>
      {/* 1. Main Acrylic Panel Frame & Glass Backing */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.05, 0.72, 0.02]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.35}
          metalness={0.7}
          transparent={true}
          opacity={0.94}
        />
      </mesh>

      {/* Cyber/Lab Border Accent */}
      <mesh position={[0, 0, 0.011]}>
        <planeGeometry args={[1.02, 0.69]} />
        <meshBasicMaterial color="#020617" />
      </mesh>

      {/* Top Header Bar */}
      <mesh position={[0, 0.31, 0.012]}>
        <planeGeometry args={[1.0, 0.07]} />
        <meshStandardMaterial color="#0369a1" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Title */}
      <Text
        position={[-0.47, 0.31, 0.015]}
        fontSize={0.032}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        maxWidth={0.75}
      >
        {item.name}
      </Text>

      {/* Close Button ("X") */}
      <group
        position={[0.44, 0.31, 0.016]}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onPointerOver={() => setHoveredBtn('close')}
        onPointerOut={() => setHoveredBtn(null)}
      >
        <mesh>
          <boxGeometry args={[0.07, 0.05, 0.008]} />
          <meshStandardMaterial
            color={hoveredBtn === 'close' ? '#ef4444' : '#dc2626'}
            emissive={hoveredBtn === 'close' ? '#f87171' : '#000000'}
            emissiveIntensity={0.5}
          />
        </mesh>
        <Text position={[0, 0, 0.006]} fontSize={0.026} color="#ffffff" anchorX="center" anchorY="middle">
          ✕
        </Text>
      </group>

      {/* Category & Status Bar */}
      <group position={[-0.47, 0.24, 0.014]}>
        <Text fontSize={0.018} color="#38bdf8" anchorX="left" anchorY="middle">
          {`CATEGORY: ${item.category.toUpperCase()}  |  STATUS: ${(item.status || 'normal').toUpperCase()}`}
        </Text>
      </group>

      {/* Safe Handling Procedure Section */}
      <group position={[-0.47, 0.17, 0.014]}>
        <Text fontSize={0.02} color="#fbbf24" anchorX="left" anchorY="middle">
          SAFE OPERATING PROCEDURE:
        </Text>
        <Text
          position={[0, -0.045, 0]}
          fontSize={0.017}
          color="#e2e8f0"
          anchorX="left"
          anchorY="top"
          maxWidth={0.94}
          lineHeight={1.25}
        >
          {item.safeUseProtocol || item.description}
        </Text>
      </group>

      {/* Hazard Warning / Chemical SDS Details if present */}
      {sds && (
        <group position={[-0.47, 0.01, 0.014]}>
          <Text fontSize={0.019} color="#f87171" anchorX="left" anchorY="middle">
            {`HAZARD SIGNAL: ${sds.signalWord} (CAS: ${sds.casNumber || 'N/A'})`}
          </Text>
          <Text
            position={[0, -0.035, 0]}
            fontSize={0.016}
            color="#cbd5e1"
            anchorX="left"
            anchorY="top"
            maxWidth={0.94}
            lineHeight={1.2}
          >
            {sds.hazardStatements[0] || 'Observe mandatory chemical hygiene plan.'}
          </Text>
        </group>
      )}

      {/* Required PPE Badges */}
      <group position={[-0.47, -0.11, 0.014]}>
        <Text fontSize={0.018} color="#94a3b8" anchorX="left" anchorY="middle">
          REQUIRED PPE:
        </Text>
        <group position={[0.16, 0, 0]}>
          {ppeList.slice(0, 3).map((ppe: string, i: number) => (
            <group key={i} position={[i * 0.24, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.22, 0.036, 0.006]} />
                <meshStandardMaterial color="#1e293b" roughness={0.5} />
              </mesh>
              <Text position={[0, 0, 0.005]} fontSize={0.014} color="#38bdf8" anchorX="center" anchorY="middle">
                {`✓ ${ppe}`}
              </Text>
            </group>
          ))}
        </group>
      </group>

      {/* Interactive Action Buttons Row */}
      <group position={[0, -0.22, 0.015]}>
        {/* Dynamic Context Actions */}
        {actions.slice(0, 3).map((act, idx) => {
          const btnKey = `act_${act.id}`;
          const isHovered = hoveredBtn === btnKey;
          const isDanger = act.id.includes('fire') || act.id.includes('tip') || act.id.includes('spill');
          const isWarning = act.id.includes('neutralize') || act.id.includes('shut');
          const totalBtns = actions.length + (item.isPickable ? 1 : 0);
          const xOffset = (idx - (totalBtns - 1) / 2) * 0.26;

          return (
            <group
              key={act.id}
              position={[xOffset, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onExecuteAction(act.id);
              }}
              onPointerOver={() => setHoveredBtn(btnKey)}
              onPointerOut={() => setHoveredBtn(null)}
            >
              <mesh>
                <boxGeometry args={[0.24, 0.058, 0.01]} />
                <meshStandardMaterial
                  color={
                    isDanger
                      ? isHovered
                        ? '#dc2626'
                        : '#991b1b'
                      : isWarning
                      ? isHovered
                        ? '#d97706'
                        : '#b45309'
                      : isHovered
                      ? '#0284c7'
                      : '#0369a1'
                  }
                  emissive={
                    isHovered
                      ? isDanger
                        ? '#ef4444'
                        : isWarning
                        ? '#f59e0b'
                        : '#38bdf8'
                      : '#000000'
                  }
                  emissiveIntensity={0.5}
                />
              </mesh>
              <Text
                position={[0, 0, 0.007]}
                fontSize={0.015}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={0.22}
              >
                {act.label}
              </Text>
            </group>
          );
        })}

        {/* Pick Up / Equip Button */}
        {item.isPickable && (
          <group
            position={[actions.length > 0 ? (actions.length - (actions.length) / 2) * 0.26 : 0, 0, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onPickUp(item);
              onClose();
            }}
            onPointerOver={() => setHoveredBtn('pickup')}
            onPointerOut={() => setHoveredBtn(null)}
          >
            <mesh>
              <boxGeometry args={[0.22, 0.058, 0.01]} />
              <meshStandardMaterial
                color={hoveredBtn === 'pickup' ? '#059669' : '#047857'}
                emissive={hoveredBtn === 'pickup' ? '#34d399' : '#000000'}
                emissiveIntensity={0.5}
              />
            </mesh>
            <Text position={[0, 0, 0.007]} fontSize={0.016} color="#ffffff" anchorX="center" anchorY="middle">
              Pick Up / Equip
            </Text>
          </group>
        )}
      </group>

      {/* Bottom Dismiss Prompt */}
      <Text position={[0, -0.31, 0.015]} fontSize={0.014} color="#64748b" anchorX="center" anchorY="middle">
        Aim VR Controller Ray & Squeeze Index Trigger to Execute Actions
      </Text>
    </group>
  );
};
