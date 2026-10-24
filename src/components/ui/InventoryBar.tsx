import React from 'react';
import {
  Glasses,
  ShieldCheck,
  Flame,
  Package,
  Check,
  UserCheck
} from 'lucide-react';
import { InventoryItem } from '../../types';

interface InventoryBarProps {
  inventory: InventoryItem[];
  equippedPPE: {
    goggles: boolean;
    gloves: boolean;
    labCoat: boolean;
  };
  onEquipPPE: (key: 'goggles' | 'gloves' | 'labCoat') => void;
  onUseItem: (item: InventoryItem) => void;
}

export const InventoryBar: React.FC<InventoryBarProps> = ({
  inventory,
  equippedPPE,
  onEquipPPE,
  onUseItem
}) => {
  return (
    <div className="fixed top-18 right-4 z-20 w-72 bg-slate-900/95 border border-slate-800 rounded-xl p-3.5 shadow-xl select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
          <UserCheck className="w-4 h-4 text-cyan-400" />
          <span>Student Equipment</span>
        </div>
        <div className="text-[11px] text-slate-400 font-mono-data">
          PPE: {(equippedPPE.goggles ? 1 : 0) + (equippedPPE.gloves ? 1 : 0) + (equippedPPE.labCoat ? 1 : 0)}/3 Active
        </div>
      </div>

      {/* PPE Equipping Grid */}
      <div className="pt-2.5 space-y-1.5">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Mandatory Safety PPE
        </div>

        {/* Goggles Toggle */}
        <button
          onClick={() => onEquipPPE('goggles')}
          className={`w-full p-2 rounded-lg border text-xs flex items-center justify-between transition-colors ${
            equippedPPE.goggles
              ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200'
              : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Glasses className="w-4 h-4 text-cyan-400" />
            <span>Splash Goggles</span>
          </div>
          {equippedPPE.goggles ? (
            <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-semibold">
              <Check className="w-3.5 h-3.5" /> Equipped
            </span>
          ) : (
            <span className="text-[11px] text-slate-500">Click to Wear</span>
          )}
        </button>

        {/* Gloves Toggle */}
        <button
          onClick={() => onEquipPPE('gloves')}
          className={`w-full p-2 rounded-lg border text-xs flex items-center justify-between transition-colors ${
            equippedPPE.gloves
              ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200'
              : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Nitrile Gloves</span>
          </div>
          {equippedPPE.gloves ? (
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" /> Equipped
            </span>
          ) : (
            <span className="text-[11px] text-slate-500">Click to Wear</span>
          )}
        </button>
      </div>

      {/* Picked-Up Handheld Tools / Gear */}
      <div className="pt-3 border-t border-slate-800 mt-2.5 space-y-1.5">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Carried Safety Gear
        </div>

        {inventory.length === 0 ? (
          <div className="text-xs text-slate-500 italic p-2 bg-slate-800/20 rounded border border-dashed border-slate-800 text-center">
            Click &apos;Pick Up&apos; on Extinguisher or Spill Kit to hold
          </div>
        ) : (
          <div className="space-y-1.5">
            {inventory.map((item) => (
              <div
                key={item.id}
                className="p-2 bg-slate-800/70 border border-slate-700/60 rounded-lg flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  {item.icon === 'Flame' ? (
                    <Flame className="w-4 h-4 text-red-400" />
                  ) : (
                    <Package className="w-4 h-4 text-amber-400" />
                  )}
                  <span className="text-slate-200 font-medium">{item.name}</span>
                </div>
                <button
                  onClick={() => onUseItem(item)}
                  className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-[11px] font-semibold transition-colors"
                >
                  Deploy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
