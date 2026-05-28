import constants from '../../../data/constants.json';

export class CompanyTaxCalculator {
  static calculateCosts(grossSalary: number) {
    const clt = constants.encargos_empresa_clt;
    
    const inssPatronal = grossSalary * clt.inss_patronal;
    const fgts = grossSalary * clt.fgts;
    const sistemaS = grossSalary * clt.sistema_s_e_outros;
    const satRat = grossSalary * clt.sat_rat_medio;
    
    const provisao13 = grossSalary * clt.decimo_terceiro;
    const provisaoFerias = grossSalary * clt.ferias_e_terco;
    const fgtsProvisoes = grossSalary * clt.fgts_provisoes;

    const totalCompanyCost = grossSalary + inssPatronal + fgts + sistemaS + satRat + provisao13 + provisaoFerias + fgtsProvisoes;

    return {
      inssPatronal: { value: inssPatronal, rate: clt.inss_patronal },
      fgts: { value: fgts, rate: clt.fgts },
      sistemaS: { value: sistemaS, rate: clt.sistema_s_e_outros },
      satRat: { value: satRat, rate: clt.sat_rat_medio },
      provisao13: { value: provisao13, rate: clt.decimo_terceiro },
      provisaoFerias: { value: provisaoFerias, rate: clt.ferias_e_terco },
      fgtsProvisoes: { value: fgtsProvisoes, rate: clt.fgts_provisoes },
      totalCompanyCost
    };
  }
}
