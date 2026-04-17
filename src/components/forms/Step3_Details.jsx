import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FormContext } from "../../context/FormContext";

export default function Step3_Details() {
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
    // Exit Animation (Next): Slide Left
    gsap.to(containerRef.current, {
      opacity: 0, x: -100, rotationY: -10, duration: 0.6, ease: "power3.inOut",
      onComplete: () => navigate("/step-4"),
    });
  };

  const handleBack = () => {
    // Exit Animation (Back): Slide Right
    gsap.to(containerRef.current, {
      opacity: 0, x: 100, rotationY: 10, duration: 0.6, ease: "power3.inOut",
      onComplete: () => navigate("/step-2"),
    });
  };

  return (
    <div className="relative w-full text-white" ref={containerRef}>
      
      {/* BACKGROUND GLOW ORBS (Amber & Orange for a warm location vibe) */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse hidden md:block pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse hidden md:block pointer-events-none delay-1000"></div>

      {/* HEADER SECTION */}
      <div className="stagger-item text-center md:text-left mb-10 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-amber-300 to-orange-200">
          Location Details
        </h2>
        <p className="text-sm md:text-base text-amber-200/70 font-medium">
          Where can we find you in the galaxy?
        </p>
      </div>

      <form onSubmit={handleNext} className="relative z-10 flex flex-col gap-6">
        
        {/* STREET ADDRESS INPUT (Full Width) */}
        <div className="stagger-item relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-300 group-focus-within:text-amber-400 text-white/40">
            {/* Map Pin SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <input
            type="text"
            id="address"
            className="peer w-full h-16 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white font-medium placeholder-transparent focus:bg-white/10 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/20 transition-all outline-none"
            placeholder="Street Address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            required
          />
          <label 
            htmlFor="address" 
            className="absolute left-12 top-5 text-white/50 text-base transition-all duration-300 pointer-events-none 
                       peer-focus:top-2 peer-focus:text-amber-400 peer-focus:text-xs peer-focus:font-bold
                       peer-valid:top-2 peer-valid:text-white/70 peer-valid:text-xs peer-valid:font-bold"
          >
            Street Address
          </label>
        </div>

        {/* DESKTOP GRID: City and Zip Code side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CITY INPUT */}
          <div className="stagger-item relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-300 group-focus-within:text-amber-400 text-white/40">
              {/* Buildings SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                <path d="M9 22v-4h6v4"></path>
                <path d="M8 6h.01"></path>
                <path d="M16 6h.01"></path>
                <path d="M12 6h.01"></path>
                <path d="M12 10h.01"></path>
                <path d="M12 14h.01"></path>
                <path d="M16 10h.01"></path>
                <path d="M16 14h.01"></path>
                <path d="M8 10h.01"></path>
                <path d="M8 14h.01"></path>
              </svg>
            </div>
            <input
              type="text"
              id="city"
              className="peer w-full h-16 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white font-medium placeholder-transparent focus:bg-white/10 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/20 transition-all outline-none"
              placeholder="City"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              required
            />
            <label 
              htmlFor="city" 
              className="absolute left-12 top-5 text-white/50 text-base transition-all duration-300 pointer-events-none 
                         peer-focus:top-2 peer-focus:text-amber-400 peer-focus:text-xs peer-focus:font-bold
                         peer-valid:top-2 peer-valid:text-white/70 peer-valid:text-xs peer-valid:font-bold"
            >
              City
            </label>
          </div>

          {/* ZIP CODE INPUT */}
          <div className="stagger-item relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-300 group-focus-within:text-amber-400 text-white/40">
              {/* Hash SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="9" x2="20" y2="9"></line>
                <line x1="4" y1="15" x2="20" y2="15"></line>
                <line x1="10" y1="3" x2="8" y2="21"></line>
                <line x1="16" y1="3" x2="14" y2="21"></line>
              </svg>
            </div>
            <input
              type="text"
              id="zipCode"
              className="peer w-full h-16 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white font-medium placeholder-transparent focus:bg-white/10 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/20 transition-all outline-none"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={(e) => updateFormData({ zipCode: e.target.value })}
              required
            />
            <label 
              htmlFor="zipCode" 
              className="absolute left-12 top-5 text-white/50 text-base transition-all duration-300 pointer-events-none 
                         peer-focus:top-2 peer-focus:text-amber-400 peer-focus:text-xs peer-focus:font-bold
                         peer-valid:top-2 peer-valid:text-white/70 peer-valid:text-xs peer-valid:font-bold"
            >
              Postal / Zip Code
            </label>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="stagger-item flex flex-col-reverse sm:flex-row gap-4 mt-4">
          
          {/* Back Button */}
          <button 
            type="button" 
            onClick={handleBack}
            className="w-full sm:w-1/3 h-14 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
            <span>Back</span>
          </button>
          
          {/* Glowing Next Button (Amber -> Orange) */}
          <div className="relative w-full sm:w-2/3 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
            <button 
              type="submit" 
              className="relative w-full h-14 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 active:translate-y-1 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
            >
              <span>Choose Plan</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
          
        </div>

      </form>
    </div>
  );
}