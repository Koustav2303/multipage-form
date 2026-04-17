import { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FormContext } from "../../context/FormContext";
import toast from "react-hot-toast";

export default function Step5_Review() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { formData, updateFormData, resetForm } = useContext(FormContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- GOD TIER GSAP ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container slides in from the right
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95, x: 100 },
        { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "expo.out" }
      );

      // Staggered item drops
      gsap.fromTo(
        ".stagger-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );

      // Glowing pulse for the plan highlight
      gsap.to(".plan-highlight", {
        boxShadow: "0px 0px 20px rgba(6, 182, 212, 0.5)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Call
    setTimeout(() => {
      // 1. Success Toast
      toast.success(`Welcome aboard, ${formData.firstName}!`, {
        icon: '🎉',
        style: {
          background: '#10b981', 
          color: '#fff',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)'
        },
      });
      
      // 2. Celebration Animation
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.8,
        y: -100,
        duration: 0.7,
        ease: "power3.in",
        onComplete: () => {
          resetForm();    // Clear global state
          navigate("/");  // Return to the start
        },
      });
    }, 2000); 
  };

  const handleBack = () => {
    // Exit Animation (Back)
    gsap.to(containerRef.current, {
      opacity: 0, x: 100, rotationY: 10, duration: 0.6, ease: "power3.inOut",
      onComplete: () => navigate("/step-4"),
    });
  };

  return (
    <div className="relative w-full text-white" ref={containerRef}>
      
      {/* BACKGROUND GLOW ORBS (Gold & Cyan) */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse hidden md:block pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse hidden md:block pointer-events-none delay-1000"></div>

      {/* HEADER SECTION */}
      <div className="stagger-item text-center md:text-left mb-10 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-cyan-300">
          Final Review
        </h2>
        <p className="text-sm md:text-base text-yellow-100/70 font-medium">
          Verify your details before launching.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
        
        {/* HOLOGRAPHIC RECEIPT CARD */}
        <div className="stagger-item relative bg-white/5 border border-white/10 rounded-2xl p-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl"></div>
          
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              
              <div>
                <span className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Full Name</span>
                <span className="text-lg font-medium text-white">{formData.firstName} {formData.lastName}</span>
              </div>
              
              <div>
                <span className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Email Address</span>
                <span className="text-lg font-medium text-white">{formData.email}</span>
              </div>

              <div>
                <span className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Username</span>
                <span className="text-lg font-medium text-white">{formData.username}</span>
              </div>

              <div>
                <span className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Location</span>
                <span className="text-lg font-medium text-white">{formData.city}, {formData.zipCode}</span>
              </div>

              <div className="plan-highlight col-span-1 md:col-span-2 mt-2 pt-4 border-t border-white/10 bg-cyan-900/20 rounded-lg p-4 flex items-center justify-between border border-cyan-500/30">
                <div>
                  <span className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Selected Tier</span>
                  <span className="text-2xl font-extrabold text-white">{formData.subscriptionPlan}</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* --- FIXED: CUSTOM CHECKBOX SECTION --- */}
        {/* We use the <label> to wrap the whole component. This makes clicks work! */}
        <label htmlFor="terms" className="stagger-item flex items-start gap-3 mt-2 group cursor-pointer select-none">
          <div className="relative flex items-center mt-1 flex-shrink-0">
            {/* Hidden native checkbox */}
            <input
              type="checkbox"
              id="terms"
              // sr-only keeps it accessible but invisible
              className="peer sr-only"
              checked={formData.agreedToTerms}
              onChange={(e) => updateFormData({ agreedToTerms: e.target.checked })}
              required
            />
            {/* Custom visual checkbox (reacts to native input state) */}
            <div className="w-6 h-6 rounded border-2 border-white/30 bg-white/5 transition-all duration-300 flex items-center justify-center 
                            peer-checked:bg-cyan-500 peer-checked:border-cyan-500 
                            peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-gray-950
                            group-hover:border-cyan-400">
              {/* Checkmark SVG (scales in when checked) */}
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-white transform transition-transform duration-300 ${formData.agreedToTerms ? "scale-100" : "scale-0"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          
          {/* Terms text (inside the label too) */}
          <span className="text-sm text-white/70 leading-relaxed">
            I confirm that the above information is correct, and I agree to the <span className="text-cyan-400 font-semibold hover:underline decoration-cyan-400 underline-offset-2 transition-all">Terms of Service</span> and <span className="text-cyan-400 font-semibold hover:underline decoration-cyan-400 underline-offset-2 transition-all">Privacy Policy</span>.
          </span>
        </label>

        {/* ACTION BUTTONS */}
        <div className="stagger-item flex flex-col-reverse sm:flex-row gap-4 mt-2">
          
          <button 
            type="button" 
            onClick={handleBack}
            disabled={isSubmitting}
            className="w-full sm:w-1/3 h-14 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
            <span>Back</span>
          </button>
          
          <div className="relative w-full sm:w-2/3 group">
            {!isSubmitting && (
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
            )}
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="relative w-full h-14 bg-gradient-to-r from-yellow-600 to-cyan-600 hover:from-cyan-500 hover:to-yellow-500 disabled:from-cyan-900 disabled:to-cyan-900 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-1 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:shadow-none disabled:transform-none flex items-center justify-center gap-3 overflow-hidden"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                  <div className="absolute inset-0 bg-white/20 animate-[sweep_2s_ease-in-out_infinite]"></div>
                </>
              ) : (
                <>
                  <span>Launch Dashboard</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 3.82-13.04L14 3a22 22 0 0 1 12 12l-4 1.18a22 22 0 0 1-13.04 3.82z"></path><circle cx="17.5" cy="6.5" r="1"></circle></svg>
                </>
              )}
            </button>
          </div>
          
        </div>

      </form>
    </div>
  );
}