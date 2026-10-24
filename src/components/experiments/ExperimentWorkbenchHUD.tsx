import React from 'react';
import {
  FlaskConical,
  Gauge,
  Thermometer,
  Scale,
  Activity,
  Sliders,
  BookOpen,
  X,
  Play,
  RotateCcw,
  Sparkles,
  Plus
} from 'lucide-react';
import { ExperimentItem, ExperimentLiveState } from '../../types';

interface ExperimentWorkbenchHUDProps {
  experiment: ExperimentItem;
  liveState: ExperimentLiveState;
  onUpdateParam: (key: string, value: number) => void;
  onTriggerAction: (actionKey: string) => void;
  onOpenNotebook: () => void;
  onExitExperiment: () => void;
  onResetExperiment: () => void;
}

export const ExperimentWorkbenchHUD: React.FC<ExperimentWorkbenchHUDProps> = ({
  experiment,
  liveState,
  onUpdateParam,
  onTriggerAction,
  onOpenNotebook,
  onExitExperiment,
  onResetExperiment
}) => {
  const { readings, params, dataPoints } = liveState;
  const currentStep = experiment.steps[liveState.currentStepIndex] || experiment.steps[experiment.steps.length - 1];

  return (
    <div className="fixed top-16 left-6 z-20 max-w-md w-full select-none animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-slate-900/95 border border-cyan-500/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md text-slate-200">
        {/* Top Header */}
        <div className="px-4 py-2.5 bg-cyan-950/80 border-b border-cyan-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Virtual Lab Simulator
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onResetExperiment}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="Reset Experiment Parameters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onExitExperiment}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="Close Experiment"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Experiment Title & Principle snippet */}
        <div className="p-4 space-y-3.5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                {experiment.category} Chemistry
              </span>
              <span className="text-[10px] text-slate-400 font-mono-data">
                {dataPoints.length} Readings Logged
              </span>
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight leading-snug">{experiment.title}</h3>
            {experiment.equation && (
              <div className="text-[11px] font-mono-data text-cyan-200/90 bg-slate-950/80 px-2 py-1 rounded mt-1.5 border border-slate-800">
                {experiment.equation}
              </div>
            )}
          </div>

          {/* REAL-TIME DIGITAL INSTRUMENT READOUTS GRID */}
          <div className="grid grid-cols-3 gap-2">
            {/* pH Meter */}
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span>pH Meter</span>
              </span>
              <div className="text-sm font-mono-data font-bold text-white mt-1">
                {readings.pH.toFixed(2)}
              </div>
              <div
                className="w-full h-1 rounded-full mt-1.5 transition-colors"
                style={{ backgroundColor: readings.color }}
              />
            </div>

            {/* Thermometer */}
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-red-400" />
                <span>Temp Probe</span>
              </span>
              <div className="text-sm font-mono-data font-bold text-white mt-1">
                {readings.temperature.toFixed(1)} <span className="text-[10px] text-slate-400">°C</span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono-data">
                {(readings.temperature + 273.15).toFixed(1)} K
              </span>
            </div>

            {/* Analytical Balance / Volume / Pressure */}
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                {experiment.category === 'physical' ? (
                  <>
                    <Gauge className="w-3 h-3 text-amber-400" />
                    <span>Pressure</span>
                  </>
                ) : (
                  <>
                    <Scale className="w-3 h-3 text-emerald-400" />
                    <span>Absorbance</span>
                  </>
                )}
              </span>
              <div className="text-sm font-mono-data font-bold text-white mt-1">
                {experiment.category === 'physical'
                  ? `${readings.pressure.toFixed(1)} kPa`
                  : `${readings.absorbance.toFixed(3)} AU`}
              </div>
              <span className="text-[9px] text-slate-500 font-mono-data">
                {experiment.category === 'physical'
                  ? `${(readings.pressure / 101.325).toFixed(2)} atm`
                  : `T: ${(Math.pow(10, -readings.absorbance) * 100).toFixed(1)}%`}
              </span>
            </div>
          </div>

          {/* PARAMETER ADJUSTMENT CONTROLS */}
          <div className="space-y-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sliders className="w-3 h-3 text-cyan-400" />
              <span>Experimental Variable Controls</span>
            </div>

            {Object.entries(experiment.paramLabels).map(([key, config]) => {
              const currentVal = params[key] ?? experiment.defaultParams[key] ?? config.min;
              return (
                <div key={key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{config.label}</span>
                    <span className="font-mono-data font-bold text-cyan-400">
                      {typeof currentVal === 'number' ? currentVal.toFixed(config.step < 0.1 ? 2 : 1) : currentVal}{' '}
                      <span className="text-[10px] text-slate-500 font-normal">{config.unit}</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    value={currentVal}
                    onChange={(e) => onUpdateParam(key, parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              );
            })}
          </div>

          {/* STEP WORKFLOW GUIDANCE */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-cyan-600/30 text-cyan-300 text-[10px] flex items-center justify-center font-bold">
                  {liveState.currentStepIndex + 1}
                </span>
                <span>{currentStep.title}</span>
              </span>
              <span className="text-[10px] text-slate-400">
                Step {liveState.currentStepIndex + 1} of {experiment.steps.length}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pl-5">
              {currentStep.instruction}
            </p>
          </div>

          {/* ACTION BUTTONS & NOTEBOOK LAUNCHER */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onTriggerAction('record_reading')}
              className="py-2.5 px-3 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Reading</span>
            </button>

            <button
              onClick={onOpenNotebook}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-cyan-300 hover:text-white border border-slate-700 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lab Notebook ({dataPoints.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
