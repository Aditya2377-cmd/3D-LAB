/**
 * Real mathematical and physical chemistry calculation engine.
 * Computes exact thermodynamic, kinetic, analytical, and physical variables.
 */

// 1. Titration Calculations: Strong Acid (HCl) titrated with Strong Base (NaOH)
export function calculateTitrationPH(
  volAcidML: number, // e.g. 25.0 mL
  concAcidM: number, // e.g. 0.1 M
  volTitrantML: number, // e.g. 0 to 50 mL
  concBaseM: number // e.g. 0.1 M
): number {
  const molAcid = (volAcidML / 1000) * concAcidM;
  const molBase = (volTitrantML / 1000) * concBaseM;
  const totalVolL = (volAcidML + volTitrantML) / 1000;

  if (totalVolL === 0) return 7.0;

  if (Math.abs(molAcid - molBase) < 1e-7) {
    // Exact equivalence point for strong acid/base in water at 25°C
    return 7.0;
  }

  if (molAcid > molBase) {
    // Excess H+
    const remainingH = (molAcid - molBase) / totalVolL;
    const pH = -Math.log10(Math.max(1e-14, remainingH));
    return Math.min(6.99, Math.max(0.1, Number(pH.toFixed(2))));
  } else {
    // Excess OH-
    const excessOH = (molBase - molAcid) / totalVolL;
    const pOH = -Math.log10(Math.max(1e-14, excessOH));
    const pH = 14.0 - pOH;
    return Math.min(13.99, Math.max(7.01, Number(pH.toFixed(2))));
  }
}

// 2. Weak Acid (Acetic Acid Ka = 1.8e-5) Titration with NaOH
export function calculateWeakAcidPH(
  volAcidML: number,
  concAcidM: number,
  volTitrantML: number,
  concBaseM: number
): number {
  const Ka = 1.8e-5;
  const pKa = -Math.log10(Ka); // 4.74
  const molAcid = (volAcidML / 1000) * concAcidM;
  const molBase = (volTitrantML / 1000) * concBaseM;
  const totalVolL = (volAcidML + volTitrantML) / 1000;

  if (volTitrantML === 0) {
    // [H+] = sqrt(Ka * C)
    const H = Math.sqrt(Ka * concAcidM);
    return Math.max(0.5, Number((-Math.log10(H)).toFixed(2)));
  }

  if (molAcid > molBase) {
    // Henderson-Hasselbalch buffer zone: pH = pKa + log([A-] / [HA])
    const molConjugateBase = molBase;
    const molRemainingAcid = molAcid - molBase;
    const ratio = molConjugateBase / molRemainingAcid;
    const pH = pKa + Math.log10(ratio);
    return Math.min(6.9, Math.max(2.0, Number(pH.toFixed(2))));
  } else if (Math.abs(molAcid - molBase) < 1e-6) {
    // Equivalence: Hydrolysis of acetate ion: [OH-] = sqrt(Kb * [A-]), Kb = Kw / Ka = 5.56e-10
    const concAcetate = molAcid / totalVolL;
    const Kb = 1e-14 / Ka;
    const OH = Math.sqrt(Kb * concAcetate);
    const pOH = -Math.log10(OH);
    return Number((14.0 - pOH).toFixed(2)); // ~ 8.72
  } else {
    // Excess strong base
    const excessOH = (molBase - molAcid) / totalVolL;
    const pOH = -Math.log10(Math.max(1e-14, excessOH));
    return Math.min(13.9, Math.max(7.1, Number((14.0 - pOH).toFixed(2))));
  }
}

// 3. Indicator color resolver
export function getIndicatorColor(indicator: 'phenolphthalein' | 'bromothymol' | 'methyl_orange' | 'universal', pH: number): string {
  if (indicator === 'phenolphthalein') {
    // Colorless below 8.2, pink above 8.2, vivid fuchsia magenta above 9.5
    if (pH < 8.2) return 'rgba(235, 248, 255, 0.4)'; // water-clear
    if (pH < 9.5) {
      const alpha = (pH - 8.2) / 1.3;
      return `rgba(244, 114, 182, ${0.4 + alpha * 0.4})`; // soft pink
    }
    return 'rgba(219, 39, 119, 0.85)'; // deep magenta
  }

  if (indicator === 'bromothymol') {
    // Yellow < 6.0, Green ~6.0-7.6, Blue > 7.6
    if (pH < 6.0) return 'rgba(234, 179, 8, 0.8)'; // yellow
    if (pH <= 7.6) return 'rgba(34, 197, 94, 0.8)'; // emerald green
    return 'rgba(2, 132, 199, 0.85)'; // royal blue
  }

  if (indicator === 'methyl_orange') {
    // Red < 3.1, Orange 3.1 - 4.4, Yellow > 4.4
    if (pH < 3.1) return 'rgba(220, 38, 38, 0.85)'; // red
    if (pH <= 4.4) return 'rgba(249, 115, 22, 0.85)'; // orange
    return 'rgba(250, 204, 21, 0.85)'; // yellow
  }

  // Universal indicator spectrum
  if (pH <= 2) return 'rgba(220, 38, 38, 0.9)'; // strong red
  if (pH <= 4) return 'rgba(249, 115, 22, 0.9)'; // orange
  if (pH <= 6) return 'rgba(234, 179, 8, 0.85)'; // yellow
  if (pH <= 8) return 'rgba(34, 197, 94, 0.85)'; // green (neutral)
  if (pH <= 10) return 'rgba(14, 165, 233, 0.85)'; // cyan blue
  if (pH <= 12) return 'rgba(99, 102, 241, 0.9)'; // indigo
  return 'rgba(147, 51, 234, 0.9)'; // violet
}

