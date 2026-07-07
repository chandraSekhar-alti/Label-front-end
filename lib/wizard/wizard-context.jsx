'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const WizardContext = createContext(null);

export const INITIAL_DETAILS = {
  triggerDate: '', changeType: '', processImpacted: '', changeCategory: '',
  signal: '', startDate: '', triggerType: '', shortDescription: '', description: '',
};

export function WizardProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [productFamily, setProductFamily] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedRegistrations, setSelectedRegistrations] = useState([]);

  const goTo = useCallback((step) => setCurrentStep(step), []);
  const markComplete = useCallback((step) => setCompletedSteps(prev => new Set(prev).add(step)), []);
  const reset = useCallback(() => {
    setCurrentStep(1); setCompletedSteps(new Set());
    setProductFamily(''); setSelectedProducts([]);
    setDetails(INITIAL_DETAILS); setSelectedCountries([]); setSelectedRegistrations([]);
  }, []);

  return (
    <WizardContext.Provider value={{
      currentStep, setCurrentStep, goTo, completedSteps, markComplete,
      productFamily, setProductFamily, selectedProducts, setSelectedProducts,
      details, setDetails, selectedCountries, setSelectedCountries,
      selectedRegistrations, setSelectedRegistrations, reset,
    }}>{children}</WizardContext.Provider>
  );
}

export const useWizard = () => {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used within WizardProvider');
  return ctx;
};
