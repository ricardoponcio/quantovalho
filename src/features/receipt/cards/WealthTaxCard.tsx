import { useWizardStore } from '../../../store/wizardStore';
import { ReceiptCard } from '../../../components/ui/ReceiptCard';
import { TaxRow } from '../../../components/ui/TaxRow';
import { NumberTicker } from '../../../components/ui/NumberTicker';
import { formatCurrency } from '../../../lib/utils';

export const WealthTaxCard = () => {
  const { stateUF, hasCar, hasProperty, results } = useWizardStore();
  const w = results.wealthTaxBreakdown;

  if (!hasCar && !hasProperty) return null;

  return (
    <ReceiptCard title="Impostos Patrimoniais (Ano)">
      <div className="space-y-3">
        {hasCar && (
          <TaxRow 
            name="IPVA" 
            rate={w.ipvaRate} 
            value={results.yearlyIpva} 
            description={w.isCarValueEstimated ? `Estimativa baseada em carro de ${formatCurrency(w.carValueUsed)}` : `Sobre ${formatCurrency(w.carValueUsed)}`} 
          />
        )}
        {hasProperty && (
          <TaxRow 
            name="IPTU" 
            rate={w.iptuRate} 
            value={results.yearlyIptu} 
            description={w.isPropertyValueEstimated ? `Média anual do Estado (${stateUF})` : `Sobre ${formatCurrency(w.propertyValueUsed || 0)}`} 
          />
        )}
      </div>
      <div className="flex justify-between items-end border-t border-neutral-800 pt-4 mt-4">
        <span className="text-lg">Total Patrimonial Anual</span>
        <span className="text-2xl font-bold text-red-400"><NumberTicker value={results.yearlyIpva + results.yearlyIptu} /></span>
      </div>
    </ReceiptCard>
  );
};
