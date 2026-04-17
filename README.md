# Modern 3D Multi-Step Form

A visually stunning, interactive 5-step form built with React. This project demonstrates how to orchestrate complex UI states, advanced DOM animations, and WebGL 3D graphics in a single, performant application. 

The architecture ensures that the 3D WebGL context remains persistent in the background while React Router handles the foreground UI, preventing heavy re-renders and maintaining a buttery-smooth 60fps experience.

## ✨ Features

* **Persistent 3D Canvas:** A cinematic, auto-rotating galaxy of 7,000 particles powered by Three.js and React Three Fiber.
* **Fluid Page Transitions:** Direction-aware entry and exit animations built with GSAP (GreenSock), giving the UI a physical sense of moving forward and backward.
* **Global State Management:** Utilizes React's Context API to act as a centralized "brain," securely passing and updating form data across multiple unmounting routes.
* **Glassmorphism Aesthetic:** A sleek, semi-transparent frosted glass UI crafted by combining Tailwind CSS v3 utilities with Bootstrap's reliable form controls.
* **Interactive Components:** Dynamic, state-driven pricing cards with glowing active states replacing standard dropdown menus.

## 🛠️ Tech Stack

* **Framework:** React 18 (Bootstrapped with Vite for maximum speed)
* **Routing:** React Router DOM v6
* **Animations:** GSAP (GreenSock Animation Platform)
* **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Styling:** Tailwind CSS v3, Bootstrap (for core input structure)

## 📂 Folder Architecture

```text
src/
├── components/
│   ├── canvas/
│   │   └── Scene.jsx            # The persistent Three.js environment
│   └── forms/
│       ├── Step1_Personal.jsx   # GSAP-animated form view
│       ├── Step2_Account.jsx    # Validation & back-navigation logic
│       ├── Step3_Details.jsx    # CSS Grid layout for inputs
│       ├── Step4_Plan.jsx       # Interactive state-driven cards
│       └── Step5_Review.jsx     # Data compilation & mock submission
├── context/
│   └── FormContext.jsx          # Centralized data store and update methods
├── App.jsx                      # Master layout, Z-index stacking, and Router
└── index.css                    # Tailwind & Bootstrap imports