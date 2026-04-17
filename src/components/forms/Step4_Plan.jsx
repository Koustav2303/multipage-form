import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FormContext } from "../../context/FormContext";

export default function Step4_Plan() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(FormContext);

  // ENTRY ANIMATION
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    // EXIT ANIMATION (Next)
    gsap.to(formRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => navigate("/step-5"),
    });
  };

  const handleBack = () => {
    // EXIT ANIMATION (Back)
    gsap.to(formRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => navigate("/step-3"),
    });
  };

  // Helper array to map out our plans cleanly
  const plans = [
    { name: "Basic", price: "Free", desc: "Perfect for getting started." },
    { name: "DrivePro", price: "$15/mo", desc: "Advanced features and storage." },
    { name: "Ultimate", price: "$29/mo", desc: "For heavy-duty workflows." }
  ];

  return (
    <div ref={formRef} className="text-white">
      <h2 className="text-4xl font-bold mb-2">Select a Plan</h2>
      <p className="text-white/70 mb-8">Choose the tier that fits your needs.</p>

      <form onSubmit={handleNext}>
        
        {/* Responsive Grid for Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {plans.map((plan) => {
            // Check if this card is the currently selected plan
            const isActive = formData.subscriptionPlan === plan.name;

            return (
              <div
                key={plan.name}
                onClick={() => updateFormData({ subscriptionPlan: plan.name })}
                // Dynamic Tailwind classes based on active state
                className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                  isActive 
                    ? "border-blue-500 bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)] transform scale-105" 
                    : "border-white/20 bg-white/5 hover:bg-white/10"
                }`}
              >
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-2xl font-extrabold text-blue-400 mb-2">{plan.price}</p>
                <p className="text-sm text-white/60 leading-tight">{plan.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={handleBack}
            className="w-1/3 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all duration-300 border border-white/20"
          >
            Back
          </button>
          
          <button 
            type="submit" 
            className="w-2/3 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Review & Finish ➔
          </button>
        </div>

      </form>
    </div>
  );
}