// 4. Beer-Lambert Law: A = epsilon * c * l
export function calculateAbsorbance(
  molarExtinctionEpsilon: number, // L/(mol·cm)
  concentrationM: number, // mol/L
  pathLengthCm: number = 1.0 // 1 cm standard cuvette
): { absorbance: number; transmittancePercent: number } {
  const A = molarExtinctionEpsilon * concentrationM * pathLengthCm;
  const T = Math.pow(10, -A); // Transmittance ratio
  return {
    absorbance: Number(Math.min(3.5, Math.max(0.001, A)).toFixed(3)),
    transmittancePercent: Number(Math.min(100, Math.max(0.03, T * 100)).toFixed(1))
  };
}

// 5. Solution Dilution: C1 * V1 = C2 * V2
export function calculateDilution(c1: number, v1: number, v2: number): number {
  if (v2 <= 0) return 0;
  return Number(((c1 * v1) / v2).toFixed(4));
}

// 6. Ideal Gas Law: P = nRT / V
export function calculateGasPressure(
  moles: number, // mol
  tempKelvin: number, // K (273.15 + °C)
  volLiters: number // L
): number {
  const R = 8.31446; // J/(mol·K) -> kPa·L/(mol·K)
  if (volLiters <= 0) return 0;
  const P_kPa = (moles * R * tempKelvin) / volLiters;
  return Number(P_kPa.toFixed(1));
}

// 7. Arrhenius Kinetics: k = A * exp(-Ea / (R * T))
export function calculateArrheniusRateConstant(
  preExpA: number, // e.g. 1e7
  activationEnergyJ: number, // e.g. 50,000 J/mol (50 kJ/mol)
  tempKelvin: number
): number {
  const R = 8.314;
  const exponent = -activationEnergyJ / (R * tempKelvin);
  return preExpA * Math.exp(exponent);
}

// 8. Calorimetry Enthalpy: q = m * c * deltaT, deltaH = -q / n
export function calculateCalorimetry(
  waterMassGrams: number,
  soluteMoles: number,
  deltaTempC: number,
  specificHeat: number = 4.184 // J/(g·°C)
): { heatJoules: number; molarEnthalpyKjMol: number } {
  const q_joules = waterMassGrams * specificHeat * deltaTempC;
  const deltaH_kJ_mol = soluteMoles > 0 ? -(q_joules / 1000) / soluteMoles : 0;
  return {
    heatJoules: Number(q_joules.toFixed(1)),
    molarEnthalpyKjMol: Number(deltaH_kJ_mol.toFixed(2))
  };
}

// 9. Voltaic Cell Potential (Nernst equation for Zn/Cu Daniell cell)
// Zn(s) + Cu2+(aq) -> Zn2+(aq) + Cu(s), E° = 1.10 V, n = 2
export function calculateCellVoltage(concZn: number, concCu: number, tempKelvin: number = 298.15): number {
  const E0 = 1.10;
  if (concCu <= 0) return 0;
  const Q = Math.max(1e-6, concZn) / Math.max(1e-6, concCu);
  const n = 2;
  const R = 8.314;
  const F = 96485;
  const E = E0 - ((R * tempKelvin) / (n * F)) * Math.log(Q);
  return Number(Math.max(0, E).toFixed(3));
}

// 10. Le Chatelier Equilibrium Color: [Co(H2O)6]2+ (pink) + 4 Cl- <=> [CoCl4]2- (blue) + 6 H2O
// Endothermic forward reaction: Heating shifts right (blue), Cooling shifts left (pink)
export function calculateCobaltEquilibrium(tempC: number, chlorideM: number): { color: string; percentBlue: number } {
  // Higher temp and higher chloride push towards blue
  const factor = (tempC - 20) * 1.5 + (chlorideM - 1.0) * 25;
  const percentBlue = Math.min(100, Math.max(0, 50 + factor));

  // Interpolate between Pink (244, 114, 182) and Blue (2, 132, 199)
  const ratio = percentBlue / 100;
  const r = Math.round(244 * (1 - ratio) + 2 * ratio);
  const g = Math.round(114 * (1 - ratio) + 132 * ratio);
  const b = Math.round(182 * (1 - ratio) + 199 * ratio);

  return {
    color: `rgba(${r}, ${g}, ${b}, 0.85)`,
    percentBlue: Number(percentBlue.toFixed(1))
  };
}
