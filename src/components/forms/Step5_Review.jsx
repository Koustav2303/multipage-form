import { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FormContext } from "../../context/FormContext";

export default function Step5_Review() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  // We grab resetForm here so we can clear the data after a successful submit
  const { formData, updateFormData, resetForm } = useContext(FormContext);
  
  // A tiny local state to show a loading animation on the button
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ENTRY ANIMATION
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a network request (like sending data to a database)
    setTimeout(() => {
      alert(`Success! Welcome aboard, ${formData.firstName}. Your ${formData.subscriptionPlan} plan is active!`);
      
      // EXIT ANIMATION (Success): Shrink and fade out
      gsap.to(formRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          resetForm();    // Clear the Context data
          navigate("/");  // Send them back to the beginning
        },
      });
    }, 1500); // 1.5 second fake delay
  };

  const handleBack = () => {
    gsap.to(formRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => navigate("/step-4"),
    });
  };

  return (
    <div ref={formRef} className="text-white">
      <h2 className="text-4xl font-bold mb-2">Review & Confirm</h2>
      <p className="text-white/70 mb-8">Make sure everything looks good.</p>

      {/* The Data Summary Box */}
      <div className="bg-black/30 rounded-xl p-6 mb-8 border border-white/10 text-sm">
        <div className="grid grid-cols-2 gap-y-4">
          <div>
            <span className="block text-white/50 mb-1">Name</span>
            <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
          </div>
          <div>
            <span className="block text-white/50 mb-1">Email</span>
            <span className="font-semibold">{formData.email}</span>
          </div>
          <div>
            <span className="block text-white/50 mb-1">Username</span>
            <span className="font-semibold">{formData.username}</span>
          </div>
          <div>
            <span className="block text-white/50 mb-1">Location</span>
            <span className="font-semibold">{formData.city}, {formData.zipCode}</span>
          </div>
          <div className="col-span-2 mt-4 pt-4 border-t border-white/10">
            <span className="block text-white/50 mb-1">Selected Plan</span>
            <span className="text-xl font-bold text-blue-400">{formData.subscriptionPlan}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Terms Checkbox */}
        <div className="mb-8 flex items-center gap-3">
          <input
            type="checkbox"
            id="terms"
            className="w-5 h-5 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 cursor-pointer"
            checked={formData.agreedToTerms}
            onChange={(e) => updateFormData({ agreedToTerms: e.target.checked })}
            required
          />
          <label htmlFor="terms" className="text-sm text-white/80 cursor-pointer select-none">
            I agree to the <span className="text-blue-400 underline">Terms of Service</span> and Privacy Policy.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={handleBack}
            disabled={isSubmitting}
            className="w-1/3 py-3 px-4 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white font-bold rounded-lg transition-all duration-300 border border-white/20"
          >
            Back
          </button>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-2/3 py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              "Confirm & Submit 🚀"
            )}
          </button>
        </div>

      </form>
    </div>
  );
}