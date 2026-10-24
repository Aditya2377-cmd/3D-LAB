# 🥽 ChemSafe 3D — Virtual Chemistry & VR Lab Safety Simulator

An immersive, WebXR-enabled 3D laboratory environment designed to train students on essential lab safety protocols, equipment handling, and organic chemistry procedures without real-world chemical hazards.

Built for desktop browsers and **Meta Quest / VR Headsets** using **React**, **Three.js / React Three Fiber**, **WebXR (`@react-three/xr`)**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Key Features

* **🥽 Full VR & Meta Quest Compatibility:** 
  * Native WebXR integration allowing direct one-click entry into VR mode inside the Meta Quest browser.
  * Spatial motion controller support with 6DoF hand tracking for grabbing equipment, pulling fire extinguisher pins, and manipulating glassware.
* **🖥️ Desktop Dual Camera Modes:**
  * OrbitControls for 360° inspection of benches and apparatus.
  * WASD + Mouse look for first-person walking navigation around the lab.
* **3D Equipment Interaction:** Realistic apparatus (burners, beakers, burettes, flasks) rendered with glass transmission, fluid shaders, and contextual hover/grab tooltips.
* **Dynamic Emergency Drills:** Real-time simulations of hazardous incidents, including chemical spills, burner fire outbreaks, flickering point lights, and volumetric smoke.
* **Interactive Safety Gear:** Functional emergency equipment (fire extinguishers, neutralizer kits, safety goggles) that students can equip to neutralize hazards.
* **Modular Multi-Bench Architecture:** Extensible design pattern allowing dynamic switching between multiple experiment benches without GPU overload or frame drops.

---

## 🔬 Featured Experiments & Modules

* **Organic Chemistry Bench:**
  * Acid value of oil determination
  * Saponification value analysis
  * Iodine value testing
  * Basic organic compound identification
* **Hazard Containment & Safety Drills:**
  * Acid spill containment and neutralization
  * Burner fire suppression and emergency ventilation drills

---

## 🥽 How to Run on Meta Quest / VR Headsets

1. Ensure your headset is connected to Wi-Fi.
2. Open the **Meta Quest Browser** inside the headset.
3. Navigate to your deployed project URL.
4. Click the **"Enter VR"** button located at the bottom of the screen.
5. Use your Meta Quest Touch controllers:
   * **Grip / Trigger:** Pick up and interact with lab tools and extinguishers.
   * **Thumbstick:** Smooth locomotion or snap-turn teleportation around the lab.

---

## 🤖 Development & AI Tooling

This project was prototyped and built during the hackathon using modern AI-assisted engineering workflows:
* **Google AI Studio & Gemini:** Used for rapid component scaffolding, WebXR / React Three Fiber scene generation, and chemical reaction schema modeling.
* **Architecture & Integration:** Designed, debugged, and integrated modularly by the team, implementing custom camera switching, WebXR controller inputs, state management, and Git collaboration workflows.

---

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Vite
* **3D & VR Engine:** Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/xr` (WebXR)
* **Styling & Assets:** Tailwind CSS, Lucide Icons

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* `npm` or `bun`

### Installation & Setup

1.
