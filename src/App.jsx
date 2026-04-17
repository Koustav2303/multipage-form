import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/FormContext";

// The 3D Background
import Scene from "./components/canvas/Scene";

// Form Steps
import Step1_Personal from "./components/forms/Step1_Personal";
import Step2_Account from "./components/forms/Step2_Account";
import Step3_Details from "./components/forms/Step3_Details";
import Step4_Plan from "./components/forms/Step4_Plan";
import Step5_Review from "./components/forms/Step5_Review";

function App() {
  return (
    <FormProvider>
      <Router>
        {/* THE BACKGROUND LAYER: Fixed behind everything */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-900">
          <Scene />
        </div>

        {/* THE FOREGROUND LAYER: The Glassmorphism Form Container */}
        <div className="flex items-center justify-center min-h-screen p-4 overflow-hidden">
          <div className="relative z-10 w-full max-w-2xl p-8 transition-all duration-500 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20">
            
            {/* The React Router swaps out the form steps right here */}
            <Routes>
              <Route path="/" element={<Step1_Personal />} />
              <Route path="/step-2" element={<Step2_Account />} />
              <Route path="/step-3" element={<Step3_Details />} />
              <Route path="/step-4" element={<Step4_Plan />} />
              <Route path="/step-5" element={<Step5_Review />} />
            </Routes>

          </div>
        </div>
      </Router>
    </FormProvider>
  );
}

export default App;