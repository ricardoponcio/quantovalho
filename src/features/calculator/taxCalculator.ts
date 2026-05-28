import constants from '../../data/constants.json';

export interface TaxCalculationResult {
  grossSalary: number;
  netSalary: number;
  inssDiscount: number;
  irpfDiscount: number;
  totalCompanyCost: number;
  
  // Passo 2
  yearlyIpva: number;
  yearlyIptu: number;
  
  // Passo 3
  monthlyIndirectTaxes: number;
  
  // Resumo
  totalTaxesYearly: number;
  effectiveTaxRate: number;

  // Breakdown detalhado
  companyCostBreakdown: {
    fgts: { value: number; rate: number };
    inssPatronal: { value: number; rate: number };
    satRat: { value: number; rate: number };
    sistemaS: { value: number; rate: number };
    provisaoFerias: { value: number; rate: number };
    provisao13: { value: number; rate: number };
    fgtsProvisoes: { value: number; rate: number };
  };

  // Breakdown detalhado de impostos patrimoniais
  // Breakdown detalhado de impostos patrimoniais
  wealthTaxBreakdown: {
    ipvaRate: number;
    carValueUsed: number;
    isCarValueEstimated: boolean;
    iptuRate: number;
    propertyValueUsed: number | null;
    isPropertyValueEstimated: boolean;
  };

  // Breakdown detalhado do empregado
  employeeCostBreakdown: {
    inss: { value: number; rangeName: string; rate: number };
    irpf: { value: number; rangeName: string; rate: number };
  };
  // Breakdown detalhado de impostos sobre consumo
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
  
  // 1. INSS (Simplificado para MVP)
  let inssDiscount = 0;
  let inssRangeName = "";
  let inssRate = 0;
  
  if (grossSalary <= 1412) {
    inssRate = 0.075;
    inssDiscount = grossSalary * inssRate;
    inssRangeName = "Até R$ 1.412,00";
  } else if (grossSalary <= 2666) {
    inssRate = 0.09;
    inssDiscount = grossSalary * inssRate;
    inssRangeName = "De R$ 1.412,01 até R$ 2.666,68";
  } else if (grossSalary <= 4000) {
    inssRate = 0.12;
    inssDiscount = grossSalary * inssRate;
    inssRangeName = "De R$ 2.666,69 até R$ 4.000,03";
  } else {
    inssRate = 0.14;
    inssDiscount = Math.min(grossSalary, 7786) * inssRate;
    inssRangeName = "De R$ 4.000,04 até o Teto (R$ 7.786,02)";
  }

  // 2. IRPF (Base = Bruto - INSS)
  const baseIrpf = grossSalary - inssDiscount;
  let irpfDiscount = 0;
  let irpfRangeName = "";
  let irpfRate = 0;
  
  for (const faixa of constants.irpf_2024) {
    if (faixa.max === null || baseIrpf <= faixa.max) {
      irpfDiscount = (baseIrpf * faixa.aliquota) - faixa.deducao;
      irpfRate = faixa.aliquota;
      if (faixa.aliquota === 0) {
        irpfRangeName = `Isento (até R$ ${faixa.max.toFixed(2)})`;
      } else if (faixa.max === null) {
        irpfRangeName = `Acima de R$ 4.664,68 (Parcela a deduzir: R$ ${faixa.deducao.toFixed(2)})`;
      } else {
        irpfRangeName = `Até R$ ${faixa.max.toFixed(2)} (Parcela a deduzir: R$ ${faixa.deducao.toFixed(2)})`;
      }
      break;
    }
  }
  if (irpfDiscount < 0) irpfDiscount = 0;

  const netSalary = grossSalary - inssDiscount - irpfDiscount;
  
  const employeeCostBreakdown = {
    inss: { value: inssDiscount, rangeName: inssRangeName, rate: inssRate },
    irpf: { value: irpfDiscount, rangeName: irpfRangeName, rate: irpfRate }
  };

  // 3. Custo Empresa CLT (Encargos + Bruto) - Assumindo Lucro Real/Presumido (mais completo)
  const fgts = grossSalary * constants.encargos_empresa_clt.fgts;
  const inssPatronal = grossSalary * constants.encargos_empresa_clt.inss_patronal;
  const satRat = grossSalary * constants.encargos_empresa_clt.sat_rat_medio;
  const sistemaS = grossSalary * constants.encargos_empresa_clt.sistema_s_e_outros;
  
