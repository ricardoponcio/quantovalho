export interface TaxCalculationResult {
  grossSalary: number;
  netSalary: number;
  yearlyIpva: number;
  yearlyIptu: number;
  monthlyIndirectTaxes: number;
  totalCompanyCost: number;
  totalTaxesYearly: number;
  totalTaxesMonthly: number;
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
