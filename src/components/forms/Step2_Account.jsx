import { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FormContext } from "../../context/FormContext";
import toast from "react-hot-toast";

export default function Step2_Account() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(FormContext);
  
  // Local state for our beautiful password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNext = (e) => {
    e.preventDefault();

    // Toast Notification for Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match! Please check them.", {
        style: { background: '#ef4444', color: '#fff', borderRadius: '12px' },
        icon: '🔒'
      });
      // Shake animation on error
      gsap.fromTo(containerRef.current, 
        { x: -10 }, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" }
      );
      return;
    }

    // Exit Animation (Next): Slide Left
    gsap.to(containerRef.current, {
      opacity: 0, x: -100, rotationY: -10, duration: 0.6, ease: "power3.inOut",
      onComplete: () => navigate("/step-3"),
    });
  };

  const handleBack = () => {
    // Exit Animation (Back): Slide Right
    gsap.to(containerRef.current, {
      opacity: 0, x: 100, rotationY: 10, duration: 0.6, ease: "power3.inOut",
      onComplete: () => navigate("/"),
    });
  };

  return (
    <div className="relative w-full text-white" ref={containerRef}>
      
      {/* BACKGROUND GLOW ORBS (Emerald & Rose) */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse hidden md:block pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse hidden md:block pointer-events-none delay-1000"></div>

      {/* HEADER SECTION */}
      <div className="stagger-item text-center md:text-left mb-10 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-100 via-emerald-300 to-teal-100">
          Account Setup
        </h2>
        <p className="text-sm md:text-base text-emerald-200/70 font-medium">
          Create your login credentials securely.
        </p>
      </div>

      <form onSubmit={handleNext} className="relative z-10 flex flex-col gap-6">
        
        {/* USERNAME INPUT (With Overlap Fix) */}
        <div className="stagger-item relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-300 group-focus-within:text-emerald-400 text-white/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <input
            type="text"
            id="username"
            className="peer w-full h-16 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white font-medium placeholder-transparent focus:bg-white/10 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => updateFormData({ username: e.target.value })}
            required
            minLength={4}
          />
          <label 
            htmlFor="username" 
            className="absolute left-12 top-5 text-white/50 text-base transition-all duration-300 pointer-events-none 
                       peer-focus:top-2 peer-focus:text-emerald-400 peer-focus:text-xs peer-focus:font-bold
                       peer-valid:top-2 peer-valid:text-white/70 peer-valid:text-xs peer-valid:font-bold"
          >
            Choose a Username
          </label>
        </div>

        {/* PASSWORD INPUT WITH TOGGLE (With Overlap Fix) */}
        <div className="stagger-item relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-300 group-focus-within:text-emerald-400 text-white/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          {/* Note: pr-12 keeps the text from hiding behind the eye icon */}
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="peer w-full h-16 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 text-white font-medium placeholder-transparent focus:bg-white/10 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            required
            minLength={6}
          />
          <label 
            htmlFor="password" 
            className="absolute left-12 top-5 text-white/50 text-base transition-all duration-300 pointer-events-none 
                       peer-focus:top-2 peer-focus:text-emerald-400 peer-focus:text-xs peer-focus:font-bold
                       peer-valid:top-2 peer-valid:text-white/70 peer-valid:text-xs peer-valid:font-bold"
          >
            Password (Min 6 chars)
          </label>
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/40 hover:text-emerald-400 transition-colors focus:outline-none"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            )}
          </button>
        </div>

        {/* CONFIRM PASSWORD WITH TOGGLE (With Overlap Fix) */}
        <div className="stagger-item relative group mb-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-300 group-focus-within:text-emerald-400 text-white/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <input
            type={showConfirm ? "text" : "password"}
            id="confirmPassword"
            className="peer w-full h-16 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 text-white font-medium placeholder-transparent focus:bg-white/10 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
            required
          />
          <label 
            htmlFor="confirmPassword" 
            className="absolute left-12 top-5 text-white/50 text-base transition-all duration-300 pointer-events-none 
                       peer-focus:top-2 peer-focus:text-emerald-400 peer-focus:text-xs peer-focus:font-bold
                       peer-valid:top-2 peer-valid:text-white/70 peer-valid:text-xs peer-valid:font-bold"
          >
            Confirm Password
          </label>
          
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/40 hover:text-emerald-400 transition-colors focus:outline-none"
          >
            {showConfirm ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            )}
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="stagger-item flex flex-col-reverse sm:flex-row gap-4 mt-4">
          
          <button 
            type="button" 
            onClick={handleBack}
            className="w-full sm:w-1/3 h-14 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
            <span>Back</span>
          </button>
          
          <div className="relative w-full sm:w-2/3 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
            <button 
              type="submit" 
              className="relative w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-teal-500 hover:to-emerald-400 text-white font-bold text-lg rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 active:translate-y-1 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
            >
              <span>Security & Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
          
        </div>

      </form>
    </div>
  );
}