import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FormContext } from "../../context/FormContext";

export default function Step4_Plan() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(FormContext);

  // --- GOD TIER GSAP ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container slides in from the right
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95, x: 100 },
        { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "expo.out" }
      );

      // Stagger the header and buttons
      gsap.fromTo(
        ".stagger-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );

      // Distinct, slightly delayed pop-in for the pricing cards
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "back.out(1.2)", delay: 0.4 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    gsap.to(containerRef.current, {
      opacity: 0, x: -100, rotationY: -10, duration: 0.6, ease: "power3.inOut",
      onComplete: () => navigate("/step-5"),
    });
  };

  const handleBack = () => {
    gsap.to(containerRef.current, {
      opacity: 0, x: 100, rotationY: 10, duration: 0.6, ease: "power3.inOut",
      onComplete: () => navigate("/step-3"),
    });
  };

  // High-End Pricing Data Array
  const plans = [
    { 
      name: "Basic", 
      price: "Free", 
      desc: "Perfect for casual users.",
      features: ["10GB Secure Storage", "Standard Support", "Basic Analytics"],
      popular: false
    },
    { 
      name: "DrivePro", 
      price: "$15", 
      period: "/mo",
      desc: "Advanced features for creators.",
      features: ["100GB Fast Storage", "Priority 24/7 Support", "Advanced Analytics"],
      popular: true // Triggers the glowing badge
    },
    { 
      name: "Ultimate", 
      price: "$29", 
      period: "/mo",
      desc: "For heavy-duty workflows.",
      features: ["Unlimited Storage", "Dedicated Manager", "Custom Integrations"],
      popular: false
    }
  ];

  return (
    <div className="relative w-full text-white" ref={containerRef}>
      
      {/* BACKGROUND GLOW ORBS (Premium Fuchsia & Purple) */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse hidden md:block pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse hidden md:block pointer-events-none delay-1000"></div>

      {/* HEADER SECTION */}
      <div className="stagger-item text-center md:text-left mb-10 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-200 via-fuchsia-400 to-purple-300">
          Select a Plan
        </h2>
        <p className="text-sm md:text-base text-fuchsia-200/70 font-medium">
          Choose the tier that unlocks your potential.
        </p>
      </div>

      <form onSubmit={handleNext} className="relative z-10 flex flex-col gap-8">
        
        {/* RESPONSIVE PRICING CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isActive = formData.subscriptionPlan === plan.name;

            return (
              <div
                key={plan.name}
                onClick={() => updateFormData({ subscriptionPlan: plan.name })}
                className={`pricing-card relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-500 overflow-hidden group ${
                  isActive 
                    ? "border-fuchsia-500 bg-fuchsia-500/10 shadow-[0_0_30px_rgba(217,70,239,0.2)] transform -translate-y-2 scale-[1.02]" 
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:-translate-y-1"
                }`}
              >
                {/* Active Card Animated Background Glow */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/0 opacity-50 pointer-events-none"></div>
                )}

                {/* "Most Popular" Floating Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl shadow-lg transform translate-x-1 -translate-y-1">
                    MOST POPULAR
                  </div>
                )}

                {/* Radio Circle Indicator */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl font-bold transition-colors ${isActive ? "text-fuchsia-300" : "text-white"}`}>
                    {plan.name}
                  </h3>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isActive ? "border-fuchsia-400 bg-fuchsia-500/30" : "border-white/30"}`}>
                    {isActive && <div className="w-2.5 h-2.5 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#d946ef]"></div>}
                  </div>
                </div>

                {/* Price Display */}
                <div className="mb-2">
                  <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/50 text-sm font-medium">{plan.period}</span>}
                </div>
                <p className="text-sm text-white/60 leading-tight mb-6 h-8">{plan.desc}</p>

                {/* Feature List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-white/80">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 mr-3 flex-shrink-0 transition-colors ${isActive ? "text-fuchsia-400" : "text-white/30"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* ACTION BUTTONS */}
        <div className="stagger-item flex flex-col-reverse sm:flex-row gap-4 mt-2">
          
          <button 
            type="button" 
            onClick={handleBack}
            className="w-full sm:w-1/3 h-14 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
            <span>Back</span>
          </button>
          
          <div className="relative w-full sm:w-2/3 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
            <button 
              type="submit" 
              className="relative w-full h-14 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 active:translate-y-1 active:scale-95 shadow-[0_0_20px_rgba(192,38,211,0.3)] flex items-center justify-center gap-2"
            >
              <span>Final Review</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
          
        </div>

      </form>
    </div>
  );
}