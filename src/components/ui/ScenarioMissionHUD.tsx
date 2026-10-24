import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  HelpCircle,
  Flame,
  Droplets,
  PackageCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { SafetyScenario } from '../../types';

interface ScenarioMissionHUDProps {
  scenario: SafetyScenario;
  onExecuteAction: (actionKey: string) => void;
  isExtinguishing: boolean;
  isEyewashActive: boolean;
  pinPulled: boolean;
  gasShut: boolean;
  neutralizerApplied: boolean;
  residueAbsorbed: boolean;
}

export const ScenarioMissionHUD: React.FC<ScenarioMissionHUDProps> = ({
  scenario,
  onExecuteAction,
  isExtinguishing,
  isEyewashActive,
  pinPulled,
  gasShut,
  neutralizerApplied,
  residueAbsorbed
}) => {
  const completedCount = scenario.steps.filter((s) => s.isCompleted).length;
  const isAllComplete = completedCount === scenario.steps.length;

  return (
    <div className="fixed top-18 left-4 z-20 w-80 bg-slate-900/95 border border-slate-800 rounded-xl p-4 shadow-xl select-none">
      {/* Title & Severity Header */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Active Safety Drill
          </div>
          <h3 className="text-sm font-bold text-white mt-0.5">{scenario.title}</h3>
        </div>
        <div
          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
            scenario.severity === 'critical'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : scenario.severity === 'high'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
          }`}
        >
          {scenario.severity}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
        {scenario.description}
      </p>

      {/* Steps Checklist */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400">Response Checklist:</span>
          <span className="font-mono-data text-slate-400">
            {completedCount}/{scenario.steps.length} Complete
          </span>
        </div>

        <div className="space-y-1.5">
          {scenario.steps.map((step, idx) => (
            <div
              key={step.id}
              className={`p-2 rounded-lg border text-xs flex items-start gap-2 transition-all ${
                step.isCompleted
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-slate-800/30 border-slate-800 text-slate-300'
              }`}
            >
              {step.isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span className="font-medium text-[11px] text-slate-400 mr-1.5 font-mono-data">
                  0{idx + 1}.
                </span>
                <span>{step.instruction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Emergency Execution Deck */}
      {!isAllComplete && (
        <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Available Emergency Actions
          </div>

          {/* Scenario-specific Action Buttons */}
          {scenario.id === 'burner_fire' && (
            <div className="space-y-1.5">
              {!pinPulled && (
                <button
                  onClick={() => onExecuteAction('pull_pin')}
                  className="w-full py-1.5 px-3 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-semibold flex items-center justify-between shadow-sm"
                >
                  <span>1. Pull Extinguisher Safety Pin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {pinPulled && !isExtinguishing && (
                <button
                  onClick={() => onExecuteAction('extinguish_fire')}
                  className="w-full py-1.5 px-3 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-semibold flex items-center justify-between shadow-sm animate-bounce"
                >
                  <span>2. Squeeze & Sweep Horn at Base</span>
                  <Flame className="w-3.5 h-3.5" />
                </button>
              )}

              {!gasShut && (
                <button
                  onClick={() => onExecuteAction('shut_gas_valve')}
                  className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded text-xs font-semibold flex items-center justify-between border border-slate-700"
                >
                  <span>3. Shut Gas Turret Cock Valve</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {scenario.id === 'acid_spill' && (
            <div className="space-y-1.5">
              {!neutralizerApplied && (
                <button
                  onClick={() => onExecuteAction('apply_neutralizer')}
                  className="w-full py-1.5 px-3 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-semibold flex items-center justify-between shadow-sm"
                >
                  <span>Scatter Sodium Bicarbonate Buffer</span>
                  <PackageCheck className="w-3.5 h-3.5" />
                </button>
              )}

              {neutralizerApplied && !residueAbsorbed && (
                <button
                  onClick={() => onExecuteAction('absorb_slurry')}
                  className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center justify-between shadow-sm"
                >
                  <span>Absorb Slurry with Spill Pads</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {scenario.id === 'eye_splash' && (
            <div className="space-y-1.5">
              <button
                onClick={() => onExecuteAction('activate_eyewash_lever')}
                className="w-full py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold flex items-center justify-between shadow-sm"
              >
                <span>{isEyewashActive ? 'Eyewash Flowing · Continue 15m Rinse' : 'Push Yellow Eyewash Flag Lever'}</span>
                <Droplets className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Success Notification Banner */}
      {isAllComplete && (
        <div className="mt-3 p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-200 text-xs space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Drill Protocol Succeeded!</span>
          </div>
          <p>{scenario.successMessage}</p>
        </div>
      )}
    </div>
  );
};
