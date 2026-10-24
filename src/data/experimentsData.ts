import { ExperimentItem } from '../types';

export const EXPERIMENTS_DATA: ExperimentItem[] = [
  // ==========================================
  // 1. BASIC CHEMISTRY (EXPERIMENTS 1 - 10)
  // ==========================================
  {
    id: 'exp_ph_indicators',
    title: 'Acid-Base Indicators & pH Scale',
    category: 'basic',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'Acid-base indicators are weak organic acids or bases whose conjugated forms exhibit distinct chromophores due to changes in electronic molecular conjugation as hydronium concentration varies across pH 1 to 14.',
    equation: 'HIn (aq) + H₂O (l) ⇌ In⁻ (aq) + H₃O⁺ (aq)',
    learningObjectives: [
      'Observe chromophore transition colors for Phenolphthalein, Bromothymol Blue, and Methyl Orange.',
      'Correlate hydronium ion concentration with negative logarithmic pH value: pH = -log[H₃O⁺].',
      'Determine the transition interval (pKa ± 1) of chemical indicators.'
    ],
    requiredApparatus: ['Graduated Cylinder (100 mL)', 'Beakers (250 mL)', 'Colorimeter / pH Meter', 'Stirring Rod'],
    requiredReagents: ['0.1 M HCl', '0.1 M NaOH', 'Phenolphthalein', 'Bromothymol Blue', 'Methyl Orange'],
    safetyPrecautions: ['Wear ANSI Z87.1 splash goggles and nitrile barrier gloves.', 'Neutralize all tested solutions before disposal.'],
    defaultParams: {
      pH: 1.0,
      indicatorIndex: 0 // 0: Phenolphthalein, 1: Bromothymol Blue, 2: Methyl Orange, 3: Universal
    },
    paramLabels: {
      pH: { label: 'Solution pH Level', unit: 'pH', min: 1.0, max: 14.0, step: 0.5 },
      indicatorIndex: { label: 'Indicator Choice (0:Phen, 1:BTB, 2:MO, 3:Univ)', unit: 'type', min: 0, max: 3, step: 1 }
    },
    graphConfig: {
      xLabel: 'Solution pH',
      yLabel: 'Relative Absorbance / Color Intensity',
      xUnit: 'pH',
      yUnit: 'AU'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Prepare Acidic Test Solution',
        instruction: 'Dispense 50 mL of deionized water and add 5 mL of 0.1 M HCl into the central beaker.',
        actionKey: 'add_reagent',
        hint: 'Use the bench beaker to start with an acidic baseline.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Add Indicator Drops',
        instruction: 'Introduce 3 drops of indicator dye and observe the starting color.',
        actionKey: 'add_indicator',
        hint: 'Adjust indicator choice slider or trigger the indicator dispenser.',
        isCompleted: false
      },
      {
        id: 'step_3',
        title: 'Titrate with Base & Sweep pH Spectrum',
        instruction: 'Gradually add 0.1 M NaOH dropwise, adjusting pH from 1 to 14 while recording color shifts.',
        actionKey: 'record_reading',
        hint: 'Slide the pH control slider and click "Record Data Point in Notebook".',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What color does Phenolphthalein display in an acidic solution of pH 3.0?',
        options: ['Vibrant pink', 'Colorless', 'Deep blue', 'Bright yellow'],
        correctIndex: 1,
        explanation: 'Phenolphthalein remains colorless in acidic and neutral media (pH < 8.2), turning pink/fuchsia at pH > 8.2.'
      },
      {
        id: 'q2',
        question: 'At which approximate pH does Bromothymol Blue transition through its green neutral point?',
        options: ['pH 1.0 to 2.5', 'pH 6.0 to 7.6', 'pH 9.5 to 11.0', 'pH 13.0 to 14.0'],
        correctIndex: 1,
        explanation: 'Bromothymol Blue transitions from yellow below pH 6.0, through emerald green at pH 7.0, to royal blue above pH 7.6.'
      },
      {
        id: 'q3',
        question: 'Why does the color of an indicator change as pH changes?',
        options: [
          'The chemical boils into gas',
          'Protonation/deprotonation alters the conjugated pi-electron structure absorbing different light wavelengths',
          'The solution becomes colder',
          'Glassware absorbs the indicator molecules'
        ],
        correctIndex: 1,
        explanation: 'Gaining or losing a proton shifts electron resonance and changes which wavelengths of visible light are absorbed.'
      }
    ]
  },
  {
    id: 'exp_strong_weak_ph',
    title: 'Strong vs. Weak Acids & Bases pH Comparison',
    category: 'basic',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'Strong acids (HCl) dissociate 100% in aqueous solution, yielding [H₃O⁺] equal to analytical concentration. Weak acids (CH₃COOH) establish equilibrium governed by Ka, dissociating typically less than 2-5%.',
    equation: 'HCl → H⁺ + Cl⁻ (100%) vs CH₃COOH ⇌ H⁺ + CH₃COO⁻ (Ka = 1.8×10⁻⁵)',
    learningObjectives: [
      'Compare measured pH of equimolar 0.1 M solutions of HCl and CH₃COOH.',
      'Calculate percent ionization of weak acids using Ka equilibrium expressions.',
      'Understand why electrical conductivity differs drastically between strong and weak electrolytes.'
    ],
    requiredApparatus: ['Digital pH Meter', 'Conductivity Probe', '50 mL Burettes', 'Volumetric Flasks'],
    requiredReagents: ['0.1 M Hydrochloric Acid', '0.1 M Acetic Acid', '0.1 M Sodium Hydroxide', '0.1 M Ammonia'],
    safetyPrecautions: ['Wear safety goggles; acetic acid has pungent vapors.'],
    defaultParams: {
      acidType: 0, // 0: Strong (HCl), 1: Weak (CH3COOH)
      concentration: 0.1 // Molar
    },
    paramLabels: {
      acidType: { label: 'Acid Type (0: HCl Strong, 1: CH3COOH Weak)', unit: 'type', min: 0, max: 1, step: 1 },
      concentration: { label: 'Acid Concentration', unit: 'M', min: 0.001, max: 1.0, step: 0.05 }
    },
    graphConfig: {
      xLabel: 'Log Concentration [M]',
      yLabel: 'Measured pH',
      xUnit: 'M',
      yUnit: 'pH'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Calibrate Digital pH Meter',
        instruction: 'Immerse electrode in standard buffer pH 4.00 and 7.00 solutions.',
        actionKey: 'calibrate_sensor',
        hint: 'Use the pH sensor calibration routine.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Measure 0.1 M Strong Acid (HCl)',
        instruction: 'Immerse electrode into 0.1 M HCl and record pH (~1.00).',
        actionKey: 'measure_ph',
        hint: 'Set acid type to 0 and record reading.',
        isCompleted: false
      },
      {
        id: 'step_3',
        title: 'Measure 0.1 M Weak Acid (CH₃COOH)',
        instruction: 'Rinse electrode with deionized water, switch to 0.1 M Acetic acid, and record pH (~2.88).',
        actionKey: 'measure_ph',
        hint: 'Set acid type to 1 and note the higher pH due to incomplete ionization.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the theoretical pH of a 0.01 M solution of strong hydrochloric acid (HCl)?',
        options: ['pH 1.0', 'pH 2.0', 'pH 7.0', 'pH 12.0'],
        correctIndex: 1,
        explanation: 'For a strong monoprotic acid, [H⁺] = 0.01 M = 10⁻² M. pH = -log(0.01) = 2.0.'
      },
      {
        id: 'q2',
        question: 'Why is the pH of 0.1 M acetic acid (~2.88) significantly higher than 0.1 M HCl (1.00)?',
        options: [
          'Acetic acid is heavier',
          'Acetic acid is a weak acid that only partially dissociates into ions',
          'Acetic acid neutralizes itself',
          'HCl contains oxygen atoms'
        ],
        correctIndex: 1,
        explanation: 'Acetic acid has Ka = 1.8e-5, meaning less than 1.3% of molecules dissociate into free H⁺ ions.'
      },
      {
        id: 'q3',
        question: 'Which solution conducts electricity more strongly: 0.1 M HCl or 0.1 M CH₃COOH?',
        options: ['0.1 M HCl because it produces a far higher concentration of free mobile ions', '0.1 M CH₃COOH', 'Both conduct identically', 'Neither conducts electricity'],
        correctIndex: 0,
        explanation: 'Strong electrolytes dissociate 100% into ions, providing superior electrical conductivity.'
      }
    ]
  },
  {
    id: 'exp_neutralization',
    title: 'Neutralization Reactions & Salt Formation',
    category: 'basic',
    difficulty: 'Introductory',
    duration: '12 min',
    principle: 'Arrhenius neutralization combines hydronium and hydroxide ions exothermically to yield liquid water and a neutral dissolved ionic salt.',
    equation: 'HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l)   ΔH° = -55.8 kJ/mol',
    learningObjectives: [
      'Observe temperature rise during exothermic acid-base neutralization.',
      'Demonstrate conservation of mass and stoichiometric mole equivalence.',
      'Evaporate neutralized solution to isolate pure sodium chloride crystals.'
    ],
    requiredApparatus: ['Styrofoam Cup Calorimeter', 'Digital Thermometer', 'Graduated Cylinders', 'Evaporating Dish'],
    requiredReagents: ['1.0 M HCl', '1.0 M NaOH', 'Universal Indicator'],
    safetyPrecautions: ['Both reagents are corrosive at 1.0 M; wear goggles and gloves.'],
    defaultParams: {
      volumeAcid: 25.0, // mL
      volumeBase: 25.0 // mL
    },
    paramLabels: {
      volumeAcid: { label: '1.0 M HCl Volume', unit: 'mL', min: 10, max: 50, step: 5 },
      volumeBase: { label: '1.0 M NaOH Added', unit: 'mL', min: 0, max: 50, step: 5 }
    },
    graphConfig: {
      xLabel: 'Volume of 1.0 M NaOH Added',
      yLabel: 'Calorimeter Temperature',
      xUnit: 'mL',
      yUnit: '°C'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Record Initial Reagent Temperatures',
        instruction: 'Measure initial temperatures of separate 25 mL portions of 1.0 M HCl and 1.0 M NaOH.',
        actionKey: 'measure_temp',
        hint: 'Note ambient baseline ~21.0°C.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Combine Solutions & Monitor Exotherm',
        instruction: 'Pour NaOH into calorimeter cup containing HCl, stir continuously, and record peak temperature.',
        actionKey: 'mix_reagents',
        hint: 'Temperature rises to ~27.7°C due to enthalpy of neutralization.',
        isCompleted: false
      },
      {
        id: 'step_3',
        title: 'Test Final Neutrality',
        instruction: 'Dip universal pH strip to confirm neutral pH 7.0.',
        actionKey: 'measure_ph',
        hint: 'Verify equimolar neutralization.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What are the primary products of any strong acid and strong base neutralization?',
        options: ['Carbon dioxide and hydrogen gas', 'Water and an ionic salt', 'Pure oxygen and metal', 'Nitrogen and methane'],
        correctIndex: 1,
        explanation: 'H⁺ (aq) + OH⁻ (aq) → H₂O (l), leaving spectator ions to form a dissolved salt.'
      },
      {
        id: 'q2',
        question: 'Why does the temperature of the mixture increase during neutralization?',
        options: [
          'The reaction is endothermic',
          'Bond formation between H⁺ and OH⁻ to form H₂O releases enthalpy (exothermic reaction)',
          'Friction from stirring',
          'The beaker absorbs heat from the air'
        ],
        correctIndex: 1,
        explanation: 'Standard enthalpy of neutralization is exothermic (-55.8 kJ/mol), warming the water.'
      },
      {
        id: 'q3',
        question: 'If 25 mL of 1.0 M HCl is mixed with 25 mL of 1.0 M NaOH, what is the final pH?',
        options: ['pH 1.0', 'pH 7.0', 'pH 14.0', 'pH 4.0'],
        correctIndex: 1,
        explanation: 'Equal moles of strong acid and strong base neutralize each other completely to pH 7.0.'
      }
    ]
  },
  {
    id: 'exp_solubility_curves',
    title: 'Solubility Curves and Saturation Limits',
    category: 'basic',
    difficulty: 'Intermediate',
    duration: '15 min',
    principle: 'The maximum amount of solute that dissolves in a given solvent is governed by thermodynamic dissolution enthalpy. For endothermic dissolution (e.g. KNO₃), solubility increases steeply with temperature.',
    equation: 'KNO₃ (s) + heat ⇌ K⁺ (aq) + NO₃⁻ (aq)   (ΔH > 0)',
    learningObjectives: [
      'Construct a temperature vs. solubility curve for Potassium Nitrate (KNO₃).',
      'Distinguish between unsaturated, saturated, and supersaturated solutions.',
      'Observe spontaneous crystallization when cooling past the saturation boundary.'
    ],
    requiredApparatus: ['Boiling Water Bath', 'Test Tubes & Rack', 'Precision Thermometer', 'Analytical Balance'],
    requiredReagents: ['Potassium Nitrate (KNO₃)', 'Sodium Chloride (NaCl)', 'Deionized Water'],
    safetyPrecautions: ['KNO₃ is an oxidizer; keep away from open flames and organics.'],
    defaultParams: {
      temperatureC: 25,
      soluteMassG: 38 // g KNO3 per 100g H2O
    },
    paramLabels: {
      temperatureC: { label: 'Solution Temperature', unit: '°C', min: 10, max: 90, step: 5 },
      soluteMassG: { label: 'Dissolved KNO₃ Mass', unit: 'g/100g', min: 10, max: 180, step: 10 }
    },
    graphConfig: {
      xLabel: 'Temperature',
      yLabel: 'Solubility (g solute / 100g water)',
      xUnit: '°C',
      yUnit: 'g/100mL'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Dissolve Solute at Elevated Temperature',
        instruction: 'Weigh 60 g of KNO₃ into 100 mL hot water at 70°C until completely dissolved.',
        actionKey: 'heat_solution',
        hint: 'Use the water bath to reach target temperature.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Slowly Cool and Watch for First Crystals',
        instruction: 'Remove tube from bath, allow slow cooling with thermometer, and record temperature when needle crystals first appear.',
        actionKey: 'record_reading',
        hint: 'Record the exact saturation threshold.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'If a solution contains more dissolved solute than the equilibrium limit at that temperature, it is:',
        options: ['Unsaturated', 'Saturated', 'Supersaturated', 'Dilute'],
        correctIndex: 2,
        explanation: 'A supersaturated solution holds more solute than normally possible, remaining unstable until disturbed.'
      },
      {
        id: 'q2',
        question: 'For Potassium Nitrate (KNO₃), what happens to solubility as temperature increases from 20°C to 80°C?',
        options: ['Decreases drastically', 'Increases dramatically from ~32g to ~169g per 100g water', 'Remains completely constant', 'Oscillates randomly'],
        correctIndex: 1,
        explanation: 'Because dissolution of KNO₃ is endothermic, adding heat shifts equilibrium toward dissolved ions (Le Chatelier).'
      },
      {
        id: 'q3',
        question: 'What triggers rapid crystallization in a supersaturated solution?',
        options: ['Adding a single seed crystal or scratching the glass tube wall', 'Warming it up', 'Covering it with foil', 'Adding more water'],
        correctIndex: 0,
        explanation: 'A seed crystal provides a nucleation template, causing rapid precipitation of excess solute.'
      }
    ]
  },
  {
    id: 'exp_recrystallization',
    title: 'Recrystallization & Impurity Purification',
    category: 'basic',
    difficulty: 'Intermediate',
    duration: '15 min',
    principle: 'Purification technique based on differential solubility at high vs. low temperatures. Impurities either remain dissolved in cold solvent or are filtered out while hot.',
    equation: 'Dissolve hot (high solubility) → Filter insolubles → Cool slowly (lattice exclusion) → Collect pure crystals',
    learningObjectives: [
      'Purify crude benzoic acid contaminated with charcoal/insoluble grit.',
      'Calculate percent recovery and melting point purity determination.',
      'Understand how slow crystal lattice growth excludes foreign contaminant molecules.'
    ],
    requiredApparatus: ['Hotplate / Burner', 'Fluted Filter Paper & Stemless Funnel', 'Buchner Funnel & Aspirator'],
    requiredReagents: ['Crude Benzoic Acid Sample', 'Decolorizing Charcoal', 'Deionized Water'],
    safetyPrecautions: ['Boiling water splash hazard; use tongs for hot flasks.'],
    defaultParams: {
      coolingRate: 1, // 0: Fast ice quench, 1: Slow benchtop cooling
      crudeMassG: 5.0
    },
    paramLabels: {
      coolingRate: { label: 'Cooling Rate (0: Ice Shock, 1: Slow Room Temp)', unit: 'mode', min: 0, max: 1, step: 1 },
      crudeMassG: { label: 'Starting Crude Mass', unit: 'g', min: 2.0, max: 10.0, step: 0.5 }
    },
    graphConfig: {
      xLabel: 'Time Elapsed',
      yLabel: 'Crystal Yield & Purity Index',
      xUnit: 'min',
      yUnit: '%'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Dissolve in Minimum Boiling Solvent',
        instruction: 'Add hot boiling water dropwise to crude benzoic acid until just dissolved.',
        actionKey: 'heat_solution',
        hint: 'Excess solvent prevents crystals from precipitating upon cooling.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Slowly Cool to Form Needle Crystals',
        instruction: 'Allow flask to cool undisturbed on benchtop to facilitate pure crystal lattice growth.',
        actionKey: 'cool_solution',
        hint: 'Slow cooling yields large, ultra-pure needle crystals.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why should you use the MINIMUM amount of hot solvent during recrystallization?',
        options: ['To save water', 'To maximize crystal recovery upon cooling by ensuring saturation', 'To make filtration slower', 'To prevent boiling'],
        correctIndex: 1,
        explanation: 'Too much solvent keeps the pure product dissolved even at cold temperatures, reducing percent recovery.'
      },
      {
        id: 'q2',
        question: 'What is the advantage of slow cooling over rapid ice shock cooling?',
        options: ['Slow cooling allows pure crystal lattices to assemble without trapping impurities', 'Slow cooling creates amorphous dust', 'No difference', 'Slow cooling lowers boiling point'],
        correctIndex: 0,
        explanation: 'Rapid cooling traps solvent and impurity molecules inside flawed, rapidly growing crystal matrices.'
      },
      {
        id: 'q3',
        question: 'How do you experimentally verify the purity of recrystallized benzoic acid?',
        options: ['Weighing it only', 'Measuring its sharp melting point (literature: 122°C)', 'Tasting it', 'Checking its smell'],
        correctIndex: 1,
        explanation: 'Impurities depress and broaden the melting point range; pure samples melt sharply at 122°C.'
      }
    ]
  },
  {
    id: 'exp_evaporation_residue',
    title: 'Evaporation & Gravimetric Residue Analysis',
    category: 'basic',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'Thermal evaporation of volatile solvent leaves non-volatile dissolved mineral solids (Total Dissolved Solids - TDS) for quantitative gravimetric weighing.',
    equation: 'TDS (mg/L) = [(Mass_dish+residue - Mass_tare) × 1000 mg/g] / Volume_sample (L)',
    learningObjectives: [
      'Master tare weighing and quantitative gravimetric transfer.',
      'Determine dissolved mineral residue in hard vs soft tap water samples.',
      'Avoid splattering loss near the dryness point.'
    ],
    requiredApparatus: ['Porcelain Evaporating Dish', 'Tripod & Wire Gauze', 'Bunsen Burner', 'Analytical Balance'],
    requiredReagents: ['Mineral Spring Water Sample', 'Deionized Water'],
    safetyPrecautions: ['Hot porcelain looks identical to cold porcelain; always handle with crucible tongs.'],
    defaultParams: {
      sampleVolML: 50.0,
      mineralHardnessPpm: 250
    },
    paramLabels: {
      sampleVolML: { label: 'Evaporation Sample Volume', unit: 'mL', min: 25, max: 100, step: 25 },
      mineralHardnessPpm: { label: 'Dissolved Minerals Concentration', unit: 'ppm', min: 50, max: 800, step: 50 }
    },
    graphConfig: {
      xLabel: 'Sample Evaporated Volume',
      yLabel: 'Residue Mass Collected',
      xUnit: 'mL',
      yUnit: 'mg'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Tare Clean Evaporating Dish',
        instruction: 'Weigh empty dry porcelain dish to 4 decimal places on analytical balance.',
        actionKey: 'weigh_sample',
        hint: 'Record tare mass accurately.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Evaporate to Dryness over Gentle Flame',
        instruction: 'Heat water sample gently; reduce flame near dryness to avoid spattering.',
        actionKey: 'heat_solution',
        hint: 'Maintain steady simmer without violent popping.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why should you reduce heat when an evaporating dish is almost dry?',
        options: ['To speed up drying', 'To prevent thermal spattering from popping crystals out of the dish', 'To cool the room', 'To change crystal color'],
        correctIndex: 1,
        explanation: 'Steam pockets under drying crusts explode, ejecting solid particles and ruining mass accuracy.'
      },
      {
        id: 'q2',
        question: 'If 50 mL of water leaves 15.0 mg of solid residue, what is the TDS in mg/L (ppm)?',
        options: ['15 ppm', '150 ppm', '300 ppm', '750 ppm'],
        correctIndex: 2,
        explanation: '15.0 mg / 0.050 L = 300 mg/L (ppm).'
      },
      {
        id: 'q3',
        question: 'What apparatus is used to cool hot evaporating dishes without absorbing airborne moisture?',
        options: ['Open benchtop', 'Desiccator containing silica gel', 'Refrigerator', 'Fume hood sink'],
        correctIndex: 1,
        explanation: 'A desiccator seals out room humidity while hot glassware cools to balance temperature.'
      }
    ]
  },
  {
    id: 'exp_filtration',
    title: 'Gravity vs. Vacuum Filtration Techniques',
    category: 'basic',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'Phase separation of suspended solids from liquid filtrate. Gravity filtration preserves volatile liquids, while vacuum aspiration through a Buchner funnel dramatically accelerates drying.',
    equation: 'Flow Rate Q = (ΔP · A) / (μ · R)   (Darcy-Kozeny filtration equation)',
    learningObjectives: [
      'Compare flow rates between conical fluted gravity funnel and Buchner vacuum funnel.',
      'Properly seat and wet filter paper before pouring suspensions.',
      'Prevent precipitate bypass around filter edges.'
    ],
    requiredApparatus: ['Buchner Funnel & Sidearm Filter Flask', 'Water Aspirator Vacuum Line', 'Fluted Filter Funnel'],
    requiredReagents: ['Calcium Carbonate Suspension (CaCO₃)', 'Deionized Water'],
    safetyPrecautions: ['Check filter flask for star cracks; implosion hazard under vacuum.'],
    defaultParams: {
      vacuumKPa: 20, // Vacuum applied
      slurryVolumeML: 100
    },
    paramLabels: {
      vacuumKPa: { label: 'Vacuum Pressure Applied', unit: 'kPa', min: 0, max: 80, step: 10 },
      slurryVolumeML: { label: 'Suspension Slurry Volume', unit: 'mL', min: 50, max: 200, step: 25 }
    },
    graphConfig: {
      xLabel: 'Filtration Time',
      yLabel: 'Filtrate Collected',
      xUnit: 's',
      yUnit: 'mL'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Seat Filter Paper with Solvent',
        instruction: 'Place circular paper in Buchner funnel, turn on vacuum aspirator, and wet with solvent spray.',
        actionKey: 'prepare_filter',
        hint: 'Wet paper seals tightly against porcelain perforations.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Decant Slurry Down Glass Stirring Rod',
        instruction: 'Pour precipitate suspension down rod into center of funnel.',
        actionKey: 'pour_liquid',
        hint: 'Rod directs stream without splashing.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why must you wet the filter paper with solvent before pouring the precipitate slurry in a Buchner funnel?',
        options: ['To soften the paper', 'To create a suction seal against the funnel plate and prevent particles slipping under the edge', 'To wash the funnel', 'To dissolve the paper'],
        correctIndex: 1,
        explanation: 'A dry unsealed paper floats up, allowing unfiltered precipitate to escape straight into the filtrate flask.'
      },
      {
        id: 'q2',
        question: 'Why should you disconnect the vacuum hose before turning off the water faucet aspirator?',
        options: ['To prevent water being sucked backward into the filter flask ("back-siphon")', 'To save electricity', 'To cool the faucet', 'To clean the tube'],
        correctIndex: 0,
        explanation: 'Turning off water while system is under vacuum causes tap water to back-siphon into your pure product.'
      },
      {
        id: 'q3',
        question: 'Which method is preferred when the liquid FILTRATE contains a volatile organic target solvent?',
        options: ['Gravity filtration (vacuum would evaporate and lose volatile solvent)', 'Vacuum filtration', 'Centrifugation with open tubes', 'Boiling'],
        correctIndex: 0,
        explanation: 'Strong vacuum evaporates low-boiling volatile solvents like ether or pentane rapidly.'
      }
    ]
  },
  {
    id: 'exp_simple_distillation',
    title: 'Simple Distillation & Boiling Point Separation',
    category: 'basic',
    difficulty: 'Intermediate',
    duration: '15 min',
    principle: 'Separation of liquid mixtures having substantially different boiling points (>40°C difference) via continuous vaporization and Liebig water-condenser condensation.',
    equation: 'P_total = P°_A · X_A + P°_B · X_B   (Raoult\'s Law for Ideal Mixtures)',
    learningObjectives: [
      'Assemble a leak-proof distillation apparatus with proper coolant flow direction (in at bottom, out at top).',
      'Record boiling plateau temperature for pure ethanol (78.4°C) vs. water (100°C).',
      'Understand why boiling stones prevent violent liquid bumping.'
    ],
    requiredApparatus: ['Distillation Flask (Round Bottom)', 'Liebig Condenser', 'Stillhead Adapter & Thermometer', 'Heating Mantle'],
    requiredReagents: ['50:50 Ethanol-Water Binary Mixture', 'Boiling Stones'],
    safetyPrecautions: ['Ethanol is flammable; never distill using an open flame.', 'Ensure apparatus is vented; never heat a sealed system.'],
    defaultParams: {
      potTemperatureC: 80,
      condenserCoolantRateLPM: 2.0
    },
    paramLabels: {
      potTemperatureC: { label: 'Heating Pot Temperature', unit: '°C', min: 70, max: 110, step: 2 },
      condenserCoolantRateLPM: { label: 'Condenser Cooling Flow', unit: 'L/min', min: 0.5, max: 5.0, step: 0.5 }
    },
    graphConfig: {
      xLabel: 'Distillate Volume Collected',
      yLabel: 'Vapor Head Temperature',
      xUnit: 'mL',
      yUnit: '°C'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Check Thermometer Bulb Alignment',
        instruction: 'Ensure thermometer sensing bulb is situated just below the sidearm of the stillhead adapter.',
        actionKey: 'adjust_clamp',
        hint: 'Measures exiting vapor temperature accurately.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Engage Condenser Coolant (Bottom to Top)',
        instruction: 'Turn on water flow entering bottom condenser jacket and exiting top hose to drain.',
        actionKey: 'toggle_eyewash',
        hint: 'Guarantees the cooling jacket remains completely filled with water without air pockets.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why must cooling water enter the Liebig condenser at the bottom port rather than the top?',
        options: ['Gravity causes water to flow faster', 'To ensure the jacket completely fills with water and eliminates air bubbles for efficient cooling', 'To warm the water', 'To prevent condensation'],
        correctIndex: 1,
        explanation: 'Bottom entry forces water to fill the entire cooling jacket upwards, maximizing heat exchange surface.'
      },
      {
        id: 'q2',
        question: 'What is the exact purpose of adding boiling stones or magnetic stir bar to the boiling flask?',
        options: ['To add chemical catalysts', 'To provide nucleation sites that promote smooth bubble formation and prevent violent liquid eruptive bumping', 'To color the solution', 'To increase the boiling point'],
        correctIndex: 1,
        explanation: 'Porous stones release tiny air bubbles, preventing liquids from superheating past boiling point.'
      },
      {
        id: 'q3',
        question: 'What happens if a distillation apparatus is heated as a completely closed system without a vent to atmosphere?',
        options: ['The distillation runs faster', 'Internal vapor pressure escalates rapidly until the glassware explodes', 'The liquid freezes', 'The thermometer breaks'],
        correctIndex: 1,
        explanation: 'Heated vapors expand hundreds of times in volume; a closed system turns into a dangerous pressure bomb.'
      }
    ]
  },
  {
    id: 'exp_density_column',
    title: 'Density Column & Liquid Stratification',
    category: 'basic',
    difficulty: 'Introductory',
    duration: '8 min',
    principle: 'Immiscible liquids of differing densities naturally stratify into stable horizontal layers, with the densest fluid at the bottom and buoyant lower-density fluids floating above.',
    equation: 'Density ρ = Mass m / Volume V   (g/cm³ or g/mL)',
    learningObjectives: [
      'Layer Glycerin (1.26 g/mL), Water (1.00 g/mL), Vegetable Oil (0.92 g/mL), and Isopropanol (0.79 g/mL).',
      'Predict float/sink equilibrium of solid object beads based on density.',
      'Demonstrate how interfacial tension and miscibility influence boundary stability.'
    ],
    requiredApparatus: ['100 mL Graduated Cylinder', 'Pipettes', 'Hydrometer'],
    requiredReagents: ['Glycerin (dyed red)', 'Water (dyed blue)', 'Vegetable Oil (yellow)', 'Isopropanol (dyed green)'],
    safetyPrecautions: ['Isopropanol is flammable; avoid open flames.'],
    defaultParams: {
      layersCount: 4,
      beadDensity: 0.95
    },
    paramLabels: {
      layersCount: { label: 'Number of Immiscible Layers', unit: 'layers', min: 2, max: 4, step: 1 },
      beadDensity: { label: 'Test Object Density', unit: 'g/mL', min: 0.7, max: 1.4, step: 0.05 }
    },
    graphConfig: {
      xLabel: 'Liquid Layer Column Height',
      yLabel: 'Liquid Density',
      xUnit: 'cm',
      yUnit: 'g/mL'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Add Densest Liquid (Glycerin)',
        instruction: 'Pour 25 mL of red glycerin (1.26 g/mL) into bottom of cylinder.',
        actionKey: 'pour_liquid',
        hint: 'Forms the dense foundation layer.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Carefully Trickle Water Down Wall',
        instruction: 'Use a transfer pipette to gently float blue water (1.00 g/mL) over glycerin.',
        actionKey: 'pour_liquid',
        hint: 'Avoid turbulent mixing at the boundary.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which liquid sits at the VERY BOTTOM of a four-layer density column?',
        options: ['Isopropanol (0.79 g/mL)', 'Vegetable oil (0.92 g/mL)', 'Water (1.00 g/mL)', 'Glycerin (1.26 g/mL)'],
        correctIndex: 3,
        explanation: 'Glycerin has the highest density (1.26 g/mL), sinking beneath all lighter liquids.'
      },
      {
        id: 'q2',
        question: 'Where will a plastic bead with density 0.95 g/mL settle in this column?',
        options: ['At the bottom under glycerin', 'Between the water (1.00 g/mL) and oil (0.92 g/mL) layers', 'Floating on top of isopropanol', 'Suspended in mid-air'],
        correctIndex: 1,
        explanation: 'Objects float on fluids denser than themselves (water 1.00) and sink through fluids less dense (oil 0.92).'
      },
      {
        id: 'q3',
        question: 'Why must Isopropanol and Water be separated by an oil barrier layer in a multi-density column?',
        options: ['They are explosive together', 'Water and Isopropanol are fully miscible and will dissolve into each other without a barrier', 'They smell bad', 'They turn into solid'],
        correctIndex: 1,
        explanation: 'Water and alcohol form hydrogen bonds and are miscible; oil acts as an immiscible hydrophobic buffer.'
      }
    ]
  },
  {
    id: 'exp_liquid_diffusion',
    title: 'Molecular Diffusion & Temperature Kinetics',
    category: 'basic',
    difficulty: 'Introductory',
    duration: '8 min',
    principle: 'Spontaneous net movement of solute molecules down a concentration gradient driven by thermal Brownian motion. Rate is governed by Fick\'s law and Stokes-Einstein diffusion coefficient.',
    equation: 'Diffusion Coefficient D = (k_B · T) / (6 · π · η · r)',
    learningObjectives: [
      'Compare diffusion rates of potassium permanganate in ice water (4°C) vs room water (22°C) vs boiling water (90°C).',
      'Correlate kinetic energy (E_k = 3/2 k_B T) with molecular collision frequency.',
      'Quantify dye front radius over time.'
    ],
    requiredApparatus: ['3 Matching 250 mL Griffin Beakers', 'Stopwatch', 'Millimeter Grid Paper'],
    requiredReagents: ['Potassium Permanganate Crystals (KMnO₄)', 'Water at 4°C, 22°C, and 90°C'],
    safetyPrecautions: ['KNO₄ stains hands brown (MnO₂); wear nitrile gloves.'],
    defaultParams: {
      waterTempC: 22,
      dyeMolecularMass: 158
    },
    paramLabels: {
      waterTempC: { label: 'Water Bath Temperature', unit: '°C', min: 4, max: 95, step: 5 },
      dyeMolecularMass: { label: 'Solute Molecular Weight', unit: 'g/mol', min: 100, max: 400, step: 20 }
    },
    graphConfig: {
      xLabel: 'Time Elapsed',
      yLabel: 'Diffusion Front Radius',
      xUnit: 's',
      yUnit: 'mm'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Drop Single Crystal into Quiescent Water',
        instruction: 'Carefully drop one crystal of KMnO₄ into the center of each undisturbed beaker without stirring.',
        actionKey: 'add_reagent',
        hint: 'Ensure water is completely still.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Measure Radial Expansion Over Time',
        instruction: 'Start stopwatch and record dye plume radius at 30, 60, and 120 seconds.',
        actionKey: 'record_reading',
        hint: 'Observe dramatically faster dispersion at 90°C.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'In which beaker does the purple permanganate dye diffuse throughout the entire volume fastest?',
        options: ['Ice water at 4°C', 'Room temperature water at 22°C', 'Near-boiling water at 90°C', 'All diffuse at the exact same rate'],
        correctIndex: 2,
        explanation: 'Higher temperature imparts higher average kinetic energy and molecular velocity, speeding diffusion.'
      },
      {
        id: 'q2',
        question: 'According to the Stokes-Einstein equation, how does solvent viscosity (η) affect diffusion rate?',
        options: ['Higher viscosity speeds diffusion', 'Higher viscosity slows diffusion', 'No effect', 'Viscosity only affects color'],
        correctIndex: 1,
        explanation: 'Higher viscosity increases viscous drag on moving solute molecules, reducing diffusion rate.'
      },
      {
        id: 'q3',
        question: 'What microscopic physical phenomenon drives diffusion in still water?',
        options: ['Convective wind', 'Brownian motion resulting from random thermal collisions with solvent molecules', 'Gravity', 'Magnetic fields'],
        correctIndex: 1,
        explanation: 'Random thermal collisions (Brownian motion) relentlessly scatter molecules away from high-concentration zones.'
      }
    ]
  },

  // ========================================================
  // 2. REACTIONS & MATERIAL SCIENCE (EXPERIMENTS 11 - 20)
  // ========================================================
  {
    id: 'exp_reaction_rates_conc',
    title: 'Reaction Rates: Concentration Effects',
    category: 'reactions',
    difficulty: 'Intermediate',
    duration: '12 min',
    principle: 'Collision theory dictates that reaction rate is directly proportional to effective collisions per second. Increasing reactant concentration increases collision frequency, accelerating rate.',
    equation: 'Na₂S₂O₃ (aq) + 2 HCl (aq) → 2 NaCl (aq) + SO₂ (g) + S (s)↓ + H₂O (l)',
    learningObjectives: [
      'Perform the classic "disappearing cross" sulfur precipitation rate experiment.',
      'Plot 1/time (rate) vs. concentration of Sodium Thiosulfate.',
      'Determine the reaction order with respect to thiosulfate ions.'
    ],
    requiredApparatus: ['Conical Flask', 'Paper marked with black cross', 'Stopwatch', 'Burettes'],
    requiredReagents: ['0.15 M Sodium Thiosulfate (Na₂S₂O₃)', '2.0 M Hydrochloric Acid', 'Deionized Water'],
    safetyPrecautions: ['Reaction produces choking SO₂ gas; perform under fume hood or well-ventilated area.'],
    defaultParams: {
      thiosulfateConcM: 0.15,
      temperatureC: 22
    },
    paramLabels: {
      thiosulfateConcM: { label: 'Thiosulfate Concentration', unit: 'M', min: 0.03, max: 0.15, step: 0.03 },
      temperatureC: { label: 'Reaction Temperature', unit: '°C', min: 15, max: 45, step: 5 }
    },
    graphConfig: {
      xLabel: 'Thiosulfate Concentration',
      yLabel: 'Reaction Rate (1 / time)',
      xUnit: 'M',
      yUnit: 's⁻¹'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Place Reaction Flask Over Black Cross',
        instruction: 'Position 100 mL flask directly over a bold black "X" marked on white cardstock.',
        actionKey: 'prepare_filter',
        hint: 'View looking down vertically through the solution.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Add Acid and Start Timer',
        instruction: 'Quickly pour 5 mL of 2M HCl, swirl once, start stopwatch, and time until cross is obscured by yellow sulfur turbidity.',
        actionKey: 'mix_reagents',
        hint: 'Time decreases sharply as concentration increases.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What solid precipitate forms and obscures the black cross in this reaction?',
        options: ['Sodium chloride', 'Colloidal elemental sulfur (S₈)', 'Calcium sulfate', 'Copper oxide'],
        correctIndex: 1,
        explanation: 'Thiosulfate disproportionates in acid to produce fine colloidal sulfur that turns the solution milky yellow.'
      },
      {
        id: 'q2',
        question: 'If doubling the concentration doubles the reaction rate, what is the reaction order?',
        options: ['Zero order', 'First order', 'Second order', 'Third order'],
        correctIndex: 1,
        explanation: 'When Rate ∝ [Reactant]¹, the reaction is first-order with respect to that reactant.'
      },
      {
        id: 'q3',
        question: 'Why is 1/time (1/t) used as a measure of reaction rate?',
        options: ['It represents the average rate to reach a fixed amount of precipitate formation', 'It makes the number bigger', 'Time has no units', 'Calculators require it'],
        correctIndex: 0,
        explanation: 'A shorter time indicates a faster rate: Rate = Δ[Product]/Δt ∝ 1/t.'
      }
    ]
  },
  {
    id: 'exp_temperature_arrhenius',
    title: 'Temperature & Arrhenius Activation Energy',
    category: 'reactions',
    difficulty: 'Advanced',
    duration: '15 min',
    principle: 'Reaction rates increase exponentially with temperature because a higher fraction of molecular collisions exceed the threshold activation energy (Ea).',
    equation: 'k = A · e^(-Ea / RT)   or   ln(k) = -Ea/R · (1/T) + ln(A)',
    learningObjectives: [
      'Measure rate constants across temperatures from 20°C to 60°C.',
      'Construct an Arrhenius plot (ln k vs. 1/T in Kelvin).',
      'Calculate activation energy (Ea in kJ/mol) from the slope (-Ea/R).'
    ],
    requiredApparatus: ['Thermostated Water Bath', 'Stopwatch', 'Thermometer', 'Volumetric Pipettes'],
    requiredReagents: ['Sodium Thiosulfate', 'Hydrochloric Acid', 'Ice Bath'],
    safetyPrecautions: ['Ventilate SO₂ fumes.'],
    defaultParams: {
      tempKelvin: 298,
      activationEnergyKJ: 52 // kJ/mol
    },
    paramLabels: {
      tempKelvin: { label: 'Absolute Temperature', unit: 'K', min: 283, max: 333, step: 5 },
      activationEnergyKJ: { label: 'Activation Energy Barrier', unit: 'kJ/mol', min: 30, max: 90, step: 5 }
    },
    graphConfig: {
      xLabel: 'Inverse Temperature (1/T)',
      yLabel: 'Natural Log of Rate Constant ln(k)',
      xUnit: 'K⁻¹',
      yUnit: 'ln(s⁻¹)'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Equilibrate Reagents at Target Temperature',
        instruction: 'Place separate tubes of reactants in 45°C water bath for 5 minutes.',
        actionKey: 'heat_solution',
        hint: 'Ensure thermal equilibrium before combining.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Initiate Reaction and Record Reaction Time',
        instruction: 'Mix reactants in the bath and record time to reach reaction milestone.',
        actionKey: 'mix_reagents',
        hint: 'Calculate k = 1/time and plot ln(k) vs 1/T.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'As a rule of thumb, for many common chemical reactions near room temperature, a 10°C increase in temperature causes the rate to:',
        options: ['Remain identical', 'Approximately double (2x)', 'Increase by 1000x', 'Drop to zero'],
        correctIndex: 1,
        explanation: 'A 10°C rise typically doubles or triples the fraction of molecules with energy greater than Ea.'
      },
      {
        id: 'q2',
        question: 'In an Arrhenius plot of ln(k) versus 1/T, what does the slope of the linear regression line equal?',
        options: ['+Ea / R', '-Ea / R', 'ln(A)', 'R / Ea'],
        correctIndex: 1,
        explanation: 'From ln(k) = (-Ea/R)(1/T) + ln(A), the slope is equal to -Ea/R.'
      },
      {
        id: 'q3',
        question: 'What is the physical meaning of the pre-exponential factor A in the Arrhenius equation?',
        options: ['Thermal conductivity', 'Frequency of molecular collisions with the correct steric orientation', 'Solvent density', 'Solution pH'],
        correctIndex: 1,
        explanation: 'A represents collision frequency and steric factor (correct spatial orientation of colliding molecules).'
      }
    ]
  },
  {
    id: 'exp_surface_area',
    title: 'Surface Area Kinetics: Marble Chips vs. Powder',
    category: 'reactions',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'In heterogeneous reactions involving solids and liquids, reaction only occurs at the phase interface. Grinding solid into fine powder vastly multiplies exposed surface area, accelerating mass transfer.',
    equation: 'CaCO₃ (s) + 2 HCl (aq) → CaCl₂ (aq) + H₂O (l) + CO₂ (g)↑',
    learningObjectives: [
      'Compare carbon dioxide gas volume evolution between large marble chips and finely ground marble powder.',
      'Calculate surface area to volume ratio for cubes and spheres.',
      'Explain heterogeneous reaction kinetics using collision model.'
    ],
    requiredApparatus: ['Sidearm Flask connected to Gas Syringe', 'Mortar and Pestle', 'Digital Timer'],
    requiredReagents: ['Calcium Carbonate Marble Chips', 'Calcium Carbonate Powder', '1.0 M HCl'],
    safetyPrecautions: ['Wear splash goggles; gas evolution generates aerosol bubbles.'],
    defaultParams: {
      particleForm: 0, // 0: Large Chips, 1: Fine Powder
      acidVolumeML: 50
    },
    paramLabels: {
      particleForm: { label: 'Particle Geometry (0: Large Chips, 1: Fine Powder)', unit: 'type', min: 0, max: 1, step: 1 },
      acidVolumeML: { label: '1.0 M HCl Volume', unit: 'mL', min: 25, max: 100, step: 25 }
    },
    graphConfig: {
      xLabel: 'Time Elapsed',
      yLabel: 'Volume of CO₂ Gas Evolved',
      xUnit: 's',
      yUnit: 'mL'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Test Large Marble Chips',
        instruction: 'Add 2.0 g large chips to flask, inject 25 mL 1M HCl, and record gas syringe volume every 10 seconds.',
        actionKey: 'mix_reagents',
        hint: 'Observe steady, gradual gas evolution.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Test Equal Mass of Fine Powder',
        instruction: 'Repeat using 2.0 g finely pulverized marble powder.',
        actionKey: 'mix_reagents',
        hint: 'Gas syringe fills rapidly in seconds due to massive surface area.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why does marble powder react far more rapidly with hydrochloric acid than large marble chips of identical mass?',
        options: [
          'Powder is a completely different chemical compound',
          'Pulverizing the solid dramatically increases exposed contact surface area accessible to acid collisions',
          'Powder is hotter',
          'Powder dissolves in air'
        ],
        correctIndex: 1,
        explanation: 'Heterogeneous reactions occur only at interfaces; powder provides orders of magnitude more surface sites.'
      },
      {
        id: 'q2',
        question: 'If both trials used exactly 2.0 g of pure CaCO₃ with excess acid, how do the FINAL total volumes of CO₂ gas compare?',
        options: ['Powder produces double the total gas', 'Large chips produce more gas', 'Both produce the exact same final total gas volume (stoichiometric conservation of mass)', 'Chips produce zero gas'],
        correctIndex: 2,
        explanation: 'Surface area changes the rate, but total yield is governed strictly by stoichiometry and mass of limiting reactant.'
      },
      {
        id: 'q3',
        question: 'Which industrial hazard is caused by extremely high surface-area combustible powders in air?',
        options: ['Dust explosions (e.g. grain elevators, flour mills, coal mines)', 'Rusting', 'Condensation', 'Freeze drying'],
        correctIndex: 0,
        explanation: 'Fine combustible powders suspended in air possess enormous surface area, detonating in devastating dust explosions if ignited.'
      }
    ]
  },
  {
    id: 'exp_catalysis',
    title: 'Homogeneous vs. Heterogeneous Catalysis',
    category: 'reactions',
    difficulty: 'Intermediate',
    duration: '10 min',
    principle: 'Catalysts lower the activation energy barrier by providing an alternative reaction mechanism without being consumed in the net stoichiometric reaction.',
    equation: '2 H₂O₂ (aq) —[MnO₂ (s) or Fe³⁺ (aq)]→ 2 H₂O (l) + O₂ (g)↑',
    learningObjectives: [
      'Compare uncatalyzed decomposition of hydrogen peroxide with heterogeneous (MnO₂ solid) and homogeneous (Fe³⁺ dissolved).',
      'Demonstrate that the catalyst is chemically unchanged at the end of reaction.',
      'Perform glowing splint oxygen gas verification test.'
    ],
    requiredApparatus: ['Gas Syringe / Delivery Tube', 'Test Tubes', 'Wooden Splints', 'Bunsen Burner'],
    requiredReagents: ['3% or 6% Hydrogen Peroxide (H₂O₂)', 'Manganese Dioxide powder (MnO₂)', '0.1 M Iron(III) Nitrate (Fe³⁺)'],
    safetyPrecautions: ['H₂O₂ bleaches skin; wear gloves and goggles.'],
    defaultParams: {
      catalystType: 0, // 0: None, 1: Fe3+ Homogeneous, 2: MnO2 Heterogeneous
      h2o2VolumeML: 20
    },
    paramLabels: {
      catalystType: { label: 'Catalyst (0: None, 1: Fe³⁺, 2: MnO₂)', unit: 'type', min: 0, max: 2, step: 1 },
      h2o2VolumeML: { label: 'H₂O₂ Volume Added', unit: 'mL', min: 10, max: 50, step: 5 }
    },
    graphConfig: {
      xLabel: 'Time Elapsed',
      yLabel: 'Oxygen Gas Evolved',
      xUnit: 's',
      yUnit: 'mL'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Observe Uncatalyzed H₂O₂',
        instruction: 'Inspect 20 mL of 6% H₂O₂ in test tube; note negligible bubbling at room temperature.',
        actionKey: 'add_reagent',
        hint: 'High activation energy prevents spontaneous rapid breakdown.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Add Micro-Spatula of Black MnO₂ Powder',
        instruction: 'Add 0.05 g MnO₂; observe violent effervescence of pure oxygen gas.',
        actionKey: 'mix_reagents',
        hint: 'Rapid vigorous frothing releases O₂ gas.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'How does a catalyst increase the rate of a chemical reaction?',
        options: [
          'By increasing the temperature',
          'By providing an alternative reaction pathway with a lower activation energy',
          'By being consumed to produce more products',
          'By increasing the volume of solvent'
        ],
        correctIndex: 1,
        explanation: 'Catalysts lower the energetic mountain (Ea), allowing a greater fraction of ambient collisions to react.'
      },
      {
        id: 'q2',
        question: 'What is the definition of a HETEROGENEOUS catalyst?',
        options: ['A catalyst that is in a different phase (e.g. solid MnO₂ in liquid H₂O₂)', 'A catalyst in the same phase', 'A biological enzyme', 'A gaseous reactant'],
        correctIndex: 0,
        explanation: 'Heterogeneous catalysts exist in a distinct physical phase from reactants, typically solid surface catalysts.'
      },
      {
        id: 'q3',
        question: 'What gas test confirms that the bubbles generated from H₂O₂ decomposition are pure oxygen?',
        options: ['Extinguishes a burning splint', 'Relights a glowing wooden splint', 'Turns limewater milky', 'Pops with a squeaky sound'],
        correctIndex: 1,
        explanation: 'Oxygen supports rapid combustion, causing an ember on a glowing wooden splint to burst into flame.'
      }
    ]
  },
  {
    id: 'exp_precipitation_rules',
    title: 'Precipitation Reactions & Solubility Rules',
    category: 'reactions',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'When aqueous solutions of soluble salts are mixed, double-displacement occurs. If ion product Qsp exceeds solubility product Ksp for any ion pair, a solid precipitate immediately forms.',
    equation: 'AgNO₃ (aq) + NaCl (aq) → AgCl (s)↓ (white) + NaNO₃ (aq)',
    learningObjectives: [
      'Apply solubility rules (all nitrates soluble, silver halides insoluble, barium sulfate insoluble).',
      'Write molecular, complete ionic, and net ionic equations.',
      'Identify spectator ions in precipitation reactions.'
    ],
    requiredApparatus: ['Spot Plate / Well Plate', 'Dropper Bottles', 'Waste Beaker'],
    requiredReagents: ['0.1 M AgNO₃', '0.1 M NaCl', '0.1 M BaCl₂', '0.1 M Na₂SO₄', '0.1 M KI', '0.1 M Pb(NO₃)₂'],
    safetyPrecautions: ['Lead and silver salts are heavy metal hazards; collect all residues in heavy metal waste.'],
    defaultParams: {
      reactionPair: 0 // 0: AgCl white, 1: PbI2 bright yellow, 2: BaSO4 white
    },
    paramLabels: {
      reactionPair: { label: 'Precipitate System (0: AgCl, 1: PbI₂, 2: BaSO₄)', unit: 'type', min: 0, max: 2, step: 1 }
    },
    graphConfig: {
      xLabel: 'Reactant Reagent Drops Added',
      yLabel: 'Precipitate Turbidity Index',
      xUnit: 'drops',
      yUnit: 'NTU'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Combine Silver Nitrate & Sodium Chloride',
        instruction: 'Add 5 drops of AgNO₃ into well plate, then add 5 drops of NaCl.',
        actionKey: 'mix_reagents',
        hint: 'Instant curd-white AgCl precipitate appears.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Combine Lead Nitrate & Potassium Iodide',
        instruction: 'Mix Pb(NO₃)₂ with KI; observe brilliant "golden rain" canary-yellow PbI₂ precipitate.',
        actionKey: 'mix_reagents',
        hint: 'Spectacular bright yellow precipitate demonstrates iodide insolubility.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the net ionic equation for the reaction between aqueous Silver Nitrate and Sodium Chloride?',
        options: [
          'AgNO₃ + NaCl → AgCl + NaNO₃',
          'Ag⁺ (aq) + Cl⁻ (aq) → AgCl (s)',
          'Na⁺ (aq) + NO₃⁻ (aq) → NaNO₃ (s)',
          'Ag⁺ + Na⁺ → AgNa'
        ],
        correctIndex: 1,
        explanation: 'Spectator ions (Na⁺ and NO₃⁻) cancel out, leaving the net precipitation of Ag⁺ and Cl⁻.'
      },
      {
        id: 'q2',
        question: 'Which of the following common salts is ALWAYS 100% soluble in water with zero precipitation exceptions?',
        options: ['All Nitrate salts (NO₃⁻)', 'All Chloride salts', 'All Sulfate salts', 'All Carbonate salts'],
        correctIndex: 0,
        explanation: 'All nitrate (NO₃⁻) and Group 1 alkali metal salts are soluble without exception.'
      },
      {
        id: 'q3',
        question: 'What color is the lead(II) iodide precipitate (PbI₂) formed when mixing lead nitrate and potassium iodide?',
        options: ['Snow white', 'Brilliant canary yellow', 'Jet black', 'Sky blue'],
        correctIndex: 1,
        explanation: 'Lead iodide forms an unmistakable brilliant golden-yellow crystalline precipitate.'
      }
    ]
  },
  {
    id: 'exp_redox_activity',
    title: 'Redox Reactions & Metal Activity Series',
    category: 'reactions',
    difficulty: 'Intermediate',
    duration: '12 min',
    principle: 'Single displacement reactions occur spontaneously if the elemental metal is more readily oxidized (higher in the galvanic activity series) than the metal cation in solution.',
    equation: 'Zn (s) + Cu²⁺ (aq) → Zn²⁺ (aq) + Cu (s)↓   (Zinc is oxidized, Copper is reduced)',
    learningObjectives: [
      'Observe zinc strip displacing blue copper(II) ions, plating reddish-brown metallic copper.',
      'Rank metals (Mg > Zn > Fe > Cu > Ag) by relative oxidation potential.',
      'Differentiate reducing agents (electron donors) from oxidizing agents (electron acceptors).'
    ],
    requiredApparatus: ['Polished Metal Strips (Zn, Cu, Fe, Mg)', 'Emery Sandpaper', 'Test Tubes'],
    requiredReagents: ['0.5 M CuSO₄', '0.5 M ZnSO₄', '0.5 M FeSO₄', '0.1 M AgNO₃'],
    safetyPrecautions: ['Silver nitrate stains skin black; handle strips with forceps.'],
    defaultParams: {
      metalChoice: 0, // 0: Zinc in Cu2+, 1: Copper in Ag+, 2: Iron in Cu2+
      exposureTimeMin: 5
    },
    paramLabels: {
      metalChoice: { label: 'Metal/Solution Pair (0: Zn/Cu²⁺, 1: Cu/Ag⁺, 2: Fe/Cu²⁺)', unit: 'type', min: 0, max: 2, step: 1 },
      exposureTimeMin: { label: 'Immersion Time', unit: 'min', min: 1, max: 15, step: 1 }
    },
    graphConfig: {
      xLabel: 'Immersion Time',
      yLabel: 'Plated Metal Mass Deposited',
      xUnit: 'min',
      yUnit: 'mg'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Polish Zinc Strip with Sandpaper',
        instruction: 'Remove oxide tarnish from zinc strip until shiny metallic luster appears.',
        actionKey: 'prepare_filter',
        hint: 'Exposes raw metallic surface for electron exchange.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Immerse Zinc into Blue Copper Sulfate',
        instruction: 'Place strip into 0.5 M CuSO₄; observe dark red-brown spongy copper deposit and fading blue color.',
        actionKey: 'mix_reagents',
        hint: 'Cu²⁺ ions accept electrons from Zn atoms and plate out as neutral Cu metal.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'In the reaction Zn (s) + CuSO₄ (aq) → ZnSO₄ (aq) + Cu (s), which species is OXIDIZED?',
        options: ['Zinc (Zn) loses 2 electrons to become Zn²⁺', 'Copper (Cu²⁺)', 'Sulfate (SO₄²⁻)', 'Water'],
        correctIndex: 0,
        explanation: 'Oxidation is loss of electrons (OIL RIG): Zn(s) → Zn²⁺ + 2e⁻.'
      },
      {
        id: 'q2',
        question: 'What happens if a piece of pure Copper wire is placed into a Zinc Sulfate (ZnSO₄) solution?',
        options: ['Violent explosion', 'No spontaneous reaction occurs because copper is less active than zinc', 'Zinc plates onto copper', 'Copper dissolves into gas'],
        correctIndex: 1,
        explanation: 'Copper is lower than zinc on the activity series and cannot reduce Zn²⁺ ions spontaneously.'
      },
      {
        id: 'q3',
        question: 'Why does the blue color of the CuSO₄ solution gradually fade as zinc dissolves?',
        options: ['The beaker is leaking', 'Hydrated blue Cu²⁺ ions are consumed from solution and replaced by colorless Zn²⁺ ions', 'Light is absorbed by zinc', 'Water evaporates'],
        correctIndex: 1,
        explanation: 'The characteristic blue color is caused by d-d electron transitions in [Cu(H₂O)₆]²⁺; as it plates out, the solution clears.'
      }
    ]
  },
  {
    id: 'exp_corrosion_protection',
    title: 'Metal Corrosion & Sacrificial Anode Protection',
    category: 'reactions',
    difficulty: 'Intermediate',
    duration: '12 min',
    principle: 'Galvanic protection couples iron with a more active sacrificial metal (e.g. Zinc or Magnesium). The sacrificial metal oxidizes preferentially, delivering cathodic electrons to preserve iron.',
    equation: 'Fe → Fe²⁺ + 2e⁻ (Rusting) vs. Zn → Zn²⁺ + 2e⁻ (Sacrificial protection: E° = -0.76 V vs -0.44 V)',
    learningObjectives: [
      'Compare rusting of unprotected iron nail vs nail wrapped in zinc vs nail wrapped in copper.',
      'Use potassium ferricyanide indicator to detect Fe²⁺ ions (Prussian blue color).',
      'Understand cathodic protection applied on ship hulls, underground pipelines, and hot water tanks.'
    ],
    requiredApparatus: ['Petri Dishes with Agar Gel', 'Clean Iron Nails', 'Zinc & Copper Wire'],
    requiredReagents: ['Warm Agar gel containing Phenolphthalein and Potassium Ferricyanide K₃[Fe(CN)₆]'],
    safetyPrecautions: ['Wear gloves; handle ferricyanide solutions safely.'],
    defaultParams: {
      protectionMode: 0 // 0: Bare Iron, 1: Zn Sacrificial Anode, 2: Cu Cathode Acceleration
    },
    paramLabels: {
      protectionMode: { label: 'Configuration (0: Bare Fe, 1: Fe+Zn Protected, 2: Fe+Cu Accelerated)', unit: 'mode', min: 0, max: 2, step: 1 }
    },
    graphConfig: {
      xLabel: 'Elapsed Exposure Time',
      yLabel: 'Prussian Blue Corrosion Intensity',
      xUnit: 'hours',
      yUnit: 'AU'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Wrap Nail with Zinc Wire',
        instruction: 'Tightly wrap a clean iron nail with coils of zinc wire and place into indicator agar.',
        actionKey: 'prepare_filter',
        hint: 'Zinc is more active and will sacrifice itself.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Examine Prussian Blue Indicators',
        instruction: 'Observe agar after 2 hours: bare iron shows deep blue (Fe²⁺ corrosion); zinc-wrapped nail shows pink (OH⁻ protection).',
        actionKey: 'record_reading',
        hint: 'Complete protection is verified by zero blue coloration around iron.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why does wrapping an iron nail in Zinc prevent the iron from rusting?',
        options: [
          'Zinc is more active (more easily oxidized) than iron and acts as a sacrificial anode, donating electrons to iron',
          'Zinc smells bad to oxygen',
          'Zinc turns into water',
          'Iron becomes plastic'
        ],
        correctIndex: 0,
        explanation: 'Zinc has a more negative reduction potential (-0.76 V vs -0.44 V), corroding first to cathodically protect iron.'
      },
      {
        id: 'q2',
        question: 'What happens to the rusting of iron if it is coupled to COPPER (a less active metal)?',
        options: ['Rusting is prevented', 'Iron corrodes even FASTER because copper acts as a large cathode accelerating iron oxidation', 'No effect', 'Copper dissolves'],
        correctIndex: 1,
        explanation: 'Coupling to a less active metal accelerates corrosion of the more active partner (galvanic corrosion disaster).'
      },
      {
        id: 'q3',
        question: 'Where is sacrificial anode protection universally used in real-world engineering?',
        options: ['Steel ship hulls, underground gas pipelines, and home water heaters', 'Plastic toys', 'Wooden furniture', 'Glass windows'],
        correctIndex: 0,
        explanation: 'Zinc or magnesium blocks bolted to ship hulls and pipelines corrode away over time, saving multimillion-dollar steel structures.'
      }
    ]
  },
  {
    id: 'exp_polymers',
    title: 'Polymer Synthesis & Cross-Linking Hydrogel',
    category: 'reactions',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'Linear polymer chains of polyvinyl alcohol (PVA) are linked into an elastic viscoelastic 3D hydrogel network via dynamic borate ion hydrogen-bonding bridges.',
    equation: '2 PVA chains + B(OH)₄⁻ ⇌ Viscoelastic Borate Cross-linked Hydrogel + 2 H₂O',
    learningObjectives: [
      'Synthesize viscoelastic cross-linked polymer slime.',
      'Demonstrate how cross-link density alters viscosity and elasticity.',
      'Observe non-Newtonian shear-thickening vs shear-thinning fluid behavior.'
    ],
    requiredApparatus: ['Beakers', 'Wooden Stirring Rods', 'Graduated Cylinders'],
    requiredReagents: ['4% Polyvinyl Alcohol (PVA) solution', '4% Sodium Tetraborate (Borax) solution', 'Food Coloring'],
    safetyPrecautions: ['Do not ingest slime; wash hands after handling.'],
    defaultParams: {
      boraxVolumeML: 5.0,
      pvaVolumeML: 30.0
    },
    paramLabels: {
      boraxVolumeML: { label: 'Borate Crosslinker Volume', unit: 'mL', min: 1.0, max: 10.0, step: 1.0 },
      pvaVolumeML: { label: 'PVA Base Polymer Volume', unit: 'mL', min: 20.0, max: 50.0, step: 5.0 }
    },
    graphConfig: {
      xLabel: 'Crosslinker Ratio [Borax/PVA]',
      yLabel: 'Viscoelastic Modulus G\'',
      xUnit: 'ratio',
      yUnit: 'Pa'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Dispense 4% Polyvinyl Alcohol',
        instruction: 'Pour 30 mL PVA into beaker and add 1 drop green dye.',
        actionKey: 'pour_liquid',
        hint: 'Linear flexible polymer solution.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Add Borate and Stir Vigorously',
        instruction: 'Add 5 mL borax solution and stir rapidly as mixture gels into viscoelastic slime.',
        actionKey: 'mix_reagents',
        hint: 'Borate ions bridge hydroxyl groups between adjacent PVA chains.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What microscopic structural change occurs when borax is added to polyvinyl alcohol (PVA)?',
        options: [
          'The polymer chains are completely destroyed',
          'Borate ions form cross-linking bridges between adjacent linear PVA chains, creating a 3D network that traps water',
          'PVA turns into solid stone',
          'PVA evaporates into steam'
        ],
        correctIndex: 1,
        explanation: 'Cross-linking ties individual sliding chains into a unified matrix that traps water in a viscoelastic gel.'
      },
      {
        id: 'q2',
        question: 'Slime behaves as a non-Newtonian fluid. What happens if you pull it apart VERY RAPIDLY versus SLOWLY?',
        options: [
          'Pulling rapidly breaks it with a snap, while pulling slowly allows chains to relax and flow like liquid',
          'Pulling rapidly makes it boil',
          'It always breaks identically',
          'It vanishes'
        ],
        correctIndex: 0,
        explanation: 'Dynamic hydrogen bonds can rearrange if given time (viscous flow), but snap under sudden high shear strain.'
      },
      {
        id: 'q3',
        question: 'What happens to the cross-links if you add a strong acid (like dilute HCl) to the slime?',
        options: ['The slime becomes harder', 'Acid protonates borate ions into neutral boric acid, breaking cross-links and turning slime back into liquid PVA', 'It catches fire', 'Nothing happens'],
        correctIndex: 1,
        explanation: 'Protonation converts B(OH)₄⁻ into B(OH)₃, destroying the negative charge and dismantling the cross-links.'
      }
    ]
  },
  {
    id: 'exp_calorimetry_enthalpy',
    title: 'Calorimetry: Exothermic vs. Endothermic Enthalpy',
    category: 'reactions',
    difficulty: 'Intermediate',
    duration: '15 min',
    principle: 'Measuring thermal energy exchange during chemical dissolution in an insulated coffee-cup calorimeter allows quantitative calculation of molar enthalpy of solution (ΔH_soln).',
    equation: 'q_rxn = -(m_water · c_p · ΔT)   and   ΔH_soln = q_rxn / n_solute',
    learningObjectives: [
      'Compare exothermic dissolution of Calcium Chloride (CaCl₂: ΔH = -81 kJ/mol) with endothermic Ammonium Nitrate (NH₄NO₃: ΔH = +25.7 kJ/mol).',
      'Calculate calorimeter heat exchange using specific heat of water (4.184 J/g°C).',
      'Explain heat packs vs instant cold packs.'
    ],
    requiredApparatus: ['Styrofoam Cup Calorimeter & Lid', 'Precision Digital Thermometer', 'Analytical Balance'],
    requiredReagents: ['Calcium Chloride Anhydrous (CaCl₂)', 'Ammonium Nitrate (NH₄NO₃)', 'Deionized Water'],
    safetyPrecautions: ['NH₄NO₃ is an oxidizer; handle with clean spatulas.'],
    defaultParams: {
      soluteChoice: 0, // 0: CaCl2 (Exothermic), 1: NH4NO3 (Endothermic)
      soluteMassG: 5.0,
      waterVolumeML: 50.0
    },
    paramLabels: {
      soluteChoice: { label: 'Salt Type (0: CaCl₂ Exothermic, 1: NH₄NO₃ Endothermic)', unit: 'type', min: 0, max: 1, step: 1 },
      soluteMassG: { label: 'Salt Mass Added', unit: 'g', min: 2.0, max: 10.0, step: 1.0 },
      waterVolumeML: { label: 'Water Mass in Calorimeter', unit: 'mL', min: 25.0, max: 100.0, step: 25.0 }
    },
    graphConfig: {
      xLabel: 'Time Elapsed',
      yLabel: 'Calorimeter Water Temperature',
      xUnit: 's',
      yUnit: '°C'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Record Initial Baseline Water Temperature',
        instruction: 'Measure 50.0 mL water in calorimeter cup; record stable initial temperature (~21.5°C).',
        actionKey: 'measure_temp',
        hint: 'Baseline calibration is essential.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Add Salt, Stir, and Record Peak/Trough Temp',
        instruction: 'Add 5.0 g salt, seal lid with thermometer, swirl gently, and record maximum or minimum temperature.',
        actionKey: 'mix_reagents',
        hint: 'CaCl₂ jumps to ~37°C; NH₄NO₃ drops to ~14°C.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'When Ammonium Nitrate (NH₄NO₃) dissolves in water, the temperature drops from 22°C to 14°C. This process is:',
        options: ['Exothermic with negative ΔH', 'Endothermic with positive ΔH (absorbs thermal energy from surrounding water)', 'Non-spontaneous', 'An oxidation reaction'],
        correctIndex: 1,
        explanation: 'Lattice dissociation requires more energy than hydration releases, absorbing heat from water (instant cold pack).'
      },
      {
        id: 'q2',
        question: 'Calculate heat absorbed (q) if 50.0 g of water increases by 10.0°C (specific heat c = 4.184 J/g°C):',
        options: ['41.8 J', '209.2 J', '2092 J (2.09 kJ)', '500 J'],
        correctIndex: 2,
        explanation: 'q = m · c · ΔT = 50.0 g × 4.184 J/(g·°C) × 10.0°C = 2092 J.'
      },
      {
        id: 'q3',
        question: 'Why is an expanded polystyrene (Styrofoam) cup used as a calorimeter body?',
        options: ['It is cheap', 'It has high thermal insulation, minimizing heat loss to the room environment', 'It catalyzes the reaction', 'It reacts with salt'],
        correctIndex: 1,
        explanation: 'Low thermal conductivity traps virtually all heat inside the water for accurate enthalpy measurement.'
      }
    ]
  },
  {
    id: 'exp_conservation_mass',
    title: 'Conservation of Mass: Closed vs. Open Systems',
    category: 'reactions',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'Antoine Lavoisier\'s Law of Conservation of Mass: Matter is neither created nor destroyed in chemical reactions. Apparent mass loss only occurs in open systems where gaseous products escape.',
    equation: 'Open: CaCO₃ (s) + 2 HCl (aq) → CaCl₂ + H₂O + CO₂ (g)↑ (Apparent mass loss) vs Closed: Mass_initial = Mass_final',
    learningObjectives: [
      'Prove conservation of mass in a precipitation reaction on a 4-decimal balance.',
      'Demonstrate apparent mass decrease during gas release in open flask.',
      'Seal vessel with rubber balloon to capture gas and prove total mass remains constant.'
    ],
    requiredApparatus: ['Precision Analytical Balance (0.0001g)', 'Erlenmeyer Flask & Rubber Balloon', 'Weigh Boats'],
    requiredReagents: ['Sodium Bicarbonate (NaHCO₃)', 'Acetic Acid (Vinegar)', 'NaCl', 'AgNO₃'],
    safetyPrecautions: ['Ensure balloon is rated for low pressure; do not over-pressurize glass flask.'],
    defaultParams: {
      systemType: 0, // 0: Open System, 1: Closed System with Balloon
      bicarbMassG: 3.0
    },
    paramLabels: {
      systemType: { label: 'System Boundary (0: Open Flask, 1: Closed Balloon)', unit: 'type', min: 0, max: 1, step: 1 },
      bicarbMassG: { label: 'Bicarbonate Reactant Mass', unit: 'g', min: 1.0, max: 5.0, step: 0.5 }
    },
    graphConfig: {
      xLabel: 'Time Elapsed',
      yLabel: 'Total Balance Mass',
      xUnit: 's',
      yUnit: 'g'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Tare and Record Total Initial Mass',
        instruction: 'Weigh flask containing vinegar together with balloon containing baking soda before mixing.',
        actionKey: 'weigh_sample',
        hint: 'All reactants and containment apparatus are accounted for on balance.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Tip Baking Soda into Vinegar & Monitor Balance',
        instruction: 'Tip balloon upright so powder dumps into acid; watch balloon inflate with CO₂ while balance readout stays constant.',
        actionKey: 'mix_reagents',
        hint: 'Mass remains exactly identical to 0.001 g in closed system!',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'When baking soda reacts with vinegar in an OPEN beaker on a balance, the reading decreases by 1.2 g. Why?',
        options: [
          'Mass was destroyed in the reaction',
          'Carbon dioxide gas (CO₂) escaped into the atmosphere',
          'The beaker became lighter due to thermal expansion',
          'The balance malfunctioned'
        ],
        correctIndex: 1,
        explanation: 'In an open system, 1.2 g of CO₂ gas left the container into the room; total universe mass was conserved.'
      },
      {
        id: 'q2',
        question: 'When the same reaction is carried out in a CLOSED sealed flask with an attached balloon, what happens to the total balance reading?',
        options: ['Decreases by 1.2 g', 'Increases by 1.2 g', 'Remains completely unchanged', 'Drops to zero'],
        correctIndex: 2,
        explanation: 'Because no atoms could cross the closed boundary, the total mass remains strictly invariant.'
      },
      {
        id: 'q3',
        question: 'Who is historically credited with formulating the Law of Conservation of Mass in 1789?',
        options: ['Antoine Lavoisier', 'Isaac Newton', 'Albert Einstein', 'Dmitri Mendeleev'],
        correctIndex: 0,
        explanation: 'Lavoisier proved that mass is conserved in chemical reactions using meticulous closed-vessel balance measurements.'
      }
    ]
  },

  // ========================================================
  // 3. ANALYTICAL CHEMISTRY (EXPERIMENTS 21 - 28)
  // ========================================================
  {
    id: 'exp_acid_base_titration',
    title: 'Virtual Acid-Base Titration with Live pH Curve',
    category: 'analytical',
    difficulty: 'Intermediate',
    duration: '15 min',
    principle: 'Quantitative volumetric analysis determining unknown acid concentration by incrementally adding standardized titrant base until stoichiometric equivalence point, marked by a steep inflection jump on the pH curve.',
    equation: 'HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l)   (At Equivalence: M_acid · V_acid = M_base · V_base)',
    learningObjectives: [
      'Perform micro-drop titrant addition near equivalence to capture the steep vertical pH inflection.',
      'Identify the equivalence volume (V_eq = 25.00 mL) and equivalence pH (7.00 for strong acid/base).',
      'Calculate unknown acid molarity with 4 significant figures.'
    ],
    requiredApparatus: ['50.00 mL Class-A Burette with Teflon Stopcock', '250 mL Erlenmeyer Flask', 'Digital pH Meter & Electrode', 'Magnetic Stirrer'],
    requiredReagents: ['Standardized 0.1000 M NaOH', 'Unknown HCl Solution (25.00 mL aliquot)', 'Phenolphthalein Indicator'],
    safetyPrecautions: ['Both reagents are corrosive; wear ANSI splash goggles.'],
    defaultParams: {
      titrantVolumeML: 0.0,
      acidConcM: 0.1000,
      baseConcM: 0.1000
    },
    paramLabels: {
      titrantVolumeML: { label: 'NaOH Titrant Dispensed', unit: 'mL', min: 0.0, max: 50.0, step: 0.5 },
      acidConcM: { label: 'Analyte Acid Molarity', unit: 'M', min: 0.05, max: 0.20, step: 0.01 },
      baseConcM: { label: 'Standard Titrant Molarity', unit: 'M', min: 0.05, max: 0.20, step: 0.01 }
    },
    graphConfig: {
      xLabel: 'Volume of 0.1000 M NaOH Added',
      yLabel: 'Solution pH',
      xUnit: 'mL',
      yUnit: 'pH'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Fill Burette & Clear Air Bubble from Tip',
        instruction: 'Flush burette with standard NaOH, fill past zero mark, and dispense brief burst to eliminate air bubble trapped below stopcock.',
        actionKey: 'prepare_filter',
        hint: 'An air bubble trapped in the tip causes false volume measurement.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Add Phenolphthalein & Record Initial pH',
        instruction: 'Add 2 drops phenolphthalein to 25.00 mL acid sample; solution is water-clear at pH 1.00.',
        actionKey: 'add_indicator',
        hint: 'Observe baseline clear solution.',
        isCompleted: false
      },
      {
        id: 'step_3',
        title: 'Titrate to Faint Permanent Pink Endpoint',
        instruction: 'Dispense NaOH in increments, swirling flask. Near 24.5 mL, add dropwise until single half-drop creates faint pink lasting 30 seconds.',
        actionKey: 'record_reading',
        hint: 'Watch the pH curve rocket vertically through pH 7.00 equivalence.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the stoichiometric equivalence point in an acid-base titration?',
        options: [
          'When the indicator turns completely dark magenta',
          'The exact point where moles of added base titrant equal moles of initial acid analyte (mol H⁺ = mol OH⁻)',
          'When the flask overflows',
          'When the burette is empty'
        ],
        correctIndex: 1,
        explanation: 'Equivalence is theoretical stoichiometric equality; endpoint is the visual indicator signal.'
      },
      {
        id: 'q2',
        question: 'If 25.00 mL of unknown HCl requires exactly 20.00 mL of 0.1000 M NaOH to reach equivalence, what is the acid molarity?',
        options: ['0.0500 M', '0.0800 M', '0.1000 M', '0.1250 M'],
        correctIndex: 1,
        explanation: 'M_acid = (M_base × V_base) / V_acid = (0.1000 M × 20.00 mL) / 25.00 mL = 0.0800 M.'
      },
      {
        id: 'q3',
        question: 'Why does the pH change by multiple full units with just one single drop of titrant near the equivalence point?',
        options: [
          'Because pH is a logarithmic scale and remaining [H⁺] is extremely small near neutrality',
          'The meter breaks',
          'The temperature boils',
          'Indicator decomposes'
        ],
        correctIndex: 0,
        explanation: 'At pH 6, [H⁺] is 10⁻⁶ M; a micro-drop of 0.1M base swamps this tiny residual concentration instantly to excess OH⁻.'
      }
    ]
  },
  {
    id: 'exp_calibration_curves',
    title: 'Standard Calibration Curves & Unknown Analysis',
    category: 'analytical',
    difficulty: 'Intermediate',
    duration: '12 min',
    principle: 'Preparation of serial standard solutions of known concentrations allows construction of a linear calibration curve (y = mx + b). The unknown sample concentration is then calculated by interpolation.',
    equation: 'y = m · x + b   (Interpolation: x_unknown = (y_measured - b) / m)',
    learningObjectives: [
      'Prepare 5 standard concentrations by volumetric serial dilution.',
      'Measure absorbance on spectrophotometer and compute linear least-squares regression line (R² > 0.998).',
      'Interpolate unknown sample concentration with statistical confidence intervals.'
    ],
    requiredApparatus: ['Spectrophotometer / Colorimeter', '10.00 mL Volumetric Pipettes', 'Matching Optical Cuvettes'],
    requiredReagents: ['Food Dye Standard Stock (100 mg/L)', 'Unknown Concentration Water Sample'],
    safetyPrecautions: ['Wipe optical faces of cuvettes with lint-free lens paper; avoid fingerprints.'],
    defaultParams: {
      standardConcRange: 50,
      unknownAbsorbance: 0.420
    },
    paramLabels: {
      standardConcRange: { label: 'Stock Max Concentration', unit: 'mg/L', min: 20, max: 100, step: 10 },
      unknownAbsorbance: { label: 'Unknown Sample Absorbance', unit: 'AU', min: 0.1, max: 1.2, step: 0.05 }
    },
    graphConfig: {
      xLabel: 'Standard Concentration',
      yLabel: 'Measured Absorbance',
      xUnit: 'mg/L',
      yUnit: 'AU'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Zero Instrument with Solvent Blank',
        instruction: 'Insert deionized water cuvette and press "Blank / Zero" to set 0.000 AU.',
        actionKey: 'calibrate_sensor',
        hint: 'Subtracts optical background of water and glass.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Measure 5 Standards and Fit Line',
        instruction: 'Measure absorbances of 10, 20, 30, 40, 50 mg/L standards and plot linear fit.',
        actionKey: 'record_reading',
        hint: 'Points form a clean straight line.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the purpose of measuring a "solvent blank" before testing samples?',
        options: ['To clean the machine', 'To zero out absorbance from the cuvette walls and solvent so only solute absorbance is measured', 'To warm the light bulb', 'To check wavelength'],
        correctIndex: 1,
        explanation: 'Blanking establishes baseline transmission (100% T, 0.000 AU) through solvent and glass.'
      },
      {
        id: 'q2',
        question: 'If a calibration curve equation is Absorbance = 0.020 × [Concentration] + 0.010, what is the concentration of an unknown with absorbance 0.510?',
        options: ['10 mg/L', '20 mg/L', '25 mg/L', '50 mg/L'],
        correctIndex: 2,
        explanation: 'Concentration = (0.510 - 0.010) / 0.020 = 0.500 / 0.020 = 25 mg/L.'
      },
      {
        id: 'q3',
        question: 'What does a coefficient of determination R² = 0.999 indicate regarding the calibration curve?',
        options: ['Poor random scatter', 'Exceptional linearity and precision of experimental standard data', 'The machine is broken', 'Zero concentration'],
        correctIndex: 1,
        explanation: 'An R² value near 1.000 confirms that 99.9% of variance is explained by the linear model.'
      }
    ]
  },
  {
    id: 'exp_colorimetry',
    title: 'Colorimetry & Concentration Verification',
    category: 'analytical',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'Complementary color absorption: A colored solution absorbs the specific wavelength of light complementary to its transmitted visual color (e.g. blue copper solutions strongly absorb orange/red light at 620-650 nm).',
    equation: 'Transmittance T = I / I₀   and   Absorbance A = -log₁₀(T)',
    learningObjectives: [
      'Select optimum analytical wavelength (λ_max) using complementary color principles.',
      'Compare light attenuation across light path lengths.',
      'Verify unknown concentrations using LED colorimeter filters.'
    ],
    requiredApparatus: ['Digital Colorimeter with Red, Green, Blue LED filters', 'Cuvette Rack'],
    requiredReagents: ['Copper(II) Sulfate Solutions (0.05 M to 0.40 M)', 'Unknown Blue Solution'],
    safetyPrecautions: ['Dispose of copper solutions in heavy metal waste.'],
    defaultParams: {
      filterWavelengthNM: 630, // Red/Orange filter for blue Cu2+
      cuConcM: 0.20
    },
    paramLabels: {
      filterWavelengthNM: { label: 'LED Filter Wavelength', unit: 'nm', min: 430, max: 660, step: 50 },
      cuConcM: { label: 'Cu²⁺ Concentration', unit: 'M', min: 0.05, max: 0.50, step: 0.05 }
    },
    graphConfig: {
      xLabel: 'CuSO₄ Concentration',
      yLabel: 'Absorbance at 630 nm',
      xUnit: 'M',
      yUnit: 'AU'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Select Complementary Filter (Red 630 nm)',
        instruction: 'Rotate colorimeter dial to red filter (~630 nm) to match maximum absorbance of blue copper solution.',
        actionKey: 'calibrate_sensor',
        hint: 'Blue solutions transmit blue light and absorb red/orange light.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Measure Unknown Blue Solution',
        instruction: 'Insert unknown sample cuvette, read absorbance, and match against concentration standard curve.',
        actionKey: 'record_reading',
        hint: 'Read absorbance to 3 decimal places.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why should a RED LED filter (~630 nm) be selected when measuring a BLUE Copper(II) sulfate solution?',
        options: ['Red is the prettiest color', 'Red is the complementary color to blue, yielding maximum light absorption sensitivity (λ_max)', 'Blue filters break the sensor', 'Red light has more energy'],
        correctIndex: 1,
        explanation: 'Molecules absorb light opposite to their transmitted color on the color wheel for maximum photometric sensitivity.'
      },
      {
        id: 'q2',
        question: 'If a solution absorbs 90% of incident light (Transmittance = 10% = 0.10), what is its Absorbance (A)?',
        options: ['A = 0.10', 'A = 1.00', 'A = 2.00', 'A = 0.50'],
        correctIndex: 1,
        explanation: 'A = -log10(T) = -log10(0.10) = -(-1.00) = 1.00 AU.'
      },
      {
        id: 'q3',
        question: 'What happens to measured absorbance if fingerprints or smudges are left on the cuvette optical windows?',
        options: ['Absorbance falsely increases due to scattering', 'Absorbance decreases', 'No change', 'The machine zeros itself'],
        correctIndex: 0,
        explanation: 'Fingerprint oils scatter light rays away from the detector, reading as false apparent absorption.'
      }
    ]
  },
  {
    id: 'exp_tlc_chromatography',
    title: 'Thin Layer Chromatography (TLC) & Rf Values',
    category: 'analytical',
    difficulty: 'Intermediate',
    duration: '15 min',
    principle: 'Planar chromatographic separation based on partitioning between a stationary polar phase (silica gel SiO₂) and a mobile solvent phase. The Retention Factor (Rf) is a characteristic constant for every compound in a given solvent system.',
    equation: 'R_f = Distance traveled by spot / Distance traveled by solvent front',
    learningObjectives: [
      'Spot micro-samples onto silica gel TLC plates without gouging the coating.',
      'Develop plate in saturated chromatography chamber.',
      'Calculate Rf values for separate dye/amino acid components.'
    ],
    requiredApparatus: ['TLC Developing Chamber with Filter Paper Wick', 'Silica Gel TLC Plates (F254)', 'Glass Capillary Spotters', 'UV Visualization Lamp'],
    requiredReagents: ['Commercial Ink Mixture', 'Standard Dyes', 'Solvent: 70:30 Ethyl Acetate / Hexane'],
    safetyPrecautions: ['Solvents are volatile and flammable; keep chamber sealed under fume hood.'],
    defaultParams: {
      solventFrontMM: 80,
      solute1DistanceMM: 24, // Rf = 0.30
      solute2DistanceMM: 56  // Rf = 0.70
    },
    paramLabels: {
      solventFrontMM: { label: 'Solvent Front Distance', unit: 'mm', min: 50, max: 100, step: 5 },
      solute1DistanceMM: { label: 'Polar Component Spot Distance', unit: 'mm', min: 10, max: 50, step: 2 },
      solute2DistanceMM: { label: 'Non-Polar Component Spot Distance', unit: 'mm', min: 30, max: 90, step: 2 }
    },
    graphConfig: {
      xLabel: 'Compound ID',
      yLabel: 'Retention Factor (Rf Value)',
      xUnit: 'compound',
      yUnit: 'Rf'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Draw Origin Line in Pencil (1.0 cm from base)',
        instruction: 'Use soft pencil to draw origin line 1 cm from bottom of plate (never use ink pen).',
        actionKey: 'prepare_filter',
        hint: 'Ink pens contain pigments that dissolve in solvent, ruining the plate.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Spot Samples & Develop in Chamber',
        instruction: 'Apply tiny spots with capillary tube, place plate into chamber, and allow solvent to migrate up.',
        actionKey: 'pour_liquid',
        hint: 'Remove plate when solvent reaches 1 cm from the top and immediately mark the front.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why must the origin line on a TLC plate ALWAYS be drawn with a pencil and NEVER an ink pen?',
        options: ['Pencil looks neater', 'Ink from a pen will dissolve in the chromatographic solvent and separate into interfering spots', 'Pencil conducts electricity', 'Ink damages silica'],
        correctIndex: 1,
        explanation: 'Pen ink contains soluble dyes that travel up the plate; pencil graphite is insoluble carbon.'
      },
      {
        id: 'q2',
        question: 'If a dye spot travels 45 mm from the origin and the solvent front travels 75 mm, what is the Rf value?',
        options: ['0.45', '0.60', '0.75', '1.67'],
        correctIndex: 1,
        explanation: 'Rf = distance spot / distance front = 45 mm / 75 mm = 0.60.'
      },
      {
        id: 'q3',
        question: 'On a standard polar silica gel plate developed with moderately non-polar solvent, which compound travels the HIGHEST (largest Rf)?',
        options: ['The most polar compound', 'The least polar (most hydrophobic) compound because it interacts weakly with the polar silica', 'The heaviest compound', 'Water'],
        correctIndex: 1,
        explanation: 'Less polar compounds partition favorably into the moving non-polar mobile phase, traveling fastest.'
      }
    ]
  },
  {
    id: 'exp_measurement_uncertainty',
    title: 'Measurement Uncertainty, Accuracy & Precision',
    category: 'analytical',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'Every quantitative physical measurement carries experimental uncertainty. Volumetric glassware accuracy differs drastically between beakers (±5%), graduated cylinders (±0.5%), and volumetric pipettes (±0.05%).',
    equation: 'Percent Error = [|Experimental Mean - True Value| / True Value] × 100%',
    learningObjectives: [
      'Dispense 10.00 mL using beaker vs graduated cylinder vs volumetric pipette.',
      'Weigh dispensed water on 4-decimal balance to calculate actual delivered volume (using density of water at 20°C: 0.9982 g/mL).',
      'Compute standard deviation (precision) and percent error (accuracy).'
    ],
    requiredApparatus: ['10 mL Volumetric Pipette & Bulb', '10 mL Graduated Cylinder', '50 mL Griffin Beaker', 'Analytical Balance'],
    requiredReagents: ['Deionized Degassed Water at 20.0°C'],
    safetyPrecautions: ['Always use a pipette bulb or filler; NEVER pipette by mouth.'],
    defaultParams: {
      dispenserChoice: 0 // 0: Beaker (±5%), 1: Graduated Cylinder (±0.5%), 2: Volumetric Pipette (±0.05%)
    },
    paramLabels: {
      dispenserChoice: { label: 'Glassware Tool (0: Beaker, 1: Grad Cylinder, 2: Vol Pipette)', unit: 'type', min: 0, max: 2, step: 1 }
    },
    graphConfig: {
      xLabel: 'Trial Number (Repeated 10 mL Deliveries)',
      yLabel: 'Measured Mass Delivered',
      xUnit: 'trial',
      yUnit: 'g'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Deliver 10 mL via Griffin Beaker',
        instruction: 'Fill beaker to 10 mL line, pour into tared balance flask, and record delivered mass.',
        actionKey: 'weigh_sample',
        hint: 'Beaker graduation lines are only approximate estimates (±5%).',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Deliver 10.00 mL via Class-A Volumetric Pipette',
        instruction: 'Draw liquid to etched meniscus with bulb and deliver into tared flask.',
        actionKey: 'weigh_sample',
        hint: 'Delivered mass is precisely 9.982 g ± 0.005 g.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which piece of laboratory glassware delivers the HIGHEST precision and lowest volumetric uncertainty for measuring 10.00 mL?',
        options: ['50 mL Griffin Beaker', '10 mL Graduated Cylinder', 'Class-A 10.00 mL Volumetric Pipette', '100 mL Erlenmeyer Flask'],
        correctIndex: 2,
        explanation: 'Class-A volumetric transfer pipettes are individually calibrated to deliver with ±0.02 mL tolerance.'
      },
      {
        id: 'q2',
        question: 'What is the distinction between ACCURACY and PRECISION?',
        options: [
          'They mean the exact same thing',
          'Accuracy is closeness to true value; precision is reproducibility among repeated measurements',
          'Precision means reading big numbers',
          'Accuracy is digital only'
        ],
        correctIndex: 1,
        explanation: 'Measurements can be highly repeatable (precise) while consistently biased away from truth (inaccurate).'
      },
      {
        id: 'q3',
        question: 'Why should a student NEVER pipette liquids by mouth?',
        options: ['It looks unprofessional', 'Extreme risk of accidental ingestion of toxic, corrosive, or carcinogen chemicals and vapor inhalation', 'It introduces saliva enzymes', 'It alters liquid temperature'],
        correctIndex: 1,
        explanation: 'Mouth pipetting was an archaic practice that caused countless poisonings; safety bulbs are mandatory.'
      }
    ]
  },
  {
    id: 'exp_dilution_c1v1',
    title: 'Solution Dilution: C₁V₁ = C₂V₂ Formula Lab',
    category: 'analytical',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'Diluting a concentrated stock solution with pure solvent adds zero solute moles. The total amount of dissolved substance remains strictly constant before and after dilution.',
    equation: 'Moles = C₁ · V₁ = C₂ · V₂   (or   V₁ = [C₂ · V₂] / C₁)',
    learningObjectives: [
      'Calculate volume of 2.00 M stock required to prepare 100.0 mL of 0.250 M target solution.',
      'Accurately transfer stock with volumetric pipette and dilute to mark in volumetric flask.',
      'Invert volumetric flask 10 times to ensure complete osmotic homogenization.'
    ],
    requiredApparatus: ['100.0 mL Class-A Volumetric Flask', 'Volumetric Pipette', 'Wash Bottle'],
    requiredReagents: ['Concentrated 2.00 M Stock Solution (Copper Sulfate or Food Dye)', 'Deionized Water'],
    safetyPrecautions: ['Always add concentrated reagents to water when preparing acid dilutions ("AAA: Always Add Acid").'],
    defaultParams: {
      stockConcM: 2.00,
      targetConcM: 0.25,
      targetVolML: 100.0
    },
    paramLabels: {
      stockConcM: { label: 'Stock Concentration (C₁)', unit: 'M', min: 1.0, max: 5.0, step: 0.5 },
      targetConcM: { label: 'Target Concentration (C₂)', unit: 'M', min: 0.05, max: 0.50, step: 0.05 },
      targetVolML: { label: 'Target Final Volume (V₂)', unit: 'mL', min: 50.0, max: 250.0, step: 50.0 }
    },
    graphConfig: {
      xLabel: 'Desired Target Concentration (C₂)',
      yLabel: 'Required Stock Volume (V₁)',
      xUnit: 'M',
      yUnit: 'mL'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Calculate Required Stock Volume (V₁)',
        instruction: 'Calculate V₁ = (C₂ × V₂) / C₁ = (0.25 M × 100 mL) / 2.00 M = 12.50 mL.',
        actionKey: 'calibrate_sensor',
        hint: 'Use the dilution equation.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Pipette Stock and Fill to Calibration Neck Ring',
        instruction: 'Transfer 12.50 mL into 100 mL flask, add water to bottom of meniscus, stopper, and invert to mix.',
        actionKey: 'invert_mix',
        hint: 'Inverting ensures uniform solution density.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What volume of 6.0 M stock HCl is needed to prepare 500 mL of 0.60 M dilute HCl?',
        options: ['10 mL', '50 mL', '100 mL', '300 mL'],
        correctIndex: 1,
        explanation: 'V1 = (C2 × V2) / C1 = (0.60 M × 500 mL) / 6.0 M = 50.0 mL.'
      },
      {
        id: 'q2',
        question: 'Why does adding water to a solution decrease its concentration while keeping total moles constant?',
        options: [
          'Water reacts with solute',
          'The number of solute molecules remains unchanged while the total liquid volume increases (M = mol / L)',
          'Solute turns into gas',
          'Solute condenses'
        ],
        correctIndex: 1,
        explanation: 'Concentration is moles per unit volume; increasing the denominator decreases molarity.'
      },
      {
        id: 'q3',
        question: 'When diluting concentrated sulfuric acid with water, what is the mandatory safety rule?',
        options: [
          'Pour water into concentrated acid',
          'Always add concentrated acid slowly into water ("AAA: Always Add Acid") while stirring',
          'Mix them quickly in a closed bottle',
          'Heat the water first'
        ],
        correctIndex: 1,
        explanation: 'Adding water to concentrated acid creates intense localized heat that instantly boils the surface, splattering concentrated acid.'
      }
    ]
  },
  {
    id: 'exp_molarity_prep',
    title: 'Molarity Calculations & Volumetric Prep',
    category: 'analytical',
    difficulty: 'Introductory',
    duration: '12 min',
    principle: 'Preparing standard solutions from dry solid chemicals requires calculating mass using formula molar mass (MW): mass = Molarity × Volume (L) × Molar Mass (g/mol).',
    equation: 'Mass (g) = M (mol/L) · V (L) · MW (g/mol)',
    learningObjectives: [
      'Calculate required mass of copper(II) sulfate pentahydrate (CuSO₄·5H₂O, MW = 249.68 g/mol) to prepare 250.0 mL of 0.100 M solution.',
      'Weigh solid on analytical balance using tare function.',
      'Dissolve solid completely in beaker before transferring to volumetric flask.'
    ],
    requiredApparatus: ['250.0 mL Volumetric Flask', 'Analytical Balance & Weigh Boat', 'Glass Funnel', 'Wash Bottle'],
    requiredReagents: ['Copper(II) Sulfate Pentahydrate (CuSO₄·5H₂O)', 'Deionized Water'],
    safetyPrecautions: ['Wear nitrile gloves and goggles when handling solid reagent.'],
    defaultParams: {
      targetMolarity: 0.100,
      volumetricFlaskML: 250.0,
      soluteMolarMass: 249.68
    },
    paramLabels: {
      targetMolarity: { label: 'Target Solution Molarity', unit: 'M', min: 0.05, max: 0.50, step: 0.05 },
      volumetricFlaskML: { label: 'Volumetric Flask Size', unit: 'mL', min: 100.0, max: 500.0, step: 50.0 },
      soluteMolarMass: { label: 'Compound Molar Mass', unit: 'g/mol', min: 58.44, max: 300.0, step: 10.0 }
    },
    graphConfig: {
      xLabel: 'Target Molarity',
      yLabel: 'Solid Mass Required to Weigh',
      xUnit: 'M',
      yUnit: 'g'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Calculate Required Solid Mass',
        instruction: 'Calculate mass = 0.100 mol/L × 0.250 L × 249.68 g/mol = 6.242 g.',
        actionKey: 'calibrate_sensor',
        hint: 'Account for the 5 water molecules of hydration in the formula.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Weigh Solid & Dissolve in Beaker',
        instruction: 'Weigh 6.242 g in weigh boat, transfer into beaker with 100 mL water, and stir until 100% dissolved.',
        actionKey: 'weigh_sample',
        hint: 'Never dump solid directly down the narrow neck of a volumetric flask.',
        isCompleted: false
      },
      {
        id: 'step_3',
        title: 'Quantitatively Transfer to Volumetric Flask',
        instruction: 'Pour into 250 mL volumetric flask, rinse beaker 3 times with wash bottle into flask, and fill to mark.',
        actionKey: 'invert_mix',
        hint: 'Quantitative rinsing ensures every single molecule enters the flask.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'How many grams of solid Sodium Chloride (NaCl, MW = 58.44 g/mol) are required to prepare 500.0 mL of a 0.200 M solution?',
        options: ['2.92 g', '5.84 g', '11.69 g', '58.44 g'],
        correctIndex: 1,
        explanation: 'Mass = 0.200 mol/L × 0.500 L × 58.44 g/mol = 5.844 g.'
      },
      {
        id: 'q2',
        question: 'Why must you include water of hydration (e.g. ·5H₂O in CuSO₄·5H₂O) when calculating molar mass for weighing?',
        options: [
          'Because water molecules are chemically bound inside the crystal lattice and contribute to the total weighed mass',
          'Water does not have mass',
          'It changes the color',
          'Hydration is ignored'
        ],
        correctIndex: 0,
        explanation: 'Omitting the 5 H₂O (90.08 g/mol) would cause you to under-weigh actual copper by over 36%.'
      },
      {
        id: 'q3',
        question: 'Why should you never add solid chemical crystals directly into a volumetric flask through its narrow neck?',
        options: [
          'Crystals stick to the ground-glass neck and cannot dissolve easily in the restricted bottom area',
          'The neck will melt',
          'It changes the molar mass',
          'The flask will tip'
        ],
        correctIndex: 0,
        explanation: 'Dissolving in a beaker first ensures complete dissolution and prevents crystals lodging in the neck.'
      }
    ]
  },
  {
    id: 'exp_beer_lambert',
    title: 'Spectrophotometry & Beer-Lambert Law',
    category: 'analytical',
    difficulty: 'Intermediate',
    duration: '12 min',
    principle: 'The fundamental law of optical absorption: Absorbance (A) is directly proportional to molar extinction coefficient (ε), path length (l), and solute concentration (c).',
    equation: 'A = ε · c · l   and   %T = 100 · 10^(-A)',
    learningObjectives: [
      'Verify the linear relationship between optical absorbance and concentration.',
      'Calculate molar absorptivity coefficient (ε in L/(mol·cm)) from slope of A vs c.',
      'Identify the upper limit of Beer\'s Law linearity where detector saturation causes curvature.'
    ],
    requiredApparatus: ['UV-Vis Spectrophotometer', 'Quartz or Optical Polystyrene Cuvettes (l = 1.00 cm)'],
    requiredReagents: ['Potassium Permanganate (KMnO₄, ε = 2300 L/(mol·cm) at 525 nm)'],
    safetyPrecautions: ['Permanganate is an oxidizer; handle with gloves.'],
    defaultParams: {
      concentrationMicroM: 100, // 100 uM
      pathLengthCm: 1.0
    },
    paramLabels: {
      concentrationMicroM: { label: 'KMnO₄ Concentration', unit: 'μM', min: 20, max: 500, step: 20 },
      pathLengthCm: { label: 'Cuvette Path Length', unit: 'cm', min: 0.5, max: 2.0, step: 0.5 }
    },
    graphConfig: {
      xLabel: 'Molar Concentration',
      yLabel: 'Optical Absorbance (A)',
      xUnit: 'μM',
      yUnit: 'AU'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Zero Instrument at 525 nm with Water Blank',
        instruction: 'Set wavelength to 525 nm (absorption peak of permanganate), insert water blank, and zero.',
        actionKey: 'calibrate_sensor',
        hint: 'Sets 100% Transmittance baseline.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Measure Series of Increasing Concentrations',
        instruction: 'Measure 50, 100, 150, 200 μM samples; plot Absorbance vs Concentration.',
        actionKey: 'record_reading',
        hint: 'Calculate slope = ε · l.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'According to the Beer-Lambert law A = ε · c · l, if you double the path length of the cuvette from 1.0 cm to 2.0 cm, what happens to Absorbance?',
        options: ['Halved', 'Doubles', 'Remains unchanged', 'Becomes zero'],
        correctIndex: 1,
        explanation: 'Absorbance is directly proportional to path length l; doubling l doubles the absorbed light.'
      },
      {
        id: 'q2',
        question: 'Why does the Beer-Lambert plot bend and lose linearity at very high concentrations (A > 2.0)?',
        options: [
          'Solute molecules begin interacting with each other, altering absorptivity, and stray light saturates the detector',
          'Light travels faster',
          'The cuvette expands',
          'Water dissolves the beam'
        ],
        correctIndex: 0,
        explanation: 'At high concentration, intermolecular interactions and stray light limitations cause negative deviation from linearity.'
      },
      {
        id: 'q3',
        question: 'If a 0.00010 M (100 μM) solution in a 1.0 cm cuvette gives an absorbance of 0.230, what is its molar absorptivity ε?',
        options: ['23 L/(mol·cm)', '230 L/(mol·cm)', '2300 L/(mol·cm)', '23000 L/(mol·cm)'],
        correctIndex: 2,
        explanation: 'ε = A / (c · l) = 0.230 / (0.00010 mol/L × 1.0 cm) = 2300 L/(mol·cm).'
      }
    ]
  },

  // ========================================================
  // 4. PHYSICAL & ELECTROCHEMISTRY (EXPERIMENTS 29 - 35)
  // ========================================================
  {
    id: 'exp_ideal_gas_laws',
    title: 'Ideal Gas Law Simulator (PV = nRT)',
    category: 'physical',
    difficulty: 'Intermediate',
    duration: '12 min',
    principle: 'Equation of state describing ideal gas behavior linking Pressure (P), Volume (V), Temperature (T), and Moles (n). Validates Boyle\'s Law (P ∝ 1/V), Charles\'s Law (V ∝ T), and Gay-Lussac\'s Law (P ∝ T).',
    equation: 'P · V = n · R · T   (R = 8.314 J/(mol·K) = 0.08206 L·atm/(mol·K))',
    learningObjectives: [
      'Verify Boyle\'s Law: Halving gas volume at constant temperature doubles internal pressure.',
      'Verify Gay-Lussac\'s Law: Pressure is directly proportional to absolute temperature in Kelvin.',
      'Calculate theoretical absolute zero (-273.15°C) by linear pressure extrapolation.'
    ],
    requiredApparatus: ['Sealed Gas Syringe with Digital Pressure Transducer', 'Water Bath & Heater', 'Thermocouple'],
    requiredReagents: ['Air / Pure Nitrogen Gas (N₂)'],
    safetyPrecautions: ['Do not exceed maximum syringe pressure rating (300 kPa).'],
    defaultParams: {
      volumeLiters: 1.0,
      tempC: 25,
      molesGas: 0.04
    },
    paramLabels: {
      volumeLiters: { label: 'Chamber Volume', unit: 'L', min: 0.2, max: 2.0, step: 0.1 },
      tempC: { label: 'Chamber Temperature', unit: '°C', min: -20, max: 120, step: 5 },
      molesGas: { label: 'Quantity of Gas', unit: 'mol', min: 0.01, max: 0.10, step: 0.01 }
    },
    graphConfig: {
      xLabel: 'Gas Chamber Volume (1/V)',
      yLabel: 'Chamber Gas Pressure',
      xUnit: 'L⁻¹',
      yUnit: 'kPa'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Compress Gas at Constant Temperature (Boyle\'s Law)',
        instruction: 'Reduce volume from 1.0 L down to 0.5 L while keeping temperature at 25°C.',
        actionKey: 'adjust_clamp',
        hint: 'Pressure jumps from ~99 kPa to ~198 kPa (inversely proportional).',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Heat Fixed Volume Chamber (Gay-Lussac)',
        instruction: 'Lock volume at 1.0 L, heat from 25°C to 100°C, and observe linear pressure rise.',
        actionKey: 'heat_solution',
        hint: 'Pressure increases linearly with absolute temperature T(K).',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'If a sample of gas has a volume of 2.0 L at 100 kPa, what will the pressure be if compressed to 0.5 L at constant temperature?',
        options: ['50 kPa', '200 kPa', '400 kPa', '800 kPa'],
        correctIndex: 2,
        explanation: 'Boyle\'s Law: P1V1 = P2V2 → P2 = (100 kPa × 2.0 L) / 0.5 L = 400 kPa.'
      },
      {
        id: 'q2',
        question: 'Why must temperature ALWAYS be converted into KELVIN (K = °C + 273.15) for gas law calculations?',
        options: [
          'Because the Kelvin scale starts at Absolute Zero where molecular kinetic energy is zero',
          'Because Celsius cannot be multiplied',
          'Kelvin makes numbers positive only',
          'It is a European standard'
        ],
        correctIndex: 0,
        explanation: 'Gas volume and pressure scale directly with thermal energy, which is zero only at 0 Kelvin.'
      },
      {
        id: 'q3',
        question: 'Under what physical conditions do real gases deviate significantly from Ideal Gas behavior?',
        options: [
          'At high temperatures and low pressures',
          'At extremely high pressures and very low temperatures where intermolecular attractions and molecular volume cannot be neglected',
          'When exposed to light',
          'In glass containers'
        ],
        correctIndex: 1,
        explanation: 'High pressure forces molecules close together (volume matters), and low temperature enhances van der Waals attractions.'
      }
    ]
  },
  {
    id: 'exp_voltaic_cell',
    title: 'Voltaic / Galvanic Cell (Zinc-Copper Daniell Cell)',
    category: 'physical',
    difficulty: 'Intermediate',
    duration: '15 min',
    principle: 'Spontaneous electron transfer through an external wire converts chemical potential energy into electrical work. The salt bridge completes the circuit, maintaining electrical neutrality via counter-ion migration.',
    equation: 'Zn (s) + Cu²⁺ (aq) → Zn²⁺ (aq) + Cu (s)   E°_cell = E°_cathode - E°_anode = +0.34 V - (-0.76 V) = +1.10 V',
    learningObjectives: [
      'Construct a two-compartment Daniell cell with Zn and Cu half-cells connected by a KNO₃ salt bridge.',
      'Measure standard cell voltage (+1.10 V) with high-impedance digital voltmeter.',
      'Demonstrate the Nernst equation by varying Cu²⁺ and Zn²⁺ concentrations.'
    ],
    requiredApparatus: ['Digital Multimeter / Voltmeter with Alligator Leads', 'Two 150 mL Beakers', 'U-Tube KNO₃ Agar Salt Bridge', 'Zn & Cu Metal Electrodes'],
    requiredReagents: ['1.0 M Zinc Sulfate (ZnSO₄)', '1.0 M Copper(II) Sulfate (CuSO₄)', 'Potassium Nitrate (KNO₃) for bridge'],
    safetyPrecautions: ['Disconnect leads before adjusting electrodes; dispose of copper waste responsibly.'],
    defaultParams: {
      concCuM: 1.0,
      concZnM: 1.0,
      hasSaltBridge: 1 // 1: Installed, 0: Removed
    },
    paramLabels: {
      concCuM: { label: 'Cu²⁺ Cathode Concentration', unit: 'M', min: 0.001, max: 2.0, step: 0.1 },
      concZnM: { label: 'Zn²⁺ Anode Concentration', unit: 'M', min: 0.001, max: 2.0, step: 0.1 },
      hasSaltBridge: { label: 'Salt Bridge (1: Connected, 0: Removed)', unit: 'status', min: 0, max: 1, step: 1 }
    },
    graphConfig: {
      xLabel: 'Log Concentration Ratio log([Zn²⁺]/[Cu²⁺])',
      yLabel: 'Measured Cell Voltage (E_cell)',
      xUnit: 'log(Q)',
      yUnit: 'V'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Assemble Zinc Anode & Copper Cathode',
        instruction: 'Immerse Zn strip into 1.0 M ZnSO₄ and Cu strip into 1.0 M CuSO₄.',
        actionKey: 'prepare_filter',
        hint: 'Anode = Oxidation (Zn); Cathode = Reduction (Cu).',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Insert KNO₃ Salt Bridge & Measure Voltage',
        instruction: 'Bridge both beakers with U-tube; connect voltmeter and observe exactly +1.100 V.',
        actionKey: 'calibrate_sensor',
        hint: 'If salt bridge is lifted, voltage instantly drops to 0.00 V due to charge buildup.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What happens to the electrical current and voltage of a galvanic cell if the salt bridge is removed?',
        options: [
          'Voltage doubles',
          'Voltage and current instantly drop to ZERO because charge separation halts the electrochemical reaction',
          'It becomes a battery charger',
          'The wire melts'
        ],
        correctIndex: 1,
        explanation: 'Without ion flow to balance accumulating positive and negative charges in half-cells, the circuit is broken.'
      },
      {
        id: 'q2',
        question: 'At which electrode does OXIDATION occur in a galvanic cell?',
        options: ['The Cathode (Red Cat)', 'The Anode (An Ox)', 'In the salt bridge', 'In the voltmeter'],
        correctIndex: 1,
        explanation: 'Mnemonic: "An Ox and Red Cat" — Anode is Oxidation, Reduction at Cathode.'
      },
      {
        id: 'q3',
        question: 'According to the Nernst equation, what happens to the cell voltage if the Cu²⁺ concentration at the cathode is INCREASED?',
        options: ['Voltage decreases', 'Voltage increases (Le Chatelier drives forward reaction to produce more electrical potential)', 'Voltage stays fixed', 'Cell discharges backwards'],
        correctIndex: 1,
        explanation: 'Increasing reactant [Cu²⁺] decreases Q = [Zn²⁺]/[Cu²⁺], increasing cell potential E.'
      }
    ]
  },
  {
    id: 'exp_water_electrolysis',
    title: 'Water Electrolysis & Hoffman Stoichiometry',
    category: 'physical',
    difficulty: 'Intermediate',
    duration: '12 min',
    principle: 'Non-spontaneous electrochemical decomposition driven by external DC electrical potential. Decomposes liquid water into stoichiometric 2:1 volume ratio of hydrogen and oxygen gas.',
    equation: '2 H₂O (l) —[Electric Current]→ 2 H₂ (g) [Cathode] + O₂ (g) [Anode]   (ΔG° = +474.4 kJ/mol)',
    learningObjectives: [
      'Operate Hoffman electrolysis apparatus with inert platinum/carbon electrodes.',
      'Verify Faraday\'s law: 2 volumes of H₂ gas collect for every 1 volume of O₂ gas (Avogadro\'s hypothesis).',
      'Perform pop test for hydrogen and glowing splint test for oxygen.'
    ],
    requiredApparatus: ['Hoffman Electrolysis Apparatus', 'DC Power Supply (12V)', 'Graduated Gas Collection Tubes'],
    requiredReagents: ['Dilute Sodium Sulfate (Na₂SO₄) or Sulfuric Acid (H₂SO₄) as electrolyte', 'Deionized Water'],
    safetyPrecautions: ['Hydrogen gas is highly flammable; keep open flames away from collection stopcocks.'],
    defaultParams: {
      voltageDC: 12.0,
      currentAmps: 0.5,
      runTimeSec: 180
    },
    paramLabels: {
      voltageDC: { label: 'DC Voltage Applied', unit: 'V', min: 4.0, max: 24.0, step: 2.0 },
      currentAmps: { label: 'Electrolysis Current', unit: 'A', min: 0.1, max: 2.0, step: 0.1 },
      runTimeSec: { label: 'Electrolysis Duration', unit: 's', min: 30, max: 300, step: 30 }
    },
    graphConfig: {
      xLabel: 'Electrolysis Time Elapsed',
      yLabel: 'Gas Volume Collected (H₂ vs O₂)',
      xUnit: 's',
      yUnit: 'mL'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Add Electrolyte to Water',
        instruction: 'Add dilute Na₂SO₄ to pure deionized water to provide mobile ions for conductivity.',
        actionKey: 'add_reagent',
        hint: 'Pure deionized water is a poor electrical conductor.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Engage 12V DC Power and Watch Columns',
        instruction: 'Turn on power supply; observe vigorous bubbling at both electrodes with cathode generating exactly 2x volume of anode.',
        actionKey: 'calibrate_sensor',
        hint: 'Cathode produces H₂; Anode produces O₂.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why does the volume of Hydrogen gas produced at the negative cathode equal TWICE the volume of Oxygen at the positive anode?',
        options: [
          'Hydrogen molecules are twice as big',
          'The chemical formula of water is H₂O; decomposing 2 water molecules yields 2 molecules of H₂ for every 1 molecule of O₂ (Avogadro\'s law)',
          'Oxygen dissolves faster',
          'The cathode is warmer'
        ],
        correctIndex: 1,
        explanation: 'Equal moles of ideal gas occupy equal volumes; stoichiometric ratio 2H₂ : 1O₂ gives exactly 2:1 volume ratio.'
      },
      {
        id: 'q2',
        question: 'Why must an electrolyte (such as dilute Na₂SO₄ or dilute H₂SO₄) be added to pure water before electrolysis will work?',
        options: [
          'Pure water auto-ionizes only negligibly ([H⁺] = 10⁻⁷ M), making its electrical resistance too high for practical current flow',
          'Electrolyte colors the water',
          'Pure water freezes under electricity',
          'Electrolyte acts as fuel'
        ],
        correctIndex: 0,
        explanation: 'Without dissolved ions to conduct charge through solution, electrical current cannot flow.'
      },
      {
        id: 'q3',
        question: 'Which gas is produced at the POSITIVE ANODE during water electrolysis?',
        options: ['Hydrogen gas (H₂)', 'Oxygen gas (O₂)', 'Nitrogen gas (N₂)', 'Chlorine gas (Cl₂)'],
        correctIndex: 1,
        explanation: 'Oxidation occurs at the positive anode: 2 H₂O → O₂ + 4 H⁺ + 4e⁻.'
      }
    ]
  },
  {
    id: 'exp_le_chatelier',
    title: 'Le Chatelier\'s Principle & Equilibrium Shifts',
    category: 'physical',
    difficulty: 'Intermediate',
    duration: '12 min',
    principle: 'When a dynamic chemical equilibrium is subjected to an external stress (concentration, temperature, or pressure), the system shifts in the direction that counteracts the imposed disturbance.',
    equation: '[Co(H₂O)₆]²⁺ (pink) + 4 Cl⁻ (aq) + heat ⇌ [CoCl₄]²⁻ (blue) + 6 H₂O (l)   (Endothermic ΔH > 0)',
    learningObjectives: [
      'Observe dramatic reversible color shifts between pink octahedral and blue tetrahedral cobalt complexes.',
      'Demonstrate temperature stress: heating drives endothermic shift to royal blue; cooling in ice bath restores pink.',
      'Demonstrate concentration stress: adding concentrated HCl shifts equilibrium toward blue [CoCl₄]²⁻.'
    ],
    requiredApparatus: ['Test Tubes & Rack', 'Hot Water Bath (80°C)', 'Ice Water Bath (0°C)', 'Dropper Pipettes'],
    requiredReagents: ['0.1 M Cobalt(II) Chloride solution (CoCl₂)', '12 M Hydrochloric Acid (HCl)', 'Deionized Water'],
    safetyPrecautions: ['Concentrated HCl is fuming and corrosive; work in fume hood.'],
    defaultParams: {
      temperatureC: 22,
      chlorideConcM: 1.0
    },
    paramLabels: {
      temperatureC: { label: 'System Temperature', unit: '°C', min: 0, max: 90, step: 5 },
      chlorideConcM: { label: 'Chloride Ion Concentration', unit: 'M', min: 0.2, max: 6.0, step: 0.5 }
    },
    graphConfig: {
      xLabel: 'Temperature',
      yLabel: 'Percentage Tetrahedral Blue Complex [CoCl₄]²⁻',
      xUnit: '°C',
      yUnit: '%'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Observe Room Temperature Equilibrium',
        instruction: 'Inspect CoCl₂ solution in ethanol/water; note violet/purple intermediate color.',
        actionKey: 'add_reagent',
        hint: 'Both pink and blue species are present at room temperature.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Heat in Hot Water Bath (80°C)',
        instruction: 'Immerse tube in boiling water bath; watch solution turn deep royal blue as endothermic reaction absorbs heat.',
        actionKey: 'heat_solution',
        hint: 'Heat shifts equilibrium to the right.',
        isCompleted: false
      },
      {
        id: 'step_3',
        title: 'Plunge into Ice Bath (0°C)',
        instruction: 'Move tube immediately into ice water; watch color flip back to delicate rose pink.',
        actionKey: 'cool_solution',
        hint: 'Cooling shifts equilibrium to the left, releasing heat.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Because the forward formation of the blue [CoCl₄]²⁻ complex is ENDOTHERMIC (absorbs heat), what does HEATING the solution cause?',
        options: [
          'Shifts equilibrium to the right, turning the solution deep royal blue',
          'Shifts equilibrium to the left, turning it pink',
          'Freezes the solution',
          'Destroys the cobalt atoms'
        ],
        correctIndex: 0,
        explanation: 'According to Le Chatelier, adding thermal energy shifts equilibrium toward the endothermic direction to consume added heat.'
      },
      {
        id: 'q2',
        question: 'What happens if you add concentrated Hydrochloric Acid (supplying abundant Cl⁻ ions) to the pink solution at room temperature?',
        options: [
          'Turns blue because adding reactant Cl⁻ pushes the equilibrium forward toward products',
          'Turns clear',
          'Turns solid white',
          'No change'
        ],
        correctIndex: 0,
        explanation: 'Increasing reactant concentration pushes equilibrium toward products to consume excess chloride.'
      },
      {
        id: 'q3',
        question: 'What happens to the numerical value of the equilibrium constant Kc when temperature is changed?',
        options: [
          'Kc changes because temperature alters thermodynamic equilibrium constants',
          'Kc is always strictly constant for all eternity',
          'Kc becomes zero',
          'Kc only changes if catalyst is added'
        ],
        correctIndex: 0,
        explanation: 'Temperature is the ONLY factor that changes the numerical value of the equilibrium constant Kc.'
      }
    ]
  },
  {
    id: 'exp_molecular_geometry',
    title: 'Molecular Geometry & VSEPR Model Validation',
    category: 'physical',
    difficulty: 'Introductory',
    duration: '10 min',
    principle: 'Valence Shell Electron Pair Repulsion (VSEPR) theory: Electron domains (bonding and non-bonding lone pairs) surrounding a central atom repel each other, adopting spatial orientations that maximize inter-pair angular separation.',
    equation: 'Bond Angles: Linear (180°), Trigonal Planar (120°), Tetrahedral (109.5°), Trigonal Pyramidal (107°), Bent (104.5°)',
    learningObjectives: [
      'Compare geometric bond angles of CH₄ (tetrahedral 109.5°), NH₃ (trigonal pyramidal 107°), and H₂O (bent 104.5°).',
      'Explain how non-bonding lone pair electron clouds exert greater repulsive force than bonding pairs.',
      'Correlate 3D molecular symmetry with net molecular polarity / dipole moments.'
    ],
    requiredApparatus: ['Ball-and-Stick Molecular Modeling Kit', '3D Interactive Structure Inspector'],
    requiredReagents: ['Model molecules: CO₂, BF₃, CH₄, NH₃, H₂O, SF₆'],
    safetyPrecautions: ['No chemical hazards; sanitize modeling pieces.'],
    defaultParams: {
      lonePairCount: 2, // e.g. H2O
      bondingPairCount: 2
    },
    paramLabels: {
      lonePairCount: { label: 'Central Atom Lone Pairs', unit: 'pairs', min: 0, max: 3, step: 1 },
      bondingPairCount: { label: 'Bonding Domains', unit: 'domains', min: 2, max: 6, step: 1 }
    },
    graphConfig: {
      xLabel: 'Number of Central Lone Pairs',
      yLabel: 'Bond Angle',
      xUnit: 'pairs',
      yUnit: 'degrees (°)'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Construct Methane (CH₄)',
        instruction: 'Connect 4 hydrogen atoms to carbon; inspect symmetrical 109.5° tetrahedral angles.',
        actionKey: 'prepare_filter',
        hint: 'Zero lone pairs: pure tetrahedral geometry.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Construct Water (H₂O)',
        instruction: 'Attach 2 hydrogens and 2 lone pairs to oxygen; observe lone pairs compress bond angle down to 104.5°.',
        actionKey: 'adjust_clamp',
        hint: 'Lone pairs occupy larger angular domain, squeezing H-O-H angle.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why is the H-O-H bond angle in Water (104.5°) smaller than the ideal tetrahedral angle in Methane (109.5°)?',
        options: [
          'Oxygen is smaller than carbon',
          'The two non-bonding lone pairs on oxygen exert greater electrostatic repulsion than bonding pairs, compressing the H-O-H angle',
          'Hydrogen atoms pull each other together',
          'Water is a liquid'
        ],
        correctIndex: 1,
        explanation: 'Lone pair-bonding pair repulsion is stronger than bonding pair-bonding pair repulsion, squeezing bond angles.'
      },
      {
        id: 'q2',
        question: 'What is the molecular geometry of Carbon Dioxide (CO₂)?',
        options: ['Bent', 'Linear with 180° bond angle', 'Trigonal planar', 'Tetrahedral'],
        correctIndex: 1,
        explanation: 'Carbon has 2 double-bond electron domains and zero lone pairs, producing a linear 180° geometry.'
      },
      {
        id: 'q3',
        question: 'Why is Carbon Tetrachloride (CCl₄) NON-POLAR even though individual C-Cl bonds are strongly polar?',
        options: [
          'The chlorine atoms cancel out',
          'The symmetrical tetrahedral geometry causes the individual bond dipole vectors to cancel out to zero net dipole moment',
          'Chlorine is not electronegative',
          'It contains carbon'
        ],
        correctIndex: 1,
        explanation: 'High spatial symmetry causes dipole vectors in opposite directions to cancel completely (vector sum = 0).'
      }
    ]
  },
  {
    id: 'exp_imf_cooling',
    title: 'Intermolecular Forces & Evaporative Cooling',
    category: 'physical',
    difficulty: 'Introductory',
    duration: '8 min',
    principle: 'Evaporation is an endothermic phase change where high-kinetic energy surface molecules escape attractive intermolecular forces (London dispersion, dipole-dipole, hydrogen bonding), leaving behind a cooler bulk liquid.',
    equation: 'ΔT_cooling = T_initial - T_minimum   (Directly reflects strength of IMF vs. volatility)',
    learningObjectives: [
      'Compare evaporative temperature drop (ΔT) of Water (H-bonds), Ethanol (H-bonds/dispersive), Acetone (dipole-dipole), and Pentane (London dispersion).',
      'Correlate boiling point, enthalpy of vaporization (ΔH_vap), and volatility with intermolecular forces.',
      'Observe rapid chill on skin/sensors during solvent evaporation.'
    ],
    requiredApparatus: ['Digital Temperature Probe with Filter Paper Sleeve', 'Rubber Bands', 'Stopwatch'],
    requiredReagents: ['Deionized Water', 'Ethanol', 'Acetone (2-Propanone)', 'n-Pentane'],
    safetyPrecautions: ['Acetone and Pentane are highly flammable; avoid open flames.'],
    defaultParams: {
      liquidChoice: 0 // 0: Water, 1: Ethanol, 2: Acetone, 3: Pentane
    },
    paramLabels: {
      liquidChoice: { label: 'Volatile Solvent (0: Water, 1: Ethanol, 2: Acetone, 3: Pentane)', unit: 'type', min: 0, max: 3, step: 1 }
    },
    graphConfig: {
      xLabel: 'Time Elapsed after Probe Removal',
      yLabel: 'Probe Surface Temperature',
      xUnit: 's',
      yUnit: '°C'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Wrap Thermometer in Filter Paper Sleeve',
        instruction: 'Secure filter paper cylinder around thermometer tip with small rubber band.',
        actionKey: 'prepare_filter',
        hint: 'Paper acts as a wick holding the liquid.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Dip in Solvent, Withdraw, and Record Cooling',
        instruction: 'Submerge in solvent, withdraw into air, start timer, and track rapid temperature drop.',
        actionKey: 'measure_temp',
        hint: 'Acetone drops rapidly by >12°C in seconds due to high volatility and weaker dipole forces.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which liquid experiences the FASTEST evaporation and largest sudden temperature drop (ΔT)?',
        options: [
          'Water (strong extensive hydrogen bonding network)',
          'Pentane / Acetone (weaker intermolecular forces allowing rapid vaporization)',
          'Glycerin',
          'Motor oil'
        ],
        correctIndex: 1,
        explanation: 'Weaker intermolecular forces mean molecules require less energy to break free, evaporating and cooling faster.'
      },
      {
        id: 'q2',
        question: 'Why does human perspiration (sweating) effectively cool the body on a hot day?',
        options: [
          'Sweat is cold inside the body',
          'Water has an exceptionally high enthalpy of vaporization (ΔH_vap = 40.7 kJ/mol); evaporating water removes large amounts of body heat',
          'Sweat blocks sunlight',
          'It turns skin into ice'
        ],
        correctIndex: 1,
        explanation: 'Water\'s strong hydrogen bonds absorb massive thermal energy when evaporating from skin surfaces.'
      },
      {
        id: 'q3',
        question: 'What type of intermolecular force is primarily responsible for holding water molecules together in liquid state?',
        options: ['Hydrogen bonding', 'London dispersion only', 'Ionic bonding', 'Covalent bonding between different molecules'],
        correctIndex: 0,
        explanation: 'Strong dipole-dipole hydrogen bonding between electronegative oxygen and electropositive hydrogen atoms.'
      }
    ]
  },
  {
    id: 'exp_energy_profiles',
    title: 'Reaction Energy Profiles & Catalyzed Pathways',
    category: 'physical',
    difficulty: 'Advanced',
    duration: '12 min',
    principle: 'Thermodynamics defines the overall energy difference between reactants and products (ΔH), while kinetics defines the activation energy barrier (Ea) of the transition state. Catalysts provide an alternate multi-step pathway with lower activation barrier.',
    equation: 'ΔH_rxn = E_products - E_reactants   (Exothermic: ΔH < 0, Endothermic: ΔH > 0)',
    learningObjectives: [
      'Trace potential energy coordinates from reactants through transition state to products.',
      'Compare uncatalyzed single-step high barrier vs catalyzed two-step pathway with intermediate.',
      'Understand why catalysts accelerate both forward and reverse rates without shifting equilibrium constant (K_eq).'
    ],
    requiredApparatus: ['Interactive Reaction Coordinate Simulator', 'Potential Energy Inspector'],
    requiredReagents: ['Simulated Exothermic & Endothermic Systems'],
    safetyPrecautions: ['Theoretical computational model.'],
    defaultParams: {
      reactionEnthalpyKJ: -50, // Exothermic -50 kJ
      uncatalyzedEaKJ: 85,
      isCatalyzed: 0 // 0: Uncatalyzed, 1: Catalyzed
    },
    paramLabels: {
      reactionEnthalpyKJ: { label: 'Reaction Enthalpy ΔH', unit: 'kJ/mol', min: -100, max: 100, step: 10 },
      uncatalyzedEaKJ: { label: 'Uncatalyzed Barrier (Ea)', unit: 'kJ/mol', min: 40, max: 150, step: 5 },
      isCatalyzed: { label: 'Catalyst Mode (0: Off, 1: On)', unit: 'mode', min: 0, max: 1, step: 1 }
    },
    graphConfig: {
      xLabel: 'Reaction Coordinate (Progress from Reactants to Products)',
      yLabel: 'Potential Energy',
      xUnit: 'progress',
      yUnit: 'kJ/mol'
    },
    steps: [
      {
        id: 'step_1',
        title: 'Inspect Uncatalyzed Energy Profile',
        instruction: 'Examine high peak activation energy barrier (Ea = 85 kJ/mol) required for collision transition state.',
        actionKey: 'calibrate_sensor',
        hint: 'Only a tiny fraction of molecules have enough kinetic energy to cross.',
        isCompleted: false
      },
      {
        id: 'step_2',
        title: 'Introduce Catalyst Pathway',
        instruction: 'Toggle catalyst on; observe barrier drop to 40 kJ/mol with two lower transition state peaks.',
        actionKey: 'mix_reagents',
        hint: 'Rate jumps dramatically while ΔH remains completely identical.',
        isCompleted: false
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Does adding a catalyst change the overall reaction enthalpy (ΔH) between reactants and products?',
        options: [
          'Yes, it makes the reaction much more exothermic',
          'No, ΔH is a thermodynamic state function that depends solely on initial and final states, remaining completely unchanged',
          'It makes all reactions endothermic',
          'It multiplies ΔH by 2'
        ],
        correctIndex: 1,
        explanation: 'Catalysts alter kinetic rates by lowering Ea, but have zero effect on thermodynamic state energies ΔH or ΔG.'
      },
      {
        id: 'q2',
        question: 'What is the highest energy point along a reaction coordinate diagram called?',
        options: ['Intermediate', 'Transition state / Activated complex', 'Ground state', 'Equilibrium valley'],
        correctIndex: 1,
        explanation: 'The transition state is an unstable, short-lived configuration of partially formed and broken bonds at the peak of the energy barrier.'
      },
      {
        id: 'q3',
        question: 'Why doesn\'t a catalyst shift the position of chemical equilibrium (K_eq)?',
        options: [
          'Because it lowers the activation energy of the forward and reverse reactions by the EXACT same amount',
          'Catalysts are lazy',
          'Equilibrium destroys catalysts',
          'It only works in one direction'
        ],
        correctIndex: 0,
        explanation: 'Because both forward and reverse rates are accelerated by identical factors, K_eq = k_forward / k_reverse remains unchanged.'
      }
    ]
  }
];
