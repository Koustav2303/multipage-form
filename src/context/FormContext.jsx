import { createContext, useState } from "react";

// 1. Create the Context
export const FormContext = createContext();

// 2. Create the Provider Component
export const FormProvider = ({ children }) => {
  // Centralized state for all 5 steps
  const [formData, setFormData] = useState({
    // Step 1: Personal
    firstName: "",
    lastName: "",
    email: "",
    
    // Step 2: Account
    username: "",
    password: "",
    confirmPassword: "",
    
    // Step 3: Details (e.g., Address)
    address: "",
    city: "",
    zipCode: "",
    
    // Step 4: Plan/Role Selection
    subscriptionPlan: "Basic", 
    
    // Step 5: Review
    agreedToTerms: false
  });

  // 3. Helper function to update specific fields without deleting the rest
  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // Pass the data and the update function down to the rest of the app
  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};