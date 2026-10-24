export type QualityMode = 'high' | 'low';
export type CameraMode = 'orbit' | 'walk';
export type CameraPreset = 'bench' | 'fume_hood' | 'storage' | 'emergency' | 'overview';

export interface GHSHazard {
  code: string;
  name: string;
  symbol: 'flame' | 'corrosive' | 'toxic' | 'health' | 'oxidizer' | 'irritant';
  description: string;
}

export interface SDSData {
  chemicalName: string;
  formula?: string;
  casNumber?: string;
  signalWord: 'DANGER' | 'WARNING' | 'CAUTION';
  hazardStatements: string[];
  precautionaryStatements: string[];
  ppeRequired: string[];
  firstAid: {
    eyes: string;
    skin: string;
    inhalation: string;
  };
  fireFighting: string;
  spillResponse: string;
  nfpaRating: {
    health: number; // 0-4
    flammability: number; // 0-4
    instability: number; // 0-4
    special?: string;
  };
}

export interface EquipmentAction {
  id: string;
  label: string;
  primary?: boolean;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'glassware' | 'heating' | 'safety' | 'reagent' | 'station' | 'storage' | 'apparatus';
  position: [number, number, number];
  rotation?: [number, number, number];
  description: string;
  safeUseProtocol: string;
  sds?: SDSData;
  isPickable?: boolean;
  inventoryIcon?: string;
  status?: 'normal' | 'tipped' | 'on_fire' | 'spilling' | 'bubbling' | 'extinguished' | 'neutralized' | 'active' | 'open' | 'closed';
  actions?: EquipmentAction[];
}

export interface ScenarioStep {
  id: string;
  instruction: string;
  actionRequired: string;
  isCompleted: boolean;
  hint: string;
}

export interface SafetyScenario {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  initialEquipStatus: Record<string, string>;
  steps: ScenarioStep[];
  successMessage: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'ppe' | 'emergency_tool';
  icon: string;
  isEquipped?: boolean;
  usesRemaining?: number;
}

// ========================
// HAZARD CENTER DATA TYPES
// ========================
export type HazardCategory = 'chemical' | 'fire_emergency' | 'lab_safety';
export type HazardSeverity = 'low' | 'moderate' | 'high' | 'critical';

export interface HazardStep {
  id: string;
  title: string;
  instruction: string;
  whyItMatters: string;
  actionRequired: string;
  targetEquipmentId?: string;
  unsafeActionToAvoid: string;
  isCompleted: boolean;
  hint: string;
}

export interface HazardItem {
  id: string;
  title: string;
  category: HazardCategory;
  severity: HazardSeverity;
  estimatedDuration: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  immediateRisks: string[];
  symptomsOrIndicators: string[];
  sdsReference?: string;
  requiredPPE: string[];
  requiredTools: string[];
  unsafeActionsToAvoid: string[];
  steps: HazardStep[];
  initialEquipStatus?: Record<string, string>;
  successSummary: string;
}

// ===================================
// VIRTUAL EXPERIMENT SIMULATOR TYPES
// ===================================
export type ExperimentCategory = 'basic' | 'reactions' | 'analytical' | 'physical';
export type ExperimentDifficulty = 'Introductory' | 'Intermediate' | 'Advanced';

export interface ExperimentQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExperimentDataPoint {
  x: number;
  y: number;
  label?: string;
  timestamp?: string;
}

export interface ExperimentStep {
  id: string;
  title: string;
  instruction: string;
  actionKey: string;
  hint: string;
  isCompleted: boolean;
}

export interface ExperimentItem {
  id: string;
  title: string;
  category: ExperimentCategory;
  difficulty: ExperimentDifficulty;
  duration: string;
  principle: string;
  equation?: string;
  learningObjectives: string[];
  requiredApparatus: string[];
  requiredReagents: string[];
  safetyPrecautions: string[];
  defaultParams: Record<string, number>;
  paramLabels: Record<string, { label: string; unit: string; min: number; max: number; step: number }>;
  steps: ExperimentStep[];
  graphConfig: {
    xLabel: string;
    yLabel: string;
    xUnit: string;
    yUnit: string;
  };
  quiz: ExperimentQuizQuestion[];
}

export interface ExperimentLiveState {
  experimentId: string;
  params: Record<string, number>;
  readings: {
    pH: number;
    temperature: number; // °C
    volume: number; // mL
    mass: number; // g
    pressure: number; // kPa
    absorbance: number; // AU
    color: string;
    opacity: number;
    turbidity: number;
    isBubbling: boolean;
    isBoiling: boolean;
    precipitate: boolean;
  };
  dataPoints: ExperimentDataPoint[];
  notebookNotes: string[];
  currentStepIndex: number;
  quizAnswers: Record<string, number>;
  isCompleted: boolean;
}

export type {
  VRLocomotionConfig,
  LocomotionMode,
  SpeedPreset,
  TurnType,
  SnapDegrees,
  HandDominance
} from './xr/vrLocomotionStore';