  const provisaoFerias = grossSalary * constants.encargos_empresa_clt.ferias_e_terco;
  const provisao13 = grossSalary * constants.encargos_empresa_clt.decimo_terceiro;
  const fgtsProvisoes = grossSalary * constants.encargos_empresa_clt.fgts_provisoes;
  
  const totalCompanyCost = grossSalary + fgts + inssPatronal + satRat + sistemaS + provisaoFerias + provisao13 + fgtsProvisoes;

  const companyCostBreakdown = {
    fgts: { value: fgts, rate: constants.encargos_empresa_clt.fgts },
    inssPatronal: { value: inssPatronal, rate: constants.encargos_empresa_clt.inss_patronal },
    satRat: { value: satRat, rate: constants.encargos_empresa_clt.sat_rat_medio },
    sistemaS: { value: sistemaS, rate: constants.encargos_empresa_clt.sistema_s_e_outros },
    provisaoFerias: { value: provisaoFerias, rate: constants.encargos_empresa_clt.ferias_e_terco },
    provisao13: { value: provisao13, rate: constants.encargos_empresa_clt.decimo_terceiro },
    fgtsProvisoes: { value: fgtsProvisoes, rate: constants.encargos_empresa_clt.fgts_provisoes },
  };

  // 4. IPVA / IPTU Médio
  const stateData = (constants.medias_estaduais as any)[state] || constants.medias_estaduais.DEFAULT;
  const isCarValueEstimated = !carValue;
  const actualCarValue = carValue || 70000; // Dummy: Carro de 70k se não informado
  const ipvaRate = isElectricCar && stateData.ipva_eletrico !== undefined ? stateData.ipva_eletrico : stateData.ipva;
  const yearlyIpva = hasCar ? actualCarValue * ipvaRate : 0;
  
  const isPropertyValueEstimated = !propertyValue;
  const iptuRate = 0.01; // Estimativa de 1% sobre valor venal
  let actualPropertyValue = propertyValue;
  if (propertyValue && stateData.iptu_max_base && propertyValue > stateData.iptu_max_base) {
    actualPropertyValue = stateData.iptu_max_base;
  }
  const yearlyIptu = hasProperty ? (actualPropertyValue ? actualPropertyValue * iptuRate : stateData.iptu_medio_anual) : 0;

  const wealthTaxBreakdown = {
    ipvaRate,
    carValueUsed: actualCarValue,
    isCarValueEstimated,
    iptuRate,
    propertyValueUsed: actualPropertyValue,
    isPropertyValueEstimated
  };

  // 5. Impostos Indiretos (Consumo)
  const monthlyIndirectTaxes = monthlyExpenses * stateData.carga_indireta_consumo;
  const consumptionTaxBreakdown = {
    icms: { value: monthlyExpenses * constants.impostos_consumo_detalhado.icms_medio, rate: constants.impostos_consumo_detalhado.icms_medio },
    pisCofins: { value: monthlyExpenses * constants.impostos_consumo_detalhado.pis_cofins, rate: constants.impostos_consumo_detalhado.pis_cofins },
    ipiIbpt: { value: monthlyExpenses * constants.impostos_consumo_detalhado.ipi_ibpt_outros, rate: constants.impostos_consumo_detalhado.ipi_ibpt_outros }
  };

  // Total anualizado
  const totalIncomeYearly = totalCompanyCost * 12; // Do ponto de vista de quanto dinheiro existia antes do governo agir
  const directTaxesYearly = (inssDiscount + irpfDiscount) * 12;
  const indirectTaxesYearly = monthlyIndirectTaxes * 12;
  const patronalTaxesYearly = (totalCompanyCost - grossSalary) * 12;
  
  const totalTaxesYearly = directTaxesYearly + indirectTaxesYearly + yearlyIpva + yearlyIptu + patronalTaxesYearly;
  
  const effectiveTaxRate = totalIncomeYearly > 0 ? (totalTaxesYearly / totalIncomeYearly) * 100 : 0;

  return {
    grossSalary,
    netSalary,
    inssDiscount,
    irpfDiscount,
    totalCompanyCost,
    yearlyIpva,
    yearlyIptu,
    monthlyIndirectTaxes,
    totalTaxesYearly,
    effectiveTaxRate,
    companyCostBreakdown,
    employeeCostBreakdown,
    wealthTaxBreakdown,
    consumptionTaxBreakdown
  };
}
