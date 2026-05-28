import { EmployeeTaxCalculator } from './classes/EmployeeTaxCalculator';
import { CompanyTaxCalculator } from './classes/CompanyTaxCalculator';
import { WealthTaxCalculator } from './classes/WealthTaxCalculator';
import { ConsumptionTaxCalculator } from './classes/ConsumptionTaxCalculator';

export interface TaxCalculationResult {
  grossSalary: number;
  netSalary: number;
  yearlyIpva: number;
  yearlyIptu: number;
  monthlyIndirectTaxes: number;
  totalCompanyCost: number;
  effectiveTaxRate: number;
  
  companyCostBreakdown: {
    inssPatronal: { value: number; rate: number };
    fgts: { value: number; rate: number };
    sistemaS: { value: number; rate: number };
    satRat: { value: number; rate: number };
    provisao13: { value: number; rate: number };
    provisaoFerias: { value: number; rate: number };
    fgtsProvisoes: { value: number; rate: number };
  };
  
  wealthTaxBreakdown: {
    ipvaRate: number;
    carValueUsed: number;
    isCarValueEstimated: boolean;
    iptuRate: number;
    propertyValueUsed: number | null;
    isPropertyValueEstimated: boolean;
  };

  employeeCostBreakdown: {
    inss: { value: number; rangeName: string; rate: number };
    irpf: { value: number; rangeName: string; rate: number };
  };
  
  consumptionTaxBreakdown: {
    icms: { value: number; rate: number };
    pisCofins: { value: number; rate: number };
    ipiIbpt: { value: number; rate: number };
  };
}

export function calculateTaxes(
  grossSalary: number,
  state: string,
  monthlyExpenses: number,
  hasCar: boolean,
  hasProperty: boolean,
  carValue: number | null = null,
  propertyValue: number | null = null,
  isElectricCar: boolean = false
): TaxCalculationResult {
  
  // 1. INSS e IRPF (Empregado)
  const inssResult = EmployeeTaxCalculator.calculateINSS(grossSalary);
  const baseSalaryForIR = grossSalary - inssResult.value;
  const irpfResult = EmployeeTaxCalculator.calculateIRPF(baseSalaryForIR);
  const netSalary = grossSalary - inssResult.value - irpfResult.value;

  // 2. Custos da Empresa
  const companyCosts = CompanyTaxCalculator.calculateCosts(grossSalary);

  // 3. Impostos Patrimoniais
  const wealthTaxes = WealthTaxCalculator.calculate(state, hasCar, hasProperty, carValue, propertyValue, isElectricCar);

  // 4. Impostos de Consumo
  const consumptionTaxes = ConsumptionTaxCalculator.calculate(monthlyExpenses, state);

  // 5. Total Anualizado e Carga Efetiva
  const totalIncomeYearly = companyCosts.totalCompanyCost * 12;
  const totalTaxesYearly = 
    ((inssResult.value + irpfResult.value) * 12) + 
    ((companyCosts.totalCompanyCost - grossSalary) * 12) + 
    wealthTaxes.yearlyIpva + 
    wealthTaxes.yearlyIptu + 
    (consumptionTaxes.monthlyIndirectTaxes * 12);
    
  const effectiveTaxRate = Math.round((totalTaxesYearly / totalIncomeYearly) * 100);

  return {
    grossSalary,
    netSalary,
    yearlyIpva: wealthTaxes.yearlyIpva,
    yearlyIptu: wealthTaxes.yearlyIptu,
    monthlyIndirectTaxes: consumptionTaxes.monthlyIndirectTaxes,
    totalCompanyCost: companyCosts.totalCompanyCost,
    effectiveTaxRate,
    
    companyCostBreakdown: {
      inssPatronal: companyCosts.inssPatronal,
      fgts: companyCosts.fgts,
      sistemaS: companyCosts.sistemaS,
      satRat: companyCosts.satRat,
      provisao13: companyCosts.provisao13,
      provisaoFerias: companyCosts.provisaoFerias,
      fgtsProvisoes: companyCosts.fgtsProvisoes
    },
    
    employeeCostBreakdown: {
      inss: inssResult,
      irpf: irpfResult
    },
    
    wealthTaxBreakdown: wealthTaxes.wealthTaxBreakdown,
    consumptionTaxBreakdown: consumptionTaxes.consumptionTaxBreakdown
  };
}
