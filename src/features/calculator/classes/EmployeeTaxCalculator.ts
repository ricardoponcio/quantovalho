export class EmployeeTaxCalculator {
  static calculateINSS(grossSalary: number) {
    let inss = 0;
    let rangeName = "Até 1 Salário Mínimo";
    
    if (grossSalary <= 1412) {
      inss = grossSalary * 0.075;
      rangeName = "Até R$ 1.412,00 (7.5%)";
    } else if (grossSalary <= 2666.68) {
      inss = (1412 * 0.075) + ((grossSalary - 1412) * 0.09);
      rangeName = "R$ 1.412,01 a R$ 2.666,68 (9%)";
    } else if (grossSalary <= 4000.03) {
      inss = (1412 * 0.075) + (1254.68 * 0.09) + ((grossSalary - 2666.68) * 0.12);
      rangeName = "R$ 2.666,69 a R$ 4.000,03 (12%)";
    } else if (grossSalary <= 7786.02) {
      inss = (1412 * 0.075) + (1254.68 * 0.09) + (1333.35 * 0.12) + ((grossSalary - 4000.03) * 0.14);
      rangeName = "R$ 4.000,04 a R$ 7.786,02 (14%)";
    } else {
      inss = 908.85; // Teto INSS 2024
      rangeName = "Teto INSS (R$ 7.786,02)";
    }
    
    return {
      value: inss,
      rate: inss / grossSalary,
      rangeName
    };
  }

  static calculateIRPF(baseSalaryForIR: number) {
    let irpf = 0;
    let rangeName = "Isento";
    
    if (baseSalaryForIR <= 2259.20) {
      irpf = 0;
    } else if (baseSalaryForIR <= 2826.65) {
      irpf = (baseSalaryForIR * 0.075) - 169.44;
      rangeName = "R$ 2.259,21 a R$ 2.826,65 (7.5%)";
    } else if (baseSalaryForIR <= 3751.05) {
      irpf = (baseSalaryForIR * 0.15) - 381.44;
      rangeName = "R$ 2.826,66 a R$ 3.751,05 (15%)";
    } else if (baseSalaryForIR <= 4664.68) {
      irpf = (baseSalaryForIR * 0.225) - 662.77;
      rangeName = "R$ 3.751,06 a R$ 4.664,68 (22.5%)";
    } else {
      irpf = (baseSalaryForIR * 0.275) - 896.00;
      rangeName = "Acima de R$ 4.664,68 (27.5%)";
    }
    
    return {
      value: Math.max(0, irpf),
      rate: Math.max(0, irpf) / baseSalaryForIR,
      rangeName
    };
  }
}
