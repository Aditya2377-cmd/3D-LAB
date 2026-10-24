import React from 'react';
import { X, ShieldAlert, Flame, BookOpen, AlertOctagon, Glasses, Compass, Hand, Play } from 'lucide-react';
import { INITIAL_EQUIPMENT } from '../../data/labData';

interface SafetyGuidesModalProps {
  type: 'sds' | 'pass' | 'ppe' | 'scenarios' | 'vr_guide' | null;
  vrNotice?: { type: 'unsupported' | 'no_device' | 'error' | 'ready'; message: string } | null;
  onClose: () => void;
  onSelectEquipmentSDS: (id: string) => void;
  onSelectScenario: (id: string) => void;
  onEnterVR?: () => void;
}

export const SafetyGuidesModal: React.FC<SafetyGuidesModalProps> = ({
  type,
  vrNotice,
  onClose,
  onSelectEquipmentSDS,
  onSelectScenario,
  onEnterVR
}) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 z-10">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            {type === 'sds' && (
              <>
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Chemistry Safety Data Sheets (SDS) Directory</span>
              </>
            )}
            {type === 'pass' && (
              <>
                <Flame className="w-5 h-5 text-red-400" />
                <span>P.A.S.S. Fire Extinguisher Operating Protocol</span>
              </>
            )}
            {type === 'ppe' && (
              <>
                <ShieldAlert className="w-5 h-5 text-emerald-400" />
                <span>Mandatory Personal Protective Equipment (PPE) Guidelines</span>
              </>
            )}
            {type === 'scenarios' && (
              <>
                <AlertOctagon className="w-5 h-5 text-amber-400" />
                <span>Emergency Scenario Drills</span>
              </>
            )}
            {type === 'vr_guide' && (
              <>
                <Glasses className="w-5 h-5 text-cyan-400" />
                <span>Virtual Reality (VR) & 6-DoF Controller Guide</span>
              </>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-sm text-slate-300 space-y-4">
          {type === 'vr_guide' && (
            <div className="space-y-4">
              {/* WebXR Live Device Check Banner */}
              {vrNotice ? (
                <div
                  className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                    vrNotice.type === 'ready'
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                      : vrNotice.type === 'no_device'
                      ? 'bg-amber-950/60 border-amber-500/50 text-amber-200'
                      : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                  }`}
                >
                  <AlertOctagon className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <div className="font-bold">
                      {vrNotice.type === 'ready'
                        ? 'WebXR Immersive VR Headset Ready'
                        : vrNotice.type === 'no_device'
                        ? 'No Physical Headset Detected'
                        : 'WebXR Browser Check'}
                    </div>
                    <div className="text-[11px] leading-relaxed opacity-90">{vrNotice.message}</div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-lg text-xs text-cyan-200 flex items-center gap-2.5">
                  <Glasses className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    WebXR Immersive Chemistry Laboratory mode active. Point controllers to inspect equipment, or use thumbsticks to walk around.
                  </span>
                </div>
              )}

              <p className="text-slate-300 text-xs leading-relaxed">
                ChemSafe 3D is fully equipped with <strong>@react-three/xr</strong> WebXR support. Put on your Meta Quest, HTC Vive, Apple Vision Pro, or PC VR headset to step directly into the laboratory at 1:1 scale!
              </p>

              {/* Controller Mapping Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                    <Compass className="w-4 h-4" />
                    <span>Left Controller — Walking & Strafing</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside leading-relaxed">
                    <li><strong>Push Forward / Pull Back</strong>: Walk in the horizontal direction the headset faces (ignoring head pitch).</li>
                    <li><strong>Push Left / Right</strong>: Strafe sideways along the lab bench.</li>
                    <li><strong>Hardware Deadzone</strong>: 0.15 threshold stops joystick drift immediately on release.</li>
                    <li><strong>Collision Safe</strong>: Laboratory collision boundaries prevent clipping through benches and walls.</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <Glasses className="w-4 h-4" />
                    <span>Right Controller — Turning & Teleport Arc</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside leading-relaxed">
                    <li><strong>Flick Stick Left / Right</strong>: Snap turns (30° or 45°) with anti-rapid turning latch.</li>
                    <li><strong>Smooth Turn Option</strong>: Continuous angular rotation for experienced VR users.</li>
                    <li><strong>Teleport Arc Mode</strong>: Aim parabolic beam with reticle onto the floor and pull trigger.</li>
                    <li><strong>Both Sticks Clicked</strong>: Instant position reset returning avatar directly to the bench.</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                    <Hand className="w-4 h-4" />
                    <span>Ray Pointer & Index Trigger</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Point your VR controller ray at any lab equipment on the bench (Bunsen burner, acid beaker, eyewash flag, safety goggles) and squeeze the <strong>Index Trigger</strong> to interact, inspect chemical data, or trigger emergency actions.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <BookOpen className="w-4 h-4" />
                    <span>In-VR 3D Console & Comfort</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Look right of the bench for the 3D console. Switch between <strong>Safety Mission</strong> and <strong>Locomotion & Comfort</strong> tabs to toggle speeds, snap angles, and anti-nausea dynamic motion tunneling.
                  </p>
                </div>
              </div>

              {/* Hardware & Browser Support */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1.5">
                <div className="font-semibold text-slate-300">Supported VR Headsets & 6-DoF Controllers:</div>
                <div className="text-slate-400 leading-relaxed">
                  • <strong>Meta Quest 2 / 3 / 3S / Pro</strong>: Open via native Meta Quest Browser.<br />
                  • <strong>PC VR (SteamVR / Valve Index / HTC Vive)</strong>: Chrome or Edge with WebXR enabled.<br />
                  • <strong>Apple Vision Pro</strong>: Safari with WebXR flags.<br />
                  • <strong>Desktop Testing</strong>: Install the free <em>WebXR API Emulator</em> extension in Chrome to simulate VR headsets and dual 6-DoF controllers on your PC!
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    import('../../xr/vrLocomotionStore').then((m) => m.triggerResetVRPlayerOrigin());
                  }}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span>⟲ Reset Avatar Position to Bench</span>
                </button>

                {onEnterVR && (
                  <button
                    onClick={() => {
                      onEnterVR();
                      onClose();
                    }}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Play className="w-4 h-4" />
                    <span>Launch WebXR Session Now</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {type === 'sds' && (
            <div className="space-y-3">
              <p className="text-slate-400 text-xs">
                OSHA HazCom standard requires Safety Data Sheets for all reagents. Select a chemical or equipment to inspect its 16-section summary:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {INITIAL_EQUIPMENT.filter((e) => e.sds).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectEquipmentSDS(item.id);
                      onClose();
                    }}
                    className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 rounded-lg text-left transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{item.name}</div>
                      <div className="text-[11px] text-slate-400 mt-1 font-mono-data">
                        {item.sds?.chemicalName}
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[10px]">
                      <span className="text-cyan-400">View NFPA & First Aid →</span>
                      <span
                        className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                          item.sds?.signalWord === 'DANGER'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {item.sds?.signalWord}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {type === 'pass' && (
            <div className="space-y-4">
              <p className="text-slate-300 text-xs leading-relaxed">
                When responding to a bench fire with a portable CO₂ or dry chemical fire extinguisher, memorize and strictly follow the 4-step <strong>P.A.S.S.</strong> sequence:
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-slate-800/60 border border-slate-700/80 rounded-lg">
                  <div className="font-bold text-red-400 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-red-600/30 flex items-center justify-center font-mono-data text-xs">P</span>
                    <span>PULL the Safety Pin</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Twist and pull the metal pin through the plastic tamper seal. This unlocks the squeeze operating lever.
                  </p>
                </div>
                <div className="p-3 bg-slate-800/60 border border-slate-700/80 rounded-lg">
                  <div className="font-bold text-red-400 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-red-600/30 flex items-center justify-center font-mono-data text-xs">A</span>
                    <span>AIM at the BASE of the Fire</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Do NOT aim into the flames or smoke overhead. Point the discharge horn nozzle directly at the burning fuel bed on the benchtop.
                  </p>
                </div>
                <div className="p-3 bg-slate-800/60 border border-slate-700/80 rounded-lg">
                  <div className="font-bold text-red-400 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-red-600/30 flex items-center justify-center font-mono-data text-xs">S</span>
                    <span>SQUEEZE the Operating Lever</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Depress the handle steadily to discharge the pressurized agent. Stand 2 to 3 meters (6-8 feet) away.
                  </p>
                </div>
                <div className="p-3 bg-slate-800/60 border border-slate-700/80 rounded-lg">
                  <div className="font-bold text-red-400 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-red-600/30 flex items-center justify-center font-mono-data text-xs">S</span>
                    <span>SWEEP from Side to Side</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Move the nozzle horizontally across the width of the burning material until all embers and fuel are completely smothered.
                  </p>
                </div>
              </div>
            </div>
          )}

          {type === 'ppe' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg space-y-1">
                <div className="font-bold text-cyan-400 text-xs">1. Eye Protection (ANSI Z87.1 D3 Splash Goggles)</div>
                <p className="text-xs text-slate-300">
                  Must provide complete orbital eye seal with indirect ventilation hoods. Standard spectacles leave top and side gaps vulnerable to splashes.
                </p>
              </div>
              <div className="p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg space-y-1">
                <div className="font-bold text-emerald-400 text-xs">2. Chemical-Resistant Nitrile Gloves (6-8 mil)</div>
                <p className="text-xs text-slate-300">
                  Provides broad hydrocarbon, oil, and mineral acid resistance. Always inspect for pinholes before donning. Discard immediately if contaminated.
                </p>
              </div>
              <div className="p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg space-y-1">
                <div className="font-bold text-amber-400 text-xs">3. 100% Cotton Flame-Resistant Lab Coat</div>
                <p className="text-xs text-slate-300">
                  Synthetic polyester or nylon fabrics melt directly into skin when exposed to flash flames. Knee-length snap closures allow instant stripping under emergency shower.
                </p>
              </div>
              <div className="p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg space-y-1">
                <div className="font-bold text-slate-300 text-xs">4. Closed-Toe Leather Footwear</div>
                <p className="text-xs text-slate-300">
                  Canvas shoes, sandals, and mesh sneakers absorb spilled corrosive acids instantly.
                </p>
              </div>
            </div>
          )}

          {type === 'scenarios' && (
            <div className="space-y-3">
              <p className="text-slate-400 text-xs">
                Select an interactive simulation scenario to practice handling lab accidents in real-time 3D:
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onSelectScenario('burner_fire');
                    onClose();
                  }}
                  className="w-full p-3 bg-red-950/40 hover:bg-red-950/70 border border-red-500/40 rounded-lg text-left transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-red-300 text-xs">Tipped Bunsen Burner Flash Fire</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Practice PASS fire extinguisher deployment and gas isolation.
                    </div>
                  </div>
                  <span className="text-red-400 text-xs font-semibold">Start Drill →</span>
                </button>

                <button
                  onClick={() => {
                    onSelectScenario('acid_spill');
                    onClose();
                  }}
                  className="w-full p-3 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-500/40 rounded-lg text-left transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-amber-300 text-xs">Concentrated Acid Spill Containment</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Verify PPE, apply sodium bicarbonate buffer, and absorb hazardous slurry.
                    </div>
                  </div>
                  <span className="text-amber-400 text-xs font-semibold">Start Drill →</span>
                </button>

                <button
                  onClick={() => {
                    onSelectScenario('eye_splash');
                    onClose();
                  }}
                  className="w-full p-3 bg-blue-950/40 hover:bg-blue-950/70 border border-blue-500/40 rounded-lg text-left transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-blue-300 text-xs">Corrosive Splash to Eyes Emergency</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Rush to eyewash station and execute the mandatory 15-minute flush.
                    </div>
                  </div>
                  <span className="text-blue-400 text-xs font-semibold">Start Drill →</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
