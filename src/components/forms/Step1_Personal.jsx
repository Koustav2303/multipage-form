import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FormContext } from "../../context/FormContext";

export default function Step1_Personal() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  
  // 1. Pull the data and the update function from our Context Brain
  const { formData, updateFormData } = useContext(FormContext);

  // 2. GSAP ENTRY ANIMATION: Slide in from the left and fade up
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  // 3. HANDLE NEXT BUTTON: Animate out, then navigate to Step 2
  const handleNext = (e) => {
    e.preventDefault(); // Stop the page from refreshing!

    gsap.to(formRef.current, {
      opacity: 0,
      x: 50, // Slide out to the right
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => navigate("/step-2"), // Tell the router to swap the page
    });
  };

  return (
    <div ref={formRef} className="text-white">
      <h2 className="text-4xl font-bold mb-2">Personal Info</h2>
      <p className="text-white/70 mb-8">Let's start with the basics.</p>

      <form onSubmit={handleNext}>
        
        {/* Bootstrap form-group wrapped in Tailwind spacing */}
        <div className="mb-4">
          <label htmlFor="firstName" className="form-label text-sm font-semibold text-white/90">First Name</label>
          <input
            type="text"
            id="firstName"
            // Mixing Bootstrap's structure with Tailwind's glass colors
            className="form-control bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:shadow-none"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="form-label text-sm font-semibold text-white/90">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="form-control bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:shadow-none"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="form-label text-sm font-semibold text-white/90">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:shadow-none"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3 px-4 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
        >
          Next Step ➔
        </button>
      </form>
    </div>
  );
}