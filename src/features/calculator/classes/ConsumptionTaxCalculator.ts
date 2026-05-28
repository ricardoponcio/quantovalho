import constants from '../../../data/constants.json';

export class ConsumptionTaxCalculator {
  static calculate(monthlyExpenses: number, state: string) {
    const stateData = (constants.medias_estaduais as any)[state] || constants.medias_estaduais.DEFAULT;
    
    const monthlyIndirectTaxes = monthlyExpenses * stateData.carga_indireta_consumo;
    
    const breakdown = {
      icms: { 
        value: monthlyExpenses * constants.impostos_consumo_detalhado.icms_medio, 
        rate: constants.impostos_consumo_detalhado.icms_medio 
      },
      pisCofins: { 
        value: monthlyExpenses * constants.impostos_consumo_detalhado.pis_cofins, 
        rate: constants.impostos_consumo_detalhado.pis_cofins 
      },
      ipiIbpt: { 
        value: monthlyExpenses * constants.impostos_consumo_detalhado.ipi_ibpt_outros, 
        rate: constants.impostos_consumo_detalhado.ipi_ibpt_outros 
      }
    };

    return {
      monthlyIndirectTaxes,
      consumptionTaxBreakdown: breakdown
    };
  }
}
