import { EquipmentItem, SafetyScenario } from '../types';

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'bunsen_burner',
    name: 'Tirrill / Bunsen Burner',
    category: 'heating',
    position: [0.65, 0.95, -0.1],
    description: 'High-temperature gas burner with adjustable air collar and gas needle valve. Produces an inner pale blue cone (hottest zone ~1500°C) and outer oxidizing flame.',
    safeUseProtocol: 'Always inspect rubber hose for cracks before lighting. Keep long hair tied back, remove flammable solvents from surrounding 1-meter radius. Never leave unattended. Light striker before opening gas needle.',
    actions: [
      { id: 'ignite_burner', label: 'Ignite Burner (Blue Cone)', primary: true },
      { id: 'tip_burner', label: 'Simulate Knock-Over Flash Fire' },
      { id: 'shut_gas_valve', label: 'Shut Gas Cock Valve' }
    ],
    sds: {
      chemicalName: 'Natural Gas / Methane (Fuel Source)',
      formula: 'CH₄',
      casNumber: '74-82-8',
      signalWord: 'DANGER',
      hazardStatements: [
        'H220: Extremely flammable gas.',
        'H280: Contains gas under pressure; may explode if heated.',
        'Thermal burn hazard from unshielded flame reaching >1500°C.'
      ],
      precautionaryStatements: [
        'P210: Keep away from heat, sparks, open flames, hot surfaces. No smoking.',
        'P377: Leaking gas fire: Do not extinguish unless leak can be stopped safely.',
        'P381: Eliminate all ignition sources if safe to do so.'
      ],
      ppeRequired: ['Safety Splash Goggles (ANSI Z87.1)', 'Heat-resistant thermal tongs', '100% Cotton Lab Coat (No synthetic fibers)'],
      firstAid: {
        eyes: 'Rinse cautiously with water if hot gas or soot enters. Seek medical attention.',
        skin: 'Immerse thermal burn in cool, clean running water for minimum 15 minutes. Never apply ice or grease.',
        inhalation: 'Move victim to fresh air. If breathing ceases, administer artificial respiration.'
      },
      fireFighting: 'Shut off main gas bench cock immediately. Use CO₂ or dry chemical Class B extinguisher.',
      spillResponse: 'Evacuate area, eliminate open flames, notify lab manager, ventilate room.',
      nfpaRating: {
        health: 1,
        flammability: 4,
        instability: 0
      }
    },
    status: 'normal'
  },
  {
    id: 'tripod_gauze',
    name: 'Lab Tripod & Ceramic Wire Gauze',
    category: 'apparatus',
    position: [0.65, 0.95, -0.1],
    description: 'Cast-iron three-legged tripod supporting an iron wire gauze with an integrated ceramic heat-diffusing center disc. Ensures uniform thermal distribution under glassware without hot spots.',
    safeUseProtocol: 'Ensure tripod feet sit flat on the bench. Allow wire gauze to cool completely to room temperature before touching with bare hands.',
    actions: [
      { id: 'inspect_gauze', label: 'Inspect Ceramic Heat Diffuser', primary: true }
    ],
    status: 'normal'
  },
  {
    id: 'retort_stand',
    name: 'Retort Stand with Bosshead & Clamp',
    category: 'apparatus',
    position: [0.38, 0.95, -0.22],
    description: 'Heavy rectangular steel base with vertical chrome support rod. Fitted with a die-cast bosshead and rubber-lined 3-prong extension clamp holding reaction vessels firmly.',
    safeUseProtocol: 'Always align the heavy base directly beneath the clamp arm to prevent tipping. Never over-tighten clamp screws against fragile glass necks.',
    actions: [
      { id: 'adjust_clamp', label: 'Adjust Clamp Elevation', primary: true },
      { id: 'secure_flask', label: 'Secure Glassware Vessel' }
    ],
    status: 'normal'
  },
  {
    id: 'erlenmeyer_flask',
    name: 'Erlenmeyer Flask (250 mL)',
    category: 'glassware',
    position: [0.15, 0.95, -0.15],
    description: 'Conical borosilicate Pyrex flask designed for swirl mixing without splashing. Fitted with ground rim and rubber stopper for condensation or gas collection.',
    safeUseProtocol: 'Inspect for star cracks or chips before heating. Never heat a completely sealed closed vessel. Always use boiling stones or magnetic stir bar to prevent sudden superheating bump.',
    actions: [
      { id: 'swirl_flask', label: 'Swirl & Mix Solution', primary: true },
      { id: 'remove_stopper', label: 'Remove Rubber Stopper' }
    ],
    sds: {
      chemicalName: 'Copper (II) Sulfate Solution (0.5 M)',
      formula: 'CuSO₄ · 5H₂O (aq)',
      casNumber: '7758-99-8',
      signalWord: 'WARNING',
      hazardStatements: [
        'H302: Harmful if swallowed.',
        'H315: Causes skin irritation.',
        'H319: Causes serious eye irritation.',
        'H410: Very toxic to aquatic life with long lasting effects.'
      ],
      precautionaryStatements: [
        'P273: Avoid release to the environment.',
        'P280: Wear protective gloves and eye protection.',
        'P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes.'
      ],
      ppeRequired: ['Safety Goggles', 'Nitrile Gloves', 'Lab Coat'],
      firstAid: {
        eyes: 'Flush eyes thoroughly with gentle stream of water for at least 15 minutes.',
        skin: 'Wash contaminated skin with mild soap and plentiful water.',
        inhalation: 'Remove to fresh air. Rest in comfortable position.'
      },
      fireFighting: 'Non-combustible liquid. Use water spray, dry chemical, or CO₂ suitable for surrounding fire.',
      spillResponse: 'Contain with absorbent pads. Neutralize and transfer to heavy metal hazardous waste jug.',
      nfpaRating: {
        health: 2,
        flammability: 0,
        instability: 0
      }
    },
    status: 'normal'
  },
  {
    id: 'volumetric_flask',
    name: 'Class-A Volumetric Flask (250 mL)',
    category: 'glassware',
    position: [-0.08, 0.95, 0.22],
    description: 'Precision volumetric measuring flask featuring a flat bottom, pear-shaped body, and elongated narrow neck with an etched ring calibration mark (±0.12 mL tolerance at 20°C). Ground-glass pennyhead stopper ensures leakproof inversion mixing.',
    safeUseProtocol: 'Never heat volumetric flasks over an open flame; thermal expansion permanently destroys volumetric calibration. Read the bottom of the curved meniscus exactly level with the etched ring.',
    actions: [
      { id: 'invert_mix', label: 'Invert & Homogenize Solution', primary: true },
      { id: 'read_meniscus', label: 'Inspect Calibrated Meniscus Ring' }
    ],
    sds: {
      chemicalName: 'Potassium Permanganate Solution (0.1 M)',
      formula: 'KMnO₄ (aq)',
      casNumber: '7722-64-7',
      signalWord: 'DANGER',
      hazardStatements: [
        'H272: May intensify fire; oxidizer.',
        'H302: Harmful if swallowed.',
        'H314: Causes severe skin burns and eye damage.',
        'H410: Very toxic to aquatic life with long lasting effects.'
      ],
      precautionaryStatements: [
        'P220: Keep away from clothing and other combustible materials.',
        'P280: Wear protective gloves, protective clothing, and eye protection.'
      ],
      ppeRequired: ['Splash Goggles', 'Nitrile Gloves', 'Lab Coat'],
      firstAid: {
        eyes: 'Rinse immediately with copious water for 15 minutes.',
        skin: 'Wash thoroughly with soap and water; stains skin brown with MnO₂.',
        inhalation: 'Remove victim to fresh air. Provide oxygen if breathing is labored.'
      },
      fireFighting: 'Flood with water spray. Do NOT use dry chemical extinguishers containing ammonium compounds.',
      spillResponse: 'Neutralize with dilute sodium bisulfite solution, then absorb with inert sand/pads.',
      nfpaRating: {
        health: 2,
        flammability: 0,
        instability: 0,
        special: 'OX'
      }
    },
    status: 'normal'
  },
  {
    id: 'beaker_acid',
    name: 'Hydrochloric Acid Beaker (500 mL)',
    category: 'reagent',
    position: [-0.38, 0.95, -0.05],
    description: 'Heavy-duty Griffin borosilicate beaker filled with concentrated 12M Hydrochloric Acid (HCl). Highly fuming, pungent, and strongly corrosive.',
    safeUseProtocol: 'Work inside certified fume hood whenever handling concentrated acids. Always add acid to water (never water to acid: "Do as you oughta, add acid to water"). Never place near edge of bench.',
    actions: [
      { id: 'spill_acid', label: 'Simulate Corrosive Acid Spill' },
      { id: 'clean_spill', label: 'Neutralize with Bicarbonate' }
    ],
    sds: {
      chemicalName: 'Hydrochloric Acid, Concentrated (37% / 12 M)',
      formula: 'HCl (aq)',
      casNumber: '7647-01-0',
      signalWord: 'DANGER',
      hazardStatements: [
        'H314: Causes severe skin burns and serious eye damage.',
        'H335: May cause respiratory irritation.',
        'H290: May be corrosive to metals.'
      ],
      precautionaryStatements: [
        'P260: Do not breathe dust/fume/gas/mist/vapours/spray.',
        'P280: Wear acid-resistant nitrile/neoprene gloves, splash goggles, and apron.',
        'P301+P330+P331: IF SWALLOWED: Rinse mouth. Do NOT induce vomiting.'
      ],
      ppeRequired: ['Chemical Splash Goggles (D3 rated)', 'Heavy 8-mil Nitrile Gloves', 'Chemical-resistant Apron / Coat'],
      firstAid: {
        eyes: 'Immediately rush to Emergency Eyewash Station. Hold eyelids wide open and rinse continuously for 15+ minutes.',
        skin: 'Immediately strip contaminated clothing under safety shower. Flush skin with continuous copious cold water for 15 minutes.',
        inhalation: 'Evacuate to fresh air immediately. Administer oxygen if trained. Call emergency services.'
      },
      fireFighting: 'Non-flammable itself. Reaction with bench metals may produce explosive hydrogen gas (H₂). Use dry chemical extinguisher.',
      spillResponse: 'Apply sodium bicarbonate (NaHCO₃) powder slowly from outer perimeter inward until effervescence stops (pH 6-8). Absorb with inert vermiculite pads.',
      nfpaRating: {
        health: 3,
        flammability: 0,
        instability: 1,
        special: 'COR'
      }
    },
    status: 'normal'
  },
  {
    id: 'graduated_cylinder',
    name: 'Graduated Cylinder (100 mL)',
    category: 'glassware',
    position: [-0.75, 0.95, -0.2],
    description: 'Precision volumetric measuring cylinder with hexagonal stability foot and plastic bumper ring. Reads meniscus level at horizontal eye height.',
    safeUseProtocol: 'Always place on level surface and read lower meniscus curve. Plastic bumper must remain positioned near the top rim to cushion accidental falls.',
    actions: [
      { id: 'read_meniscus', label: 'Inspect Concave Meniscus', primary: true }
    ],
    sds: {
      chemicalName: 'Sodium Hydroxide Solution (1.0 M)',
      formula: 'NaOH (aq)',
      casNumber: '1310-73-2',
      signalWord: 'DANGER',
      hazardStatements: [
        'H314: Causes severe skin burns and eye damage.',
        'H290: May be corrosive to metals.'
      ],
      precautionaryStatements: [
        'P280: Wear protective gloves and eye protection.',
        'P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes.'
      ],
      ppeRequired: ['Safety Splash Goggles', 'Nitrile Gloves', 'Lab Coat'],
      firstAid: {
        eyes: 'Immediate continuous eyewash irrigation for 20 minutes.',
        skin: 'Rinse thoroughly under running water until soapy feel is eliminated.',
        inhalation: 'Move to fresh air.'
      },
      fireFighting: 'Extinguish surrounding fire with suitable media.',
      spillResponse: 'Neutralize with dilute citric acid or boric acid before absorbing.',
      nfpaRating: {
        health: 3,
        flammability: 0,
        instability: 1,
        special: 'ALK'
      }
    },
    status: 'normal'
  },
  {
    id: 'test_tube_rack',
    name: 'Reagent Test Tube Rack',
    category: 'glassware',
    position: [-0.55, 0.95, 0.22],
    description: 'Two-tier safety rack housing borosilicate test tubes with various colored inorganic salts (FeCl₃ yellow, CoCl₂ pink, KMnO₄ violet, CuSO₄ blue).',
    safeUseProtocol: 'When heating a test tube over flame, use wooden or wire test-tube clamp. Always point mouth of test tube away from yourself and others at a 45° angle. Never look down directly into open bore.',
    actions: [
      { id: 'inspect_tubes', label: 'Inspect Reagent Colors', primary: true }
    ],
    status: 'normal'
  },
  {
    id: 'reagent_ethanol',
    name: 'Ethanol 95% Reagent Bottle',
    category: 'reagent',
    position: [0.32, 0.95, 0.22],
    description: 'Amber glass reagent bottle with ground-glass stopper. Contains volatile and highly flammable organic solvent.',
    safeUseProtocol: 'Store in dedicated yellow Flammable Liquids Cabinet. Never open near active Bunsen burners or hotplates. Replace cap tightly immediately after dispensing.',
    actions: [
      { id: 'inspect_sds', label: 'Review Flammability Data', primary: true }
    ],
    sds: {
      chemicalName: 'Ethanol (Ethyl Alcohol, 95% v/v)',
      formula: 'C₂H₅OH',
      casNumber: '64-17-5',
      signalWord: 'DANGER',
      hazardStatements: [
        'H225: Highly flammable liquid and vapour.',
        'H319: Causes serious eye irritation.'
      ],
      precautionaryStatements: [
        'P210: Keep away from heat, sparks, open flames, hot surfaces. No smoking.',
        'P233: Keep container tightly closed.',
        'P243: Take action to prevent static discharges.'
      ],
      ppeRequired: ['Safety Goggles', 'Nitrile Gloves', 'Cotton Lab Coat'],
      firstAid: {
        eyes: 'Flush with water for 15 minutes.',
        skin: 'Wash with water and soap.',
        inhalation: 'Fresh air.'
      },
      fireFighting: 'Class B: Alcohol-resistant foam, dry chemical powder, or carbon dioxide (CO₂).',
      spillResponse: 'Eliminate ignition sources. Absorb with universal solvent spill pads.',
      nfpaRating: {
        health: 2,
        flammability: 3,
        instability: 0
      }
    },
    status: 'normal'
  },
  {
    id: 'reagent_hno3',
    name: 'Nitric Acid 68% Reagent Bottle',
    category: 'reagent',
    position: [0.12, 0.95, 0.22],
    description: 'Heavy amber glass bottle with acid-resistant ground-glass pennyhead stopper. Concentrated Nitric Acid (68%) is a vicious oxidizing acid that attacks metals, rubber, and skin.',
    safeUseProtocol: 'Store separately from organic solvents and flammable materials in dedicated dedicated corrosive cabinet. Never store adjacent to ethanol or acetic acid (violently hypergolic reaction).',
    actions: [
      { id: 'inspect_sds', label: 'Review Oxidizer Protocol', primary: true }
    ],
    sds: {
      chemicalName: 'Nitric Acid (68% w/w)',
      formula: 'HNO₃',
      casNumber: '7697-37-2',
      signalWord: 'DANGER',
      hazardStatements: [
        'H272: May intensify fire; oxidizer.',
        'H314: Causes severe skin burns and serious eye damage.',
        'H330: Fatal if inhaled (NO₂ nitrous fumes).'
      ],
      precautionaryStatements: [
        'P221: Take any precaution to avoid mixing with combustibles.',
        'P280: Wear protective gloves and eye protection.'
      ],
      ppeRequired: ['D3 Splash Goggles', 'Neoprene/Heavy Nitrile Gloves', 'Chemical Apron'],
      firstAid: {
        eyes: 'Emergency eyewash continuous irrigation for 20 minutes.',
        skin: 'Emergency safety shower wash. Stains yellow (xanthoproteic reaction).',
        inhalation: 'Immediately move victim to fresh air. Seek urgent medical attention for pulmonary edema risk.'
      },
      fireFighting: 'Flood with copious water. Toxic nitrogen dioxide gas released during fire.',
      spillResponse: 'Neutralize with lime or sodium carbonate slurry. Do NOT use sawdust or paper.',
      nfpaRating: {
        health: 4,
        flammability: 0,
        instability: 0,
        special: 'OX'
      }
    },
    status: 'normal'
  },
  {
    id: 'safety_goggles',
    name: 'Safety Splash Goggles (ANSI Z87.1)',
    category: 'safety',
    position: [0.88, 0.95, 0.25],
    description: 'Indirectly vented polycarbonate chemical splash goggles. Protects ocular mucous membranes from high-velocity impact and liquid chemical splashes.',
    safeUseProtocol: 'Must be worn 100% of the time upon stepping into the laboratory, even when not actively running a reaction. Everyday prescription eyeglasses do NOT qualify as safety goggles.',
    isPickable: true,
    inventoryIcon: 'Glasses',
    actions: [
      { id: 'equip_goggles', label: 'Pick Up & Wear Goggles', primary: true }
    ],
    status: 'normal'
  },
  {
    id: 'nitrile_gloves',
    name: 'Nitrile Protective Gloves Dispenser',
    category: 'safety',
    position: [0.95, 0.95, -0.22],
    description: 'Powder-free textured 6-mil nitrile barrier gloves resistant to oils, weak acids, bases, and general biological samples.',
    safeUseProtocol: 'Inspect for punctures before donning. Never touch face, phone, or door handles while wearing gloves. Peel off inside-out without touching external contaminated surfaces ("beak method").',
    isPickable: true,
    inventoryIcon: 'ShieldCheck',
    actions: [
      { id: 'equip_gloves', label: 'Don Nitrile Gloves', primary: true }
    ],
    status: 'normal'
  },
  {
    id: 'lab_coat_peg',
    name: 'Flame-Resistant 100% Cotton Lab Coat',
    category: 'safety',
    position: [-2.9, 1.6, 2.1],
    description: 'Heavy 100% pre-shrunk cotton twill laboratory coat with quick-release snap front buttons and knit wrist cuffs. Provides vital thermal shielding and sacrificial barrier against splashes.',
    safeUseProtocol: 'Must be fully buttoned up to the neck. Sleeves must not be rolled up. Never wear synthetic polyester coats when working with open flames or pyrophoric reagents.',
    isPickable: true,
    inventoryIcon: 'UserCheck',
    actions: [
      { id: 'equip_lab_coat', label: 'Don Lab Coat', primary: true }
    ],
    status: 'normal'
  },
  {
    id: 'fire_extinguisher',
    name: 'CO₂ Fire Extinguisher (Class B/C)',
    category: 'safety',
    position: [2.9, 1.1, -0.4],
    description: 'High-pressure seamless carbon dioxide cylinder with discharge horn. Ideal for flammable liquid and energized electrical fires without leaving corrosive residue.',
    safeUseProtocol: 'Remember PASS protocol: P - Pull pin, A - Aim at base of fire, S - Squeeze trigger handle, S - Sweep side to side. Maintain 2 to 3 meters safe distance.',
    isPickable: true,
    inventoryIcon: 'Flame',
    actions: [
      { id: 'equip_extinguisher', label: 'Take Extinguisher from Mount', primary: true },
      { id: 'pull_pin', label: 'Execute P.A.S.S. Step 1: Pull Pin' }
    ],
    status: 'normal'
  },
  {
    id: 'fire_blanket',
    name: 'Emergency Fire Blanket Station',
    category: 'safety',
    position: [2.9, 1.6, 0.4],
    description: 'Heavy woven 100% fiberglass fire blanket folded inside a wall-mounted quick-release red cabinet. Smothers clothing fires instantly through oxygen starvation.',
    safeUseProtocol: 'Pull the two hanging black webbed tabs downward simultaneously to release blanket. Wrap tightly around victim from neck downward to prevent chimney effect from directing flames into face.',
    actions: [
      { id: 'deploy_blanket', label: 'Pull Quick-Release Straps', primary: true }
    ],
    status: 'normal'
  },
  {
    id: 'spill_kit',
    name: 'Acid Neutralizing Spill Kit',
    category: 'safety',
    position: [-1.8, 0.45, -0.6],
    description: 'Dedicated chemical spill response kit containing sodium bicarbonate buffer powder, absorbent poly-pads, neutralizer indicator, scoop, and hazardous disposal bag.',
    safeUseProtocol: 'Assess spill size (<1 liter can be handled by trained student). Alert instructor and lab neighbors. Don thick gloves, dike perimeter with pads, scatter neutralizer slowly.',
    isPickable: true,
    inventoryIcon: 'Package',
    actions: [
      { id: 'equip_spill_kit', label: 'Pick Up Spill Response Kit', primary: true },
      { id: 'apply_neutralizer', label: 'Deploy Neutralizing Powder' }
    ],
    status: 'normal'
  },
  {
    id: 'eyewash_station',
    name: 'Emergency Eyewash & Safety Shower',
    category: 'station',
    position: [-2.7, 1.2, 0.8],
    description: 'ANSI Z358.1 certified combination safety drench shower and dual-aerator eyewash basin with high-visibility push flag.',
    safeUseProtocol: 'Must be reachable within 10 unobstructed seconds. Push yellow flag forward to activate hands-free continuous stream. Hold eyelids wide open with fingers and roll eyeballs for full 15 minutes.',
    actions: [
      { id: 'toggle_eyewash', label: 'Push Eyewash Flag Lever', primary: true },
      { id: 'pull_shower', label: 'Pull Deluge Shower Ring' }
    ],
    status: 'normal'
  },
  {
    id: 'fume_hood',
    name: 'Variable Air Volume (VAV) Fume Hood',
    category: 'station',
    position: [-0.1, 1.6, -1.8],
    description: 'Certified aerodynamically contoured chemical fume hood with vertical sliding safety glass sash and negative pressure exhaust blower.',
    safeUseProtocol: 'Keep sash at or below marked 18-inch operating height arrow. Work at least 6 inches inside the hood plane. Never put head inside. Keep baffles unblocked.',
    actions: [
      { id: 'toggle_sash', label: 'Toggle Sash Elevation', primary: true }
    ],
    status: 'normal'
  },
  {
    id: 'flammable_cabinet',
    name: 'Flammable Liquids Safety Storage Cabinet',
    category: 'storage',
    position: [2.8, 1.15, -1.6],
    description: 'Double-walled 18-gauge welded steel safety cabinet with 1.5-inch insulating air space, dual flame arrestor vents, 3-point self-latching doors, and leakproof 2-inch bottom sump.',
    safeUseProtocol: 'Never store oxidizers or mineral acids in flammable solvent cabinet. Keep doors closed and latched when not actively retrieving bottles. Bond and ground dispensing cans.',
    actions: [
      { id: 'toggle_cabinet_doors', label: 'Open / Close Cabinet Doors', primary: true }
    ],
    status: 'normal'
  }
];

