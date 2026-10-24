import React, { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  EquipmentItem,
  QualityMode,
  CameraMode,
  CameraPreset,
  InventoryItem,
  SafetyScenario,
  HazardItem,
  HazardStep,
  ExperimentItem,
  ExperimentLiveState,
  ExperimentDataPoint
} from './types';
import { INITIAL_EQUIPMENT, SAFETY_SCENARIOS } from './data/labData';
import { HAZARDS_DATA } from './data/hazardsData';
import { EXPERIMENTS_DATA } from './data/experimentsData';
import {
  calculateTitrationPH,
  calculateWeakAcidPH,
  getIndicatorColor,
  calculateAbsorbance,
  calculateGasPressure,
  calculateCobaltEquilibrium,
  calculateCalorimetry,
  calculateCellVoltage,
  calculateDilution
} from './utils/chemistryEngine';
import { sound } from './utils/audio';
import { xrStore } from './xr/xrStore';
import { LabScene } from './components/3d/LabScene';
import { TopNav } from './components/ui/TopNav';
import { BottomControlDock } from './components/ui/BottomControlDock';
import { ItemInspectModal } from './components/ui/ItemInspectModal';
import { InventoryBar } from './components/ui/InventoryBar';
import { ScenarioMissionHUD } from './components/ui/ScenarioMissionHUD';
import { SafetyGuidesModal } from './components/ui/SafetyGuidesModal';
import { HazardCenterModal } from './components/hazards/HazardCenterModal';
import { HazardGuidedHUD } from './components/hazards/HazardGuidedHUD';
import { ExperimentLibraryModal } from './components/experiments/ExperimentLibraryModal';
import { ExperimentWorkbenchHUD } from './components/experiments/ExperimentWorkbenchHUD';
import { LabNotebookModal } from './components/experiments/LabNotebookModal';

// Detect software WebGL per Three.js directives
const isSoftwareGl = (() => {
  if (typeof document === 'undefined') return false;
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
})();

