import React, { useState } from 'react';
import {
  RotateCcw,
  Eye,
  Footprints,
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Flame,
  Droplets,
  AlertOctagon,
  BookOpen,
  Glasses,
  LayoutGrid,
  FlaskConical
} from 'lucide-react';
import { CameraMode, QualityMode, CameraPreset } from '../../types';

interface BottomControlDockProps {
  cameraMode: CameraMode;
  quality: QualityMode;
  isMuted: boolean;
  activeScenarioId: string;
  isVRActive: boolean;
  cameraPreset: CameraPreset | null;
  onSetCameraMode: (mode: CameraMode) => void;
  onSetQuality: (quality: QualityMode) => void;
  onToggleMute: () => void;
  onResetView: () => void;
  onSelectScenario: (id: string) => void;
  onSelectPreset: (preset: CameraPreset) => void;
  onEnterVR: () => void;
  onOpenHazardCenter?: () => void;
  onOpenExperiments?: () => void;
}

export const BottomControlDock: React.FC<BottomControlDockProps> = ({
  cameraMode,
  quality,
  isMuted,
  activeScenarioId,
  isVRActive,
  cameraPreset,
  onSetCameraMode,
  onSetQuality,
  onToggleMute,
  onResetView,
  onSelectScenario,
  onSelectPreset,
  onEnterVR,
  onOpenHazardCenter,
  onOpenExperiments
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center select-none w-full max-w-[1040px] px-4">
      {/* Collapse / Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-1.5 px-3 py-1 bg-slate-900/90 hover:bg-slate-800 text-slate-300 text-xs font-medium rounded-t-lg border-t border-x border-slate-700/80 shadow-md flex items-center gap-1 transition-all"
      >
        {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        <span>{isCollapsed ? 'Show Controls (H)' : 'Hide Controls (H)'}</span>
      </button>

      {/* Dock Body */}
      <div
        className={`w-full bg-slate-900/95 border border-slate-700/80 rounded-xl p-2.5 shadow-2xl transition-all duration-300 flex flex-wrap items-center justify-between gap-2.5 ${
          isCollapsed ? 'translate-y-32 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        {/* Section 1: Quick Mode Selector */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/50">
          <button
            onClick={() => onSelectScenario('free_exploration')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
              activeScenarioId === 'free_exploration'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Inspection</span>
          </button>

          {onOpenHazardCenter && (
            <button
              onClick={onOpenHazardCenter}
              className="px-2 py-1 text-xs font-medium text-amber-300 hover:text-white hover:bg-slate-700 rounded transition-colors flex items-center gap-1"
              title="Open 29 Hazard Training Scenarios"
            >
              <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
              <span>Hazards (29)</span>
            </button>
          )}

          {onOpenExperiments && (
            <button
              onClick={onOpenExperiments}
              className="px-2 py-1 text-xs font-medium text-cyan-300 hover:text-white hover:bg-slate-700 rounded transition-colors flex items-center gap-1"
              title="Open 35 Virtual Chemistry Experiments"
            >
              <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
              <span>Labs (35)</span>
            </button>
          )}

          <button
            onClick={() => onSelectScenario('burner_fire')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
              activeScenarioId === 'burner_fire'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Flash Fire</span>
          </button>
          <button
            onClick={() => onSelectScenario('acid_spill')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
              activeScenarioId === 'acid_spill'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Acid Spill</span>
          </button>
          <button
            onClick={() => onSelectScenario('eye_splash')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
              activeScenarioId === 'eye_splash'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Eye Splash</span>
          </button>
        </div>

        {/* Section 2: Camera Presets (Stations) */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/50">
          <span className="text-[11px] text-slate-400 px-1.5 flex items-center gap-1">
            <LayoutGrid className="w-3 h-3 text-cyan-400" />
            <span>View:</span>
          </span>
          <button
            onClick={() => onSelectPreset('bench')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
              cameraPreset === 'bench' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Bench
          </button>
          <button
            onClick={() => onSelectPreset('fume_hood')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
              cameraPreset === 'fume_hood' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Fume Hood
          </button>
          <button
            onClick={() => onSelectPreset('storage')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
              cameraPreset === 'storage' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Chemicals
          </button>
          <button
            onClick={() => onSelectPreset('emergency')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
              cameraPreset === 'emergency' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Emergency
          </button>
          <button
            onClick={() => onSelectPreset('overview')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
              cameraPreset === 'overview' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Overview
          </button>
        </div>

        {/* Section 3: Navigation Modes + VR */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/50">
          <button
            onClick={() => onSetCameraMode('orbit')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
              cameraMode === 'orbit' && !isVRActive
                ? 'bg-slate-700 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Orbit</span>
          </button>
          <button
            onClick={() => onSetCameraMode('walk')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
              cameraMode === 'walk' && !isVRActive
                ? 'bg-slate-700 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>Walk</span>
          </button>
          <button
            onClick={onEnterVR}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5 border ${
              isVRActive
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                : 'bg-cyan-900/60 hover:bg-cyan-800 text-cyan-300 border-cyan-700/60'
            }`}
            title="Launch WebXR VR Session"
          >
            <Glasses className="w-3.5 h-3.5" />
            <span>{isVRActive ? 'In VR' : 'VR'}</span>
          </button>
          {isVRActive && (
            <button
              onClick={() => {
                import('../../xr/vrLocomotionStore').then((m) => m.triggerResetVRPlayerOrigin());
              }}
              className="px-2 py-1 text-xs font-medium rounded bg-slate-700 hover:bg-slate-600 text-cyan-300 transition-colors flex items-center gap-1"
              title="Reset VR Avatar Position to Bench"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Pos</span>
            </button>
          )}
        </div>

        {/* Section 4: Performance Quality, Audio & Reset */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onSetQuality(quality === 'high' ? 'low' : 'high')}
            title="Toggle Graphics Quality"
            className="px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 transition-colors flex items-center gap-1.5"
          >
            {quality === 'high' ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">PBR High</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Saver</span>
              </>
            )}
          </button>

          <button
            onClick={onToggleMute}
            title="Toggle Sound Effects"
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={onResetView}
            title="Reset Camera Angle"
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
