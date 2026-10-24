import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  Shield,
  Flame,
  CheckCircle2,
  PackagePlus,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { EquipmentItem } from '../../types';

interface ItemInspectModalProps {
  item: EquipmentItem | null;
  onClose: () => void;
  onPickUp: (item: EquipmentItem) => void;
  onTriggerAction: (action: string) => void;
}

export const ItemInspectModal: React.FC<ItemInspectModalProps> = ({
  item,
  onClose,
  onPickUp,
  onTriggerAction
}) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!item) return null;

  const sds = item.sds;

  const handleAction = (actionId: string, label: string) => {
    onTriggerAction(actionId);
    setFeedback(`Action executed: ${label}`);
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 z-10">
          <div>
            <div className="text-xs font-medium text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Equipment & Safety Data Sheet</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 uppercase">{item.category}</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">{item.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Action Feedback Banner */}
          {feedback && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          {/* Description */}
          <div className="text-slate-300 leading-relaxed bg-slate-800/40 p-3.5 rounded-lg border border-slate-800">
            {item.description}
          </div>

          {/* Safe Use Protocol */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Safe Handling & Operation Protocol</span>
            </h3>
            <p className="text-slate-200 bg-slate-800/60 p-3 rounded-lg border border-slate-700/60 leading-relaxed">
              {item.safeUseProtocol}
            </p>
          </div>

          {/* SDS Section (if chemical or hazardous reagent) */}
          {sds && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Safety Data Sheet: {sds.chemicalName}</span>
                  </h3>
                  <div className="text-xs text-slate-400 font-mono-data mt-0.5">
                    Formula: {sds.formula} · CAS: {sds.casNumber}
                  </div>
                </div>

                {/* Signal Word */}
                <div
                  className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider ${
                    sds.signalWord === 'DANGER'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {sds.signalWord}
                </div>
              </div>

              {/* NFPA 704 Diamond & GHS Statements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* NFPA 704 Diamond Graphic */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col items-center justify-center">
                  <div className="text-[11px] font-semibold text-slate-400 mb-2">NFPA 704 Rating</div>
                  <div className="relative w-20 h-20">
                    {/* Top: Flammability (Red) */}
                    <div className="absolute top-0 left-5 w-10 h-10 bg-red-600/90 text-white font-bold flex items-center justify-center rotate-45 border border-slate-900 shadow">
                      <span className="-rotate-45 text-xs font-mono-data">{sds.nfpaRating.flammability}</span>
                    </div>
                    {/* Left: Health (Blue) */}
                    <div className="absolute top-5 left-0 w-10 h-10 bg-blue-600/90 text-white font-bold flex items-center justify-center rotate-45 border border-slate-900 shadow">
                      <span className="-rotate-45 text-xs font-mono-data">{sds.nfpaRating.health}</span>
                    </div>
                    {/* Right: Instability (Yellow) */}
                    <div className="absolute top-5 left-10 w-10 h-10 bg-amber-500/90 text-slate-950 font-bold flex items-center justify-center rotate-45 border border-slate-900 shadow">
                      <span className="-rotate-45 text-xs font-mono-data">{sds.nfpaRating.instability}</span>
                    </div>
                    {/* Bottom: Special (White) */}
                    <div className="absolute top-10 left-5 w-10 h-10 bg-slate-200 text-slate-950 font-bold flex items-center justify-center rotate-45 border border-slate-900 shadow">
                      <span className="-rotate-45 text-[10px] font-mono-data">{sds.nfpaRating.special || '—'}</span>
                    </div>
                  </div>
                </div>

                {/* Hazard Statements */}
                <div className="md:col-span-2 bg-slate-800/40 p-3 rounded-lg border border-slate-800 text-xs space-y-1.5">
                  <div className="font-semibold text-red-400">GHS Hazard Statements:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {sds.hazardStatements.map((stmt, idx) => (
                      <li key={idx}>{stmt}</li>
                    ))}
                  </ul>
                  <div className="font-semibold text-slate-400 pt-1">Required PPE:</div>
                  <div className="text-slate-300">{sds.ppeRequired.join(' · ')}</div>
                </div>
              </div>

              {/* First Aid Measures */}
              <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-cyan-400">First Aid Instructions:</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="p-2 bg-slate-900/60 rounded">
                    <span className="font-bold text-slate-200">Eyes: </span>
                    <span className="text-slate-300">{sds.firstAid.eyes}</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded">
                    <span className="font-bold text-slate-200">Skin: </span>
                    <span className="text-slate-300">{sds.firstAid.skin}</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded">
                    <span className="font-bold text-slate-200">Inhalation: </span>
                    <span className="text-slate-300">{sds.firstAid.inhalation}</span>
                  </div>
                </div>
              </div>

              {/* Spill Response */}
              <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-800 text-xs">
                <span className="font-semibold text-amber-400">Spill Response: </span>
                <span className="text-slate-300">{sds.spillResponse}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
          <div className="flex flex-wrap items-center gap-2">
            {/* Pick Up Interaction */}
            {item.isPickable && (
              <button
                onClick={() => {
                  onPickUp(item);
                  setFeedback(`Added ${item.name} to Student Equipment`);
                }}
                className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <PackagePlus className="w-4 h-4" />
                <span>Pick Up & Equip</span>
              </button>
            )}

            {/* Context-Sensitive Actions dynamically mapped */}
            {item.actions &&
              item.actions.map((act) => (
                <button
                  key={act.id}
                  onClick={() => handleAction(act.id, act.label)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm ${
                    act.primary
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{act.label}</span>
                </button>
              ))}

            {/* Default interactive fallbacks if no actions array */}
            {!item.actions && item.id === 'bunsen_burner' && (
              <button
                onClick={() => handleAction('tip_burner', 'Simulate Flash Fire')}
                className="px-3.5 py-1.5 bg-red-600/90 hover:bg-red-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Simulate Flash Fire</span>
              </button>
            )}

            {!item.actions && item.id === 'beaker_acid' && (
              <button
                onClick={() => handleAction('spill_acid', 'Simulate Acid Spill')}
                className="px-3.5 py-1.5 bg-amber-600/90 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Simulate Acid Spill</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
