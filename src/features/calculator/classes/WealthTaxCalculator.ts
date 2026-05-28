import constants from '../../../data/constants.json';

export class WealthTaxCalculator {
  static calculate(
    state: string,
    hasCar: boolean,
    hasProperty: boolean,
    carValue: number | null,
    propertyValue: number | null,
    isElectricCar: boolean
  ) {
    const stateData = (constants.medias_estaduais as any)[state] || constants.medias_estaduais.DEFAULT;
    
    // IPVA
    const isCarValueEstimated = !carValue;
    const actualCarValue = carValue || 70000;
    const ipvaRate = isElectricCar && stateData.ipva_eletrico !== undefined ? stateData.ipva_eletrico : stateData.ipva;
    const yearlyIpva = hasCar ? actualCarValue * ipvaRate : 0;
    
    // IPTU
    const isPropertyValueEstimated = !propertyValue;
    const iptuRate = 0.01;
    let actualPropertyValue = propertyValue;
    
    if (propertyValue && stateData.iptu_max_base && propertyValue > stateData.iptu_max_base) {
      actualPropertyValue = stateData.iptu_max_base;
    }
    
    const yearlyIptu = hasProperty ? (actualPropertyValue ? actualPropertyValue * iptuRate : stateData.iptu_medio_anual) : 0;

    return {
      yearlyIpva,
      yearlyIptu,
      wealthTaxBreakdown: {
        ipvaRate,
        carValueUsed: actualCarValue,
        isCarValueEstimated,
        iptuRate,
        propertyValueUsed: actualPropertyValue,
        isPropertyValueEstimated
      }
    };
  }
}
