import { create } from 'zustand';
import { calculateTaxes, type TaxCalculationResult } from '../features/calculator/taxCalculator';

interface WizardState {
  step: number;
  grossSalary: number;
  stateUF: string;
  monthlyExpenses: number;
  hasCar: boolean;
  isElectricCar: boolean;
  carValue: number | null;
  hasProperty: boolean;
  propertyValue: number | null;
  
  results: TaxCalculationResult;

  setStep: (step: number) => void;
  updateData: (data: Partial<Omit<WizardState, 'step' | 'results' | 'setStep' | 'updateData'>>) => void;
}



export const useWizardStore = create<WizardState>((set) => ({
  step: 1,
  grossSalary: 5000,
  stateUF: 'SP',
  monthlyExpenses: 2000,
  hasCar: false,
  isElectricCar: false,
  carValue: null,
  hasProperty: false,
  propertyValue: null,
  results: calculateTaxes(5000, 'SP', 2000, false, false, null, null, false),

  setStep: (step) => set({ step }),
  
  updateData: (newData) => set((state) => {
    const nextState = { ...state, ...newData };
    // Recalcula sempre que atualizar dados
    const results = calculateTaxes(
      nextState.grossSalary,
      nextState.stateUF,
      nextState.monthlyExpenses,
      nextState.hasCar,
      nextState.hasProperty,
      nextState.carValue,
      nextState.propertyValue,
      nextState.isElectricCar
    );
    return { ...nextState, results };
  }),
}));
