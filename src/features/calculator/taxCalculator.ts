import { EmployeeTaxCalculator } from './classes/EmployeeTaxCalculator';
import { CompanyTaxCalculator } from './classes/CompanyTaxCalculator';
import { WealthTaxCalculator } from './classes/WealthTaxCalculator';
import { ConsumptionTaxCalculator } from './classes/ConsumptionTaxCalculator';
import type { TaxCalculationResult } from './types';



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
  
  // Impostos puros da empresa (Gov + FGTS), exclui 13º e Férias que são salário diferido.
  const companyTaxes = 
    companyCosts.inssPatronal.value + 
    companyCosts.sistemaS.value + 
    companyCosts.satRat.value + 
    companyCosts.fgts.value + 
    companyCosts.fgtsProvisoes.value;

  const totalTaxesYearly = 
    ((inssResult.value + irpfResult.value) * 12) + 
    (companyTaxes * 12) + 
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
    totalTaxesYearly,
    totalTaxesMonthly: totalTaxesYearly / 12,
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
