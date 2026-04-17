import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FormContext } from "../../context/FormContext";

export default function Step3_Details() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(FormContext);

  // ENTRY ANIMATION: Slide in from right
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    // EXIT ANIMATION (Next): Slide left
    gsap.to(formRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => navigate("/step-4"),
    });
  };

  const handleBack = () => {
    // EXIT ANIMATION (Back): Slide right
    gsap.to(formRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => navigate("/step-2"),
    });
  };

  return (
    <div ref={formRef} className="text-white">
      <h2 className="text-4xl font-bold mb-2">Location Details</h2>
      <p className="text-white/70 mb-8">Where can we find you?</p>

      <form onSubmit={handleNext}>
        
        <div className="mb-4">
          <label htmlFor="address" className="form-label text-sm font-semibold text-white/90">Street Address</label>
          <input
            type="text"
            id="address"
            className="form-control bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:shadow-none"
            placeholder="123 Galaxy Way, Suite 400"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            required
          />
        </div>

        {/* Tailwind Grid for two-column layout */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label htmlFor="city" className="form-label text-sm font-semibold text-white/90">City</label>
            <input
              type="text"
              id="city"
              className="form-control bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:shadow-none"
              placeholder="Metropolis"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="zipCode" className="form-label text-sm font-semibold text-white/90">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              className="form-control bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:shadow-none"
              placeholder="90210"
              value={formData.zipCode}
              onChange={(e) => updateFormData({ zipCode: e.target.value })}
              required
            />
          </div>
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
            Next Step ➔
          </button>
        </div>

      </form>
    </div>
  );
}