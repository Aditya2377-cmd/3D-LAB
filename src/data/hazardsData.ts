import { HazardItem } from '../types';

export const HAZARDS_DATA: HazardItem[] = [
  // ==========================================
  // CHEMICAL HAZARDS (13 SCENARIOS)
  // ==========================================
  {
    id: 'acid_spill',
    title: 'Concentrated Mineral Acid Spill',
    category: 'chemical',
    severity: 'high',
    estimatedDuration: '4 min',
    icon: 'FlaskConical',
    shortDescription: 'A 500 mL beaker of concentrated 12M Hydrochloric Acid was knocked over onto the benchtop.',
    fullDescription: 'Hydrochloric acid (HCl 37% / 12M) is a fuming, aggressive mineral acid that rapidly corrodes metals, attacks bench worktops, and produces choking hydrogen chloride vapor. If left unmanaged, the corrosive pool can spread toward electrical outlets or burn unprotected skin.',
    immediateRisks: [
      'Severe exothermic chemical skin burns and deep tissue destruction',
      'Pungent, choking HCl vapor release irritating bronchial airways',
      'Corrosive etching of laboratory benchtop and nearby metal stands',
      'Risk of spreading toward floor or electrical power outlets'
    ],
    symptomsOrIndicators: [
      'Pungent sharp chlorine-like odor in the room',
      'Visible white acidic aerosol fuming near bench surface',
      'Spreading clear puddle bubbling against paper or metal objects'
    ],
    sdsReference: 'Hydrochloric Acid, 12M (CAS 7647-01-0) - Signal: DANGER - H314: Causes severe skin burns.',
    requiredPPE: ['Chemical Splash Goggles (ANSI Z87.1 D3)', 'Nitrile/Neoprene Chemical Gloves', '100% Cotton Lab Coat'],
    requiredTools: ['Acid Neutralizing Spill Kit', 'Sodium Bicarbonate (NaHCO₃)', 'Inert Polypropylene Absorbent Pads', 'Hazardous Waste Container'],
    unsafeActionsToAvoid: [
      'NEVER attempt to wipe concentrated acid with dry paper towels (exothermic fire hazard)',
      'NEVER pour water directly into a concentrated acid pool (violent steam flash)',
      'NEVER pick up broken glass fragments with bare hands',
      'NEVER wash acid residues into regular municipal sink drains'
    ],
    initialEquipStatus: {
      beaker_acid: 'spilling',
      spill_kit: 'normal'
    },
    steps: [
      {
        id: 'acid_step_1',
        title: 'Alert Laboratory & Verify Protective PPE',
        instruction: 'Notify all personnel in the immediate vicinity to step back at least 2 meters. Inspect and ensure splash goggles and nitrile barrier gloves are securely equipped.',
        whyItMatters: 'Corrosive aerosol splashes can cause irreversible corneal scarring within 10 seconds. Notifying colleagues prevents accidental cross-contamination.',
        actionRequired: 'verify_ppe',
        targetEquipmentId: 'safety_goggles',
        unsafeActionToAvoid: 'Do not lean over the fuming puddle without eye protection to inspect the spill volume.',
        isCompleted: false,
        hint: 'Equip your splash goggles and nitrile gloves from your PPE inventory.'
      },
      {
        id: 'acid_step_2',
        title: 'Retrieve Acid Neutralizing Spill Kit',
        instruction: 'Pick up the specialized chemical spill response kit from the under-bench safety cabinet.',
        whyItMatters: 'General cleanup materials are unsuitable for strong acids. The spill kit contains amphoteric buffering agents and chemical-resistant polypropylene dike pads.',
        actionRequired: 'equip_spill_kit',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not use standard cellulose mops or absorbent cotton that can chemically degrade.',
        isCompleted: false,
        hint: 'Click on the yellow spill kit located in the lower storage area.'
      },
      {
        id: 'acid_step_3',
        title: 'Scatter Sodium Bicarbonate Buffer Inward',
        instruction: 'Carefully sprinkle dry sodium bicarbonate (NaHCO₃) powder around the outer perimeter of the spill, working systematically inward until bubbling effervescence ceases.',
        whyItMatters: 'Circumscribing the perimeter halts further liquid spread. The bicarbonate neutralizes hydronium ions (H⁺ + HCO₃⁻ → CO₂ + H₂O) into non-hazardous salt water, indicated when CO₂ bubbling stops.',
        actionRequired: 'apply_neutralizer',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not dump large mounds of neutralizer all at once; rapid neutralization generates localized heat and violent foaming.',
        isCompleted: false,
        hint: 'Click "Scatter Sodium Bicarbonate Buffer" in the action panel.'
      },
      {
        id: 'acid_step_4',
        title: 'Absorb Slurry & Containerize Hazardous Residue',
        instruction: 'Place chemical-resistant absorbent pads over the neutralized slurry, scoop into the heavy-duty polyethylene waste bag, and seal with a hazard tag.',
        whyItMatters: 'Proper segregation prevents accidental reaction in municipal trash and complies with EPA and OSHA HazCom regulations.',
        actionRequired: 'absorb_slurry',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not discard chemical-soaked pads into regular municipal paper waste bins.',
        isCompleted: false,
        hint: 'Click "Deploy Absorbent Pads & Containerize Waste".'
      }
    ],
    successSummary: 'Concentrated acid spill was completely neutralized, absorbed, and securely sealed in hazardous waste packaging with zero personnel exposure!'
  },
  {
    id: 'base_spill',
    title: 'Strong Base / Alkali Spill (Sodium Hydroxide)',
    category: 'chemical',
    severity: 'high',
    estimatedDuration: '4 min',
    icon: 'Droplets',
    shortDescription: 'A 250 mL beaker of 6M Sodium Hydroxide (NaOH) was spilled across the center benchtop.',
    fullDescription: 'Alkaline solutions (caustic soda, potassium hydroxide) are deceptive: they feel slippery rather than immediately painful, but cause saponification of subcutaneous lipids, resulting in deep, penetrating liquefaction necrosis of tissue and permanent blindness if splashed.',
    immediateRisks: [
      'Liquefaction necrosis of skin and rapid corneal destruction',
      'Extreme slip hazard due to saponification of floor or surface oils',
      'Corrosive etching of bench surfaces and aluminum fixtures'
    ],
    symptomsOrIndicators: [
      'Viscous, slippery clear liquid pool on bench surface',
      'Slick soapy texture on gloves if touched',
      'Rapid white efflorescence along dry borders'
    ],
    sdsReference: 'Sodium Hydroxide, 6M (CAS 1310-73-2) - Signal: DANGER - H314: Severe skin burns and eye damage.',
    requiredPPE: ['ANSI Z87.1 D3 Splash Goggles', 'Heavy Nitrile/Neoprene Gloves', 'Lab Coat'],
    requiredTools: ['Base Spill Kit', 'Citric Acid / Dilute Boric Acid Neutralizer', 'Universal pH Indicator Paper', 'Absorbent Pads'],
    unsafeActionsToAvoid: [
      'NEVER neutralize strong bases with concentrated mineral acids like HCl (explosive thermal boiling)',
      'NEVER walk through base puddles (alkalis dissolve shoe soles and cause severe slips)',
      'NEVER use aluminum scoops (bases react violently with aluminum producing explosive hydrogen gas)'
    ],
    initialEquipStatus: {
      graduated_cylinder: 'spilling',
      spill_kit: 'normal'
    },
    steps: [
      {
        id: 'base_step_1',
        title: 'Verify Caustic Chemical PPE',
        instruction: 'Ensure chemical splash goggles and nitrile barrier gloves are properly fitted before initiating cleanup.',
        whyItMatters: 'Alkali splashes to the eye penetrate cornea within seconds, saponifying cellular membranes.',
        actionRequired: 'verify_ppe',
        targetEquipmentId: 'safety_goggles',
        unsafeActionToAvoid: 'Do not rub face or glasses with gloved hands.',
        isCompleted: false,
        hint: 'Equip goggles and gloves from your inventory.'
      },
      {
        id: 'base_step_2',
        title: 'Dike Perimeter with Base Absorbent Pads',
        instruction: 'Encircle the pooling caustic liquid with absorbent barrier pillows to prevent migration down bench seams.',
        whyItMatters: 'Containing the perimeter minimizes the surface area of caustic liquid and stops bench runoff.',
        actionRequired: 'equip_spill_kit',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not let caustic base seep into under-bench electrical junction channels.',
        isCompleted: false,
        hint: 'Pick up and deploy the spill kit from the cabinet.'
      },
      {
        id: 'base_step_3',
        title: 'Apply Weak Organic Acid Neutralizer (Citric Acid)',
        instruction: 'Slowly distribute dry citric acid or buffered dilute boric acid powder across the pool until the pH paper indicates neutral pH 7-8.',
        whyItMatters: 'Weak organic acids provide controlled neutralization without the dangerous boiling spikes of mineral acids.',
        actionRequired: 'apply_neutralizer',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Never use concentrated nitric or hydrochloric acid to neutralize bases.',
        isCompleted: false,
        hint: 'Use the neutralizing action on the spill.'
      },
      {
        id: 'base_step_4',
        title: 'Wipe Clean & Test Surface pH',
        instruction: 'Mop residue with damp absorbent cloths and confirm workbench pH is strictly between 6 and 8 with pH paper.',
        whyItMatters: 'Residual base leaves slippery alkaline films that remain hazardous to future lab occupants.',
        actionRequired: 'absorb_slurry',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not leave unverified wet residues on the workspace.',
        isCompleted: false,
        hint: 'Complete the absorbent cleanup and containerize waste.'
      }
    ],
    successSummary: 'Caustic base neutralized safely with buffered organic acid and cleaned to neutral pH with zero slip or splash incidents!'
  },
  {
    id: 'unknown_spill',
    title: 'Unknown Chemical Spill of Unidentified Origin',
    category: 'chemical',
    severity: 'high',
    estimatedDuration: '4 min',
    icon: 'HelpCircle',
    shortDescription: 'A puddling yellowish mystery liquid was discovered on an unattended side bench without labeling.',
    fullDescription: 'Treating any unidentified chemical as harmless is a leading cause of lab fatalities. Unknown spills must always be approached under worst-case assumptions (toxic, corrosive, volatile, or reactive) until systematically identified.',
    immediateRisks: [
      'Inhalation of toxic odorless or delayed-action vapors',
      'Violent reaction if inappropriately neutralized with incompatible reagents',
      'Skin absorption of insidious systemic poisons'
    ],
    symptomsOrIndicators: [
      'Unattended yellow-tinged liquid pool on benchtop',
      'Absence of labeling, notebook notes, or hazard signs nearby',
      'Potential fuming or distinct solvent vapor'
    ],
    sdsReference: 'Protocol: General Unknown Hazardous Chemical Response (OSHA 1910.1450).',
    requiredPPE: ['Splash Goggles', 'Heavy Chemical Barrier Gloves', 'Lab Coat'],
    requiredTools: ['Universal pH Indicator Strips', 'Neutral Inert Vermiculite Absorbent', 'Volatile Organic Detector / Fume Hood'],
    unsafeActionsToAvoid: [
      'NEVER smell, sniff, or waft the unknown liquid directly',
      'NEVER apply strong acids or strong bases without testing pH first',
      'NEVER attempt to taste or touch the substance',
      'NEVER pour down sinks or allow evaporation into the room'
    ],
    steps: [
      {
        id: 'unk_step_1',
        title: 'Evacuate Unprotected Area & Don Full PPE',
        instruction: 'Cordon off the bench area and ensure complete eye, skin, and respiratory protection are donned.',
        whyItMatters: 'Unknown reagents can emit cyanide, halogen vapors, or volatile neurotoxins.',
        actionRequired: 'verify_ppe',
        targetEquipmentId: 'safety_goggles',
        unsafeActionToAvoid: 'Do not lean directly over the puddle to examine appearance.',
        isCompleted: false,
        hint: 'Equip your PPE to guarantee initial barrier safety.'
      },
      {
        id: 'unk_step_2',
        title: 'Test Chemical pH with Extended Forceps',
        instruction: 'Using long crucible tongs or forceps, touch a strip of wide-range universal pH paper to the edge of the puddle.',
        whyItMatters: 'Determining whether the substance is strongly acidic (red), strongly basic (blue/purple), or neutral solvent guides all subsequent cleanup steps.',
        actionRequired: 'read_meniscus',
        targetEquipmentId: 'test_tube_rack',
        unsafeActionToAvoid: 'Do not dip fingers or short strips into the liquid.',
        isCompleted: false,
        hint: 'Inspect reagent characteristics safely using the tool rack.'
      },
      {
        id: 'unk_step_3',
        title: 'Apply Universal Inert Absorbent (Vermiculite)',
        instruction: 'Deploy non-reactive, non-combustible vermiculite or amorphous silica absorbent over the spill.',
        whyItMatters: 'Inert mineral absorbents physically trap liquids without triggering chemical decomposition or exothermic release.',
        actionRequired: 'apply_neutralizer',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not use reactive sawdust or reactive bicarbonate before chemical identity is confirmed.',
        isCompleted: false,
        hint: 'Use the spill response kit to apply inert containment.'
      },
      {
        id: 'unk_step_4',
        title: 'Package in Hazmat Drum & Label as Unknown Waste',
        instruction: 'Transfer absorbent mixture into an EPA-compliant hazardous waste pail labeled "UNIDENTIFIED CHEMICAL WASTE - PENDING ANALYSIS".',
        whyItMatters: 'Clear documentation alerts EHS staff to isolate the container for analytical screening before treatment.',
        actionRequired: 'absorb_slurry',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not mix with known halogenated or non-halogenated solvent carboys.',
        isCompleted: false,
        hint: 'Finalize containment into the labeled container.'
      }
    ],
    successSummary: 'Unknown chemical spill contained with inert mineral absorbents and safely sequestered for certified EHS chemical disposal.'
  },
  {
    id: 'eye_splash',
    title: 'Chemical Splash in the Eyes Emergency',
    category: 'chemical',
    severity: 'critical',
    estimatedDuration: '3 min',
    icon: 'Eye',
    shortDescription: 'Liquid chemical droplet splashed past safety glasses directly into a student\'s eye during pouring.',
    fullDescription: 'Corrosive chemicals (acids and especially alkalis) begin damaging epithelial corneal cells within milliseconds. Without instantaneous and continuous irrigation, permanent opacity, corneal ulceration, and total blindness can occur.',
    immediateRisks: [
      'Permanent corneal blindness and irreversible chemical burns',
      'Blepharospasm (involuntary eyelid clenching) trapping chemicals against the cornea',
      'Secondary facial and nasal mucous membrane burns'
    ],
    symptomsOrIndicators: [
      'Sudden intense stinging, burning pain in eye',
      'Involuntary eyelid spasm and intense lacrimation (tearing)',
      'Severe photophobia and rapid conjunctival redness'
    ],
    sdsReference: 'Emergency Protocol: ANSI Z358.1 Emergency Eyewash and Shower Equipment Standard.',
    requiredPPE: ['Eyewash station immediately available within 10 unobstructed seconds'],
    requiredTools: ['ANSI Emergency Eyewash Station (aerated tepid water flow: 1.5 L/min at 16-38°C)'],
    unsafeActionsToAvoid: [
      'NEVER delay eyewash irrigation to look for neutralizers or eyewash bottles',
      'NEVER rub or press on the injured eye (grinds chemical crystals into cornea)',
      'NEVER attempt to neutralize acid with base in the eye (generates boiling heat)',
      'NEVER discontinue washing before a full, uninterrupted 15 minutes have elapsed'
    ],
    initialEquipStatus: {
      eyewash_station: 'normal'
    },
    steps: [
      {
        id: 'eye_step_1',
        title: 'Rush Immediately to Eyewash Station (< 10 Seconds)',
        instruction: 'Guide the victim or navigate immediately to the emergency eyewash station on the left wall without stopping to remove contact lenses or clothing.',
        whyItMatters: 'Every 5 seconds of delay drastically worsens corneal destruction. Immediate flushing dilutes and carries away the concentrated corrosive agent.',
        actionRequired: 'navigate_eyewash',
        targetEquipmentId: 'eyewash_station',
        unsafeActionToAvoid: 'Do not stop to read the chemical label or search for first aid kits.',
        isCompleted: false,
        hint: 'Click directly on the Eyewash Station on the left wall.'
      },
      {
        id: 'eye_step_2',
        title: 'Push Yellow Lever to Lock Flow Open',
        instruction: 'Depress the high-visibility yellow "PUSH" flag lever forward to engage the hands-free continuous dual aerated water streams.',
        whyItMatters: 'The stay-open valve allows both of the user\'s hands to remain completely free to hold eyelids open during the irrigation.',
        actionRequired: 'activate_eyewash_lever',
        targetEquipmentId: 'eyewash_station',
        unsafeActionToAvoid: 'Do not use high-pressure tap faucets which can cause mechanical eye trauma.',
        isCompleted: false,
        hint: 'Click "Push Eyewash Lever" to start the continuous flow.'
      },
      {
        id: 'eye_step_3',
        title: 'Force Eyelids Open & Roll Eyes Continuously',
        instruction: 'Use thumb and index fingers to forcibly retract both upper and lower eyelids. Rotate eyeballs up, down, and in circles through the water jets for a minimum of 15 minutes.',
        whyItMatters: 'Involuntary muscle spasms trap corrosive liquid in the conjunctival fornices beneath the lids unless physically held open.',
        actionRequired: 'perform_15m_rinse',
        targetEquipmentId: 'eyewash_station',
        unsafeActionToAvoid: 'Do not close eyes or blink away from the water stream.',
        isCompleted: false,
        hint: 'Maintain position for the full 15-minute irrigation protocol.'
      },
      {
        id: 'eye_step_4',
        title: 'Seek Immediate Emergency Ophthalmic Care',
        instruction: 'Call 911/emergency medical services while irrigation is underway. Cover eyes loosely with clean sterile gauze for hospital transit.',
        whyItMatters: 'Alkali burns can continue penetrating ocular tissue hours after initial exposure without professional medical evaluation.',
        actionRequired: 'inspect_sds',
        targetEquipmentId: 'reagent_ethanol',
        unsafeActionToAvoid: 'Do not apply topical eye ointments, oils, or anesthetics before ophthalmology triage.',
        isCompleted: false,
        hint: 'Review chemical SDS information to provide to the arriving paramedic team.'
      }
    ],
    successSummary: 'Full 15-minute continuous eyewash flush completed successfully, protecting the cornea from permanent chemical damage!'
  },
  {
    id: 'skin_exposure',
    title: 'Chemical Exposure on Skin or Clothing',
    category: 'chemical',
    severity: 'critical',
    estimatedDuration: '3 min',
    icon: 'ShieldAlert',
    shortDescription: 'Corrosive chemical soaked through clothing onto student\'s forearm and chest.',
    fullDescription: 'Clothing acts as a sustained chemical reservoir, keeping corrosive reagents pressed tightly against the epidermis. Rapid stripping of contaminated clothing under a drench shower is the single most critical intervention.',
    immediateRisks: ['Full-thickness thermal and chemical skin burns', 'Systemic vascular absorption of toxic compounds', 'Secondary burns to rescuers'],
    symptomsOrIndicators: ['Immediate burning or stinging sensation', 'Visible discoloration or wet patch soaking through coat', 'Skin erythema (redness) or whitening'],
    sdsReference: 'OSHA Technical Manual: Section VIII Emergency Drench Showers.',
    requiredPPE: ['Emergency Safety Shower (Minimum 20 gal/min flow rate)'],
    requiredTools: ['Deluge Safety Shower Pull Chain', 'Clean Replacement Coveralls / Blanket'],
    unsafeActionsToAvoid: [
      'NEVER pull chemical-soaked pull-over shirts over the head (burns face and eyes)',
      'NEVER let modesty prevent stripping soaked clothing in an emergency',
      'NEVER apply salves, butter, or neutralizing agents to burned skin'
    ],
    steps: [
      {
        id: 'skin_step_1',
        title: 'Move Victim Under Deluge Safety Shower',
        instruction: 'Position victim directly beneath the emergency overhead safety shower deluge head on the left wall.',
        whyItMatters: 'High-volume water deluge instantly flushes away concentrated liquid before deeper epidermal penetration occurs.',
        actionRequired: 'navigate_eyewash',
        targetEquipmentId: 'eyewash_station',
        unsafeActionToAvoid: 'Do not attempt to walk to distant restroom sinks.',
        isCompleted: false,
        hint: 'Navigate to the safety shower station on the left wall.'
      },
      {
        id: 'skin_step_2',
        title: 'Pull Deluge Shower Ring Chain',
        instruction: 'Firmly pull the triangular overhead chain ring down to activate full 20 GPM deluge shower flow.',
        whyItMatters: 'Continuous high-volume flooding provides immediate hydraulic wash-off across body surfaces.',
        actionRequired: 'activate_eyewash_lever',
        targetEquipmentId: 'eyewash_station',
        unsafeActionToAvoid: 'Do not turn water off early because of cold temperature.',
        isCompleted: false,
        hint: 'Engage the overhead deluge shower.'
      },
      {
        id: 'skin_step_3',
        title: 'Strip Contaminated Garments Under Water',
        instruction: 'While under the rushing water, immediately remove lab coat, shirts, trousers, and jewelry. Cut clothing off if necessary rather than pulling over face.',
        whyItMatters: 'Fabric holds chemical against skin; leaving soaked clothes on continues the chemical burn indefinitely.',
        actionRequired: 'equip_lab_coat',
        targetEquipmentId: 'lab_coat_peg',
        unsafeActionToAvoid: 'Never leave soaked garments on while showering.',
        isCompleted: false,
        hint: 'Strip and replace contaminated garments.'
      },
      {
        id: 'skin_step_4',
        title: 'Rinse Minimum 15 Minutes & Cover with Clean Blanket',
        instruction: 'Continue showering for at least 15 uninterrupted minutes. Wrap victim in a clean emergency blanket and escort to medical treatment.',
        whyItMatters: 'Prolonged rinsing eliminates traces absorbed in skin folds. Emergency blanket prevents hypothermia from cold water wash.',
        actionRequired: 'deploy_blanket',
        targetEquipmentId: 'fire_blanket',
        unsafeActionToAvoid: 'Do not apply adhesive bandages or burn creams over chemical burn sites.',
        isCompleted: false,
        hint: 'Retrieve the emergency blanket from the wall station.'
      }
    ],
    successSummary: 'Victim stripped of chemical-soaked clothing and showered for 15 minutes, preventing severe chemical ulceration!'
  },
  {
    id: 'leaking_container',
    title: 'Leaking Chemical Container on Storage Shelf',
    category: 'chemical',
    severity: 'moderate',
    estimatedDuration: '3 min',
    icon: 'Package',
    shortDescription: 'A cracked reagent bottle is slowly dripping liquid onto wooden shelving in the storage area.',
    fullDescription: 'Slow leaks in storage areas can quietly corrode shelving, react with lower containers, or generate explosive peroxide crystals if solvents evaporate slowly.',
    immediateRisks: ['Structural shelf collapse from chemical corrosion', 'Spontaneous exothermic reactions with reagents on lower shelves', 'Continuous vapor accumulation'],
    symptomsOrIndicators: ['Wet ring or crystalline crust beneath bottle', 'Faint odor near chemical cabinet', 'Warped or discolored shelf paint'],
    sdsReference: 'Chemical Storage and Secondary Containment Standards (Prudent Practices in the Laboratory).',
    requiredPPE: ['Splash Goggles', 'Chemical Gloves', 'Lab Coat'],
    requiredTools: ['Secondary Containment Spill Pan', 'Compatible Transfer Funnel', 'Clean Labeled Reagent Bottle'],
    unsafeActionsToAvoid: ['NEVER lift a cracked bottle by its neck', 'NEVER place leaking bottle in standard trash', 'NEVER ignore slow shelf leaks'],
    steps: [
      {
        id: 'leak_step_1',
        title: 'Inspect Container Integrity with Secondary Pan',
        instruction: 'Place a polypropylene secondary containment tray immediately below the leaking bottle before touching it.',
        whyItMatters: 'If the bottle shatters upon lifting, all contents will be safely captured in the secondary tub.',
        actionRequired: 'equip_spill_kit',
        targetEquipmentId: 'flammable_cabinet',
        unsafeActionToAvoid: 'Do not grab the bottle by its fragile cracked neck.',
        isCompleted: false,
        hint: 'Retrieve the containment tray from the spill equipment.'
      },
      {
        id: 'leak_step_2',
        title: 'Transfer Chemical into Clean Labeled Vessel',
        instruction: 'Using a chemical-resistant funnel, transfer remaining liquid into a sound, certified glass or HDPE bottle.',
        whyItMatters: 'Transferring contents arrests the ongoing leak and preserves chemical identity.',
        actionRequired: 'invert_mix',
        targetEquipmentId: 'volumetric_flask',
        unsafeActionToAvoid: 'Do not pour without a proper funnel.',
        isCompleted: false,
        hint: 'Execute the fluid transfer procedure.'
      },
      {
        id: 'leak_step_3',
        title: 'Neutralize & Wipe Shelf Contamination',
        instruction: 'Decontaminate the shelving surface with appropriate neutralizing buffer and dry completely.',
        whyItMatters: 'Eliminates corrosive remnants that could damage future containers or harm handlers.',
        actionRequired: 'apply_neutralizer',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not leave wet corrosive traces on wood or metal shelves.',
        isCompleted: false,
        hint: 'Apply neutralizing powder to shelf dripping.'
      }
    ],
    successSummary: 'Chemical safely decanted into sound container and storage shelving decontaminated.'
  },
  {
    id: 'incompatible_mix',
    title: 'Incompatible Chemicals Mixed Accidentally',
    category: 'chemical',
    severity: 'critical',
    estimatedDuration: '4 min',
    icon: 'Zap',
    shortDescription: 'Bleach and an acidic reagent were mistakenly combined in a beaker, releasing toxic chlorine gas!',
    fullDescription: 'Mixing sodium hypochlorite (bleach) with acid rapidly produces chlorine gas (Cl₂). Mixing oxidizers with flammables or cyanides with acids can produce lethal toxic clouds or flash explosions.',
    immediateRisks: ['Lethal chlorine / phosgene / NOx toxic gas release', 'Violent boiling spatter and vessel rupture', 'Pulmonary edema in occupants'],
    symptomsOrIndicators: ['Sudden vigorous bubbling and greenish-yellow gas formation', 'Sharp suffocating chlorine smell', 'Rapid beaker temperature spike'],
    sdsReference: 'Incompatible Chemical Matrix (EPA-600/2-80-076).',
    requiredPPE: ['Full Chemical Splash Goggles', 'Nitrile Gloves', 'Certified Fume Hood Isolation'],
    requiredTools: ['Fume Hood Sash Control', 'Chemical Quenching Agent (Sodium Thiosulfate)'],
    unsafeActionsToAvoid: ['NEVER stay in the room without ventilation', 'NEVER stopper an actively gas-generating vessel (creates a bomb)', 'NEVER breathe gas clouds to test'],
    steps: [
      {
        id: 'incomp_step_1',
        title: 'Move Vessel Inside Fume Hood Immediately',
        instruction: 'Carefully slide the reaction vessel into the certified fume hood and pull the safety sash down to the 18-inch safety mark.',
        whyItMatters: 'The hood exhaust pulls toxic gas directly out through charcoal filters, preventing deadly gas buildup in the lab.',
        actionRequired: 'toggle_sash',
        targetEquipmentId: 'fume_hood',
        unsafeActionToAvoid: 'Do not lean over the vessel while moving it.',
        isCompleted: false,
        hint: 'Lower the fume hood sash to isolate toxic gas generation.'
      },
      {
        id: 'incomp_step_2',
        title: 'Alert Laboratory & Ventilate Area',
        instruction: 'Notify all students to step back and turn room HVAC to emergency purge mode.',
        whyItMatters: 'Chlorine gas is heavier than air and sinks to floor level, traveling rapidly across rooms.',
        actionRequired: 'verify_ppe',
        targetEquipmentId: 'safety_goggles',
        unsafeActionToAvoid: 'Do not assume gas will dissipate without exhaust.',
        isCompleted: false,
        hint: 'Ensure lab safety boundaries are enforced.'
      },
      {
        id: 'incomp_step_3',
        title: 'Quench Reaction with Sodium Thiosulfate Reducer',
        instruction: 'Carefully introduce dilute sodium thiosulfate solution to reduce chlorine gas into harmless chloride ions.',
        whyItMatters: 'Chemical reduction eliminates active oxidizing chlorine and stops vapor production.',
        actionRequired: 'apply_neutralizer',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Never cap the flask tightly while reaction is active.',
        isCompleted: false,
        hint: 'Apply neutralizing reducing agent.'
      }
    ],
    successSummary: 'Toxic gas generation contained inside fume hood, reaction quenched safely, and air cleared.'
  },
  {
    id: 'toxic_vapor',
    title: 'Toxic Vapor or Suspected Gas Leak',
    category: 'chemical',
    severity: 'critical',
    estimatedDuration: '3 min',
    icon: 'Wind',
    shortDescription: 'Strong rotten egg or sweet solvent vapor detected near the gas manifold or chemical store.',
    fullDescription: 'Gas leaks (such as fuel methane, hydrogen sulfide H₂S, or ammonia NH₃) pose simultaneous toxicity and catastrophic explosion hazards.',
    immediateRisks: ['Vapor cloud explosion / flash fire from electrical sparks', 'Sensory olfactory fatigue (H₂S paralyzes sense of smell before death)', 'Asphyxiation in confined spaces'],
    symptomsOrIndicators: ['Pungent, sulfurous, or sweet chemical odor', 'Hissing sound near bench valves', 'Eye irritation in multiple occupants'],
    sdsReference: 'NFPA 55: Compressed Gases and Cryogenic Fluids Code.',
    requiredPPE: ['Self-Contained Breathing Apparatus (SCBA) / Immediate Evacuation'],
    requiredTools: ['Main Gas Emergency Shutoff Button', 'Room Exhaust Fan Booster'],
    unsafeActionsToAvoid: ['NEVER flip electrical wall switches or unplug appliances (spark hazard)', 'NEVER use cellphones or lighters in the gas cloud', 'NEVER re-enter the lab without clearance'],
    steps: [
      {
        id: 'vapor_step_1',
        title: 'Hit Main Emergency Gas Shutoff Cock',
        instruction: 'Strike the red emergency main gas shutoff valve button located beside the primary exit door.',
        whyItMatters: 'Isolating the primary gas manifold cuts off fuel at the building supply line.',
        actionRequired: 'shut_gas_valve',
        targetEquipmentId: 'bunsen_burner',
        unsafeActionToAvoid: 'Do not touch electric switches or light toggle levers.',
        isCompleted: false,
        hint: 'Shut the gas cock valve on the bench.'
      },
      {
        id: 'vapor_step_2',
        title: 'Engage Emergency Fume Hood Purge',
        instruction: 'Switch fume hoods and ventilation systems into high-speed emergency purge exhaust mode.',
        whyItMatters: 'Forces high-velocity air exchange across room ceilings and floors.',
        actionRequired: 'toggle_sash',
        targetEquipmentId: 'fume_hood',
        unsafeActionToAvoid: 'Do not open standard windows if gas is flammable near street traffic.',
        isCompleted: false,
        hint: 'Open and adjust fume hood ventilation.'
      },
      {
        id: 'vapor_step_3',
        title: 'Evacuate All Personnel to Assembly Point',
        instruction: 'Direct all occupants out through the illuminated exit route and assemble at the outdoor muster point.',
        whyItMatters: 'Ensures life safety in the event of an uncontained explosive concentration.',
        actionRequired: 'inspect_sds',
        targetEquipmentId: 'reagent_ethanol',
        unsafeActionToAvoid: 'Do not allow anyone to return inside for personal belongings.',
        isCompleted: false,
        hint: 'Verify safety protocols.'
      }
    ],
    successSummary: 'Main gas supply isolated, lab purged, and all occupants safely accounted for at the assembly point.'
  },
  {
    id: 'broken_glassware',
    title: 'Broken Contaminated Glassware on Floor',
    category: 'chemical',
    severity: 'moderate',
    estimatedDuration: '3 min',
    icon: 'ShieldOff',
    shortDescription: 'A 250 mL flask containing heavy metal salt shattered across the walkway floor.',
    fullDescription: 'Broken glass carrying chemical or biological residue combines mechanical puncture laceration risk with subcutaneous chemical inoculation.',
    immediateRisks: ['Direct blood-borne chemical poisoning through deep glass laceration', 'Slip and fall onto razor-sharp glass shards', 'Contamination spread by foot traffic'],
    symptomsOrIndicators: ['Shattered glass shards surrounded by colored liquid on floor', 'Audible crash in the laboratory', 'Jagged glass fragments scattered in walkway'],
    sdsReference: 'OSHA 1910.1030 Sharps and Contaminated Glassware Standard.',
    requiredPPE: ['Puncture-Resistant Heavy Utility Gloves', 'Safety Glasses', 'Closed-Toe Leather Shoes'],
    requiredTools: ['Dustpan & Brush (Never bare hands)', 'Cardboard Glass Disposal Box with Poly-Liner', 'Disinfectant / Neutralizer'],
    unsafeActionsToAvoid: ['NEVER pick up glass shards with bare or thin nitrile gloves', 'NEVER dispose of glass in regular plastic trash bags', 'NEVER push glass down into disposal boxes with feet'],
    steps: [
      {
        id: 'glass_step_1',
        title: 'Barricade Floor Area & Don Heavy Cut Gloves',
        instruction: 'Stand guard or place caution cones around broken glass. Don heavy cut-resistant gloves over nitrile barriers.',
        whyItMatters: 'Prevents peers from stepping into shards; thin gloves offer zero puncture protection against jagged glass.',
        actionRequired: 'equip_gloves',
        targetEquipmentId: 'nitrile_gloves',
        unsafeActionToAvoid: 'Do not pick up any fragment with bare hands.',
        isCompleted: false,
        hint: 'Equip gloves from the bench dispenser.'
      },
      {
        id: 'glass_step_2',
        title: 'Sweep Glass Shards with Dustpan and Hand Broom',
        instruction: 'Use the bench brush and dustpan to collect all large shards and fine slivers into a central pile.',
        whyItMatters: 'Mechanical tools keep hands at a safe distance from razor edges.',
        actionRequired: 'absorb_slurry',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not use laboratory vacuum cleaners (spreads chemical aerosol).',
        isCompleted: false,
        hint: 'Use the spill cleanup tool to gather fragments.'
      },
      {
        id: 'glass_step_3',
        title: 'Deposit in Designated Rigid Glass Disposal Box',
        instruction: 'Transfer swept glass into the puncture-proof cardboard box marked "CAUTION: BROKEN GLASS ONLY" and seal tape.',
        whyItMatters: 'Protects custodial staff from needle-like punctures during waste handling.',
        actionRequired: 'equip_spill_kit',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Never discard into standard soft plastic trash cans.',
        isCompleted: false,
        hint: 'Deposit fragments in the dedicated sharps box.'
      }
    ],
    successSummary: 'Contaminated broken glassware swept and deposited in puncture-proof sharps box with zero cuts!'
  },
  {
    id: 'mercury_spill',
    title: 'Mercury Spill from Broken Thermometer',
    category: 'chemical',
    severity: 'high',
    estimatedDuration: '4 min',
    icon: 'AlertTriangle',
    shortDescription: 'A traditional mercury laboratory thermometer rolled off the bench and shattered, releasing silver beads.',
    fullDescription: 'Elemental mercury (Hg) shatters into thousands of microscopic droplets with immense surface area. It readily vaporizes at room temperature into a colorless, odorless, potent neurological toxin.',
    immediateRisks: ['Chronic neurological brain and kidney damage from mercury vapor inhalation', 'Droplets settling deep into cracks and baseboards for years', 'Secondary contamination carried on shoe soles'],
    symptomsOrIndicators: ['Silvery liquid metallic beads rolling freely across surface', 'Fractured red-back thermometer capillary glass'],
    sdsReference: 'Elemental Mercury (CAS 7439-97-6) - Signal: DANGER - H330: Fatal if inhaled.',
    requiredPPE: ['Nitrile Gloves', 'Splash Goggles', 'Mercury Vapor Respirator if available'],
    requiredTools: ['Specialist Mercury Decontaminant Powder (Zinc/Sulfur amalgam)', 'Mercury Aspirator Bulb / Index Card Scoop', 'Air-Tight Jar'],
    unsafeActionsToAvoid: ['NEVER use a regular vacuum cleaner (heats mercury into lethal vapor cloud)', 'NEVER use a broom (pulverizes beads into smaller aerosols)', 'NEVER wash mercury down the sink drain'],
    steps: [
      {
        id: 'hg_step_1',
        title: 'Restrict Access & Turn Off Bench Heating',
        instruction: 'Isolate the room immediately and shut off nearby burners or hotplates to prevent thermal vaporization of mercury.',
        whyItMatters: 'Mercury vapor pressure doubles with every 10°C temperature increase.',
        actionRequired: 'shut_gas_valve',
        targetEquipmentId: 'bunsen_burner',
        unsafeActionToAvoid: 'Do not vacuum or sweep vigorously.',
        isCompleted: false,
        hint: 'Turn off burners to lower temperature.'
      },
      {
        id: 'hg_step_2',
        title: 'Consolidate Beads Using Stiff Cardstock',
        instruction: 'Use two index cards or an aspirator bulb to push mercury droplets together into one larger sphere.',
        whyItMatters: 'Surface tension of mercury causes smaller beads to coalesce cleanly without mechanical friction.',
        actionRequired: 'equip_spill_kit',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Never touch droplets with bare hands.',
        isCompleted: false,
        hint: 'Retrieve the cleanup card and aspirator from the kit.'
      },
      {
        id: 'hg_step_3',
        title: 'Apply Sulfur / Zinc Amalgamation Powder',
        instruction: 'Dust fine elemental sulfur or zinc powder over any remaining cracks or seams.',
        whyItMatters: 'Sulfur reacts with mercury to form non-volatile, stable mercury sulfide (cinnabar, HgS), ending vapor release.',
        actionRequired: 'apply_neutralizer',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not leave untreated droplets hidden under baseboards.',
        isCompleted: false,
        hint: 'Apply amalgamation powder over the seams.'
      },
      {
        id: 'hg_step_4',
        title: 'Seal in Airtight Glass Jar with Water Layer',
        instruction: 'Scoop the amalgam into an airtight glass jar, cover with a 1 cm layer of water, and cap tightly.',
        whyItMatters: 'The water layer provides a vapor seal, ensuring zero toxic mercury gas escapes during transport.',
        actionRequired: 'absorb_slurry',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not use polyethylene bags which are permeable to mercury vapor.',
        isCompleted: false,
        hint: 'Seal into hazardous mercury container.'
      }
    ],
    successSummary: 'Mercury droplets consolidated, chemically amalgamated into non-volatile HgS, and sealed in airtight jar.'
  },
  {
    id: 'incorrect_storage',
    title: 'Incorrectly Stored Incompatible Chemicals',
    category: 'chemical',
    severity: 'moderate',
    estimatedDuration: '3 min',
    icon: 'Layers',
    shortDescription: 'Concentrated Nitric Acid (strong oxidizer) was stored directly alongside Ethanol (flammable solvent).',
    fullDescription: 'Storing oxidizers with flammable organics is a classic recipe for catastrophic fires and spontaneous explosions. A small leak or seismic tremor could cause violent, hypergolic ignition.',
    immediateRisks: ['Spontaneous hypergolic chemical fire / explosion', 'Corrosive vapor attack on organic container caps', 'Catastrophic cabinet burnout'],
    symptomsOrIndicators: ['Yellow bottle of Nitric acid sitting next to Amber Ethanol in same cabinet', 'Violent incompatible GHS symbols (Flame + Flame over Circle) adjacent'],
    sdsReference: 'NFPA 400: Hazardous Materials Code - Segregation of Incompatibles.',
    requiredPPE: ['Chemical Goggles', 'Nitrile Gloves', 'Lab Coat'],
    requiredTools: ['Dedicated Dedicated Acid Cabinet', 'Flammable Safety Cabinet'],
    unsafeActionsToAvoid: ['NEVER store oxidizers and organic solvents on the same shelf', 'NEVER store chemicals alphabetically regardless of class', 'NEVER store corrosives above eye level'],
    steps: [
      {
        id: 'store_step_1',
        title: 'Review Chemical Compatibility & GHS Diamonds',
        instruction: 'Inspect the GHS hazard classifications on both bottles (Ethanol = Flammable Category 2; Nitric Acid = Oxidizer Category 2 + Corrosive).',
        whyItMatters: 'Oxidizers provide concentrated oxygen that causes flammable solvents to burn explosively even without room air.',
        actionRequired: 'inspect_sds',
        targetEquipmentId: 'reagent_hno3',
        unsafeActionToAvoid: 'Do not handle bottles hastily.',
        isCompleted: false,
        hint: 'Inspect the Nitric Acid SDS protocol on the bench.'
      },
      {
        id: 'store_step_2',
        title: 'Transfer Nitric Acid to Dedicated Corrosive Cabinet',
        instruction: 'Relocate the concentrated Nitric Acid bottle into a dedicated blue or white poly-lined corrosive storage cabinet.',
        whyItMatters: 'Polypropylene cabinets resist acid corrosion and ensure physical segregation from all organics.',
        actionRequired: 'toggle_sash',
        targetEquipmentId: 'fume_hood',
        unsafeActionToAvoid: 'Do not carry acid bottles without a rubber safety bottle carrier.',
        isCompleted: false,
        hint: 'Transfer acid into its designated safe containment area.'
      },
      {
        id: 'store_step_3',
        title: 'Secure Ethanol in Flammable Liquids Cabinet',
        instruction: 'Place Ethanol back into the yellow double-walled steel Flammable Cabinet and ensure self-latching doors close tightly.',
        whyItMatters: 'Flammable cabinets provide 10-minute fire endurance and vapor isolation.',
        actionRequired: 'open_storage_cabinet',
        targetEquipmentId: 'flammable_cabinet',
        unsafeActionToAvoid: 'Do not prop flammable cabinet doors open.',
        isCompleted: false,
        hint: 'Store ethanol safely in the flammable cabinet.'
      }
    ],
    successSummary: 'Oxidizers and flammable solvents segregated into proper dedicated cabinets according to NFPA standards.'
  },
  {
    id: 'improper_waste',
    title: 'Improper Chemical Waste Disposal Attempt',
    category: 'chemical',
    severity: 'high',
    estimatedDuration: '3 min',
    icon: 'Trash2',
    shortDescription: 'A student is about to pour halogenated solvent and heavy metal solution down the regular handwashing sink!',
    fullDescription: 'Pouring chemical waste into municipal sinks corrodes building plumbing, can generate toxic sewer gas, destroys sewage treatment microflora, and violates federal clean water laws.',
    immediateRisks: ['Toxic gas blowout back through sink traps into the room', 'Corrosion of drain piping leading to under-slab leaks', 'Severe environmental water pollution'],
    symptomsOrIndicators: ['Student carrying beaker of colored chemical towards ceramic handwashing sink', 'Absence of waste log entry'],
    sdsReference: 'EPA Resource Conservation and Recovery Act (RCRA) Lab Waste Standards.',
    requiredPPE: ['Splash Goggles', 'Nitrile Gloves', 'Lab Coat'],
    requiredTools: ['Heavy Metal Aqueous Waste Carboy', 'Halogenated Organic Waste Carboy', 'Waste Manifest Log'],
    unsafeActionsToAvoid: ['NEVER pour concentrated chemicals into sinks', 'NEVER mix halogenated and non-halogenated organic wastes', 'NEVER overfill waste carboys beyond 80% capacity'],
    steps: [
      {
        id: 'waste_step_1',
        title: 'Intervene & Halt Sink Disposal Immediately',
        instruction: 'Instruct the operator to step away from the sink and place the reaction beaker securely on the bench.',
        whyItMatters: 'Halogenated chemicals and heavy metals like copper or lead accumulate in water ecosystems and create criminal environmental violations.',
        actionRequired: 'verify_ppe',
        targetEquipmentId: 'safety_goggles',
        unsafeActionToAvoid: 'Do not allow any drops to enter the sink drain.',
        isCompleted: false,
        hint: 'Stop the improper sink action.'
      },
      {
        id: 'waste_step_2',
        title: 'Identify Correct Hazardous Waste Stream',
        instruction: 'Inspect the solution: categorize into "Aqueous Heavy Metal Waste" vs "Halogenated Organic Waste".',
        whyItMatters: 'Mixing incompatible waste streams in drums can cause violent boiling, pressure buildup, and drum rupture.',
        actionRequired: 'inspect_sds',
        targetEquipmentId: 'erlenmeyer_flask',
        unsafeActionToAvoid: 'Never mix acid waste with cyanide or sulfide wastes.',
        isCompleted: false,
        hint: 'Review the solution composition on the Erlenmeyer flask.'
      },
      {
        id: 'waste_step_3',
        title: 'Pour into Dedicated Waste Carboy & Log Volume',
        instruction: 'Using a dedicated funnel, decant solution into the certified red or poly waste carboy, leave 20% headspace, and record volume on the manifest tag.',
        whyItMatters: 'Leaving 20% headspace prevents hydraulic rupture when room temperatures fluctuate.',
        actionRequired: 'invert_mix',
        targetEquipmentId: 'volumetric_flask',
        unsafeActionToAvoid: 'Never fill a waste jug to the brim.',
        isCompleted: false,
        hint: 'Complete safe transfer into the waste vessel.'
      }
    ],
    successSummary: 'Chemical waste diverted from sink and safely logged into proper hazardous waste stream.'
  },
  {
    id: 'unlabeled_container',
    title: 'Unlabeled Secondary Chemical Container',
    category: 'chemical',
    severity: 'moderate',
    estimatedDuration: '3 min',
    icon: 'Tag',
    shortDescription: 'A squeeze wash bottle filled with clear liquid has no label, formula, or user name on it.',
    fullDescription: 'Clear liquids in labs can be pure water, 100% ethanol, concentrated hydrochloric acid, or 50% sodium hydroxide. An unlabeled bottle is an accidental splash or poisoning waiting to happen.',
    immediateRisks: ['Misting eyes or skin with acid assuming it is wash water', 'Accidental combustion from spraying solvent near burners', 'Costly hazardous waste profiling fees'],
    symptomsOrIndicators: ['Blank bottle sitting beside active reactions', 'Missing GHS pictograms, chemical name, or date'],
    sdsReference: 'OSHA Hazard Communication Standard (29 CFR 1910.1200) Secondary Container Labeling.',
    requiredPPE: ['Safety Goggles', 'Nitrile Gloves'],
    requiredTools: ['GHS Secondary Label Sticker', 'Indelible Solvent Marker'],
    unsafeActionsToAvoid: ['NEVER leave any container unlabeled overnight', 'NEVER rely on memory to identify chemicals', 'NEVER sniff the bottle nozzle'],
    steps: [
      {
        id: 'label_step_1',
        title: 'Verify Liquid Identity with Lab Protocol Log',
        instruction: 'Consult the lab preparation protocol or responsible instructor to positively confirm identity without tasting or direct sniffing.',
        whyItMatters: 'Mistaking acetone for water when rinsing hot glassware causes instant flash fires.',
        actionRequired: 'inspect_sds',
        targetEquipmentId: 'reagent_ethanol',
        unsafeActionToAvoid: 'Never sniff the nozzle directly.',
        isCompleted: false,
        hint: 'Check laboratory protocol reference.'
      },
      {
        id: 'label_step_2',
        title: 'Affix GHS Secondary Container Label',
        instruction: 'Write chemical full name, concentration, date, preparer initials, and appropriate GHS pictograms on a solvent-resistant label.',
        whyItMatters: 'Ensures everyone entering the lab immediately understands the hazards.',
        actionRequired: 'adjust_clamp',
        targetEquipmentId: 'retort_stand',
        unsafeActionToAvoid: 'Do not use abbreviations or trade codes alone.',
        isCompleted: false,
        hint: 'Affix and secure chemical label.'
      }
    ],
    successSummary: 'Secondary container fully identified with compliant OSHA GHS labeling.'
  },

  // ==========================================
  // FIRE AND EMERGENCY HAZARDS (7 SCENARIOS)
  // ==========================================
  {
    id: 'contained_fire',
    title: 'Small Contained Laboratory Bench Fire',
    category: 'fire_emergency',
    severity: 'critical',
    estimatedDuration: '3 min',
    icon: 'Flame',
    shortDescription: 'A beaker of alcohol flashed over and is burning with a vigorous orange flame on the bench.',
    fullDescription: 'Liquid solvent fires spread rapidly if knocked over or if pressurized extinguishers scatter liquid. Smothering or precise CO₂ base sweep is vital.',
    immediateRisks: ['Thermal burns to face and arms', 'Boiling liquid expansion vapor explosion (BLEVE) of nearby glass', 'Ignition of overhead wooden cabinets'],
    symptomsOrIndicators: ['Vigorous flame plume rising from glassware', 'Audible crackling and radiant thermal heat', 'Thin black soot smoke rising toward ceiling'],
    sdsReference: 'NFPA 10: Standard for Portable Fire Extinguishers.',
    requiredPPE: ['Lab Coat (100% Cotton)', 'Goggles', 'CO₂ Fire Extinguisher'],
    requiredTools: ['Class B CO₂ Extinguisher', 'Watch Glass / Ceramic Crucible Cover'],
    unsafeActionsToAvoid: ['NEVER pour water onto a liquid solvent fire (causes massive fire explosion)', 'NEVER blow on flames with mouth', 'NEVER run while clothing is burning'],
    initialEquipStatus: {
      bunsen_burner: 'tipped'
    },
    steps: [
      {
        id: 'cfire_step_1',
        title: 'Isolate Gas & Clear Immediate Combustibles',
        instruction: 'Turn off the bench gas cock and quickly push plastic wash bottles and notebooks away from the flames.',
        whyItMatters: 'Starving the fire of additional fuel prevents a small bench fire from escalating into a structural room fire.',
        actionRequired: 'shut_gas_valve',
        targetEquipmentId: 'bunsen_burner',
        unsafeActionToAvoid: 'Do not reach across the flames to grab items.',
        isCompleted: false,
        hint: 'Shut the gas cock valve on the bench.'
      },
      {
        id: 'cfire_step_2',
        title: 'Retrieve Wall CO₂ Fire Extinguisher',
        instruction: 'Remove the red Class B/C CO₂ extinguisher from the wall mount bracket.',
        whyItMatters: 'CO₂ displaces atmospheric oxygen and cools fuel without leaving chemical residue on analytical balances.',
        actionRequired: 'equip_extinguisher',
        targetEquipmentId: 'fire_extinguisher',
        unsafeActionToAvoid: 'Do not hold the discharge horn barehanded (causes cryogenic freeze burns).',
        isCompleted: false,
        hint: 'Pick up the fire extinguisher from the wall mount.'
      },
      {
        id: 'cfire_step_3',
        title: 'Execute P.A.S.S. Step 1: Pull the Pin',
        instruction: 'Twist and pull the metal safety pin through the tamper seal to free the squeeze lever.',
        whyItMatters: 'The pin locks the discharge mechanism during storage.',
        actionRequired: 'pull_pin',
        targetEquipmentId: 'fire_extinguisher',
        unsafeActionToAvoid: 'Do not squeeze handle while pulling the pin.',
        isCompleted: false,
        hint: 'Pull the safety pin in the control dock.'
      },
      {
        id: 'cfire_step_4',
        title: 'Aim at Base of Fire & Sweep (P.A.S.S.)',
        instruction: 'Stand 2 meters back, aim nozzle at the base of the fuel, and sweep side to side until smothered.',
        whyItMatters: 'Aiming high into flames wastes agent; extinguishing requires smothering fuel surface directly.',
        actionRequired: 'extinguish_fire',
        targetEquipmentId: 'fire_extinguisher',
        unsafeActionToAvoid: 'Do not point nozzle directly into liquid pool at high velocity (splashes burning solvent).',
        isCompleted: false,
        hint: 'Discharge extinguisher at the base of the fire.'
      }
    ],
    successSummary: 'Fire safely extinguished following P.A.S.S. protocol with zero injuries or structural damage!'
  },
  {
    id: 'flammable_near_ignition',
    title: 'Flammable Liquid Adjacent to Ignition Source',
    category: 'fire_emergency',
    severity: 'high',
    estimatedDuration: '3 min',
    icon: 'AlertOctagon',
    shortDescription: 'An open beaker of 95% Ethanol sits just 10 cm from an ignited Bunsen burner flame.',
    fullDescription: 'Ethanol has a low flash point (14°C) and heavy invisible vapors that creep along bench surfaces until meeting an open flame or electric spark, resulting in sudden flashback.',
    immediateRisks: ['Vapor flashback igniting the open beaker', 'Beaker shattering from sudden heat and spraying flaming ethanol', 'Catastrophic clothing fire'],
    symptomsOrIndicators: ['Open beaker of solvent within 1 meter of open flame', 'Waving heat mirage between burner and solvent beaker'],
    sdsReference: 'NFPA 30: Flammable and Combustible Liquids Code.',
    requiredPPE: ['Splash Goggles', 'Cotton Lab Coat'],
    requiredTools: ['Flammable Liquid Safety Cabinet', 'Watch Glass Cover'],
    unsafeActionsToAvoid: ['NEVER move flammable solvents with bare hands near flames', 'NEVER heat flammable solvents over open flames (always use heating mantles or water baths)'],
    steps: [
      {
        id: 'flam_step_1',
        title: 'Extinguish Bunsen Flame First',
        instruction: 'Turn the needle valve on the Bunsen burner clockwise to shut down the flame before moving the volatile solvent.',
        whyItMatters: 'Moving an open container of solvent through air creates vapor turbulence that can instantly ignite if an open flame remains burning.',
        actionRequired: 'shut_gas_valve',
        targetEquipmentId: 'bunsen_burner',
        unsafeActionToAvoid: 'Do not pick up open beaker while burner flame is roaring.',
        isCompleted: false,
        hint: 'Shut off the gas supply first.'
      },
      {
        id: 'flam_step_2',
        title: 'Cover Solvent Beaker with Watch Glass',
        instruction: 'Place a borosilicate watch glass concave-down over the beaker mouth to seal volatile vapors.',
        whyItMatters: 'Capping the vessel stops volatile organic compounds from evaporating into room air.',
        actionRequired: 'swirl_flask',
        targetEquipmentId: 'erlenmeyer_flask',
        unsafeActionToAvoid: 'Do not use paper or flammable stoppers.',
        isCompleted: false,
        hint: 'Cover the reaction vessel.'
      },
      {
        id: 'flam_step_3',
        title: 'Relocate Solvent into Flammable Storage',
        instruction: 'Carry the covered solvent beaker into the yellow Flammable Storage Cabinet.',
        whyItMatters: 'Maintains required minimum 3-meter separation between flammables and potential heat sources.',
        actionRequired: 'open_storage_cabinet',
        targetEquipmentId: 'flammable_cabinet',
        unsafeActionToAvoid: 'Do not leave solvent sitting unattended.',
        isCompleted: false,
        hint: 'Store safely in the flammable cabinet.'
      }
    ],
    successSummary: 'Ignition source killed and flammable solvent safely sequestered before vapor flashback occurred.'
  },
  {
    id: 'electrical_near_liquid',
    title: 'Electrical Equipment Adjacent to Liquid Hazard',
    category: 'fire_emergency',
    severity: 'high',
    estimatedDuration: '3 min',
    icon: 'ZapOff',
    shortDescription: 'A 120V magnetic stir plate power cord is submerged in a water overflow puddle on the bench.',
    fullDescription: 'Electrical current conducting through water creates fatal electrocution hazards for anyone touching the wet bench, and can spark an electrical fire in the wall conduit.',
    immediateRisks: ['Lethal electric shock / ventricular fibrillation to bench operators', 'Short circuit electrical fire in wall wiring', 'Damage to sensitive analytical equipment'],
    symptomsOrIndicators: ['Power cord lying in standing puddle', 'Humming or buzzing electrical sounds', 'Tiny fizzing bubbles around cord plug'],
    sdsReference: 'NFPA 70E: Standard for Electrical Safety in the Workplace.',
    requiredPPE: ['Dry rubber-soled shoes', 'Non-conductive dry gloves'],
    requiredTools: ['Wall Breaker / GFCI Test Button', 'Dry Insulating Towel'],
    unsafeActionsToAvoid: ['NEVER touch wet appliances with bare or wet hands', 'NEVER pull the plug while standing in water', 'NEVER use water fire extinguishers on energized electrical equipment'],
    steps: [
      {
        id: 'elec_step_1',
        title: 'De-Energize Circuit at Wall Breaker',
        instruction: 'Press the GFCI "TEST" button or flip the wall circuit breaker switch to cut power to the bench outlet.',
        whyItMatters: 'Cutting current at the source eliminates electrocution risk before anyone approaches the wet equipment.',
        actionRequired: 'shut_gas_valve',
        targetEquipmentId: 'bunsen_burner',
        unsafeActionToAvoid: 'Do not touch the plug or wire while circuit is live.',
        isCompleted: false,
        hint: 'Cut bench utilities to eliminate live hazard.'
      },
      {
        id: 'elec_step_2',
        title: 'Remove Cord from Water with Insulated Tool',
        instruction: 'Using dry non-conductive tongs or dry heavy gloves, lift the cord out of the puddle and drape over a dry rack.',
        whyItMatters: 'Allows cord casing to dry and stops ongoing electrical bridging.',
        actionRequired: 'adjust_clamp',
        targetEquipmentId: 'retort_stand',
        unsafeActionToAvoid: 'Do not touch liquid surface directly.',
        isCompleted: false,
        hint: 'Use the clamp/apparatus to suspend cords.'
      },
      {
        id: 'elec_step_3',
        title: 'Mop Standing Water Completely',
        instruction: 'Absorb the liquid pool with dry towels and inspect cord insulation for cracks before re-energizing.',
        whyItMatters: 'Ensures benchtop is 100% dry and safe for normal laboratory operation.',
        actionRequired: 'absorb_slurry',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not restore power while surface remains damp.',
        isCompleted: false,
        hint: 'Dry the bench surface.'
      }
    ],
    successSummary: 'Power cut, wet cord isolated, and benchtop dried with zero electric shock or circuit fire!'
  },
  {
    id: 'burner_left_on',
    title: 'Gas Burner Left Burning Unattended',
    category: 'fire_emergency',
    severity: 'moderate',
    estimatedDuration: '2 min',
    icon: 'Flame',
    shortDescription: 'A Bunsen burner was left operating with an invisible pale-blue non-luminous flame at an empty bench.',
    fullDescription: 'In bright daylight, a well-aerated non-luminous blue flame cone is virtually invisible from across the room. Reaching across the bench can ignite clothing or burn flesh before the operator realizes the flame is active.',
    immediateRisks: ['Severe clothing and hair ignition from unseen flame', 'Overheating of dry glassware leading to explosive shattering', 'Gradual oxygen depletion and carbon monoxide buildup'],
    symptomsOrIndicators: ['Heat shimmer distortion above burner barrel', 'Hissing sound of gas rushing through orifice', 'Unattended empty lab station'],
    sdsReference: 'Laboratory Gas Safety Standards (ACS Safety in Academic Chemistry Laboratories).',
    requiredPPE: ['Safety Goggles', 'Cotton Coat'],
    requiredTools: ['Bench Gas Valve Lever'],
    unsafeActionsToAvoid: ['NEVER wave hand over burner to check if hot', 'NEVER leave active burners unattended for any duration', 'NEVER leave burners on yellow soot flame'],
    steps: [
      {
        id: 'burn_step_1',
        title: 'Approach with Caution & Check Heat Zone',
        instruction: 'Approach the bench while keeping hair, sleeves, and loose papers held back.',
        whyItMatters: 'Thermal convection currents can pull light paper or hair into the flame from 30 cm away.',
        actionRequired: 'verify_ppe',
        targetEquipmentId: 'safety_goggles',
        unsafeActionToAvoid: 'Do not lean over the burner column.',
        isCompleted: false,
        hint: 'Ensure personal clearance before approaching.'
      },
      {
        id: 'burn_step_2',
        title: 'Shut Main Bench Gas Cock Lever',
        instruction: 'Rotate the brass gas valve lever 90 degrees until perpendicular to the hose line.',
        whyItMatters: 'A perpendicular lever position confirms the internal ball valve is 100% closed, completely stopping fuel flow.',
        actionRequired: 'shut_gas_valve',
        targetEquipmentId: 'bunsen_burner',
        unsafeActionToAvoid: 'Do not rely solely on the small needle valve at burner base; always shut the main bench cock.',
        isCompleted: false,
        hint: 'Shut the gas cock valve on the bench.'
      }
    ],
    successSummary: 'Unattended burner extinguished and gas cock verified shut.'
  },
  {
    id: 'smoke_fumes',
    title: 'Smoke or Suspected Dangerous Fumes in Room',
    category: 'fire_emergency',
    severity: 'high',
    estimatedDuration: '3 min',
    icon: 'CloudRain',
    shortDescription: 'Hazy smoke and an acrid scorched odor are accumulating near the electrical junction boxes.',
    fullDescription: 'Electrical insulation or overheated equipment emits toxic pyrolysis byproducts including dioxins, hydrogen chloride, and carbon monoxide before burst flames appear.',
    immediateRisks: ['Toxic smoke inhalation leading to carbon monoxide poisoning', 'Hidden wall cavity fire escalation', 'Disorientation in smoke haze'],
    symptomsOrIndicators: ['Layer of hazy smoke clinging to ceiling', 'Scorched plastic or burning wire smell', 'Flickering lights or breaker trip'],
    sdsReference: 'NFPA 101: Life Safety Code.',
    requiredPPE: ['Lab Coat', 'Safety Goggles'],
    requiredTools: ['Manual Fire Alarm Pull Station', 'Emergency Exit Path'],
    unsafeActionsToAvoid: ['NEVER stay in smoke-filled rooms to investigate', 'NEVER open hot doors barehanded', 'NEVER use elevators during a fire alarm'],
    steps: [
      {
        id: 'smoke_step_1',
        title: 'Pull Manual Fire Alarm Pull Station',
        instruction: 'Activate the red wall-mounted pull station adjacent to the primary exit door.',
        whyItMatters: 'Instantly alerts entire building occupants and summons professional fire department responders.',
        actionRequired: 'pull_pin',
        targetEquipmentId: 'fire_extinguisher',
        unsafeActionToAvoid: 'Do not assume someone else already pulled the alarm.',
        isCompleted: false,
        hint: 'Engage emergency signaling.'
      },
      {
        id: 'smoke_step_2',
        title: 'Close Laboratory Doors Behind You',
        instruction: 'Ensure all students exit through the fire door and allow the door to latch shut.',
        whyItMatters: 'Closed fire doors compartmentalize smoke and starve flames of oxygen.',
        actionRequired: 'toggle_sash',
        targetEquipmentId: 'fume_hood',
        unsafeActionToAvoid: 'Do not prop doors open during evacuation.',
        isCompleted: false,
        hint: 'Secure doors and exits.'
      }
    ],
    successSummary: 'Building alarm pulled, room closed, and all students evacuated safely ahead of smoke buildup.'
  },
  {
    id: 'blocked_exit',
    title: 'Blocked Emergency Exit or Walkway Route',
    category: 'fire_emergency',
    severity: 'moderate',
    estimatedDuration: '2 min',
    icon: 'DoorClosed',
    shortDescription: 'Heavy chemical transport carts and supply boxes are stacked in front of the emergency exit door.',
    fullDescription: 'In a real fire with zero visibility and smoke, obstructed pathways cause pile-ups, panic, and trapped casualties.',
    immediateRisks: ['Occupants trapped during flash fire or toxic gas release', 'Paramedics unable to enter with stretchers', 'OSHA life-safety fines'],
    symptomsOrIndicators: ['Boxes or carts stored within 3 feet of emergency exit door', 'Blocked illuminated green exit sign'],
    sdsReference: 'OSHA 1910.36: Design and Construction Requirements for Exit Routes.',
    requiredPPE: ['Work Gloves'],
    requiredTools: ['Designated Chemical Storage Bay'],
    unsafeActionsToAvoid: ['NEVER store boxes "temporarily" in exit corridors', 'NEVER lock or latch exit doors from inside'],
    steps: [
      {
        id: 'exit_step_1',
        title: 'Identify Obstructions in 36-Inch Egress Path',
        instruction: 'Inspect the clear pathway leading to the emergency exit sign.',
        whyItMatters: 'OSHA strictly requires a minimum 36-inch continuous unobstructed corridor at all times.',
        actionRequired: 'verify_ppe',
        targetEquipmentId: 'safety_goggles',
        unsafeActionToAvoid: 'Do not ignore blocked corridors.',
        isCompleted: false,
        hint: 'Inspect the exit route.'
      },
      {
        id: 'exit_step_2',
        title: 'Clear Carts & Boxes to Designated Storage Bay',
        instruction: 'Relocate carts, pallets, and boxes away from the exit door into proper storage rooms.',
        whyItMatters: 'Guarantees immediate panic-free escape in zero-visibility conditions.',
        actionRequired: 'open_storage_cabinet',
        targetEquipmentId: 'flammable_cabinet',
        unsafeActionToAvoid: 'Do not push obstructions into other hallways.',
        isCompleted: false,
        hint: 'Relocate items into proper storage cabinets.'
      }
    ],
    successSummary: 'Emergency exit corridor cleared to 100% compliant unobstructed width.'
  },
  {
    id: 'defective_emergency_equip',
    title: 'Missing or Defective Emergency Safety Equipment',
    category: 'fire_emergency',
    severity: 'high',
    estimatedDuration: '3 min',
    icon: 'AlertCircle',
    shortDescription: 'The wall fire extinguisher pressure gauge is in the red "RECHARGE" zone and the eyewash cap is missing.',
    fullDescription: 'Emergency equipment that fails during an actual accident is worse than having none, giving a false sense of security while a fire burns or acid destroys an eye.',
    immediateRisks: ['Zero discharge pressure when attempting to fight a fire', 'Eyewash nozzles spraying contaminated dust into injured eyes', 'Regulatory shutdown during safety audits'],
    symptomsOrIndicators: ['Extinguisher dial needle in red left zone', 'Missing inspection tag on fire extinguisher', 'Heavy dust or missing covers on eyewash aerators'],
    sdsReference: 'NFPA 10 Monthly Extinguisher Inspection Standards.',
    requiredPPE: ['Safety Goggles'],
    requiredTools: ['Replacement Certified Extinguisher', 'Eyewash Protective Dust Caps', 'Monthly Inspection Tag'],
    unsafeActionsToAvoid: ['NEVER leave discharged extinguishers on active wall brackets', 'NEVER use damaged safety equipment'],
    steps: [
      {
        id: 'def_step_1',
        title: 'Inspect Extinguisher Pressure Gauge Dial',
        instruction: 'Examine the pressure gauge on the fire extinguisher: verify the yellow needle is centered in the green zone.',
        whyItMatters: 'A needle in the red means pressure has leaked and agent cannot be propelled onto flames.',
        actionRequired: 'equip_extinguisher',
        targetEquipmentId: 'fire_extinguisher',
        unsafeActionToAvoid: 'Do not assume an uninspected extinguisher will work.',
        isCompleted: false,
        hint: 'Inspect the fire extinguisher unit.'
      },
      {
        id: 'def_step_2',
        title: 'Tag for Service & Install Replacement Unit',
        instruction: 'Affix "OUT OF SERVICE - RECHARGE REQUIRED" tag and replace with a fully charged unit from the depot.',
        whyItMatters: 'Guarantees 100% operational readiness for real fire emergencies.',
        actionRequired: 'pull_pin',
        targetEquipmentId: 'fire_extinguisher',
        unsafeActionToAvoid: 'Do not leave the bracket empty without a replacement.',
        isCompleted: false,
        hint: 'Service the safety tool.'
      }
    ],
    successSummary: 'Defective emergency equipment tagged, replaced, and verified fully operational.'
  },

  // ==========================================
  // LABORATORY SAFETY HAZARDS (9 SCENARIOS)
  // ==========================================
  {
    id: 'missing_goggles',
    title: 'Missing Safety Goggles While Handling Reagents',
    category: 'lab_safety',
    severity: 'high',
    estimatedDuration: '2 min',
    icon: 'Glasses',
    shortDescription: 'A student began pouring corrosive acids while wearing standard eyeglasses with no side shields.',
    fullDescription: 'Everyday prescription spectacles leave wide top, bottom, and side gaps. Splashes rebound off cheeks or brows directly behind standard lenses into the eye.',
    immediateRisks: ['Rebound splash of corrosive chemicals into orbital socket', 'Shattered lens glass entering eye during thermal shock', 'Corneal chemical destruction'],
    symptomsOrIndicators: ['Student working with liquids without ANSI Z87.1 D3 rated goggles', 'Exposed eye gaps'],
    sdsReference: 'ANSI/ISEA Z87.1-2020 Eye and Face Protection Standard.',
    requiredPPE: ['ANSI Z87.1 Chemical Splash Goggles with indirect vents'],
    requiredTools: ['Goggle Sanitation Cabinet'],
    unsafeActionsToAvoid: ['NEVER substitute sunglasses or reading glasses for safety goggles', 'NEVER remove goggles in the lab while others are working'],
    steps: [
      {
        id: 'gog_step_1',
        title: 'Halt Liquid Transfer Immediately',
        instruction: 'Cap all chemical reagent bottles and step back from the active reaction bench.',
        whyItMatters: 'Stops potential splash generation until eyes are fully protected.',
        actionRequired: 'verify_ppe',
        targetEquipmentId: 'safety_goggles',
        unsafeActionToAvoid: 'Do not complete the pour before donning goggles.',
        isCompleted: false,
        hint: 'Stop work and prepare PPE.'
      },
      {
        id: 'gog_step_2',
        title: 'Don ANSI Z87.1 Indirectly Vented Splash Goggles',
        instruction: 'Equip splash goggles, ensuring the silicone seal forms a complete continuous seal against face and temples.',
        whyItMatters: 'Indirect hoods allow ventilation while blocking liquid droplet trajectory.',
        actionRequired: 'equip_goggles',
        targetEquipmentId: 'safety_goggles',
        unsafeActionToAvoid: 'Do not wear goggles on forehead or neck.',
        isCompleted: false,
        hint: 'Equip goggles from the bench or inventory.'
      }
    ],
    successSummary: 'Chemical splash goggles equipped with full orbital seal before any reagent transfer.'
  },
  {
    id: 'missing_gloves',
    title: 'Missing Chemical Barrier Gloves (Skin Absorption Risk)',
    category: 'lab_safety',
    severity: 'moderate',
    estimatedDuration: '2 min',
    icon: 'Hand',
    shortDescription: 'A student is handling concentrated nitric acid and staining salts with bare hands.',
    fullDescription: 'Skin contact with mineral acids causes instant burns and permanent xanthoproteic yellow protein stains. Organic solvents strip lipids, promoting rapid systemic absorption of toxins.',
    immediateRisks: ['Severe chemical dermatitis and epidermal peeling', 'Transdermal systemic toxicity', 'Cross-contamination to doorknobs and computers'],
    symptomsOrIndicators: ['Handling reagent bottles barehanded', 'Chemical residue rings on glassware'],
    sdsReference: 'OSHA 1910.138: Hand Protection Standard.',
    requiredPPE: ['4-8 mil Chemical-Resistant Nitrile Gloves'],
    requiredTools: ['Nitrile Glove Dispenser Box'],
    unsafeActionsToAvoid: ['NEVER touch face, hair, or phone while gloved', 'NEVER reuse single-use disposable nitrile gloves', 'NEVER use latex gloves with organic solvents'],
    steps: [
      {
        id: 'glv_step_1',
        title: 'Inspect Hands for Contamination & Wash',
        instruction: 'Check hands for droplets; wash with mild soap and water before donning gloves.',
        whyItMatters: 'Trapping chemicals under gloves accelerates chemical burns.',
        actionRequired: 'verify_ppe',
        targetEquipmentId: 'nitrile_gloves',
        unsafeActionToAvoid: 'Do not put gloves on wet or contaminated hands.',
        isCompleted: false,
        hint: 'Wash and prepare hands.'
      },
      {
        id: 'glv_step_2',
        title: 'Don Fresh Nitrile Barrier Gloves',
        instruction: 'Select correct size nitrile gloves, inspect for pinholes, and pull cuffs over lab coat sleeves.',
        whyItMatters: 'Cuffs over coat sleeves prevent drips from running inside gloves.',
        actionRequired: 'equip_gloves',
        targetEquipmentId: 'nitrile_gloves',
        unsafeActionToAvoid: 'Do not blow into gloves to open them.',
        isCompleted: false,
        hint: 'Don nitrile gloves from the dispenser.'
      }
    ],
    successSummary: 'Chemical barrier nitrile gloves inspected and equipped properly over lab coat cuffs.'
  },
  {
    id: 'missing_coat',
    title: 'Missing or Open Laboratory Coat (Thermal/Corrosive Risk)',
    category: 'lab_safety',
    severity: 'moderate',
    estimatedDuration: '2 min',
    icon: 'UserCheck',
    shortDescription: 'Student wearing a synthetic polyester fleece jacket without a cotton lab coat near active heating.',
    fullDescription: 'Synthetic fleece or polyester melts instantly upon flame contact, adhering molten burning plastic to human skin. 100% cotton flame-resistant lab coats provide vital sacrificial shielding and snap-off removal.',
    immediateRisks: ['Molten polymer burns fusing to skin', 'Direct chemical soaking of personal clothing', 'Contamination carried home on clothes'],
    symptomsOrIndicators: ['Working in lab with bare arms or synthetic jacket', 'Unbuttoned coats flapping near flames'],
    sdsReference: 'NFPA 2112: Flame-Resistant Garments for Protection of Industrial Personnel.',
    requiredPPE: ['100% Cotton Flame-Resistant Lab Coat with snap closures'],
    requiredTools: ['Coat Hanging Peg'],
    unsafeActionsToAvoid: ['NEVER wear synthetic nylon/polyester coats near open flames', 'NEVER leave coat unbuttoned while working', 'NEVER wear shorts or skirts in the chemistry lab'],
    steps: [
      {
        id: 'coat_step_1',
        title: 'Remove Synthetic Outerwear',
        instruction: 'Doff synthetic fleece or nylon jackets and hang in locker area outside the laboratory.',
        whyItMatters: 'Eliminates melt-injury risk before entering the thermal hazard zone.',
        actionRequired: 'verify_ppe',
        targetEquipmentId: 'lab_coat_peg',
        unsafeActionToAvoid: 'Do not wear synthetic outerwear under lab coats.',
        isCompleted: false,
        hint: 'Prepare appropriate undergarments.'
      },
      {
        id: 'coat_step_2',
        title: 'Don 100% Cotton Lab Coat & Snap to Neck',
        instruction: 'Retrieve the cotton coat from the peg, put on, and snap all front buttons completely closed.',
        whyItMatters: 'Fully fastened snap closures prevent flaps from sweeping into burners and allow one-pull emergency stripping under showers.',
        actionRequired: 'equip_lab_coat',
        targetEquipmentId: 'lab_coat_peg',
        unsafeActionToAvoid: 'Do not roll coat sleeves up above elbows.',
        isCompleted: false,
        hint: 'Equip the lab coat from the wall peg.'
      }
    ],
    successSummary: '100% cotton flame-resistant lab coat donned and fully fastened to the neck.'
  },
  {
    id: 'fume_hood_failure',
    title: 'Fume Hood Face Velocity Failure / Sash Too High',
    category: 'lab_safety',
    severity: 'high',
    estimatedDuration: '3 min',
    icon: 'Airplay',
    shortDescription: 'The fume hood sash is pulled to 100% full height and the face velocity digital monitor alarm is chirping.',
    fullDescription: 'Fume hoods only maintain protective containment vortices when the face velocity is between 80-120 feet per minute (FPM). Raising the sash too high collapses the laminar air curtain, allowing toxic fumes to spill back into the student\'s breathing zone.',
    immediateRisks: ['Escape of heavy toxic vapors into the room breathing zone', 'Loss of explosion blast shield protection', 'Excessive energy waste from compromised VAV system'],
    symptomsOrIndicators: ['Sash raised above 18-inch arrow indicator', 'Continuous chirping audible alarm from velocity sensor', 'Red LED flashing on digital hood monitor'],
    sdsReference: 'ANSI/AIHA Z9.5: Laboratory Ventilation Standard.',
    requiredPPE: ['Splash Goggles', 'Lab Coat'],
    requiredTools: ['Fume Hood Vertical Sliding Sash'],
    unsafeActionsToAvoid: ['NEVER put head inside the fume hood plane', 'NEVER store excess reagent bottles inside hoods blocking rear baffles', 'NEVER silence hood alarms without fixing sash position'],
    steps: [
      {
        id: 'hood_step_1',
        title: 'Lower Sash to Marked 18-Inch Operating Height',
        instruction: 'Grasp the lower sash handle and slide the safety glass window down until aligned with the green arrow indicator.',
        whyItMatters: 'Restoring proper aperture area immediately re-establishes certified 100 FPM face velocity and silences the warning alarm.',
        actionRequired: 'toggle_sash',
        targetEquipmentId: 'fume_hood',
        unsafeActionToAvoid: 'Do not yank or slam glass sash.',
        isCompleted: false,
        hint: 'Adjust the sliding sash on the fume hood.'
      },
      {
        id: 'hood_step_2',
        title: 'Move Reaction 6 Inches Back from Sash Plane',
        instruction: 'Ensure all beakers, apparatus, and containers sit at least 15 cm (6 inches) inside the hood perimeter.',
        whyItMatters: 'Vortices near the front edge cause turbulence that can draw fumes out into the room.',
        actionRequired: 'toggle_sash',
        targetEquipmentId: 'fume_hood',
        unsafeActionToAvoid: 'Do not place reaction vessels directly on the front airfoil.',
        isCompleted: false,
        hint: 'Ensure deep apparatus placement inside the hood.'
      }
    ],
    successSummary: 'Fume hood sash lowered to operating arrow; face velocity restored to safe containment standards.'
  },
  {
    id: 'incorrect_glassware',
    title: 'Incorrect Glassware Selection for Heating Reaction',
    category: 'lab_safety',
    severity: 'high',
    estimatedDuration: '3 min',
    icon: 'FlaskRound',
    shortDescription: 'A student is attempting to heat a solution over a burner inside a thick-walled volumetric measuring flask!',
    fullDescription: 'Volumetric flasks and graduated cylinders are designed exclusively for precise cold volume measurement, not heating. Direct heating causes thermal expansion stress that can catastrophically shatter the vessel and permanently ruins volumetric calibration.',
    immediateRisks: ['Explosive thermal shock fracture splashing boiling chemicals', 'Destruction of expensive Class-A volumetric calibration', 'Glass shrapnel lacerations'],
    symptomsOrIndicators: ['Volumetric flask or graduated cylinder placed on tripod wire gauze', 'Etched graduation lines placed over burner'],
    sdsReference: 'ASTM E438: Standard Specification for Glasses in Laboratory Apparatus.',
    requiredPPE: ['Splash Goggles', 'Heat-Resistant Thermal Tongs'],
    requiredTools: ['Borosilicate Pyrex Erlenmeyer / Griffin Beaker', 'Boiling Chips'],
    unsafeActionsToAvoid: ['NEVER heat volumetric flasks, cylinders, or reagent bottles over flame', 'NEVER heat chipped or star-cracked glassware', 'NEVER heat completely sealed closed vessels'],
    steps: [
      {
        id: 'glass_sel_step_1',
        title: 'Extinguish Flame & Remove Volumetric Flask',
        instruction: 'Turn off the burner gas immediately and remove the volumetric flask from the wire gauze using heat tongs.',
        whyItMatters: 'Arrests escalating thermal expansion before catastrophic wall rupture occurs.',
        actionRequired: 'shut_gas_valve',
        targetEquipmentId: 'bunsen_burner',
        unsafeActionToAvoid: 'Do not touch hot glass with bare fingers.',
        isCompleted: false,
        hint: 'Shut the gas valve to halt heating.'
      },
      {
        id: 'glass_sel_step_2',
        title: 'Transfer Solution into Borosilicate Pyrex Vessel',
        instruction: 'Transfer the solution into a certified thin-walled borosilicate Pyrex Erlenmeyer flask or beaker.',
        whyItMatters: 'Borosilicate glass has a low coefficient of thermal expansion, designed to withstand severe thermal gradients without cracking.',
        actionRequired: 'swirl_flask',
        targetEquipmentId: 'erlenmeyer_flask',
        unsafeActionToAvoid: 'Do not forget to add boiling chips to prevent superheating liquid eruptions.',
        isCompleted: false,
        hint: 'Use the borosilicate Erlenmeyer flask for heating.'
      }
    ],
    successSummary: 'Improper glassware removed and replaced with thermal-shock resistant borosilicate Pyrex vessel.'
  },
  {
    id: 'unsafe_heating',
    title: 'Unsafe Heating Setup (No Boiling Chips / Closed System)',
    category: 'lab_safety',
    severity: 'high',
    estimatedDuration: '3 min',
    icon: 'Flame',
    shortDescription: 'A flask is being heated over an open burner with a tight rubber stopper firmly seated in the neck!',
    fullDescription: 'Heating any closed, sealed container generates immense vapor pressure. As temperature rises, the vessel becomes a pneumatic bomb that will violently rupture, spraying boiling liquid and high-velocity glass shrapnel across the room.',
    immediateRisks: ['Explosive vessel detonation from internal vapor pressure', 'Severe boiling liquid scalding and chemical burns', 'Extensive glass shrapnel injuries to multiple students'],
    symptomsOrIndicators: ['Sealed rubber stopper on heated flask', 'Absence of boiling stones or magnetic stir bar (superheating bumping)'],
    sdsReference: 'Safety in Academic Chemistry Laboratories: Heating and Pressure Systems.',
    requiredPPE: ['Goggles', 'Thermal Tongs', 'Lab Coat'],
    requiredTools: ['Open Condenser / Rubber Stopper with Vent Bore', 'PTFE Boiling Chips'],
    unsafeActionsToAvoid: ['NEVER heat a closed system without a vent to atmosphere', 'NEVER add boiling chips to already-hot liquids (triggers explosive flash boiling)', 'NEVER point the neck of a heating vessel toward anyone'],
    steps: [
      {
        id: 'heat_step_1',
        title: 'Kill Burner Heat Immediately',
        instruction: 'Instantly shut off gas cock valve to stop adding energy to the pressurized vessel.',
        whyItMatters: 'Every additional second of heat increases internal pressure exponentially.',
        actionRequired: 'shut_gas_valve',
        targetEquipmentId: 'bunsen_burner',
        unsafeActionToAvoid: 'Do not stand directly over the stopper.',
        isCompleted: false,
        hint: 'Shut off the gas supply cock.'
      },
      {
        id: 'heat_step_2',
        title: 'Allow Gentle Cooling & Remove Sealed Stopper',
        instruction: 'Allow the vessel to cool below boiling temperature, then use tongs to ease the rubber stopper out of the neck.',
        whyItMatters: 'Relieves internal pressure safely and vents the system to atmospheric pressure.',
        actionRequired: 'swirl_flask',
        targetEquipmentId: 'erlenmeyer_flask',
        unsafeActionToAvoid: 'Do not yank stopper while liquid is actively boiling.',
        isCompleted: false,
        hint: 'Release the stopper from the flask.'
      }
    ],
    successSummary: 'Heating killed, pressure vented, and system opened to atmosphere before explosive rupture!'
  },
  {
    id: 'unstable_apparatus',
    title: 'Unstable Laboratory Apparatus (Clamp Reversed)',
    category: 'lab_safety',
    severity: 'moderate',
    estimatedDuration: '3 min',
    icon: 'Maximize2',
    shortDescription: 'A heavy condenser clamp arm is turned away from the heavy rectangular base, threatening to topple over.',
    fullDescription: 'Retort stands must always have their clamp arms oriented directly above the heavy cast-iron base plate. Clamping glassware off to the side or behind shifts the center of gravity beyond the support footprint, causing the entire glass assembly to crash.',
    immediateRisks: ['Shattered reaction vessels spilling hazardous contents', 'Burner knock-over triggering secondary fire', 'Crushed fingers from falling cast iron rods'],
    symptomsOrIndicators: ['Clamp arm extending in opposite direction of heavy base plate', 'Wobbling support rod when touched lightly'],
    sdsReference: 'Laboratory Apparatus Setup and Mechanical Stability Standards.',
    requiredPPE: ['Safety Goggles', 'Work Gloves'],
    requiredTools: ['Die-Cast Bosshead Screw', 'Extension Clamp'],
    unsafeActionsToAvoid: ['NEVER over-tighten clamps directly against bare glass without rubber liners', 'NEVER cantilever heavy assemblies beyond base footprint'],
    steps: [
      {
        id: 'unst_step_1',
        title: 'Support Glassware Weight with Hand',
        instruction: 'Gently cradle the glassware vessel with a gloved hand to prevent dropping during adjustment.',
        whyItMatters: 'Loosening bosshead screws without holding glassware will cause the apparatus to drop and smash.',
        actionRequired: 'adjust_clamp',
        targetEquipmentId: 'retort_stand',
        unsafeActionToAvoid: 'Do not loosen screws without supporting the vessel.',
        isCompleted: false,
        hint: 'Grasp and support the apparatus.'
      },
      {
        id: 'unst_step_2',
        title: 'Rotate Bosshead So Clamp Aligns Over Base Plate',
        instruction: 'Loosen the bosshead thumb screw, rotate the clamp 180 degrees until directly positioned over the heavy steel base, and retighten firmly.',
        whyItMatters: 'Aligns center of gravity directly over the support base, ensuring maximum mechanical stability.',
        actionRequired: 'adjust_clamp',
        targetEquipmentId: 'retort_stand',
        unsafeActionToAvoid: 'Do not over-torque screws to prevent thread stripping.',
        isCompleted: false,
        hint: 'Re-align the clamp elevation and orientation.'
      }
    ],
    successSummary: 'Apparatus realigned directly over support base plate with rock-solid mechanical stability.'
  },
  {
    id: 'workbench_contamination',
    title: 'Chemical Contamination on Shared Workbench',
    category: 'lab_safety',
    severity: 'moderate',
    estimatedDuration: '3 min',
    icon: 'Sparkles',
    shortDescription: 'Dried white salt crystals and an oily invisible film were left behind on the shared lab benchtop.',
    fullDescription: 'Leaving unknown chemical films on shared workspaces exposes incoming students who rest their bare forearms, notebooks, or laptops on the bench. Chemical residues degrade epoxy coatings and trigger unexpected cross-reactions.',
    immediateRisks: ['Chemical burns to forearms of incoming students', 'Contamination of student notebooks, laptops, and backpacks', 'Cross-reaction with future experimental reagents'],
    symptomsOrIndicators: ['Dried white powder halos on dark epoxy worktop', 'Tacky or discolored patches where beakers rested'],
    sdsReference: 'Prudent Practices in the Laboratory: General Housekeeping Standards.',
    requiredPPE: ['Nitrile Gloves', 'Splash Goggles', 'Lab Coat'],
    requiredTools: ['Damp Decontamination Sponge / Wipes', 'Deionized Water Wash Bottle', 'Neutral Detergent'],
    unsafeActionsToAvoid: ['NEVER leave lab without cleaning your work area', 'NEVER blow chemical dust off tables with compressed air', 'NEVER eat or drink on any lab surface'],
    steps: [
      {
        id: 'contam_step_1',
        title: 'Don Nitrile Gloves & Goggles Before Cleaning',
        instruction: 'Ensure chemical barrier gloves are on before touching contaminated workbench areas.',
        whyItMatters: 'Unknown dry residues could be toxic heavy metal salts or concentrated desiccated alkalis.',
        actionRequired: 'equip_gloves',
        targetEquipmentId: 'nitrile_gloves',
        unsafeActionToAvoid: 'Do not wipe bench barehanded.',
        isCompleted: false,
        hint: 'Don gloves from the dispenser.'
      },
      {
        id: 'contam_step_2',
        title: 'Spray Deionized Water & Mop Clean with Absorbents',
        instruction: 'Generously mist the benchtop with deionized water, allow salts to dissolve, and wipe clean in overlapping strokes from back to front.',
        whyItMatters: 'Wet wiping captures particles in solution and prevents toxic dust from becoming airborne.',
        actionRequired: 'absorb_slurry',
        targetEquipmentId: 'spill_kit',
        unsafeActionToAvoid: 'Do not use dry abrasive pads that scratch the epoxy finish.',
        isCompleted: false,
        hint: 'Use the absorbent wipe action.'
      }
    ],
    successSummary: 'Shared workbench completely decontaminated, washed, and dried clean for next lab session.'
  },
  {
    id: 'incorrect_labeling',
    title: 'Incorrect Chemical Labeling or Handling Procedure',
    category: 'lab_safety',
    severity: 'moderate',
    estimatedDuration: '3 min',
    icon: 'FileWarning',
    shortDescription: 'A reagent bottle was labeled with an ambiguous pencil scribble: "Acid - Soln A".',
    fullDescription: 'Vague labels cause tragic laboratory mix-ups. Every container must state the specific chemical name (no trade names alone), exact concentration, hazard warnings, date of preparation, and the name of the preparer.',
    immediateRisks: ['Accidental mixing with incompatible reagents causing explosion', 'Inaccurate experimental results from unknown concentration', 'Violation of OSHA HazCom and university safety rules'],
    symptomsOrIndicators: ['Vague labels like "Acid", "Base", or unlabeled vials', 'Pencil markings that easily smudge or wash off'],
    sdsReference: 'OSHA 1910.1200 App C: Allocation of Label Elements.',
    requiredPPE: ['Safety Goggles', 'Nitrile Gloves'],
    requiredTools: ['Standard GHS Chemical Label Tag', 'Indelible Solvent Marker'],
    unsafeActionsToAvoid: ['NEVER use chemical formulas alone if obscure', 'NEVER rely on unlabeled bottles', 'NEVER write labels with water-soluble pens'],
    steps: [
      {
        id: 'inclab_step_1',
        title: 'Consult Master Preparation Notebook',
        instruction: 'Check the lab preparation binder to positively match batch number and chemical composition.',
        whyItMatters: 'Positive verification ensures the label reflects 100% accurate chemical data.',
        actionRequired: 'inspect_sds',
        targetEquipmentId: 'reagent_hno3',
        unsafeActionToAvoid: 'Do not guess concentration or chemical identity.',
        isCompleted: false,
        hint: 'Consult SDS and batch records.'
      },
      {
        id: 'inclab_step_2',
        title: 'Apply Compliant GHS Label with Indelible Marker',
        instruction: 'Write "Hydrochloric Acid 1.0 M - DANGER - Corrosive - Prep Date - Initial" on an adhesive label and attach firmly to the bottle.',
        whyItMatters: 'Provides unambiguous chemical identification and emergency instructions for all laboratory workers.',
        actionRequired: 'adjust_clamp',
        targetEquipmentId: 'retort_stand',
        unsafeActionToAvoid: 'Do not cover manufacturer expiration dates or lot numbers.',
        isCompleted: false,
        hint: 'Affix the compliant secondary label.'
      }
    ],
    successSummary: 'Ambiguous container relabeled with complete OSHA GHS chemical and hazard identification.'
  }
];
