import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  FlaskConical,
  Atom,
  BarChart3,
  Flame,
  Play,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { EXPERIMENTS_DATA } from '../../data/experimentsData';
import { ExperimentItem, ExperimentCategory, ExperimentDifficulty } from '../../types';

interface ExperimentLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExperiment: (experiment: ExperimentItem) => void;
}

export const ExperimentLibraryModal: React.FC<ExperimentLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectExperiment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExperimentCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ExperimentDifficulty | 'all'>('all');
  const [selectedExpId, setSelectedExpId] = useState<string>(EXPERIMENTS_DATA[0].id);

  const filteredExperiments = useMemo(() => {
    return EXPERIMENTS_DATA.filter((exp) => {
      const matchesCat = selectedCategory === 'all' || exp.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'all' || exp.difficulty === selectedDifficulty;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        exp.title.toLowerCase().includes(q) ||
        exp.principle.toLowerCase().includes(q) ||
        (exp.equation && exp.equation.toLowerCase().includes(q)) ||
        exp.learningObjectives.some((obj) => obj.toLowerCase().includes(q)) ||
        exp.requiredReagents.some((r) => r.toLowerCase().includes(q));

      return matchesCat && matchesDiff && matchesQuery;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const selectedExp = useMemo(() => {
    return EXPERIMENTS_DATA.find((e) => e.id === selectedExpId) || filteredExperiments[0] || EXPERIMENTS_DATA[0];
  }, [selectedExpId, filteredExperiments]);

  if (!isOpen) return null;

  const getCategoryBadge = (cat: ExperimentCategory) => {
    switch (cat) {
      case 'basic':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">Basic Chemistry</span>;
      case 'reactions':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">Reactions & Kinetics</span>;
      case 'analytical':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Analytical Chemistry</span>;
      case 'physical':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">Physical & Electro</span>;
    }
  };

  const getDifficultyBadge = (diff: ExperimentDifficulty) => {
    switch (diff) {
      case 'Introductory':
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-300">Introductory</span>;
      case 'Intermediate':
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/20 text-amber-300">Intermediate</span>;
      case 'Advanced':
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-rose-500/20 text-rose-300">Advanced</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200 select-none">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-6xl h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">Virtual Chemistry Experiment Simulator</h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                  {EXPERIMENTS_DATA.length} Curriculum Labs
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Perform rigorous quantitative chemistry experiments with real thermodynamic, analytical, and kinetic mathematical engines.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              All Labs ({EXPERIMENTS_DATA.length})
            </button>
            <button
              onClick={() => setSelectedCategory('basic')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'basic'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Basic Chemistry (10)
            </button>
            <button
              onClick={() => setSelectedCategory('reactions')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'reactions'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Reactions & Materials (10)
            </button>
            <button
              onClick={() => setSelectedCategory('analytical')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'analytical'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Analytical Chemistry (8)
            </button>
            <button
              onClick={() => setSelectedCategory('physical')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'physical'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Physical & Electro (7)
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search labs, formulas..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Difficulties</option>
              <option value="Introductory">Introductory</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* 2-Column Main Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Experiment Cards */}
          <div className="w-full md:w-5/12 lg:w-4/12 border-r border-slate-800 overflow-y-auto p-3 space-y-2 shrink-0">
            {filteredExperiments.map((exp) => {
              const isSelected = exp.id === selectedExp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExpId(exp.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500/80 shadow-md ring-1 ring-cyan-500/30'
                      : 'bg-slate-950/40 hover:bg-slate-800/50 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white line-clamp-1">{exp.title}</span>
                    {getDifficultyBadge(exp.difficulty)}
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {exp.principle}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                    <div className="flex items-center gap-1.5">
                      {getCategoryBadge(exp.category)}
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{exp.duration}</span>
                      </span>
                    </div>
                    <span className="text-cyan-400 font-medium flex items-center gap-0.5">
                      <span>View Lab</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Experiment Inspector */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-950/50">
            {selectedExp ? (
              <>
                {/* Header Action Banner */}
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      {getCategoryBadge(selectedExp.category)}
                      {getDifficultyBadge(selectedExp.difficulty)}
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{selectedExp.duration}</span>
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-tight">{selectedExp.title}</h2>
                    <p className="text-xs text-slate-300 leading-relaxed">{selectedExp.principle}</p>
                  </div>

                  <button
                    onClick={() => {
                      onSelectExperiment(selectedExp);
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 shrink-0"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Launch Virtual Experiment</span>
                  </button>
                </div>

                {/* Equation Box (if present) */}
                {selectedExp.equation && (
                  <div className="p-3.5 bg-slate-900 border border-cyan-500/30 rounded-xl space-y-1">
                    <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Governing Reaction / Equation:</div>
                    <div className="text-xs font-mono-data text-white py-1">
                      {selectedExp.equation}
                    </div>
                  </div>
                )}

                {/* Learning Objectives */}
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>Educational Learning Objectives</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedExp.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Required Apparatus & Reagents */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Required 3D Apparatus</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedExp.requiredApparatus.map((app, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-[11px]">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Chemical Reagents</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedExp.requiredReagents.map((reagent, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-[11px]">
                          {reagent}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Safety Precautions */}
                <div className="p-4 bg-amber-950/20 border border-amber-500/20 rounded-xl space-y-1.5">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Experiment Safety Precautions</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-amber-200/90">
                    {selectedExp.safetyPrecautions.map((safe, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{safe}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Launcher Footer */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      onSelectExperiment(selectedExp);
                      onClose();
                    }}
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Set Up Workbench & Launch Simulator</span>
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