export default function App() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [quality, setQuality] = useState<QualityMode>(isSoftwareGl ? 'low' : 'high');
  const [cameraMode, setCameraMode] = useState<CameraMode>('orbit');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset | null>('bench');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // WebXR Session State
  const [isVRActive, setIsVRActive] = useState<boolean>(false);

  useEffect(() => {
    return xrStore.subscribe((state) => {
      setIsVRActive(state.session != null);
    });
  }, []);

  // Active Emergency Scenario (Traditional 3 Scenarios)
  const [activeScenarioId, setActiveScenarioId] = useState<string>('free_exploration');
  const [currentScenario, setCurrentScenario] = useState<SafetyScenario>(SAFETY_SCENARIOS[0]);

  // Inventory & PPE State
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [equippedPPE, setEquippedPPE] = useState({
    goggles: false,
    gloves: false,
    labCoat: true
  });

  // Action status variables for emergency drills
  const [pinPulled, setPinPulled] = useState(false);
  const [isExtinguishing, setIsExtinguishing] = useState(false);
  const [gasShut, setGasShut] = useState(false);
  const [neutralizerApplied, setNeutralizerApplied] = useState(false);
  const [residueAbsorbed, setResidueAbsorbed] = useState(false);
  const [isEyewashActive, setIsEyewashActive] = useState(false);

  // Modals & Navigation States
  const [guideModalType, setGuideModalType] = useState<
    'sds' | 'pass' | 'ppe' | 'scenarios' | 'vr_guide' | null
  >(null);
  const [vrNotice, setVrNotice] = useState<{
    type: 'unsupported' | 'no_device' | 'error' | 'ready';
    message: string;
  } | null>(null);

  // ============================================
  // FEATURE 1: HAZARD CENTER & GUIDED RESOLUTION
  // ============================================
  const [isHazardCenterOpen, setIsHazardCenterOpen] = useState(false);
  const [activeHazard, setActiveHazard] = useState<HazardItem | null>(null);
  const [activeHazardSteps, setActiveHazardSteps] = useState<HazardStep[]>([]);
  const [activeHazardStepIndex, setActiveHazardStepIndex] = useState<number>(0);

  // ===============================================
  // FEATURE 2: VIRTUAL EXPERIMENT SIMULATOR ENGINE
  // ===============================================
  const [isExperimentsOpen, setIsExperimentsOpen] = useState(false);
  const [activeExperiment, setActiveExperiment] = useState<ExperimentItem | null>(null);
  const [experimentLiveState, setExperimentLiveState] = useState<ExperimentLiveState | null>(null);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);

  // Calculate dynamic experiment readings from mathematical engine
  const calculateExperimentReadings = useCallback(
    (exp: ExperimentItem, currentParams: Record<string, number>) => {
      let pH = 7.0;
      let temp = 22.0;
      let volume = 50.0;
      let mass = 15.0;
      let pressure = 101.3;
      let absorbance = 0.05;
      let color = 'rgba(235, 248, 255, 0.4)';
      let opacity = 0.75;
      let isBubbling = false;
      let isBoiling = false;
      let precipitate = false;

      switch (exp.id) {
        case 'exp_ph_indicators': {
          pH = currentParams.pH ?? 7.0;
          const indicatorIdx = Math.round(currentParams.indicatorIndex ?? 0);
          const indType =
            indicatorIdx === 0
              ? 'phenolphthalein'
              : indicatorIdx === 1
              ? 'bromothymol'
              : indicatorIdx === 2
              ? 'methyl_orange'
              : 'universal';
          color = getIndicatorColor(indType, pH);
          absorbance = Number((Math.abs(pH - 7) * 0.15 + 0.1).toFixed(2));
          break;
        }

        case 'exp_strong_weak_ph': {
          const acidType = Math.round(currentParams.acidType ?? 0);
          const conc = currentParams.concentration ?? 0.1;
          pH = acidType === 0 ? Number((-Math.log10(conc)).toFixed(2)) : calculateWeakAcidPH(25, conc, 0, 0.1);
          color = getIndicatorColor('universal', pH);
          break;
        }

        case 'exp_neutralization': {
          const vBase = currentParams.volumeBase ?? 25.0;
          pH = calculateTitrationPH(25.0, 1.0, vBase, 1.0);
          temp = 21.0 + (Math.min(vBase, 25.0) / 25.0) * 6.7;
          color = getIndicatorColor('universal', pH);
          isBubbling = vBase > 0 && vBase < 30;
          break;
        }

        case 'exp_acid_base_titration': {
          const vTitrant = currentParams.titrantVolumeML ?? 0.0;
          pH = calculateTitrationPH(25.0, 0.1, vTitrant, 0.1);
          color = getIndicatorColor('phenolphthalein', pH);
          volume = 25.0 + vTitrant;
          break;
        }

        case 'exp_le_chatelier': {
          const tempC = currentParams.temperatureC ?? 22.0;
          const chlorideM = currentParams.chlorideConcM ?? 1.0;
          const eq = calculateCobaltEquilibrium(tempC, chlorideM);
          color = eq.color;
          temp = tempC;
          break;
        }

        case 'exp_beer_lambert': {
          const conc = (currentParams.concentrationMicroM ?? 100) * 1e-6; // M
          const path = currentParams.pathLengthCm ?? 1.0;
          const spec = calculateAbsorbance(2300, conc, path);
          absorbance = spec.absorbance;
          opacity = Math.min(0.95, Math.max(0.2, absorbance * 0.8));
          color = `rgba(147, 51, 234, ${opacity})`;
          break;
        }

        case 'exp_ideal_gas_laws': {
          const vL = currentParams.volumeLiters ?? 1.0;
          const tC = currentParams.tempC ?? 25.0;
          const moles = currentParams.molesGas ?? 0.04;
          pressure = calculateGasPressure(moles, tC + 273.15, vL);
          temp = tC;
          break;
        }

        case 'exp_reaction_rates_conc': {
          const conc = currentParams.thiosulfateConcM ?? 0.15;
          precipitate = true;
          color = `rgba(250, 204, 21, ${Math.min(0.9, 0.3 + conc * 3)})`;
          break;
        }

        case 'exp_voltaic_cell': {
          const cuM = currentParams.concCuM ?? 1.0;
          const znM = currentParams.concZnM ?? 1.0;
          const hasBridge = Math.round(currentParams.hasSaltBridge ?? 1) === 1;
          const cellV = hasBridge ? calculateCellVoltage(znM, cuM) : 0;
          pressure = cellV * 100; // mapped to voltmeter readout
          color = 'rgba(2, 132, 199, 0.8)';
          break;
        }

        case 'exp_calorimetry_enthalpy': {
          const saltChoice = Math.round(currentParams.soluteChoice ?? 0);
          const massG = currentParams.soluteMassG ?? 5.0;
          temp = saltChoice === 0 ? 21.5 + massG * 3.1 : 21.5 - massG * 1.5;
          color = 'rgba(235, 248, 255, 0.6)';
          break;
        }

        default: {
          color = 'rgba(2, 132, 199, 0.75)';
          break;
        }
      }

      return {
        pH: Number(pH.toFixed(2)),
        temperature: Number(temp.toFixed(1)),
        volume: Number(volume.toFixed(1)),
        mass: Number(mass.toFixed(4)),
        pressure: Number(pressure.toFixed(1)),
        absorbance: Number(absorbance.toFixed(3)),
        color,
        opacity,
        turbidity: precipitate ? 80 : 0,
        isBubbling,
        isBoiling,
        precipitate
      };
    },
    []
  );

  // Active Dynamic Solution Color in 3D Lab
  const activeExperimentLiquidColor = useMemo(() => {
    if (activeExperiment && experimentLiveState) {
      return experimentLiveState.readings.color;
    }
    return undefined;
  }, [activeExperiment, experimentLiveState]);

  const activeExperimentLiquidOpacity = useMemo(() => {
    if (activeExperiment && experimentLiveState) {
      return experimentLiveState.readings.opacity;
    }
    return undefined;
  }, [activeExperiment, experimentLiveState]);

  // Update scenario steps helper
  const markStepComplete = useCallback((actionKey: string) => {
    setCurrentScenario((prev) => {
      let stepJustCompleted = false;
      const updatedSteps = prev.steps.map((step) => {
        if (step.actionRequired === actionKey && !step.isCompleted) {
          stepJustCompleted = true;
          return { ...step, isCompleted: true };
        }
        return step;
      });

      if (stepJustCompleted) {
        sound.playSuccess();
        const allDone = updatedSteps.every((s) => s.isCompleted);
        if (allDone) {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        }
      }

      return {
        ...prev,
        steps: updatedSteps
      };
    });
  }, []);

  // Scenario loading handler (Traditional 3 Scenarios)
  const loadScenario = useCallback((scenarioId: string) => {
    const target = SAFETY_SCENARIOS.find((s) => s.id === scenarioId);
    if (!target) return;

    setActiveHazard(null);
    setPinPulled(false);
    setIsExtinguishing(false);
    setGasShut(false);
    setNeutralizerApplied(false);
    setResidueAbsorbed(false);
    setIsEyewashActive(false);
    sound.stopAll();

    setCurrentScenario({
      ...target,
      steps: target.steps.map((st) => ({ ...st, isCompleted: false }))
    });
    setActiveScenarioId(scenarioId);

    setEquipment((prev) =>
      prev.map((item) => {
        const nextStatus = target.initialEquipStatus[item.id] || 'normal';
        return {
          ...item,
          status: nextStatus as EquipmentItem['status']
        };
      })
    );

    if (scenarioId === 'burner_fire') {
      sound.playAlarm();
      sound.playClang();
      sound.startContinuousFire('burner_fire');
    } else if (scenarioId === 'acid_spill' || scenarioId === 'eye_splash') {
      sound.playAlarm();
      sound.playClang();
    } else {
      sound.playClick();
    }
  }, []);

  // START GUIDED HAZARD DRILL FROM HAZARD CENTER
  const handleStartHazardTraining = (hazard: HazardItem) => {
    sound.playAlarm();
    sound.playClang();
    setActiveHazard(hazard);
    setActiveHazardSteps(hazard.steps.map((st) => ({ ...st, isCompleted: false })));
    setActiveHazardStepIndex(0);

    // Reset action variables
    setPinPulled(false);
    setIsExtinguishing(false);
    setGasShut(false);
    setNeutralizerApplied(false);
    setResidueAbsorbed(false);
    setIsEyewashActive(false);

    // Set 3D equipment status if specified
    if (hazard.initialEquipStatus) {
      setEquipment((prev) =>
        prev.map((item) => {
          const s = hazard.initialEquipStatus?.[item.id];
          return s ? { ...item, status: s as any } : item;
        })
      );
    } else if (hazard.id === 'contained_fire' || hazard.id === 'burner_left_on') {
      sound.startContinuousFire('burner_fire');
      setEquipment((prev) =>
        prev.map((item) => (item.id === 'bunsen_burner' ? { ...item, status: 'tipped' } : item))
      );
    } else if (hazard.category === 'chemical' && hazard.id.includes('spill')) {
      setEquipment((prev) =>
        prev.map((item) => (item.id === 'beaker_acid' ? { ...item, status: 'spilling' } : item))
      );
    }

    setCameraMode('orbit');
    setCameraPreset('bench');
  };

  // EXECUTE GUIDED HAZARD ACTION
  const handleExecuteHazardAction = (actionKey: string) => {
    sound.playClick();
    handleExecuteAction(actionKey);

    setActiveHazardSteps((prev) => {
      let advanced = false;
      const nextSteps = prev.map((st, idx) => {
        if (st.actionRequired === actionKey && !st.isCompleted) {
          advanced = true;
          return { ...st, isCompleted: true };
        }
        return st;
      });

      if (advanced) {
        sound.playSuccess();
        const nextIncomplete = nextSteps.findIndex((s) => !s.isCompleted);
        if (nextIncomplete !== -1) {
          setActiveHazardStepIndex(nextIncomplete);
        } else {
          // All complete!
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      }

      return nextSteps;
    });
  };

  // START VIRTUAL EXPERIMENT SIMULATION
  const handleStartExperiment = (exp: ExperimentItem) => {
    sound.playSuccess();
    setActiveExperiment(exp);
    const initialParams = { ...exp.defaultParams };
    const initialReadings = calculateExperimentReadings(exp, initialParams);

    setExperimentLiveState({
      experimentId: exp.id,
      params: initialParams,
      readings: initialReadings,
      dataPoints: [],
      notebookNotes: [],
      currentStepIndex: 0,
      quizAnswers: {},
      isCompleted: false
    });

    setCameraMode('orbit');
    setCameraPreset('bench');
  };

  // UPDATE EXPERIMENT PARAMETER
  const handleUpdateExperimentParam = (key: string, value: number) => {
    if (!activeExperiment || !experimentLiveState) return;
    const nextParams = { ...experimentLiveState.params, [key]: value };
    const nextReadings = calculateExperimentReadings(activeExperiment, nextParams);

    setExperimentLiveState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        params: nextParams,
        readings: nextReadings
      };
    });
  };

  // LOG DATA POINT IN VIRTUAL LAB NOTEBOOK
  const handleLogExperimentDataPoint = () => {
    if (!activeExperiment || !experimentLiveState) return;
    sound.playClick();

    let x = 0;
    let y = 0;

    switch (activeExperiment.id) {
      case 'exp_acid_base_titration':
        x = experimentLiveState.params.titrantVolumeML ?? 0;
        y = experimentLiveState.readings.pH;
        break;
      case 'exp_ph_indicators':
        x = experimentLiveState.params.pH ?? 7;
        y = experimentLiveState.readings.absorbance;
        break;
      case 'exp_ideal_gas_laws':
        x = experimentLiveState.params.volumeLiters ?? 1;
        y = experimentLiveState.readings.pressure;
        break;
      case 'exp_beer_lambert':
        x = experimentLiveState.params.concentrationMicroM ?? 100;
        y = experimentLiveState.readings.absorbance;
        break;
      case 'exp_le_chatelier':
        x = experimentLiveState.params.temperatureC ?? 22;
        y = experimentLiveState.readings.temperature;
        break;
      default:
        x = Object.values(experimentLiveState.params)[0] ?? 1;
        y = experimentLiveState.readings.pH;
        break;
    }

    const newPoint: ExperimentDataPoint = {
      x: Number(x.toFixed(3)),
      y: Number(y.toFixed(3)),
      timestamp: new Date().toLocaleTimeString()
    };

    setExperimentLiveState((prev) => {
      if (!prev) return prev;
      const nextPoints = [...prev.dataPoints, newPoint];
      // Advance step if ready
      const nextStepIndex = Math.min(
        activeExperiment.steps.length - 1,
        prev.currentStepIndex + 1
      );
      return {
        ...prev,
        dataPoints: nextPoints,
        currentStepIndex: nextStepIndex
      };
    });
  };

  // ADD OBSERVATION NOTE
  const handleAddNotebookNote = (note: string) => {
    sound.playClick();
    setExperimentLiveState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        notebookNotes: [...prev.notebookNotes, note]
      };
    });
  };

  // RECORD QUIZ ANSWER
  const handleAnswerQuiz = (questionId: string, optionIndex: number) => {
    sound.playClick();
    setExperimentLiveState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        quizAnswers: { ...prev.quizAnswers, [questionId]: optionIndex }
      };
    });
  };

  // Pick up equipment item
  const handlePickUp = (item: EquipmentItem) => {
    sound.playPickUp();
    if (item.id === 'safety_goggles') {
      setEquippedPPE((prev) => ({ ...prev, goggles: true }));
      markStepComplete('equip_goggles');
    } else if (item.id === 'nitrile_gloves') {
      setEquippedPPE((prev) => ({ ...prev, gloves: true }));
      markStepComplete('equip_gloves');
    } else if (item.id === 'lab_coat_peg') {
      setEquippedPPE((prev) => ({ ...prev, labCoat: true }));
      markStepComplete('equip_lab_coat');
    } else {
      if (!inventory.some((inv) => inv.id === item.id)) {
        setInventory((prev) => [
          ...prev,
          {
            id: item.id,
            name: item.name,
            category: 'emergency_tool',
            icon: item.inventoryIcon || 'Package'
          }
        ]);
      }
      if (item.id === 'fire_extinguisher') markStepComplete('equip_extinguisher');
      else if (item.id === 'spill_kit') markStepComplete('equip_spill_kit');
      else if (item.id === 'fire_blanket') markStepComplete('deploy_blanket');
    }
    setSelectedId(null);
  };

  // Toggle PPE directly from inventory bar or VR
  const handleTogglePPE = (key: 'goggles' | 'gloves' | 'labCoat') => {
    sound.playClick();
    setEquippedPPE((prev) => {
      const nextVal = !prev[key];
      const updated = { ...prev, [key]: nextVal };
      if (nextVal) {
        if (key === 'goggles') markStepComplete('equip_goggles');
        if (key === 'gloves') markStepComplete('equip_gloves');
        if (key === 'labCoat') markStepComplete('equip_lab_coat');
        if (updated.goggles && updated.gloves) markStepComplete('verify_ppe');
      }
      return updated;
    });
  };

  // Deploy item from inventory
  const handleUseInventoryItem = (item: InventoryItem) => {
    sound.playClick();
    if (item.id === 'fire_extinguisher') {
      markStepComplete('equip_extinguisher');
      handleExecuteAction('pull_pin');
    } else if (item.id === 'spill_kit') {
      markStepComplete('equip_spill_kit');
      handleExecuteAction('apply_neutralizer');
    } else if (item.id === 'fire_blanket') {
      handleExecuteAction('deploy_blanket');
    }
  };

  // Execute interactive emergency drill actions
  const handleExecuteAction = (actionKey: string) => {
    if (actionKey === 'pull_pin') {
      sound.playClick();
      setPinPulled(true);
      markStepComplete('pull_pin');
    } else if (actionKey === 'extinguish_fire') {
      sound.playExtinguisherBurst();
      setIsExtinguishing(true);
      markStepComplete('extinguish_fire');
      setTimeout(() => {
        setIsExtinguishing(false);
        sound.stopContinuous('burner_fire');
        setEquipment((prev) =>
          prev.map((e) => (e.id === 'bunsen_burner' ? { ...e, status: 'normal' } : e))
        );
      }, 1600);
    } else if (actionKey === 'shut_gas_valve') {
      sound.playClick();
      setGasShut(true);
      markStepComplete('shut_gas_valve');
    } else if (actionKey === 'apply_neutralizer') {
      sound.playClick();
      setNeutralizerApplied(true);
      markStepComplete('apply_neutralizer');
      setEquipment((prev) =>
        prev.map((e) => (e.id === 'beaker_acid' ? { ...e, status: 'neutralized' } : e))
      );
    } else if (actionKey === 'absorb_slurry') {
      sound.playSuccess();
      setResidueAbsorbed(true);
      markStepComplete('absorb_slurry');
      setEquipment((prev) =>
        prev.map((e) => (e.id === 'beaker_acid' ? { ...e, status: 'normal' } : e))
      );
    } else if (actionKey === 'activate_eyewash_lever') {
      sound.playClick();
      setIsEyewashActive(true);
      markStepComplete('navigate_eyewash');
      markStepComplete('activate_eyewash_lever');
      setTimeout(() => {
        markStepComplete('perform_15m_rinse');
      }, 2500);
    } else if (actionKey === 'tip_burner') {
      loadScenario('burner_fire');
    } else if (actionKey === 'spill_acid') {
      loadScenario('acid_spill');
    } else if (actionKey === 'toggle_eyewash') {
      setIsEyewashActive(!isEyewashActive);
      sound.playClick();
    } else if (actionKey === 'equip_lab_coat') {
      sound.playPickUp();
      setEquippedPPE((prev) => ({ ...prev, labCoat: true }));
      markStepComplete('equip_lab_coat');
    } else if (actionKey === 'deploy_blanket') {
      sound.playPickUp();
      markStepComplete('deploy_blanket');
    } else if (actionKey === 'invert_mix') {
      sound.playSuccess();
      markStepComplete('invert_mix');
    } else if (actionKey === 'adjust_clamp') {
      sound.playClick();
      markStepComplete('adjust_clamp');
    } else if (actionKey === 'read_meniscus') {
      sound.playClick();
      markStepComplete('read_meniscus');
    } else if (actionKey === 'record_reading') {
      handleLogExperimentDataPoint();
    } else if (actionKey === 'verify_ppe') {
      setEquippedPPE({ goggles: true, gloves: true, labCoat: true });
      sound.playSuccess();
    }
  };

  // Inspect item on click in 3D scene
  const handleObjectClick = (id: string) => {
    sound.playClick();
    setSelectedId(id);
    markStepComplete('inspect_sds');
    if (id === 'eyewash_station') markStepComplete('navigate_eyewash');
  };

  // Reset camera view
  const handleResetView = () => {
    sound.playClick();
    setCameraMode('orbit');
    setCameraPreset('bench');
  };

  // Toggle Sound Mute
  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  // Enter/Exit WebXR Session
  const handleEnterVR = async () => {
    sound.playClick();
    if (isVRActive) {
      try {
        const session = xrStore.getState().session;
        await session?.end();
      } catch (err) {
        console.warn('Error ending VR session:', err);
      }
      return;
    }

    if (typeof navigator === 'undefined' || !navigator.xr) {
      setVrNotice({
        type: 'unsupported',
        message:
          'WebXR is not supported by your current browser. To enter immersive VR, please open this site in Meta Quest Browser on your headset, or in Chrome/Edge on PC with SteamVR or the WebXR API Emulator extension.'
      });
      setGuideModalType('vr_guide');
      return;
    }

    try {
      const isSupported = await navigator.xr.isSessionSupported('immersive-vr');
      if (!isSupported) {
        setVrNotice({
          type: 'no_device',
          message:
            'No immersive VR headset detected on this machine. If using a Meta Quest, make sure Quest Link/AirLink or Meta Quest Browser is active. If on desktop without a headset, install the "WebXR API Emulator" Chrome extension to test simulated 6-DoF controllers.'
        });
        setGuideModalType('vr_guide');
        return;
      }

      setVrNotice({
        type: 'ready',
        message: 'Launching WebXR immersive session. Put on your VR headset now!'
      });
      await xrStore.enterVR();
    } catch (err: any) {
      console.warn('VR session request error:', err);
      setVrNotice({
        type: 'error',
        message:
          err?.message ||
          'Failed to initialize immersive VR session. Please ensure your VR runtime is running and headset permissions are granted.'
      });
      setGuideModalType('vr_guide');
    }
  };

  const selectedItem = equipment.find((e) => e.id === selectedId) || null;

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-slate-950 font-sans select-none">
      {/* 1. Universal Top Navigation Bar */}
      <TopNav
        activeNav={activeExperiment ? 'experiments' : activeHazard ? 'hazards' : 'lab'}
        isVRActive={isVRActive}
        onEnterVR={handleEnterVR}
        onSelectNav={(tab) => {
          if (tab === 'scenarios') setGuideModalType('scenarios');
          if (tab === 'sds') setGuideModalType('sds');
          if (tab === 'pass') setGuideModalType('pass');
          if (tab === 'vr_guide') setGuideModalType('vr_guide');
          if (tab === 'lab') {
            setActiveHazard(null);
            setActiveExperiment(null);
          }
        }}
        onTriggerDrill={() => setIsHazardCenterOpen(true)}
        onOpenHazardCenter={() => setIsHazardCenterOpen(true)}
        onOpenExperiments={() => setIsExperimentsOpen(true)}
      />

      {/* 2. Full Viewport 3D Canvas Scene with WebXR & Dynamic Chemistry Rendering */}
      <div className="flex-1 w-full relative">
        <LabScene
          equipment={equipment}
          quality={quality}
          cameraMode={cameraMode}
          cameraPreset={cameraPreset}
          hoveredId={hoveredId}
          selectedId={selectedId}
          isExtinguishing={isExtinguishing}
          isEyewashActive={isEyewashActive}
          scenario={currentScenario}
          equippedPPE={equippedPPE}
          pinPulled={pinPulled}
          gasShut={gasShut}
          neutralizerApplied={neutralizerApplied}
          residueAbsorbed={residueAbsorbed}
          activeExperimentLiquidColor={activeExperimentLiquidColor}
          activeExperimentLiquidOpacity={activeExperimentLiquidOpacity}
          onHover={setHoveredId}
          onClick={handleObjectClick}
          onExecuteAction={handleExecuteAction}
          onEquipPPE={handleTogglePPE}
          onSelectScenario={loadScenario}
          onPresetTransitionEnd={() => setCameraPreset(null)}
          onPickUp={handlePickUp}
          onExitVR={handleEnterVR}
        />

        {/* 3. Scenario Mission HUD / Hazard Drill HUD (Desktop Only) */}
        {!isVRActive && activeHazard && (
          <HazardGuidedHUD
            hazard={activeHazard}
            currentStepIndex={activeHazardStepIndex}
            steps={activeHazardSteps}
            onExecuteAction={handleExecuteHazardAction}
            onExitHazard={() => setActiveHazard(null)}
            pinPulled={pinPulled}
            isExtinguishing={isExtinguishing}
            gasShut={gasShut}
            neutralizerApplied={neutralizerApplied}
            residueAbsorbed={residueAbsorbed}
            isEyewashActive={isEyewashActive}
          />
        )}

        {!isVRActive && !activeHazard && activeExperiment && experimentLiveState && (
          <ExperimentWorkbenchHUD
            experiment={activeExperiment}
            liveState={experimentLiveState}
            onUpdateParam={handleUpdateExperimentParam}
            onTriggerAction={handleExecuteAction}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onExitExperiment={() => setActiveExperiment(null)}
            onResetExperiment={() => handleStartExperiment(activeExperiment)}
          />
        )}

        {!isVRActive && !activeHazard && !activeExperiment && (
          <ScenarioMissionHUD
            scenario={currentScenario}
            onExecuteAction={handleExecuteAction}
            isExtinguishing={isExtinguishing}
            isEyewashActive={isEyewashActive}
            pinPulled={pinPulled}
            gasShut={gasShut}
            neutralizerApplied={neutralizerApplied}
            residueAbsorbed={residueAbsorbed}
          />
        )}

        {/* 4. Student PPE & Handheld Inventory Bar */}
        {!isVRActive && (
          <InventoryBar
            inventory={inventory}
            equippedPPE={equippedPPE}
            onEquipPPE={handleTogglePPE}
            onUseItem={handleUseInventoryItem}
          />
        )}

        {/* 5. Collapsible Bottom Control Dock */}
        {!isVRActive && (
          <BottomControlDock
            cameraMode={cameraMode}
            quality={quality}
            isMuted={isMuted}
            activeScenarioId={activeScenarioId}
            isVRActive={isVRActive}
            cameraPreset={cameraPreset}
            onSetCameraMode={setCameraMode}
            onSetQuality={setQuality}
            onToggleMute={handleToggleMute}
            onResetView={handleResetView}
            onSelectScenario={loadScenario}
            onSelectPreset={(preset) => {
              setCameraMode('orbit');
              setCameraPreset(preset);
            }}
            onEnterVR={handleEnterVR}
            onOpenHazardCenter={() => setIsHazardCenterOpen(true)}
            onOpenExperiments={() => setIsExperimentsOpen(true)}
          />
        )}
      </div>

      {/* Item Inspect Modal / Safety Data Sheet Sheet */}
      {!isVRActive && (
        <ItemInspectModal
          item={selectedItem}
          onClose={() => setSelectedId(null)}
          onPickUp={handlePickUp}
          onTriggerAction={handleExecuteAction}
        />
      )}

      {/* Educational Guides Modal */}
      <SafetyGuidesModal
        type={guideModalType}
        vrNotice={vrNotice}
        onClose={() => setGuideModalType(null)}
        onSelectEquipmentSDS={(id) => {
          setSelectedId(id);
          markStepComplete('inspect_sds');
        }}
        onSelectScenario={(id) => loadScenario(id)}
        onEnterVR={handleEnterVR}
      />

      {/* FEATURE 1: Comprehensive Hazard Center Library Modal */}
      <HazardCenterModal
        isOpen={isHazardCenterOpen}
        onClose={() => setIsHazardCenterOpen(false)}
        onStartTraining={handleStartHazardTraining}
        onHighlightEquipment={(eqId) => setSelectedId(eqId)}
      />

      {/* FEATURE 2: 35 Virtual Chemistry Experiments Catalog Modal */}
      <ExperimentLibraryModal
        isOpen={isExperimentsOpen}
        onClose={() => setIsExperimentsOpen(false)}
        onSelectExperiment={handleStartExperiment}
      />

      {/* Virtual Lab Notebook Modal with Live SVG Plot, Table, Notes, Quiz */}
      {activeExperiment && experimentLiveState && (
        <LabNotebookModal
          isOpen={isNotebookOpen}
          experiment={activeExperiment}
          liveState={experimentLiveState}
          onClose={() => setIsNotebookOpen(false)}
          onAddNote={handleAddNotebookNote}
          onClearData={() => {
            setExperimentLiveState((prev) => (prev ? { ...prev, dataPoints: [] } : prev));
          }}
          onAnswerQuiz={handleAnswerQuiz}
        />
      )}
    </div>
  );
}
