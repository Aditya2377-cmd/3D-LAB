import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Flame,
  CheckCircle2,
  X,
  ArrowRight,
  HelpCircle,
  AlertOctagon,
  Wrench
} from 'lucide-react';
import { HazardItem, HazardStep } from '../../types';

interface HazardGuidedHUDProps {
  hazard: HazardItem;
  currentStepIndex: number;
  steps: HazardStep[];
  onExecuteAction: (actionKey: string) => void;
  onExitHazard: () => void;
  pinPulled?: boolean;
  isExtinguishing?: boolean;
  gasShut?: boolean;
  neutralizerApplied?: boolean;
  residueAbsorbed?: boolean;
  isEyewashActive?: boolean;
}

export const HazardGuidedHUD: React.FC<HazardGuidedHUDProps> = ({
  hazard,
  currentStepIndex,
  steps,
  onExecuteAction,
  onExitHazard,
  pinPulled,
  isExtinguishing,
  gasShut,
  neutralizerApplied,
  residueAbsorbed,
  isEyewashActive
}) => {
  const currentStep = steps[currentStepIndex] || steps[steps.length - 1];
  const completedCount = steps.filter((s) => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);
  const isAllComplete = completedCount === steps.length;

  return (
    <div className="fixed top-16 left-6 z-20 max-w-md w-full select-none animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-slate-900/95 border border-red-500/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Header bar */}
        <div className="px-4 py-3 bg-red-950/80 border-b border-red-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-bold text-red-200 uppercase tracking-wider">
              Active Hazard Resolution Drill
            </span>
          </div>

          <button
            onClick={onExitHazard}
            className="p-1 text-red-300 hover:text-white rounded-lg hover:bg-red-900/60 transition-colors"
            title="Exit Drill & Return to Inspection"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hazard Title & Overall Progress */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight leading-snug">{hazard.title}</h3>
              <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">{hazard.shortDescription}</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30 shrink-0">
              {hazard.severity}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Resolution Progress</span>
              <span className="font-mono-data text-cyan-400 font-bold">{completedCount} of {steps.length} Steps ({progressPercent}%)</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Current Step Active Card */}
          {!isAllComplete ? (
            <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-300 text-xs font-bold flex items-center justify-center">
                    {currentStepIndex + 1}
                  </span>
                  <span className="text-xs font-bold text-white">{currentStep.title}</span>
                </div>
                <span className="text-[10px] text-amber-400 font-semibold uppercase">Pending</span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed pl-7">
                {currentStep.instruction}
              </p>

              {/* Educational Context */}
              <div className="pl-7 space-y-1.5 text-[11px]">
                <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-slate-300">
                  <span className="font-semibold text-cyan-300">Why this matters: </span>
                  <span>{currentStep.whyItMatters}</span>
                </div>
                <div className="bg-red-950/30 p-2 rounded-lg border border-red-500/30 text-red-300">
                  <span className="font-semibold text-red-400">Avoid: </span>
                  <span>{currentStep.unsafeActionToAvoid}</span>
                </div>
              </div>

              {/* Direct Interactive Action Button */}
              <div className="pl-7 pt-1 flex flex-wrap gap-2">
                <button
                  onClick={() => onExecuteAction(currentStep.actionRequired)}
                  className="w-full py-2 px-3 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>
                    Execute: {currentStep.title}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            /* Completed Banner */
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-xl space-y-2 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-sm font-bold text-emerald-200">Incident Resolved Successfully!</div>
              <p className="text-xs text-emerald-300/80 leading-relaxed">
                {hazard.successSummary}
              </p>
              <button
                onClick={onExitHazard}
                className="mt-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
              >
                Return to Laboratory Inspection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
