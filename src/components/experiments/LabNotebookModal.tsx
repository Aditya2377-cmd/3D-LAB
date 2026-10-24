import React, { useState } from 'react';
import {
  X,
  BookOpen,
  LineChart,
  Table,
  HelpCircle,
  Download,
  Trash2,
  CheckCircle2,
  XCircle,
  FileText,
  Award,
  Sparkles
} from 'lucide-react';
import { ExperimentItem, ExperimentLiveState, ExperimentDataPoint } from '../../types';

interface LabNotebookModalProps {
  isOpen: boolean;
  experiment: ExperimentItem;
  liveState: ExperimentLiveState;
  onClose: () => void;
  onAddNote: (note: string) => void;
  onClearData: () => void;
  onAnswerQuiz: (questionId: string, optionIndex: number) => void;
}

export const LabNotebookModal: React.FC<LabNotebookModalProps> = ({
  isOpen,
  experiment,
  liveState,
  onClose,
  onAddNote,
  onClearData,
  onAnswerQuiz
}) => {
  const [activeTab, setActiveTab] = useState<'graph' | 'table' | 'notes' | 'quiz'>('graph');
  const [newNoteText, setNewNoteText] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!isOpen) return null;

  const { dataPoints, notebookNotes, quizAnswers } = liveState;
  const { graphConfig, quiz } = experiment;

  // Compute graph bounds for SVG rendering
  const minX = dataPoints.length > 0 ? Math.min(...dataPoints.map((p) => p.x)) : 0;
  const maxX = dataPoints.length > 0 ? Math.max(...dataPoints.map((p) => p.x)) : 10;
  const minY = dataPoints.length > 0 ? Math.min(...dataPoints.map((p) => p.y)) : 0;
  const maxY = dataPoints.length > 0 ? Math.max(...dataPoints.map((p) => p.y)) : 14;

  const padding = 40;
  const svgWidth = 600;
  const svgHeight = 280;
  const plotWidth = svgWidth - padding * 2;
  const plotHeight = svgHeight - padding * 2;

  const scaleX = (x: number) => {
    const range = Math.max(1e-4, maxX - minX);
    return padding + ((x - minX) / range) * plotWidth;
  };

  const scaleY = (y: number) => {
    const range = Math.max(1e-4, maxY - minY);
    return svgHeight - padding - ((y - minY) / range) * plotHeight;
  };

  // Generate SVG path for points
  const sortedPoints = [...dataPoints].sort((a, b) => a.x - b.x);
  const pathD = sortedPoints.reduce((acc, point, index) => {
    const px = scaleX(point.x);
    const py = scaleY(point.y);
    return index === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
  }, '');

  // Calculate Quiz Score
  const calculateScore = () => {
    let score = 0;
    quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) score += 1;
    });
    return score;
  };

  // Export report as downloadable text
  const handleExportReport = () => {
    const reportLines = [
      `=====================================================`,
      `CHEMSAFE 3D - VIRTUAL LABORATORY EXPERIMENT REPORT`,
      `=====================================================`,
      `Title: ${experiment.title}`,
      `Category: ${experiment.category} Chemistry`,
      `Difficulty: ${experiment.difficulty}`,
      `Date: ${new Date().toLocaleString()}`,
      ``,
      `SCIENTIFIC PRINCIPLE:`,
      `${experiment.principle}`,
      experiment.equation ? `Equation: ${experiment.equation}` : ``,
      ``,
      `RECORDED DATA TRIALS (${dataPoints.length} points):`,
      `-----------------------------------------------------`,
      `Trial\t${graphConfig.xLabel} (${graphConfig.xUnit})\t${graphConfig.yLabel} (${graphConfig.yUnit})\tTimestamp`,
      ...dataPoints.map(
        (p, i) => `${i + 1}\t${p.x}\t${p.y}\t${p.timestamp || 'N/A'}`
      ),
      ``,
      `STUDENT OBSERVATIONS & NOTES:`,
      `-----------------------------------------------------`,
      ...notebookNotes.map((n, i) => `[Note ${i + 1}]: ${n}`),
      ``,
      `QUIZ RESULTS: ${calculateScore()} / ${quiz.length} Correct`,
      `=====================================================`
    ].join('\n');

    const blob = new Blob([reportLines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ChemSafe_Lab_Report_${experiment.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200 select-none">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl h-[88vh] shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">Virtual Lab Notebook</h2>
                <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 font-medium">
                  {experiment.title}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live plotting, recorded measurements table, student notes, and post-experiment understanding assessment.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportReport}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveTab('graph')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'graph'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>Real-Time Graph ({dataPoints.length} Points)</span>
            </button>

            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'table'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Data Trials Table</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'notes'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Observations ({notebookNotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Concept Quiz ({quiz.length} Questions)</span>
            </button>
          </div>

          {dataPoints.length > 0 && (
            <button
              onClick={onClearData}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Trials</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB 1: REAL-TIME GRAPH */}
          {activeTab === 'graph' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <LineChart className="w-4 h-4 text-cyan-400" />
                    <span>Experimental Plot: {graphConfig.yLabel} vs {graphConfig.xLabel}</span>
                  </div>
                  <span className="text-[11px] font-mono-data text-slate-400">
                    X: [{minX.toFixed(1)} to {maxX.toFixed(1)} {graphConfig.xUnit}] · Y: [{minY.toFixed(1)} to {maxY.toFixed(1)} {graphConfig.yUnit}]
                  </span>
                </div>

                {dataPoints.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-xs gap-2">
                    <LineChart className="w-10 h-10 text-slate-600 stroke-1" />
                    <div>No data points logged yet!</div>
                    <div className="text-[11px] text-slate-400">
                      Use the workbench controls and click <strong>"Log Reading"</strong> to plot real experimental data.
                    </div>
                  </div>
                ) : (
                  <div className="w-full overflow-x-auto flex justify-center">
                    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-2xl h-auto">
                      {/* Grid lines */}
                      <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#334155" strokeWidth="1" />
                      <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#334155" strokeWidth="1" />

                      {/* X and Y Axis Labels */}
                      <text x={svgWidth / 2} y={svgHeight - 8} fill="#94a3b8" fontSize="11" textAnchor="middle">
                        {graphConfig.xLabel} ({graphConfig.xUnit})
                      </text>
                      <text x={12} y={svgHeight / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" transform={`rotate(-90 12 ${svgHeight / 2})`}>
                        {graphConfig.yLabel} ({graphConfig.yUnit})
                      </text>

                      {/* Line Connecting Points */}
                      {sortedPoints.length > 1 && (
                        <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      )}

                      {/* Individual Data Points */}
                      {sortedPoints.map((point, idx) => {
                        const cx = scaleX(point.x);
                        const cy = scaleY(point.y);
                        return (
                          <g key={idx}>
                            <circle cx={cx} cy={cy} r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
                            <text x={cx} y={cy - 9} fill="#e2e8f0" fontSize="9" textAnchor="middle" className="font-mono-data">
                              ({point.x.toFixed(1)}, {point.y.toFixed(2)})
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                )}
              </div>

              {/* Principle & Analysis Guide */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5 text-xs text-slate-300">
                <span className="font-bold text-cyan-400">Theoretical Model Reference:</span>
                <p className="leading-relaxed text-slate-300">
                  {experiment.principle}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: DATA TRIALS TABLE */}
          {activeTab === 'table' && (
            <div className="space-y-4">
              {dataPoints.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs space-y-2">
                  <Table className="w-8 h-8 mx-auto text-slate-600" />
                  <div>No trial records logged.</div>
                </div>
              ) : (
                <div className="border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 text-[11px] font-semibold uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-3">Trial #</th>
                        <th className="p-3">{graphConfig.xLabel} ({graphConfig.xUnit})</th>
                        <th className="p-3">{graphConfig.yLabel} ({graphConfig.yUnit})</th>
                        <th className="p-3">Recorded Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
                      {dataPoints.map((dp, i) => (
                        <tr key={i} className="hover:bg-slate-800/40 font-mono-data">
                          <td className="p-3 font-bold text-cyan-400">#{i + 1}</td>
                          <td className="p-3 text-white">{dp.x.toFixed(3)}</td>
                          <td className="p-3 text-emerald-300">{dp.y.toFixed(3)}</td>
                          <td className="p-3 text-slate-500 text-[10px]">{dp.timestamp || 'Just now'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: OBSERVATIONS & NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              {/* Note input box */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <label className="text-xs font-bold text-white">Add Lab Observation Entry:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newNoteText.trim()) {
                        onAddNote(newNoteText.trim());
                        setNewNoteText('');
                      }
                    }}
                    placeholder="e.g., Color turned faint permanent pink at 24.8 mL titrant..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => {
                      if (newNoteText.trim()) {
                        onAddNote(newNoteText.trim());
                        setNewNoteText('');
                      }
                    }}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold"
                  >
                    Save Note
                  </button>
                </div>
              </div>

              {/* Notes list */}
              <div className="space-y-2">
                {notebookNotes.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    No student notes recorded yet. Type an observation above to record into your final lab report!
                  </div>
                ) : (
                  notebookNotes.map((note, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-300 flex items-center justify-center font-mono-data text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-slate-200 leading-relaxed">{note}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CONCEPT UNDERSTANDING QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="p-4 bg-cyan-950/30 border border-cyan-800/40 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">Post-Experiment Comprehension Quiz</h3>
                  <p className="text-[11px] text-slate-300">Test your mastery of the scientific principles explored in this experiment.</p>
                </div>
                {quizSubmitted && (
                  <div className="px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold text-xs">
                    Score: {calculateScore()} / {quiz.length} Correct
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {quiz.map((q, qIndex) => {
                  const userAnswer = quizAnswers[q.id];
                  const isCorrect = userAnswer === q.correctIndex;

                  return (
                    <div key={q.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {qIndex + 1}
                        </span>
                        <div className="text-xs font-bold text-white leading-relaxed">{q.question}</div>
                      </div>

                      <div className="space-y-2 pl-7">
                        {q.options.map((option, optIdx) => {
                          const isSelected = userAnswer === optIdx;
                          let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80';

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                            }
                          } else if (isSelected) {
                            btnStyle = 'bg-cyan-950 border-cyan-500 text-cyan-200 font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => onAnswerQuiz(q.id, optIdx)}
                              className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{option}</span>
                              {quizSubmitted && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                              {quizSubmitted && isSelected && !isCorrect && (
                                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box after submit */}
                      {quizSubmitted && (
                        <div className="pl-7 pt-1">
                          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                            <span className="font-semibold text-cyan-300">Explanation: </span>
                            <span>{q.explanation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setQuizSubmitted(true)}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
                >
                  Submit & Check Answers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
