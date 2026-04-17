import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FormContext } from "../../context/FormContext";

export default function Step1_Personal() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(FormContext);

  // --- GOD TIER GSAP ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. The Main Container entry
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "expo.out" }
      );

      // 2. Staggered entry for headers and inputs
      gsap.fromTo(
        ".stagger-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  const handleNext = (e) => {
    e.preventDefault();

    // Exit Animation
    gsap.to(containerRef.current, {
      opacity: 0,
      x: -100,
      rotationY: -10, // Slight 3D tilt on exit
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => navigate("/step-2"),
    });
  };

  return (
    <div className="relative w-full text-white" ref={containerRef}>
      
      {/* BACKGROUND GLOW ORBS 
        These create a subtle colored lighting effect behind the form on desktop
      */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse hidden md:block pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse hidden md:block pointer-events-none delay-1000"></div>

      {/* HEADER SECTION */}
      <div className="stagger-item text-center md:text-left mb-10 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white/70">
          Personal Details
        </h2>
        <p className="text-sm md:text-base text-blue-200/70 font-medium">
          Let's start by getting to know you.
        </p>
      </div>

      <form onSubmit={handleNext} className="relative z-10 flex flex-col gap-6">
        
        {/* DESKTOP GRID: First Name and Last Name side-by-side on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* FIRST NAME INPUT */}
          <div className="stagger-item relative group">
            {/* SVG Icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-300 group-focus-within:text-blue-400 text-white/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            {/* Bespoke Tailwind Input with Floating Label logic (peer) */}
            <input
              type="text"
              id="firstName"
              className="peer w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white font-medium placeholder-transparent focus:bg-white/10 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              required
            />
            {/* Floating Label */}
            <label 
              htmlFor="firstName" 
              className="absolute left-12 top-4 text-white/50 text-base transition-all duration-300 pointer-events-none 
                         peer-focus:-translate-y-7 peer-focus:-translate-x-12 peer-focus:text-blue-400 peer-focus:text-xs peer-focus:font-bold
                         peer-valid:-translate-y-7 peer-valid:-translate-x-12 peer-valid:text-white/70 peer-valid:text-xs peer-valid:font-bold"
            >
              First Name
            </label>
          </div>

          {/* LAST NAME INPUT */}
          <div className="stagger-item relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-300 group-focus-within:text-blue-400 text-white/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <input
              type="text"
              id="lastName"
              className="peer w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white font-medium placeholder-transparent focus:bg-white/10 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              required
            />
            <label 
              htmlFor="lastName" 
              className="absolute left-12 top-4 text-white/50 text-base transition-all duration-300 pointer-events-none 
                         peer-focus:-translate-y-7 peer-focus:-translate-x-12 peer-focus:text-blue-400 peer-focus:text-xs peer-focus:font-bold
                         peer-valid:-translate-y-7 peer-valid:-translate-x-12 peer-valid:text-white/70 peer-valid:text-xs peer-valid:font-bold"
            >
              Last Name
            </label>
          </div>
        </div>

        {/* EMAIL INPUT (Full Width) */}
        <div className="stagger-item relative group mt-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-300 group-focus-within:text-blue-400 text-white/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </div>
          <input
            type="email"
            id="email"
            className="peer w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white font-medium placeholder-transparent focus:bg-white/10 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
          />
          <label 
            htmlFor="email" 
            className="absolute left-12 top-4 text-white/50 text-base transition-all duration-300 pointer-events-none 
                       peer-focus:-translate-y-7 peer-focus:-translate-x-12 peer-focus:text-blue-400 peer-focus:text-xs peer-focus:font-bold
                       peer-valid:-translate-y-7 peer-valid:-translate-x-12 peer-valid:text-white/70 peer-valid:text-xs peer-valid:font-bold"
          >
            Email Address
          </label>
        </div>

        {/* SUBMIT BUTTON WITH GLOW */}
        <div className="stagger-item mt-6 relative group">
          {/* Animated glow behind the button */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
          
          <button 
            type="submit" 
            className="relative w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 active:translate-y-1 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
          >
            <span>Continue Setup</span>
            {/* Arrow SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>

      </form>
    </div>
  );
}