export const SAFETY_SCENARIOS: SafetyScenario[] = [
  {
    id: 'free_exploration',
    title: 'Laboratory Safety Induction & Inspection',
    severity: 'low',
    description: 'Familiarize yourself with all equipment across the bright modern laboratory, inspect chemical SDS safety data sheets, and equip mandatory Personal Protective Equipment (PPE).',
    initialEquipStatus: {
      bunsen_burner: 'normal',
      erlenmeyer_flask: 'normal',
      beaker_acid: 'normal',
      volumetric_flask: 'normal',
      fire_extinguisher: 'normal',
      spill_kit: 'normal',
      safety_goggles: 'normal',
      nitrile_gloves: 'normal'
    },
    steps: [
      {
        id: 'step_inspect_sds',
        instruction: 'Click on the 500 mL Hydrochloric Acid Beaker or Bunsen Burner to review its Safety Data Sheet (SDS).',
        actionRequired: 'inspect_sds',
        isCompleted: false,
        hint: 'Click directly on any glassware or burner on the bench to open its SDS modal.'
      },
      {
        id: 'step_equip_goggles',
        instruction: 'Pick up and equip the Safety Splash Goggles from the benchtop into your inventory.',
        actionRequired: 'equip_goggles',
        isCompleted: false,
        hint: 'Click the goggles on the right side of the bench or use the "Pick Up" button.'
      },
      {
        id: 'step_equip_gloves',
        instruction: 'Pick up and equip the Nitrile Protective Gloves box into your inventory.',
        actionRequired: 'equip_gloves',
        isCompleted: false,
        hint: 'Look on the far right of the bench for the blue nitrile glove box.'
      }
    ],
    successMessage: 'PPE verification complete! You are properly equipped with ANSI Z87.1 splash goggles and chemical barrier gloves.'
  },
  {
    id: 'burner_fire',
    title: 'Emergency: Tipped Burner Flash Fire!',
    severity: 'critical',
    description: 'A careless movement knocked the active Bunsen burner onto solvent cleaning towels! Flame and dense carbon smoke are rapidly spreading across the benchtop.',
    initialEquipStatus: {
      bunsen_burner: 'tipped',
      erlenmeyer_flask: 'normal',
      beaker_acid: 'normal',
      safety_goggles: 'normal',
      nitrile_gloves: 'normal',
      fire_extinguisher: 'normal'
    },
    steps: [
      {
        id: 'step_pick_extinguisher',
        instruction: 'Grab the Class B/C CO₂ Fire Extinguisher mounted on the right wall.',
        actionRequired: 'equip_extinguisher',
        isCompleted: false,
        hint: 'Click on the red fire extinguisher cylinder on the right wall to add it to your active tools.'
      },
      {
        id: 'step_pull_pin',
        instruction: 'Deploy PASS technique Step 1: Pull the tamper-evident safety pin on the extinguisher handle.',
        actionRequired: 'pull_pin',
        isCompleted: false,
        hint: 'Click "Pull Safety Pin" in the action panel once the extinguisher is equipped.'
      },
      {
        id: 'step_discharge_fire',
        instruction: 'Aim the horn nozzle at the BASE of the flames and discharge CO₂ spray to smother the fire!',
        actionRequired: 'extinguish_fire',
        isCompleted: false,
        hint: 'Click "Discharge Extinguisher at Base" to sweep side to side.'
      },
      {
        id: 'step_shut_gas',
        instruction: 'Shut off the lab gas turret valve cock to prevent fuel re-ignition.',
        actionRequired: 'shut_gas_valve',
        isCompleted: false,
        hint: 'Click the gas turret valve on the bench to isolate fuel supply.'
      }
    ],
    successMessage: 'Fire extinguished successfully! You correctly executed the P.A.S.S. protocol and shut down the gas supply.'
  },
  {
    id: 'acid_spill',
    title: 'Emergency: Concentrated Acid Spill Containment',
    severity: 'high',
    description: 'A 500 mL beaker of concentrated 12M Hydrochloric Acid was knocked over! Corrosive liquid is spreading across the bench and acidic fumes are generating.',
    initialEquipStatus: {
      bunsen_burner: 'normal',
      erlenmeyer_flask: 'normal',
      beaker_acid: 'spilling',
      spill_kit: 'normal',
      safety_goggles: 'normal',
      nitrile_gloves: 'normal'
    },
    steps: [
      {
        id: 'step_equip_ppe',
        instruction: 'Ensure your Nitrile Protective Gloves and Splash Goggles are equipped before approaching the corrosive spill.',
        actionRequired: 'verify_ppe',
        isCompleted: false,
        hint: 'Equip goggles and gloves from your inventory or pick them up from the bench.'
      },
      {
        id: 'step_pick_spill_kit',
        instruction: 'Retrieve the Chemical Acid Neutralizing Spill Kit from the lower cabinet.',
        actionRequired: 'equip_spill_kit',
        isCompleted: false,
        hint: 'Click the yellow spill response container on the left lower area.'
      },
      {
        id: 'step_apply_neutralizer',
        instruction: 'Scatter Sodium Bicarbonate (NaHCO₃) buffer powder around the spill perimeter inward until fizzing stops.',
        actionRequired: 'apply_neutralizer',
        isCompleted: false,
        hint: 'Use the "Scatter Sodium Bicarbonate Buffer" action to neutralize the acid.'
      },
      {
        id: 'step_absorb_residue',
        instruction: 'Deploy inert absorbent pads to sop up neutralized salt slurry and dispose in designated hazardous bin.',
        actionRequired: 'absorb_slurry',
        isCompleted: false,
        hint: 'Click "Deploy Absorbent Pads & Containerize Waste".'
      }
    ],
    successMessage: 'Spill neutralized and safely containerized! The corrosive threat was arrested without bench etching or vapor release.'
  },
  {
    id: 'eye_splash',
    title: 'Emergency: Acid Splash to Eyes Protocol',
    severity: 'critical',
    description: 'A student working without goggles suffered a splash of concentrated acid toward their eyes! Every second counts to prevent permanent corneal burns.',
    initialEquipStatus: {
      bunsen_burner: 'normal',
      erlenmeyer_flask: 'normal',
      beaker_acid: 'spilling',
      eyewash_station: 'normal'
    },
    steps: [
      {
        id: 'step_reach_eyewash',
        instruction: 'Locate and move immediately to the Emergency Eyewash & Safety Shower station on the left wall.',
        actionRequired: 'navigate_eyewash',
        isCompleted: false,
        hint: 'Look to the yellow Eyewash Station on the left wall and click it to approach.'
      },
      {
        id: 'step_activate_push_handle',
        instruction: 'Push the high-visibility yellow "PUSH" flag lever forward to engage hands-free continuous water flow.',
        actionRequired: 'activate_eyewash_lever',
        isCompleted: false,
        hint: 'Click "Push Eyewash Lever" to engage the twin aerated water streams.'
      },
      {
        id: 'step_flush_15_minutes',
        instruction: 'Hold eyelids wide open with both hands and roll eyeballs through gentle aerated streams for 15 full minutes.',
        actionRequired: 'perform_15m_rinse',
        isCompleted: false,
        hint: 'Hold position for the 15-minute emergency decontamination rinse protocol.'
      }
    ],
    successMessage: 'Immediate 15-minute ocular decontamination completed! Medical emergency services notified and chemical rinsed clean.'
  }
];
