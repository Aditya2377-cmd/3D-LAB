import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  AlertTriangle,
  Flame,
  ShieldCheck,
  ShieldAlert,
  Clock,
  BookOpen,
  Play,
  CheckCircle2,
  AlertOctagon,
  Info,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { HAZARDS_DATA } from '../../data/hazardsData';
import { HazardItem, HazardCategory, HazardSeverity } from '../../types';

interface HazardCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTraining: (hazard: HazardItem) => void;
  onHighlightEquipment?: (equipmentId: string) => void;
}

export const HazardCenterModal: React.FC<HazardCenterModalProps> = ({
  isOpen,
  onClose,
  onStartTraining,
  onHighlightEquipment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HazardCategory | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<HazardSeverity | 'all'>('all');
  const [selectedHazardId, setSelectedHazardId] = useState<string>(HAZARDS_DATA[0].id);

  const filteredHazards = useMemo(() => {
    return HAZARDS_DATA.filter((h) => {
      const matchesCategory = selectedCategory === 'all' || h.category === selectedCategory;
      const matchesSeverity = selectedSeverity === 'all' || h.severity === selectedSeverity;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        h.title.toLowerCase().includes(q) ||
        h.shortDescription.toLowerCase().includes(q) ||
        h.immediateRisks.some((r) => r.toLowerCase().includes(q)) ||
        (h.sdsReference && h.sdsReference.toLowerCase().includes(q)) ||
        h.requiredTools.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSeverity && matchesQuery;
    });
  }, [searchQuery, selectedCategory, selectedSeverity]);

  const selectedHazard = useMemo(() => {
    return HAZARDS_DATA.find((h) => h.id === selectedHazardId) || filteredHazards[0] || HAZARDS_DATA[0];
  }, [selectedHazardId, filteredHazards]);

  if (!isOpen) return null;

  const getSeverityBadge = (severity: HazardSeverity) => {
    switch (severity) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">Critical</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">High Risk</span>;
      case 'moderate':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">Moderate</span>;
      case 'low':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Low Risk</span>;
    }
  };

  const getCategoryIcon = (category: HazardCategory) => {
    switch (category) {
      case 'chemical':
        return <AlertTriangle className="w-4 h-4 text-cyan-400" />;
      case 'fire_emergency':
        return <Flame className="w-4 h-4 text-red-400" />;
      case 'lab_safety':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-6xl h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">Interactive Hazard Center</h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                  {HAZARDS_DATA.length} Scenarios
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Explore laboratory hazards across Chemical, Fire/Emergency, and Safety protocols. Launch step-by-step guided resolution drills.
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

        {/* Filter & Search Bar */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              All Scenarios ({HAZARDS_DATA.length})
            </button>
            <button
              onClick={() => setSelectedCategory('chemical')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === 'chemical'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Chemical Hazards (13)</span>
            </button>
            <button
              onClick={() => setSelectedCategory('fire_emergency')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === 'fire_emergency'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>Fire & Emergency (7)</span>
            </button>
            <button
              onClick={() => setSelectedCategory('lab_safety')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === 'lab_safety'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lab Safety (9)</span>
            </button>
          </div>

          {/* Search Input & Severity Filter */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hazards, reagents, SDS..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Searchable List */}
          <div className="w-full md:w-5/12 lg:w-4/12 border-r border-slate-800 overflow-y-auto p-3 space-y-2 shrink-0">
            {filteredHazards.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs space-y-2">
                <AlertOctagon className="w-8 h-8 mx-auto text-slate-500" />
                <div>No hazards matched "{searchQuery}"</div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedSeverity('all');
                  }}
                  className="text-cyan-400 underline font-semibold text-xs"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredHazards.map((item) => {
                const isSelected = item.id === selectedHazard.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedHazardId(item.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-500/80 shadow-md ring-1 ring-cyan-500/30'
                        : 'bg-slate-950/40 hover:bg-slate-800/50 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {getCategoryIcon(item.category)}
                        <span className="text-xs font-bold text-white line-clamp-1">{item.title}</span>
                      </div>
                      {getSeverityBadge(item.severity)}
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {item.shortDescription}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{item.estimatedDuration}</span>
                      </span>
                      <span className="text-cyan-400 font-medium flex items-center gap-0.5">
                        <span>{item.steps.length} Steps</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed Scenario Inspector & Action Launcher */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-950/50">
            {selectedHazard ? (
              <>
                {/* Header Banner */}
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(selectedHazard.category)}
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {selectedHazard.category === 'chemical' ? 'Chemical Hazard' : selectedHazard.category === 'fire_emergency' ? 'Fire & Emergency Hazard' : 'Lab Safety Hazard'}
                      </span>
                      {getSeverityBadge(selectedHazard.severity)}
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-tight">{selectedHazard.title}</h2>
                    <p className="text-xs text-slate-300 leading-relaxed">{selectedHazard.fullDescription}</p>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onStartTraining(selectedHazard);
                        onClose();
                      }}
                      className="px-5 py-2.5 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Start Guided Training Drill</span>
                    </button>
                  </div>
                </div>

                {/* Immediate Risks & Symptoms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl space-y-2">
                    <h3 className="text-xs font-bold text-red-300 flex items-center gap-1.5 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span>Immediate Risks & Dangers</span>
                    </h3>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedHazard.immediateRisks.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-400 text-sm leading-none">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-xl space-y-2">
                    <h3 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
                      <Info className="w-4 h-4 text-cyan-400" />
                      <span>Warning Signs & Symptoms</span>
                    </h3>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedHazard.symptomsOrIndicators.map((sym, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 text-sm leading-none">•</span>
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Unsafe Actions Warning Callout */}
                <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <AlertOctagon className="w-4 h-4 text-amber-400" />
                    <span>Critical Unsafe Actions to AVOID</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-200/90">
                    {selectedHazard.unsafeActionsToAvoid.map((bad, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-amber-900/20 p-2 rounded-lg border border-amber-800/40">
                        <span className="font-bold text-amber-400">✕</span>
                        <span>{bad}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required PPE & Emergency Tools */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Mandatory PPE Required</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedHazard.requiredPPE.map((ppe, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs font-medium"
                        >
                          {ppe}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Required Tools & Equipment</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedHazard.requiredTools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 text-xs font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Resolution Protocol Breakdown */}
                <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Standard Operating Procedure (SOP) Resolution Steps</span>
                    </h3>
                    <span className="text-xs text-slate-400">{selectedHazard.steps.length} sequential steps</span>
                  </div>

                  <div className="space-y-3">
                    {selectedHazard.steps.map((st, index) => (
                      <div
                        key={st.id}
                        className="p-3.5 bg-slate-950 border border-slate-800/90 rounded-xl flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-xs font-bold text-white">{st.title}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed pl-7">
                          {st.instruction}
                        </p>

                        <div className="pl-7 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-slate-400">
                            <span className="font-semibold text-cyan-300">Why it matters: </span>
                            <span>{st.whyItMatters}</span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-slate-400">
                            <span className="font-semibold text-amber-300">Avoid: </span>
                            <span>{st.unsafeActionToAvoid}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    OSHA HazCom 1910.1200 & ANSI Safety Standard Grounded
                  </div>
                  <button
                    onClick={() => {
                      onStartTraining(selectedHazard);
                      onClose();
                    }}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Launch Guided Training in Lab</span>
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
