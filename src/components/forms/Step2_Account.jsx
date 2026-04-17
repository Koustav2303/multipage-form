import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FormContext } from "../../context/FormContext";

export default function Step2_Account() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(FormContext);

  // ENTRY ANIMATION: Slide in from the right (moving forward)
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const handleNext = (e) => {
    e.preventDefault();

    // Quick validation check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match! Please check them.");
      return;
    }

    // EXIT ANIMATION (Next): Slide out to the left
    gsap.to(formRef.current, {
      opacity: 0,
      x: -50, 
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => navigate("/step-3"),
    });
  };

  const handleBack = () => {
    // EXIT ANIMATION (Back): Slide out to the right
    gsap.to(formRef.current, {
      opacity: 0,
      x: 50, 
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => navigate("/"), // Go back to Step 1
    });
  };

  return (
    <div ref={formRef} className="text-white">
      <h2 className="text-4xl font-bold mb-2">Account Setup</h2>
      <p className="text-white/70 mb-8">Choose your login credentials.</p>

      <form onSubmit={handleNext}>
        
        <div className="mb-4">
          <label htmlFor="username" className="form-label text-sm font-semibold text-white/90">Username</label>
          <input
            type="text"
            id="username"
            className="form-control bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:shadow-none"
            placeholder="cool_dev_22"
            value={formData.username}
            onChange={(e) => updateFormData({ username: e.target.value })}
            required
            minLength={4}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label text-sm font-semibold text-white/90">Password</label>
          <input
            type="password"
            id="password"
            className="form-control bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:shadow-none"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            required
            minLength={6}
          />
        </div>

        <div className="mb-8">
          <label htmlFor="confirmPassword" className="form-label text-sm font-semibold text-white/90">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:shadow-none"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
            required
          />
        </div>

        {/* Action Buttons Container */}
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
            Next Step ➔
          </button>
        </div>

      </form>
    </div>
  );
}