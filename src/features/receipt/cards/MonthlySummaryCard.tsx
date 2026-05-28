import { useWizardStore } from '../../../store/wizardStore';
import { ReceiptCard } from '../../../components/ui/ReceiptCard';
import { TaxRow } from '../../../components/ui/TaxRow';
import { NumberTicker } from '../../../components/ui/NumberTicker';

export const MonthlySummaryCard = () => {
  const { results } = useWizardStore();

  return (
    <ReceiptCard title="Resumo Mensal">
      <div className="flex justify-between items-end mb-4">
        <span className="text-xl">Salário Bruto</span>
        <span className="text-2xl font-medium"><NumberTicker value={results.grossSalary} /></span>
      </div>
      <div className="space-y-3 mb-6 border-t border-neutral-800 pt-4">
        <TaxRow 
          name="INSS" 
          rate={results.employeeCostBreakdown.inss.rate} 
          value={results.employeeCostBreakdown.inss.value} 
          description={`Faixa: ${results.employeeCostBreakdown.inss.rangeName}`} 
        />
        <TaxRow 
          name="Imposto de Renda" 
          rate={results.employeeCostBreakdown.irpf.rate} 
          value={results.employeeCostBreakdown.irpf.value} 
          description={`Faixa: ${results.employeeCostBreakdown.irpf.rangeName}`} 
        />
      </div>
      <div className="pt-4 border-t border-neutral-800 flex justify-between items-end">
        <span className="text-xl font-semibold text-primary-light">Salário Líquido</span>
        <span className="text-3xl font-bold text-white"><NumberTicker value={results.netSalary} /></span>
      </div>
    </ReceiptCard>
  );
};
