# 🧪 ChemSafe 3D — Virtual Chemistry & Lab Safety Simulator

An interactive web-based 3D laboratory environment designed to train students on essential lab safety protocols, equipment handling, and organic chemistry procedures without real-world chemical hazards.

Built for hackathon demonstration using **React**, **Three.js / React Three Fiber**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Key Features

* **3D Equipment Interaction:** Realistic apparatus (burners, beakers, burettes, flasks) rendered with glass transmission, glossy materials, and hover/click safety tooltips.
* **Dual Camera Modes:** OrbitControls for full-angle bench inspection and WASD navigation for a first-person lab walk mode.
* **Dynamic Emergency Drills:** Real-time simulations of common lab accidents, including chemical spills, burner fire outbreaks, and particle smoke effects.
* **Safety Equipment & Inventory:** Interactive safety items (goggles, fire extinguisher, neutralizer kits) students can equip to resolve active hazards.
* **Modular Multi-Bench Architecture:** Extensible design pattern allowing teams to switch between multiple experiment benches without GPU performance degradation.

---

## 🔬 Featured Experiments & Modules

* **Organic Chemistry Bench:**
  * Acid value of oil
  * Saponification value analysis
  * Iodine value testing
  * Basic organic compound identification
* **Hazard & Drill Modules:**
  * Acid spill containment and neutralization
  * Burner fire suppression and ventilation drills

---

## 🤖 Development & AI Tooling

This project was prototyped and built during the hackathon using modern AI-assisted engineering workflows:
* **Google AI Studio & Gemini:** Used for rapid component scaffolding, Three.js / React Three Fiber scene generation, and chemical reaction schema modeling.
* **Architecture & Integration:** Orchestrated, debugged, and integrated modularly by the team, implementing custom camera switching, state persistence, and Git collaboration workflows.

---

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Vite
* **3D Engine:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Styling & Assets:** Tailwind CSS, Lucide Icons

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* `npm` or `bun`

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Aditya2377-cmd/3D-LAB.git](https://github.com/Aditya2377-cmd/3D-LAB.git)
   cd 3D-LAB
