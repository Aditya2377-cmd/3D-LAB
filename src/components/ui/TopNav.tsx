import React from 'react';
import { ShieldCheck, AlertTriangle, Glasses, FlaskConical, AlertOctagon } from 'lucide-react';

interface TopNavProps {
  onSelectNav: (tab: string) => void;
  activeNav: string;
  onTriggerDrill: () => void;
  onEnterVR: () => void;
  isVRActive: boolean;
  onOpenHazardCenter: () => void;
  onOpenExperiments: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onSelectNav,
  activeNav,
  onTriggerDrill,
  onEnterVR,
  isVRActive,
  onOpenHazardCenter,
  onOpenExperiments
}) => {
  return (
    <header className="h-14 bg-slate-900/90 border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between gap-4 md:gap-8 z-30 select-none">
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-2 shrink-0">
        <ShieldCheck className="w-5 h-5 text-cyan-400" />
        <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
          ChemSafe 3D
        </span>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-300">
        <button
          onClick={() => onSelectNav('lab')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeNav === 'lab' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Virtual Lab Bench
        </button>

        <button
          onClick={onOpenHazardCenter}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 text-amber-300 font-semibold"
        >
          <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
          <span>Hazard Center (29)</span>
        </button>

        <button
          onClick={onOpenExperiments}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 text-cyan-300 font-semibold"
        >
          <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
          <span>Experiments (35)</span>
        </button>

        <button
          onClick={() => onSelectNav('scenarios')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeNav === 'scenarios' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Emergency Scenarios
        </button>

        <button
          onClick={() => onSelectNav('sds')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeNav === 'sds' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          SDS Viewer
        </button>

        <button
          onClick={() => onSelectNav('pass')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeNav === 'pass' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          P.A.S.S. Guide
        </button>

        <button
          onClick={() => onSelectNav('vr_guide')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeNav === 'vr_guide' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          VR Guide
        </button>
      </nav>

      {/* Zone 3: Quick Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Mobile/Tablet direct access buttons */}
        <button
          onClick={onOpenHazardCenter}
          className="lg:hidden px-2.5 py-1.5 text-xs font-semibold bg-amber-950/70 hover:bg-amber-900 border border-amber-600/60 text-amber-300 rounded-lg flex items-center gap-1"
        >
          <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
          <span>Hazards</span>
        </button>

        <button
          onClick={onOpenExperiments}
          className="lg:hidden px-2.5 py-1.5 text-xs font-semibold bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-600/60 text-cyan-300 rounded-lg flex items-center gap-1"
        >
          <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
          <span>Labs</span>
        </button>

        {/* VR Mode Button */}
        <button
          onClick={onEnterVR}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 border ${
            isVRActive
              ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500'
              : 'bg-cyan-700 hover:bg-cyan-600 text-white border-cyan-500 active:scale-95'
          }`}
          title="Enter immersive VR mode with VR controllers"
        >
          <Glasses className="w-3.5 h-3.5" />
          <span>{isVRActive ? 'VR Active' : 'Enter VR'}</span>
        </button>

        {/* Drill Button */}
        <button
          onClick={onTriggerDrill}
          className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-500 active:scale-95 rounded-lg transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Accident Drill</span>
          <span className="sm:hidden">Drill</span>
        </button>
      </div>
    </header>
  );
};
